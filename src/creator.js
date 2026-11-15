// 附加包制作器：贴图生成、包结构生成、脚本模板
export function uuid() {
  const b = new Uint8Array(16);
  if (globalThis.crypto && crypto.getRandomValues) crypto.getRandomValues(b);
  else for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map(x => x.toString(16).padStart(2, '0')).join('');
  return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
}

function hex2rgb(c) {
  const m = /^#?([0-9a-f]{6})$/i.exec(c || '');
  const n = m ? parseInt(m[1], 16) : 0x888888;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function shade(rgb, k) {
  return 'rgb(' + Math.max(0, Math.min(255, Math.round(rgb[0] * k))) + ',' + Math.max(0, Math.min(255, Math.round(rgb[1] * k))) + ',' + Math.max(0, Math.min(255, Math.round(rgb[2] * k))) + ')';
}

function rng(seed) {
  let s = seed || 12345;
  return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
}

/** 生成方块贴图，返回 PNG 字节 */
export async function genBlockTexture(opt) {
  const size = opt.size || 16;
  const style = opt.style || 'solid';
  const a = hex2rgb(opt.c1), b = hex2rgb(opt.c2);
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');
  const px = Math.max(1, Math.floor(size / 16));
  const R = rng(opt.seed || 7);
  const cell = (x, y, col) => { ctx.fillStyle = col; ctx.fillRect(x * px, y * px, px, px); };
  const grid = size / px;
  for (let y = 0; y < grid; y++) for (let x = 0; x < grid; x++) cell(x, y, style === 'noise' || style === 'ore' || style === 'leaves' ? shade(a, 0.75 + R() * 0.5) : shade(a, 1));
  if (style === 'stripes') for (let y = 0; y < grid; y += 2) for (let x = 0; x < grid; x++) cell(x, y, shade(b, 1));
  if (style === 'checker') for (let y = 0; y < grid; y++) for (let x = 0; x < grid; x++) cell(x, y, ((x + y) % 2) ? shade(b, 1) : shade(a, 1));
  if (style === 'bricks') {
    for (let y = 0; y < grid; y++) for (let x = 0; x < grid; x++) {
      const row = Math.floor(y / Math.max(2, Math.floor(grid / 4)));
      const off = row % 2 ? Math.floor(grid / 4) : 0;
      const bx = Math.floor((x + off) / Math.max(2, Math.floor(grid / 4)));
      cell(x, y, (y % Math.max(2, Math.floor(grid / 4)) === 0) ? shade(b, 0.8) : shade(a, 1));
    }
  }
  if (style === 'wood') {
    for (let y = 0; y < grid; y++) for (let x = 0; x < grid; x++) cell(x, y, ((x * 3 + Math.floor(R() * 2)) % 5 === 0) ? shade(b, 0.9) : shade(a, 1));
  }
  if (style === 'ore') {
    for (let i = 0; i < Math.floor(grid * grid / 12); i++) {
      const x = Math.floor(R() * grid), y = Math.floor(R() * grid);
      cell(x, y, shade(b, 1));
    }
  }
  if (style === 'gradient') {
    for (let y = 0; y < grid; y++) for (let x = 0; x < grid; x++) {
      const k = 1 - y / grid;
      cell(x, y, 'rgb(' + Math.round(a[0] * k + b[0] * (1 - k)) + ',' + Math.round(a[1] * k + b[1] * (1 - k)) + ',' + Math.round(a[2] * k + b[2] * (1 - k)) + ')');
    }
  }
  if (style === 'leaves') {
    for (let i = 0; i < Math.floor(grid * grid / 6); i++) {
      const x = Math.floor(R() * grid), y = Math.floor(R() * grid);
      cell(x, y, shrink(shade(b, 1)));
    }
  }
  return dataUrlToBytes(cv.toDataURL('image/png'));
}
function shrink(rgbStr) { return rgbStr; }

/** 物品图标：shape = 方块/圆/菱形/剑/镐/药水 */
export async function genItemTexture(opt) {
  const size = opt.size || 16;
  const shape = opt.shape || 'diamond';
  const a = hex2rgb(opt.c1), b = hex2rgb(opt.c2);
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  const p = size / 16;
  const put = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x * p), Math.round(y * p), Math.round(w * p), Math.round(h * p)); };
  if (shape === 'diamond') {
    for (let y = 0; y < 16; y++) {
      const half = Math.min(y, 15 - y) + 1;
      put(8 - half / 2, y, half, 1, shade(a, 0.8 + y / 24));
    }
    put(7, 5, 2, 6, shade(b, 1));
  } else if (shape === 'circle') {
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
      const d = Math.hypot(x - 7.5, y - 7.5);
      if (d < 6.2) put(x, y, 1, 1, d > 5 ? shade(b, 0.9) : shade(a, 1));
    }
  } else if (shape === 'sword') {
    put(7, 1, 2, 9, shade(a, 1));
    put(7, 1, 1, 9, shade(b, 1));
    put(4, 10, 8, 1, '#c9a227');
    put(7, 11, 2, 4, '#5a3b22');
  } else if (shape === 'pickaxe') {
    put(7, 4, 2, 11, '#5a3b22');
    put(2, 3, 12, 2, shade(a, 1));
    put(1, 5, 3, 1, shade(b, 1)); put(12, 5, 3, 1, shade(b, 1));
  } else if (shape === 'potion') {
    put(6, 2, 4, 2, '#9fd6ff');
    put(5, 4, 6, 10, shade(a, 0.9));
    put(4, 6, 8, 7, shade(a, 1));
    put(6, 8, 3, 5, shade(b, 1));
    put(6, 1, 4, 1, '#6f8fa6');
  } else {
    put(2, 2, 12, 12, shade(a, 1));
    put(2, 2, 12, 2, shade(b, 1));
    put(2, 12, 12, 2, shade(b, 0.7));
  }
  return dataUrlToBytes(cv.toDataURL('image/png'));
}

/** 实体贴图（人形/四足），64×64 标准 UV 布局 */
export async function genEntityTexture(opt) {
  const skin = opt.skin || 'humanoid';
  const a = hex2rgb(opt.c1), b = hex2rgb(opt.c2), eye = opt.eye || '#ffffff';
  const cv = document.createElement('canvas');
  cv.width = 64; cv.height = 64;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,0)'; ctx.fillRect(0, 0, 64, 64);
  const fill = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
  if (skin === 'humanoid') {
    fill(0, 0, 32, 16, shade(a, 1));            // 头部区域
    fill(8, 8, 8, 8, shade(a, 1.05));            // 脸
    fill(10, 10, 2, 2, eye); fill(15, 10, 2, 2, eye);
    fill(16, 16, 24, 16, shade(a, 0.9));         // 身体
    fill(40, 16, 16, 16, shade(b, 1));           // 手臂
    fill(0, 16, 16, 16, shade(b, 0.95));         // 腿
    fill(16, 32, 24, 16, shade(a, 1));
    fill(40, 32, 16, 16, shade(b, 0.9));
    fill(0, 32, 16, 16, shade(b, 0.88));
  } else {
    fill(0, 0, 64, 32, shade(a, 1));             // 四足躯干
    fill(0, 0, 16, 16, shade(a, 1.05));          // 头
    fill(4, 6, 2, 2, '#111'); fill(10, 6, 2, 2, '#111');
    fill(16, 16, 16, 16, shade(b, 1));           // 腿
    fill(32, 16, 16, 16, shade(b, 0.9));
    fill(48, 16, 16, 16, shade(b, 0.8));
    fill(0, 32, 32, 32, shade(a, 0.9));
  }
  return dataUrlToBytes(cv.toDataURL('image/png'));
}

export function dataUrlToBytes(url) {
  const b64 = url.split(',')[1] || '';
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** 生成附加包文件集合 */
export function buildAddon(opt) {
  const ns = (opt.ns || 'demo').replace(/[^a-z0-9_]/gi, '_').toLowerCase();
  const name = opt.name || '我的附加包';
  const kind = opt.kind || 'behavior';
  const te = new TextEncoder();
  const files = [];
  const bpManifest = {
    format_version: 2,
    header: { name, description: name + '（MCBE工具箱生成）', uuid: uuid(), version: [1, 0, 0], min_engine_version: [1, 21, 0] },
    modules: [{ type: 'data', uuid: uuid(), version: [1, 0, 0] }],
    dependencies: [{ module_name: '@minecraft/server', version: '1.11.0' }]
  };
  const rpManifest = {
    format_version: 2,
    header: { name, description: name + ' 资源', uuid: uuid(), version: [1, 0, 0], min_engine_version: [1, 21, 0] },
    modules: [{ type: 'resources', uuid: uuid(), version: [1, 0, 0] }]
  };
  const base = kind === 'addon' ? 'behavior_pack/' : '';
  files.push({ path: base + 'manifest.json', data: te.encode(JSON.stringify(bpManifest, null, 2)) });
  files.push({ path: base + 'scripts/main.js', data: te.encode(scriptTemplate(opt.template || 'spawn', ns, name)) });
  if (kind === 'addon') {
    files.push({ path: 'resource_pack/manifest.json', data: te.encode(JSON.stringify(rpManifest, null, 2)) });
    files.push({ path: 'resource_pack/texts/zh_CN.lang', data: te.encode('pack.name=' + name + '\npack.description=' + name + ' 资源包\n') });
    files.push({ path: 'resource_pack/textures/terrain_texture.json', data: te.encode(JSON.stringify({ resource_pack_name: name, texture_name: 'atlas', texture_data: {} }, null, 2)) });
  }
  files.push({ path: base + 'texts/zh_CN.lang', data: te.encode('pack.name=' + name + '\npack.description=' + name + '\n') });
  return { files, ns, name };
}

export function scriptTemplate(kind, ns, name) {
  const head = '// ' + name + ' · 由 MCBE 工具箱生成（@minecraft/server）\n';
  const t = {
    spawn: `import { world, system } from "@minecraft/server";\n\nworld.afterEvents.playerSpawn.subscribe((ev) => {\n  if (!ev.initialSpawn) return;\n  ev.player.sendMessage("§a欢迎来到 ${name}！");\n});\n\nsystem.runInterval(() => {\n  // 每 200 tick 执行一次，可自行修改\n}, 200);\n`,
    interval: `import { world, system } from "@minecraft/server";\n\nlet seconds = 0;\nsystem.runInterval(() => {\n  seconds += 5;\n  world.sendMessage("§e已运行 " + seconds + " 秒");\n}, 100);\n`,
    blockuse: `import { world } from "@minecraft/server";\n\nworld.afterEvents.playerInteractWithBlock.subscribe((ev) => {\n  if (ev.block.typeId !== "${ns}:custom_block") return;\n  ev.player.sendMessage("§b你使用了自定义方块");\n});\n`,
    itemuse: `import { world } from "@minecraft/server";\n\nworld.afterEvents.itemUse.subscribe((ev) => {\n  if (ev.itemStack.typeId !== "${ns}:custom_item") return;\n  ev.source.sendMessage("§d使用了自定义物品");\n});\n`,
    entity: `import { world } from "@minecraft/server";\n\nworld.afterEvents.entitySpawn.subscribe((ev) => {\n  if (ev.entity.typeId !== "${ns}:custom_entity") return;\n  world.sendMessage("§c自定义实体出现了");\n});\n`,
    command: `import { system } from "@minecraft/server";\n\nsystem.beforeEvents.startup.subscribe((ev) => {\n  ev.customCommandRegistry.registerCommand({\n    name: "${ns}:hello",\n    description: "打招呼",\n  }, () => {\n    return { status: 0 };\n  });\n});\n`
  }[kind] || '';
  return head + t;
}
