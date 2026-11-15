/* MC工具箱 6.0.0 独立模块 1：离线 Script API 文档中心 */
(function () {
  'use strict';
  if (window.__mcApiDocsLoaded) return;
  window.__mcApiDocsLoaded = true;

  var DATA = [
    { m: 'server', c: '系统', n: 'system.run', s: 'system.run(callback)', d: '在当前 tick 结束后执行一次回调。适合延迟一帧修改世界，避免同一 tick 内读写冲突。' },
    { m: 'server', c: '系统', n: 'system.runInterval', s: 'system.runInterval(callback, ticks)', d: '每隔 ticks 个游戏刻执行回调，返回 id，可用 clearRun 取消。' },
    { m: 'server', c: '系统', n: 'system.runTimeout', s: 'system.runTimeout(callback, ticks)', d: '延迟 ticks 个游戏刻后执行一次。' },
    { m: 'server', c: '系统', n: 'system.clearRun', s: 'system.clearRun(id)', d: '取消 runInterval / runTimeout 返回的任务。' },
    { m: 'server', c: '系统', n: 'system.currentTick', s: 'system.currentTick', d: '当前世界 tick 数，只读。用于计时、冷却和存档节奏控制。' },
    { m: 'server', c: '世界', n: 'world.sendMessage', s: 'world.sendMessage(text)', d: '向所有玩家发送聊天消息，支持 § 颜色代码。' },
    { m: 'server', c: '世界', n: 'world.getPlayers', s: 'world.getPlayers(options?)', d: '返回在线玩家数组，可按 name、location、tags 过滤。' },
    { m: 'server', c: '世界', n: 'world.getDimension', s: "world.getDimension('overworld' | 'nether' | 'the_end')", d: '获取维度对象，后续方块、实体、命令都从维度发起。' },
    { m: 'server', c: '世界', n: 'world.getDynamicProperty', s: 'world.getDynamicProperty(id)', d: '读取世界级动态属性，只支持 string / number / boolean。' },
    { m: 'server', c: '世界', n: 'world.setDynamicProperty', s: 'world.setDynamicProperty(id, value)', d: '写入世界级动态属性，常用于跨 tick、跨存档保存状态。' },
    { m: 'server', c: '世界', n: 'world.getTimeOfDay', s: 'world.getTimeOfDay()', d: '读取世界时间（0~23999）。' },
    { m: 'server', c: '世界', n: 'world.setTimeOfDay', s: 'world.setTimeOfDay(time)', d: '设置世界时间，配合 TimeOfDay 枚举使用。' },
    { m: 'server', c: '事件', n: 'world.afterEvents.playerSpawn', s: 'world.afterEvents.playerSpawn.subscribe(e => {})', d: '玩家进入世界后触发，e.player、e.initialSpawn。' },
    { m: 'server', c: '事件', n: 'world.afterEvents.playerLeave', s: 'world.afterEvents.playerLeave.subscribe(e => {})', d: '玩家离开世界时触发，e.playerName。' },
    { m: 'server', c: '事件', n: 'world.afterEvents.blockBreak', s: 'world.afterEvents.blockBreak.subscribe(e => {})', d: '方块被破坏后触发，e.player、e.block、e.brokenBlockPermutation。' },
    { m: 'server', c: '事件', n: 'world.afterEvents.blockPlace', s: 'world.afterEvents.blockPlace.subscribe(e => {})', d: '方块放置后触发，e.player、e.block、e.itemStack。' },
    { m: 'server', c: '事件', n: 'world.afterEvents.itemUse', s: 'world.afterEvents.itemUse.subscribe(e => {})', d: '玩家使用物品时触发，e.source、e.itemStack。' },
    { m: 'server', c: '事件', n: 'world.afterEvents.itemUseOn', s: 'world.afterEvents.itemUseOn.subscribe(e => {})', d: '物品对特定方块使用时触发，含 e.block、e.face。' },
    { m: 'server', c: '事件', n: 'world.afterEvents.entityHurt', s: 'world.afterEvents.entityHurt.subscribe(e => {})', d: '实体受伤时触发，e.hurtEntity、e.damage、e.damageSource。' },
    { m: 'server', c: '事件', n: 'world.afterEvents.entityDie', s: 'world.afterEvents.entityDie.subscribe(e => {})', d: '实体死亡时触发，e.deadEntity、e.damageSource。' },
    { m: 'server', c: '事件', n: 'world.afterEvents.entitySpawn', s: 'world.afterEvents.entitySpawn.subscribe(e => {})', d: '实体生成时触发，e.entity、e.cause。' },
    { m: 'server', c: '事件', n: 'world.afterEvents.scriptEventReceive', s: 'world.afterEvents.scriptEventReceive.subscribe(e => {})', d: '接收 /scriptevent 指令，e.id、e.message、e.sourceEntity。' },
    { m: 'server', c: '事件', n: 'world.afterEvents.worldInitialize', s: 'world.afterEvents.worldInitialize.subscribe(e => {})', d: '世界初始化完成时触发，适合一次性注册数据。' },
    { m: 'server', c: '事件', n: 'world.beforeEvents.playerBreakBlock', s: 'world.beforeEvents.playerBreakBlock.subscribe(e => { e.cancel = true; })', d: '破坏方块前触发，可设置 e.cancel 取消本次破坏。' },
    { m: 'server', c: '事件', n: 'world.beforeEvents.playerPlaceBlock', s: 'world.beforeEvents.playerPlaceBlock.subscribe(e => {})', d: '放置方块前触发，可取消。' },
    { m: 'server', c: '事件', n: 'world.beforeEvents.itemUse', s: 'world.beforeEvents.itemUse.subscribe(e => {})', d: '物品使用前触发，可取消。' },
    { m: 'server', c: '玩家', n: 'player.name', s: 'player.name', d: '玩家名称，只读。' },
    { m: 'server', c: '玩家', n: 'player.location', s: 'player.location', d: '玩家坐标 {x, y, z}，只读，修改请用 teleport。' },
    { m: 'server', c: '玩家', n: 'player.dimension', s: 'player.dimension', d: '玩家所在维度对象。' },
    { m: 'server', c: '玩家', n: 'player.sendMessage', s: 'player.sendMessage(text)', d: '只给该玩家发送聊天消息。' },
    { m: 'server', c: '玩家', n: 'player.onScreenDisplay', s: "player.onScreenDisplay.setTitle('标题', { subtitle, fadeInDuration, stayDuration, fadeOutDuration })", d: '屏幕标题、副标题与 actionbar。' },
    { m: 'server', c: '玩家', n: 'player.teleport', s: 'player.teleport(location, options?)', d: '传送玩家，options 可指定 dimension、rotation、keepVelocity。' },
    { m: 'server', c: '玩家', n: 'player.getGameMode', s: 'player.getGameMode()', d: '返回 survival / creative / adventure / spectator。' },
    { m: 'server', c: '玩家', n: 'player.setGameMode', s: 'player.setGameMode(GameMode.creative)', d: '切换游戏模式。' },
    { m: 'server', c: '玩家', n: 'player.getComponent', s: "player.getComponent('inventory')", d: '获取背包等组件，组件名可用 EntityComponentTypes。' },
    { m: 'server', c: '玩家', n: 'player.getDynamicProperty', s: 'player.getDynamicProperty(id)', d: '读取玩家级动态属性，适合个人进度。' },
    { m: 'server', c: '玩家', n: 'player.setDynamicProperty', s: 'player.setDynamicProperty(id, value)', d: '写入玩家级动态属性。' },
    { m: 'server', c: '玩家', n: 'player.addTag', s: 'player.addTag(tag)', d: '给玩家添加标签，可被选择器和脚本过滤。' },
    { m: 'server', c: '玩家', n: 'player.removeTag', s: 'player.removeTag(tag)', d: '移除玩家标签。' },
    { m: 'server', c: '玩家', n: 'player.hasTag', s: 'player.hasTag(tag)', d: '判断玩家是否拥有标签。' },
    { m: 'server', c: '方块', n: 'dimension.getBlock', s: 'dimension.getBlock({x, y, z})', d: '获取方块对象，未加载区块返回 undefined。' },
    { m: 'server', c: '方块', n: 'block.typeId', s: 'block.typeId', d: '方块标识符，例如 minecraft:stone。' },
    { m: 'server', c: '方块', n: 'block.permutation', s: 'block.permutation', d: '方块状态组合，含 type 与 getAllStates()。' },
    { m: 'server', c: '方块', n: 'block.setType', s: "block.setType('minecraft:stone')", d: '设置方块类型，可传 BlockType 或字符串。' },
    { m: 'server', c: '方块', n: 'block.setPermutation', s: 'block.setPermutation(BlockPermutation.resolve(...))', d: '设置带状态的方块。' },
    { m: 'server', c: '方块', n: 'BlockPermutation.resolve', s: "BlockPermutation.resolve('minecraft:oak_stairs', { direction: 'north' })", d: '构造带状态的方块组合。' },
    { m: 'server', c: '实体', n: 'dimension.spawnEntity', s: "dimension.spawnEntity('minecraft:zombie', {x, y, z})", d: '生成实体并返回 Entity 对象，失败返回 undefined。' },
    { m: 'server', c: '实体', n: 'dimension.getEntities', s: 'dimension.getEntities(options?)', d: '获取维度内实体，可按 type、location、tags 过滤。' },
    { m: 'server', c: '实体', n: 'dimension.spawnItem', s: 'dimension.spawnItem(itemStack, location)', d: '生成掉落物实体。' },
    { m: 'server', c: '实体', n: 'entity.id', s: 'entity.id', d: '实体唯一 id，只在当前会话有效。' },
    { m: 'server', c: '实体', n: 'entity.typeId', s: 'entity.typeId', d: '实体标识符，例如 minecraft:zombie。' },
    { m: 'server', c: '实体', n: 'entity.teleport', s: 'entity.teleport(location)', d: '传送实体。' },
    { m: 'server', c: '实体', n: 'entity.kill', s: 'entity.kill()', d: '移除实体。' },
    { m: 'server', c: '实体', n: 'entity.getComponent', s: "entity.getComponent('health')", d: '读取生命、移动、物品等组件。' },
    { m: 'server', c: '实体', n: 'entity.nameTag', s: 'entity.nameTag', d: '实体头顶名称，可读写。' },
    { m: 'server', c: '实体', n: 'entity.addTag', s: 'entity.addTag(tag)', d: '给实体添加标签。' },
    { m: 'server', c: '物品', n: 'ItemStack', s: "new ItemStack('minecraft:diamond', 4)", d: '创建物品堆，typeId + amount。' },
    { m: 'server', c: '物品', n: 'itemStack.typeId', s: 'itemStack.typeId', d: '物品标识符。' },
    { m: 'server', c: '物品', n: 'itemStack.amount', s: 'itemStack.amount', d: '物品数量。' },
    { m: 'server', c: '物品', n: 'inventory.container', s: "player.getComponent('inventory').container", d: '背包容器，可 addItem、getItem、setItem。' },
    { m: 'server', c: '物品', n: 'container.addItem', s: 'container.addItem(itemStack)', d: '向容器加入物品，返回剩余物品或 undefined。' },
    { m: 'server', c: '物品', n: 'container.getItem', s: 'container.getItem(slot)', d: '读取指定槽位物品。' },
    { m: 'server', c: '物品', n: 'container.setItem', s: 'container.setItem(slot, itemStack)', d: '写入指定槽位。' },
    { m: 'server', c: '命令', n: 'dimension.runCommand', s: 'dimension.runCommand(command)', d: '执行游戏命令，返回 successCount。脚本内不要高频调用，优先原生 API。' },
    { m: 'server', c: '枚举', n: 'GameMode', s: 'GameMode.Survival | Creative | Adventure | Spectator', d: '游戏模式枚举。' },
    { m: 'server', c: '枚举', n: 'EquipmentSlot', s: 'EquipmentSlot.Mainhand | Offhand | Head | Chest | Legs | Feet', d: '装备槽枚举。' },
    { m: 'server', c: '枚举', n: 'TimeOfDay', s: 'TimeOfDay.Day | Noon | Sunset | Night | Midnight', d: '时间枚举。' },
    { m: 'server', c: '枚举', n: 'Direction', s: 'Direction.Up | Down | North | South | East | West', d: '方向枚举。' },
    { m: 'server-ui', c: 'UI', n: 'ActionFormData', s: "new ActionFormData().title('标题').body('内容').button('按钮').show(player)", d: '按钮菜单表单，show 返回 Promise，结果含 canceled、selection。' },
    { m: 'server-ui', c: 'UI', n: 'MessageFormData', s: "new MessageFormData().title('标题').body('内容').button1('是').button2('否').show(player)", d: '两按钮确认表单，selection 为 0 或 1。' },
    { m: 'server-ui', c: 'UI', n: 'ModalFormData', s: "new ModalFormData().title('设置').textField('名字','占位','默认').show(player)", d: '复杂表单，可组合 textField、dropdown、toggle、slider、submitButton。' },
    { m: 'server-ui', c: 'UI', n: 'FormCancelationReason', s: 'FormCancelationReason.UserClosed | UserBusy', d: '表单取消原因，用于区分玩家关闭与重复打开。' },
    { m: 'server-ui', c: 'UI', n: 'form.show', s: 'form.show(player)', d: '显示表单并返回 Promise；玩家无法查看时 canceled 为 true。' }
  ];

  var CATS = ['全部', '系统', '世界', '玩家', '方块', '实体', '物品', '事件', '命令', '枚举', 'UI'];

  var host = document.createElement('div');
  host.id = 'mcApiDocsHost';
  var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
  document.body.appendChild(host);

  root.innerHTML = `
  <style>
    :host{all:initial}
    *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Microsoft YaHei",sans-serif}
    .fab{position:fixed;right:14px;bottom:calc(86px + env(safe-area-inset-bottom,0px));z-index:9999;display:flex;align-items:center;gap:6px;padding:10px 14px;border-radius:999px;border:1px solid var(--line,#2c3340);background:var(--panel,#151a22);color:var(--fg,#e8edf5);font-size:13px;box-shadow:0 6px 20px rgba(0,0,0,.28);cursor:pointer}
    .fab:active{transform:scale(.97)}
    .fab .dot{width:8px;height:8px;border-radius:50%;background:#4c9bff}
    .mask{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.45);display:none;align-items:center;justify-content:center;padding:16px}
    .mask.on{display:flex}
    .panel{position:relative;width:min(980px,100%);height:min(86dvh,900px);display:flex;flex-direction:column;min-height:0;background:var(--panel,#151a22);color:var(--fg,#e8edf5);border:1px solid var(--line,#2c3340);border-radius:16px;overflow:hidden;box-shadow:0 18px 60px rgba(0,0,0,.4)}
    .head{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--line,#2c3340)}
    .head h2{font-size:17px;margin:0;flex:0 0 auto}
    .head .count{font-size:12px;color:var(--sub,#96a0b0);white-space:nowrap}
    .head .sp{flex:1}
    .x{width:32px;height:32px;border-radius:9px;border:1px solid var(--line,#2c3340);background:transparent;color:var(--fg,#e8edf5);font-size:18px;cursor:pointer}
    .search{margin:10px 16px 0;display:flex;gap:8px}
    .search input{flex:1;padding:10px 12px;border-radius:10px;border:1px solid var(--line,#2c3340);background:var(--input,#10141c);color:var(--fg,#e8edf5);font-size:14px;outline:none}
    .cats{display:flex;gap:6px;padding:10px 16px;overflow:auto;scrollbar-width:none;flex-wrap:wrap}
    .cat{flex:0 0 auto;padding:5px 11px;border-radius:999px;border:1px solid var(--line,#2c3340);background:transparent;color:var(--sub,#96a0b0);font-size:12px;cursor:pointer}
    .cat.on{background:rgba(76,155,255,.16);border-color:#4c9bff;color:#8fc0ff}
    .list{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;padding:0 10px calc(18px + env(safe-area-inset-bottom,0px));-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-y}
    .row{padding:10px 12px;border-radius:10px;cursor:pointer;border:1px solid transparent}
    .row:hover{background:var(--hover,#1b2330);border-color:var(--line,#2c3340)}
    .row .n{font:600 13.5px/1.35 ui-monospace,Menlo,Consolas,monospace;color:var(--fg,#e8edf5);word-break:break-word}
    .row .d{font-size:12px;color:var(--sub,#96a0b0);margin-top:3px;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .row .tag{display:inline-block;font-size:10px;padding:1px 6px;border-radius:5px;margin-right:6px;background:rgba(76,155,255,.14);color:#8fc0ff}
    .empty{padding:30px 16px;text-align:center;color:var(--sub,#96a0b0);font-size:13px}
    .detail{position:absolute;inset:0;background:var(--panel,#151a22);display:none;flex-direction:column;z-index:2}
    .detail.on{display:flex}
    .detail .dh{display:flex;align-items:center;gap:8px;padding:14px 16px;border-bottom:1px solid var(--line,#2c3340)}
    .detail .dh b{font-size:15px;word-break:break-word}
    .detail .db{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;padding:14px 16px calc(18px + env(safe-area-inset-bottom,0px));-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-y}
    .sig{font:12.5px/1.55 ui-monospace,Menlo,Consolas,monospace;background:var(--code,#0d1117);border:1px solid var(--line,#2c3340);border-radius:10px;padding:10px 12px;white-space:pre-wrap;word-break:break-word;color:#9ecbff}
    .desc{margin-top:12px;font-size:13px;line-height:1.7;color:var(--fg,#e8edf5)}
    .meta{margin-top:10px;font-size:12px;color:var(--sub,#96a0b0)}
    .acts{display:flex;gap:8px;padding:12px 16px;border-top:1px solid var(--line,#2c3340)}
    .btn{padding:9px 14px;border-radius:9px;border:1px solid var(--line,#2c3340);background:transparent;color:var(--fg,#e8edf5);font-size:13px;cursor:pointer}
    .btn.pri{background:#2f7df6;border-color:#2f7df6;color:#fff}
    .toast{position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#2f7df6;color:#fff;padding:8px 14px;border-radius:9px;font-size:13px;opacity:0;transition:.2s;pointer-events:none;z-index:10001}
    .toast.on{opacity:1}
    @media (max-width:600px){.panel{height:calc(100dvh - 24px - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px));border-radius:14px}.mask{padding:12px}.head h2{font-size:15px}.fab{padding:9px 12px;font-size:12px}}
  </style>
  <button class="fab" id="fab"><span class="dot"></span>API 文档</button>
  <div class="mask" id="mask">
    <div class="panel">
      <div class="head"><h2>Script API 文档</h2><span class="count" id="count"></span><span class="sp"></span><button class="x" id="close">×</button></div>
      <div class="search"><input id="q" placeholder="搜索 API、事件、方法，例如 getBlock / blockBreak"></div>
      <div class="cats" id="cats"></div>
      <div class="list" id="list"></div>
      <div class="detail" id="detail">
        <div class="dh"><b id="dname"></b><span class="sp" style="flex:1"></span><button class="x" id="dback">×</button></div>
        <div class="db"><div class="sig" id="dsig"></div><div class="desc" id="ddesc"></div><div class="meta" id="dmeta"></div></div>
        <div class="acts"><button class="btn pri" id="dcopy">复制签名</button><button class="btn" id="dclose">关闭</button></div>
      </div>
    </div>
  </div>
  <div class="toast" id="toast"></div>`;

  var $ = function (id) { return root.getElementById(id); };
  var state = { cat: '全部', q: '', cur: null };
  var listEl = $('list'), catsEl = $('cats'), mask = $('mask');

  CATS.forEach(function (c) {
    var b = document.createElement('button');
    b.className = 'cat' + (c === '全部' ? ' on' : '');
    b.textContent = c;
    b.onclick = function () {
      state.cat = c;
      [].forEach.call(catsEl.children, function (x) { x.classList.toggle('on', x.textContent === c); });
      render();
    };
    catsEl.appendChild(b);
  });

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function render() {
    var q = state.q.trim().toLowerCase();
    var arr = DATA.filter(function (x) {
      if (state.cat !== '全部' && x.c !== state.cat) return false;
      if (!q) return true;
      return (x.n + ' ' + x.s + ' ' + x.d + ' ' + x.m).toLowerCase().indexOf(q) >= 0;
    });
    $('count').textContent = arr.length + ' / ' + DATA.length + ' 条';
    if (!arr.length) { listEl.innerHTML = '<div class="empty">没有匹配的 API，换个关键词试试。</div>'; return; }
    listEl.innerHTML = arr.map(function (x, i) {
      return '<div class="row" data-i="' + DATA.indexOf(x) + '"><div class="n"><span class="tag">' + esc(x.c) + '</span>' + esc(x.n) + '</div><div class="d">' + esc(x.d) + '</div></div>';
    }).join('');
    [].forEach.call(listEl.querySelectorAll('.row'), function (row) {
      row.onclick = function () { showDetail(DATA[Number(row.dataset.i)]); };
    });
  }

  function showDetail(x) {
    state.cur = x;
    $('dname').textContent = x.n;
    $('dsig').textContent = x.s;
    $('ddesc').textContent = x.d;
    $('dmeta').textContent = '模块：@minecraft/' + x.m + '　分类：' + x.c;
    $('detail').classList.add('on');
  }

  function toast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.classList.add('on');
    setTimeout(function () { t.classList.remove('on'); }, 1400);
  }

  $('fab').onclick = function () {
    mask.classList.add('on');
    $('q').focus();
    render();
  };
  function close() { mask.classList.remove('on'); $('detail').classList.remove('on'); }
  $('close').onclick = close;
  $('dclose').onclick = close;
  $('dback').onclick = function () { $('detail').classList.remove('on'); };
  $('q').oninput = function () { state.q = this.value; render(); };
  mask.onclick = function (e) { if (e.target === mask) close(); };
  $('dcopy').onclick = function () {
    var txt = state.cur ? state.cur.s : '';
    if (!txt) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { toast('已复制签名'); }, function () { fallbackCopy(txt); });
    } else fallbackCopy(txt);
  };
  function fallbackCopy(txt) {
    var ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); toast('已复制签名'); } catch (e) { toast('复制失败'); }
    ta.remove();
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mask.classList.contains('on')) { close(); e.preventDefault(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      mask.classList.add('on');
      $('q').focus();
      render();
    }
  });
  window.mcOpenApiDocs = function () { mask.classList.add('on'); render(); };
})();
