(() => {
/**
 * Service Worker for hsod2.hongshn.xyz.
 * This SW works for PWA.
 * When user visit the site at least twice,
 *   SW caches files for the future visit(s).
 */
const CACHENAME = 'hsod2-201807152';
const urls = [
  /**
   * These files are important and useful for almost all pages.
   */
  '/',
  '/m/css/mdui.min.css',
  '/m/js/mdui.min.js',
  '/javascripts/vue.min.js',
  '/javascripts/axios.min.js',
  /**
   * The following files are important and large,
   *   so cache them at the first time.
   */
  '/dist/js/equip.min.js',
  '/live2d/model/seele/seele.2048/texture_00.png',
  '/live2d/model/thresa/delisha.2048/texture_00.png',
];
const statics = [
  /**
   * These statics assets will be saved when the user
   *   visit the same page at twice.
   */
  '/m/', '/live2d/', '/images/',
  '/css/', '/js/', '/stylesheets/', '/javascripts/',
];
const laterPrecache = [];

self.addEventListener('install', e => {
  console.log('The service worker is installed.');
  e.waitUntil(
    caches.open(CACHENAME).then(cache => {
      /**
       * cache files one by one
       */
      cacheForUrls(cache, urls, 1);
      caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
          if (cacheName !== CACHENAME) return caches.delete(cacheName);
        }));
      });
      return cache.add(urls[0]);
    })
    .catch(() => {
      /**
       * This is only specific for '/'
       */
      laterPrecache.push(urls[0]);
    })
  );
});

self.addEventListener('fetch', e => {
  /**
   * Handling FetchEvent.
   * NOTE: that the origin host must be match to the SSL crt,
   *   or FailedToFetch errors will break the app and the SW.
   */
  e.respondWith(caches.match(e.request).then(res => {
    if (res) return res;
    // console.log('No cache. Try to cache', e.request.url);
    if (!isRequestCacheable(e.request.url)) return fetch(e.request);
    /**
     * If request is cacheable, cache response for it.
     */
    return fetch(e.request).then(res => {
      /**
       * Res can only be read once. Clone it for cache.
       */
      let resp = res.clone();
      if (!res || res.status !== 200 || res.type !== 'basic') return res;
      caches.open(CACHENAME).then(cache => {
        cache.put(e.request, resp);
      });
      return res;
    });
  }));
});

function cacheForUrls(cache, urls, i) {
  /**
   * Recusive caching files.
   * Set timeout for requests to avoid FailedToFetch error.
   */
  setTimeout(() => {
    cache.add(urls[i]).catch(() => {
      console.log('Failed to cache', urls[i]);
      laterPrecache.push(urls[i]);
    });
    if (i < urls.length - 1) cacheForUrls(cache, urls, i + 1);
  }, 200)
}

let laterTimer = setInterval(() => {
  /**
   * Check laterPrecache per 5 sec.
   * If laterPrecache is not empty, cache items in it.
   * Else clear timer.
   */
  if (!laterPrecache.length) {
    // console.log('Precached all items after several trials.');
    clearInterval(laterTimer);
  } else {
    // console.log('Try to precache failed items.');
    /**
     * NOTE: Here clear the laterPrecache array.
     * If there is still something failing to cache,
     * they will be pushed into laterPrecache again.
     */
    const _urls = [];
    for (let i = 0; i < laterPrecache.length; i++) {
      _urls.push(laterPrecache.pop());
    }
    caches.open(CACHENAME).then(cache => {
      return cacheForUrls(cache, _urls, 0);
    });
  }
}, 5000);

function isRequestCacheable (url) {
  /**
   * Cache statics files only.
   */
  if (!url) return false;
  for (let s of statics) {
    if (url.indexOf(s) !== -1) return true;
  }
  return false;
}

})();
