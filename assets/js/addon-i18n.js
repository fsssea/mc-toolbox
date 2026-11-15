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
      '<div class="mci-body"><iframe id="mciFrame" title="附加包汉化工具" src="i18n/index.html"></iframe></div>';
    document.body.appendChild(overlay);
    frame = overlay.querySelector('#mciFrame');
    overlay.querySelector('#mciClose').onclick = close;
    overlay.querySelector('#mciReload').onclick = function () {
      frame.src = 'i18n/index.html?t=' + Date.now();
      toast('已重新载入汉化工具');
    };
    return overlay;
  }

  function open() {
    build();
    overlay.style.display = 'flex';
    if (!inited) {
      inited = true;
      frame.src = 'i18n/index.html';
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

  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (d.type === 'mc-i18n-save-b64' && window.AndroidBridge && window.AndroidBridge.saveBinary) {
      try {
        var path = window.AndroidBridge.saveBinary(d.name, d.b64);
        if (String(path).indexOf('ERR') === 0) toast('保存失败：' + path, true);
        else toast('已保存到应用目录：' + path);
      } catch (err) { toast('保存失败：' + err.message, true); }
    } else if (d.type === 'mc-i18n-saved') {
      toast('已保存到应用目录：' + (d.path || d.name));
    } else if (d.type === 'mc-i18n-error') {
      toast('保存失败：' + (d.message || '未知错误'), true);
    }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
