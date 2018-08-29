//Creating a static cache name
const staticCache = 'Grasse-Neighborhood-v1';
let cacheFiles = [
    '/',
    '/public/index.html',
    '/src/index.js',
    '/src/index.css',
    '/src/App.js',
    '/src/App.css',
    '/src/Header.js',
    '/src/Map.js',
    '/src/Sidebar.js',
    '/src/LocationInformation.js'
]
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCache)
    .then(cache => {
      console.log('Opening Cache');
      return cache.addAll(cacheFiles);
    })
    .catch( err => {
      console.log(`The cache opening seems to have failed: ${err}`);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(response => {
        if (response.status === 404) return 'Error 404';
        return response;
      });
    })
    .catch( err => {
      console.log(`There was an unexpected error : ${err}`)
    })
  );
});
