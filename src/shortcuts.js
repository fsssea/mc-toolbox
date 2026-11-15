// 5.0.2 外接键鼠快捷键（安卓 / Windows 共用）
import { enterImmersive } from './display.js';

const $ = (id) => document.getElementById(id);
const IS_ELECTRON = /Electron/i.test(navigator.userAgent || '');
const isEditable = (el) => {
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
};
const clickIf = (id) => {
  const b = $(id);
  if (!b || b.disabled) return false;
  if (getComputedStyle(b).display === 'none') return false;
  b.click(); return true;
};
const closeModal = () => { const m = $('modal'); if (m && getComputedStyle(m).display !== 'none') { m.style.display = 'none'; return true; } return false; };
const toggleFull = () => enterImmersive(!document.body.classList.contains('immersive'));
const goBackList = () => ['mapBack','nbtBack','dbBack','stBack'].some(id => clickIf(id));
const saveEditor = () => {
  const ed = $('editor');
  if (!ed) return false;
  const b = [...ed.querySelectorAll('button')].find(x => x.textContent.includes('保存修改') || x.textContent === '保存');
  if (b) { b.click(); return true; }
  return false;
};

export const SHORTCUTS = [
  { keys: 'Ctrl+S', label: '导出 / 另存', run: () => clickIf('btnExport') },
  { keys: 'Ctrl+O', label: '打开文件', run: () => clickIf('pickBtn') },
  { keys: 'Ctrl+F', label: '搜索文件', run: () => window.dispatchEvent(new CustomEvent('mcShortcut', { detail: 'search' })) },
  { keys: 'Ctrl+Shift+F', label: '搜索文件内容', run: () => window.dispatchEvent(new CustomEvent('mcShortcut', { detail: 'contentSearch' })) },
  { keys: 'Ctrl+T', label: '更多工具', run: () => clickIf('btnTools') },
  { keys: 'Ctrl+M', label: '世界观看', run: () => clickIf('btnMap') },
  { keys: 'Ctrl+P', label: '玩家数据', run: () => clickIf('btnPlayer') },
  { keys: 'Ctrl+L', label: '一键汉化', run: () => clickIf('btnLocalize') },
  { keys: 'Ctrl+N', label: '新建文件', run: () => clickIf('btnNewFile') },
  { keys: 'Ctrl+Shift+D', label: '世界统计', run: () => clickIf('btnStats') },
  { keys: 'Ctrl+Shift+R', label: '重命名', run: () => clickIf('btnRename') },
  { keys: 'Ctrl+Enter', label: '保存当前编辑', run: saveEditor },
  { keys: 'F11', label: '全屏 / 退出全屏', run: toggleFull },
  { keys: 'Alt+Enter', label: '全屏 / 退出全屏', run: toggleFull },
  { keys: 'F1', label: '快捷键帮助', run: () => openShortcutHelp() },
  { keys: 'Shift+/', label: '快捷键帮助', run: () => openShortcutHelp() },
  { keys: 'Esc', label: '关闭弹窗 / 退出全屏', run: () => { if (!closeModal() && document.body.classList.contains('immersive')) toggleFull(); } },
  { keys: 'Alt+Left', label: '返回文件列表', run: goBackList },
  { keys: '鼠标侧键', label: '关闭弹窗 / 返回', run: () => { if (!closeModal()) goBackList(); } },
];

function normalize(e) {
  const parts = [];
  if (e.ctrlKey || e.metaKey) parts.push('Ctrl');
  if (e.altKey) parts.push('Alt');
  if (e.shiftKey) parts.push('Shift');
  let key = e.key;
  if (key === ' ') key = 'Space';
  if (key === '/') key = '/';
  if (key === '?') key = '?';
  if (key === 'Enter') key = 'Enter';
  if (key === 'Escape') key = 'Esc';
  if (key.length === 1) key = key.toUpperCase();
  parts.push(key);
  return parts.join('+');
}

function findShortcut(e) {
  const combo = normalize(e);
  return SHORTCUTS.find(s => s.keys === combo) ||
    (combo === 'Shift+?' ? SHORTCUTS.find(s => s.keys === 'Shift+/') : null);
}

export function openShortcutHelp() {
  const body = $('modalBody');
  if (!body) return;
  body.innerHTML = `<h3>快捷键（外接键盘 / Windows）</h3>
    <p class="muted">接上蓝牙或 USB 键盘、鼠标后直接可用；Windows 端同一套快捷键。</p>
    <div class="legend">${SHORTCUTS.map(s => `<div class="nbtrow"><code>${s.keys}</code><span>${s.label}</span></div>`).join('')}</div>
    <p class="muted">输入框内只有 Esc、F1、F11 会生效，避免打断打字。鼠标：左键选择文件，右键文件可重命名 / 删除。</p>
    <div class="skbar"><button id="scClose" class="ghost">关闭</button></div>`;
  $('modal').style.display = 'flex';
  $('scClose').onclick = () => { $('modal').style.display = 'none'; };
}

function closeMenu() {
  const m = $('ctxMenu');
  if (m) m.remove();
}

function showTreeMenu(x, y, node) {
  closeMenu();
  const menu = document.createElement('div');
  menu.id = 'ctxMenu'; menu.className = 'ctxmenu';
  menu.style.left = Math.min(x, window.innerWidth - 170) + 'px';
  menu.style.top = Math.min(y, window.innerHeight - 100) + 'px';
  menu.innerHTML = '<button data-a="rename">重命名</button><button data-a="delete" class="danger">删除</button>';
  document.body.appendChild(menu);
  menu.querySelector('[data-a=rename]').onclick = () => { closeMenu(); node.click(); setTimeout(() => clickIf('btnRename'), 0); };
  menu.querySelector('[data-a=delete]').onclick = () => { closeMenu(); node.click(); setTimeout(() => clickIf('btnDelete'), 0); };
  setTimeout(() => document.addEventListener('pointerdown', closeMenu, { once: true }), 0);
}

export function initShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (e.defaultPrevented) return;
    const editable = isEditable(e.target);
    const hit = findShortcut(e);
    if (!hit) return;
    // Electron 主进程已处理 F11/Alt+Enter，渲染层不再重复切换
    if (IS_ELECTRON && (hit.keys === 'F11' || hit.keys === 'Alt+Enter')) return;
    // 输入状态下只放行帮助和全屏，Esc 交给输入框自身
    if (editable && !/^(F1|F11|Alt\+Enter|Shift\+\/|Shift\+\?)$/.test(hit.keys)) return;
    if (hit.keys === 'Esc' && editable) return;
    e.preventDefault();
    e.stopPropagation();
    hit.run();
  }, true);

  // 鼠标：文件树右键菜单
  const tree = $('tree');
  if (tree) {
    tree.addEventListener('contextmenu', (e) => {
      const node = e.target.closest && e.target.closest('.node.file');
      if (!node) return;
      e.preventDefault();
      showTreeMenu(e.clientX, e.clientY, node);
    });
  }
  window.addEventListener('mouseup', (e) => {
    if (e.button === 3 || e.button === 4) {
      if (!closeModal()) goBackList();
      e.preventDefault();
    }
  });
  window.addEventListener('auxclick', (e) => { if (e.button === 3 || e.button === 4) e.preventDefault(); });
  window.addEventListener('blur', closeMenu);
  window.addEventListener('resize', closeMenu);
}
