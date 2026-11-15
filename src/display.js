// 5.0.1 大屏 / 投屏全屏适配
const $ = (id) => document.getElementById(id);

export function isBig() {
  return window.innerWidth >= 900 || (window.matchMedia && window.matchMedia('(min-width: 900px)').matches);
}

export function applyBig(big) {
  document.body.classList.toggle('bigscreen', !!big);
}

export function enterImmersive(on) {
  const body = document.body;
  body.classList.toggle('immersive', !!on);
  try { if (window.AndroidBridge && window.AndroidBridge.setFullscreen) window.AndroidBridge.setFullscreen(!!on); } catch (e) { }
  if (on) {
    try { if (document.documentElement.requestFullscreen && !window.AndroidBridge) document.documentElement.requestFullscreen(); } catch (e) { }
  } else {
    try { if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen(); } catch (e) { }
  }
  try { localStorage.setItem('mcbeImmersive', on ? '1' : '0'); } catch (e) { }
  const btn = $('btnFull');
  if (btn) btn.textContent = on ? '退出全屏' : '全屏';
  const ex = $('fsExit');
  if (ex) ex.style.display = on ? 'block' : 'none';
}

export function initDisplay() {
  // 大屏自动布局：PC、电视、桌面模式、横屏平板
  let big = isBig();
  try { const saved = localStorage.getItem('mcbeBig'); if (saved !== null) big = saved === '1' ? true : (isBig() && saved !== '0'); } catch (e) { }
  applyBig(big);

  let raf = 0;
  const onResize = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      applyBig(isBig());
    });
  };
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', () => setTimeout(onResize, 300));

  let immersive = false;
  try { immersive = localStorage.getItem('mcbeImmersive') === '1'; } catch (e) { }
  if (immersive) enterImmersive(true);

  const btn = $('btnFull');
  if (btn) btn.addEventListener('click', () => {
    immersive = !document.body.classList.contains('immersive');
    enterImmersive(immersive);
  });

  // 双击标题切换全屏，方便电视遥控/桌面快捷操作
  const h1 = document.querySelector('header h1');
  if (h1) h1.addEventListener('dblclick', () => enterImmersive(!document.body.classList.contains('immersive')));
}


