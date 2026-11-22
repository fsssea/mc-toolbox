/* MC工具箱嵌入适配：按上游 index.html 的顺序加载脚本。
   GitHub Pages 边缘节点偶尔对单个静态文件返回 503，这里失败后退避重试，避免整页卡死。
   上游新增/删除 src 文件时，同步维护下面的 FILES 列表。 */
(function () {
  'use strict';
  var V = '2026.11.21-90';
  var ov = document.createElement('div');
  ov.id = 'mciLoadMask';
  ov.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:#0f141c;color:#dfe7f2;font:14px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;padding:24px;text-align:center';
  ov.textContent = '正在加载汉化工具…';
  document.body.appendChild(ov);

  var FILES = [
    'vendor/jszip.min.js',
    'vendor/json5.min.js',
    'src/ui-i18n.js',
    'src/log-i18n.js',
    'vendor/acorn.js',
    'src/util.js',
    'src/lang-blacklist.js',
    'src/minversion.js',
    'src/vanilla-names.js',
    'src/context.js',
    'src/commands.js',
    'src/json.js',
    'src/script.js',
    'src/pipeline.js',
    'src/world/nbt.js',
    'src/world/leveldb.js',
    'src/world/world.js',
    'src/world/editor.js',
    'app.js',
    'bridge.js'
  ];

  function loadOne(src, tries) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement('script');
      el.async = false;
      var url = src + '?v=' + V + '&r=1';
      if (tries) url += '&retry=' + Date.now() + '-' + tries;
      el.src = url;
      el.onload = function () { resolve(); };
      el.onerror = function () {
        el.remove();
        if (tries < 3) {
          setTimeout(function () { loadOne(src, tries + 1).then(resolve, reject); }, 600 * (tries + 1));
        } else {
          reject(new Error(src));
        }
      };
      document.body.appendChild(el);
    });
  }

  (async function () {
    for (var i = 0; i < FILES.length; i++) {
      try {
        await loadOne(FILES[i], 0);
      } catch (e) {
        var box = document.getElementById('log');
        if (box) box.textContent = '加载失败：' + FILES[i] + '，请刷新页面重试。';
        ov.textContent = '加载失败：' + FILES[i] + '。请检查网络后刷新页面。';
        return;
      }
    }
    if (ov.parentNode) ov.remove();
  })();
})();
