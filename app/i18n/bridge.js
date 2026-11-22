/* 6.3.0 兼容层：安卓下载走系统「下载/MC工具箱」，Windows / 浏览器保持原下载。
   之前这行 <script> 标签被写坏、本文件压根没加载，安卓点「下载」等于没反应——这里同时补上自愈逻辑。 */
(function () {
  if (window.__mctDownloadBridge) return;
  window.__mctDownloadBridge = true;

  function b64(u8) {
    var n = '';
    for (var i = 0; i < u8.length; i += 32768) {
      n += String.fromCharCode.apply(null, u8.subarray(i, i + 32768));
    }
    return btoa(n);
  }

  function anchorDownload(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function install() {
    if (window.__mctDownloadInstalled) return;
    window.__mctDownloadInstalled = true;
    var orig = window.downloadBlob;

    window.downloadBlob = async function (blob, filename) {
      try {
        // 1) 安卓原生桥（WebView 里唯一能真正落盘的路子）
        if (window.AndroidBridge && window.AndroidBridge.saveBinary) {
          var buf = await blob.arrayBuffer();
          var path = window.AndroidBridge.saveBinary(filename, b64(new Uint8Array(buf)));
          if (String(path).indexOf('ERR') === 0) {
            if (parent !== window) parent.postMessage({ type: 'mc-i18n-error', message: filename + '：' + path }, '*');
          } else {
            if (parent !== window) parent.postMessage({ type: 'mc-i18n-saved', name: filename, path: path }, '*');
          }
          return;
        }
        // 2) 在 iframe 里但桥在父页：交给父页保存
        if (parent !== window) {
          var fb = await blob.arrayBuffer();
          parent.postMessage({ type: 'mc-i18n-save-b64', name: filename, b64: b64(new Uint8Array(fb)) }, '*');
          return;
        }
      } catch (e) {
        if (parent !== window) parent.postMessage({ type: 'mc-i18n-error', message: filename + '：' + (e && e.message) }, '*');
        return;
      }
      // 3) 桌面浏览器 / Electron：还是原来的 <a download>
      if (typeof orig === 'function') return orig.call(window, blob, filename);
      anchorDownload(blob, filename);
    };
  }

  install();
  window.__mctSave = window.downloadBlob;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  window.addEventListener('load', install);

  // 清掉这套第三方工具自带的推广/计数元素（离线应用里不需要）
  function clean() {
    ['sponsor-btn', 'visit-counter'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', clean);
  else clean();
})();
