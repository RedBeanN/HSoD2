(() => {
/**
 * Service Worker for hsod2.hongshn.xyz.
 * This SW works for PWA.
 * When user visit the site at least twice,
 *   SW caches files for the future visit(s).
 */
const CACHENAME = 'hsod2-2018.09.13v1';
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
const races = [
  /**
   * These data should usually be latest.
   * Sometimes the users have bad network and
   * the cached data can be return for them.
   */
  'data', 'last', 'auto/',
];
const excludes = [
  /**
   * These assets will never be saved.
   */
  'data', 'last', 'nocache', 'auto/', 'details', 'convert', 'gtag',
  /**
   * Avoid Mixed Content Error over HTTPS
   */
  'mihoyo', 'cms/',
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
  'manifest', 'live2d', 'spine'
];
let caching = false;
const laterPrecache = new (class uniqueArray {
  constructor() {
    this.data = [];
    this.length = 0;
  }
  push (item) {
    for (let i of this.data) {
      if (i === item) return;
    }
    this.length++;
    return this.data.push(item);
  };
  pop () {
    if (this.length === 0) return;
    this.length--;
    return this.data.pop();
  };
});

self.addEventListener('install', e => {
  console.log('The service worker is installed.');
  checkAndCache();
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  checkAndCache();
  /**
   * Handling FetchEvent.
   * NOTE: that the origin host must be match to the SSL crt,
   *   or FailedToFetch errors will break the app and the SW.
   */
  if (isRequestRaceable(e.request.url)) {
    /**
     * Race requests.
     * Some data should be latest when network is available.
     */
    e.respondWith(caches.match(e.request).then(res => {
      if (res) {
        const fetchRes = new Promise(async resolve => {
          const r = await fetch(e.request);
          if (r && r.status == 200) {
            // Update cached file.
            const _r = r.clone();
            caches.open(CACHENAME).then(cache => {
              cache.put(e.request, _r);
            });
            return resolve(r);
          } else setTimeout(() => {
            console.log('Bad Network. Use cached data.');
            resolve();
          }, 3000);
        });
        const cacheRes = new Promise(resolve => {
          setTimeout(_ => resolve(res), 2000);
        });
        return Promise.race([fetchRes, cacheRes]);
      } else return fetch(e.request).then(res => {
        let resp = res.clone();
        if (!res || res.status !== 200) return res;
        caches.open(CACHENAME).then(cache => {
          cache.put(e.request, resp);
        });
        return res;
      });
    }))
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
        if (!res || res.status !== 200) return res;
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

self.addEventListener('activate', async e => {
  console.log('Service Worker is activated.');
  /**
   * Merge cached files to latest cache,
   * then delete redundant caches.
   */
  const cacheNames = await caches.keys();
  const C = await caches.open(CACHENAME);
  /**
   * If there is any old cache version, get its cached files
   * and save to current version.
   */
  return Promise.all(cacheNames
    .filter(cacheName => cacheName !== CACHENAME)
    .map(async cacheName => {
      console.log(`[SW] Merging cache [${cacheName}] to [${CACHENAME}].`);
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      return Promise.all(keys
        .map(async key => {
          /**
           * If the key is already existed, skip.
           */
          const exist = await C.match(key);
          if (exist || !isRequestCacheable(key)) return Promise.resolve();
          const res = await cache.match(key);
          return C.put(key, res);
        })
      ).then(_ => {
        console.log(`[SW] Merged cache [${cacheName}] to [${CACHENAME}].`);
        return caches.delete(cacheName);
      });
    })
  );
});

/**
 * Check and cache files in urls.
 */
function checkAndCache () {
  if (caching) return;
  caching = true;
  setTimeout(_ => {
    caches.open(CACHENAME).then(cache => {
      for (let url of urls) {
        cache.match(url).then(res => {
          if (!res) laterPrecache.push(url);
        })
      }
      caching = false;
    })
  }, 2000)
}

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

setInterval(_ => {
  /**
   * Check laterPrecache per 5 sec.
   * If laterPrecache is not empty, cache items in it.
   * Else clear timer.
   */
  if (laterPrecache.length) {
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
  if (url.url) url = url.url;
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
function isRequestRaceable (url) {
  if (!url) return false;
  for (let r of races) {
    if (url.indexOf(r) !== -1) return true;
  }
  return false;
}

})();
