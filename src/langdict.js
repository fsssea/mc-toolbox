// 名称解析：优先用包里自带的 texts/*.lang，其次官方语言表，不在代码里硬编码方块名
import { VANILLA_LANG } from './vanilla_lang.js';
import { NAME_FIXES, NAME_OVERRIDES } from './name_overrides.js';

const CJK = /[\u4e00-\u9fa5]/;
const pack = { block: new Map(), item: new Map(), entity: new Map() };
let base = null;

// 基岩官方语言表暂未收录的个别方块（留空表示全部走语言文件）
const EXTRA = {};

const ALIAS = { grass_path: 'dirt_path', lit_furnace: 'furnace', flowing_water: 'water', flowing_lava: 'lava', grass: 'short_grass', villager_v2: 'villager', zombie_villager_v2: 'zombie_villager', wither_skeleton: 'wither_skeleton', snow_golem: 'snow_golem' };

function parseLang(text, into) {
  let n = 0;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || line.startsWith('//')) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim();
    if (!key || !val || !CJK.test(val)) continue;
    const m = key.match(/^(tile|block|item|entity)\.(.+)$/i);
    if (!m) continue;
    let name = m[2].replace(/\.(name|description)$/i, '');
    const bucket = m[1].toLowerCase() === 'entity' ? into.entity
      : (m[1].toLowerCase() === 'item' ? into.item : into.block);
    if (!name.includes('.') && !bucket.has(name)) { bucket.set(name, val); n++; }
    else if (name.includes('.') && !bucket.has(name)) bucket.set(name, val);
  }
  return n;
}

/** 打开压缩包时调用：把包内所有 zh_CN.lang 灌进来（模组自定义名称优先） */
export function initNames(archive) {
  pack.block.clear(); pack.item.clear(); pack.entity.clear();
  if (!archive) return 0;
  const paths = archive.paths().filter(p => /(^|\/)texts\/zh[^/]*\.lang$/i.test(p));
  for (const p of paths) {
    try { parseLang(archive.getText(p), pack); } catch (e) { /* 忽略坏文件 */ }
  }
  return pack.block.size + pack.item.size + pack.entity.size;
}

function ensureBase() {
  if (base) return base;
  base = { block: new Map(), item: new Map(), entity: new Map() };
  parseLang(VANILLA_LANG, base);
  return base;
}

const fixes = new Map();
let fixRaw = '';

/** 读音修正层：用户自填，最高优先级，不内置任何纠错译文 */
export function loadNameFix() {
  fixes.clear();
  try { fixRaw = localStorage.getItem('mcbe_name_fix') || ''; } catch (e) { fixRaw = fixRaw || ''; }
  for (const raw of fixRaw.split(/\r?\n/)) {
    const eq = raw.indexOf('=');
    if (eq <= 0) continue;
    const k = raw.slice(0, eq).trim().replace(/^minecraft:/i, '').toLowerCase();
    const v = raw.slice(eq + 1).trim();
    if (k && v) fixes.set(k, v);
  }
}
export function getNameFixText() { return fixRaw; }
export function saveNameFix(text) {
  fixRaw = text || '';
  try { localStorage.setItem('mcbe_name_fix', fixRaw); } catch (e) { /* 内存态兜底 */ }
  loadNameFix();
  return fixes.size;
}
loadNameFix();

function strip(id) { return String(id).replace(/^minecraft:/i, '').toLowerCase(); }

function lookup(id, kind) {
  const k = strip(id);
  if (fixes.has(k)) return fixes.get(k);
  const alias = ALIAS[k];
  const tryList = alias ? [k, alias] : [k];
  for (const key of tryList) {
    if (pack[kind].has(key)) return pack[kind].get(key);
  }
  const b = ensureBase();
  for (const key of tryList) {
    if (b[kind].has(key)) return b[kind].get(key);
    if (b.item.has(key)) return b.item.get(key);
    if (EXTRA[key]) return EXTRA[key];
  }
  return null;
}

function fixup(name, id) {
  if (!name) return name;
  const key = strip(id);
  if (NAME_OVERRIDES[key]) return NAME_OVERRIDES[key];
  let out = name;
  for (const [from, to] of NAME_FIXES) out = out.split(from).join(to);
  return out;
}

export function blockName(id) {
  return fixup(lookup(id, 'block'), id) || strip(id).replace(/_/g, ' ');
}
export function entityName(id) {
  return fixup(lookup(id, 'entity'), id) || strip(id).replace(/_/g, ' ');
}
