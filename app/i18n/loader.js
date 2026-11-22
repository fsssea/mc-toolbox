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
    'app.js'
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

  // 下载适配：安卓 WebView 走原生桥，iframe 内交给父页保存，桌面浏览器用 <a download>。
  function b64(u8) {
    var n = '';
    for (var i = 0; i < u8.length; i += 32768) n += String.fromCharCode.apply(null, u8.subarray(i, i + 32768));
    return btoa(n);
  }
  window.__mctSave = async function (blob, filename) {
    try {
      if (window.AndroidBridge && window.AndroidBridge.saveBinary) {
        var buf = await blob.arrayBuffer();
        var path = window.AndroidBridge.saveBinary(filename, b64(new Uint8Array(buf)));
        if (parent !== window) {
          if (String(path).indexOf('ERR') === 0) parent.postMessage({ type: 'mc-i18n-error', message: filename + '：' + path }, '*');
          else parent.postMessage({ type: 'mc-i18n-saved', name: filename, path: path }, '*');
        }
        return path;
      }
      if (parent !== window) {
        var fb = await blob.arrayBuffer();
        parent.postMessage({ type: 'mc-i18n-save-b64', name: filename, b64: b64(new Uint8Array(fb)) }, '*');
        return;
      }
    } catch (e) { /* 继续走浏览器下载 */ }
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = filename; a.rel = 'noopener';
    document.body.appendChild(a); a.click();
    setTimeout(function () { a.remove(); URL.revokeObjectURL(url); }, 1000);
  };

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
