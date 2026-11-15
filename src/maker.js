// 附加包制作器：生成 manifest / 方块 / 物品 / 实体 / 贴图 / 脚本
const V3 = [1, 0, 0];

export function localUuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const b = new Uint8Array(16); crypto.getRandomValues(b);
  b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map(x => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
}

/** 在线 UUID（公共接口）；失败返回 null，由调用方回退本地生成 */
export async function onlineUuid(timeout = 4000) {
  const urls = ['https://www.uuidgenerator.net/api/version4', 'https://api.uuid4.org'];
  for (const u of urls) {
    try {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), timeout);
      const r = await fetch(u, { signal: c.signal });
      clearTimeout(t);
      if (!r.ok) continue;
      const txt = (await r.text()).trim();
      const m = txt.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
      if (m) return m[0];
    } catch (e) { /* 试下一个 */ }
  }
  return null;
}

export async function newUuid(online) {
  if (online) {
    try { const u = await onlineUuid(); if (u) return { uuid: u, source: 'online' }; } catch (e) { }
  }
  return { uuid: localUuid(), source: 'local' };
}

function bytesFromDataUrl(url) {
  const b64 = url.split(',')[1] || '';
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function hashStr(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return Math.abs(h); }

/** 本地像素图：外部接口不可用时的兜底，画布生成，保证 PNG 合法 */
function pixelTexture(prompt, size, kind) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');
  const seed = hashStr(prompt + kind + size);
  const hue = seed % 360;
  if (kind === 'entity') {
    // 实体皮肤：透明底 + 主体块
    const s = size / 4;
    ctx.fillStyle = `hsl(${hue},55%,52%)`;
    ctx.fillRect(s * 0.8, s * 0.8, s * 2.4, s * 2.4);
    ctx.fillStyle = `hsl(${hue},60%,38%)`;
    ctx.fillRect(s * 0.8, s * 0.8, s * 2.4, s * 0.4);
    ctx.fillStyle = '#111';
    ctx.fillRect(s * 1.2, s * 1.4, s * 0.35, s * 0.35);
    ctx.fillRect(s * 2.0, s * 1.4, s * 0.35, s * 0.35);
  } else {
    ctx.fillStyle = `hsl(${hue},50%,45%)`;
    ctx.fillRect(0, 0, size, size);
    const cell = size / 8;
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
      if ((x * 7 + y * 13 + seed) % 5 === 0) {
        ctx.fillStyle = `hsla(${hue},40%,${30 + ((seed + x * y) % 35)}%,0.9)`;
        ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
    ctx.strokeStyle = `hsl(${hue},45%,25%)`;
    ctx.lineWidth = Math.max(1, size / 32);
    ctx.strokeRect(0, 0, size, size);
  }
  // 放大到目标尺寸用最近邻（画布本身已是目标尺寸）
  return bytesFromDataUrl(cv.toDataURL('image/png'));
}

/** 在线贴图：公共接口 pollinations，失败回退本地像素图 */
export async function apiTexture(prompt, size, kind, seed) {
  const full = `${prompt}, minecraft ${kind} texture, pixel art, ${size}x${size}, game asset`;
  const url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(full) +
    `?width=${size}&height=${size}&nologo=true&seed=${seed}`;
  try {
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), 12000);
    const r = await fetch(url, { signal: c.signal });
    clearTimeout(t);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const blob = await r.blob();
    const bmp = await createImageBitmap(blob);
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    const ctx = cv.getContext('2d');
    if (kind === 'entity') ctx.clearRect(0, 0, size, size);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(bmp, 0, 0, size, size);
    return { data: bytesFromDataUrl(cv.toDataURL('image/png')), source: 'api' };
  } catch (e) {
    return { data: pixelTexture(prompt, size, kind), source: 'local' };
  }
}

const json = (o) => new TextEncoder().encode(JSON.stringify(o, null, 2));

function bpManifest(name, ns, uuid, modUuid, rpUuid, withScript) {
  const m = {
    format_version: 2,
    header: { name, description: name + ' 行为包', uuid, version: V3, min_engine_version: [1, 21, 0] },
    modules: [{ type: 'data', uuid: modUuid, version: V3 }],
    dependencies: rpUuid ? [{ uuid: rpUuid, version: V3 }] : [],
  };
  if (withScript) m.modules.push({ type: 'script', language: 'javascript', uuid: localUuid(), version: V3, entry: 'scripts/main.js' });
  return m;
}

function rpManifest(name, uuid, modUuid) {
  return {
    format_version: 2,
    header: { name, description: name + ' 资源包', uuid, version: V3, min_engine_version: [1, 21, 0] },
    modules: [{ type: 'resources', uuid: modUuid, version: V3 }],
  };
}

/**
 * 生成附加包
 * @param {{name:string,ns:string,kinds:string[],res:number,online:boolean,entries:Array,scripts:boolean,py:boolean,textureHook?:Function}} o
 * @returns {Promise<{files:Array,ext:string,summary:Object}>}
 */
export async function buildAddon(o) {
  const ns = (o.ns || 'demo').toLowerCase().replace(/[^a-z0-9_]/g, '');
  const name = o.name || '我的附加包';
  const size = o.res || 16;
  const entries = o.entries || [];
  const wantBp = o.kinds.includes('bp');
  const wantRp = o.kinds.includes('rp');
  const files = [];
  const both = wantBp && wantRp;
  const P_BP = both ? 'BP/' : '';
  const P_RP = both ? 'RP/' : '';
  const put = (path, data) => files.push({ path, data });
  const bpPut = (path, data) => put(P_BP + path, data);
  const rpPut = (path, data) => put(P_RP + path, data);

  const ids = {};
  if (wantBp) {
    const u = await newUuid(o.online);
    ids.bp = u.uuid; ids.bpSrc = u.source;
    ids.bpMod = localUuid();
  }
  if (wantRp) {
    const u = await newUuid(o.online);
    ids.rp = u.uuid; ids.rpSrc = u.source;
    ids.rpMod = localUuid();
  }
  if (wantBp && wantRp && o.online) {
    // 保证两个包用同一在线源；失败各自回退
  }

  const langZh = [], langEn = [];
  const terrain = {}, itemTex = {};
  const textures = new Map();
  let apiCount = 0, localCount = 0, firstTex = null;

  for (const e of entries) {
    const id = (e.id || 'thing').toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const zh = e.zh || id;
    const prompt = e.prompt || zh;
    let tex;
    if (o.textureHook) tex = { data: o.textureHook(prompt, size, e.kind), source: 'hook' };
    else tex = await apiTexture(prompt, size, e.kind, hashStr(prompt) % 9999);
    if (tex.source === 'api') apiCount++; else localCount++;
    if (!firstTex) firstTex = tex.data;
    if (e.kind === 'block') {
      textures.set('textures/blocks/' + id + '.png', tex.data);
      terrain[id] = { textures: 'textures/blocks/' + id };
      langZh.push(`tile.${id}.name=${zh}`); langEn.push(`tile.${id}.name=${id}`);
      if (wantBp) bpPut(`blocks/${id}.json`, json({
        format_version: '1.21.0',
        'minecraft:block': {
          description: { identifier: `${ns}:${id}` },
          components: {
            'minecraft:material_instances': { '*': { texture: id, render_method: 'opaque' } },
            'minecraft:collision_box': { width: 1, height: 1 },
            'minecraft:selection_box': { width: 1, height: 1 },
            'minecraft:geometry': 'minecraft:geometry.full_block',
          },
        },
      }));
      if (wantRp) rpPut(`blocks/${id}.json`, json({ [id]: { textures: id, sound: 'stone' } }));
    } else if (e.kind === 'item') {
      textures.set('textures/items/' + id + '.png', tex.data);
      itemTex[id] = { textures: 'textures/items/' + id };
      langZh.push(`item.${id}.name=${zh}`); langEn.push(`item.${id}.name=${id}`);
      if (wantBp) bpPut(`items/${id}.json`, json({
        format_version: '1.21.0',
        'minecraft:item': {
          description: { identifier: `${ns}:${id}`, menu_category: { category: 'items' } },
          components: { 'minecraft:icon': id, 'minecraft:display_name': { value: zh } },
        },
      }));
    } else {
      textures.set('textures/entity/' + id + '.png', tex.data);
      langZh.push(`entity.${id}.name=${zh}`); langEn.push(`entity.${id}.name=${id}`);
      if (wantBp) {
        bpPut(`entities/${id}.json`, json({
          format_version: '1.21.0',
          'minecraft:entity': {
            description: { identifier: `${ns}:${id}`, is_spawnable: true, is_summonable: true, is_experimental: false },
            components: {
              'minecraft:type_family': { family: [id, 'mob'] },
              'minecraft:health': { value: 20, max: 20 },
              'minecraft:movement': { value: 0.2 },
              'minecraft:physics': {},
              'minecraft:collision_box': { width: 0.9, height: 1.8 },
              'minecraft:nameable': {},
            },
          },
        }));
      }
      if (wantRp) {
        rpPut(`entity/${id}.entity.json`, json({
          format_version: '1.10.0',
          'minecraft:client_entity': {
            description: {
              identifier: `${ns}:${id}`,
              materials: { default: 'entity_alphatest' },
              textures: { default: `textures/entity/${id}` },
              geometry: { default: `geometry.${id}` },
              render_controllers: ['controller.render.default'],
            },
          },
        }));
        rpPut(`models/entity/${id}.geo.json`, json({
          format_version: '1.12.0',
          'minecraft:geometry': [{
            description: { identifier: `geometry.${id}`, texture_width: size, texture_height: size, visible_bounds_width: 2, visible_bounds_height: 2.5 },
            bones: [{ name: 'body', pivot: [0, 0, 0], cubes: [{ origin: [-4, 0, -4], size: [8, 16, 8], uv: [0, 0] }] }],
          }],
        }));
      }
    }
  }

  if (wantRp) {
    rpPut('pack_icon.png', firstTex || pixelTexture(name, 64, 'block'));
    rpPut('textures/terrain_texture.json', json({ resource_pack_name: name, texture_name: 'atlas.terrain', padding: 8, num_mip_levels: 4, texture_data: terrain }));
    rpPut('textures/item_texture.json', json({ resource_pack_name: name, texture_name: 'atlas.items', texture_data: itemTex }));
    for (const [p, d] of textures) rpPut(p, d);
    rpPut('texts/zh_CN.lang', new TextEncoder().encode(langZh.join('\n') + '\n'));
    rpPut('texts/en_US.lang', new TextEncoder().encode(langEn.join('\n') + '\n'));
    rpPut('manifest.json', json(rpManifest(name, ids.rp, ids.rpMod)));
  }
  if (wantBp) {
    bpPut('manifest.json', json(bpManifest(name, ns, ids.bp, ids.bpMod, wantRp ? ids.rp : null, o.scripts)));
    bpPut('pack_icon.png', firstTex || pixelTexture(name, 64, 'block'));
    if (o.scripts && (o.scriptLang || 'js') === 'js') {
      bpPut('scripts/main.js', new TextEncoder().encode(`import { world, system } from "@minecraft/server";\n\n// ${name} 脚本入口（自动生成）\nworld.afterEvents.playerSpawn.subscribe((ev) => {\n  if (!ev.initialSpawn) return;\n  ev.player.sendMessage("${name} 已加载");\n});\n\nsystem.runInterval(() => {\n  // 每 20 tick 执行一次\n}, 20);\n`));
    }
    const lang = o.scriptLang || 'js';
    if (lang === 'ts') {
      bpPut('scripts/main.ts', new TextEncoder().encode(`import { world } from "@minecraft/server";\n\n// ${name} TypeScript 模板（需自行编译为 scripts/main.js）\nworld.afterEvents.playerSpawn.subscribe((ev) => {\n  if (ev.initialSpawn) ev.player.sendMessage("${name} 已加载");\n});\n`));
    } else if (lang === 'py' || o.py) {
      bpPut('scripts/tooling/build.py', new TextEncoder().encode(`# ${name} Python 辅助脚本（游戏不执行，供打包/校验用）\nimport json, pathlib\n\nfor p in pathlib.Path('.').rglob('*.json'):\n    try:\n        json.loads(p.read_text(encoding='utf-8'))\n    except Exception as e:\n        print('BAD', p, e)\n`));
    }
  }

  const ext = (wantBp && wantRp) ? '.mcaddon' : '.mcpack';
  return { files, ext, summary: { ns, size, apiCount, localCount, bp: wantBp, rp: wantRp, ids } };
}
