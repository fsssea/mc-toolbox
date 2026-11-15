export const THEMES = [
  ['auto', '跟随系统'], ['light', '白天'], ['dark', '黑夜'], ['time', '按现实时间'], ['eye', '护眼'],
];

let mode = 'auto';
let mq = null, timer = null;

function resolve() {
  if (mode === 'light') return 'light';
  if (mode === 'dark') return 'dark';
  if (mode === 'eye') return 'eye';
  if (mode === 'time') {
    const h = new Date().getHours();
    return (h >= 7 && h < 19) ? 'light' : 'dark';
  }
  try { return (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark'; }
  catch (e) { return 'dark'; }
}

export function applyTheme() {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = resolve();
  const sel = document.getElementById('themeSel');
  if (sel) sel.value = mode;
}

export function setTheme(m) {
  mode = m;
  try { if (typeof localStorage !== 'undefined') localStorage.setItem('mcbeTheme', m); } catch (e) { }
  applyTheme();
}

export function getThemeMode() { return mode; }

export function installTheme() {
  if (typeof document === 'undefined') return;
  try { if (typeof localStorage !== 'undefined') mode = localStorage.getItem('mcbeTheme') || 'auto'; } catch (e) { }
  applyTheme();
  try {
    mq = window.matchMedia('(prefers-color-scheme: dark)');
    const h = () => { if (mode === 'auto') applyTheme(); };
    if (mq.addEventListener) mq.addEventListener('change', h); else if (mq.addListener) mq.addListener(h);
  } catch (e) { }
  timer = setInterval(() => { if (mode === 'time') applyTheme(); }, 60000);
  if (timer && timer.unref) timer.unref();
  const sel = document.getElementById('themeSel');
  if (sel) {
    sel.innerHTML = THEMES.map(([v, n]) => `<option value="${v}">${n}</option>`).join('');
    sel.value = mode;
    sel.onchange = () => setTheme(sel.value);
    applyTheme();
  }
}

try { const a = typeof localStorage !== 'undefined' && localStorage.getItem('mcbeAccent'); if (a) document.documentElement.style.setProperty('--accent', a); } catch (e) { }
