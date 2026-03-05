// Cambia esto por el nombre de tu repositorio en GitHub
const GHPATH = 'https://carover0.github.io/pagina';

const APP_PREFIX = 'zec_';
const VERSION = 'version_01';

// Los archivos que se guardarán en caché para funcionar offline
const URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/pagina/zec-nodo.html`,
  `${GHPATH}/pagina/zec-stats.html`,
  `${GHPATH}/pagina/zec-consola.html`,
  `${GHPATH}/icons/icon-192x192.png`,
  `${GHPATH}/icons/icon-512x512.png`
]

// Instalación: guarda los archivos en caché
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(APP_PREFIX + VERSION)
      .then(function(cache) {
        return cache.addAll(URLS);
      })
  );
});

// Activar: limpia cachés viejas
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
          let cacheWhitelist = keyList.filter(function(key) {
            return key.indexOf(APP_PREFIX);
          });
          cacheWhitelist.push(APP_PREFIX + VERSION);

          return Promise.all(keyList.map(function(key, i) {
            if (cacheWhitelist.indexOf(key) === -1) {
              console.log('Eliminando caché antigua: ' + key);
              return caches.delete(key);
            }
          }));
        })
  );
});

// Intercepta peticiones y sirve desde caché si está disponible
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
