/* ============================================================
   Wayfarer — shared UI layer
   nav, search + autocomplete, wishlist/passport, cookie
   consent, newsletter, toasts, reveals, PWA registration.
   ============================================================ */

/* ---------- tiny helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem('wf_' + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('wf_' + key, JSON.stringify(value)); } catch (e) { /* quota */ }
  }
};

const money = n => '$' + Math.round(n).toLocaleString('en-US');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const starSvg = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/></svg>';
const heartSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
const heartFillSvg = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';

function ratingStars(rating) {
  const full = Math.round(rating);
  let out = '<span class="stars" aria-label="' + rating + ' out of 5">';
  for (let i = 0; i < 5; i++) {
    out += '<span style="opacity:' + (i < full ? 1 : 0.25) + '">' + starSvg + '</span>';
  }
  return out + '</span>';
}

function toast(msg, kind = 'ok') {
  let stack = $('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
  }
  const el = document.createElement('div');
  el.className = 'toast ' + kind;
  el.setAttribute('role', 'status');
  el.textContent = msg;
  stack.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .3s ease, transform .3s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    setTimeout(() => el.remove(), 320);
  }, 3200);
}

/* ---------- destination lookup ---------- */
function getDestination(id) {
  return (typeof DESTINATIONS !== 'undefined' ? DESTINATIONS : []).find(d => d.id === id);
}

/* ---------- image fallback (never show broken images) ---------- */
function attachImageFallback(root = document) {
  $$('img', root).forEach(img => {
    if (img.dataset.fbBound) return;
    img.dataset.fbBound = '1';
    img.addEventListener('error', () => {
      if (img.dataset.fbDone) return;
      img.dataset.fbDone = '1';
      const seed = encodeURIComponent((img.alt || 'wayfarer').slice(0, 24));
      img.src = 'https://picsum.photos/seed/' + seed + '/900/700';
    });
  });
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function initNav() {
  const nav = $('.navbar');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('solid', window.scrollY > 40 || nav.dataset.alwaysSolid === '1');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const burger = $('.nav-burger');
  const drawer = $('#drawer');
  if (burger && drawer) {
    const open = () => { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const close = () => { drawer.classList.remove('open'); document.body.style.overflow = ''; };
    burger.addEventListener('click', open);
    $('.drawer-close', drawer)?.addEventListener('click', close);
    drawer.addEventListener('click', e => { if (e.target === drawer) close(); });
    $$('.drawer-panel a', drawer).forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  // active link highlighting
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('a[data-nav]').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('is-active');
  });

  // back to top
  const toTop = $('.to-top');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('show', window.scrollY > 700);
    }, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

/* ============================================================
   WISHLIST / TRAVEL PASSPORT
   ============================================================ */
const Wishlist = {
  all() { return store.get('wishlist', []); },
  has(id) { return this.all().includes(id); },
  add(id) {
    const list = this.all();
    if (!list.includes(id)) { list.push(id); store.set('wishlist', list); }
    this.sync();
    track('save_destination', { destination_id: id });
    return true;
  },
  remove(id) {
    store.set('wishlist', this.all().filter(x => x !== id));
    this.sync();
  },
  toggle(id) {
    if (this.has(id)) { this.remove(id); return false; }
    this.add(id);
    return true;
  },
  count() { return this.all().length; },
  sync() {
    $$('.wish-count').forEach(el => {
      const n = this.count();
      el.textContent = n;
      el.classList.toggle('on', n > 0);
    });
    $$('[data-wish]').forEach(btn => {
      if (btn.hasAttribute('data-wish-label')) return; // custom renderer
      const on = this.has(btn.dataset.wish);
      btn.classList.toggle('saved', on);
      btn.setAttribute('aria-pressed', String(on));
      btn.innerHTML = on ? heartFillSvg : heartSvg;
      btn.setAttribute('title', on ? 'Remove from wishlist' : 'Save to wishlist');
    });
    document.dispatchEvent(new CustomEvent('wishlist:changed'));
  },
  init() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-wish]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.wish;
      const dest = getDestination(id);
      const nowOn = this.toggle(id);
      toast(nowOn ? (dest ? dest.name + ' saved to your travel passport' : 'Saved') : (dest ? dest.name + ' removed from wishlist' : 'Removed'), nowOn ? 'ok' : 'warn');
    });
    this.sync();
  }
};

function openWishlistModal() {
  const list = Wishlist.all().map(getDestination).filter(Boolean);
  const regions = new Set(list.map(d => d.region));
  const saved = list.length
    ? '<div class="passport-stats">' +
        '<div><strong>' + list.length + '</strong><span>Saved</span></div>' +
        '<div><strong>' + regions.size + '</strong><span>Regions</span></div>' +
        '<div><strong>' + list.reduce((s, d) => s + d.tripLength, 0) + '</strong><span>Days needed</span></div>' +
      '</div>' +
      '<div class="saved-list">' + list.map(d => `
        <div class="saved-item">
          <img src="${d.images[0]}" alt="${esc(d.name)}" loading="lazy">
          <div>
            <strong><a href="destination.html?id=${d.id}">${esc(d.name)}</a></strong>
            <span>${esc(d.country)} · ${money(d.budget.mid)}/day mid-range</span>
          </div>
          <button class="remove" data-remove="${d.id}" aria-label="Remove ${esc(d.name)}">&times;</button>
        </div>`).join('') + '</div>'
    : `<div class="empty" style="padding:34px 18px">
         <h3>Your passport is empty</h3>
         <p>Tap the heart on any destination to keep it here — it stays saved on this device.</p>
         <a class="btn btn--primary" href="destinations.html">Browse destinations</a>
       </div>`;

  openModal('Your travel passport', saved);
  $$('[data-remove]').forEach(b => b.addEventListener('click', () => {
    Wishlist.remove(b.dataset.remove);
    b.closest('.saved-item').remove();
    toast('Removed from passport', 'warn');
  }));
}

/* ============================================================
   MODAL
   ============================================================ */
function openModal(title, html) {
  let modal = $('#modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = '<div class="modal-card"><button class="modal-close" aria-label="Close">&times;</button><div class="modal-body"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.closest('.modal-close')) closeModal();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }
  $('.modal-body', modal).innerHTML = '<h3>' + esc(title) + '</h3>' + html;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  attachImageFallback(modal);
}
function closeModal() {
  const modal = $('#modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================================
   SEARCH + AUTOCOMPLETE
   ============================================================ */
function searchIndex() {
  const items = [];
  if (typeof DESTINATIONS !== 'undefined') {
    DESTINATIONS.forEach(d => {
      items.push({
        type: 'destination',
        id: d.id,
        title: d.name,
        sub: d.country + ' · ' + d.region,
        img: d.images[0],
        href: 'destination.html?id=' + d.id,
        keywords: [d.name, d.country, d.region, d.tagline, d.bestTime, d.budgetLevel, ...d.interests].join(' ').toLowerCase()
      });
    });
  }
  if (typeof POSTS !== 'undefined') {
    POSTS.forEach(p => {
      items.push({
        type: 'guide',
        id: p.slug,
        title: p.title,
        sub: 'Guide · ' + p.readTime + ' min read',
        img: p.cover,
        href: 'blog-post.html?slug=' + p.slug,
        keywords: [p.title, p.excerpt, p.tags.join(' ')].join(' ').toLowerCase()
      });
    });
  }
  items.push(
    { type: 'page', title: 'Find your match — recommendation quiz', sub: 'Page', img: '', href: 'quiz.html', keywords: 'quiz match recommendation personalize suggest' },
    { type: 'page', title: 'Itinerary builder', sub: 'Page', img: '', href: 'itinerary.html', keywords: 'itinerary plan days builder schedule' },
    { type: 'page', title: 'Budget calculator', sub: 'Page', img: '', href: 'destinations.html#budget', keywords: 'budget cost calculator money prices' },
    { type: 'page', title: 'Travel guides & blog', sub: 'Page', img: '', href: 'blog.html', keywords: 'blog guides articles long form' },
    { type: 'page', title: 'FAQ', sub: 'Page', img: '', href: 'faq.html', keywords: 'help faq questions support' }
  );
  return items;
}

function initSearch() {
  const inputs = $$('[data-search-input]');
  if (!inputs.length) return;
  const index = searchIndex();

  inputs.forEach(input => {
    const wrap = input.closest('.ac-wrap') || input.parentElement;
    let panel = $('.ac-panel', wrap);
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'ac-panel';
      wrap.appendChild(panel);
    }

    let active = -1;
    let results = [];

    const render = () => {
      if (!results.length) {
        panel.innerHTML = '<div class="ac-empty">No matches. Try “Kyoto”, “budget” or “solo”.</div>';
      } else {
        panel.innerHTML =
          '<div class="ac-hint">' + (results.length) + ' result' + (results.length > 1 ? 's' : '') + ' — Enter to open</div>' +
          results.map((r, i) => `
            <a class="ac-item ${i === active ? 'active' : ''}" href="${r.href}">
              ${r.img ? `<img src="${r.img}" alt="" loading="lazy">` : '<span style="width:46px;height:46px;border-radius:9px;background:var(--teal-soft);display:grid;place-items:center">🗺</span>'}
              <span>
                <strong>${esc(r.title)}</strong>
                <span>${esc(r.sub)}</span>
              </span>
            </a>`).join('');
      }
      panel.classList.add('open');
      attachImageFallback(panel);
    };

    const runSearch = q => {
      const needle = q.trim().toLowerCase();
      if (needle.length < 1) { panel.classList.remove('open'); return; }
      results = index
        .map(item => {
          const title = item.title.toLowerCase();
          let score = 0;
          if (title.startsWith(needle)) score += 10;
          if (title.includes(needle)) score += 6;
          if (item.keywords.includes(needle)) score += 3;
          return { item, score };
        })
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map(r => r.item);
      active = -1;
      render();
    };

    input.addEventListener('input', () => runSearch(input.value));
    input.addEventListener('focus', () => { if (input.value.trim()) runSearch(input.value); });

    input.addEventListener('keydown', e => {
      if (!panel.classList.contains('open')) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, results.length - 1); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); render(); }
      else if (e.key === 'Enter') {
        const target = results[active >= 0 ? active : 0];
        if (target) { e.preventDefault(); location.href = target.href; }
      } else if (e.key === 'Escape') { panel.classList.remove('open'); }
    });

    document.addEventListener('click', e => {
      if (!wrap.contains(e.target)) panel.classList.remove('open');
    });
  });
}

/* ============================================================
   NEWSLETTER + CONTACT FORMS
   ============================================================ */
function initForms() {
  $$('form[data-newsletter]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = $('input[type="email"]', form).value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { toast('Please enter a valid email address', 'warn'); return; }
      const subs = store.get('subs', []);
      if (!subs.includes(email)) { subs.push(email); store.set('subs', subs); }
      track('newsletter_signup');
      form.reset();
      toast('You are in — the weekly shortlist lands every Thursday.');
    });
  });

  $$('form[data-contact]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const msg = $('[name="message"]', form);
      if (msg && msg.value.trim().length < 10) { toast('Tell us a little more — 10 characters minimum.', 'warn'); return; }
      form.reset();
      toast('Message sent. We reply within one working day.');
    });
  });

  $$('form[data-auth]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = $('[name="email"]', form);
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { toast('That email does not look right.', 'warn'); return; }
      const name = $('[name="name"]', form);
      store.set('user', { name: name ? name.value.trim() : 'Traveller', email: email ? email.value.trim() : '', since: Date.now() });
      form.reset();
      closeModal();
      toast('Welcome aboard — your account lives on this device.');
      document.dispatchEvent(new CustomEvent('user:changed'));
    });
  });
}

function currentUser() { return store.get('user', null); }

function openAuthModal(kind = 'login') {
  const signup = kind === 'signup';
  openModal(signup ? 'Create your account' : 'Welcome back', `
    <p class="lead" style="font-size:.95rem">${signup
      ? 'Save destinations, build itineraries and keep your travel passport across this device.'
      : 'Sign in to pick up your wishlist and saved itineraries.'}</p>
    <form data-auth class="form-grid">
      ${signup ? '<div class="full"><label class="lbl" for="au-name">Name</label><input class="field" id="au-name" name="name" required placeholder="Your name"></div>' : ''}
      <div class="full"><label class="lbl" for="au-email">Email</label><input class="field" id="au-email" name="email" type="email" required placeholder="you@example.com"></div>
      <div class="full"><label class="lbl" for="au-pass">Password</label><input class="field" id="au-pass" name="password" type="password" required minlength="8" placeholder="At least 8 characters"></div>
      <div class="full"><button class="btn btn--primary btn--block" type="submit">${signup ? 'Create account' : 'Sign in'}</button></div>
    </form>
    <p class="form-note" style="color:var(--muted);margin-top:14px">
      ${signup ? 'Already have an account?' : 'New here?'}
      <a href="#" data-auth-toggle="${signup ? 'login' : 'signup'}" style="color:var(--coral);font-weight:700">${signup ? 'Sign in' : 'Create one'}</a>
      · Demo only: accounts are stored locally in your browser.
    </p>`);
  $('[data-auth-toggle]', $('#modal'))?.addEventListener('click', ev => {
    ev.preventDefault();
    openAuthModal(ev.currentTarget.dataset.authToggle);
  });
}

/* ============================================================
   ANALYTICS — consent-gated, placeholder until real IDs exist
   Paste your GA4 / Clarity IDs below; nothing loads until the
   visitor clicks "Accept all" and an ID is present.
   ============================================================ */
const ANALYTICS = {
  ga4: '',      // e.g. 'G-XXXXXXXXXX'
  clarity: ''   // e.g. 'k1a2b3c4d5'
};

function initAnalytics() {
  const consent = store.get('cookie', null);
  if (!consent || consent.level !== 'all') return;

  if (ANALYTICS.ga4 && !document.getElementById('ga4-js')) {
    const s = document.createElement('script');
    s.id = 'ga4-js';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ANALYTICS.ga4);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS.ga4, { anonymize_ip: true });
  }

  if (ANALYTICS.clarity && !document.getElementById('clarity-js')) {
    (function () {
      window.clarity = window.clarity || function () {
        (window.clarity.q = window.clarity.q || []).push(arguments);
      };
      const s = document.createElement('script');
      s.id = 'clarity-js';
      s.async = true;
      s.src = 'https://www.clarity.ms/tag/' + encodeURIComponent(ANALYTICS.clarity);
      document.head.appendChild(s);
    })();
  }
}

function track(name, params) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
}

/* ============================================================
   COOKIE CONSENT
   ============================================================ */
function initCookie() {
  if (store.get('cookie', null)) return;
  const bar = document.createElement('div');
  bar.className = 'cookie show';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Cookie consent');
  bar.innerHTML = `
    <p><strong>Cookies & privacy</strong>
      We use essential cookies to remember your wishlist and preferences, and optional analytics to see which guides people actually read.
      See our <a href="privacy.html" style="color:var(--coral);font-weight:700">privacy policy</a>.</p>
    <div class="cookie-actions">
      <button class="btn btn--soft btn--sm" data-cookie="essential">Essential only</button>
      <button class="btn btn--primary btn--sm" data-cookie="all">Accept all</button>
    </div>`;
  document.body.appendChild(bar);
  bar.addEventListener('click', e => {
    const b = e.target.closest('[data-cookie]');
    if (!b) return;
    store.set('cookie', { level: b.dataset.cookie, at: Date.now() });
    bar.remove();
    if (b.dataset.cookie === 'all') initAnalytics();
    toast(b.dataset.cookie === 'all' ? 'Preferences saved.' : 'Essential cookies only. You can change this anytime.');
  });
}

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function initReveal() {
  const els = $$('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  els.forEach(el => io.observe(el));
}

/* ============================================================
   HERO BACKGROUND
   ============================================================ */
function initHeroBg() {
  $$('.hero-bg[data-bg]').forEach(el => { el.style.backgroundImage = 'url("' + el.dataset.bg + '")'; });
}

/* ============================================================
   RAILS (horizontal carousels)
   ============================================================ */
function initRails() {
  $$('[data-rail]').forEach(shell => {
    const rail = $('.rail', shell);
    if (!rail) return;
    const prev = $('[data-rail-prev]', shell);
    const next = $('[data-rail-next]', shell);
    const step = () => Math.min(rail.clientWidth * 0.85, 720);
    prev?.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
  });
}

/* ============================================================
   PWA
   ============================================================ */
function initPWA() {
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => { /* offline file:// */ });
    });
  }
}

/* ============================================================
   DESTINATION CARD RENDERER (reused everywhere)
   ============================================================ */
function destinationCard(d, opts = {}) {
  const why = opts.why ? `<p class="why">${esc(opts.why)}</p>` : '';
  return `
  <article class="card">
    <div class="card-media">
      <a href="destination.html?id=${d.id}" tabindex="-1" aria-hidden="true">
        <img src="${d.images[0]}" alt="${esc(d.name)}, ${esc(d.country)}" loading="lazy">
      </a>
      <div class="card-badges">
        <span class="badge badge--coral">${esc(d.budgetLevel)}</span>
        <span class="badge">${esc(d.region)}</span>
      </div>
      <button class="card-save" data-wish="${d.id}" aria-label="Save ${esc(d.name)}">${Wishlist.has(d.id) ? heartFillSvg : heartSvg}</button>
      <span class="card-rating">${starSvg} ${d.ratingAvg.toFixed(1)} <span>(${d.ratingCount.toLocaleString()})</span></span>
    </div>
    <div class="card-body">
      <span class="card-loc">${esc(d.country)}</span>
      <h3 class="card-title"><a href="destination.html?id=${d.id}">${esc(d.name)}</a></h3>
      <p class="card-desc">${esc(d.tagline)}</p>
      ${why}
      <div class="card-meta">
        <span class="price"><strong>${money(d.budget.mid)}</strong> <span>/ day avg</span></span>
        <span class="meta-pills">
          <span class="pill">${d.tripLength} days</span>
          <span class="pill">${esc(d.interests[0])}</span>
        </span>
      </div>
    </div>
  </article>`;
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (window.__wfBooted) return;
  window.__wfBooted = true;
  initNav();
  initHeroBg();
  initReveal();
  initRails();
  Wishlist.init();
  initSearch();
  initForms();
  initCookie();
  initAnalytics();
  initPWA();

  // global header actions
  $('[data-open-search]')?.addEventListener('click', () => {
    const input = $('[data-search-input]');
    if (input) { input.focus(); input.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    else location.href = 'destinations.html#search';
  });
  $('[data-open-wishlist]')?.addEventListener('click', openWishlistModal);
  $('[data-open-auth]')?.addEventListener('click', () => {
    const u = currentUser();
    if (u) openModal('Your account', `
      <div class="passport-stats">
        <div><strong>${Wishlist.count()}</strong><span>Saved</span></div>
        <div><strong>${store.get('visited', []).length}</strong><span>Visited</span></div>
        <div><strong>${store.get('itinerary', null)?.days ? 1 : 0}</strong><span>Trips</span></div>
      </div>
      <p style="font-size:.95rem"><strong>${esc(u.name)}</strong><br><span style="color:var(--muted)">${esc(u.email || '')}</span></p>
      <button class="btn btn--soft btn--block" id="signout">Sign out</button>`);
    else openAuthModal('login');
    $('#signout')?.addEventListener('click', () => {
      store.set('user', null);
      closeModal();
      toast('Signed out.', 'warn');
    });
  });
  $('[data-open-passport]')?.addEventListener('click', openWishlistModal);

  attachImageFallback();
});
