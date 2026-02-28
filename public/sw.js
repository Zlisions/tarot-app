const CACHE_VERSION = 'v' + Date.now();
const CACHE_NAME = 'tarot-cache-' + CACHE_VERSION;

// 安装时不缓存任何东西
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 激活时删除所有旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('删除旧缓存:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 所有请求直接走网络，不用缓存
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
