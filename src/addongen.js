// 基岩版附加包制作器（重置版）
// 生成行为包 + 资源包，所有 UUID / 贴图本地生成，不依赖在线接口。

export const PROJECT_DEFAULTS = {
  name: '我的附加包',
  namespace: 'demo',
  author: '',
  version: [1, 0, 0],
  texture: { size: 16, c1: '#c62828', c2: '#ff8a80' },
  block: { enabled: true, id: 'ruby_block', zh: '红宝石方块', en: 'Ruby Block', pattern: 'stone', hardness: 1.5 },
  item: { enabled: true, id: 'ruby', zh: '红宝石', en: 'Ruby', maxStack: 64 },
  entity: { enabled: false, id: 'ruby_mob', zh: '红宝石生物', en: 'Ruby Mob', base: 'quadruped', health: 10, speed: 0.25 },
  script: { enabled: false, template: 'welcome' },
};

const ID_RE = /^[a-z][a-z0-9_]{0,31}$/;
const NS_RE = /^[a-z][a-z0-9_]{1,15}$/;
const HEX_RE = /^#[0-9a-f]{6}$/i;

export function localUuid() {
  const c = globalThis.crypto;
  if (c && c.randomUUID) return c.randomUUID();
  const b = new Uint8Array(16);
  if (c && c.getRandomValues) c.getRandomValues(b);
  else for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map(x => x.toString(16).padStart(2, '0')).join('');
  return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
}

export function validateProject(cfg) {
  const errors = [];
  const warnings = [];
  const name = String(cfg.name || '').trim();
  const ns = String(cfg.namespace || '').trim().toLowerCase();
  if (!name) errors.push({ field: 'name', message: '包名不能为空' });
  else if (name.length > 48) errors.push({ field: 'name', message: '包名不要超过 48 个字符' });
  if (!NS_RE.test(ns)) errors.push({ field: 'namespace', message: '命名空间只能用小写字母、数字、下划线，2–16 位，且以字母开头' });
  if (ns === 'minecraft') errors.push({ field: 'namespace', message: '命名空间不能是 minecraft' });
  if (!HEX_RE.test(cfg.texture?.c1 || '') || !HEX_RE.test(cfg.texture?.c2 || '')) {
    errors.push({ field: 'texture', message: '主色和副色必须是 #RRGGBB' });
  }
  if (![16, 32, 64].includes(Number(cfg.texture?.size))) errors.push({ field: 'texture', message: '贴图尺寸只能是 16 / 32 / 64' });

  const ids = [];
  if (cfg.block?.enabled) {
    if (!ID_RE.test(String(cfg.block.id || ''))) errors.push({ field: 'block.id', message: '方块 ID 只能用小写字母、数字、下划线，且以字母开头' });
    else ids.push(ns + ':' + cfg.block.id);
    if (!String(cfg.block.zh || '').trim()) errors.push({ field: 'block.zh', message: '方块中文名不能为空' });
    const h = Number(cfg.block.hardness);
    if (!Number.isFinite(h) || h < 0.1 || h > 30) errors.push({ field: 'block.hardness', message: '挖掘时间需在 0.1–30 秒之间' });
  }
  if (cfg.item?.enabled) {
    if (!ID_RE.test(String(cfg.item.id || ''))) errors.push({ field: 'item.id', message: '物品 ID 只能用小写字母、数字、下划线，且以字母开头' });
    else ids.push(ns + ':' + cfg.item.id);
    if (!String(cfg.item.zh || '').trim()) errors.push({ field: 'item.zh', message: '物品中文名不能为空' });
    const m = Number(cfg.item.maxStack);
    if (!Number.isInteger(m) || m < 1 || m > 64) errors.push({ field: 'item.maxStack', message: '堆叠数量需为 1–64 的整数' });
  }
  if (cfg.entity?.enabled) {
    if (!ID_RE.test(String(cfg.entity.id || ''))) errors.push({ field: 'entity.id', message: '实体 ID 规则同方块' });
    else ids.push(ns + ':' + cfg.entity.id);
    if (!String(cfg.entity.zh || '').trim()) errors.push({ field: 'entity.zh', message: '实体中文名不能为空' });
    const hp = Number(cfg.entity.health);
    if (!Number.isFinite(hp) || hp < 1 || hp > 200) errors.push({ field: 'entity.health', message: '生命值需在 1–200 之间' });
  }
  const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
  if (dup.length) errors.push({ field: 'id', message: '方块、物品、实体不能使用同一个 ID：' + [...new Set(dup)].join('、') });
  if (!cfg.block?.enabled && !cfg.item?.enabled && !cfg.entity?.enabled && !cfg.script?.enabled) {
    errors.push({ field: 'content', message: '至少勾选方块、物品、实体或脚本中的一项' });
  }
  if (cfg.script?.enabled && !['welcome', 'scoreboard', 'particle'].includes(cfg.script.template)) {
    errors.push({ field: 'script', message: '未知的脚本模板' });
  }
  if (cfg.entity?.enabled && cfg.entity.base === 'humanoid' && cfg.script?.enabled) {
    warnings.push({ field: 'entity', message: '人形实体会使用玩家模型和 64×64 贴图，进游戏后建议再调整外观' });
  }
  return { errors, warnings };
}

function canvasPng(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  draw(ctx, w, h);
  const url = c.toDataURL('image/png');
  const b64 = url.slice(url.indexOf(',') + 1);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function hex(c, a) {
  const s = String(c || '#888888').replace('#', '');
  return 'rgba(' + parseInt(s.slice(0, 2), 16) + ',' + parseInt(s.slice(2, 4), 16) + ',' + parseInt(s.slice(4, 6), 16) + ',' + (a ?? 1) + ')';
}

function shade(c, k) {
  const s = String(c || '#888888').replace('#', '');
  const p = [0, 2, 4].map(i => Math.max(0, Math.min(255, Math.round(parseInt(s.slice(i, i + 2), 16) * k))));
  return 'rgb(' + p.join(',') + ')';
}

function noise(ctx, w, h, c1, c2, density, seed = 7) {
  let s = seed;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const px = Math.max(1, Math.floor(w / 16));
  for (let y = 0; y < h; y += px) {
    for (let x = 0; x < w; x += px) {
      ctx.fillStyle = rnd() < (density ?? 0.35) ? hex(c2, 1) : hex(c1, 1);
      ctx.fillRect(x, y, px, px);
    }
  }
}

function drawBlockTexture(ctx, w, h, kind, c1, c2) {
  ctx.fillStyle = hex(c1); ctx.fillRect(0, 0, w, h);
  if (kind === 'wood') {
    ctx.fillStyle = hex(c2);
    for (let x = 0; x < w; x += Math.max(2, Math.floor(w / 8))) ctx.fillRect(x, 0, Math.max(1, Math.floor(w / 32)), h);
    ctx.fillRect(0, Math.floor(h / 2), w, Math.max(1, Math.floor(h / 16)));
  } else if (kind === 'metal') {
    ctx.fillStyle = hex(c2);
    ctx.fillRect(0, 0, w, Math.max(1, Math.floor(h / 8)));
    ctx.fillRect(0, h - Math.max(1, Math.floor(h / 8)), w, Math.max(1, Math.floor(h / 8)));
    ctx.fillStyle = 'rgba(255,255,255,.18)';
    ctx.fillRect(Math.floor(w / 8), 0, Math.max(1, Math.floor(w / 8)), h);
  } else if (kind === 'crystal') {
    ctx.fillStyle = hex(c1); ctx.fillRect(0, 0, w, h);
    const s = w / 4;
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = hex(c2, 0.55);
      ctx.beginPath();
      ctx.moveTo(w / 2, 0); ctx.lineTo(w - s, h / 2); ctx.lineTo(w / 2, h); ctx.lineTo(s, h / 2);
      ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,255,255,.22)';
    ctx.fillRect(Math.floor(w / 2), 0, Math.max(1, Math.floor(w / 16)), Math.max(1, Math.floor(h / 2)));
  } else if (kind === 'wool') {
    noise(ctx, w, h, c1, c2, 0.5);
    ctx.fillStyle = 'rgba(0,0,0,.12)';
    for (let i = 0; i < w; i += 4) ctx.fillRect(i, (i * 3) % h, 2, 2);
  } else if (kind === 'leaves') {
    noise(ctx, w, h, c1, c2, 0.72);
    ctx.fillStyle = 'rgba(0,0,0,.18)';
    for (let i = 0; i < w; i += Math.max(2, Math.floor(w / 8))) ctx.fillRect(i, (i * 5) % h, Math.max(1, Math.floor(w / 16)), Math.max(1, Math.floor(w / 16)));
  } else {
    noise(ctx, w, h, c1, c2, 0.4);
  }
  ctx.strokeStyle = hex(c2, 0.85);
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
}

function drawItemTexture(ctx, w, h, c1, c2) {
  ctx.clearRect(0, 0, w, h);
  const u = w / 16;
  const gem = [
    [7, 1], [8, 1], [9, 1],
    [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
    [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
    [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
    [6, 9], [7, 9], [8, 9], [9, 9],
    [7, 11], [8, 11],
  ];
  for (const [x, y] of gem) {
    ctx.fillStyle = (x + y) % 3 === 0 ? hex(c2) : hex(c1);
    ctx.fillRect(x * u, y * u, u, u);
  }
  ctx.fillStyle = 'rgba(255,255,255,.5)';
  ctx.fillRect(6 * u, 3 * u, u, u);
  ctx.fillRect(5 * u, 5 * u, u, u);
  ctx.fillStyle = 'rgba(0,0,0,.25)';
  ctx.fillRect(8 * u, 9 * u, u, u);
  ctx.fillRect(7 * u, 11 * u, u, u);
}

function drawEntityTexture(ctx, w, h, base, c1, c2) {
  ctx.clearRect(0, 0, w, h);
  if (base === 'humanoid') {
    const u = w / 64;
    const box = (x, y, bw, bh, c) => { ctx.fillStyle = hex(c); ctx.fillRect(x * u, y * u, bw * u, bh * u); };
    box(0, 0, 32, 16, c1);
    box(8, 8, 8, 8, shade(c1, 1.05));
    box(10, 10, 2, 2, '#ffffff'); box(14, 10, 2, 2, '#ffffff');
    box(11, 11, 1, 1, '#111111'); box(15, 11, 1, 1, '#111111');
    box(16, 16, 24, 16, shade(c1, 0.92));
    box(40, 16, 16, 16, hex(c2)); box(0, 16, 16, 16, shade(c2, 0.92));
    box(16, 32, 24, 16, shade(c1, 1.02));
    box(40, 32, 16, 16, shade(c2, 0.88)); box(0, 32, 16, 16, shade(c2, 0.84));
  } else {
    const u = w / 64;
    const box = (x, y, bw, bh, c) => { ctx.fillStyle = hex(c); ctx.fillRect(x * u, y * u, bw * u, bh * u); };
    box(0, 0, 64, 16, shade(c1, 1.02));
    box(0, 0, 16, 16, shade(c1, 1.08));
    box(4, 6, 2, 2, '#111'); box(10, 6, 2, 2, '#111');
    box(16, 16, 16, 16, hex(c2)); box(32, 16, 16, 16, shade(c2, 0.9));
    box(48, 16, 16, 16, shade(c2, 0.82));
    box(0, 16, 64, 16, shade(c1, 0.92));
  }
}

function packIcon(size, c1, c2, pattern) {
  return canvasPng(size, size, (ctx) => {
    ctx.fillStyle = '#10141c';
    ctx.fillRect(0, 0, size, size);
    const s = size / 16;
    // 等距草方块：顶面亮、左面中、右面暗
    const put = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x * s, y * s, w * s, h * s); };
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        if (y < 3) put(x, y, 1, 1, shade(c1, 1.15 + (x + y) % 2 * 0.08));
        else if (y < 5) put(x, y, 1, 1, shade(c1, 1.0));
        else put(x, y, 1, 1, shade(c1, 0.78 + (x + y) % 2 * 0.06));
      }
    }
    put(3, 4, 10, 1, shade(c2, 1.1));
    put(3, 5, 10, 4, shade(c1, 0.92));
    put(3, 9, 10, 2, shade(c1, 0.72));
    ctx.strokeStyle = shade(c2, 1.2);
    ctx.lineWidth = Math.max(1, size / 64);
    ctx.strokeRect(2.5 * s, 3.5 * s, 11 * s, 9 * s);
  });
}

function entityTexture(base, c1, c2, size = 64) {
  const [w, h] = base === 'humanoid' ? [64, 64] : [64, 32];
  return canvasPng(w, h, (ctx) => drawEntityTexture(ctx, w, h, base, c1, c2));
}

export function previewTexture(kind, size, c1, c2, entity) {
  const n = Number(size) || 16;
  if (kind === 'entity') return entityTexture(entity === 'humanoid' ? 'humanoid' : 'quadruped', c1, c2, n);
  return canvasPng(n, n, (ctx) => {
    if (kind === 'item') drawItemTexture(ctx, n, n, c1, c2);
    else drawBlockTexture(ctx, n, n, kind, c1, c2);
  });
}

export function pngDataUrl(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return 'data:image/png;base64,' + btoa(bin);
}

function scriptBody(template, ns) {
  const head = '// 由 MC工具箱附加包制作器生成\nimport { world, system } from "@minecraft/server";\n\n';
  if (template === 'particle') return head + `system.runInterval(() => {\n  for (const p of world.getAllPlayers()) {\n    p.dimension.spawnParticle("minecraft:campfire_tick_particle", {\n      x: p.location.x, y: p.location.y + 0.2, z: p.location.z\n    });\n  }\n}, 20);\n`;
  if (template === 'scoreboard') return head + `world.afterEvents.playerSpawn.subscribe(({ player }) => {\n  try {\n    world.scoreboard.addObjective("points", "积分");\n    const obj = world.scoreboard.getObjective("points");\n    obj.setScore(player, (obj.getScore(player) || 0) + 1);\n    player.sendMessage("§a当前积分：" + obj.getScore(player));\n  } catch (e) { console.warn(e); }\n});\n`;
  return head + `world.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {\n  if (!initialSpawn) return;\n  player.sendMessage("§b欢迎来到 ${ns} 的世界");\n});\n`;
}

export function buildProject(cfg) {
  const ns = String(cfg.namespace || 'demo').trim().toLowerCase();
  const name = String(cfg.name || '我的附加包').trim();
  const author = String(cfg.author || '').trim() || 'MC工具箱';
  const ver = Array.isArray(cfg.version) ? cfg.version : [1, 0, 0];
  const t = cfg.texture || {};
  const c1 = t.c1 || '#c62828', c2 = t.c2 || '#ff8a80';
  const size = Number(t.size) || 16;
  const dirB = `behavior_packs/${ns}_bp`;
  const dirR = `resource_packs/${ns}_rp`;
  const entries = [];
  const U = (path, text) => {
    const data = new TextEncoder().encode(text);
    const i = entries.findIndex(e => e.path === path);
    if (i >= 0) entries[i].data = data; else entries.push({ path, data });
  };
  const A = (path, text) => {
    const i = entries.findIndex(e => e.path === path);
    if (i >= 0) {
      const old = new TextDecoder().decode(entries[i].data);
      entries[i].data = new TextEncoder().encode(old + (old.endsWith('\n') || !old ? '' : '\n') + text);
    } else entries.push({ path, data: new TextEncoder().encode(text) });
  };
  const B = (path, bytes) => {
    const i = entries.findIndex(e => e.path === path);
    if (i >= 0) entries[i].data = bytes; else entries.push({ path, data: bytes });
  };
  const J = (path, obj) => U(path, JSON.stringify(obj, null, 2));

  const bpUuid = localUuid(), rpUuid = localUuid();
  const bpModUuid = localUuid(), rpModUuid = localUuid();
  const scriptUuid = localUuid();
  const minEngine = [1, 21, 0];
  const bpManifest = {
    format_version: 2,
    header: { name: name + ' 行为包', description: name + ' 行为包', uuid: bpUuid, version: ver, min_engine_version: minEngine },
    modules: [{ type: 'data', uuid: bpModUuid, version: ver }],
    metadata: { authors: [author], generated_with: { mcbe_toolbox: ['6.3.0'] } }
  };
  if (cfg.script?.enabled) {
    bpManifest.modules.push({ type: 'script', language: 'javascript', uuid: scriptUuid, entry: 'scripts/main.js', version: ver });
    bpManifest.dependencies = [{ module_name: '@minecraft/server', version: '1.11.0' }];
  }
  const rpManifest = {
    format_version: 2,
    header: { name: name + ' 资源包', description: name + ' 资源包', uuid: rpUuid, version: ver, min_engine_version: minEngine },
    modules: [{ type: 'resources', uuid: rpModUuid, version: ver }],
    dependencies: [{ uuid: bpUuid, version: ver }],
    metadata: { authors: [author], generated_with: { mcbe_toolbox: ['6.3.0'] } }
  };

  const icon = packIcon(128, c1, c2, cfg.block?.pattern || 'stone');
  B(`${dirB}/pack_icon.png`, icon);
  B(`${dirR}/pack_icon.png`, icon);
  J(`${dirB}/manifest.json`, bpManifest);
  J(`${dirR}/manifest.json`, rpManifest);

  const lang = { zh: [], en: [] };
  lang.zh.push('pack.name=' + name + ' 行为包', 'pack.description=' + name + ' 行为包');
  lang.en.push('pack.name=' + name + ' BP', 'pack.description=' + name + ' behavior pack');

  const texKeyBlock = cfg.block?.enabled ? `${ns}_${cfg.block.id}` : '';
  if (cfg.block?.enabled) {
    const b = cfg.block;
    B(`${dirR}/textures/blocks/${texKeyBlock}.png`, previewTexture(b.pattern, size, c1, c2));
    J(`${dirR}/textures/terrain_texture.json`, {
      resource_pack_name: name, texture_name: 'atlas.terrain', padding: 8, num_mip_levels: 4,
      texture_data: { [texKeyBlock]: { textures: [`textures/blocks/${texKeyBlock}`] } }
    });
    J(`${dirR}/blocks.json`, { format_version: [1, 1, 0], [`${ns}:${b.id}`]: { textures: texKeyBlock, sound: 'stone' } });
    J(`${dirB}/blocks/${b.id}.json`, {
      format_version: '1.21.0',
      'minecraft:block': {
        description: { identifier: `${ns}:${b.id}`, menu_category: { category: 'construction' } },
        components: {
          'minecraft:material_instances': { '*': { texture: texKeyBlock, render_method: 'opaque' } },
          'minecraft:destructible_by_mining': { seconds_to_destroy: Number(b.hardness) || 1.5 },
          'minecraft:destructible_by_explosion': { explosion_resistance: 3 },
          'minecraft:light_dampening': 15,
          'minecraft:map_color': c1
        }
      }
    });
    lang.zh.push(`tile.${ns}:${b.id}.name=${b.zh || '自定义方块'}`);
    lang.en.push(`tile.${ns}:${b.id}.name=${b.en || 'Custom Block'}`);
  }

  const texKeyItem = cfg.item?.enabled ? `${ns}_${cfg.item.id}` : '';
  if (cfg.item?.enabled) {
    const it = cfg.item;
    B(`${dirR}/textures/items/${texKeyItem}.png`, previewTexture('item', size, c1, c2));
    J(`${dirR}/textures/item_texture.json`, {
      resource_pack_name: name, texture_name: 'atlas.items',
      texture_data: { [texKeyItem]: { textures: [`textures/items/${texKeyItem}`] } }
    });
    J(`${dirB}/items/${it.id}.json`, {
      format_version: '1.21.0',
      'minecraft:item': {
        description: { identifier: `${ns}:${it.id}`, menu_category: { category: 'items' } },
        components: {
          'minecraft:icon': { texture: texKeyItem },
          'minecraft:max_stack_size': Number(it.maxStack) || 64
        }
      }
    });
    lang.zh.push(`item.${ns}:${it.id}.name=${it.zh || '自定义物品'}`);
    lang.en.push(`item.${ns}:${it.id}.name=${it.en || 'Custom Item'}`);
  }

  if (cfg.entity?.enabled) {
    const e = cfg.entity;
    const base = e.base === 'humanoid' ? 'humanoid' : 'quadruped';
    const hp = Math.max(1, Number(e.health) || 10);
    B(`${dirR}/textures/entity/${ns}_${e.id}/${ns}_${e.id}.png`, entityTexture(base, c1, c2));
    J(`${dirB}/entities/${e.id}.json`, {
      format_version: '1.21.0',
      'minecraft:entity': {
        description: { identifier: `${ns}:${e.id}`, is_spawnable: true, is_summonable: true },
        components: {
          'minecraft:type_family': { family: ['custom', 'mob'] },
          'minecraft:health': { value: hp, max: hp },
          'minecraft:movement': { value: Number(e.speed) || 0.25 },
          'minecraft:navigation.walk': { can_path_over_water: true },
          'minecraft:movement.basic': {},
          'minecraft:jump.static': {},
          'minecraft:physics': {},
          'minecraft:collision_box': { width: 0.9, height: 0.9 },
          'minecraft:behavior.random_stroll': { priority: 6, speed_multiplier: 1 },
          'minecraft:behavior.look_at_player': { priority: 7, look_distance: 6 },
          'minecraft:behavior.random_look_around': { priority: 8 }
        }
      }
    });
    J(`${dirR}/entity/${ns}_${e.id}.json`, {
      format_version: '1.10.0',
      'minecraft:client_entity': {
        description: {
          identifier: `${ns}:${e.id}`,
          materials: { default: 'entity_alphatest' },
          textures: { default: `textures/entity/${ns}_${e.id}/${ns}_${e.id}` },
          geometry: { default: base === 'humanoid' ? 'geometry.humanoid.custom' : 'geometry.pig' },
          render_controllers: [base === 'humanoid' ? 'controller.render.humanoid' : 'controller.render.pig'],
          spawn_egg: { base_color: c1, overlay_color: c2 }
        }
      }
    });
    lang.zh.push(`entity.${ns}:${e.id}.name=${e.zh || '自定义生物'}`);
    lang.en.push(`entity.${ns}:${e.id}.name=${e.en || 'Custom Mob'}`);
  }

  if (cfg.script?.enabled) {
    U(`${dirB}/scripts/main.js`, scriptBody(cfg.script.template, ns));
  }

  U(`${dirB}/texts/zh_CN.lang`, lang.zh.join('\n') + '\n');
  U(`${dirB}/texts/en_US.lang`, lang.en.join('\n') + '\n');
  U(`${dirR}/texts/zh_CN.lang`, lang.zh.join('\n') + '\n');
  U(`${dirR}/texts/en_US.lang`, lang.en.join('\n') + '\n');
  U(`${dirB}/README.md`, `# ${name}\n\n由 MC工具箱附加包制作器（重置版）生成。\n\n- 命名空间：${ns}\n- 脚本：${cfg.script?.enabled ? cfg.script.template : '无'}\n- 安装：用 Minecraft 打开 .mcaddon 即可导入。\n`);

  const stats = { files: entries.length, dirB, dirR, uuids: cfg.script?.enabled ? 5 : 4 };
  return { entries, dirB, dirR, stats };
}

export const ENTITY_LIST = ['quadruped', 'humanoid'];
export const SNIPPETS = [
  { lang: 'JSON', title: '方块定义（最小可运行）', code: `{\n  "format_version": "1.21.0",\n  "minecraft:block": {\n    "description": { "identifier": "demo:my_block" },\n    "components": {\n      "minecraft:material_instances": { "*": { "texture": "my_block", "render_method": "opaque" } }\n    }\n  }\n}` },
  { lang: 'JS', title: '进服欢迎', code: `import { world } from "@minecraft/server";\nworld.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {\n  if (initialSpawn) player.sendMessage("§a欢迎！");\n});` },
  { lang: 'JS', title: '定时粒子', code: `import { world, system } from "@minecraft/server";\nsystem.runInterval(() => {\n  for (const p of world.getAllPlayers()) p.dimension.spawnParticle("minecraft:campfire_tick_particle", p.location);\n}, 20);` },
];
