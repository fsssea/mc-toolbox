import { parseNBT, parseNBTWithHeader, plain, plainNBT } from './nbt.js';
import { parseSubchunk } from './subchunk.js';

const TAG_SUBCHUNK = 0x2f, TAG_BLOCK_ENTITY = 0x31, TAG_2D = 0x2b, TAG_VERSION = 0x2c;

function keyBytesOf(kv) {
  return kv.keyBytes || new Uint8Array();
}

export async function analyzeWorld(db, report, levelDatU8) {
  const keys = [];
  const chunkMap = new Map();
  const blockCount = new Map();
  const layerWater = new Map();
  let subchunks = 0, blockTotal = 0, extraLayerBlocks = 0;
  const entities = [];
  const blockEntities = [];
  let player = null, levelDat = null;
  const structureKeys = [];

  for (const [k, kv] of db) {
    const kb = keyBytesOf(kv);
    keys.push(k);
    if (k.startsWith('actorprefix')) {
      try {
        const n = plainNBT(parseNBT(kv.value, 0, true));
        entities.push({ type: String(n.identifier || n.Identifier || 'unknown'), pos: n.Pos || null, raw: n });
      } catch (e) { entities.push({ type: 'unknown', error: e.message }); }
      continue;
    }
    if (k === '~local_player') {
      try { player = plainNBT(parseNBT(kv.value, 0, true)); } catch (e) { player = { error: e.message }; }
      continue;
    }

    if (kb.length >= 9) {
      const x = new DataView(kb.buffer, kb.byteOffset, kb.byteLength).getInt32(0, true);
      const z = new DataView(kb.buffer, kb.byteOffset, kb.byteLength).getInt32(4, true);
      const tag = kb[8];
      const ck = x + ',' + z;
      if (tag === TAG_SUBCHUNK && kb.length === 10) {
        const y = kb[9] > 127 ? kb[9] - 256 : kb[9];
        const sc = parseSubchunk(kv.value, 2);
        subchunks++;
        sc.layers.forEach((layer, li) => {
          if (!layer.palette || layer.palette.length === 0) return;
          if (layer.solid) { layer.palette = [{ name: 'minecraft:unknown' }]; return; }
          if (!layer.indices) return;
          for (let i = 0; i < 4096; i++) {
            const pal = layer.palette[layer.indices[i]];
            if (!pal) continue;
            if (li === 0) {
              blockTotal++;
              blockCount.set(pal.name, (blockCount.get(pal.name) || 0) + 1);
            } else {
              extraLayerBlocks++;
              layerWater.set(pal.name, (layerWater.get(pal.name) || 0) + 1);
            }
          }
        });
        chunkMap.set(ck, (chunkMap.get(ck) || 0) + 1);
      } else if (tag === TAG_BLOCK_ENTITY) {
        try {
          const n = plainNBT(parseNBT(kv.value, 0, true));
          blockEntities.push({ id: String(n.id || 'unknown'), pos: [n.x, n.y, n.z] });
        } catch (e) { blockEntities.push({ id: 'unknown' }); }
      } else if (tag !== TAG_2D && tag !== TAG_VERSION && tag !== 0x36 && tag !== 0x3f && tag !== 0x40 && tag !== 0x41) {
        if (tag === 0x77) structureKeys.push(ck);
      }
    }
  }

  if (levelDatU8) {
    try { levelDat = plainNBT(parseNBTWithHeader(levelDatU8, true)); }
    catch (e) { levelDat = { error: e.message }; }
  }
  const blockList = [...blockCount.entries()].map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
  const byType = {};
  for (const e of entities) byType[e.type] = (byType[e.type] || 0) + 1;
  const beByType = {};
  for (const b of blockEntities) beByType[b.id] = (beByType[b.id] || 0) + 1;

  report.keys = keys.length;
  report.chunks = chunkMap.size;
  report.subchunks = subchunks;
  report.blocks = blockTotal;
  report.blockTypes = blockList.length;
  report.blockList = blockList;
  report.extraLayer = [...layerWater.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  report.extraLayerBlocks = extraLayerBlocks;
  report.entities = entities.length;
  report.entitiesByType = byType;
  report.entityList = entities.slice(0, 400).map(e => ({ type: e.type, pos: e.pos ? e.pos.map(v => Math.round(v)) : null }));
  report.blockEntities = blockEntities.length;
  report.blockEntityList = blockEntities.slice(0, 2000);
  report.blockEntitiesByType = beByType;
  report.player = summarizePlayer(player);
  report.level = summarizeLevel(levelDat);
  report.levelRaw = levelDat;
  return report;
}

function summarizeLevel(d) {
  if (!d) return null;
  const flat = d.flatWorldLayers || null;
  return {
    levelName: d.LevelName, version: d.InventoryVersion || d.lastOpenedWithVersion,
    gameType: d.GameType, difficulty: d.Difficulty, hardcore: d.IsHardcore,
    seed: d.RandomSeed, spawn: d.SpawnX + ', ' + d.SpawnY + ', ' + d.SpawnZ,
    time: d.Time, currentTick: d.currentTick, cheats: d.cheatsEnabled,
    keepInventory: d.keepInventory, commandsEnabled: d.commandsEnabled,
    generator: d.Generator, storageVersion: d.StorageVersion,
    limited: d.limitedWorldWidth ? d.limitedWorldWidth + '×' + d.limitedWorldDepth : null,
    flatPreset: flat ? (() => { try { return JSON.parse(flat)?.biome_id !== undefined ? '自定义' : '有'; } catch (e) { return '有'; } })() : null,
    achievements: d.hasBeenLoadedInCreative
  };
}

function summarizePlayer(p) {
  if (!p) return null;
  const inv = [];
  const list = (p.Inventory && Array.isArray(p.Inventory)) ? p.Inventory : [];
  for (const it of list) {
    if (it && it.Name) inv.push({ name: it.Name, count: it.Count, slot: it.Slot });
  }
  return {
    pos: p.Pos ? p.Pos.map(v => Math.round(v * 100) / 100) : null,
    dimension: p.DimensionId, gameType: p.PlayerGameMode,
    xp: p.XPLevel, health: p.Health,
    inventory: inv
  };
}

// 中文名映射（常见方块，未命中的直接显示英文 id）
export const zh = {
  'minecraft:air': '空气', 'minecraft:stone': '石头', 'minecraft:deepslate': '深板岩',
  'minecraft:water': '水', 'minecraft:lava': '岩浆', 'minecraft:bedrock': '基岩',
  'minecraft:dirt': '泥土', 'minecraft:grass_block': '草方块', 'minecraft:sand': '沙子',
  'minecraft:gravel': '砂砾', 'minecraft:tuff': '凝灰岩', 'minecraft:sulfur': '硫磺',
  'minecraft:cinnabar': '朱砂', 'minecraft:granite': '花岗岩', 'minecraft:diorite': '闪长岩',
  'minecraft:andesite': '安山岩', 'minecraft:iron_ore': '铁矿石', 'minecraft:coal_ore': '煤矿石',
  'minecraft:copper_ore': '铜矿石', 'minecraft:gold_ore': '金矿石', 'minecraft:diamond_ore': '钻石矿石',
  'minecraft:redstone_ore': '红石矿石', 'minecraft:lapis_ore': '青金石矿石',
  'minecraft:emerald_ore': '绿宝石矿石', 'minecraft:deepslate_iron_ore': '深层铁矿石',
  'minecraft:deepslate_coal_ore': '深层煤矿石', 'minecraft:deepslate_copper_ore': '深层铜矿石',
  'minecraft:deepslate_gold_ore': '深层金矿石', 'minecraft:deepslate_diamond_ore': '深层钻石矿石',
  'minecraft:deepslate_redstone_ore': '深层红石矿石', 'minecraft:deepslate_lapis_ore': '深层青金石矿石',
  'minecraft:deepslate_emerald_ore': '深层绿宝石矿石', 'minecraft:chest': '箱子',
  'minecraft:mob_spawner': '刷怪笼', 'minecraft:trial_spawner': '试炼刷怪笼', 'minecraft:vault': '宝库',
  'minecraft:dispenser': '发射器', 'minecraft:barrel': '木桶', 'minecraft:hopper': '漏斗',
  'minecraft:bed': '床', 'minecraft:amethyst_block': '紫水晶块', 'minecraft:obsidian': '黑曜石',
  'minecraft:glow_lichen': '发光地衣', 'minecraft:budding_amethyst': '紫水晶母岩',
  'minecraft:sulfur_spike': '硫磺尖锥', 'minecraft:potent_sulfur': '浓缩硫磺',
  'minecraft:crafting_table': '工作台', 'minecraft:torch': '火把', 'minecraft:acacia_planks': '金合欢木板',
  'minecraft:acacia_log': '金合欢原木', 'minecraft:acacia_stairs': '金合欢楼梯',
  'minecraft:acacia_slab': '金合欢台阶', 'minecraft:acacia_fence': '金合欢栅栏',
  'minecraft:wheat': '小麦', 'minecraft:carrots': '胡萝卜', 'minecraft:potatoes': '马铃薯',
  'minecraft:beetroot': '甜菜', 'minecraft:melon_stem': '西瓜茎', 'minecraft:short_grass': '矮草',
  'minecraft:tall_grass': '高草', 'minecraft:oak_leaves': '橡木树叶', 'minecraft:acacia_leaves': '金合欢树叶',
  'minecraft:raw_iron_block': '粗铁块', 'minecraft:decorated_pot': '饰纹陶罐'
};
