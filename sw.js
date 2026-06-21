const CACHE_NAME = 'scad-compiler-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'https://unpkg.com/openscad-wasm@0.0.4/openscad.js',
  'https://unpkg.com/openscad-wasm@0.0.4/openscad.wasm'
];

// Installa e salva in Cache locale tutto il necessario
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercetta le richieste e risponde usando la cache se offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
