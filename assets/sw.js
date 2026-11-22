/* MC工具箱 PWA 离线缓存（构建时生成） */
const CACHE = 'mctoolbox-1.1.0-chunker1';
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
  "./js/script-inspector.js",
  "./js/addon-i18n.js",
  "./i18n/CHANGELOG.md",
  "./i18n/CHANGELOG_en.md",
  "./i18n/LICENSE",
  "./i18n/README.md",
  "./i18n/README_en.md",
  "./i18n/app.js",
  "./i18n/index.html",
  "./i18n/loader.js",
  "./i18n/override.css",
  "./i18n/src/commands.js",
  "./i18n/src/context.js",
  "./i18n/src/json.js",
  "./i18n/src/lang-blacklist.js",
  "./i18n/src/log-i18n.js",
  "./i18n/src/minversion.js",
  "./i18n/src/pipeline.js",
  "./i18n/src/script.js",
  "./i18n/src/ui-i18n.js",
  "./i18n/src/util.js",
  "./i18n/src/vanilla-names-intl.js",
  "./i18n/src/vanilla-names.js",
  "./i18n/src/world/editor.js",
  "./i18n/src/world/leveldb.js",
  "./i18n/src/world/nbt.js",
  "./i18n/src/world/world.js",
  "./i18n/style.css",
  "./i18n/vendor/acorn.LICENSE",
  "./i18n/vendor/acorn.js",
  "./i18n/vendor/json5.min.js",
  "./i18n/vendor/jszip.LICENSE.markdown",
  "./i18n/vendor/jszip.min.js",
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
    e.respondWith(fetch(req).then(r => { const copy=r.clone(); caches.open(CACHE).then(c=>c.put(req, copy)); return r; }).catch(() => caches.match('./index.html', {ignoreSearch: true})));
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r;
  })));
});
