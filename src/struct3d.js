// 结构文件 3D 等距预览
import { colorOf } from './mapview.js';

export function renderStructure3D(canvas, st, rot = 0) {
  const { size, palette, blocks } = st;
  if (!canvas || !size || !blocks || !blocks.length) return;
  const [sx, sy, sz] = size;
  const cosA = Math.cos(rot * Math.PI / 2), sinA = Math.sin(rot * Math.PI / 2);
  const cellW = 5, cellH = 3;
  const pts = blocks.map(b => {
    const px = b.pos[0], py = b.pos[1], pz = b.pos[2];
    // 绕 Y 轴旋转（整数 90°）
    const rx = Math.round(px * cosA + pz * sinA);
    const rz = Math.round(-px * sinA + pz * cosA);
    return { x: rx, y: py, z: rz, id: b.state };
  });
  let minRx = Infinity, maxRx = -Infinity, minRz = Infinity, maxRz = -Infinity;
  for (const p of pts) { minRx = Math.min(minRx, p.x); maxRx = Math.max(maxRx, p.x); minRz = Math.min(minRz, p.z); maxRz = Math.max(maxRz, p.z); }
  const w = (maxRx - minRx + maxRz - minRz + 2) * cellW + 40;
  const h = (maxRx - minRx + maxRz - minRz + 2) * cellH + sy * cellH + 40;
  canvas.width = Math.min(1200, Math.max(320, w));
  canvas.height = Math.min(900, Math.max(260, h));
  const g = canvas.getContext('2d');
  g.fillStyle = '#0b0f15'; g.fillRect(0, 0, canvas.width, canvas.height);
  const ox = 14 + (maxRx - minRx + 1) * cellW, oy = 20 + sy * cellH;
  // 按深度排序：远的先画
  pts.sort((a, b) => (a.x + a.z + a.y * 0.01) - (b.x + b.z + b.y * 0.01));
  for (const p of pts) {
    const dx = (p.x - minRx + (p.z - minRz)) * cellW / 2 + (maxRx - minRx + 1) * 0;
    const cx = (p.x - p.z) * cellW + canvas.width / 2;
    const cy = oy - p.y * cellH + (p.x + p.z) * cellH / 2 - (minRx + minRz) * 0;
    const name = palette[p.id] || 'minecraft:stone';
    const base = colorOf(name);
    g.fillStyle = shade(base, 0.86);
    g.beginPath();
    g.moveTo(cx, cy); g.lineTo(cx + cellW, cy + cellH / 2); g.lineTo(cx, cy + cellH); g.lineTo(cx - cellW, cy + cellH / 2); g.closePath(); g.fill();
    g.fillStyle = base;
    g.beginPath();
    g.moveTo(cx - cellW, cy + cellH / 2); g.lineTo(cx - cellW, cy + cellH * 1.5); g.lineTo(cx, cy + cellH * 2); g.lineTo(cx, cy + cellH); g.closePath(); g.fill();
    g.fillStyle = shade(base, 1.14);
    g.beginPath();
    g.moveTo(cx + cellW, cy + cellH / 2); g.lineTo(cx + cellW, cy + cellH * 1.5); g.lineTo(cx, cy + cellH * 2); g.lineTo(cx, cy + cellH); g.closePath(); g.fill();
  }
}

function shade(hex, k) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.max(0, Math.min(255, Math.round(r * k)));
  g = Math.max(0, Math.min(255, Math.round(g * k)));
  b = Math.max(0, Math.min(255, Math.round(b * k)));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function colorLegend(names, max = 12) {
  return names.slice(0, max).map(n => `<span class="legenditem"><i style="background:${colorOf(n)}"></i>${n.replace('minecraft:', '')}</span>`).join('');
}
