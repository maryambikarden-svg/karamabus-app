self.addEventListener('install', (e) => {
  console.log('Karamabus PWA installée !');
});

self.addEventListener('fetch', (e) => {
  // Permet à l'application de charger les ressources
  e.respondWith(fetch(e.request));
});