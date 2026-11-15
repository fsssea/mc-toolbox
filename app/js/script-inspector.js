/* MC工具箱 6.0.0 独立模块 2：脚本体检器 */
(function () {
  'use strict';
  if (window.__mcScriptInspectorLoaded) return;
  window.__mcScriptInspectorLoaded = true;

  var KNOWN_EVENTS = {
    playerSpawn: 1, playerLeave: 1, playerJoin: 1, playerBreakBlock: 1, playerPlaceBlock: 1,
    blockBreak: 1, blockPlace: 1, blockExplode: 1, itemUse: 1, itemUseOn: 1, itemStartUse: 1,
    itemStopUse: 1, itemReleaseUse: 1, entityHurt: 1, entityDie: 1, entitySpawn: 1, entityRemove: 1,
    entityExplode: 1, entityHitBlock: 1, entityHitEntity: 1, projectileHit: 1, scriptEventReceive: 1,
    worldInitialize: 1, playerGameModeChange: 1, playerInteractWithBlock: 1, playerInteractWithEntity: 1,
    playerDimensionChange: 1, pressurePlatePush: 1, pressurePlatePop: 1, tripWireTrip: 1,
    buttonPush: 1, leverAction: 1, pistonActivate: 1, dataDrivenEntityTrigger: 1, effectAdd: 1,
    explosion: 1, weatherChange: 1, startup: 1, watchdogTerminate: 1, beforeWatchdogTerminate: 1
  };
  var KNOWN_METHOD = {
    world: { sendMessage: 1, getPlayers: 1, getAllPlayers: 1, getDimension: 1, getDynamicProperty: 1, setDynamicProperty: 1, getTimeOfDay: 1, setTimeOfDay: 1, afterEvents: 1, beforeEvents: 1 },
    system: { run: 1, runInterval: 1, runTimeout: 1, clearRun: 1, currentTick: 1, afterEvents: 1, beforeEvents: 1, isEditorWorld: 1 },
    player: { name: 1, location: 1, dimension: 1, id: 1, sendMessage: 1, onScreenDisplay: 1, teleport: 1, getGameMode: 1, setGameMode: 1, getComponent: 1, getDynamicProperty: 1, setDynamicProperty: 1, addTag: 1, removeTag: 1, hasTag: 1, getTags: 1, getHeadLocation: 1, getRotation: 1, getVelocity: 1, applyDamage: 1, applyKnockback: 1, addEffect: 1, removeEffect: 1, getEffects: 1, isSneaking: 1, isFalling: 1, isFlying: 1, isOnGround: 1, isSwimming: 1 },
    dimension: { getBlock: 1, getBlockFromRay: 1, getEntities: 1, getEntitiesAtBlockLocation: 1, getPlayers: 1, spawnEntity: 1, spawnItem: 1, spawnParticle: 1, runCommand: 1, createExplosion: 1, fillBlocks: 1, setBlockType: 1, getTopmostBlock: 1 },
    block: { typeId: 1, location: 1, dimension: 1, permutation: 1, x: 1, y: 1, z: 1, setType: 1, setPermutation: 1, getComponent: 1, isAir: 1, isLiquid: 1, isValid: 1, above: 1, below: 1, north: 1, south: 1, east: 1, west: 1, offset: 1 },
    entity: { id: 1, typeId: 1, location: 1, dimension: 1, nameTag: 1, teleport: 1, kill: 1, getComponent: 1, getComponents: 1, addTag: 1, removeTag: 1, hasTag: 1, getTags: 1, getHeadLocation: 1, getRotation: 1, getVelocity: 1, applyDamage: 1, applyKnockback: 1, addEffect: 1, removeEffect: 1, getEffects: 1, isValid: 1, remove: 1 },
    itemStack: { typeId: 1, amount: 1, clone: 1, getComponent: 1, getComponents: 1, setName: 1, nameTag: 1, setLore: 1, getLore: 1 },
    container: { addItem: 1, getItem: 1, setItem: 1, size: 1, emptySlotsCount: 1, clear: 1, swapItems: 1, moveItem: 1 },
    blockPermutation: { resolve: 1, type: 1, getAllStates: 1, getState: 1, matches: 1 }
  };
  var KNOWN_COMPONENTS = ['inventory', 'health', 'movement', 'movement.basic', 'movement.fly', 'movement.generic', 'movement.hover', 'movement.jump', 'movement.walk', 'movement.swim', 'item', 'rideable', 'ride', 'leashable', 'healable', 'breathable', 'nameable', 'physics', 'pushable', 'damage_sensor', 'equippable', 'food', 'hand', 'minecraft:inventory', 'minecraft:health', 'minecraft:movement', 'minecraft:item', 'minecraft:equippable', 'minecraft:food'];

  var host = document.createElement('div');
  host.id = 'mcInspectorHost';
  var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
  document.body.appendChild(host);

  root.innerHTML = `
  <style>
    :host{all:initial}
    *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Microsoft YaHei",sans-serif}
    .fab{position:fixed;right:14px;bottom:calc(146px + env(safe-area-inset-bottom,0px));z-index:9999;display:flex;align-items:center;gap:6px;padding:10px 14px;border-radius:999px;border:1px solid var(--line,#2c3340);background:var(--panel,#151a22);color:var(--fg,#e8edf5);font-size:13px;box-shadow:0 6px 20px rgba(0,0,0,.28);cursor:pointer}
    .fab .dot{width:8px;height:8px;border-radius:50%;background:#43c58a}
    .mask{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.45);display:none;align-items:center;justify-content:center;padding:16px}
    .mask.on{display:flex}
    .panel{width:min(880px,100%);height:min(88dvh,900px);display:flex;flex-direction:column;background:var(--panel,#151a22);color:var(--fg,#e8edf5);border:1px solid var(--line,#2c3340);border-radius:16px;overflow:hidden;box-shadow:0 18px 60px rgba(0,0,0,.4)}
    .head{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--line,#2c3340)}
    .head h2{font-size:17px;margin:0}
    .head .sp{flex:1}
    .x{width:32px;height:32px;border-radius:9px;border:1px solid var(--line,#2c3340);background:transparent;color:var(--fg,#e8edf5);font-size:18px;cursor:pointer}
    .bar{display:flex;gap:8px;padding:10px 16px;flex-wrap:wrap;align-items:center}
    .bar .src{font-size:12px;color:var(--sub,#96a0b0);flex:1;min-width:120px}
    .btn{padding:8px 12px;border-radius:9px;border:1px solid var(--line,#2c3340);background:transparent;color:var(--fg,#e8edf5);font-size:13px;cursor:pointer}
    .btn.pri{background:#2f7df6;border-color:#2f7df6;color:#fff}
    .btn.g{background:rgba(67,197,138,.14);border-color:#43c58a;color:#7ee0b0}
    .body{flex:1;overflow:auto;padding:0 16px 14px}
    textarea{width:100%;height:120px;resize:vertical;border:1px solid var(--line,#2c3340);border-radius:10px;background:var(--input,#10141c);color:var(--fg,#e8edf5);padding:10px;font:12.5px/1.5 ui-monospace,Menlo,Consolas,monospace;outline:none}
    .score{display:flex;gap:10px;align-items:center;margin:8px 0 12px;flex-wrap:wrap}
    .num{font:700 30px/1 ui-monospace,Menlo,Consolas,monospace}
    .num.good{color:#43c58a}.num.mid{color:#ffcf7a}.num.bad{color:#ff8a8a}
    .chips{display:flex;gap:6px;flex-wrap:wrap}
    .chip{font-size:11px;padding:3px 8px;border-radius:999px;border:1px solid var(--line,#2c3340);color:var(--sub,#96a0b0)}
    .sec{font-size:12px;letter-spacing:.08em;color:var(--sub,#96a0b0);margin:14px 0 6px;text-transform:uppercase}
    .item{display:flex;gap:8px;padding:9px 10px;border-radius:9px;border:1px solid var(--line,#2c3340);margin:6px 0;font-size:12.5px;line-height:1.5;cursor:pointer}
    .item:hover{background:var(--hover,#1b2330)}
    .lv{flex:0 0 auto;font-size:10px;padding:2px 6px;border-radius:5px;height:18px;line-height:14px;margin-top:1px}
    .lv.err{background:rgba(255,106,106,.18);color:#ff9a9a}
    .lv.warn{background:rgba(255,207,122,.16);color:#ffcf7a}
    .lv.note{background:rgba(76,155,255,.16);color:#8fc0ff}
    .lv.ok{background:rgba(67,197,138,.16);color:#7ee0b0}
    .loc{flex:0 0 auto;color:var(--sub,#96a0b0);font:11px/1.6 ui-monospace,Menlo,Consolas,monospace}
    .msg{flex:1;word-break:break-word}
    .toast{position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#2f7df6;color:#fff;padding:8px 14px;border-radius:9px;font-size:13px;opacity:0;transition:.2s;pointer-events:none;z-index:10001}
    .toast.on{opacity:1}
    @media (max-width:600px){.panel{height:92dvh}.head h2{font-size:15px}.fab{font-size:12px;padding:9px 12px}}
  </style>
  <button class="fab" id="fab"><span class="dot"></span>脚本体检</button>
  <div class="mask" id="mask">
    <div class="panel">
      <div class="head"><h2>脚本体检器</h2><span class="sp"></span><button class="x" id="close">×</button></div>
      <div class="bar"><span class="src" id="src">等待读取脚本</span><button class="btn" id="read">读取当前编辑器</button><button class="btn pri" id="check">开始检查</button><button class="btn" id="copy">复制报告</button></div>
      <div class="body">
        <textarea id="code" placeholder="也可以直接粘贴脚本到 here，再点开始检查"></textarea>
        <div class="score"><span class="num" id="score">--</span><div class="chips" id="chips"></div></div>
        <div id="report"></div>
      </div>
    </div>
  </div>
  <div class="toast" id="toast"></div>`;

  var $ = function (id) { return root.getElementById(id); };
  var mask = $('mask');
  var current = { text: '', source: '' };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function findEditor() {
    var list = document.querySelectorAll('textarea.code');
    for (var i = list.length - 1; i >= 0; i--) {
      var ta = list[i];
      if (ta.offsetParent !== null && ta.value) return ta;
    }
    return null;
  }

  function readEditor() {
    var ta = findEditor();
    if (!ta) { toast('没有找到已打开的脚本编辑器'); return; }
    current.text = ta.value;
    current.ta = ta;
    current.source = '编辑器内脚本';
    $('code').value = ta.value;
    $('src').textContent = '已读取编辑器：' + ta.value.length + ' 字符';
    toast('已读取当前编辑器');
  }

  function stripImports(src) {
    return String(src)
      .replace(/^\s*import\s*\{[^}]*\}\s*from\s*['"]@minecraft\/server(?:-ui)?['"]\s*;?/gm, '')
      .replace(/^\s*import\s*\*\s*as\s*[A-Za-z_$][\w$]*\s*from\s*['"]@minecraft\/server(?:-ui)?['"]\s*;?/gm, '');
  }

  function lineAt(text, idx) {
    return text.slice(0, idx).split('\n').length;
  }

  function check() {
    var text = $('code').value || '';
    if (!text.trim()) { toast('脚本为空'); return; }
    current.text = text;
    $('src').textContent = '当前分析：' + text.length + ' 字符';
    var issues = [];
    var lines = text.split('\n');
    var push = function (lv, msg, idx) {
      issues.push({ lv: lv, msg: msg, line: idx == null ? 0 : lineAt(text, idx) });
    };

    // 1. 语法
    try {
      new Function(stripImports(text) + '\n//# sourceURL=inspect.js');
    } catch (e) {
      var m = String(e.message || e);
      var lm = m.match(/line\s+(\d+)/i);
      push('err', '语法错误：' + m, null);
      if (lm) issues[issues.length - 1].line = Number(lm[1]);
    }

    // 2. import
    var impServer = /@minecraft\/server['"]/.test(text);
    var impUi = /@minecraft\/server-ui['"]/.test(text);
    if (/new\s+(ActionFormData|ModalFormData|MessageFormData)/.test(text) && !impUi) {
      push('warn', '使用了表单类，但没有从 @minecraft/server-ui 导入', text.search(/new\s+(ActionFormData|ModalFormData|MessageFormData)/));
    }
    if (/\bworld\.|\bsystem\./.test(text) && !impServer) {
      push('warn', '使用了 world/system，但没有从 @minecraft/server 导入', text.search(/\bworld\.|\bsystem\./));
    }
    if ((impServer || impUi) && !/manifest\.json/.test(text)) {
      // 仅在文本里出现依赖声明时才提示
      if (/dependencies/.test(text)) push('note', 'manifest 依赖需写在 manifest.json，脚本文件里不会生效', text.search(/dependencies/));
    }

    // 3. 事件名
    var evRe = /(?:afterEvents|beforeEvents)\.([A-Za-z_$][\w$]*)/g;
    var seen = {};
    var m;
    while ((m = evRe.exec(text))) {
      var name = m[1];
      if (!KNOWN_EVENTS[name]) {
        push('warn', '未知事件名 “' + name + '”，检查是否拼错或版本不支持', m.index);
      }
      if (seen[name]) push('note', '重复订阅事件 “' + name + '”，确认是否有意', m.index);
      seen[name] = 1;
    }

    // 4. 方法名
    var callRe = /\b(world|system|player|dimension|block|entity|itemStack|container|blockPermutation)\.([A-Za-z_$][\w$]*)/g;
    while ((m = callRe.exec(text))) {
      var obj = m[1], fn = m[2];
      var map = KNOWN_METHOD[obj];
      if (map && !map[fn] && fn !== 'constructor') {
        push('note', '“' + obj + '.' + fn + '”不在常见 API 列表里，若是自定义字段可忽略', m.index);
      }
    }

    // 5. getComponent
    var compRe = /getComponent\s*\(\s*['"]([^'"]+)['"]/g;
    while ((m = compRe.exec(text))) {
      if (KNOWN_COMPONENTS.indexOf(m[1]) < 0) push('warn', '未知组件名 “' + m[1] + '”，可能取不到组件', m.index);
    }

    // 6. 死循环
    var loopRe = /while\s*\(\s*true\s*\)|for\s*\(\s*;\s*;\s*\)/g;
    while ((m = loopRe.exec(text))) {
      var rest = text.slice(m.index, m.index + 600);
      if (!/\bbreak\b|\breturn\b/.test(rest)) push('err', '检测到没有 break/return 的死循环，可能卡死游戏或模拟器', m.index);
    }

    // 7. 长行 / 制表符 / CRLF
    lines.forEach(function (ln, i) {
      if (ln.length > 200) push('note', '第 ' + (i + 1) + ' 行过长（' + ln.length + ' 字符），建议换行', null);
    });
    if (text.indexOf('\t') >= 0) push('note', '使用了 Tab 缩进，混用空格会导致对齐混乱', text.indexOf('\t'));
    if (text.indexOf('\r\n') >= 0) push('note', '文件是 CRLF 换行，跨平台编辑时可能被改写', text.indexOf('\r\n'));

    // 8. 常见风险
    if (/setInterval\s*\(/.test(text)) push('warn', '浏览器式 setInterval 在基岩脚本里不存在，请用 system.runInterval', text.search(/setInterval\s*\(/));
    if (/setTimeout\s*\(/.test(text)) push('warn', '浏览器式 setTimeout 在基岩脚本里不存在，请用 system.runTimeout', text.search(/setTimeout\s*\(/));
    if (/document\.|window\./.test(text)) push('err', '脚本里使用了浏览器 DOM，基岩运行环境没有 document/window', text.search(/document\.|window\./));
    if (/require\s*\(/.test(text)) push('warn', '不支持 CommonJS require，请使用 import', text.search(/require\s*\(/));
    if (/\.then\s*\(/.test(text) && /\.show\s*\(/.test(text)) push('note', '表单优先用 await，注意所在函数必须是 async', text.search(/\.then\s*\(/));

    // 9. 结构统计
    var stats = {
      lines: lines.length,
      funcs: (text.match(/function\s+[A-Za-z_$]|=>/g) || []).length,
      events: Object.keys(seen).length,
      imports: (text.match(/^\s*import\s/gm) || []).length
    };
    var errs = issues.filter(function (x) { return x.lv === 'err'; }).length;
    var warns = issues.filter(function (x) { return x.lv === 'warn'; }).length;
    var notes = issues.filter(function (x) { return x.lv === 'note'; }).length;
    var score = Math.max(0, 100 - errs * 22 - warns * 7 - notes * 2);
    var num = $('score');
    num.textContent = String(score);
    num.className = 'num ' + (score >= 85 ? 'good' : score >= 60 ? 'mid' : 'bad');

    $('chips').innerHTML = [
      '行 ' + stats.lines, '函数 ' + stats.funcs, '事件 ' + stats.events, '导入 ' + stats.imports,
      '错误 ' + errs, '警告 ' + warns, '提示 ' + notes
    ].map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('');

    if (!issues.length) {
      $('report').innerHTML = '<div class="sec">检查结果</div><div class="item"><span class="lv ok">通过</span><span class="msg">没有发现明显问题。建议再到“脚本模拟器”跑一次事件流程。</span></div>';
      return;
    }
    issues.sort(function (a, b) { return (a.line || 0) - (b.line || 0); });
    $('report').innerHTML = '<div class="sec">检查结果（' + issues.length + ' 项，点条目可跳转）</div>' + issues.map(function (x, i) {
      return '<div class="item" data-i="' + i + '"><span class="lv ' + x.lv + '">' + ({ err: '错误', warn: '警告', note: '提示', ok: '通过' }[x.lv]) + '</span><span class="loc">' + (x.line ? '第 ' + x.line + ' 行' : '全局') + '</span><span class="msg">' + esc(x.msg) + '</span></div>';
    }).join('');
    [].forEach.call($('report').querySelectorAll('.item[data-i]'), function (el) {
      el.onclick = function () { jump(issues[Number(el.dataset.i)].line); };
    });
  }

  function jump(line) {
    if (!line) return;
    var ta = findEditor();
    if (!ta) { toast('请先从编辑器读取脚本才能跳转'); return; }
    var arr = ta.value.split('\n');
    var pos = 0;
    for (var i = 0; i < Math.min(line - 1, arr.length); i++) pos += arr[i].length + 1;
    ta.focus();
    ta.selectionStart = ta.selectionEnd = pos;
    var lh = parseFloat(getComputedStyle(ta).lineHeight) || 19;
    ta.scrollTop = Math.max(0, (line - 3) * lh);
    ta.dispatchEvent(new Event('keyup', { bubbles: true }));
    mask.classList.remove('on');
    toast('已跳到第 ' + line + ' 行');
  }

  function toast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.classList.add('on');
    setTimeout(function () { t.classList.remove('on'); }, 1400);
  }

  $('fab').onclick = function () {
    mask.classList.add('on');
    if (!current.text) readEditor();
  };
  $('close').onclick = function () { mask.classList.remove('on'); };
  mask.onclick = function (e) { if (e.target === mask) mask.classList.remove('on'); };
  $('read').onclick = readEditor;
  $('check').onclick = check;
  $('copy').onclick = function () {
    var txt = $('src').textContent + '\n' + $('score').textContent + ' 分\n' + [].map.call($('report').querySelectorAll('.item'), function (x) { return x.textContent; }).join('\n');
    var ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('报告已复制'); } catch (e) { toast('复制失败'); }
    ta.remove();
  };
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mask.classList.contains('on')) { mask.classList.remove('on'); e.preventDefault(); }
  });
})();
