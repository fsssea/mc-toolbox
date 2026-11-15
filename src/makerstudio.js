// 附加包制作器 2.0 界面
import { PROJECT_DEFAULTS, buildProject, previewTexture, pngDataUrl, validateProject } from './addongen.js';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function openMakerStudio(ctx) {
  const { $ } = ctx;
  const body = $('modalBody');
  body.classList.add('makerbox');
  body.innerHTML = `
    <div class="mkhead">
      <div>
        <h3>附加包制作器 <span class="mkbadge">重置版</span></h3>
        <p class="muted">本地生成 · 不联网 · UUID 和贴图全部现场生成</p>
      </div>
      <button id="mkClose" class="ghost mkclose" aria-label="关闭" title="关闭">✕</button>
    </div>
    <div class="mkbody">
      <section class="mksec">
        <div class="mksec-h"><span class="mkno">01</span><div><h4>基础信息</h4><p class="muted">包名会显示在游戏资源包列表里。</p></div></div>
        <div class="mkgrid">
          <label>包名<input id="mkName" maxlength="48" value="${esc(PROJECT_DEFAULTS.name)}"></label>
          <label>命名空间<input id="mkNs" maxlength="16" value="${esc(PROJECT_DEFAULTS.namespace)}" spellcheck="false"></label>
          <label>作者（可选）<input id="mkAuthor" maxlength="32" value="" placeholder="你的名字"></label>
        </div>
      </section>

      <section class="mksec">
        <div class="mksec-h"><span class="mkno">02</span><div><h4>包内容</h4><p class="muted">勾选什么就生成什么，不再塞固定模板。</p></div></div>
        <div class="mktoggles">
          <label class="mktoggle"><input type="checkbox" id="mkBlockOn" checked><span>方块</span></label>
          <label class="mktoggle"><input type="checkbox" id="mkItemOn" checked><span>物品</span></label>
          <label class="mktoggle"><input type="checkbox" id="mkEntityOn"><span>生物</span></label>
        </div>

        <div id="mkBlockFields" class="mkfields">
          <div class="mkfield-title">方块设置</div>
          <div class="mkgrid">
            <label>方块 ID<input id="mkBlockId" value="${esc(PROJECT_DEFAULTS.block.id)}" spellcheck="false"></label>
            <label>中文名<input id="mkBlockZh" value="${esc(PROJECT_DEFAULTS.block.zh)}"></label>
            <label>英文名<input id="mkBlockEn" value="${esc(PROJECT_DEFAULTS.block.en)}"></label>
            <label>挖掘时间（秒）<input id="mkBlockHardness" type="number" min="0.1" max="30" step="0.1" value="${PROJECT_DEFAULTS.block.hardness}"></label>
            <label>贴图风格<select id="mkPattern">
              <option value="stone">石质噪点</option><option value="wood">木纹</option><option value="metal">金属</option>
              <option value="crystal">水晶</option><option value="wool">羊毛</option><option value="leaves">树叶</option>
            </select></label>
          </div>
        </div>

        <div id="mkItemFields" class="mkfields">
          <div class="mkfield-title">物品设置</div>
          <div class="mkgrid">
            <label>物品 ID<input id="mkItemId" value="${esc(PROJECT_DEFAULTS.item.id)}" spellcheck="false"></label>
            <label>中文名<input id="mkItemZh" value="${esc(PROJECT_DEFAULTS.item.zh)}"></label>
            <label>英文名<input id="mkItemEn" value="${esc(PROJECT_DEFAULTS.item.en)}"></label>
            <label>最大堆叠<input id="mkItemStack" type="number" min="1" max="64" step="1" value="${PROJECT_DEFAULTS.item.maxStack}"></label>
          </div>
        </div>

        <div id="mkEntityFields" class="mkfields off">
          <div class="mkfield-title">生物设置</div>
          <div class="mkgrid">
            <label>生物 ID<input id="mkEntityId" value="${esc(PROJECT_DEFAULTS.entity.id)}" spellcheck="false"></label>
            <label>中文名<input id="mkEntityZh" value="${esc(PROJECT_DEFAULTS.entity.zh)}"></label>
            <label>英文名<input id="mkEntityEn" value="${esc(PROJECT_DEFAULTS.entity.en)}"></label>
            <label>模型<select id="mkEntityBase"><option value="quadruped">四足（猪模型）</option><option value="humanoid">人形（玩家模型）</option></select></label>
            <label>生命值<input id="mkEntityHealth" type="number" min="1" max="200" step="1" value="${PROJECT_DEFAULTS.entity.health}"></label>
          </div>
        </div>
      </section>

      <section class="mksec">
        <div class="mksec-h"><span class="mkno">03</span><div><h4>贴图</h4><p class="muted">方块、物品、生物共用一套主色，生成后仍可在资源包编辑器里替换。</p></div></div>
        <div class="mkart">
          <div class="mkpreview">
            <img id="mkPrev" alt="贴图预览">
            <div class="muted" id="mkPrevInfo"></div>
          </div>
          <div class="mkgrid mkartfields">
            <label>主色<input id="mkC1" type="color" value="${PROJECT_DEFAULTS.texture.c1}"></label>
            <label>副色<input id="mkC2" type="color" value="${PROJECT_DEFAULTS.texture.c2}"></label>
            <label>尺寸<select id="mkSize"><option value="16">16×16</option><option value="32">32×32</option><option value="64">64×64</option></select></label>
          </div>
        </div>
      </section>

      <section class="mksec">
        <div class="mksec-h"><span class="mkno">04</span><div><h4>脚本</h4><p class="muted">只生成游戏能执行的 JavaScript，不再提供 Python / TypeScript 假选项。</p></div></div>
        <div class="mkfields">
          <label class="mktoggle mkcheck"><input type="checkbox" id="mkScriptOn"><span>生成脚本</span></label>
          <div class="mkgrid">
            <label>模板<select id="mkScriptTpl">
              <option value="welcome">进服欢迎</option><option value="scoreboard">计分板加分</option><option value="particle">玩家脚下粒子</option>
            </select></label>
          </div>
        </div>
      </section>

      <section class="mksec mkresult">
        <div class="mksec-h"><span class="mkno">05</span><div><h4>生成检查</h4><p class="muted">错误会直接拦下，不生成坏包。</p></div></div>
        <div id="mkSummary" class="mksum"></div>
        <div id="mkErrors" class="mkerrors"></div>
        <div id="mkWarnings" class="mkwarn"></div>
      </section>
    </div>
    <div class="mkfoot">
      <button id="mkBuild">生成并打开</button>
      <button id="mkReset" class="ghost">恢复默认</button>
    </div>`;
  $('modal').style.display = 'flex';

  const el = (id) => document.getElementById(id);
  const val = (id) => (el(id)?.value || '').trim();
  const checked = (id) => !!el(id)?.checked;

  function readCfg() {
    return {
      name: val('mkName'),
      namespace: val('mkNs').toLowerCase(),
      author: val('mkAuthor'),
      version: [1, 0, 0],
      texture: { size: Number(val('mkSize')) || 16, c1: val('mkC1'), c2: val('mkC2') },
      block: {
        enabled: checked('mkBlockOn'), id: val('mkBlockId'), zh: val('mkBlockZh'), en: val('mkBlockEn'),
        pattern: val('mkPattern'), hardness: Number(val('mkBlockHardness')),
      },
      item: { enabled: checked('mkItemOn'), id: val('mkItemId'), zh: val('mkItemZh'), en: val('mkItemEn'), maxStack: Number(val('mkItemStack')) },
      entity: {
        enabled: checked('mkEntityOn'), id: val('mkEntityId'), zh: val('mkEntityZh'), en: val('mkEntityEn'),
        base: val('mkEntityBase'), health: Number(val('mkEntityHealth')), speed: 0.25,
      },
      script: { enabled: checked('mkScriptOn'), template: val('mkScriptTpl') },
    };
  }

  function update() {
    const cfg = readCfg();
    el('mkBlockFields').classList.toggle('off', !cfg.block.enabled);
    el('mkItemFields').classList.toggle('off', !cfg.item.enabled);
    el('mkEntityFields').classList.toggle('off', !cfg.entity.enabled);
    el('mkEntityFields').classList.toggle('humanoid', cfg.entity.base === 'humanoid');

    const { errors, warnings } = validateProject(cfg);
    let project = null;
    try { project = buildProject(cfg); } catch (e) { errors.push({ field: 'build', message: e.message }); }

    // 贴图预览
    const kind = cfg.entity.enabled ? 'entity' : cfg.block.enabled ? cfg.block.pattern : cfg.item.enabled ? 'item' : cfg.block.pattern;
    try {
      const bytes = previewTexture(kind, cfg.texture.size, cfg.texture.c1, cfg.texture.c2, cfg.entity.base);
      el('mkPrev').src = pngDataUrl(bytes);
    } catch (e) {
      el('mkPrev').removeAttribute('src');
    }
    const names = [
      cfg.block.enabled ? '方块 ' + cfg.block.id : '',
      cfg.item.enabled ? '物品 ' + cfg.item.id : '',
      cfg.entity.enabled ? '生物 ' + cfg.entity.id : '',
      cfg.script.enabled ? '脚本' : '',
    ].filter(Boolean);
    el('mkPrevInfo').textContent = names.length ? names.join(' · ') : '尚未勾选内容';

    // 生成摘要
    if (project) {
      const paths = project.entries.map(e => e.path);
      const show = paths.slice(0, 10);
      el('mkSummary').innerHTML = `<div class="mksum-top"><b>${project.entries.length} 个文件</b><span>行为包 + 资源包</span></div>` +
        `<div class="mkpaths">${show.map(p => `<code>${esc(p)}</code>`).join('')}${paths.length > show.length ? `<code>+ ${paths.length - show.length} 个文件</code>` : ''}</div>`;
    } else {
      el('mkSummary').innerHTML = '<span class="muted">填写内容后显示生成清单。</span>';
    }
    el('mkErrors').innerHTML = errors.length ? `<div class="mkerr-h">需要修正 ${errors.length} 项</div>` + errors.map(e => `<p>${esc(e.message)}</p>`).join('') : '<div class="mkok">检查通过，可以生成</div>';
    el('mkWarnings').innerHTML = warnings.map(w => `<p>提示：${esc(w.message)}</p>`).join('');
    el('mkBuild').disabled = errors.length > 0;
    return { cfg, errors, project };
  }

  const ids = ['mkName', 'mkNs', 'mkAuthor', 'mkBlockOn', 'mkItemOn', 'mkEntityOn', 'mkBlockId', 'mkBlockZh', 'mkBlockEn', 'mkBlockHardness', 'mkPattern', 'mkItemId', 'mkItemZh', 'mkItemEn', 'mkItemStack', 'mkEntityId', 'mkEntityZh', 'mkEntityEn', 'mkEntityBase', 'mkEntityHealth', 'mkC1', 'mkC2', 'mkSize', 'mkScriptOn', 'mkScriptTpl'];
  ids.forEach(id => {
    const node = el(id);
    if (!node) return;
    node.addEventListener('input', update);
    node.addEventListener('change', update);
  });

  function close() {
    $('modal').style.display = 'none';
    body.classList.remove('makerbox');
  }
  el('mkClose').onclick = close;

  el('mkReset').onclick = () => {
    el('mkName').value = PROJECT_DEFAULTS.name;
    el('mkNs').value = PROJECT_DEFAULTS.namespace;
    el('mkAuthor').value = '';
    el('mkBlockOn').checked = PROJECT_DEFAULTS.block.enabled;
    el('mkItemOn').checked = PROJECT_DEFAULTS.item.enabled;
    el('mkEntityOn').checked = PROJECT_DEFAULTS.entity.enabled;
    el('mkBlockId').value = PROJECT_DEFAULTS.block.id;
    el('mkBlockZh').value = PROJECT_DEFAULTS.block.zh;
    el('mkBlockEn').value = PROJECT_DEFAULTS.block.en;
    el('mkBlockHardness').value = PROJECT_DEFAULTS.block.hardness;
    el('mkPattern').value = PROJECT_DEFAULTS.block.pattern;
    el('mkItemId').value = PROJECT_DEFAULTS.item.id;
    el('mkItemZh').value = PROJECT_DEFAULTS.item.zh;
    el('mkItemEn').value = PROJECT_DEFAULTS.item.en;
    el('mkItemStack').value = PROJECT_DEFAULTS.item.maxStack;
    el('mkEntityId').value = PROJECT_DEFAULTS.entity.id;
    el('mkEntityZh').value = PROJECT_DEFAULTS.entity.zh;
    el('mkEntityEn').value = PROJECT_DEFAULTS.entity.en;
    el('mkEntityBase').value = PROJECT_DEFAULTS.entity.base;
    el('mkEntityHealth').value = PROJECT_DEFAULTS.entity.health;
    el('mkC1').value = PROJECT_DEFAULTS.texture.c1;
    el('mkC2').value = PROJECT_DEFAULTS.texture.c2;
    el('mkSize').value = String(PROJECT_DEFAULTS.texture.size);
    el('mkScriptOn').checked = PROJECT_DEFAULTS.script.enabled;
    el('mkScriptTpl').value = PROJECT_DEFAULTS.script.template;
    update();
  };

  el('mkBuild').onclick = () => {
    const result = update();
    if (result.errors.length) return;
    const project = result.project;
    const cfg = result.cfg;
    ctx.state.archive = new ctx.Archive('zip', project.entries);
    const safe = (cfg.name || '我的附加包').replace(/[\\/:*?"<>|\s]+/g, '-').slice(0, 48);
    ctx.state.name = safe + '.mcaddon';
    ctx.state.texIndex = null;
    ctx.state.texCache = new Map();
    ctx.state.texPending = new Set();
    ctx.state.texPacks = [];
    ctx.state.statsDirty = true;
    close();
    ctx.setupArchive('', '');
    ctx.log('生成完成：' + project.entries.length + ' 个文件，命名空间 ' + cfg.namespace);
    ctx.log('· 行为包：' + project.dirB);
    ctx.log('· 资源包：' + project.dirR);
    ctx.log('· UUID：' + project.stats.uuids + ' 个，全部本地生成');
    ctx.log('点右上角“导出 / 另存”保存为 .mcaddon 即可安装');
  };

  update();
}
