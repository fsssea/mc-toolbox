#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从 bugs.json 生成 /feedback/bug-N/index.html 固定页。
用法：python3 tools/gen_bugs.py            # 生成全部
      python3 tools/gen_bugs.py --check    # 只校验数据
新增漏洞：在 bugs.json 里追加一条，id 用 next_id，然后把 next_id +1，再跑本脚本。
"""
import json, os, sys, io

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(BASE, "bugs.json")

STATUS = ["important", "fixing", "fixed"]

TEMPLATE = r"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BUG-{ID} · {TITLE_ZH} · MC工具箱</title>
<meta name="description" content="{TITLE_ZH} — 官方漏洞档案 bug-{ID}，受影响版本 {AFF_ZH}。">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23101820'/%3E%3Cpath d='M8 11l8-4 8 4v10l-8 4-8-4z' fill='none' stroke='%23e9eff6' stroke-width='2'/%3E%3Cpath d='M8 11l8 4 8-4M16 15v10' fill='none' stroke='%231859d8' stroke-width='2'/%3E%3C/svg%3E">
<link rel="stylesheet" href="https://miaoda.feishu.cn/fonts/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<style>
:root{{--paper:#e8edf3;--ink:#101820;--muted:#5b6875;--line:#aeb9c5;--blue:#1859d8;
--panel:#111a24;--panel-fg:#e9f0f7;--important:#c0392b;--fixing:#c07a1c;--fixed:#3f9d6a;--max:1000px;}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--paper);color:var(--ink);font-family:"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.75}}
.mono{{font-family:"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace}}
a{{color:inherit}}
.wrap{{max-width:var(--max);margin:0 auto;padding:0 26px}}
.nav{{position:sticky;top:0;z-index:20;background:rgba(232,237,243,.94);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}}
.nav-in{{max-width:var(--max);margin:0 auto;padding:0 26px;height:62px;display:flex;align-items:center;gap:18px}}
.brand{{display:flex;align-items:center;gap:9px;text-decoration:none;flex:0 0 auto}}
.brand b{{font-weight:900;font-size:16px}}
.brand span{{font-size:11px;color:var(--muted);border-left:1px solid var(--line);padding-left:8px;letter-spacing:.1em}}
.links{{display:flex;gap:16px;margin-left:auto;font-size:14px}}
.links a{{text-decoration:none;color:#2c3742;padding:3px 0;border-bottom:2px solid transparent}}
.links a:hover{{border-color:var(--ink)}}
.links a[aria-current="page"]{{border-color:var(--blue);color:var(--blue)}}
.lang select{{font:inherit;font-size:12px;padding:5px 8px;border:1px solid var(--line);background:#fff;color:var(--ink)}}
@media(max-width:820px){{.links{{display:none}}}}
.hero{{padding:52px 0 30px}}
.crumb{{font-size:12px;color:var(--muted);margin-bottom:18px}}
.crumb a{{text-decoration:none;border-bottom:1px solid var(--line)}}
.kicker{{display:flex;align-items:center;gap:9px;font-size:11px;letter-spacing:.14em;color:var(--muted);margin-bottom:14px}}
.head{{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:start}}
h1{{font-size:clamp(26px,3.6vw,40px);line-height:1.22;letter-spacing:-.02em;margin:0 0 14px;font-weight:900}}
.idline{{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px}}
.bid{{font-size:12px;padding:4px 10px;border:1px solid var(--ink);background:#fff;letter-spacing:.08em;text-decoration:none}}
.range{{font-size:12px;color:#31404c;border-left:3px solid var(--blue);padding-left:10px}}
.badge{{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;padding:8px 14px;border:1px solid;background:#fff;white-space:nowrap}}
.badge i{{width:8px;height:8px;border-radius:50%;display:inline-block}}
.badge.important{{color:var(--important);border-color:var(--important)}} .badge.important i{{background:var(--important)}}
.badge.fixing{{color:var(--fixing);border-color:var(--fixing)}} .badge.fixing i{{background:var(--fixing)}}
.badge.fixed{{color:var(--fixed);border-color:var(--fixed)}} .badge.fixed i{{background:var(--fixed)}}
.meta{{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);margin:26px 0 0}}
.meta div{{background:#f1f5f9;padding:12px 14px}}
.meta .k{{font-size:11px;color:var(--muted);letter-spacing:.06em}}
.meta .v{{font-size:13px;font-weight:600;margin-top:2px;word-break:break-word}}
.meta .v a{{color:var(--blue)}}
@media(max-width:760px){{.meta{{grid-template-columns:1fr 1fr}}}}
section{{padding:34px 0}}
h2{{font-size:20px;margin:0 0 10px;font-weight:900;letter-spacing:-.01em}}
p.body{{margin:0;color:#2f3d49;font-size:15px;max-width:52em}}
.tl{{margin-top:28px;border-left:2px solid var(--line);padding-left:22px;list-style:none}}
.tl li{{position:relative;padding-bottom:18px}}
.tl li::before{{content:"";position:absolute;left:-29px;top:6px;width:12px;height:12px;border-radius:50%;background:#fff;border:2px solid var(--line)}}
.tl li.done::before{{background:var(--fixed);border-color:var(--fixed)}}
.tl li.now::before{{background:var(--fixing);border-color:var(--fixing);box-shadow:0 0 0 4px rgba(192,122,28,.15)}}
.tl .t{{font-size:11px;color:var(--muted);letter-spacing:.06em}}
.tl .d{{font-size:14px;font-weight:600}}
.note{{border-left:3px solid var(--warn,#c07a1c);background:#fbf3e4;padding:12px 14px;font-size:13px;color:#4a3a20;margin-top:26px}}
.actions{{display:flex;gap:10px;flex-wrap:wrap;margin-top:26px}}
.btn{{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--ink);padding:10px 18px;font-size:14px;font-weight:700;text-decoration:none;cursor:pointer;background:transparent}}
.btn.pri{{background:var(--ink);color:var(--paper)}}
.btn.pri:hover{{background:#000}}
.btn.ghost{{border-color:var(--line);background:#fff;font-weight:500}}
footer{{border-top:1px solid var(--line);margin-top:20px;padding:20px 0 40px;font-size:12px;color:var(--muted)}}
.foot-in{{max-width:var(--max);margin:0 auto;padding:0 26px;display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap}}
.toast{{position:fixed;left:50%;bottom:26px;transform:translate(-50%,20px);background:var(--ink);color:#fff;padding:10px 18px;font-size:13px;opacity:0;pointer-events:none;transition:.2s;z-index:50}}
.toast.show{{opacity:1;transform:translate(-50%,0)}}
</style>
</head>
<body>
<header class="nav">
  <div class="nav-in">
    <a class="brand" href="../../"><svg viewBox="0 0 32 32" style="width:24px;height:24px" aria-hidden="true"><path d="M6 10l10-5 10 5v12l-10 5-10-5z" fill="none" stroke="#101820" stroke-width="2"/><path d="M6 10l10 5 10-5M16 15v12" fill="none" stroke="#1859d8" stroke-width="2"/></svg><b>MC工具箱</b><span class="mono">v1.0.0</span></a>
    <nav class="links">
      <a href="../../" data-i18n="nav.home">官网</a>
      <a href="../../#versions" data-i18n="nav.download">下载</a>
      <a href="../" data-i18n="nav.feedback">反馈</a>
      <a href="../#board" aria-current="page" data-i18n="nav.board">漏洞看板</a>
      <a href="https://github.com/fsssea/mc-toolbox" data-i18n="nav.repo">开源仓库</a>
    </nav>
    <div class="lang"><select id="langSel" aria-label="Language"></select></div>
  </div>
</header>

<main class="wrap">
  <div class="hero">
    <p class="crumb"><a href="../" data-i18n="back">← 返回漏洞看板</a></p>
    <div class="kicker mono"><span data-i18n="kicker">BUG / 官方漏洞档案</span></div>
    <div class="head">
      <div>
        <div class="idline mono">
          <a class="bid" href="./" id="bid">BUG-{ID}</a>
          <span class="range" data-range></span>
        </div>
        <h1 data-i18n="title">{TITLE_ZH}</h1>
      </div>
      <div class="badge {STATUS}" id="badge"><i></i><span data-i18n="status.{STATUS}">{STATUS_ZH}</span></div>
    </div>

    <div class="meta">
      <div><div class="k mono" data-i18n="label.status">{L_STATUS}</div><div class="v" id="mStatus"></div></div>
      <div><div class="k mono" data-i18n="label.area">{L_AREA}</div><div class="v" data-i18n="area">{AREA_ZH}</div></div>
      <div><div class="k mono" data-i18n="label.platforms">{L_PF}</div><div class="v">{PLATFORMS}</div></div>
      <div><div class="k mono" data-i18n="label.affects">{L_AFF}</div><div class="v" data-range2></div></div>
      <div><div class="k mono" data-i18n="label.fixedin">{L_FIX}</div><div class="v">{FIXED_IN}</div></div>
      <div><div class="k mono" data-i18n="label.issue">{L_ISSUE}</div><div class="v">{ISSUE_CELL}</div></div>
    </div>
  </div>

  <section>
    <h2 data-i18n="sec.summary">{S_SUMMARY}</h2>
    <p class="body" data-i18n="summary">{SUMMARY_ZH}</p>
  </section>
  <section style="padding-top:0">
    <h2 data-i18n="sec.impact">{S_IMPACT}</h2>
    <p class="body" data-i18n="impact">{IMPACT_ZH}</p>
  </section>
  <section style="padding-top:0">
    <h2 data-i18n="sec.fix">{S_FIX}</h2>
    <p class="body" data-i18n="fix">{FIX_ZH}</p>
  </section>

  <section style="padding-top:0">
    <h2 data-i18n="sec.timeline">{S_TL}</h2>
    <ul class="tl">
      <li class="done"><div class="t mono">STEP 01</div><div class="d" data-i18n="tl.report">{TL_REPORT}</div></li>
      <li class="{C2}"><div class="t mono">STEP 02</div><div class="d" data-i18n="tl.confirm">{TL_CONFIRM}</div></li>
      <li class="{C3}"><div class="t mono">STEP 03</div><div class="d" data-i18n="tl.fixing">{TL_FIXING}</div></li>
      <li class="{C4}"><div class="t mono">STEP 04</div><div class="d" data-i18n="tl.fixed">{TL_FIXED}</div></li>
    </ul>
    <p class="note" data-i18n="foot.disclaimer">{DISCLAIMER}</p>
    <div class="actions">
      <a class="btn pri" href="../" data-i18n="board.more">{MORE}</a>
      <button class="btn ghost" id="btnCopy" type="button" data-i18n="copy.link">{COPY_LINK}</button>
    </div>
  </section>
</main>

<footer>
  <div class="foot-in">
    <span>© 2026 MC工具箱 contributors · MIT License</span>
    <span class="mono">bug-{ID} / {STATUS} / public record</span>
  </div>
</footer>
<div class="toast" id="toast"></div>

<script>var BUG = {BUG_JSON};</script>
<script src="../i18n-bugs.js"></script>
<script>
(function(){{
  var D = window.BUG_I18N || {{}};
  var SUPPORTED = ['zh-Hans','zh-Hant','en','ja','ko'];
  var NAMES = {{'zh-Hans':'简体中文','zh-Hant':'繁體中文','en':'English','ja':'日本語','ko':'한국어'}};
  function pick(obj, lang){{
    if (!obj) return '';
    return obj[lang] || obj['en'] || obj['zh-Hans'] || '';
  }}
  function detect(){{
    try {{ var q = new URLSearchParams(location.search).get('lang'); if (q && D[q]) return q; }} catch(e){{}}
    var saved = localStorage.getItem('mcbox-lang');
    if (saved && D[saved]) return saved;
    var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    for (var i=0;i<list.length;i++){{
      var t = String(list[i]).toLowerCase();
      if (t.indexOf('zh') === 0) return /hant|tw|hk|mo/.test(t) ? 'zh-Hant' : 'zh-Hans';
      if (t.indexOf('ja') === 0) return 'ja';
      if (t.indexOf('ko') === 0) return 'ko';
      if (t.indexOf('en') === 0) return 'en';
    }}
    return 'en';
  }}
  function apply(lang){{
    if (!D[lang]) lang = 'zh-Hans';
    document.documentElement.lang = (lang === 'zh-Hans') ? 'zh-CN' : lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el){{
      var k = el.getAttribute('data-i18n');
      if (D[lang][k] !== undefined) el.innerHTML = D[lang][k];
      if (k === 'title') el.textContent = pick(BUG.title, lang);
      if (k === 'summary') el.textContent = pick(BUG.summary, lang);
      if (k === 'impact') el.textContent = pick(BUG.impact, lang);
      if (k === 'fix') el.textContent = pick(BUG.fix, lang);
      if (k === 'area') el.textContent = pick(BUG.area, lang);
      if (k === 'status.{STATUS}') el.textContent = D[lang]['status.' + BUG.status];
    }});
    var from = pick(BUG.affected_from, lang), to = pick(BUG.affected_to, lang);
    var text = D[lang].range.replace('{{from}}', from).replace('{{to}}', to);
    document.querySelectorAll('[data-range],[data-range2]').forEach(function(el){{ el.textContent = text; }});
    document.getElementById('mStatus').textContent = D[lang]['status.' + BUG.status];
    document.title = 'BUG-' + BUG.id + ' · ' + pick(BUG.title, lang) + ' · MC工具箱';
    document.getElementById('langSel').value = lang;
    localStorage.setItem('mcbox-lang', lang);
  }}
  document.addEventListener('DOMContentLoaded', function(){{
    var sel = document.getElementById('langSel');
    SUPPORTED.forEach(function(c){{ var o=document.createElement('option'); o.value=c; o.textContent=NAMES[c]; sel.appendChild(o); }});
    sel.addEventListener('change', function(){{ apply(sel.value); }});
    apply(detect());
    document.getElementById('btnCopy').addEventListener('click', function(){{
      var url = location.origin + location.pathname;
      var done = function(){{ var t=document.getElementById('toast'); t.textContent = D[applyLang()]['toast.copied']; t.classList.add('show'); setTimeout(function(){{t.classList.remove('show');}},2000); }};
      var applyLang = function(){{ return document.documentElement.lang === 'zh-CN' ? 'zh-Hans' : document.documentElement.lang; }};
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, done); else done();
    }});
  }});
}})();
</script>
</body>
</html>
"""


def pick(obj, lang="zh-Hans"):
    if isinstance(obj, str):
        return obj
    return obj.get(lang) or obj.get("en") or obj.get("zh-Hans") or ""


def render(bug, data):
    status = bug["status"]
    prog = {"important": 2, "fixing": 3, "fixed": 4}[status]
    cls = lambda i: "done" if i <= prog else ("now" if i == prog + 1 else "")
    issue = bug.get("issue") or ""
    issue_cell = ('<a href="%s" target="_blank" rel="noopener">Issue #%s</a>' % (issue, issue.rstrip("/").split("/")[-1]) if issue
                  else '<span style="color:var(--muted)" data-i18n="noissue">尚未关联 Issue</span>')
    html = TEMPLATE.format(
        ID=bug["id"],
        TITLE_ZH=pick(bug["title"], "zh-Hans").replace("<", "&lt;"),
        AFF_ZH="%s ~ %s" % (pick(bug["affected_from"]), pick(bug["affected_to"])),
        BUG_JSON=json.dumps(bug, ensure_ascii=False),
        STATUS=status,
        STATUS_ZH={"important": "重要 · 待修", "fixing": "正在修复", "fixed": "已修复"}[status],
        AREA_ZH=pick(bug["area"]),
        PLATFORMS=" · ".join(bug.get("platforms", [])),
        FIXED_IN=bug.get("fixed_in", "—"),
        ISSUE_CELL=issue_cell,
        SUMMARY_ZH=pick(bug["summary"]), IMPACT_ZH=pick(bug["impact"]), FIX_ZH=pick(bug["fix"]),
        C2=cls(2), C3=cls(3), C4=cls(4),
        L_STATUS="状态", L_AREA="模块", L_PF="平台", L_AFF="受影响版本", L_FIX="修复版本", L_ISSUE="关联 Issue",
        S_SUMMARY="问题是什么", S_IMPACT="影响范围", S_FIX="修复方式", S_TL="处理进度",
        TL_REPORT="收到反馈并登记编号", TL_CONFIRM="确认复现，纳入修复队列",
        TL_FIXING="修复中，补验证用例", TL_FIXED="修复完成，随公开发布版本上线",
        DISCLAIMER="本页是官方漏洞档案，编号固定不变；新的问题请回到反馈中心提交，登记后会生成新的 bug-N 页面。",
        MORE="看全部漏洞", COPY_LINK="复制本页链接",
    )
    return html


def main():
    data = json.load(io.open(DATA, encoding="utf-8"))
    bugs = data.get("bugs", [])
    ids = [b["id"] for b in bugs]
    assert len(ids) == len(set(ids)), "duplicate bug id"
    assert all(b["status"] in STATUS for b in bugs), "unknown status"
    if "--check" in sys.argv:
        print("ok: %d bug(s), next_id=%s" % (len(bugs), data.get("next_id")))
        return
    for b in bugs:
        d = os.path.join(BASE, "bug-%d" % b["id"])
        os.makedirs(d, exist_ok=True)
        io.open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(render(b, data))
        print("wrote", os.path.join(d, "index.html"))
    print("next_id =", data.get("next_id"))


if __name__ == "__main__":
    main()
