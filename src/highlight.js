// 轻量语法高亮：JSON / JavaScript / TypeScript / Python / Lua / mcfunction / XML / CSS / lang
function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function langOf(path) {
  const m = String(path).toLowerCase().match(/\.([a-z0-9]+)$/);
  const e = m ? m[1] : '';
  if (e === 'json' || e === 'mcmeta') return 'json';
  if (e === 'js' || e === 'mjs' || e === 'ts' || e === 'cjs') return 'js';
  if (e === 'py') return 'py';
  if (e === 'lua') return 'lua';
  if (e === 'mcfunction') return 'mcfunction';
  if (e === 'xml' || e === 'html' || e === 'svg') return 'xml';
  if (e === 'css') return 'css';
  if (e === 'lang' || e === 'properties' || e === 'ini') return 'ini';
  return 'plain';
}

const STR = String.raw;
const SPECS = {
  json: [
    [/\/\/[^\n]*|\/\*[\s\S]*?\*\//y, 'com'],
    [/"(\\.|[^"\\])*"(?=\s*:)/y, 'key'],
    [/"(\\.|[^"\\])*"/y, 'str'],
    [/\b(true|false|null)\b/y, 'kw'],
    [/-?\d+(\.\d+)?(e[+-]?\d+)?/iy, 'num'],
  ],
  js: [
    [/\/\/[^\n]*|\/\*[\s\S]*?\*\//y, 'com'],
    [/`(\\.|[^`\\])*`|"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/y, 'str'],
    [/\b(import|from|export|const|let|var|function|return|if|else|for|while|class|new|await|async|typeof|of|in)\b/y, 'kw'],
    [/\b(true|false|null|undefined)\b/y, 'kw'],
    [/-?\d+(\.\d+)?/y, 'num'],
  ],
  py: [
    [/#[^\n]*/y, 'com'],
    [/"""[\s\S]*?"""|'''[\s\S]*?'''|"(\\.|[^"])*"|'(\\.|[^'])*'/y, 'str'],
    [/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|True|False|None|print|lambda|with|as)\b/y, 'kw'],
    [/-?\d+(\.\d+)?/y, 'num'],
  ],
  lua: [
    [/--[^\n]*/y, 'com'],
    [/"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/y, 'str'],
    [/\b(local|function|end|if|then|else|elseif|for|while|return|print|nil|true|false|pairs|ipairs)\b/y, 'kw'],
    [/-?\d+(\.\d+)?/y, 'num'],
  ],
  mcfunction: [
    [/#[^\n]*/y, 'com'],
    [/^[a-z_]+/my, 'kw'],
    [/~?-?\d+(\.\d+)?/y, 'num'],
    [/@[apesr]/y, 'key'],
    [/"[^"\n]*"/y, 'str'],
  ],
  xml: [
    [/<!--[\s\S]*?-->/y, 'com'],
    [/<\/?[A-Za-z0-9:_-]+/y, 'key'],
    [/[A-Za-z0-9:_-]+(?==)/y, 'kw'],
    [/"[^"\n]*"/y, 'str'],
  ],
  css: [
    [/\/\*[\s\S]*?\*\//y, 'com'],
    [/[.#]?[A-Za-z0-9_-]+(?=\s*\{)/y, 'key'],
    [/\b[a-z-]+(?=\s*:)/y, 'kw'],
    [/"[^"\n]*"|'[^'\n]*'/y, 'str'],
    [/-?\d+(\.\d+)?(px|em|rem|%|vh|vw)?/y, 'num'],
  ],
  ini: [
    [/^[#;][^\n]*/my, 'com'],
    [/^[^=\n]+(?==)/my, 'key'],
    [/=[^\n]*/y, 'str'],
  ],
  plain: [],
};

export function highlightCode(code, lang) {
  const specs = SPECS[lang] || [];
  let out = '', i = 0;
  const plain = (n) => { out += escHtml(code.slice(i, i + n)); i += n; };
  while (i < code.length) {
    let hit = false;
    for (const [re, cls] of specs) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m.index === i) {
        out += '<span class="hl-' + cls + '">' + escHtml(m[0]) + '</span>';
        i += m[0].length;
        hit = true;
        break;
      }
    }
    if (!hit) plain(1);
  }
  return out;
}
