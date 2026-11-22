/* MC工具箱嵌入适配：并发取回上游脚本（失败重试），再按上游 index.html 的顺序执行。
   GitHub Pages 边缘节点偶尔对单个静态文件返回 503；顺序 <script src> 一旦失败整页就白，
   这里改成先取文本、全部成功后再按顺序注入，任一文件失败会明确提示而不是半加载。
   上游新增/删除 src 文件时，同步维护下面的 FILES 列表。 */
(function () {
  'use strict';
  var V = '2026.11.21-90';
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

  var ov = document.createElement('div');
  ov.id = 'mciLoadMask';
  ov.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:#0f141c;color:#dfe7f2;font:14px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;padding:24px;text-align:center';
  ov.textContent = '正在加载汉化工具… 0/' + FILES.length;
  document.body.appendChild(ov);

  var done = 0;
  function getOne(src, tries) {
    var url = src + '?v=' + V + '&r=1';
    if (tries) url += '&retry=' + Date.now() + '-' + tries;
    return fetch(url, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function (text) {
      done++;
      ov.textContent = '正在加载汉化工具… ' + done + '/' + FILES.length;
      return text;
    }).catch(function (e) {
      if (tries >= 3) throw e;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          getOne(src, tries + 1).then(resolve, reject);
        }, 500 * (tries + 1));
      });
    });
  }

  Promise.all(FILES.map(function (f) { return getOne(f, 0); })).then(function (texts) {
    for (var i = 0; i < FILES.length; i++) {
      var el = document.createElement('script');
      el.textContent = texts[i];
      document.body.appendChild(el);
    }
    if (ov.parentNode) ov.remove();
  }).catch(function (e) {
    var name = (e && e.message) || '未知错误';
    ov.textContent = '加载失败：' + name + '。请检查网络后刷新页面。';
  });
})();
