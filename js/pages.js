/* ============================================================
   Wayfarer — page controllers
   One entry point, dispatched off <body data-page="...">.
   ============================================================ */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* ------------------------------------------------------------
   Shared: which months suit a destination?
   Good month = low-ish crowds (<=3) and rain below 90mm.
   ------------------------------------------------------------ */
function goodMonths(d) {
  return d.crowd.map((c, i) => (c <= 3 && d.climate.rain[i] < 90 ? i : -1)).filter(i => i >= 0);
}

function monthChipRow(d) {
  const good = goodMonths(d);
  return '<div class="best-months">' + MONTHS.map((m, i) =>
    `<span class="month-dot ${good.includes(i) ? 'best' : ''}">${m}</span>`).join('') + '</div>';
}

/* ============================================================
   HOME
   ============================================================ */
function initHome() {
  const trend = $('#rail-trending');
  const season = $('#rail-season');
  const gems = $('#rail-gems');
  const latest = $('#rail-guides');

  const byRating = [...DESTINATIONS].sort((a, b) => b.ratingAvg - a.ratingAvg);
  if (trend) trend.innerHTML = byRating.slice(0, 6).map(d => destinationCard(d)).join('');

  const nowMonth = new Date().getMonth();
  const seasonal = DESTINATIONS.filter(d => goodMonths(d).includes(nowMonth));
  if (season) season.innerHTML = (seasonal.length ? seasonal : byRating).slice(0, 6)
    .map(d => destinationCard(d)).join('');

  const quiet = [...DESTINATIONS]
    .sort((a, b) => (Math.min(...a.crowd) - Math.min(...b.crowd)) || (b.ratingAvg - a.ratingAvg))
    .slice(0, 6);
  if (gems) gems.innerHTML = quiet.map(d => destinationCard(d)).join('');

  if (latest) latest.innerHTML = POSTS.slice(0, 4).map(postCard).join('');

  const tst = $('#testimonials');
  if (tst) tst.innerHTML = TESTIMONIALS.map(t => `
    <div class="quote-card">
      ${ratingStars(5)}
      <p>“${esc(t.quote)}”</p>
      <div class="who">
        <img src="https://${t.avatar}" alt="${esc(t.name)}" loading="lazy">
        <div><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></div>
      </div>
    </div>`).join('');

  // hero mini-search suggestions
  const heroInput = $('#hero-search');
  if (heroInput) {
    heroInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') location.href = 'destinations.html?q=' + encodeURIComponent(heroInput.value.trim());
    });
  }

  const count = $('#stat-count');
  if (count) animateNumber(count, DESTINATIONS.length, 0, 1200, v => v);
}

function animateNumber(el, target, start, dur, fmt) {
  const t0 = performance.now();
  const tick = now => {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(Math.round(start + (target - start) * eased));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function postCard(p) {
  return `
  <article class="post-card">
    <div class="card-media">
      <a href="blog-post.html?slug=${p.slug}" tabindex="-1" aria-hidden="true">
        <img src="${p.cover}" alt="${esc(p.title)}" loading="lazy">
      </a>
      <div class="card-badges"><span class="badge badge--teal">${esc(p.tags[0])}</span></div>
    </div>
    <div class="card-body">
      <div class="post-meta"><span>${new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span><span>${p.readTime} min read</span></div>
      <h3 class="card-title"><a href="blog-post.html?slug=${p.slug}">${esc(p.title)}</a></h3>
      <p class="card-desc">${esc(p.excerpt)}</p>
      <div class="card-meta"><span class="price"><strong>Read guide</strong></span><span class="meta-pills">${p.tags.slice(0, 2).map(t => `<span class="pill">${esc(t)}</span>`).join('')}</span></div>
    </div>
  </article>`;
}

/* ------------------------------------------------------------
   Conversational / free-text query parser
   "somewhere warm, cheap, good for food in December"
   → { months:[11], budget:['budget'], interests:['food'], warm:true, text:'' }
   ------------------------------------------------------------ */
const MONTH_WORDS = [
  'january', 'jan', 'february', 'feb', 'march', 'mar', 'april', 'apr', 'may',
  'june', 'jun', 'july', 'jul', 'august', 'aug', 'september', 'sep', 'sept',
  'october', 'oct', 'november', 'nov', 'december', 'dec'
];
const MONTH_INDEX = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11
};

const INTEREST_WORDS = {
  relaxation: ['beach', 'beaches', 'relax', 'relaxing', 'chill', 'spa', 'rest', 'lazy'],
  adventure: ['adventure', 'hiking', 'hike', 'trek', 'dive', 'diving', 'surf', 'climb', 'ski', 'skiing', 'thrill'],
  culture: ['culture', 'cultural', 'museum', 'museums', 'temple', 'temples', 'history', 'historic', 'sightseeing', 'architecture'],
  food: ['food', 'foodie', 'eat', 'eating', 'culinary', 'cuisine', 'restaurant', 'restaurants', 'street food'],
  nightlife: ['nightlife', 'party', 'partying', 'bars', 'clubbing', 'drinks'],
  nature: ['nature', 'wildlife', 'forest', 'forests', 'mountains', 'national park', 'nature']
};

const BUDGET_WORDS = {
  budget: ['cheap', 'cheapest', 'budget', 'affordable', 'inexpensive', 'save money', 'backpack'],
  mid: ['mid-range', 'midrange', 'moderate', 'mid price', 'comfortable'],
  luxury: ['luxury', 'luxurious', 'fancy', 'high-end', 'upscale', 'premium', '5 star']
};

const STOP_WORDS = ['i', 'me', 'my', 'we', 'our', 'a', 'an', 'the', 'for', 'to', 'of', 'in', 'on',
  'somewhere', 'place', 'places', 'destination', 'destinations', 'trip', 'travel', 'go', 'want',
  'looking', 'find', 'show', 'good', 'nice', 'great', 'that', 'with', 'and', 'or', 'some', 'please'];

function parseNatural(raw) {
  const out = { months: [], budget: [], interests: [], warm: false, cold: false, text: (raw || '').trim().toLowerCase() };
  let t = ' ' + out.text + ' ';

  // months
  MONTH_WORDS.forEach(word => {
    const re = new RegExp('\\b' + word + '\\b');
    if (re.test(t)) {
      const idx = word.length === 3 ? MONTH_INDEX[word] : ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'].indexOf(word);
      if (idx >= 0 && !out.months.includes(idx)) out.months.push(idx);
      t = t.replace(re, ' ');
    }
  });

  // budget
  Object.keys(BUDGET_WORDS).forEach(level => {
    BUDGET_WORDS[level].forEach(w => {
      if (t.includes(w)) { if (!out.budget.includes(level)) out.budget.push(level); t = t.split(w).join(' '); }
    });
  });

  // interests
  Object.keys(INTEREST_WORDS).forEach(interest => {
    INTEREST_WORDS[interest].forEach(w => {
      if (t.includes(w)) { if (!out.interests.includes(interest)) out.interests.push(interest); t = t.split(w).join(' '); }
    });
  });

  // warmth
  if (/\b(warm|hot|sunny|sun|tropical|heat)\b/.test(t)) { out.warm = true; t = t.replace(/\b(warm|hot|sunny|sun|tropical|heat)\b/g, ' '); }
  if (/\b(cold|snow|snowy|winter|ski|skiing|icy)\b/.test(t)) { out.cold = true; t = t.replace(/\b(cold|snow|snowy|winter|ski|skiing|icy)\b/g, ' '); }

  out.text = t.replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/)
    .filter(w => w && !STOP_WORDS.includes(w)).join(' ').trim();
  return out;
}

function describeQuery(parsed) {
  const bits = [];
  if (parsed.months.length) bits.push('in ' + parsed.months.map(m => MONTHS[m]).join('/'));
  if (parsed.budget.length) bits.push(parsed.budget.join('/') + ' budget');
  if (parsed.interests.length) bits.push(parsed.interests.join(', '));
  if (parsed.warm) bits.push('warm weather');
  if (parsed.cold) bits.push('cold weather');
  if (parsed.text) bits.push('“' + parsed.text + '”');
  return bits.join(' · ');
}

/* ============================================================
   DESTINATIONS — filters, search, map
   ============================================================ */
const Filters = {
  state: { q: '', regions: [], budget: [], interests: [], length: [], season: '', sort: 'rating', view: 'grid' },

  init() {
    const s = this.state;
    const params = new URLSearchParams(location.search);
    if (params.get('q')) s.q = params.get('q');

    $$('[data-filter="region"]').forEach(btn => btn.addEventListener('click', () => {
      toggleIn(s.regions, btn.dataset.value); btn.classList.toggle('on'); this.render();
    }));
    $$('[data-filter="budget"]').forEach(btn => btn.addEventListener('click', () => {
      toggleIn(s.budget, btn.dataset.value); btn.classList.toggle('on'); this.render();
    }));
    $$('[data-filter="interest"]').forEach(btn => btn.addEventListener('click', () => {
      toggleIn(s.interests, btn.dataset.value); btn.classList.toggle('on'); this.render();
    }));
    $$('[data-filter="length"]').forEach(btn => btn.addEventListener('click', () => {
      toggleIn(s.length, btn.dataset.value); btn.classList.toggle('on'); this.render();
    }));

    $('#season-select')?.addEventListener('change', e => { s.season = e.target.value; this.render(); });
    $('#sort-select')?.addEventListener('change', e => { s.sort = e.target.value; this.render(); });
    $('#clear-filters')?.addEventListener('click', () => this.clear());

    const search = $('#list-search');
    if (search) {
      search.value = s.q;
      let t;
      search.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => { s.q = search.value; this.render(); }, 220);
      });
    }

    $$('[data-view]').forEach(btn => btn.addEventListener('click', () => {
      s.view = btn.dataset.view;
      $$('[data-view]').forEach(b => b.classList.toggle('on', b === btn));
      $('#grid-view').style.display = s.view === 'grid' ? '' : 'none';
      $('#map-view').style.display = s.view === 'map' ? '' : 'none';
      if (s.view === 'map') MapView.ensure();
      this.render();
    }));

    this.render();
  },

  clear() {
    const s = this.state;
    s.regions = []; s.budget = []; s.interests = []; s.length = []; s.q = ''; s.season = '';
    $$('.chip.on').forEach(c => c.classList.remove('on'));
    const sel = $('#season-select'); if (sel) sel.value = '';
    const inp = $('#list-search'); if (inp) inp.value = '';
    this.render();
  },

  matches() {
    const s = this.state;
    const q = s.q.trim().toLowerCase();
    const parsed = parseNatural(q);
    this.parsed = parsed;

    const pass = ({ useTemp, useMonths }) => DESTINATIONS.filter(d => {
      if (useMonths && parsed.months.length && !parsed.months.some(m => goodMonths(d).includes(m))) return false;
      if (parsed.budget.length && !parsed.budget.includes(d.budgetLevel)) return false;
      if (parsed.interests.length && !parsed.interests.some(i => d.interests.includes(i))) return false;
      if (useTemp && parsed.warm && Math.max(...d.climate.temp) < 22) return false;
      if (useTemp && parsed.cold && Math.max(...d.climate.temp) > 14) return false;
      if (parsed.text) {
        const hay = [d.name, d.country, d.region, d.tagline, d.description, ...d.interests].join(' ').toLowerCase();
        if (!parsed.text.split(/\s+/).every(w => hay.includes(w))) return false;
      }
      if (s.regions.length && !s.regions.includes(d.region)) return false;
      if (s.budget.length && !s.budget.includes(d.budgetLevel)) return false;
      if (s.interests.length && !s.interests.some(i => d.interests.includes(i))) return false;
      if (s.season) {
        const m = parseInt(s.season, 10);
        if (!goodMonths(d).includes(m)) return false;
      }
      if (s.length.length) {
        const bucket = d.tripLength <= 4 ? 'short' : d.tripLength <= 7 ? 'medium' : 'long';
        if (!s.length.includes(bucket)) return false;
      }
      return true;
    });

    // Progressive relaxation: keep the traveller's core intent, loosen
    // weather / month hints only when they produce nothing.
    const levels = [
      { useTemp: true, useMonths: true },
      { useTemp: false, useMonths: true },
      { useTemp: true, useMonths: false },
      { useTemp: false, useMonths: false }
    ];
    for (let i = 0; i < levels.length; i++) {
      const list = pass(levels[i]);
      if (list.length) {
        this.relaxed = i > 0 ? levels[i] : null;
        return list;
      }
    }
    this.relaxed = null;
    return [];
  },

  sorted(list) {
    const s = this.state;
    const copy = [...list];
    if (s.sort === 'price') copy.sort((a, b) => a.budget.mid - b.budget.mid);
    else if (s.sort === 'name') copy.sort((a, b) => a.name.localeCompare(b.name));
    else if (s.sort === 'budget') copy.sort((a, b) => a.budget.budget - b.budget.budget);
    else copy.sort((a, b) => b.ratingAvg - a.ratingAvg || b.ratingCount - a.ratingCount);
    return copy;
  },

  render() {
    const list = this.sorted(this.matches());
    const grid = $('#grid-view');
    const count = $('#result-count');
    if (count) count.textContent = list.length;

    const note = $('#search-note');
    if (note) {
      const p = this.parsed || { months: [], budget: [], interests: [], warm: false, cold: false, text: '' };
      const interesting = p.months.length || p.budget.length || p.interests.length || p.warm || p.cold;
      if (interesting) {
        const r = this.relaxed;
        let extra = '';
        if (r && !r.useTemp && !r.useMonths) extra = ' (weather and month hints loosened to show results)';
        else if (r && !r.useTemp) extra = ' (temperature hint loosened to show results)';
        else if (r && !r.useMonths) extra = ' (month hint loosened to show results)';
        note.style.display = '';
        note.textContent = 'Understood as: ' + describeQuery(p) + ' — re-ranking every destination against that.' + extra;
      } else {
        note.style.display = 'none';
      }
    }
    if (grid) {
      grid.innerHTML = list.length
        ? list.map(d => destinationCard(d)).join('')
        : `<div class="empty" style="grid-column:1/-1">
             <h3>No destinations match yet</h3>
             <p>Try removing a filter — or tell us what you are after with the recommendation quiz.</p>
             <a class="btn btn--primary" href="quiz.html">Take the 60-second quiz</a>
             <button class="btn btn--ghost" id="clear-inline" style="margin-left:8px">Clear filters</button>
           </div>`;
      $('#clear-inline')?.addEventListener('click', () => this.clear());
      attachImageFallback(grid);
    }
    MapView.render(list);
  }
};

function toggleIn(arr, val) {
  const i = arr.indexOf(val);
  if (i >= 0) arr.splice(i, 1); else arr.push(val);
}

/* ---------- interactive map ---------- */
const MapView = {
  map: null,
  layer: null,
  ready: false,
  lastIds: [],

  ensure() {
    if (this.ready) { setTimeout(() => this.map && this.map.invalidateSize(), 220); return; }
    const el = document.getElementById('map');
    if (!el || typeof L === 'undefined') return;
    this.map = L.map('map', { scrollWheelZoom: false }).setView([20, 10], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
    this.layer = L.layerGroup().addTo(this.map);
    this.ready = true;
    setTimeout(() => this.map.invalidateSize(), 300);
  },

  render(list) {
    if (!this.ready) return;
    const ids = list.map(d => d.id).join(',');
    if (ids === this.lastIds.join(',')) return;
    this.lastIds = list.map(d => d.id);
    this.layer.clearLayers();
    const bounds = [];
    list.forEach(d => {
      const marker = L.marker(d.coords).addTo(this.layer);
      marker.bindPopup(`
        <div class="map-popup">
          <img src="${d.images[0]}" alt="${esc(d.name)}">
          <strong>${esc(d.name)}</strong>
          <p>${esc(d.country)} · ${money(d.budget.mid)}/day · ★ ${d.ratingAvg.toFixed(1)}</p>
          <a href="destination.html?id=${d.id}">View destination →</a>
        </div>`);
      bounds.push(d.coords);
    });
    if (bounds.length === 1) this.map.setView(bounds[0], 6);
    else if (bounds.length > 1) this.map.fitBounds(bounds, { padding: [40, 40], maxZoom: 5 });
  }
};

/* ============================================================
   DESTINATION DETAIL
   ============================================================ */
function initDestination() {
  const id = new URLSearchParams(location.search).get('id') || DESTINATIONS[0].id;
  const d = getDestination(id) || DESTINATIONS[0];

  document.title = `${d.name}, ${d.country} — Travel Guide, Costs & Best Time | Wayfarer`;

  // hero + gallery
  const hero = $('#detail-bg');
  if (hero) hero.style.backgroundImage = `url("${d.images[0]}")`;
  $('#detail-title').textContent = d.name;
  $('#detail-sub').innerHTML = `
    <span>${esc(d.country)} · ${esc(d.region)}</span>
    <span class="rating">${starSvg} ${d.ratingAvg.toFixed(1)} <span style="opacity:.75;font-weight:400">${d.ratingCount.toLocaleString()} ratings</span></span>
    <span>${esc(d.bestTime)}</span>`;

  const thumbs = $('#gallery-thumbs');
  if (thumbs) {
    thumbs.innerHTML = d.images.map((src, i) =>
      `<button class="${i === 0 ? 'on' : ''}" data-img="${src}" aria-label="View photo ${i + 1}"><img src="${src}" alt="${esc(d.name)} photo ${i + 1}" loading="lazy"></button>`).join('');
    thumbs.addEventListener('click', e => {
      const b = e.target.closest('[data-img]');
      if (!b) return;
      $$('button', thumbs).forEach(x => x.classList.toggle('on', x === b));
      hero.style.backgroundImage = `url("${b.dataset.img}")`;
    });
  }

  // save button
  const save = $('#detail-save');
  if (save) {
    save.dataset.wish = d.id;
    save.setAttribute('data-wish-label', '');
    save.innerHTML = (Wishlist.has(d.id) ? heartFillSvg : heartSvg) + '<span>' + (Wishlist.has(d.id) ? 'Saved' : 'Save to passport') + '</span>';
    document.addEventListener('wishlist:changed', () => {
      const on = Wishlist.has(d.id);
      save.innerHTML = (on ? heartFillSvg : heartSvg) + '<span>' + (on ? 'Saved' : 'Save to passport') + '</span>';
      save.classList.toggle('btn--primary', !on);
      save.classList.toggle('btn--soft', on);
    });
  }

  // travel passport — visited marker
  const visitedBtn = $('#detail-visited');
  const paintVisited = () => {
    if (!visitedBtn) return;
    const on = store.get('visited', []).includes(d.id);
    visitedBtn.textContent = on ? '✓ Visited — undo' : 'Mark as visited';
    visitedBtn.classList.toggle('btn--soft', on);
    visitedBtn.classList.toggle('btn--ghost', !on);
  };
  visitedBtn?.addEventListener('click', () => {
    const list = store.get('visited', []);
    const on = list.includes(d.id);
    store.set('visited', on ? list.filter(x => x !== d.id) : list.concat(d.id));
    paintVisited();
    toast(on ? d.name + ' removed from visited' : d.name + ' stamped in your passport ✓');
  });
  paintVisited();

  // content blocks
  $('#d-overview').textContent = d.description;
  $('#d-highlights').innerHTML = d.highlights.map(h => `<li>${esc(h)}</li>`).join('');
  $('#d-todos').innerHTML = d.thingsToDo.map(t => `
    <li>
      <div><strong>${esc(t.name)}</strong><span>${esc(t.note)}</span></div>
      <button class="add-to-trip" data-add-act="${esc(t.name)}" data-note="${esc(t.note)}">+ Trip</button>
    </li>`).join('');
  $('#d-tips').innerHTML = d.tips.map(t => `<div class="tip"><span>💡</span><div>${esc(t)}</div></div>`).join('');
  $('#d-getting').textContent = d.gettingAround;

  // quick facts
  const facts = [
    ['Best time', d.bestTime],
    ['Budget / day', `${money(d.budget.budget)} · ${money(d.budget.mid)} · ${money(d.budget.luxury)}`],
    ['Trip length', d.lengthNote],
    ['Currency', d.currency],
    ['Language', d.language],
    ['Visa', d.visa],
    ['Interests', d.interests.map(i => i[0].toUpperCase() + i.slice(1)).join(', ')]
  ];
  $('#d-facts').innerHTML = facts.map(([k, v]) =>
    `<div class="fact-row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');

  // map
  const mapEl = document.getElementById('detail-map');
  if (mapEl && typeof L !== 'undefined') {
    const map = L.map('detail-map', { scrollWheelZoom: false, dragging: true }).setView(d.coords, 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker(d.coords).addTo(map).bindPopup(`<strong>${esc(d.name)}</strong><br>${esc(d.country)}`).openPopup();
    setTimeout(() => map.invalidateSize(), 400);
  }

  // seasonality chart
  initSeasonChart(d);
  // budget calculator
  initBudgetCalc(d);
  // reviews
  initReviews(d);
  // packing generator
  initPacking(d);
  // visa checker
  initVisa(d);
  // related
  const rel = d.related.map(getDestination).filter(Boolean);
  $('#d-related').innerHTML = rel.length
    ? rel.map(r => destinationCard(r)).join('')
    : DESTINATIONS.filter(x => x.id !== d.id).slice(0, 3).map(x => destinationCard(x)).join('');

  // add whole "things to do" to itinerary
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add-act]');
    if (!b) return;
    addActivityToItinerary(d, b.dataset.addAct, b.dataset.note || '');
    b.textContent = 'Added ✓';
    b.disabled = true;
  });

  // breadcrumb
  const crumb = $('#crumb-dest');
  if (crumb) { crumb.textContent = d.name; crumb.href = 'destination.html?id=' + d.id; }

  injectDestinationSchema(d);

  attachImageFallback();
}

/* ---------- seasonality chart ---------- */
function initSeasonChart(d) {
  const wrap = $('#season-chart');
  if (!wrap) return;
  let mode = 'temp';

  const draw = () => {
    const data = mode === 'temp' ? d.climate.temp
      : mode === 'rain' ? d.climate.rain
      : d.crowd.map(c => c * 20);
    const max = Math.max(...data) || 1;
    wrap.innerHTML = `
      <div class="chart-grid">
        ${data.map(v => `<div class="chart-col"><div class="chart-bar" style="height:${Math.max(4, (v / max) * 100)}%"><span class="val">${mode === 'crowd' ? ['—', 'Quiet', 'Easy', 'Busy', 'Peak', 'Packed'][Math.round(v / 20)] || v : v}</span></div></div>`).join('')}
      </div>
      <div class="chart-labels">${MONTHS.map(m => `<span>${m}</span>`).join('')}</div>
      <div class="chart-legend">
        <span><i style="background:var(--teal)"></i>${mode === 'temp' ? 'Average high (°C)' : mode === 'rain' ? 'Rainfall (mm)' : 'Crowd level'}</span>
        <span><i style="background:var(--coral)"></i>Hover a bar for detail</span>
      </div>
      ${monthChipRow(d)}`;
  };

  $$('[data-chart]').forEach(btn => btn.addEventListener('click', () => {
    mode = btn.dataset.chart;
    $$('[data-chart]').forEach(b => b.classList.toggle('on', b === btn));
    draw();
  }));
  draw();
}

/* ---------- budget calculator ---------- */
function initBudgetCalc(d) {
  const days = $('#calc-days');
  const style = $('#calc-style');
  const people = $('#calc-people');
  if (!days || !style || !people) return;

  const split = {
    budget: [35, 32, 16, 17],
    mid: [40, 28, 14, 18],
    luxury: [45, 25, 12, 18]
  };
  const labels = ['Accommodation', 'Food & drink', 'Transport', 'Activities'];
  const colors = ['var(--teal)', 'var(--coral)', 'var(--gold)', '#7b6cf6'];

  const draw = () => {
    const s = style.value;
    const daily = d.budget[s];
    const totalDays = parseInt(days.value, 10);
    const pax = parseInt(people.value, 10);
    $('#calc-days-val').textContent = totalDays + ' days';
    $('#calc-people-val').textContent = pax + (pax > 1 ? ' travellers' : ' traveller');

    const parts = split[s];
    $('#breakdown').innerHTML = labels.map((l, i) => {
      const amount = daily * (parts[i] / 100);
      return `<div class="breakdown-row">
        <span>${l}</span>
        <span class="track"><span class="fill" style="width:${parts[i]}%;background:${colors[i]}"></span></span>
        <span class="amt">${money(amount)}</span>
      </div>`;
    }).join('');

    const trip = daily * totalDays * pax;
    $('#calc-total').innerHTML = `
      <div><span style="font-size:.85rem;color:var(--muted);display:block">Estimated trip total</span>
      <strong>${money(trip)}</strong></div>
      <div style="text-align:right;font-size:.9rem;color:var(--muted)">
        ${money(daily)} / day × ${totalDays} days × ${pax}<br>
        <span style="color:var(--teal-dark);font-weight:700">${money(daily * pax)} per day for your party</span>
      </div>`;
  };

  [days, style, people].forEach(el => el.addEventListener('input', draw));
  draw();
}

/* ---------- reviews ---------- */
function initReviews(d) {
  const list = $('#review-list');
  if (!list) return;
  const stored = store.get('reviews_' + d.id, []);
  const all = [...stored, ...d.reviews];

  const draw = () => {
    list.innerHTML = all.map(r => `
      <div class="review">
        <div class="review-head">
          <img src="https://${r.avatar}" alt="${esc(r.name)}" loading="lazy">
          <div><strong>${esc(r.name)}</strong><time>${new Date(r.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time></div>
          <span style="margin-left:auto">${ratingStars(r.rating)}</span>
        </div>
        <p>${esc(r.text)}</p>
        ${r.photo ? `<img src="${r.photo}" alt="Traveller photo of ${esc(d.name)}" loading="lazy" style="border-radius:12px;max-height:280px;object-fit:cover">` : ''}
      </div>`).join('');
    const avg = all.reduce((s, r) => s + r.rating, 0) / all.length;
    $('#review-summary').innerHTML = `${ratingStars(avg)} <strong>${avg.toFixed(1)}</strong> · ${all.length} reviews`;
    attachImageFallback(list);
  };
  draw();

  const pick = $('#rating-pick');
  let chosen = 5;
  if (pick) {
    const paint = () => Array.from({ length: 5 }, (_, i) =>
      `<button type="button" class="${i < chosen ? 'on' : ''}" data-r="${i + 1}" aria-label="${i + 1} stars">★</button>`).join('');
    pick.innerHTML = paint();
    pick.addEventListener('click', e => {
      const b = e.target.closest('[data-r]');
      if (!b) return;
      chosen = parseInt(b.dataset.r, 10);
      pick.innerHTML = paint();
    });
  }

  $('#review-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#rv-name').value.trim();
    const text = $('#rv-text').value.trim();
    if (!name || text.length < 12) { toast('Add your name and a sentence or two.', 'warn'); return; }

    const file = $('#rv-photo') && $('#rv-photo').files ? $('#rv-photo').files[0] : null;
    const finish = photo => {
      const entry = { name, text, rating: chosen, date: new Date().toISOString().slice(0, 10), avatar: 'i.pravatar.cc/80?img=5', photo: photo || null };
      stored.unshift(entry);
      store.set('reviews_' + d.id, stored);
      all.unshift(entry);
      e.target.reset();
      draw();
      toast('Thanks — your review is live on this device.');
      document.getElementById('review-list')?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
    };

    if (file) {
      if (file.size > 400 * 1024) { toast('Photo must be under 400 KB — try a smaller one.', 'warn'); return; }
      const fr = new FileReader();
      fr.onload = () => finish(fr.result);
      fr.onerror = () => finish(null);
      fr.readAsDataURL(file);
    } else {
      finish(null);
    }
  });
}

/* ---------- packing list generator ---------- */
function initPacking(d) {
  const out = $('#packing-out');
  if (!out) return;
  let currentItems = [];

  out.addEventListener('change', () => {
    const checked = $$('[data-pk]', out).filter(c => c.checked)
      .map(c => currentItems[parseInt(c.dataset.pk, 10)]);
    store.set('packing_' + d.id, checked);
  });

  const build = () => {
    const season = $('#pk-season').value;
    const tripType = $('#pk-type').value;
    const items = [...PACKING_BASE];
    const winterish = Math.min(...d.climate.temp) < 12;
    const wettest = Math.max(...d.climate.rain) > 180;

    items.push(...PACKING_ADDONS[tripType === 'beach' ? 'beach' : tripType === 'hiking' ? 'hiking' : 'city']);
    const isCold = winterish || season === 'winter';
    if (isCold) {
      items.push(...PACKING_ADDONS.cold);
      const flip = items.indexOf('Flip flops');
      if (flip >= 0) items.splice(flip, 1);
    }
    if (wettest || season === 'monsoon') items.push(...PACKING_ADDONS.rain);
    if (d.interests.includes('culture')) items.push(...PACKING_ADDONS.culture);
    items.push(`${Math.max(3, Math.round(d.tripLength / 2))} sets of clothes`);
    items.push('Copy of ' + d.country + ' SIM / eSIM note');

    const unique = [...new Set(items)];
    currentItems = unique;
    const saved = store.get('packing_' + d.id, []);
    out.innerHTML = unique.map((it, i) => `
      <label style="display:flex;gap:11px;align-items:center;padding:10px 12px;border:1.5px solid var(--line);border-radius:10px;background:#fff;cursor:pointer">
        <input type="checkbox" data-pk="${i}" ${saved.includes(it) ? 'checked' : ''}>
        <span>${esc(it)}</span>
      </label>`).join('');
  };

  ['#pk-season', '#pk-type'].forEach(sel => $(sel)?.addEventListener('change', build));
  build();

  $('#packing-download')?.addEventListener('click', () => {
    const lines = $$('label span', out).map(s => '☐ ' + s.textContent);
    const text = `Packing list — ${d.name}\n\n` + lines.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `packing-${d.id}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast('Packing list downloaded.');
  });
}

/* ---------- visa checker ---------- */
function initVisa(d) {
  const sel = $('#visa-nationality');
  const out = $('#visa-result');
  if (!sel || !out) return;
  sel.innerHTML = NATIONALITIES.map(n => `<option value="${n}">${n}</option>`).join('');

  const check = () => {
    const nat = sel.value;
    const visaFree = (VISA_MATRIX[nat] || []).includes(d.id);
    out.innerHTML = visaFree
      ? `<div class="tip" style="border-left-color:var(--teal);background:var(--teal-soft)">
           <span>✅</span><div><strong>${esc(nat)} → ${esc(d.name)}: visa-free / visa on arrival</strong><br>${esc(d.visa)}. Confirm with the embassy before booking — rules change.</div></div>`
      : `<div class="tip" style="border-left-color:var(--coral);background:var(--coral-soft)">
           <span>⚠️</span><div><strong>${esc(nat)} → ${esc(d.name)}: visa required in advance</strong><br>General rule here: “${esc(d.visa)}”. Apply online or at the embassy; allow 2–4 weeks.</div></div>`;
  };
  sel.addEventListener('change', check);
  check();
}

/* ---------- add activity to itinerary ---------- */
function addActivityToItinerary(dest, name, note) {
  const itin = store.get('itinerary', { title: 'My trip', days: [] });
  if (!itin.days.length) itin.days = [{ items: [] }, { items: [] }, { items: [] }];
  itin.days[0].items.push({ name: dest.name + ' — ' + name, note, dest: dest.id });
  store.set('itinerary', itin);
  toast(`Added to day 1. ${itin.days.length} days in your itinerary.`);
}

/* ============================================================
   QUIZ — rule-based recommendation engine (Phase 1)
   ============================================================ */
function initQuiz() {
  const shell = $('#quiz');
  if (!shell) return;

  const answers = { interests: [], budget: '', length: '', months: [], style: '' };
  let step = 0;
  const steps = $$('.quiz-step', shell);
  const bar = $('#quiz-progress');

  const update = () => {
    steps.forEach((s, i) => s.classList.toggle('on', i === step));
    if (bar) bar.style.width = ((step) / (steps.length - 1) * 100) + '%';
    const back = $('#quiz-back');
    if (back) back.style.visibility = step === 0 ? 'hidden' : 'visible';
    const next = $('#quiz-next');
    if (next) next.textContent = step === steps.length - 1 ? 'See my matches →' : 'Continue →';
    window.scrollTo({ top: shell.offsetTop - 120, behavior: 'smooth' });
  };

  const canAdvance = () => {
    if (step === 0) return answers.interests.length > 0;
    if (step === 1) return !!answers.budget;
    if (step === 2) return !!answers.length;
    if (step === 3) return answers.months.length > 0;
    if (step === 4) return !!answers.style;
    return true;
  };

  // option handlers
  $$('[data-opt]', shell).forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.opt;
      const val = btn.dataset.value;
      if (key === 'interests') {
        const i = answers.interests.indexOf(val);
        if (i >= 0) answers.interests.splice(i, 1); else answers.interests.push(val);
        btn.classList.toggle('on');
      } else if (key === 'months') {
        const m = parseInt(val, 10);
        const i = answers.months.indexOf(m);
        if (i >= 0) answers.months.splice(i, 1); else answers.months.push(m);
        btn.classList.toggle('on');
      } else {
        answers[key] = val;
        $$(`[data-opt="${key}"]`, shell).forEach(b => b.classList.toggle('on', b === btn));
      }
    });
  });

  $('#quiz-next')?.addEventListener('click', () => {
    if (!canAdvance()) { toast('Pick at least one option to continue.', 'warn'); return; }
    if (step < steps.length - 1) { step++; update(); }
    else showResults();
  });
  $('#quiz-back')?.addEventListener('click', () => { if (step > 0) { step--; update(); } });
  update();

  function score(d) {
    let s = 0;
    const why = [];
    const overlap = d.interests.filter(i => answers.interests.includes(i));
    s += overlap.length * 3;
    if (overlap.length) why.push('matches your love of ' + overlap.join(' & '));

    if (d.budgetLevel === answers.budget) { s += 5; why.push('fits your ' + answers.budget + ' budget'); }
    else if (Math.abs(['budget', 'mid', 'luxury'].indexOf(d.budgetLevel) - ['budget', 'mid', 'luxury'].indexOf(answers.budget)) === 1) s += 2;

    const lenOk = (answers.length === 'short' && d.tripLength <= 5)
      || (answers.length === 'medium' && d.tripLength >= 4 && d.tripLength <= 8)
      || (answers.length === 'long' && d.tripLength >= 7);
    if (lenOk) { s += 4; why.push('right size at ' + d.lengthNote); }

    const good = goodMonths(d);
    const hits = answers.months.filter(m => good.includes(m));
    if (hits.length) { s += hits.length * 2; why.push('good conditions in ' + hits.map(m => MONTHS[m]).join(', ')); }

    if (answers.style === 'solo' && d.interests.includes('culture')) s += 1;
    if (answers.style === 'slow' && d.tripLength >= 6) { s += 3; why.push('rewards a slower pace'); }
    if (answers.style === 'group' && d.interests.includes('nightlife')) { s += 2; why.push('good for a group'); }
    if (answers.style === 'family' && (d.interests.includes('relaxation') || d.interests.includes('nature'))) s += 2;
    if (answers.style === 'couple' && (d.interests.includes('relaxation') || d.interests.includes('food'))) { s += 2; why.push('a good fit for two'); }

    s += Math.round((d.ratingAvg - 4.4) * 4);
    return { score: s, why };
  }

  function showResults() {
    const ranked = DESTINATIONS
      .map(d => ({ d, ...score(d) }))
      .sort((a, b) => b.score - a.score);
    const max = ranked[0].score || 1;
    const top = ranked.slice(0, 6);
    const pct = x => Math.max(55, Math.min(99, Math.round((x.score / max) * 96) + 4));

    $('#quiz').innerHTML = `
      <div class="quiz-card">
        <span class="eyebrow">Your matches</span>
        <h2>Here is where ${esc(answers.months.map(m => MONTHS[m]).slice(0, 2).join(' & ') || 'your dates')} should take you</h2>
        <p class="sub">Scored on your interests (${answers.interests.map(i => i[0].toUpperCase() + i.slice(1)).join(', ')}), a ${answers.budget} budget, a ${answers.length === 'short' ? 'short' : answers.length === 'medium' ? 'medium' : 'longer'} trip, and travel style. No black box — every reason is shown.</p>
        <div class="grid-3" style="margin-top:26px">
          ${top.map(item => { const d = item.d; return `
            <div class="card">
              <div class="card-media">
                <a href="destination.html?id=${d.id}" tabindex="-1" aria-hidden="true"><img src="${d.images[0]}" alt="${esc(d.name)}" loading="lazy"></a>
                <div class="card-badges"><span class="badge badge--coral">${pct(item)}% match</span></div>
                <button class="card-save" data-wish="${d.id}" aria-label="Save ${esc(d.name)}">${Wishlist.has(d.id) ? heartFillSvg : heartSvg}</button>
              </div>
              <div class="card-body">
                <span class="card-loc">${esc(d.country)}</span>
                <h3 class="card-title"><a href="destination.html?id=${d.id}">${esc(d.name)}</a></h3>
                <p class="card-desc">${esc(d.tagline)}</p>
                <p class="why">Why: ${esc(item.why.join(', ') || 'highly rated by travellers like you')}</p>
                <div class="card-meta">
                  <span class="price"><strong>${money(d.budget.mid)}</strong> <span>/ day</span></span>
                  <span class="meta-pills"><span class="pill">${d.tripLength} days</span></span>
                </div>
              </div>
            </div>`; }).join('')}
        </div>
        <div class="quiz-nav" style="margin-top:30px;justify-content:center">
          <a class="btn btn--primary" href="destinations.html">Browse all destinations</a>
          <a class="btn btn--ghost" href="quiz.html">Retake the quiz</a>
          <a class="btn btn--dark" href="itinerary.html">Build an itinerary</a>
        </div>
      </div>`;
    attachImageFallback($('#quiz'));
    store.set('lastQuiz', { ...answers, at: Date.now() });
    track('quiz_completed', { top_match: top[0].d.id, interests: answers.interests.join('|') });
    toast('Matches found — 6 destinations ranked for you.');
    window.scrollTo({ top: shell.offsetTop - 120, behavior: 'smooth' });
  }
}

/* ============================================================
   ITINERARY BUILDER
   ============================================================ */
function initItinerary() {
  const root = $('#itin-root');
  if (!root) return;

  let itin = store.get('itinerary', null);
  if (!itin) itin = { title: 'My trip', days: [{ items: [] }, { items: [] }, { items: [] }] };
  if (!itin.days || !itin.days.length) itin.days = [{ items: [] }];

  const save = () => {
    store.set('itinerary', itin);
    render();
  };

  const stats = () => {
    const items = itin.days.reduce((s, d) => s + d.items.length, 0);
    const dests = new Set(itin.days.flatMap(d => d.items.map(i => i.dest).filter(Boolean)));
    $('#itin-stats').innerHTML = `
      <div class="passport-stats">
        <div><strong>${itin.days.length}</strong><span>Days</span></div>
        <div><strong>${items}</strong><span>Activities</span></div>
        <div><strong>${dests.size}</strong><span>Places</span></div>
      </div>`;
  };

  const render = () => {
    root.innerHTML = itin.days.map((day, di) => `
      <section class="day-col" data-day="${di}">
        <header>
          <strong>Day ${di + 1}</strong>
          <span class="day-cost">${day.items.length} item${day.items.length === 1 ? '' : 's'}</span>
          <button class="remove" data-day-del="${di}" title="Remove day" style="color:rgba(255,255,255,.7);font-size:1.2rem;line-height:1">&times;</button>
        </header>
        <div class="day-drop" data-drop="${di}">
          ${day.items.length
            ? day.items.map((it, ii) => `
              <div class="act-chip" draggable="true" data-day="${di}" data-idx="${ii}">
                <span class="grip" aria-hidden="true">⠿</span>
                <span class="act-name">${esc(it.name)}${it.note ? ` <span style="color:var(--muted);font-size:.82rem">· ${esc(it.note)}</span>` : ''}</span>
                <button class="remove" data-item-del="${di}:${ii}" aria-label="Remove">&times;</button>
              </div>`).join('')
            : '<div class="day-empty">Drag something here, or add from the library →</div>'}
        </div>
      </section>`).join('');

    $('#itin-title').value = itin.title;
    renderPool();
    stats();
    attachImageFallback(root);
  };

  const renderPool = () => {
    const pool = $('#itin-pool');
    if (!pool) return;
    const saved = Wishlist.all().map(getDestination).filter(Boolean);
    const source = saved.length ? saved : DESTINATIONS.slice(0, 8);
    $('#itin-pool-note').textContent = saved.length
      ? `${saved.length} saved destination${saved.length > 1 ? 's' : ''} in your passport`
      : 'Showing top destinations — save a few to narrow this list';
    pool.innerHTML = source.map(d => `
      <div class="pool-item" draggable="true" data-dest="${d.id}">
        <span aria-hidden="true">📍</span>
        <span>${esc(d.name)}</span>
        <span class="pill">${money(d.budget.mid)}/day</span>
      </div>`).join('') +
      source.flatMap(d => d.thingsToDo.slice(0, 3).map(t => `
        <div class="pool-item" draggable="true" data-dest="${d.id}" data-act="${esc(t.name)}">
          <span aria-hidden="true">✳</span>
          <span>${esc(t.name)}</span>
          <span class="pill">${esc(d.name)}</span>
        </div>`)).join('');

    // pool → day
    $$('[data-dest]', pool).forEach(el => {
      el.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', JSON.stringify({
          kind: el.dataset.act ? 'act' : 'dest',
          dest: el.dataset.dest,
          act: el.dataset.act || ''
        }));
      });
      if (!el.dataset.act) {
        el.addEventListener('click', () => {
          const d = getDestination(el.dataset.dest);
          itin.days[0].items.push({ name: d.name, note: d.lengthNote, dest: d.id });
          save();
          toast(d.name + ' added to day 1');
        });
      }
    });
  };

  // drop targets
  root.addEventListener('dragover', e => {
    const zone = e.target.closest('[data-drop]');
    if (!zone) return;
    e.preventDefault();
    zone.classList.add('drag-over');
  });
  root.addEventListener('dragleave', e => {
    const zone = e.target.closest('[data-drop]');
    if (zone) zone.classList.remove('drag-over');
  });
  root.addEventListener('drop', e => {
    const zone = e.target.closest('[data-drop]');
    if (!zone) return;
    e.preventDefault();
    zone.classList.remove('drag-over');
    let data;
    try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch (err) { return; }

    // internal reorder?
    const chip = e.target.closest('.act-chip');
    if (chip && data.kind === 'chip') {
      const from = { d: +chip.dataset.day, i: +chip.dataset.idx };
      const to = { d: +zone.dataset.drop, i: itin.days[+zone.dataset.drop].items.length };
      if (from.d === to.d && from.i === to.i) return;
      const [moved] = itin.days[from.d].items.splice(from.i, 1);
      itin.days[to.d].items.splice(to.i, 0, moved);
      save();
      return;
    }

    const targetDay = itin.days[+zone.dataset.drop];
    if (!targetDay) return;
    if (data.kind === 'dest') {
      const d = getDestination(data.dest);
      if (!d) return;
      targetDay.items.push({ name: d.name, note: d.lengthNote, dest: d.id });
      toast(d.name + ' → day ' + (+zone.dataset.drop + 1));
    } else if (data.kind === 'act') {
      const d = getDestination(data.dest);
      const note = d ? d.thingsToDo.find(t => t.name === data.act)?.note || '' : '';
      targetDay.items.push({ name: (d ? d.name + ' — ' : '') + data.act, note, dest: data.dest });
    }
    save();
  });

  root.addEventListener('dragstart', e => {
    const chip = e.target.closest('.act-chip');
    if (!chip) return;
    e.dataTransfer.setData('text/plain', JSON.stringify({ kind: 'chip' }));
  });

  root.addEventListener('click', e => {
    const itemDel = e.target.closest('[data-item-del]');
    if (itemDel) {
      const [d, i] = itemDel.dataset.itemDel.split(':').map(Number);
      itin.days[d].items.splice(i, 1);
      save();
      return;
    }
    const dayDel = e.target.closest('[data-day-del]');
    if (dayDel) {
      if (itin.days.length === 1) { toast('An itinerary needs at least one day.', 'warn'); return; }
      itin.days.splice(+dayDel.dataset.dayDel, 1);
      save();
    }
  });

  $('#add-day')?.addEventListener('click', () => { itin.days.push({ items: [] }); save(); });
  $('#itin-title')?.addEventListener('input', e => { itin.title = e.target.value; store.set('itinerary', itin); });

  $('#clear-itin')?.addEventListener('click', () => {
    itin.days.forEach(d => { d.items = []; });
    save();
    toast('Itinerary cleared.', 'warn');
  });

  $('#share-itin')?.addEventListener('click', async () => {
    const payload = btoa(unescape(encodeURIComponent(JSON.stringify(itin))));
    const url = location.origin + location.pathname + '#itin=' + payload;
    try {
      await navigator.clipboard.writeText(url);
      toast('Share link copied to clipboard.');
    } catch (err) {
      openModal('Share your itinerary', `<p>Copy this link:</p><input class="field" readonly value="${esc(url)}">`);
    }
  });

  $('#print-itin')?.addEventListener('click', () => window.print());

  // import from hash
  if (location.hash.startsWith('#itin=')) {
    try {
      const data = JSON.parse(decodeURIComponent(escape(atob(location.hash.slice(6)))));
      if (data && data.days) { itin = data; store.set('itinerary', itin); toast('Shared itinerary imported.'); }
    } catch (err) { toast('That share link could not be read.', 'warn'); }
  }

  render();
}

/* ============================================================
   BLOG
   ============================================================ */
function initBlog() {
  const grid = $('#blog-grid');
  if (!grid) return;
  let activeTag = 'all';

  const draw = () => {
    const list = activeTag === 'all' ? POSTS : POSTS.filter(p => p.tags.includes(activeTag));
    grid.innerHTML = list.map(postCard).join('');
    attachImageFallback(grid);
    const n = $('#blog-count');
    if (n) n.textContent = list.length;
  };

  const tags = $('#blog-tags');
  const allTags = ['all', ...new Set(POSTS.flatMap(p => p.tags))];
  tags.innerHTML = allTags.map(t =>
    `<button class="chip ${t === 'all' ? 'on' : ''}" data-tag="${t}">${t === 'all' ? 'All guides' : t}</button>`).join('');
  tags.addEventListener('click', e => {
    const b = e.target.closest('[data-tag]');
    if (!b) return;
    activeTag = b.dataset.tag;
    $$('[data-tag]', tags).forEach(x => x.classList.toggle('on', x === b));
    draw();
  });
  draw();
}

function initPost() {
  const root = $('#post');
  if (!root) return;
  const slug = new URLSearchParams(location.search).get('slug') || POSTS[0].slug;
  const p = POSTS.find(x => x.slug === slug) || POSTS[0];

  document.title = `${p.title} | Wayfarer Guides`;
  $('#post-title').textContent = p.title;
  $('#post-excerpt').textContent = p.excerpt;
  $('#post-meta').innerHTML = `
    <span>${new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
    <span>${p.readTime} min read</span>
    <span>${p.tags.map(t => '· ' + t).join(' ')}</span>`;
  const cover = $('#post-cover');
  cover.src = p.cover;
  cover.alt = p.title;

  // markdown-lite: ## headings, **bold**, paragraphs
  $('#post-body').innerHTML = p.body.map(chunk => {
    if (chunk.startsWith('## ')) {
      return chunk.split('\n').map((line, i) =>
        i === 0 ? `<h2>${inline(line.slice(3))}</h2>` : `<p>${inline(line)}</p>`
      ).join('');
    }
    return '<p>' + inline(chunk) + '</p>';
  }).join('');

  function inline(text) {
    return esc(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  // related destinations & guides
  const related = p.destination ? [getDestination(p.destination)].filter(Boolean) : DESTINATIONS.slice(0, 3);
  $('#post-related').innerHTML = related.map(d => destinationCard(d)).join('');
  $('#post-more').innerHTML = POSTS.filter(x => x.slug !== p.slug).slice(0, 3).map(postCard).join('');

  // structured data for SEO rich results
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    author: { '@type': 'Organization', name: 'Wayfarer' }
  });
  document.head.appendChild(ld);

  attachImageFallback(root);
}

/* ============================================================
   FAQ
   ============================================================ */
function initFaq() {
  const wrap = $('#faq-list');
  if (!wrap) return;
  wrap.innerHTML = FAQS.map((f, i) => `
    <div class="acc-item ${i === 0 ? 'open' : ''}">
      <button class="acc-btn" aria-expanded="${i === 0}">${esc(f.q)}<span class="acc-ico">+</span></button>
      <div class="acc-panel" ${i === 0 ? 'style="max-height:400px"' : ''}><p>${esc(f.a)}</p></div>
    </div>`).join('');

  wrap.addEventListener('click', e => {
    const btn = e.target.closest('.acc-btn');
    if (!btn) return;
    const item = btn.parentElement;
    const panel = $('.acc-panel', item);
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
  });

  // FAQ rich results
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  });
  document.head.appendChild(ld);
}

/* ============================================================
   DESTINATION JSON-LD (SEO)
   ============================================================ */
function injectDestinationSchema(d) {
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: d.name,
    description: d.tagline,
    address: { '@type': 'PostalAddress', addressCountry: d.country },
    geo: { '@type': 'GeoCoordinates', latitude: d.coords[0], longitude: d.coords[1] },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: d.ratingAvg,
      reviewCount: d.ratingCount
    }
  });
  document.head.appendChild(ld);
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (window.__wfPageBooted) return;
  window.__wfPageBooted = true;
  const page = document.body.dataset.page;
  try {
    switch (page) {
      case 'home': initHome(); break;
      case 'destinations': Filters.init(); break;
      case 'destination': initDestination(); break;
      case 'quiz': initQuiz(); break;
      case 'itinerary': initItinerary(); break;
      case 'blog': initBlog(); break;
      case 'post': initPost(); break;
      case 'faq': initFaq(); break;
      default: break;
    }
  } catch (err) {
    console.error('Page controller failed:', err);
  }
  Wishlist.sync();
});
