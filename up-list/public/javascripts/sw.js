let CACHE = 'network-or-cache';

const precache = function precache () {
  return caches.open(CACHE).then(c => {
    return c.addAll(['./']);
  });
};

const fetchForCache = function fetchForCache (req) {
  return caches.open(CACHE).then(c => {
    return fetch(req).then(res => {
      c.put(req, res.clone());
      return res;
    });
  });
};

const fromCache = function fromCache (req) {
  return caches.open(CACHE).then(c => {
    return c.match(req).then(matching => {
      console.log(matching);
      return matching || fetchForCache(req);
    });
  });
};

self.addEventListener('install', e => {
  console.log('The service worker is installed');
  e.waitUntil(precache());
});

self.addEventListener('fetch', e => {
  console.log('[SW] Serving.');
  if (e.request.method !== 'GET') return;
  e.responseWith(fromCache());
});