/* MC工具箱 PWA 离线缓存（构建时生成） */
const CACHE = 'mctoolbox-1.0.1';
const FILES = [
  "./icon-512.png",
  "./icon-192.png",
  "./index.html",
  "./assets_app.js",
  "./style.css",
  "./manifest.webmanifest",
  "./editor-wrap.js",
  "./js/pwa.js",
  "./js/api-docs.js",
  "./js/script-inspector.js"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const copy=r.clone(); caches.open(CACHE).then(c=>c.put(req, copy)); return r; }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r;
  })));
});
