const CACHE_NAME = 'cat-api-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/js/app.js',
  '/js/busqueda.js',
  '/js/favoritos.js',
  '/js/Inicio.js',
  '/js/populares.js',
  '/js/razas.js',
  '/js/registro.js',
  '/js/script.js',
  '/js/crud.html'
];



self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});


