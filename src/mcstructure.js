import { parseNBT, plainNBT, writeNBT } from './nbt.js';

export function parseStructure(u8) {
  const nbt = parseNBT(u8, 0, true);
  if (nbt.root.type !== 10) throw new Error('结构文件根标签不是 Compound');
  const p = plainNBT(nbt);
  const size = p.size || p.Size || [0, 0, 0];
  const st = p.structure || {};
  const paletteWrap = (st.palette && st.palette.default) || {};
  const palette = paletteWrap.block_palette || [];
  const indices = (st.block_indices) || [];
  const entities = (st.entities) || [];
  // 统计每种方块出现次数（只算第一层）
  const counts = new Map();
  let bad = 0;
  const layer0 = indices[0] || [];
  for (const idx of layer0) {
    if (idx < 0) continue;
    const b = palette[idx];
    if (!b) { bad++; continue; }
    counts.set(b.name, (counts.get(b.name) || 0) + 1);
  }
  return {
    nbt, size, palette, indices, entities, counts, bad,
    formatVersion: p.format_version ?? null,
    blockCount: layer0.filter(x => x >= 0).length,
    plain: p,
    rawBytes: u8,
    rawDirty: false
  };
}

export function structureSummary(s) {
  const top = [...s.counts.entries()].sort((a, b) => b[1] - a[1]);
  return {
    size: `${s.size[0]} × ${s.size[1]} × ${s.size[2]}`,
    formatVersion: s.formatVersion,
    paletteTypes: s.palette.length,
    blocks: s.blockCount,
    layers: s.indices.length,
    entities: s.entities.length,
    top: top.slice(0, 100)
  };
}

// 批量替换方块 id（含只改 palette，不改索引）
export function countFrom(structure) {
  const counts = new Map();
  const layer0 = structure.indices[0] || [];
  for (const idx of layer0) {
    if (idx < 0) continue;
    const b = structure.palette[idx];
    if (!b) continue;
    counts.set(b.name, (counts.get(b.name) || 0) + 1);
  }
  return counts;
}

export function replaceBlockName(structure, from, to) {
  let n = 0;
  for (const b of structure.palette) {
    if (b.name === from) { b.name = to; n++; }
  }
  // 同步修改 NBT 树，保证保存后生效
  const paletteNode = structure.nbt.root.value.structure.v.palette.v.default.v.block_palette.v;
  for (const el of paletteNode) {
    const nameNode = el.v && el.v.name;
    if (nameNode && nameNode.v === from) { nameNode.v = to; }
  }
  structure.counts = countFrom(structure);
  structure.rawDirty = false;
  return n;
}

export function structureToBytes(structure) {
  if (structure.rawDirty && structure.rawBytes) return structure.rawBytes;
  return writeNBT(structure.nbt, true);
}


// 按坐标设置方块（layer 0），自动补调色板
export function setBlock(structure, x, y, z, blockName) {
  const [sx, sy, sz] = structure.size;
  if (x < 0 || y < 0 || z < 0 || x >= sx || y >= sy || z >= sz) throw new Error(`坐标超出范围：尺寸 ${sx}×${sy}×${sz}`);
  let pi = structure.palette.findIndex(b => b.name === blockName && JSON.stringify(b.states || {}) === '{}');
  if (pi < 0) {
    // 已有同名但带 states 的条目不能复用，避免把不同状态方块合并成一个
    structure.palette.push({ name: blockName, states: {}, version: 1 });
    pi = structure.palette.length - 1;
    const paletteNode = structure.nbt.root.value.structure.v.palette.v.default.v.block_palette.v;
    paletteNode.push({ t: 10, v: {
      name: { t: 8, v: blockName },
      states: { t: 10, v: {} },
      version: { t: 3, v: 1 }
    } });
    const listNode = structure.nbt.root.value.structure.v.palette.v.default.v.block_palette;
    listNode.t = 9; listNode.et = 10;
  }
  const layer0 = structure.indices[0] || [];
  const i = (x * sz + z) * sy + y;   // 结构文件顺序：y 变化最快
  if (!structure.indices[0]) structure.indices[0] = new Array(sx * sy * sz).fill(-1);
  structure.indices[0][i] = pi;
  // 写回 NBT
  const idxNode = structure.nbt.root.value.structure.v.block_indices.v[0];
  if (idxNode) idxNode.v[i] = pi;   // IntArray(11) 存的是数字；List<Int> 才存节点
  structure.counts = countFrom(structure);
  structure.rawDirty = false;
  return i;
}

export function clearBlock(structure, x, y, z) {
  const [sx, sy, sz] = structure.size;
  const i = (x * sz + z) * sy + y;
  structure.indices[0][i] = -1;
  const idxNode = structure.nbt.root.value.structure.v.block_indices.v[0];
  if (idxNode) idxNode.v[i] = -1;
  structure.counts = countFrom(structure);
  structure.rawDirty = false;
  return i;
}
