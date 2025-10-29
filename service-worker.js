// service-worker.js (upravené pro GH Pages pod /e22/)
const CACHE_NAME = 'e22-static-v1';
const RUNTIME_CACHE = 'e22-runtime-v1';

// Použij absolutní cesty tak, aby odpovídaly GH Pages: /e22/...
const urlsToCache = [
  '/e22/',
  '/e22/index.html',
  '/e22/style.css',
  '/e22/scripts/app.js',
  '/e22/manifest.json',
  '/e22/favicon.svg',
  '/e22/icons/icon-192.png',
  '/e22/icons/icon-512.png',
  'https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTfvgaQc78lA2.woff2',
  'https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRsgW7S9XdZN8.woff2'
];

// Pomocná funkce na bezpečné cacheování (nezhatí instalaci, pokud něco selže)
async function safeCacheResources(cache, resources) {
  const promises = resources.map(async (resource) => {
    try {
      if (/^https?:\/\//i.test(resource) && !resource.startsWith(self.location.origin)) {
        const resp = await fetch(resource, { mode: 'no-cors' }).catch(() => null);
        if (resp && resp.ok) {
          try { await cache.put(resource, resp.clone()); } catch (e) { /* ignore */ }
        }
      } else {
        await cache.add(resource);
      }
    } catch (err) {
      console.warn('[SW] safeCacheResources failed for', resource, err);
    }
  });
  await Promise.all(promises);
}

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[Service Worker] Caching static assets (safe mode)');
      await safeCacheResources(cache, urlsToCache);
    })
    .then(() => self.skipWaiting())
    .catch((err) => console.error('[Service Worker] Install failed', err))
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME && key !== RUNTIME_CACHE) {
          console.log('[Service Worker] Deleting old cache:', key);
          return caches.delete(key);
        }
      })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (url.protocol.startsWith('chrome-extension')) return;
  if (req.method !== 'GET') return;

  if (req.url.includes('/api/')) {
    event.respondWith(networkFirst(req));
    return;
  }

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(response => {
        const copy = response.clone();
        caches.open(RUNTIME_CACHE).then(cache => cache.put(req, copy));
        return response;
      }).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedIndex = await cache.match('/e22/index.html') || await cache.match('/e22/');
        return cachedIndex || new Response('Offline', { status: 503, statusText: 'Offline' });
      })
    );
    return;
  }

  event.respondWith(cacheFirst(req));
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const responseClone = response.clone();
      const runtime = await caches.open(RUNTIME_CACHE);
      try { await runtime.put(request, responseClone); } catch (e) {}
    }
    return response;
  } catch (err) {
    const offline = await cache.match('/e22/offline.html') || cache.match('/e22/index.html');
    return offline || new Response('Offline - stránka není dostupná', { status: 503, headers: { 'Content-Type': 'text/plain' }});
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const copy = response.clone();
      const runtime = await caches.open(RUNTIME_CACHE);
      try { await runtime.put(request, copy); } catch (e) {}
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw err;
  }
}

self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(caches.keys().then(names => Promise.all(names.map(n => caches.delete(n)))));
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil((async () => {
      console.log('[SW] Sync event fired: sync-messages');
    })());
  }
});

self.addEventListener('push', (event) => {
  try {
    const data = event.data ? event.data.json() : { title: 'Notifikace', body: 'Máte novou zprávu', url: '/e22/' };
    const options = {
      body: data.body,
      icon: '/e22/icons/icon-192.png',
      badge: '/e22/icons/icon-192.png',
      data: { url: data.url || '/e22/' }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  } catch (e) {
    console.warn('[SW] push handler error', e);
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/e22/';
  event.waitUntil(clients.openWindow(url));
});

console.log('[Service Worker] Loaded (e22)');
