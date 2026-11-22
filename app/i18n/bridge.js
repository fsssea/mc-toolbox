/* 6.1.0 兼容层：安卓下载走应用专属目录，Windows / 浏览器保持原下载 */
(function () {
  var origDownload = window.downloadBlob;
  function b64(u8) {
    var n = '';
    for (var i = 0; i < u8.length; i += 32768) n += String.fromCharCode.apply(null, u8.subarray(i, i + 32768));
    return btoa(n);
  }
  window.downloadBlob = async function (blob, filename) {
    try {
      if (!window.AndroidBridge && parent !== window) {
        var fb = await blob.arrayBuffer();
        parent.postMessage({ type: 'mc-i18n-save-b64', name: filename, b64: b64(new Uint8Array(fb)) }, '*');
        return;
      }
      if (window.AndroidBridge && window.AndroidBridge.saveBinary) {
        var buf = await blob.arrayBuffer();
        var path = window.AndroidBridge.saveBinary(filename, b64(new Uint8Array(buf)));
        if (String(path).indexOf('ERR') === 0) {
          parent.postMessage({ type: 'mc-i18n-error', message: filename + '：' + path }, '*');
        } else {
          parent.postMessage({ type: 'mc-i18n-saved', name: filename, path: path }, '*');
        }
        return;
      }
    } catch (e) {
      parent.postMessage({ type: 'mc-i18n-error', message: filename + '：' + (e && e.message) }, '*');
      return;
    }
    return origDownload.call(window, blob, filename);
  };
  function clean() {
    ['sponsor-btn', 'visit-counter'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', clean);
  else clean();
})();
