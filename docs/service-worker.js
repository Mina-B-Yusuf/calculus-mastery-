// Versioned, offline-first service worker.
// Bump CACHE_VERSION whenever shipped files change so clients pick up updates
// via the "update available" flow instead of silently going stale.
const CACHE_VERSION = 'v2';
const SHELL_CACHE = `calc-mastery-shell-${CACHE_VERSION}`;
const DATA_CACHE = `calc-mastery-data-${CACHE_VERSION}`;

const SHELL_ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/style.css',
  'js/mathrender.js',
  'js/mathkeyboard.js',
  'js/db.js',
  'js/srs.js',
  'js/data-loader.js',
  'js/app.js',
  'js/modes/home.js',
  'js/modes/recognition.js',
  'js/modes/formula.js',
  'js/modes/scratchpad.js',
  'js/modes/radar.js',
  'js/modes/errornotebook.js',
  'js/modes/settings.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'vendor/katex/katex.min.css',
  'vendor/katex/katex.min.js',
  'vendor/katex/fonts/KaTeX_AMS-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Fraktur-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Fraktur-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Main-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Main-BoldItalic.woff2',
  'vendor/katex/fonts/KaTeX_Main-Italic.woff2',
  'vendor/katex/fonts/KaTeX_Main-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Math-BoldItalic.woff2',
  'vendor/katex/fonts/KaTeX_Math-Italic.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Bold.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Italic.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Script-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size1-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size2-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size3-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size4-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Typewriter-Regular.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys
        .filter((k) => k !== SHELL_CACHE && k !== DATA_CACHE)
        .map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Data JSON: network-first so new content propagates, fall back to cache offline.
  if (url.pathname.includes('/data/taxonomy/')) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(DATA_CACHE).then((cache) => cache.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // App shell: cache-first, never show a blank page offline.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match('index.html'));
    })
  );
});
