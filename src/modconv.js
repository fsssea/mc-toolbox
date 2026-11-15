// 基岩版附加包 ⇄ Java 模组 工程转换（静态资源/数据层，不翻译代码逻辑）
import { parseZip, buildZip } from './zip.js';

function $id(id) { return document.getElementById(id); }
function enc(s) { return new TextEncoder().encode(s); }
const J = (o) => JSON.stringify(o, null, 2);

function readJson(z, e) { try { return JSON.parse(new TextDecoder().decode(z.read(e))); } catch { return null; } }
function baseName(p) { return p.split('/').pop(); }
function stem(p) { return baseName(p).replace(/\.(json|png|lang|mcmeta)$/i, ''); }

function parseLang(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([^=#]+)=(.*)$/);
    if (m) out[m[1].trim()] = m[2];
  }
  return out;
}

function findDirs(z) {
  const rp = z.entries.filter(e => /resource_pack|^rp\/|textures\/|sounds\//.test(e.name));
  const bp = z.entries.filter(e => /behavior_pack|^bp\/|entities\/|items\/|blocks\/|recipes\//.test(e.name));
  return { rp, bp };
}

function loadBedrockAddon(z) {
  const manifests = z.entries.filter(e => /manifest\.json$/.test(e.name)).map(e => readJson(z, e)).filter(Boolean);
  const texts = {};
  for (const e of z.entries) if (/texts\/([a-zA-Z_]+)\.lang$/.test(e.name) || /\.lang$/.test(e.name)) {
    const lang = stem(e.name);
    texts[lang] = parseLang(new TextDecoder().decode(z.read(e)));
  }
  const items = [];
  for (const e of z.entries) {
    if (!/\/items\/.*\.json$/.test(e.name) || e.name.includes('/textures/')) continue;
    const j = readJson(z, e);
    const it = j && j['minecraft:item'];
    if (!it) continue;
    const desc = it.description || {};
    const id = desc.identifier;
    if (!id) continue;
    const comps = it.components || {};
    let icon = comps['minecraft:icon'];
    if (icon && typeof icon === 'object') icon = Array.isArray(icon.textures) ? icon.textures[0] : (icon.texture || icon.textures || '');
    items.push({ id, file: e.name, icon: String(icon || id.split(':')[1]), comps, menu: desc.menu_category || '' });
  }
  const blocks = [];
  for (const e of z.entries) {
    if (!/\/blocks\/.*\.json$/.test(e.name)) continue;
    const j = readJson(z, e);
    const b = j && j['minecraft:block'];
    if (!b) continue;
    const id = (b.description || {}).identifier;
    if (!id) continue;
    const comps = b.components || {};
    let tex = '';
    const mi = comps['minecraft:material_instances'];
    if (mi) {
      const k = mi['*'] || Object.values(mi)[0];
      if (k) tex = k.texture || '';
    }
    blocks.push({ id, file: e.name, comps, tex: tex || id.split(':')[1] });
  }
  const recipes = [];
  for (const e of z.entries) {
    if (!/recipes\/.*\.json$/.test(e.name)) continue;
    const j = readJson(z, e);
    if (!j) continue;
    const key = Object.keys(j).find(k => k.startsWith('minecraft:recipe_'));
    if (!key) continue;
    recipes.push({ type: key, data: j[key], file: e.name });
  }
  const pngs = z.entries.filter(e => /\.png$/.test(e.name)).map(e => ({ name: e.name, data: z.read(e) }));
  return { manifests, texts, items, blocks, recipes, pngs };
}

function pickTexture(pngs, hint) {
  const h = String(hint || '').toLowerCase();
  const hit = pngs.find(p => baseName(p.name).toLowerCase() === h + '.png')
    || pngs.find(p => baseName(p.name).toLowerCase().includes(h.split(':').pop()))
    || pngs.find(p => /items\/|blocks\//.test(p.name));
  return hit || null;
}

function bedrockItemName(texts, id) {
  const short = id.includes(':') ? id.split(':')[1] : id;
  for (const lang of Object.keys(texts)) {
    const t = texts[lang];
    for (const k of [`item.${id}`, `item.${id}.name`, `item.${short}`, `item.${short}.name`, `tile.${short}.name`]) if (t[k]) return t[k];
  }
  return short.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function javaRecipeFromBedrock(r, ns) {
  const d = r.data || {};
  const id = (x) => (typeof x === 'string' ? x : (x && (x.item || x.name)) || '');
  const mapIng = (i) => { const s = id(i); return { item: s.includes(':') ? s : 'minecraft:' + s }; };
  if (r.type === 'minecraft:recipe_shaped') {
    const pat = (d.pattern || []).map(row => row.map(c => c === ' ' ? ' ' : c));
    const keys = {};
    for (const [k, v] of Object.entries(d.key || {})) keys[k] = mapIng(v);
    return { type: 'minecraft:crafting_shaped', pattern: pat, key: keys, result: mapResult(d.result, ns) };
  }
  if (r.type === 'minecraft:recipe_shapeless') {
    const ing = (d.ingredients || []).map(mapIng);
    return { type: 'minecraft:crafting_shapeless', ingredients: ing, result: mapResult(d.result, ns) };
  }
  if (r.type === 'minecraft:recipe_furnace') {
    return { type: 'minecraft:smelting', ingredient: mapIng(d.input), result: mapResult(d.result, ns), cookingtime: 200, experience: 0.1 };
  }
  return null;
}
function mapResult(res, ns) {
  if (Array.isArray(res)) res = res[0] || {};
  let it = res.item || res.name || '';
  if (!it.includes(':')) it = 'minecraft:' + it;
  return { item: it, count: res.count || 1 };
}

function modClassesJava(pkg, modid, items, blocks) {
  const cls = (n) => n.replace(/[^a-zA-Z0-9_]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || 'Entry';
  const uniq = new Set();
  const out = [];
  out.push(`package ${pkg};\n\nimport net.minecraft.resources.ResourceLocation;\n\npublic final class ${modid.replace(/[^a-zA-Z0-9]/g, '')}Mod {\n    public static final String MODID = "${modid}";\n    public static ResourceLocation id(String path) { return ResourceLocation.fromNamespaceAndPath(MODID, path); }\n}\n`);
  if (items.length) {
    const lines = items.map(i => {
      let c = cls(i.id.split(':')[1]); while (uniq.has(c)) c += '_'; uniq.add(c);
      return `    // ${i.id}\n    public static final net.minecraft.world.item.Item ${c.toUpperCase()} = new net.minecraft.world.item.Item(new net.minecraft.world.item.Item.Properties());`;
    });
    out.push(`package ${pkg};\n\npublic final class ModItems {\n${lines.join('\n')}\n}\n`);
  }
  if (blocks.length) {
    const lines = blocks.map(b => {
      let c = cls(b.id.split(':')[1]); while (uniq.has(c)) c += '_'; uniq.add(c);
      return `    // ${b.id}\n    public static final net.minecraft.world.level.block.Block ${c.toUpperCase()} = new net.minecraft.world.level.block.Block(net.minecraft.world.level.block.state.BlockBehaviour.Properties.of());`;
    });
    out.push(`package ${pkg};\n\npublic final class ModBlocks {\n${lines.join('\n')}\n}\n`);
  }
  return out.join('\n');
}

function fabricBuild(name, id, pkg, mc = '1.21.1') {
  return {
    'build.gradle': `plugins { id 'fabric-loom' version '1.7-SNAPSHOT' }\nversion = '1.0.0'\ngroup = '${pkg}'\nrepositories { mavenCentral() }\ndependencies { minecraft "com.mojang:minecraft:${mc}" mappings "net.fabricmc:yarn:${mc}+build.1:v2" modImplementation "net.fabricmc:fabric-loader:0.15.11" modImplementation "net.fabricmc.fabric-api:fabric-api:0.100.0" }\n`,
    'settings.gradle': `pluginManagement { repositories { maven { url 'https://maven.fabricmc.net/' } gradlePluginPortal() } }\n`,
    'src/main/resources/fabric.mod.json': J({ schemaVersion: 1, id, name, version: '1.0.0', entrypoints: { main: [pkg + '.MyMod'] }, depends: { minecraft: mc, 'fabric-loader': '>=0.15' }, description: '由基岩版附加包转换' }),
    'README.md': `# ${name}\n\n由 MC工具箱 从基岩版附加包静态转换生成。\n\n已转换：物品/方块注册占位类、贴图、语言、物品模型、合成配方。\n未转换：行为包脚本(JS)、实体 AI、方块自定义组件逻辑、事件、UI。\n`,
  };
}

export function bedrockAddonToJavaMod(zipBytes, onLog = () => {}) {
  const z = parseZip(zipBytes);
  onLog('读取附加包…');
  const addon = loadBedrockAddon(z);
  if (!addon.items.length && !addon.blocks.length) throw new Error('没有找到可转换的物品/方块 JSON');
  const man = addon.manifests[0] || {};
  const header = man.header || {};
  const name = header.name || 'ConvertedAddon';
  const id = String(name).toLowerCase().replace(/[^a-z0-9_]/g, '_').slice(0, 24) || 'converted';
  const pkg = 'com.example.' + id;
  const files = fabricBuild(name, id, pkg);
  const jp = 'src/main/java/' + pkg.replace(/\./g, '/');
  files[jp + '/MyMod.java'] = `package ${pkg};\n\nimport net.minecraft.resources.ResourceLocation;\n\npublic class MyMod {\n    public static final String MODID = "${id}";\n    public static ResourceLocation id(String path) { return ResourceLocation.fromNamespaceAndPath(MODID, path); }\n}\n`;
  files[jp + '/ModItems.java'] = modClassesJava(pkg, id, addon.items, []).split('\n\n').slice(1).join('\n\n') || '';
  if (addon.blocks.length) files[jp + '/ModBlocks.java'] = modClassesJava(pkg, id, [], addon.blocks).split('\n\n').slice(1).join('\n\n') || '';
  const langs = {};
  for (const it of addon.items) {
    const nm = bedrockItemName(addon.texts, it.id);
    langs['en_us'] = langs['en_us'] || {};
    langs['en_us']['item.' + id + '.' + it.id.split(':')[1]] = nm;
    const tex = pickTexture(addon.pngs, it.icon);
    const short = it.id.split(':')[1];
    if (tex) files[`src/main/resources/assets/${id}/textures/item/${short}.png`] = tex.data;
    files[`src/main/resources/assets/${id}/models/item/${it.id.split(':')[1]}.json`] = J({ parent: 'item/generated', textures: { layer0: `${id}:item/${it.id.split(':')[1]}` } });
  }
  for (const b of addon.blocks) {
    const tex = pickTexture(addon.pngs, b.tex);
    const bshort = b.id.split(':')[1];
    if (tex) files[`src/main/resources/assets/${id}/textures/block/${bshort}.png`] = tex.data;
    files[`src/main/resources/assets/${id}/blockstates/${b.id.split(':')[1]}.json`] = J({ variants: { '': { model: `${id}:block/${b.id.split(':')[1]}` } } });
    files[`src/main/resources/assets/${id}/models/block/${b.id.split(':')[1]}.json`] = J({ parent: 'block/cube_all', textures: { all: `${id}:block/${b.id.split(':')[1]}` } });
    langs['en_us']['block.' + id + '.' + b.id.split(':')[1]] = b.id.split(':')[1].replace(/_/g, ' ');
  }
  for (const [lang, dict] of Object.entries(langs)) files[`src/main/resources/assets/${id}/lang/${lang}.json`] = J(dict);
  let recipes = 0;
  addon.recipes.forEach((r, i) => {
    const jr = javaRecipeFromBedrock(r, id);
    if (!jr) return;
    files[`src/main/resources/data/${id}/recipe/converted_${i + 1}.json`] = J(jr);
    recipes++;
  });
  files[jp + '/MyMod.java'] = files[jp + '/MyMod.java'].replace('// register', '');
  onLog(`物品 ${addon.items.length}，方块 ${addon.blocks.length}，配方 ${recipes}，贴图 ${addon.pngs.length}`);
  return buildZip(Object.entries(files).filter(([, v]) => v !== undefined && v !== '').map(([name, data]) => ({ name, data: typeof data === 'string' ? enc(data) : data })));
}

// ---- Java 模组 → 基岩版附加包 ----
export function javaModToBedrockAddon(zipBytes, onLog = () => {}) {
  const z = parseZip(zipBytes);
  onLog('读取 Java 模组…');
  // 模组元数据
  let modid = '', modName = '', version = '1.0.0';
  const fm = z.entries.find(e => e.name.endsWith('fabric.mod.json'));
  if (fm) {
    const j = readJson(z, fm) || {};
    modid = j.id || ''; modName = j.name || modid; version = String(j.version || '1.0.0');
  }
  if (!modid) {
    const mt = z.entries.find(e => /mods\.toml$|neoforge\.mods\.toml$/.test(e.name));
    if (mt) {
      const txt = new TextDecoder().decode(z.read(mt));
      const m = txt.match(/modId\s*=\s*"([^"]+)"/);
      const n = txt.match(/displayName\s*=\s*"([^"]+)"/);
      if (m) modid = m[1]; if (n) modName = n[1];
    }
  }
  const anyManifest = z.entries.find(e => /META-INF\/MANIFEST\.MF$/.test(e.name));
  if (!modid) modid = stem(z.entries[0].name) || 'converted';
  const ns = modid || 'converted';
  const textures = z.entries.filter(e => /assets\/.*\/textures\/(item|block|blocks|items)\/[^/]+\.png$/.test(e.name));
  const itemTextures = textures.filter(e => /textures\/(item|items)\//.test(e.name));
  const blockTextures = textures.filter(e => /textures\/(block|blocks)\//.test(e.name));
  const langFiles = z.entries.filter(e => /assets\/.*\/lang\/(en_us|zh_cn)\.json$/.test(e.name));
  const recipes = z.entries.filter(e => /data\/.*\/recipe(s)?\/[^/]+\.json$/.test(e.name));
  const itemModels = z.entries.filter(e => /assets\/.*\/models\/item\/[^/]+\.json$/.test(e.name));
  onLog(`贴图 ${textures.length}（物品 ${itemTextures.length} / 方块 ${blockTextures.length}），语言 ${langFiles.length}，配方 ${recipes.length}`);
  if (!itemTextures.length && !blockTextures.length) throw new Error('模组里没有可提取的贴图，无法生成附加包');

  const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
  const bpUuid = uuid(), rpUuid = uuid();
  const bpManifest = { format_version: 2, header: { name: `${modName} BP`, description: '由 Java 模组转换', uuid: bpUuid, version: [1, 0, 0], min_engine_version: [1, 20, 10] }, modules: [{ type: 'data', uuid: uuid(), version: [1, 0, 0] }] };
  const rpManifest = { format_version: 2, header: { name: `${modName} RP`, description: '由 Java 模组转换', uuid: rpUuid, version: [1, 0, 0], min_engine_version: [1, 20, 10] }, modules: [{ type: 'resources', uuid: uuid(), version: [1, 0, 0] }], dependencies: [{ uuid: bpUuid, version: [1, 0, 0] }] };
  const files = {
    'behavior_pack/manifest.json': enc(J(bpManifest)),
    'resource_pack/manifest.json': enc(J(rpManifest)),
  };
  const itemTexJson = { resource_pack_name: modName, texture_name: 'atlas.items', texture_data: {} };
  for (const e of itemTextures) {
    const src = stem(e.name);
    let n = src; let k = 2;
    while (itemTexJson.texture_data[n]) { n = src + '_' + k++; }
    files[`resource_pack/textures/items/${n}.png`] = z.read(e);
    itemTexJson.texture_data[n] = { textures: `textures/items/${n}` };
    // 行为包物品定义
    files[`behavior_pack/items/${n}.json`] = enc(J({
      format_version: '1.20.10',
      'minecraft:item': {
        description: { identifier: `${ns}:${n}`, menu_category: { category: 'items', group: 'itemGroup.name.item' } },
        components: { 'minecraft:icon': { texture: n }, 'minecraft:max_stack_size': 64 },
      },
    }));
  }
  files['resource_pack/textures/item_texture.json'] = enc(J(itemTexJson));

  const blockTexJson = { resource_pack_name: modName, texture_name: 'atlas.terrain', padding: 8, num_mip_levels: 4, texture_data: {} };
  const blocksJson = { format_version: [1, 1, 0] };
  for (const e of blockTextures) {
    const n = stem(e.name);
    files[`resource_pack/textures/blocks/${n}.png`] = z.read(e);
    blockTexJson.texture_data[n] = { textures: `textures/blocks/${n}` };
    blocksJson[n] = { textures: n, sound: 'stone' };
    files[`behavior_pack/blocks/${n}.json`] = enc(J({
      format_version: '1.20.10',
      'minecraft:block': {
        description: { identifier: `${ns}:${n}` },
        components: {
          'minecraft:material_instances': { '*': { texture: n, render_method: 'opaque' } },
          'minecraft:destructible_by_mining': { seconds_to_destroy: 1 },
          'minecraft:geometry': 'minecraft:geometry.full_block',
        },
      },
    }));
  }
  if (blockTextures.length) {
    files['resource_pack/textures/terrain_texture.json'] = enc(J(blockTexJson));
    files['resource_pack/blocks.json'] = enc(J(blocksJson));
  }
  // 语言
  const bedrockLang = {}; const usedKeys = new Set();
  for (const e of langFiles) {
    const j = readJson(z, e) || {};
    for (const [k, v] of Object.entries(j)) {
      let key = k;
      if (k.startsWith('item.')) { const id = k.slice(5); key = `item.${id.includes(':') ? id : ns + ':' + id}`; }
      else if (k.startsWith('block.')) { const id = k.slice(6); key = `tile.${id.includes(':') ? id : ns + ':' + id}.name`; }
      if (!usedKeys.has(key)) { usedKeys.add(key); bedrockLang[key] = v; }
    }
  }
  if (!Object.keys(bedrockLang).length) for (const e of itemTextures) bedrockLang[`item.${ns}:${stem(e.name)}`] = stem(e.name).replace(/_/g, ' ');
  files['resource_pack/texts/en_US.lang'] = enc(Object.entries(bedrockLang).map(([k, v]) => `${k}=${v}`).join('\n'));
  files['resource_pack/texts/zh_CN.lang'] = files['resource_pack/texts/en_US.lang'];
  // 配方
  let rc = 0;
  for (const e of recipes) {
    const j = readJson(z, e); if (!j) continue;
    const conv = javaRecipeToBedrock(j, ns, rc + 1);
    if (!conv) continue;
    files[`behavior_pack/recipes/converted_${rc}.json`] = enc(J(conv));
    rc++;
  }
  onLog(`生成物品 ${itemTextures.length}、方块 ${blockTextures.length}、配方 ${rc}`);
  files['README.md'] = enc(`# ${modName} → 基岩版附加包\n\n已转换：物品/方块贴图、物品/方块注册 JSON、贴图图集、语言、合成配方。\n未转换：Java 代码逻辑、实体 AI、事件、GUI、自定义模型几何。\n`);
  return buildZip(Object.entries(files).map(([name, data]) => ({ name, data })));
}

function javaRecipeToBedrock(j, ns, idx = 1) {
  const fix = (s) => String(s || '').replace('minecraft:', '');
  if (j.type === 'minecraft:crafting_shaped') {
    return { format_version: '1.20.10', 'minecraft:recipe_shaped': {
      description: { identifier: `${ns}:converted_${idx}` }, tags: ['crafting_table'],
      pattern: j.pattern,
      key: Object.fromEntries(Object.entries(j.key || {}).map(([k, v]) => [k, { item: fix(v.item) }])),
      result: { item: fix(j.result.item), count: j.result.count || 1 },
    } };
  }
  if (j.type === 'minecraft:crafting_shapeless') {
    return { format_version: '1.20.10', 'minecraft:recipe_shapeless': {
      description: { identifier: `${ns}:converted_${idx}` }, tags: ['crafting_table'],
      ingredients: (j.ingredients || []).map(i => ({ item: fix(i.item) })),
      result: { item: fix(j.result.item), count: j.result.count || 1 },
    } };
  }
  if (j.type === 'minecraft:smelting') {
    return { format_version: '1.20.10', 'minecraft:recipe_furnace': {
      description: { identifier: `${ns}:converted_${idx}` }, tags: ['furnace'],
      input: fix(j.ingredient.item), output: fix(j.result.item),
    } };
  }
  return null;
}

export function openModConverter() {
  const body = $id('modalBody');
  body.innerHTML = `<h3>模组 / 附加包转换</h3>
    <p class="muted">静态转换资源与数据：贴图、物品/方块定义、语言、配方。不翻译代码逻辑。</p>
    <div class="skbar"><button id="mcAddon2J" class="primary">基岩附加包 → Java 模组工程</button>
      <button id="mcJ2Addon" class="primary">Java 模组 → 基岩附加包</button>
      <button id="mcClose" class="ghost">关闭</button></div>
    <input type="file" id="mcFile" style="display:none">
    <div id="mcLog" class="logbox" style="max-height:36vh;overflow:auto"></div>`;
  $id('modal').style.display = 'flex';
  const box = document.querySelector('.modalbox'); if (box) { box.style.maxWidth = '720px'; box.style.width = '96vw'; }
  $id('mcClose').onclick = () => { if (box) { box.style.maxWidth = ''; box.style.width = ''; } $id('modal').style.display = 'none'; };
  const log = (s) => { const el = $id('mcLog'); if (el) { el.textContent += s + '\n'; el.scrollTop = el.scrollHeight; } };
  const pick = (accept) => new Promise((res, rej) => {
    const inp = $id('mcFile'); inp.value = ''; inp.accept = accept;
    inp.onchange = () => { const f = inp.files[0]; if (!f) return rej(new Error('未选择文件')); f.arrayBuffer().then(b => res(new Uint8Array(b))).catch(rej); };
    inp.click();
  });
  const save = (name, bytes) => {
    if (window.AndroidBridge && window.AndroidBridge.saveBinary) {
      let s = ''; for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
      window.AndroidBridge.saveBinary(name, btoa(s));
    } else { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([bytes])); a.download = name; a.click(); }
  };
  $id('mcAddon2J').onclick = async () => {
    try { const b = await pick('.mcaddon,.mcpack,.zip'); log('开始：附加包 → Java 模组工程'); const out = bedrockAddonToJavaMod(b, log); save('转换-Java模组工程.zip', out); log('完成'); }
    catch (e) { log('失败：' + e.message); }
  };
  $id('mcJ2Addon').onclick = async () => {
    try { const b = await pick('.jar,.zip'); log('开始：Java 模组 → 基岩附加包'); const out = javaModToBedrockAddon(b, log); save('转换-基岩附加包.mcaddon', out); log('完成'); }
    catch (e) { log('失败：' + e.message); }
  };
}
