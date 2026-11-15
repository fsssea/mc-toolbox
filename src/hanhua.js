// 一键汉化：扫 texts/*.lang + JSON 文案 + 可选脚本提示
import { langToMap, translateLang, translateValue, hasCJK, isSimplified } from './lang.js';
import { DICT } from './dict.js';

const LANG_RE = /(^|\/)texts\/([A-Za-z0-9_-]+)\.lang$/;
const PACK_RE = /^(.*?)(behavior_packs|resource_packs|behavior|resource)(\/[^/]+)/;

export function buildDict(extra) { return Object.assign({}, DICT, extra || {}); }

// 扫描包里所有包目录与语言文件
export function scanPacks(archive) {
  const byPack = new Map();
  for (const f of archive.files) {
    const m = f.path.match(LANG_RE);
    if (!m) continue;
    const dir = f.path.slice(0, f.path.lastIndexOf('/texts/'));
    if (!byPack.has(dir)) byPack.set(dir, { dir, langs: [] });
    const name = f.path.split('/').pop();
    const text = archive.getText(f.path);
    byPack.get(dir).langs.push({
      name, path: f.path, text,
      isZh: name === 'zh_CN.lang',
      simplified: isSimplified(text),
      hasCJK: hasCJK(text),
      keys: langToMap(text).size
    });
  }
  return [...byPack.values()].map(p => ({
    ...p,
    zh: p.langs.find(l => l.isZh) || null,
    otherZh: p.langs.find(l => !l.isZh && l.simplified) || null,
    en: p.langs.find(l => l.name === 'en_US.lang') || null,
    source: p.langs.find(l => l.name === 'en_US.lang') || p.langs[0] || null
  }));
}

// 递归翻译 JSON 里的文案字段
const TEXT_KEYS = new Set(['text', 'name', 'description', 'title', 'subtitle', 'label', 'display_name', 'pack_name']);

function translateJson(obj, dict, stats) {
  if (Array.isArray(obj)) { obj.forEach(v => translateJson(v, dict, stats)); return; }
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (typeof v === 'string') {
        if (TEXT_KEYS.has(k) && !hasCJK(v)) {
          const t = translateValue(v, dict);
          if (t !== v) { obj[k] = t; stats.jsonStrings++; }
        }
      } else translateJson(v, dict, stats);
    }
  }
}

export function localizeArchive(archive, { extraDict, json = true, scripts = false, overwriteZh = false } = {}) {
  const dict = buildDict(extraDict);
  const stats = { packs: 0, created: 0, updated: 0, keptZh: 0, keys: 0, changed: 0, jsonFiles: 0, jsonStrings: 0, notes: [] };
  for (const pack of scanPacks(archive)) {
    stats.packs++;
    const src = pack.source;
    if (!src) continue;

    if (pack.zh && !overwriteZh) {
      // 已有 zh_CN.lang：只在缺键时用词典补齐（不破坏人工翻译）
      const zhMap = langToMap(pack.zh.text);
      const missing = [];
      const srcMap = langToMap(src.text);
      for (const [k, v] of srcMap) if (!zhMap.has(k) && dict[v.trim()]) missing.push(k + '=' + dict[v.trim()]);
      if (missing.length) {
        const text = pack.zh.text.replace(/\s*$/, '') + '\n# 以下由工具箱补齐\n' + missing.join('\n') + '\n';
        archive.setBytes(pack.zh.path, new TextEncoder().encode(text));
        stats.changed += missing.length;
        stats.notes.push(`${pack.dir}: 已有 zh_CN.lang，补齐 ${missing.length} 条`);
      }
      stats.keptZh++;
      continue;
    }

    const base = pack.otherZh
      ? { ...pack.otherZh, note: '检测到其它语言文件含简体中文，以其为基准，不再机翻' }
      : src;
    const r = translateLang(base.text, dict, { script: scripts });
    const header = pack.otherZh ? '# 由其它语言文件（已含简体中文）整理\n' : '# 由工具箱自动汉化（离线词典）\n';
    const outPath = pack.dir + '/texts/zh_CN.lang';
    archive.setBytes(outPath, new TextEncoder().encode(header + r.text));
    stats.created++;
    stats.keys += r.total;
    stats.changed += r.changed;
    stats.notes.push(`${pack.dir}: ${pack.zh ? '覆盖' : '新建'} zh_CN.lang，${r.total} 条，翻译 ${r.changed} 条${pack.otherZh ? '（源：' + pack.otherZh.name + '）' : ''}`);
  }

  if (json) {
    for (const f of archive.files) {
      if (!/\.json$/.test(f.path)) continue;
      if (f.data.length > 3 * 1024 * 1024) continue;
      let obj;
      try { obj = JSON.parse(new TextDecoder().decode(f.data)); } catch (e) { continue; }
      const before = stats.jsonStrings;
      translateJson(obj, dict, stats);
      if (stats.jsonStrings !== before) {
        archive.setBytes(f.path, new TextEncoder().encode(JSON.stringify(obj, null, 2)));
        stats.jsonFiles++;
      }
    }
  }
  return stats;
}
