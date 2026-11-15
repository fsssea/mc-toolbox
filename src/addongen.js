// 附加包制作器：生成行为包/资源包/双包（.mcaddon），贴图用 Canvas 现场绘制
// 说明：Bedrock 只执行 JSON 与 JavaScript；Python 文件会标注为“游戏不执行，仅模板/外部工具参考”

const ENTITY_SIZES = {
  pig: [64, 32], cow: [64, 32], chicken: [64, 32], creeper: [64, 32],
  zombie: [64, 64], sheep: [64, 32], villager_v2: [64, 64]
};
export const ENTITY_LIST = Object.keys(ENTITY_SIZES);

function uuid() {
  if (crypto && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function hex(c, a) {
  const s = c.replace('#', '');
  return 'rgba(' + parseInt(s.slice(0, 2), 16) + ',' + parseInt(s.slice(2, 4), 16) + ',' + parseInt(s.slice(4, 6), 16) + ',' + (a ?? 1) + ')';
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

function noise(ctx, w, h, c1, c2, density) {
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const px = Math.max(1, Math.floor(w / 16));
  for (let y = 0; y < h; y += px) {
    for (let x = 0; x < w; x += px) {
      ctx.fillStyle = rnd() < (density ?? 0.35) ? hex(c2, 1) : hex(c1, 1);
      ctx.fillRect(x, y, px, px);
    }
  }
}

function drawBlockTexture(ctx, w, h, kind, c1, c2) {
  if (kind === 'wood') {
    ctx.fillStyle = hex(c1); ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = hex(c2);
    for (let x = 0; x < w; x += Math.max(2, w / 8)) ctx.fillRect(x, 0, Math.max(1, w / 32), h);
    ctx.fillRect(0, Math.floor(h / 2), w, Math.max(1, h / 16));
  } else if (kind === 'metal') {
    ctx.fillStyle = hex(c1); ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = hex(c2);
    ctx.fillRect(0, 0, w, Math.max(1, h / 8));
    ctx.fillRect(0, h - Math.max(1, h / 8), w, Math.max(1, h / 8));
    ctx.fillStyle = 'rgba(255,255,255,.18)';
    ctx.fillRect(Math.floor(w / 8), 0, Math.max(1, w / 8), h);
  } else if (kind === 'crystal') {
    ctx.fillStyle = hex(c1); ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = hex(c2, 0.55);
      const s = w / 4;
      ctx.beginPath();
      ctx.moveTo(w / 2, 0); ctx.lineTo(w - s, h / 2); ctx.lineTo(w / 2, h); ctx.lineTo(s, h / 2);
      ctx.closePath(); ctx.fill();
    }
  } else if (kind === 'wool') {
    noise(ctx, w, h, c1, c2, 0.5);
    ctx.fillStyle = 'rgba(0,0,0,.12)';
    for (let i = 0; i < w; i += 4) ctx.fillRect(i, (i * 3) % h, 2, 2);
  } else {
    noise(ctx, w, h, c1, c2, 0.4);
  }
  // 1px 描边，让方块在低分辨率下更清晰
  ctx.strokeStyle = hex(c2, 0.9);
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
}

function drawItemTexture(ctx, w, h, c1, c2) {
  ctx.clearRect(0, 0, w, h);
  const u = w / 16;
  ctx.fillStyle = hex(c1);
  ctx.fillRect(6 * u, 2 * u, 4 * u, 12 * u);
  ctx.fillStyle = hex(c2);
  ctx.fillRect(4 * u, 12 * u, 8 * u, 2 * u);
  ctx.fillRect(7 * u, 0 * u, 2 * u, 2 * u);
}

function drawEntityTexture(ctx, w, h, c1, c2) {
  // 近似原版实体图集：头部在左上 1/4 区域，身体/腿按条带填充
  ctx.fillStyle = hex(c1); ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = hex(c2);
  ctx.fillRect(0, h / 2, w, h / 2);
  // 头部眼睛（按常见 64x32 布局：头 8..16,8..16）
  const u = w / 64;
  ctx.fillStyle = '#111';
  ctx.fillRect(9 * u, 12 * u, 2 * u, 2 * u);
  ctx.fillRect(14 * u, 12 * u, 2 * u, 2 * u);
  // 嘴
  ctx.fillStyle = '#000';
  ctx.fillRect(11 * u, 14 * u, 3 * u, 1 * u);
  // 纹理噪点
  ctx.fillStyle = 'rgba(0,0,0,.12)';
  for (let i = 0; i < w; i += Math.max(2, u * 2)) ctx.fillRect(i, (i * 5) % h, u, u);
}

export function previewTexture(kind, size, c1, c2, entity) {
  const [w, h] = kind === 'entity' ? (ENTITY_SIZES[entity] || [64, 32]) : [size, size];
  return canvasPng(w, h, (ctx) => {
    if (kind === 'item') drawItemTexture(ctx, w, h, c1, c2);
    else if (kind === 'entity') drawEntityTexture(ctx, w, h, c1, c2);
    else drawBlockTexture(ctx, w, h, kind, c1, c2);
  });
}

export function pngDataUrl(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return 'data:image/png;base64,' + btoa(bin);
}

const SCRIPT_HEAD = `// 由 MCBE 工具箱附加包制作器生成
import { world, system, CommandPermissionLevel } from "@minecraft/server";

`;

function scriptTemplate(tpl, ns) {
  if (tpl === 'particle') return SCRIPT_HEAD + `// 每秒在玩家脚下生成粒子
system.runInterval(() => {
  for (const p of world.getAllPlayers()) {
    p.dimension.spawnParticle("minecraft:campfire_tick_particle", {
      x: p.location.x, y: p.location.y + 0.2, z: p.location.z
    });
  }
}, 20);
`;
  if (tpl === 'welcome') return SCRIPT_HEAD + `// 玩家进服提示
world.afterEvents.playerSpawn.subscribe((ev) => {
  if (!ev.initialSpawn) return;
  ev.player.sendMessage("§b欢迎来到 ${ns} 的世界");
});
`;
  return SCRIPT_HEAD + `// 计分板示例：每次进服加 1 分
world.afterEvents.playerSpawn.subscribe(({ player }) => {
  try {
    world.scoreboard.addObjective("points", "积分");
    const obj = world.scoreboard.getObjective("points");
    obj.setScore(player, (obj.getScore(player) || 0) + 1);
    player.sendMessage("§a当前积分：" + obj.getScore(player));
  } catch (e) {
    console.warn(e);
  }
});
`;
}

function pyTemplate(ns) {
  return `# 由 MCBE 工具箱附加包制作器生成
# 注意：Minecraft 基岩版不会执行 Python。此文件仅作模板 / 外部工具（如服务端管理脚本）参考。
# ${ns} 的自动化脚本骨架
import json
import os

PACK_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def read_json(rel):
    with open(os.path.join(PACK_ROOT, rel), "r", encoding="utf-8") as f:
        return json.load(f)

def main():
    data = read_json("manifest.json")
    print("包名:", data["header"]["name"])

if __name__ == "__main__":
    main()
`;
}

function tsTemplate(ns) {
  return `// TypeScript 模板（需自行用 tsc 编译成 scripts/main.js）
import { world, system } from "@minecraft/server";

system.runInterval(() => {
  for (const p of world.getAllPlayers()) {
    p.onScreenDisplay.setActionBar("§e${ns} 正在运行");
  }
}, 40);
`;
}

const jsonTpl = {
  block: (ns, id) => ({
    format_version: '1.21.0',
    'minecraft:block': {
      description: { identifier: `${ns}:${id}`, menu_category: { category: 'construction' } },
      components: {
        'minecraft:material_instances': { '*': { texture: id, render_method: 'opaque' } },
        'minecraft:destructible_by_mining': { seconds_to_destroy: 1.5 },
        'minecraft:destructible_by_explosion': { explosion_resistance: 3 },
        'minecraft:light_dampening': 15,
        'minecraft:map_color': '#8a8f98'
      }
    }
  }),
  item: (ns, id, tex) => ({
    format_version: '1.21.0',
    'minecraft:item': {
      description: { identifier: `${ns}:${id}`, menu_category: { category: 'items' } },
      components: {
        'minecraft:icon': { texture: tex },
        'minecraft:max_stack_size': 64
      }
    }
  })
};

export function generateAddon(cfg) {
  const ns = cfg.namespace || 'demo';
  const name = cfg.name || '我的附加包';
  const ver = [1, 0, 0];
  const size = cfg.size || 16;
  const c1 = cfg.color1 || '#7a7f8c';
  const c2 = cfg.color2 || '#4a505c';
  const pattern = cfg.pattern || 'stone';
  const mode = cfg.mode || 'addon';          // addon | resource | behavior
  const withBlock = cfg.block !== false;
  const withItem = cfg.item !== false;
  const entity = cfg.entity || '';
  const lang = cfg.scriptLang || 'js';
  const tpl = cfg.scriptTpl || 'scoreboard';
  const ext = Array.isArray(cfg.uuids) ? cfg.uuids : [];
  const bpUuid = ext[0] || uuid(), rpUuid = ext[1] || uuid(), modUuidB = ext[2] || uuid(), modUuidR = ext[3] || uuid(), scriptUuid = ext[4] || uuid();
  const texIn = cfg.tex || {};
  const dirB = `behavior_packs/${ns}_bp`;
  const dirR = `resource_packs/${ns}_rp`;
  const entries = [];
  // U：写入或覆盖（避免同一个 manifest 被写两次）；A：追加文本（lang 合并）
  const U = (path, text) => {
    const i = entries.findIndex(e => e.path === path);
    const data = new TextEncoder().encode(text);
    if (i >= 0) entries[i].data = data; else entries.push({ path, data });
  };
  const A = (path, text) => {
    const i = entries.findIndex(e => e.path === path);
    if (i >= 0) {
      const old = new TextDecoder().decode(entries[i].data);
      entries[i].data = new TextEncoder().encode(old.endsWith('\n') || !old ? old + text : old + '\n' + text);
    } else entries.push({ path, data: new TextEncoder().encode(text) });
  };
  const B = (path, bytes) => {
    const i = entries.findIndex(e => e.path === path);
    if (i >= 0) entries[i].data = bytes; else entries.push({ path, data: bytes });
  };
  const J = (path, obj) => U(path, JSON.stringify(obj, null, 2));
  const T = (path, text) => U(path, text);
  const log = [];

  const useB = mode !== 'resource';
  const useR = mode !== 'behavior';

  if (useB) {
    B(`${dirB}/pack_icon.png`, texIn.icon || texIn.block || previewTexture('block', 64, c1, c2));
    J(`${dirB}/manifest.json`, {
      format_version: 2,
      header: {
        name: name + ' BP', description: name + ' 行为包', uuid: bpUuid, version: ver,
        min_engine_version: [1, 21, 0]
      },
      modules: [{ type: 'data', uuid: modUuidB, version: ver }],
      metadata: { authors: [cfg.author || 'MCBE工具箱'], generated_with: { mcbe_toolbox: ['2.5.0'] } }
    });
    if (withBlock) J(`${dirB}/blocks/${ns}_block.json`, jsonTpl.block(ns, ns + '_block'));
    if (withItem) J(`${dirB}/items/${ns}_item.json`, jsonTpl.item(ns, ns + '_item', ns + '_item'));
    A(`${dirB}/texts/zh_CN.lang`, `pack.name=${name} 行为包\npack.description=${name} 行为包\n`);
    A(`${dirB}/texts/en_US.lang`, `pack.name=${name} BP\npack.description=${name} behavior pack\n`);

    if (lang === 'js' || lang === 'json') {
      // script module 需要单独的清单模块与依赖
      const mf = JSON.parse(new TextDecoder().decode(entries.find(e => e.path === `${dirB}/manifest.json`).data));
      mf.modules.push({ type: 'script', language: 'javascript', uuid: scriptUuid, entry: 'scripts/main.js', version: ver });
      mf.dependencies = [{ module_name: '@minecraft/server', version: '1.11.0' }];
      J(`${dirB}/manifest.json`, mf);
      T(`${dirB}/scripts/main.js`, scriptTemplate(tpl, ns));
    } else if (lang === 'ts') {
      T(`${dirB}/scripts/main.ts`, tsTemplate(ns));
    } else if (lang === 'py') {
      T(`${dirB}/scripts/main.py`, pyTemplate(ns));
    }
    U(`${dirB}/README.md`, `# ${name}\n\n由 MCBE 工具箱生成。\n\n- 命名空间：${ns}\n- 版本：1.0.0\n- 脚本语言：${lang}\n\n安装：把整个 .mcaddon 用 Minecraft 打开即可。\n`);
  }

  if (useR) {
    B(`${dirR}/pack_icon.png`, texIn.icon || texIn.block || previewTexture('block', 64, c1, c2));
    const dep = useB ? [{ uuid: bpUuid, version: ver }] : [];
    J(`${dirR}/manifest.json`, {
      format_version: 2,
      header: { name: name + ' RP', description: name + ' 资源包', uuid: rpUuid, version: ver, min_engine_version: [1, 21, 0] },
      modules: [{ type: 'resources', uuid: modUuidR, version: ver }],
      dependencies: dep,
      metadata: { authors: [cfg.author || 'MCBE工具箱'], generated_with: { mcbe_toolbox: ['2.5.0'] } }
    });
    if (withBlock) {
      B(`${dirR}/textures/blocks/${ns}_block.png`, texIn.block || previewTexture(pattern, size, c1, c2));
      J(`${dirR}/textures/terrain_texture.json`, {
        resource_pack_name: name, texture_name: 'atlas.terrain', padding: 8, num_mip_levels: 4,
        texture_data: { [ns + '_block']: { textures: `textures/blocks/${ns}_block` } }
      });
      J(`${dirR}/blocks.json`, { format_version: [1, 1, 0], [ns + '_block']: { textures: ns + '_block', sound: 'stone' } });
      A(`${dirR}/texts/zh_CN.lang`, `tile.${ns}_block.name=${cfg.blockName || '自定义方块'}\npack.name=${name} 资源包\npack.description=${name} 资源包\n`);
      A(`${dirR}/texts/en_US.lang`, `tile.${ns}_block.name=${cfg.blockNameEn || 'Custom Block'}\npack.name=${name} RP\npack.description=${name} resource pack\n`);
    }
    if (withItem) {
      B(`${dirR}/textures/items/${ns}_item.png`, texIn.item || previewTexture('item', size, c1, c2));
      J(`${dirR}/textures/item_texture.json`, {
        resource_pack_name: name, texture_name: 'atlas.items', texture_data: { [ns + '_item']: { textures: `textures/items/${ns}_item` } }
      });
      A(`${dirR}/texts/zh_CN.lang`, `item.${ns}_item.name=${cfg.itemName || '自定义物品'}\n`);
      A(`${dirR}/texts/en_US.lang`, `item.${ns}_item.name=${cfg.itemNameEn || 'Custom Item'}\n`);
    }
    if (entity) {
      const [w, h] = ENTITY_SIZES[entity] || [64, 32];
      B(`${dirR}/textures/entity/${entity}/${entity}.png`, texIn.entity || previewTexture('entity', size, c1, c2, entity));
      log.push(`实体贴图 ${entity}：${w}×${h}（覆盖原版路径 textures/entity/${entity}/${entity}.png）`);
    }
  }

  log.unshift(`已生成 ${entries.length} 个文件，模式 ${mode}，贴图 ${size}×${size}，脚本 ${lang}`);
  return { entries, log, dirB, dirR };
}

export const SNIPPETS = [
  { lang: 'JSON', title: '方块定义（最小可运行）', code: `{\n  "format_version": "1.21.0",\n  "minecraft:block": {\n    "description": { "identifier": "demo:my_block" },\n    "components": {\n      "minecraft:material_instances": { "*": { "texture": "my_block", "render_method": "opaque" } },\n      "minecraft:destructible_by_mining": { "seconds_to_destroy": 1.5 }\n    }\n  }\n}` },
  { lang: 'JSON', title: '物品定义', code: `{\n  "format_version": "1.21.0",\n  "minecraft:item": {\n    "description": { "identifier": "demo:my_item" },\n    "components": { "minecraft:icon": { "texture": "my_item" }, "minecraft:max_stack_size": 64 }\n  }\n}` },
  { lang: 'JS', title: '进服欢迎', code: `import { world } from "@minecraft/server";\nworld.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {\n  if (initialSpawn) player.sendMessage("§a欢迎！");\n});` },
  { lang: 'JS', title: '定时粒子', code: `import { world, system } from "@minecraft/server";\nsystem.runInterval(() => {\n  for (const p of world.getAllPlayers()) {\n    p.dimension.spawnParticle("minecraft:campfire_tick_particle", p.location);\n  }\n}, 20);` },
  { lang: 'JS', title: '计分板加分', code: `import { world } from "@minecraft/server";\nconst obj = world.scoreboard.getObjective("points");\nobj.setScore(player, (obj.getScore(player) || 0) + 1);` },
  { lang: 'TS', title: '类型化事件监听', code: `import { world, Player } from "@minecraft/server";\nworld.afterEvents.playerSpawn.subscribe((ev) => {\n  const p: Player = ev.player;\n  p.sendMessage(ev.initialSpawn ? "首次进入" : "回来啦");\n});` },
  { lang: 'PY', title: '外部工具骨架（游戏不执行）', code: `# 基岩版不执行 Python，仅供外部工具参考\nimport json, os\nROOT = os.path.dirname(os.path.dirname(__file__))\nwith open(os.path.join(ROOT, "manifest.json"), encoding="utf-8") as f:\n    print(json.load(f)["header"]["name"])\n` }
];
