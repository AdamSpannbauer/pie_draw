const CACHE_NAME = 'v1::static';
const urlsToCache = [
  '/',

  '/site.webmanifest',
  '/service-worker.js',

  '/style.css',
  '/sketch.js',

  'https://cdn.jsdelivr.net/npm/p5@0.10.2/lib/p5.js',
  'https://cdn.jsdelivr.net/npm/simplify-js@1.2.4/simplify.min.js',

  '/src/artUtils.js',
  '/src/detectMobile.js',
  '/src/paletteToolBarItem.js',
  '/src/pathUtils.js',
  '/src/toolBar.js',
  '/src/toolBarItem.js',
  '/src/wedgeBtn.js',

  '/assets/imgs/erase_all.png',
  '/assets/imgs/save.png',
  '/assets/imgs/undo.png',

  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'apple-touch-icon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (caches
      .open(CACHE_NAME)
      .then((cache) => cache.match(event.request)
        .then((res) => res || fetch(event.request)))),
  );
});
