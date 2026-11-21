/* 自动换行（软换行）开关 —— MC工具箱
 * 作用：代码区屏幕装不下时，长行自动折到下一行显示，方便看和改；
 *      只在“显示层”折行，绝不往代码内容里插入换行符，保存/导出仍是一行。
 * 覆盖：代码编辑器（.codeedit：高亮层 + 输入层）以及弹窗里的只读代码框（textarea.code）。
 * 状态：localStorage 记忆，Alt/⌘ + W 可快捷切换。
 */
(function () {
  var KEY = 'mct.autowrap';
  var on = false;
  try { on = localStorage.getItem(KEY) === '1'; } catch (e) { }

  var CSS = [
    '.cwbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:2px 0 4px;font:12px/1.4 ui-monospace,Menlo,Consolas,monospace;color:var(--muted,#8b98a8)}',
    '.cwbtn{font:12px/1 ui-monospace,Menlo,Consolas,monospace;padding:6px 10px;border-radius:7px;border:1px solid var(--line,#2a3441);background:var(--panel,#141b23);color:var(--fg,#e6edf5);cursor:pointer;white-space:nowrap}',
    '.cwbtn[aria-pressed="true"]{background:#1f6feb;border-color:#1f6feb;color:#fff}',
    '.cwhint{opacity:.72}',
    /* 编辑器：两层同步软换行 */
    '.codeedit.cw-on .codehi,.codeedit.cw-on .code{white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;overflow-x:hidden}',
    '.codeedit.cw-on .codehi{overflow:hidden}',
    '.codeedit.cw-on .code{overflow-y:auto}',
    /* 弹窗只读代码框 */
    'textarea.code.cw-on{white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;overflow-x:hidden}'
  ].join('\n');

  var style = document.createElement('style');
  style.id = 'cw-style';
  style.textContent = CSS;
  (document.head || document.documentElement).appendChild(style);

  function syncSb(w) {
    var ta = w.querySelector('textarea.code');
    var pre = w.querySelector('.codehi');
    if (!ta || !pre) return;
    var sbw = on ? (ta.offsetWidth - ta.clientWidth) : 0;
    pre.style.right = sbw > 0 ? sbw + 'px' : '0px';
  }

  function paint() {
    var eds = document.querySelectorAll('.codeedit');
    for (var i = 0; i < eds.length; i++) {
      eds[i].classList.toggle('cw-on', on);
      syncSb(eds[i]);
    }
    var tas = document.querySelectorAll('textarea.code');
    for (var j = 0; j < tas.length; j++) {
      if (tas[j].closest('.codeedit')) continue;
      tas[j].classList.toggle('cw-on', on);
    }
    var btns = document.querySelectorAll('.cwbtn');
    for (var k = 0; k < btns.length; k++) {
      btns[k].setAttribute('aria-pressed', on ? 'true' : 'false');
      btns[k].textContent = on ? '自动换行：开' : '自动换行：关';
      btns[k].title = 'Alt/⌘ + W 快捷键切换';
    }
  }

  function persist() { try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) { } }

  function buildBar() {
    var bar = document.createElement('div');
    bar.className = 'cwbar';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cwbtn';
    btn.onclick = function () { on = !on; persist(); paint(); };
    var hint = document.createElement('span');
    hint.className = 'cwhint';
    hint.textContent = '只折行显示，不写入换行符';
    bar.appendChild(btn);
    bar.appendChild(hint);
    return bar;
  }

  var bar = null;
  function ensureBar() {
    // 编辑器容器各版不同：新版网页版在 #editor 里，老版 APK 直接挂在面板里。
    // 以「第一个 .codeedit 的父节点」为准；没有编辑器就退回到 #editor。
    var ed = document.querySelector('.codeedit');
    if (!ed) {
      if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
      bar = null;
      return;
    }
    var host = ed.parentNode || document.getElementById('editor');
    if (!host) return;
    if (!bar) bar = buildBar();
    if (bar.parentNode !== host || bar.nextElementSibling !== ed) host.insertBefore(bar, ed);
  }

  var timer = null;
  function tick() {
    clearTimeout(timer);
    timer = setTimeout(function () { ensureBar(); paint(); }, 60);
  }

  try {
    new MutationObserver(tick).observe(document.body, { childList: true, subtree: true });
  } catch (e) { }
  window.addEventListener('resize', function () { paint(); });
  document.addEventListener('keydown', function (e) {
    if ((e.altKey || e.metaKey) && (e.key === 'w' || e.key === 'W')) {
      e.preventDefault(); on = !on; persist(); paint();
    }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick);
  else tick();
})();
