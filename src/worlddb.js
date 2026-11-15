// 读取/重建存档里的 LevelDB
import { readLevelDb } from 'mcbe-leveldb-reader';
import { buildDb } from './dbwrite.js';

const DB_RE = /(^|\/)(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/;

export function dbPaths(archive) {
  return archive.paths().filter(p => DB_RE.test(p));
}

export function dbRoot(paths) {
  const p = paths.find(x => /(^|\/)CURRENT$/.test(x));
  return p ? p.slice(0, p.lastIndexOf('/') + 1) : '';
}

export async function readArchiveDb(archive) {
  const paths = dbPaths(archive);
  if (!paths.length) throw new Error('这个包里没有 LevelDB 数据库');
  const files = paths.map(p => {
    const b = archive.getBytes(p);
    return { name: p.split('/').pop(), arrayBuffer: async () => b };
  });
  const db = await readLevelDb(files, {});
  return { db, paths };
}

const sameBytes = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

// edits: [{ key: '~local_player', bytes: Uint8Array }]
export function rebuildArchiveDb(archive, db, edits, paths) {
  const entries = [];
  const targets = edits.map(e => {
    const hit = [...db.entries()].find(([k]) => k === e.key);
    if (!hit) throw new Error('存档里找不到键：' + e.key);
    return { bytes: hit[1].keyBytes, value: e.bytes };
  });
  let replaced = 0;
  for (const [, kv] of db) {
    let value = kv.value;
    for (const t of targets) {
      if (sameBytes(kv.keyBytes, t.bytes)) { value = t.value; replaced++; }
    }
    entries.push({ key: kv.keyBytes, value });
  }
  if (!replaced) throw new Error('没有匹配到要修改的键');
  const built = buildDb(entries);
  const root = dbRoot(paths);
  for (const p of paths) archive.remove(p);
  for (const [name, data] of Object.entries(built)) {
    if (name === 'logName') continue;
    archive.setBytes(root + name, data);
  }
  return { files: Object.keys(built).length - 1, replaced, bytes: built[built.logName].length };
}
