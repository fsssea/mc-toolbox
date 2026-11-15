import { parseNBTWithHeader, plain, plainNBT, writeLevelDat } from './nbt.js';

export function readLevelDat(u8) {
  const nbt = parseNBTWithHeader(u8);
  const p = plainNBT(nbt);
  return { nbt, plain: p };
}

export function levelFields(p) {
  return {
    levelName: p.LevelName ?? '',
    gameType: p.GameType ?? 0,
    difficulty: p.Difficulty ?? 2,
    hardcore: !!p.hardcore,
    cheats: !!p.commandsEnabled,
    keepInventory: !!p.keepInventory,
    spawnX: p.SpawnX ?? 0,
    spawnY: p.SpawnY ?? 0,
    spawnZ: p.SpawnZ ?? 0,
    time: Number(p.Time ?? 0),
    seed: String(p.RandomSeed ?? '0'),
  };
}

// 把表单值写回 NBT 树（保持原有标签类型，缺失则按标准类型补）
export function applyLevelEdits(nbt, v) {
  const root = nbt.root.value;
  const set = (name, t, val) => { root[name] = { t, v: val }; };
  if ('levelName' in v) set('LevelName', 8, String(v.levelName));
  if ('gameType' in v) set('GameType', 3, Number(v.gameType));
  if ('difficulty' in v) set('Difficulty', 3, Number(v.difficulty));
  if ('hardcore' in v) set('hardcore', 1, v.hardcore ? 1 : 0);
  if ('cheats' in v) set('commandsEnabled', 1, v.cheats ? 1 : 0);
  if ('keepInventory' in v) set('keepInventory', 1, v.keepInventory ? 1 : 0);
  if ('spawnX' in v) set('SpawnX', 3, Number(v.spawnX));
  if ('spawnY' in v) set('SpawnY', 3, Number(v.spawnY));
  if ('spawnZ' in v) set('SpawnZ', 3, Number(v.spawnZ));
  if ('time' in v) set('Time', 4, BigInt(Math.round(Number(v.time))));
  if ('seed' in v) {
    try { set('RandomSeed', 4, BigInt(String(v.seed).trim())); } catch (e) { throw new Error('种子必须是整数'); }
  }
  return nbt;
}

export function writeLevelDatBytes(originalU8, nbt) {
  return writeLevelDat(originalU8, nbt);
}
