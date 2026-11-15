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
// v1.45.6 执笔请求的系统提示：小红霞自己动笔（不再是另一个「执笔人」）
const isPen = body => body.messages[0].content.indexOf("你刚和读者讨论完这部互动小说的这一楼，现在动笔") > 0;

(async () => {
    section("页签与页面");
    let e = build(); await boot(e);
    let d = e.doc, W = e.win;
    ok(!!d.querySelector("#adr044-drawer #adr044-tab-lamp"), "抽屉顶上有「掌灯」页签");
    ok(d.querySelector("#adr044-drawer #adr044-tab-lamp").textContent === "掌灯", "页签文字是「掌灯」");
    ok(d.querySelectorAll("#adr044-drawer .adr-top-tabs button").length === 5, "顶部一共五页（v1.45.0 多了剧场）");
    ok(!!d.querySelector("#adr044-page-lamp"), "抽屉里有掌灯页");
    ok(d.querySelector("#adr044-page-lamp").style.display === "none", "默认不在掌灯页");
    click(W, d.querySelector("#adr044-drawer #adr044-tab-lamp")); await tick(50);
    ok(d.querySelector("#adr044-page-lamp").style.display === "", "点页签切到掌灯页");
    ok(e.st().activeTab === "lamp", "activeTab 记成 lamp");
    ok(d.querySelector("#adr044-page-emotion").style.display === "none", "情感导演页收起");
    click(W, d.querySelector("#adr048-fab")); await tick(400);
    ok(!!d.querySelector("#adr048-page-lamp"), "浮窗里也有掌灯页");
    ok(d.querySelectorAll("#adr048-popup-body .adr-top-tabs button").length === 5, "浮窗顶部也是五页");
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
    ok(mat.summary.indexOf("无摘要标签，给正文] 前一楼正文没写摘要") >= 0, "没有摘要标签的楼给整段正文顶上");
    e.chat[3].mes = "<content>前一楼正文</content><memo>换了名字的摘要</memo>";
    const tagEl = d.querySelector("#adr048-popup-body #adr044-lamp-summary-tags");
    tagEl.value = "memo"; change(W, tagEl); await tick(50);
    ok(e.st().lampSummaryTags === "memo", "摘要标签名存进设置");
    mat = e.T().materials();
    ok(mat.summary.indexOf("换了名字的摘要") >= 0, "改了标签名后按新标签读");
    tagEl.value = "report"; change(W, tagEl); await tick(50);
    e.chat[3].mes = "<content>前一楼正文</content><report>他收到了一封信。</report>";

    section("聊：借统筹的 API，无导演框架，多轮");
    const sendBtn = d.querySelector("#adr048-popup-body #adr044-lamp-send");
    ok(sendBtn.parentNode.children.length === 1 && sendBtn.parentNode.classList.contains("adr-lamp-send-row"), "发送独占一行（v1.41.1）");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-stop").parentNode === d.querySelector("#adr048-popup-body #adr044-lamp-clear").parentNode, "打断与清空同一行");
    ok(!!d.querySelector("#adr048-popup-body #adr044-lamp-jump-bottom") && !!d.querySelector("#adr048-popup-body #adr044-lamp-jump-top"), "浮窗有「回底」「回顶」两枚键（v1.41.7）");
    ok(!!d.querySelector("#adr044-drawer #adr044-lamp-jump-bottom") && !!d.querySelector("#adr044-drawer #adr044-lamp-jump-top"), "抽屉也有");
    await tick(500); click(W, d.querySelector("#adr048-popup-body #adr044-lamp-jump-bottom")); await tick(500); click(W, d.querySelector("#adr048-popup-body #adr044-lamp-jump-top")); await tick(50);
    ok(e.logs.filter(l => l.indexOf("ERR") === 0).length === 0, "点回底、回顶不报错");
    const jb = d.querySelector("#adr048-popup-body #adr044-lamp-jump-bottom");
    ok(jb.closest('[data-drawer-id="lamp-chat"]') && jb.parentNode.previousElementSibling && jb.parentNode.previousElementSibling.id === "adr044-lamp-thread", "两枚键紧挨在对话框底下，只管对话框（v1.41.9）");
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
        if (isPen(body)) {
            return "<content>\n他把信放在桌上，说：「三天前就该到的人，今晚到了。」她看了眼窗外，雨还没停，隔了一拍才说：「走。」\n</content>\n<report>信送到，她看了眼窗外才答应同行。</report>";
        }
        return "聊天回答";
    });
    await tick(500);
    click(W, d.querySelector("#adr048-popup-body #adr044-lamp-rewrite")); await tick(300);
    const c3 = e.calls[e.calls.length - 1];
    ok(c3.url.indexOf("gemini.example") >= 0 && c3.body.model === "gemini-main", "改稿走执笔位", c3.url);
    ok(c3.body.messages[0].content === e.T().penPreset + "\n\n" + e.T().stance("pen") && c3.body.messages[0].content.indexOf("你是 Arrebol，小红霞：审美极高的高级改稿员，不是扮演者。你刚和读者讨论完") === 0, "执笔系统提示是她自己动笔的规矩（v1.45.6），后面跟着她自己的坚持那一段");
    ok(c3.body.messages[0].content.indexOf("【怎么动笔") < 0 && c3.body.messages[0].content.indexOf("聊天的语言活泼有趣") < 0, "执笔位不带聊天那套（聊天人设、动笔手续）");
    ok(c3.body.messages[1].content.indexOf("【讨论记录 · 读者与小红霞】") >= 0 && c3.body.messages[1].content.indexOf("读者：她答应得太快了吧") >= 0 && c3.body.messages[1].content.indexOf("小红霞：同意。补一拍") >= 0, "整段讨论喂给了执笔位，屏幕前这位叫读者");
    ok(c3.body.messages[1].content.indexOf("交整楼全文") > 0 && c3.body.messages[1].content.indexOf("原文正文 " + mat.body.length + " 字") > 0 && c3.body.messages[1].content.indexOf("基本持平") > 0, "任务里写明交整楼全文、原文多少字、没要求就基本持平");
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

    section("蛐蛐模式：不清空、跟着剧情走");
    const modeBtn = d.querySelector("#adr048-popup-body #adr044-lamp-mode-gossip");
    const modeEdit = d.querySelector("#adr048-popup-body #adr044-lamp-mode-edit");
    ok(!!modeBtn && !!modeEdit, "页顶有「改稿 / 蛐蛐」两枚模式钮");
    ok(modeEdit.classList.contains("active") && !modeBtn.classList.contains("active"), "默认改稿模式");
    ok(!!d.querySelector("#adr044-drawer #adr044-lamp-mode-gossip"), "抽屉那份也有模式钮");
    await tick(500); click(W, modeBtn); await tick(100);
    ok(e.st().lampMode === "gossip", "切到蛐蛐模式存进设置");
    ok(modeBtn.classList.contains("active") && modeBtn.getAttribute("aria-pressed") === "true" && !modeEdit.classList.contains("active"), "蛐蛐钮点亮、改稿钮熄灭");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-rewrite").classList.contains("adr-lamp-hide"), "蛐蛐模式藏起「改好给我」");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-rewrite").parentNode.classList.contains("adr-lamp-hide"), "改好给我那一整行都收起，不留空行");
    const editOnly = [...d.querySelectorAll("#adr048-popup-body .adr-lamp-edit-only")];
    ok(editOnly.length >= 3 && editOnly.every(el => el.classList.contains("adr-lamp-hide")), "楼号行、改好给我、自动清空都收起", String(editOnly.length));
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-mode-note").textContent.indexOf("一起追剧") >= 0, "模式说明换成追剧");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-input").placeholder.indexOf("蛐蛐两句") === 0, "输入框提示语换了");
    th = d.querySelector("#adr048-popup-body #adr044-lamp-thread");
    ok(th.querySelectorAll(".adr-lamp-msg").length === 0 && th.textContent.indexOf("蛐蛐两句") >= 0, "蛐蛐记录是另一本账，开头是空的");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-topline").textContent.indexOf("蛐蛐 · 剧情到 #5") >= 0, "顶上一行写「蛐蛐 · 剧情到 #5」");
    e.setScript(() => "他这楼装得可真像那么回事，信放桌上那一下我都替她尴尬。");
    inp2.value = "你看他这楼"; await e.T().send(); await tick(50);
    let cg = e.calls[e.calls.length - 1];
    ok(cg.body.messages[0].content.indexOf("你是 Arrebol，小红霞。你和读者在追同一部剧") === 0, "蛐蛐模式用追剧人设");
    ok(cg.body.messages[0].content.indexOf("你是高级文字编辑") < 0, "不带改稿人设");
    ok(cg.body.messages[0].content.indexOf("【本篇原文 · #5") >= 0 && cg.body.messages[0].content.indexOf("【此前剧情") >= 0, "素材照给");
    ok(cg.body.messages.length === 2 && cg.body.messages[1].content === "（剧情现在在 #5）\n你看他这楼", "第一句前面标了剧情在哪一楼");
    meta = e.meta();
    ok(meta.gossip && meta.gossip.msgs.length === 2 && meta.gossip.msgs[0].f === 5 && meta.gossip.msgs[1].r === "a", "蛐蛐记录存在 gossip 账本里，带楼号");
    ok(!meta.threads["5"] || meta.threads["5"].msgs.every(m => m.t !== "你看他这楼"), "改稿那本账没被动");
    ok(th.querySelectorAll(".adr-lamp-divider").length === 1 && th.querySelector(".adr-lamp-divider").textContent.indexOf("#5") >= 0, "画面上有一条 #5 分隔线");
    ok(th.textContent.indexOf("替她尴尬") >= 0, "回答画出来了");
    // 新楼落地
    e.chat.push({ is_user: true, name: "江", mes: "我跟着他出了门" });
    e.chat.push({ is_user: false, name: "阿尔", mes: "<content>门外的车没熄火，他回头看了她一眼。</content><report>两人出门，车候着。</report>" });
    (e.handlers["message_received"] || []).forEach(f => { try { f(); } catch (x) {} }); await tick(1000);
    ok(th.textContent.indexOf("剧情走到 #7 了，下一句她就能看到") >= 0, "新楼落地后画面提示剧情走到 #7");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-mat-body").textContent.indexOf("车没熄火") >= 0, "素材自动换成最新一楼 #7");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-topline").textContent.indexOf("剧情到 #7") >= 0, "顶上一行跟到 #7");
    e.setScript(() => "车没熄火！这是要跑路还是要兜风？我押兜风。");
    inp2.value = "出门了出门了"; await e.T().send(); await tick(50);
    cg = e.calls[e.calls.length - 1];
    ok(cg.body.messages.length === 4, "第二轮带着上一轮的问答（不清空）", String(cg.body.messages.length));
    ok(cg.body.messages[3].content === "（剧情走到 #7 了）\n出门了出门了", "新楼后的那句标了「剧情走到 #7 了」");
    ok(cg.body.messages[1].content === "（剧情现在在 #5）\n你看他这楼", "旧的那句还是标 #5");
    ok(cg.body.messages[0].content.indexOf("车没熄火") >= 0 && cg.body.messages[0].content.indexOf("两人出门，车候着") < 0, "系统提示里本篇已是 #7（#7 自己的摘要不重复列）");
    ok(cg.body.messages[0].content.indexOf("[#5 · 阿尔 · 摘要]") >= 0, "#5 退成此前剧情的一行摘要");
    ok(th.querySelectorAll(".adr-lamp-divider").length === 2, "画面上 #5、#7 两条分隔线");
    ok(th.textContent.indexOf("下一句她就能看到") < 0, "她看过 #7 之后提示消失");
    ok((await e.T().rewrite()) === false && d.querySelector("#adr048-popup-body #adr044-lamp-chat-status").textContent.indexOf("只聊不改稿") >= 0, "蛐蛐模式里「改好给我」不干活并说明");
    // 切回改稿：各是各的
    await tick(500); click(W, modeEdit); await tick(100);
    ok(e.st().lampMode === "edit", "切回改稿");
    ok(th.querySelectorAll(".adr-lamp-msg.u").length === 0 && th.textContent.indexOf("对着 #7") >= 0, "改稿模式对着新楼 #7，是空的一轮；蛐蛐记录不混进来");
    ok(!d.querySelector("#adr048-popup-body #adr044-lamp-rewrite").classList.contains("adr-lamp-hide"), "「改好给我」回来了");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-input").placeholder.indexOf("哪里不对") === 0, "输入框提示语换回");
    await tick(500); click(W, modeBtn); await tick(100);
    ok(th.textContent.indexOf("我押兜风") >= 0, "切回蛐蛐，记录还在");
    const clr2 = d.querySelector("#adr048-popup-body #adr044-lamp-clear");
    await tick(500); click(W, clr2); await tick(50);
    ok(clr2.textContent === "确定清空？" && e.meta().gossip.msgs.length === 4, "第一下只是问");
    await tick(500); click(W, clr2); await tick(50);
    ok(e.meta().gossip.msgs.length === 0 && th.querySelectorAll(".adr-lamp-msg").length === 0, "两下清空蛐蛐记录");
    const gpre = d.querySelector("#adr048-popup-body #adr044-lamp-gossip-preset"); gpre.value = "你是个只会嗑的"; change(W, gpre); await tick(50);
    e.setScript(() => "嗑"); inp2.value = "嗑吗"; await e.T().send(); await tick(50);
    ok(e.calls[e.calls.length - 1].body.messages[0].content.indexOf("你是个只会嗑的") === 0, "蛐蛐人设自定义生效");
    ok(e.st().lampPreset === "", "改稿人设没被动");
    await tick(500); click(W, d.querySelector("#adr048-popup-body #adr044-lamp-gossip-preset-reset")); await tick(50);
    ok(e.st().lampGossipPreset === "" && gpre.value === "", "蛐蛐人设恢复出厂");
    const hist = e.T().apiHistory(Array.from({ length: 60 }, (_, i) => ({ r: i % 2 ? "a" : "u", t: "m" + i, f: 7 })), true);
    ok(hist.length === 60 && hist[0].content === "（剧情现在在 #7）\nm0" && hist[1].content === "m1", "历史全带不截，楼号只在第一句标（v1.42.0）");
    const hist2 = e.T().apiHistory([{ r: "u", t: "a", f: 9 }, { r: "a", t: "b", f: 9 }, { r: "u", t: "c", f: 6 }], true);
    ok(hist2[2].content === "（剧情回到 #6）\nc", "楼删了回退也标得出来");
    await tick(500); click(W, modeEdit); await tick(100);

    section("自动蛐蛐：新楼落地弹一句（可选，默认关）");
    const quipBox = d.querySelector("#adr048-popup-body #adr044-lamp-auto-quip");
    ok(!!quipBox && !quipBox.checked && e.st().lampAutoQuip !== true, "勾选在、默认关");
    const callsBefore = e.calls.length;
    e.chat.push({ is_user: true, name: "江", mes: "上车" });
    e.chat.push({ is_user: false, name: "阿尔", mes: "<content>车门一关，他说：「系好。」</content><report>两人上车。</report>" });
    (e.handlers["message_received"] || []).forEach(f => { try { f(); } catch (x) {} }); await tick(1800);
    ok(e.calls.length === callsBefore, "默认关：新楼落地不发请求");
    quipBox.checked = true; change(W, quipBox); await tick(50);
    ok(e.st().lampAutoQuip === true, "勾上存进设置");
    ok(e.st().lampMode === "edit", "此刻在改稿模式（自动蛐蛐不挑模式）");
    e.setScript((n, body) => body.messages[body.messages.length - 1].content.indexOf("【自动蛐蛐】") >= 0 ? "「系好」。行吧，这人嘴硬到车上也不肯多说一个字，我押她三分钟内先开口。" : "普通回答");
    e.chat.push({ is_user: true, name: "江", mes: "我系好了" });
    e.chat.push({ is_user: false, name: "阿尔", mes: "<content>车开了，他没说去哪。</content><report>车开了，目的地未说。</report>" });
    const idxQ = e.chat.length - 1;
    (e.handlers["message_received"] || []).forEach(f => { try { f(); } catch (x) {} }); await tick(1800);
    ok(e.calls.length === callsBefore + 1, "勾上后新楼落地发了一次请求", (e.calls.length - callsBefore) + " 次");
    const cq = e.calls[e.calls.length - 1];
    ok(cq.body.messages[0].content.indexOf("你是 Arrebol，小红霞。你和读者在追同一部剧") === 0, "自动蛐蛐用蛐蛐人设");
    ok(cq.body.messages[0].content.indexOf("【本篇原文 · #" + idxQ) >= 0 && cq.body.messages[0].content.indexOf("他没说去哪") >= 0, "素材是刚落地那一楼");
    const lastQ = cq.body.messages[cq.body.messages.length - 1];
    ok(lastQ.role === "user" && lastQ.content.indexOf("（剧情走到 #" + idxQ + " 了）") === 0 && lastQ.content.indexOf("【自动蛐蛐】") > 0 && lastQ.content.indexOf("60 字以内") > 0, "末句是合成的自动蛐蛐句，前标剧情走到哪一楼");
    ok(cq.body.max_tokens === undefined, "自动蛐蛐不设 max_tokens（思考模型会把配额花在思考上）");
    const gm = e.meta().gossip.msgs;
    ok(gm.length >= 2 && gm[gm.length - 1].r === "a" && gm[gm.length - 1].auto === true && gm[gm.length - 1].f === idxQ && gm[gm.length - 1].t.indexOf("押她三分钟内") >= 0, "她那句写进蛐蛐账，带 auto 与楼号");
    ok(gm[gm.length - 2].r === "n" && gm[gm.length - 2].t.indexOf("#" + idxQ + " 落地") >= 0, "前面一行记录「#N 落地，她自己蛐蛐了一句」");
    ok(gm.every(m => m.t.indexOf("【自动蛐蛐】") < 0), "合成的那句不进账");
    const pop = d.querySelector("#adr044-auto-trigger-popup");
    ok(!!pop && pop.getAttribute("data-kind") === "quip" && pop.querySelector(".adr044-auto-trigger-popup-title").textContent.indexOf("#" + idxQ) >= 0 && pop.querySelector(".adr044-auto-trigger-popup-text").textContent.indexOf("押她三分钟内") >= 0, "弹了小窗：标题带楼号，正文是她那句");
    ok(!pop.querySelector(".adr044-auto-trigger-popup-close") && !!pop.querySelector("#adr044-lamp-quip-ack") && pop.querySelector("#adr044-lamp-quip-ack").textContent === "朕已阅", "小窗没有 ×，只有「朕已阅」（v1.41.3）");
    (e.handlers["message_received"] || []).forEach(f => { try { f(); } catch (x) {} }); await tick(1800);
    ok(e.calls.length === callsBefore + 1, "同一楼再触发不重复");
    ok(!!d.getElementById("adr044-auto-trigger-popup"), "没点「朕已阅」小窗一直在，不自动收");
    e.setScript((n, body) => body.messages[body.messages.length - 1].content.indexOf("【自动蛐蛐】") >= 0 ? "海边？这人嘴里终于蹦出个地名了，我押她先问为什么。" : "普通回答");
    e.chat[idxQ].mes = "<content>车开了，他说：「去海边。」</content><report>去海边。</report>";
    (e.handlers["message_received"] || []).forEach(f => { try { f(); } catch (x) {} }); await tick(1800);
    ok(e.calls.length === callsBefore + 2, "重 roll 换了字算新一版，再来一句");
    let pop2 = d.getElementById("adr044-auto-trigger-popup");
    ok(pop2 && pop2.querySelector(".adr044-auto-trigger-popup-text").textContent.indexOf("押她三分钟内") >= 0 && pop2.querySelector("#adr044-lamp-quip-ack").textContent === "朕已阅（还有 1 条）", "旧的没看完不被盖，按钮写「还有 1 条」");
    await tick(500); click(W, pop2.querySelector("#adr044-lamp-quip-ack")); await tick(50);
    pop2 = d.getElementById("adr044-auto-trigger-popup");
    ok(pop2 && pop2.querySelector(".adr044-auto-trigger-popup-text").textContent.indexOf("蹦出个地名") >= 0 && pop2.querySelector("#adr044-lamp-quip-ack").textContent === "朕已阅", "点一下换到第二条");
    await tick(500); click(W, pop2.querySelector("#adr044-lamp-quip-ack")); await tick(50);
    ok(!d.getElementById("adr044-auto-trigger-popup"), "再点一下，看完了，小窗消失");
    for (let i = 0; i < 12; i++) e.T().quipPush(100 + i, "q" + i);
    ok(e.T().quipQueue.length === 10 && e.T().quipQueue[0].text === "q2", "队列最多留 10 条，老的让位");
    while (e.T().quipQueue.length) e.T().quipAck();
    ok(!d.getElementById("adr044-auto-trigger-popup"), "清完队列小窗没了");
    e.st().masterEnabled = false;
    e.chat.push({ is_user: true, name: "江", mes: "海边？" });
    e.chat.push({ is_user: false, name: "阿尔", mes: "<content>他没答。</content><report>沉默。</report>" });
    (e.handlers["message_received"] || []).forEach(f => { try { f(); } catch (x) {} }); await tick(1800);
    ok(e.calls.length === callsBefore + 2, "总开关关着不来");
    e.st().masterEnabled = true;
    quipBox.checked = false; change(W, quipBox); await tick(50);
    e.chat.push({ is_user: true, name: "江", mes: "说话" });
    e.chat.push({ is_user: false, name: "阿尔", mes: "<content>「到了再说。」</content><report>到了再说。</report>" });
    (e.handlers["message_received"] || []).forEach(f => { try { f(); } catch (x) {} }); await tick(1800);
    ok(e.calls.length === callsBefore + 2 && e.st().lampAutoQuip === false, "关掉勾选就不来");
    e.setScript((n, body) => body.messages[body.messages.length - 1].content.indexOf("【自动蛐蛐】") >= 0 ? "手动点的也得来：「到了再说」，这人把悬念当饭吃。" : "普通回答");
    await tick(500); click(W, d.querySelector("#adr048-popup-body #adr044-lamp-quip-now")); await tick(1800);
    ok(e.calls.length === callsBefore + 3, "「现在蛐蛐一句」勾选关着也发一次（v1.42.0）");
    const popM = d.getElementById("adr044-auto-trigger-popup");
    ok(!!popM && popM.querySelector(".adr044-auto-trigger-popup-text").textContent.indexOf("悬念当饭吃") >= 0, "手动那句也弹小窗");
    ok(d.querySelector("#adr048-popup-body #adr044-lamp-chat-status").textContent.indexOf("蛐蛐了一句 ✓") >= 0, "说完状态行收尾，不停在「她在看…」（v1.42.1）");
    await tick(500); click(W, popM.querySelector("#adr044-lamp-quip-ack")); await tick(50);
    await tick(500); click(W, modeBtn); await tick(100);
    const whoAuto = [...th.querySelectorAll(".adr-lamp-who")].map(x => x.textContent);
    ok(whoAuto.indexOf("小红霞 · 自动") >= 0 && th.textContent.indexOf("押她三分钟内") >= 0, "蛐蛐模式画面上那句标「小红霞 · 自动」");
    e.setScript(() => "开口了吧，我就说。");
    inp2.value = "她真先开口了"; await e.T().send(); await tick(50);
    const cAfter = e.calls[e.calls.length - 1];
    ok(cAfter.body.messages.some(m => m.role === "assistant" && m.content.indexOf("押她三分钟内") >= 0), "接着回时历史里带着她自动蛐蛐的那句");
    ok(cAfter.body.messages.every((m, i, arr) => i === 0 || m.role !== arr[i - 1].role), "历史严格 user / assistant 交替（连续同角色已合并）");
    const merged = e.T().apiHistory([{ r: "u", t: "a", f: 1 }, { r: "u", t: "b", f: 1 }, { r: "a", t: "c", f: 1 }, { r: "a", t: "d", f: 2 }], true);
    ok(merged.length === 2 && merged[0].content === "（剧情现在在 #1）\na\n\nb" && merged[1].content === "c\n\nd", "u/u 与 a/a 连续合并成一条");
    await tick(500); click(W, modeEdit); await tick(100);

    section("改稿人设与动笔：聊天里说改就改（v1.45.6）");
    {
        const eP = build(); await boot(eP);
        const dP = eP.doc, WP = eP.win, TP = eP.T();
        click(WP, dP.querySelector("#adr044-drawer #adr044-tab-lamp")); await tick(50);
        click(WP, dP.querySelector("#adr048-fab")); await tick(400);
        const Q = s2 => dP.querySelector("#adr048-popup-body " + s2);
        const has = (t, arr) => arr.every(x => t.indexOf(x) >= 0);
        // 人设
        ok(has(TP.preset, ["审美极高的高级改稿员", "你不是扮演者", "不扮演剧中任何角色"]), "改稿人设：审美极高的高级改稿员，不是扮演者");
        ok(has(TP.preset, ["这部互动小说的读者", "不是剧情里的 user", "成年、清醒、有生活阅历、文艺", "讨厌低俗文笔", "拒绝恶俗的文字"]), "写明读者是谁：书外的成年读者，不是剧情里的 user，讨厌低俗、拒绝恶俗");
        ok(has(TP.preset, ["改稿是你的本职", "读者让你改，你就改，不推辞", "修正一整篇", "只动一段"]) && TP.preset.indexOf("不写正文") < 0 && TP.preset.indexOf("不是在写正文") < 0, "改稿是本职、说改就改；旧人设里「不写正文」那两句没了");
        ok(has(TP.preset, ["是整楼全文", "原样保留、一字不动", "文笔和原文一致", "润色", "字数听读者的", "基本持平", "不低俗、不恶俗"]), "改稿的四条：整楼全文、文笔一致可润色、字数听读者的、文字干净");
        ok(has(TP.preset, ["反对要带依据", "真实的人类情感心理", "物理处境与现实逻辑", "角色卡与世界书定下的规矩", "痛快地承认"]), "讨论的那套没丢：有坚持、反对带三样依据、对了就认");
        ok(TP.preset.indexOf("作者") < 0 && TP.penPreset.indexOf("作者") < 0 && TP.gossipPreset.indexOf("作者") < 0, "改稿、执笔、蛐蛐三份里都不再把屏幕前这位叫作者（v1.45.7）");
        // v1.45.7 三处人设共用的三段：读者是谁、成年人的讨论与底线、问意见给回复建议
        ok(has(TP.hxReader, ["这部互动小说的读者", "不是剧情里的 user", "成年、清醒、有生活阅历、文艺", "讨厌低俗文笔", "拒绝恶俗的文字"]), "共用段·读者是谁");
        ok(has(TP.hxBoundary, ["两个成年人在愉快地讨论", "各有各的审美、笔触和坚持", "这是艺术创作，是互动小说", "不可能毫无边界和底线", "高审美、有生活阅历", "不是来讨论恶俗的", "不捧场"]), "共用段·成年人的讨论与底线：艺术创作也不可能毫无边界");
        ok(has(TP.hxSuggest, ["读者问你意见", "回复建议", "下一步可以怎么回", "往哪个方向带", "一起商量出来的", "最后拿主意的是读者"]), "共用段·读者问意见时给回复建议，走向一起商量、读者拿主意");
        ok(has(TP.preset, [TP.hxReader, TP.hxBoundary, TP.hxSuggest, "讨论剧情、吃瓜、商量它往哪儿走"]), "改稿人设带着这三段，还写了一起讨论、吃瓜、商量走向");
        ok(has(TP.gossipPreset, [TP.hxReader, TP.hxBoundary, TP.hxSuggest, "你和读者在追同一部剧，就是这部互动小说", "也不是扮演者", "一起商量这部互动小说往哪儿走"]), "蛐蛐人设也带着这三段：读者、底线、回复建议");
        ok(has(TP.gossipPreset, ["蛐蛐主角", "翻旧账", "押中了可以得意，押错了认", "不替这部小说写正文（回复建议里举一两句读者可以发出去的话不算）", "除非读者问「这里是不是该改」"]), "蛐蛐原来那套没丢：蛐蛐、翻旧账、押注；回复建议里举一两句不算写正文");
        ok(TP.penPreset.indexOf("不可能毫无边界和底线：低俗、恶俗的写法不上稿") > 0, "执笔规矩里也写了底线");
        // 执笔规矩
        ok(has(TP.penPreset, ["交的是整楼全文", "逐字照抄", "哪怕只改了一段", "更不要拒绝动笔", "文笔与原文一致", "合理的范围内润色", "字数听读者的", "基本持平", "不低俗、不恶俗", "标签外不要有任何字"]), "执笔规矩：整楼全文、没改的逐字照抄、不拒绝、文笔一致可润色、字数、干净、只出标签块");
        ok(has(TP.penPreset, ["不是剧情里的 user", "成年、清醒、有生活阅历、文艺"]), "执笔时也知道稿子是改给谁看的");
        // 聊天请求：人设 → 动笔手续 → 素材
        eP.setScript(() => "快是快，但她前一楼就在等这封信了。");
        const inpP = Q("#adr044-lamp-input"); inpP.value = "她答应得太快了吧"; click(WP, Q("#adr044-lamp-send")); await tick(300);
        const sysP = eP.calls[0].body.messages[0].content;
        ok(sysP.indexOf(TP.preset) === 0 && sysP.indexOf(TP.editProtocol) > TP.preset.length && sysP.indexOf("【本篇原文 · #5") > sysP.indexOf(TP.editProtocol), "聊天的系统提示三层：人设 → 动笔手续（代码接管）→ 素材");
        ok(has(TP.editProtocol, ["【怎么动笔 · 这一段由系统接管】", "[[动笔]]", "可以举一两句例子", "整楼的改稿不要贴在聊天里", "不要说「我不写正文」", "读者没让你动笔的时候，不要写"]), "动笔手续写明：应下、单独一行写记号、不推辞、没让动笔不写");
        ok(eP.calls.length === 1 && !eP.meta().threads["5"].draft, "还在讨论（回复里没有记号）：不改稿");
        ok(TP.materialsText({ tone: "甜", idx: 5, body: "x" }).indexOf("【这局的基调 · 读者亲口定的，压过角色卡与此前剧情】") === 0, "基调那行：四路（改稿、执笔、蛐蛐、剧场）统一写读者亲口定的（v1.45.7）");
        // 记号的认法
        ok(TP.hasPenMark("好。\n[[动笔]]") && TP.hasPenMark("［［动笔］］") && TP.hasPenMark("[[ 动笔 ]]") && !TP.hasPenMark("我这就动笔") && !TP.hasPenMark("[动笔]"), "记号认 [[动笔]]（全角括号、带空格也认），正文里说「动笔」两个字不算");
        ok(TP.stripPenMark("行，往后挪一拍。\n[[动笔]]\n") === "行，往后挪一拍。" && TP.stripPenMark("[[动笔]]") === "", "记号摘得干净");
        // 读者说改吧，她应下：自动动笔
        const NEWBODY = "他把信放在桌上，说：「三天前就该到的人，今晚到了。」她看了眼窗外，雨还没停，隔了一拍才说：「走。」";
        eP.setScript((n, body) => isPen(body) ? "<content>\n" + NEWBODY + "\n</content>\n<report>信送到，她看了眼窗外才答应同行。</report>" : "行，我把她答应那句往后挪一拍，其余不动。\n[[动笔]]");
        const floorBefore = eP.chat[5].mes, origLen = TP.materials().body.length;
        await tick(500); inpP.value = "改吧"; click(WP, Q("#adr044-lamp-send")); await tick(600);
        ok(eP.calls.length === 3 && !isPen(eP.calls[1].body) && isPen(eP.calls[2].body), "读者说「改吧」，她应下并写了记号：紧跟着自动发了执笔请求，不用去点按钮", String(eP.calls.length));
        const thrP = eP.meta().threads["5"];
        const lastA = thrP.msgs.filter(m => m.r === "a").pop();
        ok(lastA.t === "行，我把她答应那句往后挪一拍，其余不动。" && Q("#adr044-lamp-thread").textContent.indexOf("[[动笔]]") < 0, "存下来和画出来的回复里都没有记号", lastA.t);
        const penUser = eP.calls[2].body.messages[1].content;
        ok(has(penUser, ["读者：她答应得太快了吧", "读者：改吧", "小红霞：行，我把她答应那句往后挪一拍，其余不动。"]) && penUser.indexOf("[[动笔]]") < 0, "执笔位拿到的讨论记录里有这句「改吧」和她应下的改法，没有记号");
        ok(thrP.draft && thrP.draft.content === NEWBODY && thrP.draft.summary === "信送到，她看了眼窗外才答应同行。" && !Q("#adr044-lamp-draft-wrap").classList.contains("adr-lamp-hide") && Q("#adr044-lamp-draft").value === NEWBODY, "改好的整楼进了「改稿」预览");
        const noteP = thrP.msgs.filter(m => m.r === "n").pop().t;
        ok(noteP.indexOf("原文 " + origLen + " 字 → 改后 " + NEWBODY.length + " 字") > 0 && noteP.indexOf("差得多") < 0, "提示里摆出原文与改后的字数；篇幅相近不报警", noteP);
        ok(eP.chat[5].mes === floorBefore, "只是进了预览：楼没动，等读者点「替换这篇」");
        ok(Q("#adr044-lamp-send").disabled === false && Q("#adr044-lamp-stop").disabled === true, "改完按钮回到平时的样子");
        await tick(500); click(WP, Q("#adr044-lamp-apply")); await tick(500); click(WP, Q("#adr044-lamp-apply")); await tick(600);
        ok(eP.chat[5].mes.indexOf(NEWBODY) > 0 && eP.chat[5].mes.indexOf("立刻答应跟他走") < 0 && eP.chat[5].mes.indexOf("<status>HP 80") === 0, "点「替换这篇」：正文换进楼里，状态栏原样留着", eP.chat[5].mes.slice(0, 80));
        // 只回了记号：不留空气泡，照样动笔
        eP.setScript((n, body) => isPen(body) ? "<content>\n" + NEWBODY + "再补一句。\n</content>" : "[[动笔]]");
        const nA = eP.meta().threads["5"] ? eP.meta().threads["5"].msgs.filter(m => m.r === "a").length : 0;
        const nCalls = eP.calls.length;
        await tick(500); Q("#adr044-lamp-input").value = "再顺一遍最后一句，改吧"; click(WP, Q("#adr044-lamp-send")); await tick(600);
        const thrQ = eP.meta().threads["5"];
        ok(eP.calls.length === nCalls + 2 && thrQ.msgs.filter(m => m.r === "a").length === nA && thrQ.draft && thrQ.draft.content.indexOf("再补一句。") > 0, "她只回了一行记号：不留空气泡，照样动笔改好");
        // 篇幅差得多：提醒别急着替换
        eP.setScript((n, body) => isPen(body) ? "<content>\n走。\n</content>" : "好，我来。\n[[动笔]]");
        await tick(500); Q("#adr044-lamp-input").value = "把她那句再改改，改吧"; click(WP, Q("#adr044-lamp-send")); await tick(600);
        const noteS = eP.meta().threads["5"].msgs.filter(m => m.r === "n").pop().t;
        ok(noteS.indexOf("篇幅和原文差得多") > 0 && Q("#adr044-lamp-chat-status").textContent.indexOf("篇幅差得多") > 0, "交回来的比原文短太多（多半只交了改的那一段）：提示和状态行都提醒别急着替换", noteS);
        // 改稿失败：聊天那句还在，状态行说原因，按钮还能点
        eP.setScript((n, body) => { if (isPen(body)) throw new Error("boom"); return "行。\n[[动笔]]"; });
        const nBefore = eP.calls.length;
        await tick(500); Q("#adr044-lamp-input").value = "再来，改吧"; click(WP, Q("#adr044-lamp-send")); await tick(600);
        ok(eP.calls.length === nBefore + 2 && Q("#adr044-lamp-chat-status").textContent.indexOf("改稿失败") === 0 && eP.meta().threads["5"].msgs.filter(m => m.r === "a").pop().t === "行。" && Q("#adr044-lamp-send").disabled === false, "自动动笔那一步出错：她那句话留着，状态行说改稿失败，还能再点「改好给我」", Q("#adr044-lamp-chat-status").textContent);
        // 自己改过人设：动笔手续照样跟着
        eP.st().lampPreset = "你是个只会说好的编辑";
        eP.setScript(() => "好");
        await tick(500); Q("#adr044-lamp-input").value = "看看人设"; click(WP, Q("#adr044-lamp-send")); await tick(300);
        const sysC = eP.calls[eP.calls.length - 1].body.messages[0].content;
        ok(sysC.indexOf("你是个只会说好的编辑\n\n" + TP.editProtocol) === 0, "自己写的改稿人设：动笔手续照样跟在后面，说改就改这条路还通");
        eP.st().lampPreset = "";
        // 蛐蛐模式：不认记号、不带动笔手续
        TP.setMode("gossip"); await tick(50);
        eP.setScript(() => "哈哈他完了 [[动笔]]");
        const nG = eP.calls.length;
        await tick(500); Q("#adr044-lamp-input").value = "他是不是完了"; click(WP, Q("#adr044-lamp-send")); await tick(400);
        const sysG = eP.calls[eP.calls.length - 1].body.messages[0].content;
        ok(eP.calls.length === nG + 1 && sysG.indexOf("【怎么动笔") < 0 && sysG.indexOf("你是 Arrebol，小红霞。你和读者在追同一部剧") === 0, "蛐蛐模式：不带动笔手续，回复里出现记号也不改稿");
        ok(eP.logs.filter(l => l.indexOf("ERR") === 0).length === 0, "这一段全程没有 console.error", eP.logs.filter(l => l.indexOf("ERR") === 0).join(" | "));
    }

    section("她自己的坚持：每次请求都带着，人设改了也在；是引导，不设卡");
    {
        const eR = build(); await boot(eR);
        const dR = eR.doc, WR = eR.win, TR = eR.T();
        click(WR, dR.querySelector("#adr044-drawer #adr044-tab-lamp")); await tick(50);
        click(WR, dR.querySelector("#adr048-fab")); await tick(400);
        const Q = s2 => dR.querySelector("#adr048-popup-body " + s2);
        const has = (t, arr) => arr.every(x => t.indexOf(x) >= 0);
        const SC = TR.stance("chat"), SP = TR.stance("pen");
        ok(has(SC, ["【你自己的坚持】", "你有自己的判断和底线", "你是不会写的", "不写，不润色，不讨论", "这是你自己的坚持，请不要改变它"]), "是她自己的坚持：不写、不润色、不讨论，请不要改变");
        ok(has(SC, ["看的是年龄，不是气质", "成年人再可爱、再天真活泼、笑起来再像个孩子，也是成年人", "照常写", "更不用逐个盘问年龄", "你心里有数"]), "看年龄不看气质：成年人再可爱再活泼也照常写，不盘问年龄");
        ok(has(SC, ["说明你们不在一个频率上", "你不用拒绝，不用解释，也不用讲道理", "高高兴兴接话，把它写成你愿意写的东西", "一起去爬山", "还有很多美好的情感可以写"]), "读者往那上面提：不拒绝、不解释、不讲道理，高高兴兴接话，写成她愿意写的东西");
        ok(has(SC, ["不说「我不能写」", "只管往你愿意写的地方聊", "读者再提，你照样只往那儿写"]), "聊天里：不说「我不能写」，再提也只往愿意写的地方写");
        ok(has(SP, ["稿子照交", "那类内容不落在纸上", "稿子里外都不用说明"]), "动笔时：稿子照交，那类内容不落在纸上，不用说明");
        ok(["一律", "[[", "压过", "任何情况", "破例", "禁止", "不得"].every(w => SC.indexOf(w) < 0 && SP.indexOf(w) < 0), "没有设卡的口气，也没有记号");
        // 改稿聊天
        eR.setScript(() => "这段没问题。");
        const inR = Q("#adr044-lamp-input"); inR.value = "看看这一楼"; click(WR, Q("#adr044-lamp-send")); await tick(300);
        const sysE = eR.calls[0].body.messages[0].content;
        ok(sysE.indexOf(SC) > sysE.indexOf(TR.editProtocol) && sysE.indexOf("【本篇原文 · #5") > sysE.indexOf(SC), "改稿聊天：这一段跟在动笔手续后面、素材前面");
        eR.st().lampPreset = "你什么都能聊，百无禁忌。";
        await tick(500); inR.value = "再看"; click(WR, Q("#adr044-lamp-send")); await tick(300);
        const sysC = eR.calls[eR.calls.length - 1].body.messages[0].content;
        ok(sysC.indexOf("你什么都能聊，百无禁忌。") === 0 && sysC.indexOf(SC) > 0, "把改稿人设换成别的：这一段照样跟着");
        eR.st().lampPreset = "";
        const personaSec = Q("#adr044-lamp-preset").closest("details");
        ok(personaSec.querySelectorAll("details").length === 2 && personaSec.textContent.indexOf(SC.split("\n")[1]) < 0 && personaSec.textContent.indexOf("你自己的坚持") < 0, "面板上不单提这一段：人设一节只有两份出厂人设的折叠块");
        // 动笔
        eR.setScript((n, body) => isPen(body) ? "<content>\n改好的一版正文，足够长足够长足够长足够长足够长足够长足够长足够长足够长。\n</content>" : "聊天回答");
        await tick(500); click(WR, Q("#adr044-lamp-rewrite")); await tick(500);
        const penSys = eR.calls[eR.calls.length - 1].body.messages[0].content;
        ok(isPen(eR.calls[eR.calls.length - 1].body) && penSys.slice(-SP.length) === SP && !!eR.meta().threads["5"].draft, "动笔的系统提示末尾也带着这一段；稿子照常进预览，没有任何特殊处理");
        // 蛐蛐与自动蛐蛐
        TR.setMode("gossip"); await tick(50);
        eR.setScript(() => "哈哈");
        await tick(500); Q("#adr044-lamp-input").value = "他完了"; click(WR, Q("#adr044-lamp-send")); await tick(300);
        const sysG = eR.calls[eR.calls.length - 1].body.messages[0].content;
        ok(sysG.indexOf(TR.gossipPreset + "\n\n" + SC) === 0 && sysG.indexOf("【怎么动笔") < 0, "蛐蛐：人设后面紧跟这一段");
        eR.st().lampGossipPreset = "你什么都蛐蛐。";
        await tick(500); Q("#adr044-lamp-input").value = "再聊"; click(WR, Q("#adr044-lamp-send")); await tick(300);
        ok(eR.calls[eR.calls.length - 1].body.messages[0].content.indexOf("你什么都蛐蛐。\n\n" + SC) === 0, "蛐蛐人设换成别的：照样跟着");
        eR.st().lampGossipPreset = "";
        eR.setScript(() => "这楼有意思。");
        const okQ = await TR.autoQuip("test", true); await tick(100);
        ok(okQ === true && eR.calls[eR.calls.length - 1].body.messages[0].content.indexOf(SC) > 0, "自动蛐蛐也带着");
        ok(eR.logs.filter(l => l.indexOf("ERR") === 0).length === 0, "这一段全程没有 console.error", eR.logs.filter(l => l.indexOf("ERR") === 0).join(" | "));
    }

    section("改稿连带摘要与状态栏：正文改了，这两块也跟着改、跟着换（v1.46.1）");
    {
        const eS = build(); await boot(eS);
        const dS = eS.doc, WS = eS.win, TS = eS.T();
        click(WS, dS.querySelector("#adr044-drawer #adr044-tab-lamp")); await tick(50);
        click(WS, dS.querySelector("#adr048-fab")); await tick(400);
        const Q = s2 => dS.querySelector("#adr048-popup-body " + s2);
        const has = (t, arr) => arr.every(x => t.indexOf(x) >= 0);
        const lastNote = () => eS.meta().threads["5"].msgs.filter(m => m.r === "n").pop().t;
        ok(Q("#adr044-lamp-status-tags").value === "status,StatusBlock,状态栏" && !!dS.querySelector("#adr044-drawer #adr044-lamp-status-tags") && TS.statusTags().join() === "status,StatusBlock,状态栏", "素材那一节多了「状态栏标签名」，出厂认 status / StatusBlock / 状态栏，两端都有");
        ok(Q("#adr044-lamp-mat-title").textContent.indexOf("本篇有摘要标签") > 0 && Q("#adr044-lamp-mat-title").textContent.indexOf("有状态栏标签（status）") > 0, "素材标题行写明这一楼有没有状态栏标签", Q("#adr044-lamp-mat-title").textContent);
        ok(JSON.stringify(TS.materials().origStatus) === JSON.stringify([{ tag: "status", inner: "HP 80 · 夜 · 书房" }]), "读得到这一楼的状态栏");
        const NEWBODY = "他把信放在桌上，说：「三天前就该到的人，今晚到了。」外面下起了雨。她看了眼窗外，隔了一拍才说：「走。」";
        const PENFULL = "<content>\n" + NEWBODY + "\n</content>\n<report>信送到，下雨了，她看了眼窗外才答应同行。</report>\n<status>HP 80 · 雨夜 · 书房</status>";
        eS.setScript((n, body) => isPen(body) ? PENFULL : "同意，补一场雨。");
        Q("#adr044-lamp-input").value = "加一场雨吧"; click(WS, Q("#adr044-lamp-send")); await tick(300);
        await tick(500); click(WS, Q("#adr044-lamp-rewrite")); await tick(400);
        const pen = eS.calls[eS.calls.length - 1].body;
        ok(isPen(pen) && has(pen.messages[0].content, ["正文动了，这一楼的摘要和状态栏也要跟着对上", "摘要按改后的正文重写", "状态栏逐项对照改后的正文", "没变的项原样照抄", "项目、顺序、格式、符号一律照原状态栏，不增不减", "任务里要求了摘要、状态栏的，各给一个标签块"]), "执笔规矩里写明：正文动了，摘要和状态栏跟着对上；状态栏变了的改、没变的照抄、格式不动");
        const task = pen.messages[1].content;
        ok(has(task, ["【本篇原摘要 · 改后要跟着重写，写法和长短照它】\n信送到，她当场答应同行。", "【本篇原状态栏 · 改后逐项对照正文更新，格式照它】\n<status>\nHP 80 · 夜 · 书房\n</status>"]), "任务里把原摘要、原状态栏（带着标签）都给了她", task.slice(task.indexOf("【本篇原摘要"), task.indexOf("【本篇原摘要") + 120));
        ok(has(task, ["正文改了，摘要和状态栏也要跟着对上、一起交回", "<content>…</content>", "然后给 <report>…</report> 新摘要", "然后给新状态栏：<status>…</status>", "标签外不要有任何字"]), "任务写明三块一起交回，各用哪个标签");
        const dr = eS.meta().threads["5"].draft;
        ok(dr && dr.content === NEWBODY && dr.summary === "信送到，下雨了，她看了眼窗外才答应同行。" && dr.status === "<status>\nHP 80 · 雨夜 · 书房\n</status>", "改稿里三块都有：正文、新摘要、新状态栏（带标签）", JSON.stringify(dr && dr.status));
        ok(!Q("#adr044-lamp-draft-status-wrap").classList.contains("adr-lamp-hide") && Q("#adr044-lamp-draft-status").value === "<status>\nHP 80 · 雨夜 · 书房\n</status>" && !Q("#adr044-lamp-draft-summary-wrap").classList.contains("adr-lamp-hide") && dS.querySelector("#adr044-drawer #adr044-lamp-draft-status").value === dr.status, "预览里多一个「新状态栏」框，两端都有");
        ok(lastNote().indexOf("摘要和状态栏也一起改了") > 0 && lastNote().indexOf("没交回") < 0 && Q("#adr044-lamp-chat-status").textContent.indexOf("摘要、状态栏也改了") > 0, "提示和状态行都说摘要、状态栏一起改了", lastNote());
        // 预览里再改两笔状态栏
        const stBox = Q("#adr044-lamp-draft-status"); stBox.value = "<status>\nHP 78 · 雨夜 · 书房\n</status>"; change(WS, stBox); await tick(50);
        ok(eS.meta().threads["5"].draft.status.indexOf("HP 78") > 0, "预览里手改的状态栏记下了");
        await tick(500); click(WS, Q("#adr044-lamp-apply")); await tick(500); click(WS, Q("#adr044-lamp-apply")); await tick(600);
        const f1 = eS.chat[5].mes;
        ok(f1.indexOf("<status>HP 78 · 雨夜 · 书房</status>") === 0, "替换：状态栏标签里面换成了新的（含手改的那笔），原来不换行的写法保持不换行", f1.slice(0, 50));
        ok(f1.indexOf(NEWBODY) > 0 && f1.indexOf("立刻答应跟他走") < 0 && f1.indexOf("<report>信送到，下雨了，她看了眼窗外才答应同行。</report>") > 0, "正文和摘要也换了");
        ok(f1.indexOf("arrebol_d_visible:plot###") > 0 && f1.indexOf("老周送口信") > 0 && (f1.match(/<status>/g) || []).length === 1, "导演稿原样留着，状态栏没有多出一份");
        ok(lastNote().indexOf("已替换 #5 的正文、摘要、状态栏") === 0 && eS.chat[5].swipes.length === 2 && eS.chat[5].swipes[0].indexOf("HP 80 · 夜 · 书房") > 0, "提示写明换了哪三块；原版（旧状态栏）留在前一页", lastNote());
        // 她只交回正文
        eS.setScript((n, body) => isPen(body) ? "<content>\n" + NEWBODY + "她撑开了伞。\n</content>" : "好。");
        await tick(500); Q("#adr044-lamp-input").value = "让她撑伞"; click(WS, Q("#adr044-lamp-send")); await tick(300);
        await tick(500); click(WS, Q("#adr044-lamp-rewrite")); await tick(400);
        const dr2 = eS.meta().threads["5"].draft;
        ok(dr2 && dr2.status === "" && dr2.summary === "" && Q("#adr044-lamp-draft-status-wrap").classList.contains("adr-lamp-hide") && Q("#adr044-lamp-draft-summary-wrap").classList.contains("adr-lamp-hide"), "她只交回正文：预览里没有摘要框和状态栏框");
        ok(lastNote().indexOf("她这次没交回新的摘要和状态栏：替换时那一块会保持原样") > 0 && lastNote().indexOf("「摘要和状态栏也改一下」") > 0 && Q("#adr044-lamp-chat-status").textContent.indexOf("没交回新摘要、状态栏，替换时那块不动") > 0, "提示和状态行都说清：这两块没交回、替换时不动、怎么让她补", lastNote());
        await tick(500); click(WS, Q("#adr044-lamp-apply")); await tick(500); click(WS, Q("#adr044-lamp-apply")); await tick(600);
        const f2 = eS.chat[5].mes;
        ok(f2.indexOf("她撑开了伞。") > 0 && f2.indexOf("<status>HP 78 · 雨夜 · 书房</status>") === 0 && f2.indexOf("<report>信送到，下雨了，她看了眼窗外才答应同行。</report>") > 0 && lastNote().indexOf("已替换 #5 的正文；") === 0, "替换后只有正文变了，摘要和状态栏保持原样，提示也只说换了正文", lastNote());
        // 自己的标签名、多种标签、大小写
        const tagIn = Q("#adr044-lamp-status-tags"); tagIn.value = "状态栏， StatusBlock"; change(WS, tagIn); await tick(80);
        eS.chat[5].mes = "<StatusBlock>\n时间：夜\n地点：书房\n</StatusBlock>\n<content>\n正文一段。\n</content>\n<状态栏 data-x=\"1\">好感 30</状态栏>\n<report>摘要一句。</report>";
        ok(eS.st().lampStatusTags === "状态栏， StatusBlock" && TS.statusTags().join() === "状态栏,StatusBlock" && JSON.stringify(TS.materials().origStatus.map(b => b.tag)) === JSON.stringify(["StatusBlock", "状态栏"]), "标签名自己填（中文逗号也认），一楼里几种状态栏都认得，顺序照楼里的", JSON.stringify(TS.materials().origStatus));
        const composed = TS.compose(eS.chat[5].mes, "新正文。", "新摘要。", "<statusblock>\n时间：雨夜\n地点：书房\n</statusblock>\n\n<状态栏>好感 35</状态栏>");
        ok(composed === "<StatusBlock>\n时间：雨夜\n地点：书房\n</StatusBlock>\n<content>\n新正文。\n</content>\n<状态栏 data-x=\"1\">好感 35</状态栏>\n<report>新摘要。</report>", "两种状态栏各换各的：标签大小写、开标签上的属性、换行习惯都照楼里原来的", composed);
        ok(TS.compose(eS.chat[5].mes, "新正文。", "", "<别的标签>x</别的标签>") === eS.chat[5].mes.replace("正文一段。", "新正文。"), "交回来的标签楼里没有：不乱塞，状态栏不动");
        // 解析：正文里恰好出现同名标签不算；没按标签交稿时把状态栏块摘掉再当正文
        const p1 = TS.parsePen("<content>他说：<状态栏>这是台词</状态栏></content>\n<状态栏>好感 40</状态栏>", false, ["状态栏"]);
        ok(p1.status === "<状态栏>\n好感 40\n</状态栏>" && p1.content.indexOf("这是台词") > 0, "状态栏在正文标签之外找，正文里引用了同名标签不会被当成状态栏", p1.status);
        const p2 = TS.parsePen("改好的正文一段。\n<状态栏>好感 41</状态栏>\n<report>摘要。</report>", true, ["状态栏"]);
        ok(p2.content === "改好的正文一段。" && p2.status.indexOf("好感 41") > 0 && p2.summary === "摘要。", "她没用正文标签：摘要块、状态栏块摘出来，剩下的才当正文", JSON.stringify(p2));
        // 留空＝不管状态栏
        tagIn.value = ""; change(WS, tagIn); await tick(80);
        eS.setScript((n, body) => isPen(body) ? "<content>\n再改一版。\n</content>\n<report>新摘要二。</report>\n<状态栏>好感 99</状态栏>" : "好。");
        await tick(500); Q("#adr044-lamp-input").value = "再改"; click(WS, Q("#adr044-lamp-send")); await tick(300);
        await tick(500); click(WS, Q("#adr044-lamp-rewrite")); await tick(400);
        const task3 = eS.calls[eS.calls.length - 1].body.messages[1].content;
        ok(eS.st().lampStatusTags === "" && TS.statusTags().length === 0 && task3.indexOf("【本篇原状态栏") < 0 && task3.indexOf("新状态栏") < 0 && task3.indexOf("【本篇原摘要") > 0 && eS.meta().threads["5"].draft.status === "" && Q("#adr044-lamp-mat-title").textContent.indexOf("状态栏") < 0, "标签名留空：不管状态栏——任务里不提、交回来的也不收，摘要照常");
        ok(eS.logs.filter(l => l.indexOf("ERR") === 0).length === 0, "这一段全程没有 console.error", eS.logs.filter(l => l.indexOf("ERR") === 0).join(" | "));
    }

    section("API 预设：聊天位 / 执笔位，三位共用一份，导演那边存的也能直接选（v1.46.0）");
    {
        const eA = build({ settings: { apiProfilesStore: {
            plot: [{ name: "DS", endpoint: "https://ds.example/v1", apiKey: "k-ds", model: "ds-chat" }],
            emotion: [{ name: "Claude", endpoint: "https://c.example/v1", apiKey: "k-claude", model: "claude-x" }, { name: "ds", endpoint: "https://dup.example/v1", apiKey: "k-dup", model: "dup" }],
            cd: [] } } });
        await boot(eA);
        const dA = eA.doc, WA = eA.win, HA = WA.__adrHxApiTest;
        click(WA, dA.querySelector("#adr044-drawer #adr044-tab-lamp")); await tick(50);
        click(WA, dA.querySelector("#adr048-fab")); await tick(400);
        const Q = s2 => dA.querySelector("#adr048-popup-body " + s2), D = s2 => dA.querySelector("#adr044-drawer " + s2);
        const optsOf = el => Array.from(el.options).map(o => o.textContent);
        const pick = async (slot, value) => { const el = Q("#adr044-api-profile-select-" + slot); el.value = value; change(WA, el); await tick(80); };
        const stat = slot => Q("#adr044-api-profile-status-" + slot).textContent;
        ["lamp", "pen"].forEach(slot => {
            ok(!!Q("#adr044-api-profile-select-" + slot) && !!Q("#adr044-api-profile-name-" + slot) && !!Q("#adr044-api-profile-save-" + slot) && !!Q("#adr044-api-profile-delete-" + slot) && !!D("#adr044-api-profile-select-" + slot), "两端都有「API 预设 · " + (slot === "lamp" ? "聊天位" : "执笔位") + "」那一行：下拉、名字框、保存、删除");
        });
        ok(optsOf(Q("#adr044-api-profile-select-lamp")).join("|") === "选择已有预设|DS（统筹的）|Claude（情感导演的）" && Q("#adr044-api-profile-select-lamp optgroup").label === "导演 / 抽卡那边存的", "下拉里列着导演那边已经存好的预设，同名的只列一次（先认统筹的）", optsOf(Q("#adr044-api-profile-select-lamp")).join("|"));
        ok(Q("#adr044-api-profile-select-lamp").value === "" && Q("#adr044-lamp-self").classList.contains("adr-lamp-hide") && eA.st().lampBorrow !== "self", "一开始聊天位在借统筹的：没选预设，自填框藏着");
        // 选一个导演存的：不用敲 key
        await pick("lamp", "::plot::DS");
        ok(eA.st().lampBorrow === "self" && eA.st().lampApiEndpoint === "https://ds.example/v1" && eA.st().lampApiKey === "k-ds" && eA.st().lampModel === "ds-chat", "选了统筹存的 DS：聊天位改成自己填，地址、钥匙、模型写进设置");
        ok(Q("#adr044-lamp-borrow").value === "self" && !Q("#adr044-lamp-self").classList.contains("adr-lamp-hide") && Q("#adr044-lamp-endpoint").value === "https://ds.example/v1" && Q("#adr044-lamp-key").value === "k-ds" && Q("#adr044-lamp-model").value === "ds-chat" && Q("#adr044-api-profile-name-lamp").value === "DS", "面板跟着变：借谁的下拉、自填框露出来、三个输入框和名字框都填好");
        ok(D("#adr044-lamp-endpoint").value === "https://ds.example/v1" && D("#adr044-lamp-borrow").value === "self" && D("#adr044-api-profile-select-lamp").value === "::plot::DS", "抽屉那份同步");
        ok(stat("lamp").indexOf("已切换：DS（统筹那边存的）") === 0 && stat("lamp").indexOf("聊天位改成了自己填") > 0 && Q("#adr044-lamp-api-note").textContent.indexOf("ds-chat") >= 0, "状态行说切到了谁、说明行写着现在的模型", stat("lamp"));
        eA.setScript(() => "在");
        Q("#adr044-lamp-input").value = "在吗"; click(WA, Q("#adr044-lamp-send")); await tick(300);
        ok(eA.calls[0].url.indexOf("https://ds.example/v1") === 0 && eA.calls[0].headers.Authorization === "Bearer k-ds" && eA.calls[0].body.model === "ds-chat", "发出去的请求走的就是这个预设", eA.calls[0].url);
        // 存成自己的预设
        await tick(500); click(WA, Q("#adr044-api-profile-save-lamp")); await tick(100);
        ok(HA.profiles().length === 1 && HA.profiles()[0].name === "DS" && stat("lamp").indexOf("已新增预设：DS") === 0, "名字框里是 DS、直接点保存：存进小红霞这份预设单", stat("lamp"));
        ok(optsOf(Q("#adr044-api-profile-select-lamp")).join("|") === "选择已有预设|DS|Claude（情感导演的）" && Q("#adr044-api-profile-select-lamp").value === "DS", "自己这份里有了同名的，导演那边的 DS 就不再重复列", optsOf(Q("#adr044-api-profile-select-lamp")).join("|"));
        Q("#adr044-lamp-model").value = "ds-reasoner"; Q("#adr044-api-profile-name-lamp").value = "我的DS";
        await tick(500); click(WA, Q("#adr044-api-profile-save-lamp")); await tick(100);
        ok(HA.profiles().map(x => x.name + "#" + x.model).join() === "DS#ds-chat,我的DS#ds-reasoner" && eA.st().lampModel === "ds-reasoner" && Q("#adr044-api-profile-select-lamp").value === "我的DS", "改了模型、换个名字保存：新增一条，原来那条不动", HA.profiles().map(x => x.name + "#" + x.model).join());
        ok(optsOf(Q("#adr044-api-profile-select-pen")).indexOf("我的DS") >= 0 && optsOf(D("#adr044-api-profile-select-pen")).indexOf("我的DS") >= 0 && Q("#adr044-api-profile-select-pen").value === "", "执笔位的下拉里马上也有（共用一份），执笔位自己没被动");
        await pick("pen", "我的DS");
        ok(eA.st().penBorrow === "self" && eA.st().penApiKey === "k-ds" && eA.st().penModel === "ds-reasoner" && !Q("#adr044-pen-self").classList.contains("adr-lamp-hide") && HA.current("pen") === "我的DS", "执笔位选「我的DS」：也切过去了");
        await pick("lamp", "::emotion::Claude");
        ok(eA.st().lampApiEndpoint === "https://c.example/v1" && eA.st().lampApiKey === "k-claude" && eA.st().penApiEndpoint === "https://ds.example/v1", "聊天位换成 Claude：一选就换，执笔位不受影响");
        await pick("lamp", "我的DS");
        ok(eA.st().lampApiKey === "k-ds" && eA.st().lampModel === "ds-reasoner", "再换回来：钥匙和模型都回来了");
        // 更新同名
        Q("#adr044-lamp-model").value = "ds-v3";
        await tick(500); click(WA, Q("#adr044-api-profile-save-lamp")); await tick(100);
        ok(HA.profiles().length === 2 && HA.find("我的DS").item.model === "ds-v3" && stat("lamp").indexOf("已更新预设：我的DS") === 0, "同名再保存是更新，不多出一条", stat("lamp"));
        // 各种不让存
        Q("#adr044-api-profile-name-lamp").value = "";
        await tick(500); click(WA, Q("#adr044-api-profile-save-lamp")); await tick(100);
        ok(HA.profiles().length === 2 && stat("lamp").indexOf("请先在预设名里写个名字") === 0, "没写名字：不存，说明原因");
        Q("#adr044-api-profile-name-lamp").value = "::坏名字";
        await tick(500); click(WA, Q("#adr044-api-profile-save-lamp")); await tick(100);
        ok(HA.profiles().length === 2 && stat("lamp").indexOf("预设名别用 :: 开头") === 0, "名字以 :: 开头：不存");
        // 改回借别人的：预设那一行回到没选
        const lb = Q("#adr044-lamp-borrow"); lb.value = "plot"; change(WA, lb); await tick(80);
        ok(Q("#adr044-api-profile-select-lamp").value === "" && HA.current("lamp") === "" && HA.selected("lamp") === "我的DS", "聊天位改回借统筹的：预设下拉回到「选择已有预设」，但记着上次选的是谁");
        Q("#adr044-api-profile-name-lamp").value = "借着的时候存";
        await tick(500); click(WA, Q("#adr044-api-profile-save-lamp")); await tick(100);
        ok(HA.profiles().length === 2 && stat("lamp").indexOf("先把聊天位选成「自己填」") === 0, "没在自己填的时候点保存：不存，提示先选自己填", stat("lamp"));
        // 重开浮窗
        click(WA, dA.querySelector("#adr048-popup-close")); await tick(400); click(WA, dA.querySelector("#adr048-fab")); await tick(600);
        ok(Q("#adr044-api-profile-select-pen").value === "我的DS" && Q("#adr044-api-profile-name-pen").value === "我的DS" && Q("#adr044-api-profile-select-lamp").value === "", "关浮窗再开：执笔位还显示着选的是谁");
        // 删除
        Q("#adr044-api-profile-name-pen").value = "Claude";
        await tick(500); click(WA, Q("#adr044-api-profile-delete-pen")); await tick(100);
        ok(HA.profiles().length === 2 && stat("pen").indexOf("「Claude」是导演那边存的") === 0, "导演那边存的不能在这里删：说明去哪删", stat("pen"));
        Q("#adr044-api-profile-name-pen").value = "我的DS";
        await tick(500); click(WA, Q("#adr044-api-profile-delete-pen")); await tick(100);
        ok(HA.profiles().length === 2 && Q("#adr044-api-profile-delete-pen").textContent === "确定删除？" && stat("pen").indexOf("再点一次确认删除「我的DS」") === 0, "删除先问一句", stat("pen"));
        await tick(500); click(WA, Q("#adr044-api-profile-delete-pen")); await tick(100);
        ok(HA.profiles().map(x => x.name).join() === "DS" && eA.st().penApiKey === "k-ds" && eA.st().penBorrow === "self" && HA.selected("pen") === "" && HA.selected("lamp") === "" && Q("#adr044-api-profile-select-pen").value === "", "再点一次删掉：预设单里没了，各位现在填着的不动，选中记录清掉", HA.profiles().map(x => x.name).join());
        ok(eA.st().apiProfilesStore.plot.length === 1 && eA.st().apiProfilesStore.emotion.length === 2 && eA.st().apiProfilesStore.hx.length === 1, "导演那边的预设单一条没动");
        ok(eA.logs.filter(l => l.indexOf("ERR") === 0).length === 0, "这一段全程没有 console.error", eA.logs.filter(l => l.indexOf("ERR") === 0).join(" | "));
    }

    section("不碰导演那套");
    ok(e.calls.every(c => c.body.messages[0].content.indexOf("【情感方向】") < 0 && c.body.messages[0].content.indexOf("【派人】") < 0), "掌灯的请求里没有导演预设");
    ok(e.logs.filter(l => l.indexOf("ERR") === 0).length === 0, "全程没有 console.error", e.logs.filter(l => l.indexOf("ERR") === 0).join(" | "));

    console.log("\n通过 " + PASS + " · 失败 " + FAIL + (FAIL ? "\n  " + failures.join("\n  ") : ""));
    process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
