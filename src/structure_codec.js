// .mcstructure 的纯英文代码视图与字节视图编解码
// 代码视图使用 JSON 结构，键名、类型名全部为英文，类型信息显式保留。

export const NBT_TYPE_NAMES = {
  0: 'End', 1: 'Byte', 2: 'Short', 3: 'Int', 4: 'Long', 5: 'Float',
  6: 'Double', 7: 'ByteArray', 8: 'String', 9: 'List', 10: 'Compound',
  11: 'IntArray', 12: 'LongArray'
};

const NBT_TYPE_CODES = Object.fromEntries(
  Object.entries(NBT_TYPE_NAMES).map(([code, name]) => [name, Number(code)])
);

function numberToJson(v) {
  const n = Number(v);
  if (Number.isNaN(n)) return 'NaN';
  if (n === Infinity) return 'Infinity';
  if (n === -Infinity) return '-Infinity';
  return n;
}

function jsonToNumber(v, label) {
  if (v === 'NaN') return NaN;
  if (v === 'Infinity') return Infinity;
  if (v === '-Infinity') return -Infinity;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(label + ' 不是有效数字：' + v);
  return n;
}

function typeCode(name) {
  const code = NBT_TYPE_CODES[name];
  if (code === undefined) throw new Error('未知 NBT 类型：' + name);
  return code;
}

function toTyped(node) {
  if (!node || typeof node.t !== 'number') throw new Error('NBT 节点缺少类型');
  const type = NBT_TYPE_NAMES[node.t];
  if (!type) throw new Error('未知 NBT 类型编号：' + node.t);

  if (node.t === 10) {
    const value = {};
    for (const [key, child] of Object.entries(node.v || {})) value[key] = toTyped(child);
    return { type, value };
  }
  if (node.t === 9) {
    const element = NBT_TYPE_NAMES[node.et] || NBT_TYPE_NAMES[(node.v && node.v[0] && node.v[0].t) || 0] || 'End';
    return { type, element, value: (node.v || []).map(toTyped) };
  }
  if (node.t === 7) return { type, value: Array.from(node.v || []) };
  if (node.t === 11) return { type, value: Array.from(node.v || []).map(Number) };
  if (node.t === 12) return { type, value: Array.from(node.v || []).map(x => String(x)) };
  if (node.t === 4) return { type, value: String(node.v) };
  if (node.t === 5 || node.t === 6) return { type, value: numberToJson(node.v) };
  if (node.t === 8) return { type, value: String(node.v ?? '') };
  return { type, value: Number(node.v) };
}

function fromTyped(obj, label = 'value') {
  if (!obj || typeof obj !== 'object') throw new Error(label + ' 必须是对象');
  const code = typeCode(obj.type);
  const value = obj.value;

  if (code === 10) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(label + ' 的 Compound value 必须是对象');
    const v = {};
    for (const [key, child] of Object.entries(value)) v[key] = fromTyped(child, label + '.' + key);
    return { t: 10, v };
  }
  if (code === 9) {
    if (!Array.isArray(value)) throw new Error(label + ' 的 List value 必须是数组');
    const et = typeCode(obj.element || 'End');
    return { t: 9, et, v: value.map((child, i) => fromTyped(child, label + '[' + i + ']')) };
  }
  if (code === 7) {
    if (!Array.isArray(value)) throw new Error(label + ' 的 ByteArray value 必须是数组');
    return { t: 7, v: value.map((x, i) => {
      const n = Number(x);
      if (!Number.isInteger(n) || n < 0 || n > 255) throw new Error(label + '[' + i + '] 必须是 0~255 的整数');
      return n;
    }) };
  }
  if (code === 11) {
    if (!Array.isArray(value)) throw new Error(label + ' 的 IntArray value 必须是数组');
    return { t: 11, v: value.map((x, i) => {
      const n = Number(x);
      if (!Number.isInteger(n) || n < -2147483648 || n > 2147483647) throw new Error(label + '[' + i + '] 必须是 32 位整数');
      return n;
    }) };
  }
  if (code === 12) {
    if (!Array.isArray(value)) throw new Error(label + ' 的 LongArray value 必须是数组');
    return { t: 12, v: value.map((x, i) => {
      try { return BigInt(String(x)); } catch { throw new Error(label + '[' + i + '] 必须是 64 位整数'); }
    }) };
  }
  if (code === 1) {
    const n = Number(value);
    if (!Number.isInteger(n) || n < -128 || n > 127) throw new Error(label + ' 必须是 -128~127 的 Byte');
    return { t: 1, v: n };
  }
  if (code === 2) {
    const n = Number(value);
    if (!Number.isInteger(n) || n < -32768 || n > 32767) throw new Error(label + ' 必须是 -32768~32767 的 Short');
    return { t: 2, v: n };
  }
  if (code === 3) {
    const n = Number(value);
    if (!Number.isInteger(n) || n < -2147483648 || n > 2147483647) throw new Error(label + ' 必须是 32 位 Int');
    return { t: 3, v: n };
  }
  if (code === 4) {
    try { return { t: 4, v: BigInt(String(value)) }; } catch { throw new Error(label + ' 必须是 64 位 Long'); }
  }
  if (code === 5 || code === 6) {
    const n = jsonToNumber(value, label);
    return { t: code, v: n };
  }
  if (code === 8) {
    if (typeof value !== 'string') throw new Error(label + ' 必须是字符串');
    return { t: 8, v: value };
  }
  throw new Error(label + ' 的类型 ' + obj.type + ' 不能直接写入');
}

// parseNBT 的返回值 -> 英文代码文本
export function englishFromNbt(nbt) {
  if (!nbt || !nbt.root) throw new Error('NBT 缺少根节点');
  const rootNode = { t: nbt.root.type, v: nbt.root.value };
  const typed = toTyped(rootNode);
  const root = { type: typed.type, name: nbt.root.name || '', value: typed.value };
  if (typed.element) root.element = typed.element;
  return JSON.stringify({ root }, null, 2) + '\n';
}

// 英文代码文本 -> writeNBT 可用的根节点
export function nbtFromEnglish(text) {
  let obj;
  try { obj = JSON.parse(text); } catch (e) { throw new Error('英文代码不是有效 JSON：' + e.message); }
  if (!obj || !obj.root) throw new Error('英文代码缺少 root');
  const root = obj.root;
  const node = fromTyped({ type: root.type, value: root.value, element: root.element }, 'root');
  if (node.t !== 10) throw new Error('root.type 必须是 Compound');
  return { root: { type: node.t, name: String(root.name || ''), value: node.v } };
}

// 二进制位视图：每字节 8 位，16 字节一行
export function formatBinary(bytes) {
  const lines = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const row = [];
    for (let j = 0; j < 16 && i + j < bytes.length; j++) row.push(bytes[i + j].toString(2).padStart(8, '0'));
    lines.push(row.join(' '));
  }
  return lines.join('\n');
}

export function parseBinary(text) {
  const bits = String(text).replace(/0b/gi, '').replace(/[^01]/g, '');
  if (!bits.length || bits.length % 8 !== 0) throw new Error('二进制必须是每字节 8 位，且总位数能被 8 整除');
  const out = [];
  for (let i = 0; i < bits.length; i += 8) out.push(parseInt(bits.slice(i, i + 8), 2));
  return out;
}

// 十进制字节视图：每行 16 个，0~255
export function formatDecimal(bytes) {
  const lines = [];
  for (let i = 0; i < bytes.length; i += 16) {
    lines.push(Array.from(bytes.subarray(i, i + 16)).join(' '));
  }
  return lines.join('\n');
}

export function parseDecimal(text) {
  const nums = String(text).match(/-?\d+/g) || [];
  if (!nums.length) throw new Error('十进制视图没有数字');
  return nums.map((x, i) => {
    const n = Number(x);
    if (!Number.isInteger(n) || n < 0 || n > 255) throw new Error('第 ' + (i + 1) + ' 个值不是 0~255：' + x);
    return n;
  });
}

// 十六进制字节视图：每行 16 组
export function formatHex(bytes) {
  const lines = [];
  for (let i = 0; i < bytes.length; i += 16) {
    lines.push(Array.from(bytes.subarray(i, i + 16)).map(b => b.toString(16).padStart(2, '0')).join(' '));
  }
  return lines.join('\n');
}

export function parseHex(text) {
  const clean = String(text).replace(/0x/gi, '').replace(/\s+/g, '');
  if (!clean.length || !/^[0-9a-fA-F]+$/.test(clean) || clean.length % 2 !== 0) throw new Error('十六进制必须是偶数位，只能包含 0-9 / a-f');
  const out = [];
  for (let i = 0; i < clean.length; i += 2) out.push(parseInt(clean.slice(i, i + 2), 16));
  return out;
}
