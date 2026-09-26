/* Wayfarer service worker — offline access for saved plans & static shell. */
const CACHE = 'wayfarer-v1';
const CORE = [
  'index.html',
  'destinations.html',
  'destination.html',
  'quiz.html',
  'itinerary.html',
  'blog.html',
  'blog-post.html',
  'about.html',
  'contact.html',
  'faq.html',
  'privacy.html',
  'terms.html',
  '404.html',
  'css/style.css',
  'js/data.js',
  'js/app.js',
  'js/pages.js',
  'manifest.json',
  'favicon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Stale-while-revalidate: cache first, refresh in background. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Never cache map tiles or cross-origin API responses aggressively.
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req)
        .then(res => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => hit || caches.match('404.html'));
      return hit || net;
    })
  );
});
