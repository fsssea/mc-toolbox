// 玩家数据（~local_player）读写
import { parseNBT, plainNBT, writeNBT } from './nbt.js';

const C = (v) => ({ t: 10, v });
const F = (v) => ({ t: 5, v });
const D = (v) => ({ t: 6, v });
const I = (v) => ({ t: 3, v });
const Sh = (v) => ({ t: 2, v });
const By = (v) => ({ t: 1, v });
const S = (v) => ({ t: 8, v });
const L = (et, v) => ({ t: 9, et, v });

export function readPlayer(u8) {
  const res = parseNBT(u8, 0, true);
  const nbt = res;
  const p = plainNBT(res);
  const inv = [];
  const list = Array.isArray(p.Inventory) ? p.Inventory : [];
  list.forEach((it, i) => {
    if (it && it.Name) inv.push({ name: it.Name, count: Number(it.Count ?? 1), slot: Number(it.Slot ?? i), index: i });
  });
  return {
    nbt, plain: p,
    pos: Array.isArray(p.Pos) ? p.Pos.map(Number) : null,
    health: p.Health,
    xp: p.XPLevel,
    gameMode: p.PlayerGameMode,
    inventory: inv
  };
}

// 写回 Pos / 生命 / 经验 / 背包
export function applyPlayerEdits(state, edits = {}) {
  const root = state.nbt.root.value;
  if (edits.pos) {
    const pos = edits.pos.map(Number);
    root.Pos = L(5, pos.map(F));
  }
  if (edits.health !== undefined) {
    const t = root.Health ? root.Health.t : 2;          // 保留原类型（Bedrock 里可能是 short 或 float）
    const v = Math.max(0, Math.min(32767, Number(edits.health)));
    root.Health = t === 5 ? F(v) : Sh(Math.round(v));
  }
  if (edits.xp !== undefined) {
    const t = root.XPLevel ? root.XPLevel.t : 3;
    root.XPLevel = t === 2 ? Sh(Math.round(Number(edits.xp))) : I(Math.round(Number(edits.xp)));
  }
  if (edits.gameMode !== undefined) root.PlayerGameMode = I(Number(edits.gameMode));
  if (edits.inventory) {
    const items = edits.inventory.filter(i => i && i.name).map((it, idx) => {
      const fields = {
        Name: S(it.name),
        Count: By(Math.max(1, Math.min(64, Number(it.count ?? 1)))),
        Slot: By(Math.max(0, Math.min(255, Number(it.slot ?? idx))))
      };
      return C(fields);
    });
    root.Inventory = L(10, items);
  }
  return state;
}

export function playerToBytes(state) {
  return writeNBT(state.nbt, true);
}

// 常用物品名（背包编辑下拉/校验用）
export const ITEM_SUGGEST = [
  'minecraft:stone', 'minecraft:dirt', 'minecraft:oak_planks', 'minecraft:crafting_table',
  'minecraft:torch', 'minecraft:bread', 'minecraft:wheat_seeds', 'minecraft:emerald',
  'minecraft:diamond', 'minecraft:iron_ingot', 'minecraft:gold_ingot', 'minecraft:coal',
  'minecraft:wooden_pickaxe', 'minecraft:stone_pickaxe', 'minecraft:iron_pickaxe',
  'minecraft:diamond_pickaxe', 'minecraft:iron_sword', 'minecraft:diamond_sword',
  'minecraft:bow', 'minecraft:arrow', 'minecraft:apple', 'minecraft:book',
  'minecraft:chest', 'minecraft:furnace', 'minecraft:bed', 'minecraft:water_bucket'
];
