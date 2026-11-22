/* MC工具箱 6.1.0 附加包汉化（替换原一键汉化入口） */
(function () {
  'use strict';
  if (window.__mcAddonI18nLoaded) return;
  window.__mcAddonI18nLoaded = true;

  var overlay = null, frame = null, inited = false;

  function toast(msg, bad) {
    var t = document.getElementById('mcI18nToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'mcI18nToast';
      t.className = 'mci-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.background = bad ? '#c0392b' : '#2f7df6';
    t.classList.add('on');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('on'); }, 2600);
  }

  function build() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'i18nOverlay';
    overlay.className = 'mci-overlay';
    overlay.innerHTML =
      '<div class="mci-head">' +
        '<span class="mci-title">附加包汉化</span>' +
        '<span class="mci-sub">离线处理 · 文件不上传</span>' +
        '<span class="mci-sp"></span>' +
        '<button class="mci-btn" id="mciReload">重新载入</button>' +
        '<button class="mci-btn mci-close" id="mciClose">关闭</button>' +
      '</div>' +
      '<div class="mci-body"><iframe id="mciFrame" title="附加包汉化工具" src="i18n/index.html?v=2026.11.22-1"></iframe></div>';
    document.body.appendChild(overlay);
    frame = overlay.querySelector('#mciFrame');
    overlay.querySelector('#mciClose').onclick = close;
    overlay.querySelector('#mciReload').onclick = function () {
      frame.src = 'i18n/index.html?v=2026.11.22-1&t=' + Date.now();
      toast('已重新载入汉化工具');
    };
    return overlay;
  }

  function open() {
    build();
    overlay.style.display = 'flex';
    if (!inited) {
      inited = true;
      frame.src = 'i18n/index.html?v=2026.11.22-1';
    }
    document.body.classList.add('mci-lock');
  }

  function close() {
    if (overlay) overlay.style.display = 'none';
    document.body.classList.remove('mci-lock');
  }

  function bind() {
    var btn = document.getElementById('btnLocalize');
    if (btn) btn.addEventListener('click', function (e) {
      // 捕获阶段拦截原“一键汉化”的冒泡监听，改为打开新工具
      e.preventDefault();
      e.stopImmediatePropagation();
      open();
    }, true);
  }

  // Ctrl+L 在捕获阶段接管，旧汉化的快捷键不再生效
  window.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  function b64ToBlob(b64) {
    var bin = atob(String(b64 || '')), len = bin.length, arr = new Uint8Array(len);
    for (var i = 0; i < len; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: 'application/octet-stream' });
  }

  // 浏览器里没有原生桥：在顶层文档里真下载，iframe / iOS 上也能落地
  function saveToBrowser(name, b64) {
    var blob = b64ToBlob(b64);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, name);
      return true;
    }
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.rel = 'noopener';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      try { document.body.removeChild(a); } catch (e) {}
      URL.revokeObjectURL(url);
    }, 4000);
    return true;
  }

  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  window.addEventListener('message', function (e) {
    var d = e.data || {};
    // 只接受自己这个 iframe 发来的消息
    if (frame && e.source && frame.contentWindow && e.source !== frame.contentWindow) return;
    if (d.type === 'mc-i18n-save-b64') {
      try {
        if (window.AndroidBridge && window.AndroidBridge.saveBinary) {
          var path = window.AndroidBridge.saveBinary(d.name, d.b64);
          if (String(path).indexOf('ERR') === 0) toast('保存失败：' + path, true);
          else toast('已保存到 ' + path);
          return;
        }
        saveToBrowser(d.name, d.b64);
        toast(isIOS ? '已开始下载：' + d.name + '（没反应就去「文件」App 里找一下）'
                    : '已开始下载：' + d.name);
      } catch (err) {
        toast('保存失败：' + (err && err.message), true);
      }
    } else if (d.type === 'mc-i18n-saved') {
      toast('已保存到 ' + (d.path || d.name));
    } else if (d.type === 'mc-i18n-error') {
      toast('保存失败：' + (d.message || '未知错误'), true);
    }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
