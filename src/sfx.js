// 5.0.3 按钮音效：WebAudio 实时合成，不打包音频文件
const KEY = 'mcbeSfx';
let ctx = null;
let enabled = true;
try { enabled = localStorage.getItem(KEY) !== '0'; } catch (e) { }

function ensureCtx() {
  if (!enabled) return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    try { ctx = new AC(); } catch (e) { return null; }
  }
  if (ctx.state === 'suspended') { try { ctx.resume(); } catch (e) { } }
  return ctx;
}

function tone(freq, dur, type, gain, slideTo) {
  const c = ensureCtx();
  if (!c) return;
  const t0 = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type || 'triangle';
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain || 0.18, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g); g.connect(c.destination);
  osc.start(t0); osc.stop(t0 + dur + 0.02);
}

function noise(dur, gain) {
  const c = ensureCtx();
  if (!c) return;
  const n = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, n, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n) ** 2;
  const src = c.createBufferSource(); src.buffer = buf;
  const g = c.createGain(); g.gain.value = gain || 0.05;
  src.connect(g); g.connect(c.destination); src.start();
}

export function playSfx(kind) {
  if (!enabled) return;
  switch (kind) {
    case 'primary':
      tone(760, 0.055, 'square', 0.10);
      tone(1140, 0.045, 'triangle', 0.07);
      noise(0.035, 0.025);
      break;
    case 'soft':
      tone(520, 0.05, 'sine', 0.10);
      break;
    case 'open':
      tone(420, 0.07, 'triangle', 0.12, 760);
      break;
    case 'close':
      tone(680, 0.07, 'triangle', 0.10, 340);
      break;
    case 'toggle':
      tone(560, 0.06, 'square', 0.08, 980);
      break;
    case 'success':
      tone(660, 0.05, 'triangle', 0.10);
      setTimeout(() => tone(880, 0.05, 'triangle', 0.10), 55);
      setTimeout(() => tone(1320, 0.07, 'triangle', 0.09), 110);
      break;
    case 'warn':
      tone(300, 0.09, 'sawtooth', 0.10, 200);
      break;
    case 'error':
      tone(220, 0.12, 'sawtooth', 0.12, 150);
      break;
    default:
      tone(900, 0.035, 'square', 0.07);
      noise(0.025, 0.03);
  }
}

function kindOf(el) {
  if (!el) return 'click';
  if (el.id === 'btnExport' || el.id === 'btnLocalize' || el.id === 'btnTools') return 'success';
  if (el.id === 'btnFull' || el.id === 'btnSfx') return 'toggle';
  if (/Close$|^tbClose|^keyClose|^scClose/.test(el.id || '')) return 'close';
  if (el.classList && el.classList.contains('danger')) return 'warn';
  if (el.classList && el.classList.contains('primary')) return 'primary';
  if (el.classList && el.classList.contains('ghost')) return 'soft';
  if (el.classList && (el.classList.contains('toolcard') || el.classList.contains('toolitem'))) return 'open';
  if (el.classList && el.classList.contains('slotrow')) return 'soft';
  if (el.classList && el.classList.contains('node')) return el.classList.contains('dir') ? 'open' : 'click';
  if (el.tagName === 'SELECT') return 'soft';
  return 'click';
}

function targetOf(e) {
  const t = e.target;
  if (!t || !t.closest) return null;
  return t.closest('button, .node, .toolcard, .toolitem, .slotrow, select, canvas');
}

export function initSfx() {
  const btn = document.getElementById('btnSfx');
  const sync = () => { if (btn) { btn.textContent = enabled ? '音效开' : '音效关'; btn.classList.toggle('mutedbtn', !enabled); } };
  sync();
  if (btn) btn.addEventListener('click', () => {
    enabled = !enabled;
    try { localStorage.setItem(KEY, enabled ? '1' : '0'); } catch (e) { }
    sync();
    if (enabled) playSfx('success');
  });

  document.addEventListener('pointerdown', (e) => {
    const el = targetOf(e);
    if (!el) return;
    // 画布上的点击音更轻
    playSfx(el.tagName === 'CANVAS' ? 'soft' : kindOf(el));
  }, true);

  // 键盘 / 程序触发的点击（detail === 0）也补一声
  document.addEventListener('click', (e) => {
    if (e.detail !== 0) return;
    const el = targetOf(e);
    if (el) playSfx(kindOf(el));
  }, true);

  document.addEventListener('change', (e) => {
    if (e.target && e.target.tagName === 'SELECT') playSfx('soft');
  }, true);
}
