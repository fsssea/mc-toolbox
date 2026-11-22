// 一键汉化：texts/*.lang、UI 字符串、术语表
import { TERMS } from './dict.js';
import { Archive } from './archive.js';
import { parseZip } from './zip.js';

const CJK = /[\u4e00-\u9fff]/;
const ZH_KEYS = ['zh_CN', 'zh_cn', 'zh-Hans', 'zh_hans'];

export function isChineseText(s) { return CJK.test(s || ''); }

// 解析 .lang：key=value，保留注释与空行
export function parseLang(text) {
  const lines = String(text).replace(/^\uFEFF/, '').split(/\r?\n/);
  const entries = [];
  const td = new TextDecoder();
  for (const raw of lines) {
    const line = raw;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) { entries.push({ raw: line, key: null }); continue; }
    const eq = line.indexOf('=');
    if (eq < 0) { entries.push({ raw: line, key: null }); continue; }
    entries.push({ raw: line, key: line.slice(0, eq).trim(), value: line.slice(eq + 1), eq });
  }
  return entries;
}

export function serializeLang(entries) {
  return entries.map(e => e.raw).join('\n');
}

// 词典翻译：先整句命中，再短语替换，最后逐词
export function translateValue(value, dict = TERMS) {
  if (!value) return value;
  if (isChineseText(value)) return value;          // 已经是中文就不动
  const direct = dict[value] || dict[value.trim()];
  if (direct) return preserveFormat(value, direct);

  let out = value;
  // 最长匹配优先
  const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    if (k.length < 3) continue;
    const re = new RegExp('\\b' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    out = out.replace(re, dict[k]);
  }
  // 逐词兜底（只覆盖常见词）
  const words = value.match(/[A-Za-z]{3,}/g) || [];
  let hit = 0;
  out = value.replace(/\b([A-Za-z]{3,})\b/g, (m) => {
    const t = dict[m] || dict[m.toLowerCase()];
    if (t) { hit++; return t; }
    return m;
  });
  // 覆盖率太低（不足六成）就保留原文，避免翻出中英混杂的碎片
  if (words.length >= 2 && hit / words.length < 0.6) return value;
  if (words.length === 1 && hit === 0) return value;
  return out;
}

// 保留 %s / %1$d 等占位符位置：只在中文串末尾不强加，直接返回译文
function preserveFormat(original, translated) {
  return translated;
}

// 找出一个包里的 lang 文件类型
export function langInfo(paths) {
  const langs = paths.filter(p => /(^|\/)texts\/[^/]+\.lang$/i.test(p));
  const names = langs.map(p => p.split('/').pop().replace(/\.lang$/i, ''));
  const hasZh = names.some(n => ZH_KEYS.includes(n));
  return { langs, names, hasZh };
}

// 判断包是否已含简体中文（zh_CN 或其它语言文件里的中文值）
export function packHasChinese(archive, langs) {
  for (const p of langs) {
    const txt = archive.getText(p);
    for (const e of parseLang(txt)) {
      if (e.key && isChineseText(e.value)) return { file: p, key: e.key };
    }
  }
  return null;
}

/**
 * 汉化一个包：
 * packs 里每个包独立判断；返回报告
 */
export function localizePack(archive, packPrefix) {
  const all = archive.paths();
  const langs = all.filter(p => (packPrefix ? p.startsWith(packPrefix + '/') : true)
    && /(^|\/)texts\/[^/]+\.lang$/i.test(p));
  if (!langs.length) return { status: 'no-lang', translated: 0, created: false };
  const chinese = packHasChinese(archive, langs);
  if (chinese) return { status: 'already-zh', where: chinese.file, translated: 0 };
  // 写 zh_CN.lang：优先复制 en_US 结构，没有就取第一个
  const base = langs.find(p => /en_US\.lang$/i.test(p)) || langs[0];
  const baseText = archive.getText(base);
  const entries = parseLang(baseText);
  let n = 0;
  for (const e of entries) {
    if (!e.key || !e.value) continue;
    const t = translateValue(e.value);
    if (t !== e.value) { e.raw = e.key + '=' + t; n++; }
  }
  const target = base.replace(/[^/]+\.lang$/, 'zh_CN.lang');
  archive.setBytes(target, new TextEncoder().encode(serializeLang(entries)));
  return { status: 'localized', translated: n, created: !all.includes(target), file: target };
}

// 扫描单层包：行为包 / 资源包分别汉化
function localizeFlat(archive) {
  const reports = [];
  const packs = new Set();
  for (const p of archive.paths()) {
    const m = p.match(/^(behavior_packs|resource_packs)\/([^/]+)\//);
    if (m) packs.add(m[1] + '/' + m[2]);
  }
  // 单个 .mcpack 直接放 manifest.json 的情况
  if (!packs.size) packs.add('');
  for (const pk of packs) reports.push({ pack: pk || '(根目录包)', ...localizePack(archive, pk) });
  return reports;
}

// 扫描整包：先处理外层，再把内嵌的 .mcpack / .mcaddon 解开处理并写回
export function localizeArchive(archive) {
  const reports = localizeFlat(archive);

  for (const f of archive.files) {
    if (!/\.(mcpack|mcaddon)$/i.test(f.path)) continue;
    if (!f.data || f.data.length < 22) continue;
    try {
      const zip = parseZip(f.data);
      const sub = new Archive('zip', zip.entries
        .filter(e => !e.name.endsWith('/'))
        .map(e => ({ path: e.name, data: zip.read(e) })));

      const inner = localizeFlat(sub);
      const innerUi = [];
      for (const p of sub.paths()) {
        if (/\.json$/i.test(p) && /(^|\/)ui\//.test(p)) {
          const n = localizeUiJson(sub, p);
          if (n) innerUi.push(`${p} (${n} 处)`);
        }
      }

      const changed = inner.some(r => r.status === 'localized');
      if (!changed && !innerUi.length) {
        if (inner.length) {
          for (const r of inner) reports.push({ ...r, pack: `${f.path} :: ${r.pack}`, nested: true });
        } else {
          reports.push({ pack: f.path, status: 'no-lang', nested: true });
        }
        continue;
      }

      f.data = sub.toBytes();
      for (const r of inner) {
        reports.push({ ...r, pack: `${f.path} :: ${r.pack}`, nested: true });
      }
      if (innerUi.length) reports.push({ pack: `${f.path} :: UI`, status: 'localized', translated: innerUi.length, file: innerUi.join('、'), nested: true });
    } catch (e) {
      reports.push({ pack: f.path, status: 'error', nested: true, note: e.message });
    }
  }

  return reports;
}

// JSON UI / 脚本字符串：只翻译 "text"/"label"/"title" 之类字段，不碰代码结构
export function localizeUiJson(archive, path) {
  const txt = archive.getText(path);
  let json;
  try { json = JSON.parse(txt); } catch (e) { return 0; }
  let n = 0;
  const walk = (o) => {
    if (Array.isArray(o)) { o.forEach(walk); return; }
    if (!o || typeof o !== 'object') return;
    for (const k of Object.keys(o)) {
      const v = o[k];
      if (typeof v === 'string' && /^(text|label|title|content|message|tooltip|button_text)$/i.test(k) && !isChineseText(v)) {
        const t = translateValue(v);
        if (t !== v) { o[k] = t; n++; }
      } else walk(v);
    }
  };
  walk(json);
  if (n) archive.setBytes(path, new TextEncoder().encode(JSON.stringify(json, null, 2)));
  return n;
}
