import { parseZip, buildZip } from './zip.js';
import { parseBrarchive, buildBrarchive, isBrarchive } from './brarchive.js';

const ZIP_EXT = /\.(mcpack|mcaddon|mcworld|mctemplate|zip|mcskin|mceditpack)$/i;

export function detectKind(name, u8) {
  if (isBrarchive(u8)) return 'brarchive';
  if (/\.brarchive$/i.test(name)) return 'brarchive';
  if (u8.length > 4 && u8[0] === 0x50 && u8[1] === 0x4b) return 'zip';
  if (ZIP_EXT.test(name)) return 'zip';
  if (/\.mcstructure$/i.test(name)) return 'mcstructure';
  if (/\.(dat|ldb|log|sst|nbt)$/i.test(name)) return 'nbt';
  return 'unknown';
}

export class Archive {
  constructor(kind, entries) {
    this.kind = kind;                       // 'zip' | 'brarchive'
    this.files = entries.map(e => ({ path: normalize(e.path || e.name), data: e.data }));
  }

  static fromBytes(name, u8) {
    const kind = detectKind(name, u8);
    if (kind === 'brarchive') {
      const p = parseBrarchive(u8);
      return new Archive('brarchive', p.entries.map(e => ({ path: e.name, data: e.data })));
    }
    if (kind === 'zip') {
      const z = parseZip(u8);
      return new Archive('zip', z.entries.filter(e => !e.name.endsWith('/')).map(e => ({ path: e.name, data: z.read(e) })));
    }
    throw new Error('这个文件不是压缩包格式（.mcpack/.mcaddon/.mcworld/.brarchive）');
  }

  paths() { return this.files.map(f => f.path); }
  get(path) { return this.files.find(f => f.path === path); }
  getBytes(path) { const f = this.get(path); if (!f) throw new Error('文件不存在：' + path); return f.data; }
  getText(path) { return new TextDecoder('utf-8').decode(this.getBytes(path)); }

  setBytes(path, data) {
    path = normalize(path);
    const f = this.get(path);
    if (f) f.data = data; else this.files.push({ path, data });
  }

  remove(path) {
    path = normalize(path);
    const n = path + '/';
    this.files = this.files.filter(f => f.path !== path && !f.path.startsWith(n));
  }

  rename(from, to, isFolder) {
    from = normalize(from); to = normalize(to);
    if (isFolder) {
      const pref = from + '/';
      for (const f of this.files) {
        if (f.path.startsWith(pref)) f.path = to + '/' + f.path.slice(pref.length);
      }
    } else {
      const f = this.get(from);
      if (f) { f.path = to; f.data = f.data; }
    }
  }

  // 文件夹树：['a','a/b','a/b/c.json'] （空文件夹不单独存在，新建时给个占位）
  tree() {
    const nodes = [];
    const seen = new Set();
    for (const f of this.files) {
      const parts = f.path.split('/');
      for (let i = 1; i < parts.length; i++) {
        const dir = parts.slice(0, i).join('/');
        if (!seen.has(dir)) { seen.add(dir); nodes.push({ type: 'dir', path: dir, name: parts[i - 1], depth: i - 1 }); }
      }
      nodes.push({ type: 'file', path: f.path, name: parts[parts.length - 1], depth: parts.length - 1, size: f.data.length });
    }
    return nodes;
  }

  toBytes() {
    if (this.kind === 'brarchive') return buildBrarchive(this.files);
    return buildZip(this.files);
  }
}

function normalize(p) { return String(p).replace(/\\/g, '/').replace(/^\/+/, ''); }

const TEXT_EXT = /\.(json|js|ts|mjs|cjs|mcfunction|txt|md|xml|html|css|lang|material|vertex|fragment|glsl|yaml|yml|toml|ini|cfg|properties|bat|sh|py|ni)$/i;

export function isTextFile(path, data) {
  if (TEXT_EXT.test(path)) return true;
  if (data && data.length > 2 * 1024 * 1024) return false;
  // 前 4KB 里出现 NUL 就按二进制处理
  const n = Math.min(data.length, 4096);
  for (let i = 0; i < n; i++) if (data[i] === 0) return false;
  // 前 4KB 用严格 UTF-8 解码，失败则按二进制（旧逻辑只看 NUL，坏文件会被当文本）
  try { new TextDecoder('utf-8', { fatal: true }).decode(data.subarray(0, Math.min(data.length, 65536))); }
  catch (e) { return false; }
  return true;
}
