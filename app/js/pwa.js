/* 网页版 / PWA：离线缓存与安装入口。Android WebView、Electron 下自动跳过。 */
(function () {
  'use strict';
  var isHttp = /^https?:$/.test(location.protocol);
  var isStandalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;

  if (isHttp && 'serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }

  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferred = e;
    showButton();
  });

  function showButton() {
    if (isStandalone || !deferred || document.getElementById('pwa-install')) return;
    var host = document.createElement('div');
    host.id = 'pwa-install';
    var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
    root.innerHTML = '<style>'
      + '.b{position:fixed;left:14px;bottom:calc(86px + env(safe-area-inset-bottom,0px));z-index:9998;display:flex;align-items:center;gap:7px;padding:10px 14px;border-radius:999px;border:1px solid var(--line,#2c3340);background:var(--panel,#151a22);color:var(--fg,#e8edf5);font:13px/1 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.28);cursor:pointer}'
      + '.b:active{transform:scale(.97)}'
      + '.x{margin-left:2px;opacity:.55;font-size:15px;padding:0 2px}'
      + '</style><button class="b" id="go">安装到桌面<span class="x" id="no">×</span></button>';
    document.body.appendChild(host);
    root.getElementById('go').addEventListener('click', function (e) {
      if (e.target && e.target.id === 'no') { host.remove(); return; }
      if (!deferred) return;
      deferred.prompt();
      deferred.userChoice.then(function () { deferred = null; host.remove(); });
    });
  }

  window.addEventListener('appinstalled', function () {
    var el = document.getElementById('pwa-install');
    if (el) el.remove();
  });
})();
