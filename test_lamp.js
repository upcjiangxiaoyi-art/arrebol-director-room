// v1.39.0 测试：小红霞掌灯。第四页纯聊天、素材只读未隐藏楼层、聊天位借统筹、执笔位改稿只换标签里面、原版留前一页 swipe。
// 跑法同其余：npm install jsdom && node test_lamp.js
const fs = require("fs");
const { JSDOM } = require("jsdom");

const SRC = fs.readFileSync("index.js", "utf8");
const SET_KEY = "arrebol-d-final-v1040-stable-settings";
const META_KEY = "arrebol_d_lamp";

let PASS = 0, FAIL = 0; const failures = [];
function ok(c, name, extra) {
    if (c) { PASS++; console.log("  ✓ " + name); }
    else { FAIL++; failures.push(name); console.log("  ✗ " + name + (extra ? "  → " + extra : "")); }
}
function section(t) { console.log("\n── " + t + " ──"); }
const tick = ms => new Promise(r => setTimeout(r, ms));

const TAIL = "\n\narrebol_d_visible:plot###\n【暗河红霞 Arrebol D｜统筹】\n派人：老周送口信\n###";
const FLOOR3 = "<status>HP 80 · 夜 · 书房</status>\n<content>\n他把信放在桌上，说：「三天前就该到的人，今晚到了。」她笑了笑，立刻答应跟他走。\n</content>\n<report>信送到，她当场答应同行。</report>" + TAIL;

function build(opts) {
    opts = opts || {};
    const dom = new JSDOM("<!doctype html><html><body><div id=\"extensions_settings2\"></div></body></html>",
        { url: "https://example.org/", pretendToBeVisual: true, runScripts: "outside-only" });
    const win = dom.window; win.top = win;
    const chat = [], extensionSettings = {}, chatMetadata = {}, handlers = {};
    extensionSettings[SET_KEY] = Object.assign({
        plotApiEndpoint: "https://plot.example/v1", plotApiKey: "k-plot", plotModel: "plot-model",
        emotionApiEndpoint: "https://emo.example/v1", emotionApiKey: "k-emo", emotionModel: "emo-model",
        expandApiEndpoint: "https://expand.example/v1", expandApiKey: "k-x", expandModel: "x-model"
    }, opts.settings || {});

    // 楼层：#0 用户 · #1 助手（隐藏）· #2 用户 · #3 助手（本篇，带状态栏、正文、摘要、导演稿尾巴）
    chat.push({ is_user: true, name: "江", mes: "开场白" });
    chat.push({ is_user: false, is_system: true, name: "阿尔", mes: "<content>这楼被藏了</content><report>隐藏楼的摘要</report>" });
    chat.push({ is_user: true, name: "江", mes: "我问他信里写了什么" });
    chat.push({ is_user: false, name: "阿尔", mes: "<content>前一楼正文</content><report>他收到了一封信。</report>" });
    chat.push({ is_user: true, name: "江", mes: "我说：你念给我听" });
    chat.push({ is_user: false, name: "阿尔", mes: FLOOR3, swipes: [FLOOR3], swipe_id: 0, swipe_info: [{ send_date: "d", extra: { a: 1 } }] });

    const calls = [];
    let script = () => "好的";
    let hang = null;        // 让请求挂着不回：{ promise, resolve }
    let saveChatCalls = 0, redraws = [];
    win.SillyTavern = { getContext: () => context };
    win.toastr = { info() {}, success() {}, warning() {}, error() {} };
    win.fetch = async (url, init) => {
        const body = JSON.parse(init.body);
        const rec = { url: String(url), body, headers: init.headers, signal: init.signal };
        calls.push(rec);
        if (hang) {
            await new Promise((res, rej) => {
                hang.resolve = res;
                if (init.signal) init.signal.addEventListener("abort", () => { const e = new Error("aborted"); e.name = "AbortError"; rej(e); });
            });
        }
        const answer = script(calls.length, body);
        return { ok: true, status: 200, text: async () => JSON.stringify({ choices: [{ message: { content: answer } }] }) };
    };
    const logs = [];
    win.console = { log(...a) { logs.push(a.map(String).join(" ")); }, warn(...a) { logs.push(a.map(String).join(" ")); }, error(...a) { logs.push("ERR " + a.map(String).join(" ")); }, info() {}, debug() {} };

    const context = {
        extensionSettings, chatMetadata, chat,
        chatId: "lamp-test", getCurrentChatId: () => "lamp-test",
        characters: [{ name: "阿尔", description: "阿尔是个送信的，嘴硬心软。", data: { description: "阿尔是个送信的，嘴硬心软。", character_book: { entries: [{ content: "世界书：这个城里的信都要过门房。" }] } } }],
        characterId: 0, this_chid: 0, name1: "江", name2: "阿尔",
        saveSettingsDebounced() {}, saveSettings() {},
        saveMetadataDebounced() {}, saveMetadata() {},
        saveChat() { saveChatCalls++; return Promise.resolve(); },
        updateMessageBlock(idx) { redraws.push(idx); },
        setExtensionPrompt() {}, extensionPrompts: {},
        extensionPromptTypes: { IN_CHAT: 1 }, extensionPromptRoles: { SYSTEM: 0 },
        substituteParams: s => s,
        eventSource: { on(t, f) { (handlers[t] = handlers[t] || []).push(f); }, emit() {} },
        event_types: { APP_READY: "app_ready", MESSAGE_RECEIVED: "message_received", MESSAGE_SENT: "message_sent", CHAT_CHANGED: "chat_changed", MESSAGE_UPDATED: "message_updated" }
    };
    win.eval(SRC);
    return {
        win, doc: win.document, chat, calls, logs, context,
        st: () => extensionSettings[SET_KEY], meta: () => chatMetadata[META_KEY],
        setScript(f) { script = f; },
        hangNext() { hang = {}; return hang; }, unhang() { hang = null; },
        saves: () => saveChatCalls, redraws: () => redraws, handlers,
        T: () => win.__adrLampTest
    };
}

async function boot(e) {
    e.doc.dispatchEvent(new e.win.Event("DOMContentLoaded")); await tick(500);
    (e.handlers["app_ready"] || []).forEach(f => { try { f(); } catch (x) {} }); await tick(400);
}
const click = (W, el) => el.dispatchEvent(new W.Event("click", { bubbles: true }));
const change = (W, el) => el.dispatchEvent(new W.Event("change", { bubbles: true }));

(async () => {
    section("页签与页面");
    let e = build(); await boot(e);
    let d = e.doc, W = e.win;
    ok(!!d.querySelector("#adr044-drawer #adr044-tab-lamp"), "抽屉顶上有「掌灯」页签");
    ok(d.querySelector("#adr044-drawer #adr044-tab-lamp").textContent === "掌灯", "页签文字是「掌灯」");
    ok(d.querySelectorAll("#adr044-drawer .adr-top-tabs button").length === 4, "顶部一共四页");
    ok(!!d.querySelector("#adr044-page-lamp"), "抽屉里有掌灯页");
    ok(d.querySelector("#adr044-page-lamp").style.display === "none", "默认不在掌灯页");
    click(W, d.querySelector("#adr044-drawer #adr044-tab-lamp")); await tick(50);
    ok(d.querySelector("#adr044-page-lamp").style.display === "", "点页签切到掌灯页");
    ok(e.st().activeTab === "lamp", "activeTab 记成 lamp");
    ok(d.querySelector("#adr044-page-emotion").style.display === "none", "情感导演页收起");
    click(W, d.querySelector("#adr048-fab")); await tick(400);
    ok(!!d.querySelector("#adr048-page-lamp"), "浮窗里也有掌灯页");
    ok(d.querySelectorAll("#adr048-popup-body .adr-top-tabs button").length === 4, "浮窗顶部也是四页");
    ok(d.querySelector("#adr048-page-lamp").style.display === "", "浮窗打开时停在掌灯页");

    section("素材：本篇、未隐藏楼层摘要、角色卡");
    let mat = e.T().materials();
    ok(mat.idx === 5, "本篇默认是最新一楼助手正文 #5", String(mat.idx));
    ok(mat.bodyTagged && mat.body.indexOf("三天前就该到的人") >= 0, "本篇原文取的是 content 标签里面");
    ok(mat.body.indexOf("<status>") < 0 && mat.body.indexOf("arrebol_d_visible") < 0, "状态栏与导演稿尾巴不进本篇原文");
    ok(mat.summary.indexOf("他收到了一封信") >= 0, "此前剧情读到了 #3 的 report 标签");
    ok(mat.summary.indexOf("隐藏楼的摘要") < 0 && mat.summary.indexOf("这楼被藏了") < 0, "隐藏楼（is_system）一个字不读");
    ok(mat.hiddenFloors === 1, "数出跳过了 1 楼隐藏", String(mat.hiddenFloors));
    ok(mat.summary.indexOf("[#2 · 用户] 我问他信里写了什么") >= 0, "用户楼原话带上");
    ok(mat.summary.indexOf("[#4 · 用户] 我说：你念给我听") >= 0 && mat.summary.indexOf("【本篇 · #5 在此】") > mat.summary.indexOf("#4 · 用户"), "时间顺序：用户楼在前、本篇标记在后");
    ok(mat.summary.indexOf("[#3 · 阿尔 · 摘要]") >= 0, "摘要行带楼号与名字");
    ok(mat.card.indexOf("嘴硬心软") >= 0, "角色卡读到了");
    ok(mat.origSummary === "信送到，她当场答应同行。", "本篇自己的摘要标签也认出来了");
    const body = d.querySelector("#adr048-popup-body #adr044-lamp-mat-body");
    ok(body && body.textContent.indexOf("三天前就该到的人") >= 0, "页面上「本篇原文」显示出来了");
    const sum = d.querySelector("#adr048-popup-body #adr044-lamp-mat-summary");
    ok(sum && sum.textContent.indexOf("他收到了一封信") >= 0 && sum.textContent.indexOf("隐藏楼") < 0, "页面上「此前剧情」只显示未隐藏楼");
    const title = d.querySelector("#adr048-popup-body #adr044-lamp-mat-title");
    ok(title && title.textContent.indexOf("#5") >= 0 && title.textContent.indexOf("跳过隐藏 1 楼") >= 0, "素材标题写了楼号与跳过隐藏数", title && title.textContent);

    section("无摘要标签的楼：截开头；换摘要标签名");
    e.chat[3].mes = "<content>前一楼正文没写摘要</content>";
    mat = e.T().materials();
    ok(mat.summary.indexOf("无摘要标签，截开头] 前一楼正文没写摘要") >= 0, "没有摘要标签的楼截正文开头顶上");
    e.chat[3].mes = "<content>前一楼正文</content><memo>换了名字的摘要</memo>";
    const tagEl = d.querySelector("#adr048-popup-body #adr044-lamp-summary-tags");
    tagEl.value = "memo"; change(W, tagEl); await tick(50);
    ok(e.st().lampSummaryTags === "memo", "摘要标签名存进设置");
    mat = e.T().materials();
    ok(mat.summary.indexOf("换了名字的摘要") >= 0, "改了标签名后按新标签读");
    tagEl.value = "report"; change(W, tagEl); await tick(50);
    e.chat[3].mes = "<content>前一楼正文</content><report>他收到了一封信。</report>";

    section("聊：借统筹的 API，无导演框架，多轮");
    const inp = d.querySelector("#adr048-popup-body #adr044-lamp-input");
    inp.value = "她答应得太快了吧，这不像她";
    e.setScript(() => "快是快，但你看她前一楼就已经在等这封信了——快的是动作，不是决定。");
    click(W, d.querySelector("#adr048-popup-body #adr044-lamp-send")); await tick(300);
    ok(e.calls.length === 1, "发了一次请求", String(e.calls.length));
    const c1 = e.calls[0];
    ok(c1.url.indexOf("plot.example") >= 0 && c1.headers.Authorization === "Bearer k-plot", "默认借统筹的地址与钥匙", c1.url);
    ok(c1.body.model === "plot-model", "模型也是统筹的");
    ok(c1.body.messages[0].role === "system" && c1.body.messages[0].content.indexOf("你是 Arrebol，小红霞") === 0, "系统提示以出厂人设开头");
    ok(c1.body.messages[0].content.indexOf("反对要带依据") >= 0, "人设里写了反对要带依据");
    ok(c1.body.messages[0].content.indexOf("【本篇原文 · #5") >= 0 && c1.body.messages[0].content.indexOf("【此前剧情") >= 0 && c1.body.messages[0].content.indexOf("【角色卡 / 世界书 / 人设") >= 0, "素材三块都在系统提示里");
    ok(c1.body.messages[0].content.indexOf("隐藏楼的摘要") < 0 && c1.body.messages[0].content.indexOf("这楼被藏了") < 0, "隐藏楼没发出去");
    ok(c1.body.messages[0].content.indexOf("情感导演") < 0 && c1.body.messages[0].content.indexOf("【情感方向】") < 0, "没有导演预设混进来");
    ok(c1.body.messages.length === 2 && c1.body.messages[1].role === "user" && c1.body.messages[1].content === "她答应得太快了吧，这不像她", "第一轮：系统 + 用户一句");
    ok(Math.abs(c1.body.temperature - 0.8) < 1e-9, "温度默认 0.8");
    let th = d.querySelector("#adr048-popup-body #adr044-lamp-thread");
    ok(th.querySelectorAll(".adr-lamp-msg.u").length === 1 && th.querySelectorAll(".adr-lamp-msg.a").length === 1, "画面上一问一答两个气泡");
    ok(th.textContent.indexOf("快的是动作，不是决定") >= 0, "回答显示出来了");
    ok(inp.value === "", "发送后输入框清空");
    let meta = e.meta();
    ok(meta && meta.threads && meta.threads["5"] && meta.threads["5"].msgs.length === 2, "对话存进 chat_metadata，按楼号 5 归档");
    ok(d.querySelector("#adr044-drawer #adr044-lamp-thread").querySelectorAll(".adr-lamp-msg").length === 2, "抽屉那份同步画出来了");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-topline").textContent.indexOf("聊了 2 句") >= 0, "顶上那行写了聊了几句");

    await tick(500);   // 按钮 450ms 防抖
    inp.value = "那她至少该犹豫一下";
    e.setScript(() => "同意。补一拍：她看了眼窗外，再说走。");
    click(W, d.querySelector("#adr048-popup-body #adr044-lamp-send")); await tick(300);
    const c2 = e.calls[1];
    ok(c2.body.messages.length === 4 && c2.body.messages[2].role === "assistant" && c2.body.messages[3].content === "那她至少该犹豫一下", "第二轮带上了上一问一答");

    section("聊天位自己填；执笔位另接");
    const borrow = d.querySelector("#adr048-popup-body #adr044-lamp-borrow");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-self").classList.contains("adr-lamp-hide"), "借别人时自填框藏着");
    borrow.value = "self"; change(W, borrow); await tick(50);
    ok(e.st().lampBorrow === "self", "聊天位改成自己填");
    ok(!d.querySelector("#adr048-popup-body #adr044-lamp-self").classList.contains("adr-lamp-hide"), "自填框露出来");
    const ep = d.querySelector("#adr048-popup-body #adr044-lamp-endpoint"); ep.value = "https://claude.example/v1"; change(W, ep);
    const ky = d.querySelector("#adr048-popup-body #adr044-lamp-key"); ky.value = "k-lamp"; change(W, ky);
    const md = d.querySelector("#adr048-popup-body #adr044-lamp-model"); md.value = "lamp-model"; change(W, md); await tick(50);
    let cfg = e.T().apiCfg("lamp");
    ok(cfg.endpoint === "https://claude.example/v1" && cfg.model === "lamp-model" && cfg.key === "k-lamp", "聊天位用自己填的");
    ok(e.T().apiCfg("pen").endpoint === "https://claude.example/v1" && e.T().apiCfg("pen").from === "lamp", "执笔位默认跟聊天位");
    const pb = d.querySelector("#adr048-popup-body #adr044-pen-borrow"); pb.value = "expand"; change(W, pb); await tick(50);
    ok(e.T().apiCfg("pen").endpoint === "https://expand.example/v1" && e.T().apiCfg("pen").model === "x-model", "执笔位改借展开的");
    pb.value = "self"; change(W, pb); await tick(50);
    const pep = d.querySelector("#adr048-popup-body #adr044-pen-endpoint"); pep.value = "https://gemini.example/v1beta/openai"; change(W, pep);
    const pmd = d.querySelector("#adr048-popup-body #adr044-pen-model"); pmd.value = "gemini-main"; change(W, pmd); await tick(50);
    ok(e.T().apiCfg("pen").endpoint === "https://gemini.example/v1beta/openai" && e.T().apiCfg("pen").model === "gemini-main", "执笔位自己填（主模型）");
    const note = d.querySelector("#adr048-popup-body #adr044-lamp-api-note");
    ok(note && note.textContent.indexOf("lamp-model") >= 0 && note.textContent.indexOf("gemini-main") >= 0, "API 说明行写了两位各用什么", note && note.textContent);

    section("改好给我：执笔位读讨论，只认标签");
    e.setScript((n, body) => {
        if (body.messages[0].content.indexOf("你是这篇的执笔人") === 0) {
            return "<content>\n他把信放在桌上，说：「三天前就该到的人，今晚到了。」她看了眼窗外，雨还没停，隔了一拍才说：「走。」\n</content>\n<report>信送到，她看了眼窗外才答应同行。</report>";
        }
        return "聊天回答";
    });
    await tick(500);
    click(W, d.querySelector("#adr048-popup-body #adr044-lamp-rewrite")); await tick(300);
    const c3 = e.calls[e.calls.length - 1];
    ok(c3.url.indexOf("gemini.example") >= 0 && c3.body.model === "gemini-main", "改稿走执笔位", c3.url);
    ok(c3.body.messages[0].content.indexOf("你是这篇的执笔人") === 0, "执笔系统提示是执笔人规矩");
    ok(c3.body.messages[0].content.indexOf("你是 Arrebol，小红霞") < 0, "执笔位不带聊天人设");
    ok(c3.body.messages[1].content.indexOf("【讨论记录 · 作者与小红霞】") >= 0 && c3.body.messages[1].content.indexOf("作者：她答应得太快了吧") >= 0 && c3.body.messages[1].content.indexOf("小红霞：同意。补一拍") >= 0, "整段讨论喂给了执笔位");
    ok(c3.body.messages[1].content.indexOf("<content>…</content>") >= 0 && c3.body.messages[1].content.indexOf("<report>…</report>") >= 0, "要求按正文标签与摘要标签输出");
    ok(c3.body.messages[1].content.indexOf("【本篇原文 · #5") >= 0, "执笔位也看得到素材");
    meta = e.meta();
    ok(meta.threads["5"].draft && meta.threads["5"].draft.content.indexOf("隔了一拍才说") >= 0, "改稿存进 draft");
    ok(meta.threads["5"].draft.summary === "信送到，她看了眼窗外才答应同行。", "新摘要也存了");
    ok(meta.threads["5"].draft.base === mat.body, "记下了改稿时的原文，替换前对表用");
    const wrap = d.querySelector("#adr048-popup-body #adr044-lamp-draft-wrap");
    ok(wrap && !wrap.classList.contains("adr-lamp-hide"), "改稿预览区露出来");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-draft").value.indexOf("隔了一拍才说") >= 0, "预览框里是改好的正文");
    ok(!d.querySelector("#adr048-popup-body #adr044-lamp-draft-summary-wrap").classList.contains("adr-lamp-hide"), "新摘要框也露出来");
    ok(th.textContent.indexOf("改好了一版") >= 0, "对话里插了一条提示");

    section("替换：只换标签里面，状态栏与导演稿不动，原版留前一页");
    const applyBtn = d.querySelector("#adr048-popup-body #adr044-lamp-apply");
    await tick(500);
    click(W, applyBtn); await tick(50);
    ok(applyBtn.textContent === "确定替换？" && e.chat[5].mes === FLOOR3, "第一下只是问「确定替换？」，楼没动");
    // 用户在预览框改两笔再替换
    const draftTa = d.querySelector("#adr048-popup-body #adr044-lamp-draft");
    draftTa.value = draftTa.value.replace("雨还没停", "雨还没停，灯也没点"); change(W, draftTa);
    await tick(500);
    click(W, applyBtn); await tick(400);
    const m5 = e.chat[5];
    ok(m5.mes.indexOf("<status>HP 80 · 夜 · 书房</status>") === 0, "状态栏原样留在开头");
    ok(m5.mes.indexOf("<content>\n他把信放在桌上") >= 0 && m5.mes.indexOf("隔了一拍才说") >= 0 && m5.mes.indexOf("灯也没点") >= 0, "正文标签里换成了改稿（含手改的两笔）");
    ok(m5.mes.indexOf("立刻答应跟他走") < 0, "旧正文不在了");
    ok(m5.mes.indexOf("<report>信送到，她看了眼窗外才答应同行。</report>") >= 0, "摘要标签里换成了新摘要");
    ok(m5.mes.indexOf("arrebol_d_visible:plot###") >= 0 && m5.mes.indexOf("派人：老周送口信") >= 0, "导演稿尾巴原样留着");
    ok(Array.isArray(m5.swipes) && m5.swipes.length === 2 && m5.swipes[0] === FLOOR3 && m5.swipes[1] === m5.mes && m5.swipe_id === 1, "原版存成前一页 swipe，当前页是新版");
    ok(Array.isArray(m5.swipe_info) && m5.swipe_info.length === 2 && m5.swipe_info[1].extra && m5.swipe_info[1].extra.a === 1, "swipe_info 跟着补了一份");
    ok(e.saves() >= 1 && e.redraws().indexOf(5) >= 0, "保存了聊天、只重画这一楼", e.saves() + "/" + JSON.stringify(e.redraws()));
    ok(W.__adrDGenTest.looksLive() === false, "自己替换的那一笔不算「楼还在生成」，导演与下一次替换不用白等");
    meta = e.meta();
    ok(!meta.threads["5"].draft, "替换后 draft 清掉");
    ok(th.textContent.indexOf("已替换 #5") >= 0, "对话里记了一笔替换");
    ok(meta.threads["5"].msgs.length === 1 && meta.threads["5"].msgs[0].r === "n", "替换后这轮对话自动清空，只留一行记录（默认开）");
    ok(th.querySelectorAll(".adr-lamp-msg.u, .adr-lamp-msg.a").length === 0, "画面上旧的问答没了");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-draft-wrap").classList.contains("adr-lamp-hide"), "改稿预览区收起");
    mat = e.T().materials();
    ok(mat.body.indexOf("隔了一拍才说") >= 0 && mat.body.indexOf("<status>") < 0, "素材里本篇原文已是新版");

    section("替换前对表：原文变了就拒绝");
    e.setScript(() => "这版还行，就是窗外那句可以再短。");
    inp.value = "窗外那句太长了"; await e.T().send(); await tick(50);
    const cF = e.calls[e.calls.length - 1];
    ok(cF.body.messages.length === 2 && cF.body.messages[1].content === "窗外那句太长了", "替换后再开口是全新一轮：系统 + 这一句，不带上一轮的问答");
    ok(cF.body.messages[0].content.indexOf("隔了一拍才说") >= 0 && cF.body.messages[0].content.indexOf("立刻答应跟他走") < 0, "新一轮的素材里本篇已是替换后的正文");
    e.setScript(() => "<content>再改一版</content>");
    await tick(500);
    click(W, d.querySelector("#adr048-popup-body #adr044-lamp-rewrite")); await tick(300);
    ok(e.meta().threads["5"].draft && e.meta().threads["5"].draft.content === "再改一版", "第二版改稿到位");
    e.chat[5].mes = e.chat[5].mes.replace("隔了一拍才说", "想了很久才说");
    const beforeMes = e.chat[5].mes;
    const r = e.T().applyNow();
    ok(r === false && e.chat[5].mes === beforeMes, "楼被外部改过，替换拒绝、楼不动");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-chat-status").textContent.indexOf("不一样了") >= 0, "状态行说明原因");
    await tick(500);
    click(W, d.querySelector("#adr048-popup-body #adr044-lamp-draft-discard")); await tick(50);
    ok(!e.meta().threads["5"].draft, "丢弃改稿");

    section("关掉自动清空：替换后对话留着");
    const keep = d.querySelector("#adr048-popup-body #adr044-lamp-reset-after-apply");
    ok(keep && keep.checked, "「替换后自动清空本轮对话」默认勾着");
    keep.checked = false; change(W, keep); await tick(50);
    ok(e.st().lampResetAfterApply === false, "关掉存进设置");
    e.setScript(() => "<content>第三版</content>");
    await tick(500);
    click(W, d.querySelector("#adr048-popup-body #adr044-lamp-rewrite")); await tick(300);
    ok(e.meta().threads["5"].draft && e.meta().threads["5"].draft.content === "第三版", "第三版改稿到位");
    const nBefore = e.meta().threads["5"].msgs.filter(m => m.r !== "n").length;
    const r3 = e.T().applyNow(); await tick(300);
    ok(r3 === true && e.chat[5].mes.indexOf("<content>\n第三版\n</content>") >= 0 && e.chat[5].mes.indexOf("想了很久才说") < 0, "替换成功（保留原来的首尾换行习惯）", r3 + " / " + d.querySelector("#adr048-popup-body #adr044-lamp-chat-status").textContent);
    ok(e.meta().threads["5"].msgs.filter(m => m.r !== "n").length === nBefore && nBefore > 0, "关掉后这轮的问答都还在");
    keep.checked = true; change(W, keep); await tick(50);
    ok(e.st().lampResetAfterApply === true, "再勾回去");

    section("无正文标签的楼：整楼换，导演稿与图标记挪到末尾保留");
    const T = e.T();
    const composed = T.compose("image###pic.png###\n整楼正文没有标签" + TAIL, "新的整楼正文", "");
    ok(composed.indexOf("新的整楼正文") === 0, "新正文在最前");
    ok(composed.indexOf("image###pic.png###") > 0 && composed.indexOf("arrebol_d_visible:plot###") > 0, "图标记与导演稿留在末尾");
    ok(composed.indexOf("整楼正文没有标签") < 0, "旧正文不在了");
    const composed2 = T.compose("<content>甲</content>\n中间\n<content>乙</content><report>老</report>", "丙", "新");
    ok(composed2 === "<content>丙</content>\n中间\n<report>新</report>", "多块正文标签：第一块换、其余删、摘要换", composed2);
    const composed3 = T.compose("<content>甲</content>", "丙", "新摘要");
    ok(composed3 === "<content>丙</content>", "原楼没有摘要标签就不加");
    const parsed = T.parsePen("```\n没按标签来的整段\n```", true);
    ok(parsed.content === "没按标签来的整段" && parsed.summary === "", "执笔位没按标签来：去围栏整段当正文");
    const parsed2 = T.parsePen("好的，改好了：<content>正</content>\n<report>摘</report>", true);
    ok(parsed2.content === "正" && parsed2.summary === "摘", "标签外的废话不要");

    section("打断");
    const h = e.hangNext();
    inp.value = "再聊一句";
    const p = T.send(); await tick(100);
    ok(e.calls[e.calls.length - 1].body.messages[e.calls[e.calls.length - 1].body.messages.length - 1].content === "再聊一句", "请求发出去挂着");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-send").disabled && !d.querySelector("#adr048-popup-body #adr044-lamp-stop").disabled, "等待时发送禁用、打断可点");
    ok(!!th.querySelector(".adr-lamp-live"), "画面上有在打字的气泡");
    await tick(500);
    click(W, d.querySelector("#adr048-popup-body #adr044-lamp-stop")); const res = await p; e.unhang(); await tick(50);
    ok(res === false, "打断后 send 返回 false");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-chat-status").textContent === "打断了", "状态行写「打断了」", d.querySelector("#adr048-popup-body #adr044-lamp-chat-status").textContent);
    ok(!d.querySelector("#adr048-popup-body #adr044-lamp-send").disabled, "打断后发送恢复");
    const msgsNow = e.meta().threads["5"].msgs;
    ok(msgsNow[msgsNow.length - 1].r === "u" && msgsNow[msgsNow.length - 1].t === "再聊一句", "打断且一个字没收到：只留用户那句，不存空回答");

    section("换楼号 / 清空 / 换聊天");
    const fl = d.querySelector("#adr048-popup-body #adr044-lamp-floor"); fl.value = "3"; change(W, fl); await tick(50);
    ok(e.T().materials().idx === 3, "填楼号 3 就对着 #3 聊");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-mat-body").textContent === "前一楼正文", "素材切到 #3 的正文");
    ok(th.querySelectorAll(".adr-lamp-msg.u").length === 0, "#3 还没聊过，对话区是空的（各楼各记各的）");
    fl.value = "2"; change(W, fl); await tick(50);
    ok(e.T().materials().idx === 5, "填到用户楼就退回最新一楼");
    await tick(500);
    click(W, d.querySelector("#adr048-popup-body #adr044-lamp-floor-latest")); await tick(50);
    ok(e.meta().floor === -1 && e.T().materials().idx === 5, "「最新一楼」把楼号清掉");
    const clr = d.querySelector("#adr048-popup-body #adr044-lamp-clear");
    await tick(500);
    click(W, clr); await tick(500); click(W, clr); await tick(50);
    ok(!e.meta().threads["5"], "两下清空这一楼的对话");
    ok(th.querySelectorAll(".adr-lamp-msg").length === 0, "画面也空了");
    // 换聊天：请求挂着时切走，回来的话不落到新聊天
    e.setScript(() => "晚到的回答");
    const h2 = e.hangNext();
    inp.value = "切聊天前问的";
    const p2 = T.send(); await tick(100);
    e.context.chatId = "other-chat"; e.context.getCurrentChatId = () => "other-chat";
    h2.resolve(); const r2 = await p2; e.unhang(); await tick(50);
    ok(r2 === false, "中途换聊天：不算成功");
    ok(!e.context.chatMetadata[META_KEY].threads || !Object.keys(e.context.chatMetadata[META_KEY].threads).some(k => JSON.stringify(e.context.chatMetadata[META_KEY].threads[k]).indexOf("晚到的回答") >= 0), "晚到的回答没写进任何楼的对话");

    section("重开浮窗：对话从聊天文件里回来");
    e.context.chatId = "lamp-test"; e.context.getCurrentChatId = () => "lamp-test";
    e.context.chatMetadata[META_KEY] = { v: 1, floor: -1, threads: { "5": { msgs: [{ r: "u", t: "存档里的问题", at: 1 }, { r: "a", t: "存档里的回答", at: 2 }], draft: null, at: 2 } } };
    await tick(500);
    click(W, d.querySelector("#adr048-popup-close")); await tick(500);
    click(W, d.querySelector("#adr048-fab")); await tick(400);
    th = d.querySelector("#adr048-popup-body #adr044-lamp-thread");
    ok(th && th.textContent.indexOf("存档里的回答") >= 0, "重建面板后对话从 chat_metadata 画回来");
    const inp2 = d.querySelector("#adr048-popup-body #adr044-lamp-input");   // 面板重建过，旧引用已脱离 DOM

    section("出厂人设可改可恢复");
    const pre = d.querySelector("#adr048-popup-body #adr044-lamp-preset"); pre.value = "你是个只会说好的编辑"; change(W, pre); await tick(50);
    e.setScript(() => "好");
    inp2.value = "看看人设"; await T.send(); await tick(50);
    ok(e.calls[e.calls.length - 1].body.messages[0].content.indexOf("你是个只会说好的编辑") === 0, "自定义人设生效");
    await tick(500);
    click(W, d.querySelector("#adr048-popup-body #adr044-lamp-preset-reset")); await tick(50);
    ok(e.st().lampPreset === "" && pre.value === "", "恢复出厂清空字段");
    inp2.value = "再看"; await T.send(); await tick(50);
    ok(e.calls[e.calls.length - 1].body.messages[0].content.indexOf("你是 Arrebol，小红霞") === 0, "恢复后回到出厂人设");

    section("不碰导演那套");
    ok(e.calls.every(c => c.body.messages[0].content.indexOf("【情感方向】") < 0 && c.body.messages[0].content.indexOf("【派人】") < 0), "掌灯的请求里没有导演预设");
    ok(e.logs.filter(l => l.indexOf("ERR") === 0).length === 0, "全程没有 console.error", e.logs.filter(l => l.indexOf("ERR") === 0).join(" | "));

    console.log("\n通过 " + PASS + " · 失败 " + FAIL + (FAIL ? "\n  " + failures.join("\n  ") : ""));
    process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
