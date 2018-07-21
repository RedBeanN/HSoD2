(() => {
/**
 * Service Worker for hsod2.hongshn.xyz.
 * This SW works for PWA.
 * When user visit the site at least twice,
 *   SW caches files for the future visit(s).
 */
const CACHENAME = 'hsod2-2018.07.21v1';
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
   * Pages of the whole site.
   */
  '/cms',
  '/buglist',
  '/list/auto',
  '/worldbattle/20182',
  '/equip',
  /**
   * The following files are important and large,
   *   so cache them at the first time.
   */
  '/dist/js/equip.min.js',
  '/live2d/model/seele/seele.2048/texture_00.png',
  '/live2d/model/thresa/delisha.2048/texture_00.png',
  /**
   * MicroSoft YaHei Bold
   * Size: 16.0 MB
   */
  '/m/fonts/msyh.woff',
];
const excludes = [
  /**
   * These assets will never be saved.
   */
  'data', 'last', 'nocache',
  /**
   * Avoid Mixed Content Error over HTTPS
   */
  'mihoyo', 'cms/'
];
const statics = [
  /**
   * These statics assets will be saved when the user
   *   visit the same page at twice.
   */
  // libs
  'vue', 'axios', 'mdui', 'html2canvas', 'echarts',
  // resources
  'images', 'icons', 'fonts', 'animation',
  // others
  'manifest', 'live2d', 'spine', 'swVersions'
];
const laterPrecache = [];
const swVersions = [];

self.addEventListener('install', e => {
  // console.log('The service worker is installed.');
  e.waitUntil(
    caches.open(CACHENAME).then(cache => {
      /**
       * cache files one by one
       */
      cacheForUrls(cache, urls, 1);
      /**
       * Delete redundant caches.
       */
      caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
          swVersions.push(cacheName);
          if (cacheName !== CACHENAME) return caches.delete(cacheName);
        }))/*.then(_ => {
          const _blob = new Blob([JSON.stringify(swVersions)], {type : 'application/json'});
          const _headers = new Headers({
            'Accept-Ranges': 'bytes',
            'Cache-Control': 'public, max-age=0',
            'Content-Type': 'application/json',
            'Date': (new Date()).toGMTString(),
            'Last-Modified': (new Date()).toGMTString()
          })
          const _res = new Response(_blob, { status: 200, headers: _headers });
          const _req = new Request('/swVersions');
          caches.open(CACHENAME).then(cache => {
            cache.put(_req, _res);
          });
        })*/;
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
  if (e.request.url.indexOf('sw') !== -1) {
    console.log(e.request);
    return e.respondWith(new Response(
      new Blob([JSON.stringify(swVersions)], {type : 'application/json'}),
      {
        status: 200,
        headers: new Headers({
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=0',
          'Content-Type': 'application/json',
          'Date': (new Date()).toGMTString(),
          'Last-Modified': (new Date()).toGMTString()
        })
      }
    ));
  }
  else if (!isRequestCacheable(e.request.url)) return fetch(e.request);
  else e.respondWith(caches.match(e.request).then(res => {
    if (res) {
      /**
       * Return cached response and renew the cache.
       * Statics files will not be cached again.
       * This is usually used to update the html page itself.
       * NOTE: The page will not be updated until next visit.
       */
      if (!isRequestStatic(e.request.url)) fetch(e.request).then(_res => {
        caches.open(CACHENAME).then(cache => {
          cache.put(e.request, _res);
        });
      }).catch(_ => {
        // Do nothing if fetch failed.
      });
      return res;
    }
    /**
     * If request is cacheable, cache response for it.
     */
    return fetch(e.request).then(res => {
      /**
       * Res can only be read once. Clone it for cache.
       */
      let resp = res.clone();
      if (!res || res.status !== 200) return res;
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
  for (let e of excludes) {
    if (url.indexOf(e) !== -1) return false;
  }
  return true;
}
function isRequestStatic (url) {
  if (!url) return false;
  for (let s of statics) {
    if (url.indexOf(s) !== -1) return true;
  }
  return false;
}

})();
