// v1.24.0 测试：导演的记忆搬进聊天文件 · 显示只读 · 面板手感。
// 跑法同其余四套：npm install jsdom && SPEED=10 node test_v124.js
const fs = require("fs");
const { JSDOM } = require("jsdom");

const SRC = fs.readFileSync("index.js", "utf8");
const SET_KEY = "arrebol-d-final-v1040-stable-settings";
const BACKUP_KEY = "arrebol-d-final-v1040-stable-settings-backup";
const D_META_KEY = "arrebol_d";
const D_META_LS_KEY = "arrebol_d_chat_v1";
const FLOAT_EP_KEY = "ARREBOL_D_DIRECTOR_FLOAT";

let PASS = 0, FAIL = 0; const failures = [];
function ok(c, name, extra) {
    if (c) { PASS++; console.log("  ✓ " + name); }
    else { FAIL++; failures.push(name); console.log("  ✗ " + name + (extra ? "  → " + extra : "")); }
}
function section(t) { console.log("\n── " + t + " ──"); }
const SPEED = Number(process.env.SPEED || 1);
const tick = ms => new Promise(r => setTimeout(r, Math.max(1, Math.round(ms / SPEED))));
async function waitFor(fn, maxMs) {
    const t0 = Date.now(); const cap = Math.max(1, Math.round((maxMs || 30000) / SPEED));
    while (Date.now() - t0 < cap) { if (fn()) return true; await new Promise(r => setTimeout(r, 20)); }
    return !!fn();
}

function build(opts) {
    opts = opts || {};
    const dom = new JSDOM("<!doctype html><html><body></body></html>",
        { url: "https://example.org/", pretendToBeVisual: true, runScripts: "outside-only" });
    const win = dom.window; win.top = win;
    const chat = opts.chat || [], prompts = {}, extensionSettings = {}, handlers = {};
    let chatMetadata = opts.metadata || {};
    let chatId = opts.chatId || "chat-a";
    if (opts.settings) extensionSettings[SET_KEY] = opts.settings;
    if (opts.localStorage) for (const k in opts.localStorage) win.localStorage.setItem(k, opts.localStorage[k]);

    const calls = [], logs = [], observed = [];
    let backupReads = 0;
    let script = () => "【情感方向】\n维持";
    const origGet = win.Storage.prototype.getItem;
    win.Storage.prototype.getItem = function (k) { if (k === BACKUP_KEY) backupReads++; return origGet.call(this, k); };
    const origObserve = win.MutationObserver.prototype.observe;
    win.MutationObserver.prototype.observe = function (target, options) { observed.push({ target: target === win.document.body ? "body" : "other", options }); return origObserve.call(this, target, options); };

    win.SillyTavern = { getContext: () => context };
    win.toastr = { info() {}, success() {}, warning() {}, error() {} };
    win.fetch = async (url, init) => {
        const body = JSON.parse(init.body);
        calls.push({ url, sys: body.messages[0].content, user: body.messages[1].content, body });
        return { ok: true, status: 200, text: async () => JSON.stringify({ choices: [{ message: { content: script(calls.length, body) } }] }) };
    };
    win.console = {
        log(...a) { logs.push(a.map(x => (typeof x === "object" ? JSON.stringify(x) : String(x))).join(" ")); },
        warn(...a) { logs.push("W " + a.map(x => (typeof x === "object" ? JSON.stringify(x) : String(x))).join(" ")); },
        error(...a) { logs.push("E " + a.map(x => String(x)).join(" ")); }, info() {}, debug() {}
    };
    const context = {
        extensionSettings, chat,
        get chatMetadata() { return chatMetadata; },
        get chatId() { return chatId; }, getCurrentChatId: () => chatId,
        name1: "江", name2: "陆冀北",
        saveSettingsDebounced() {}, saveSettings() {}, saveMetadataDebounced() {}, saveMetadata() {},
        saveChat: async () => {},
        setExtensionPrompt(k, v) { prompts[k] = { value: v }; }, extensionPrompts: prompts,
        extensionPromptTypes: { IN_CHAT: 1 }, extensionPromptRoles: { SYSTEM: 0 }, substituteParams: s => s,
        updateMessageBlock() {},
        eventSource: { on(t, f) { (handlers[t] = handlers[t] || []).push(f); } },
        event_types: { APP_READY: "app_ready", MESSAGE_RECEIVED: "message_received", CHAT_CHANGED: "chat_changed", MESSAGE_DELETED: "message_deleted" }
    };
    if (SPEED > 1) {
        const rT = win.setTimeout.bind(win), rI = win.setInterval.bind(win);
        win.setTimeout = (fn, ms, ...a) => rT(fn, Math.max(0, Math.round((ms || 0) / SPEED)), ...a);
        win.setInterval = (fn, ms, ...a) => rI(fn, Math.max(1, Math.round((ms || 0) / SPEED)), ...a);
    }
    win.eval(SRC);
    return {
        win, doc: win.document, context, prompts, calls, logs, chat, observed,
        get backupReads() { return backupReads; }, resetBackupReads() { backupReads = 0; },
        setScript(f) { script = f; },
        meta: () => chatMetadata, dmeta: () => chatMetadata[D_META_KEY],
        switchChat(id, metadata, newChat) { chatId = id; chatMetadata = metadata; if (newChat) { chat.length = 0; newChat.forEach(m => chat.push(m)); } },
        ls: k => win.localStorage.getItem(k),
        addRound() {
            chat.push({ is_user: true, mes: "他把话说到一半就停住了。" });
            const mes = "<content>屋里安静下来，谁都没有先开口。</content>";
            chat.push({ is_user: false, name: "陆冀北", mes, swipe_id: 0, swipes: [mes] });
        },
        emit(t, ...args) { (handlers[t] || []).forEach(f => { try { f(...args); } catch (e) {} }); },
        killPoll() { try { win.clearInterval(win.__arrebolDAutoTriggerPoll); win.__arrebolDAutoTriggerPoll = null; } catch (e) {} },
        lastAi() { for (let i = chat.length - 1; i >= 0; i--) if (!chat[i].is_user) return chat[i]; return null; },
        counterText(type) { const el = this.doc.querySelector("#adr044-auto-counter-" + type); return el ? el.textContent : ""; }
    };
}

const DIRECTOR = {
    masterEnabled: true, autoInjectEmotion: true, autoTriggerEmotion: true, autoTriggerEmotionRange: "custom", autoTriggerEmotionCustomRange: 2,
    showAutoTriggerPopup: false, emotionApiEndpoint: "https://dir.example/v1", emotionApiKey: "k", emotionModel: "m",
    directorLogEnabled: true, floatInjectEnabled: true, cdEnabled: false
};
function roundMsgs(n) { const out = []; for (let i = 0; i < n; i++) { const mes = "<content>第 " + (i + 1) + " 楼。</content>"; out.push({ is_user: true, mes: "问。" }); out.push({ is_user: false, name: "陆冀北", mes, swipe_id: 0, swipes: [mes] }); } return out; }
const clone = o => JSON.parse(JSON.stringify(o));

(async () => {
    // ───────────────────────────────────────────────
    section("基准线 · 住进聊天文件");
    let metaAfterA = null;
    {
        const b = build({ settings: clone(DIRECTOR) });
        b.emit("app_ready"); await tick(3000);
        b.addRound(); b.emit("message_received");
        ok(await waitFor(() => b.dmeta() && b.dmeta().auto && b.dmeta().auto.emotion && b.dmeta().auto.emotion.base === 1, 30000), "第一次检查把基准线写进 chat_metadata.arrebol_d", JSON.stringify(b.dmeta()));
        const mirror = JSON.parse(b.ls(D_META_LS_KEY) || "{}");
        ok(mirror["chat-a"] && mirror["chat-a"].auto.emotion.base === 1, "localStorage 只留一份按 chatKey 的镜像");
        ok(!b.ls("arrebol_d_auto_trigger_state_v1") && !b.ls("arrebol_d_auto_trigger_last_key_v1"), "旧的 LS 基准线键不再被写");
        b.addRound(); b.addRound(); b.emit("message_received");
        ok(await waitFor(() => b.calls.length === 1 && b.lastAi().mes.indexOf("arrebol_d_visible:emotion###") >= 0, 30000), "到点触发并注入");
        await waitFor(() => b.dmeta().auto.emotion.base === 3, 15000);
        const d = b.dmeta();
        ok(d.auto.emotion.base === 3, "结算后基准线前移到 3", JSON.stringify(d.auto));
        ok(d.log.emotion.length === 1 && d.log.emotion[0].text.indexOf("【情感方向】") >= 0, "跟组记录在聊天文件里");
        ok(d.float && d.float.type === "emotion" && d.float.text.indexOf("最新指导（常驻）") >= 0, "常驻贴耳稿在聊天文件里");
        ok(b.prompts[FLOAT_EP_KEY] && b.prompts[FLOAT_EP_KEY].value === d.float.text, "贴耳稿同时挂在扩展提示词通道");
        metaAfterA = clone(b.meta());
        b.killPoll();
    }

    // ───────────────────────────────────────────────
    section("换设备 · 只有聊天文件、浏览器一片空白");
    {
        const b = build({ settings: clone(DIRECTOR), metadata: clone(metaAfterA), chat: roundMsgs(3) });
        b.setScript(() => "【情感方向】\n第二次");
        b.emit("app_ready");
        ok(await waitFor(() => b.prompts[FLOAT_EP_KEY] && b.prompts[FLOAT_EP_KEY].value.indexOf("最新指导（常驻）") >= 0, 20000), "启动即恢复贴耳稿（旧版换设备后这里是空的）");
        ok(!b.ls("arrebol_d_float_note_v1") && !b.ls("arrebol_d_director_log_v1"), "没碰过旧键");
        b.addRound(); b.emit("message_received"); await tick(9000);
        ok(b.calls.length === 0 && b.dmeta().auto.emotion.base === 3, "基准线接着 3 数，第 4 楼不触发（旧版换设备后会重新对齐甚至误触发）", "calls=" + b.calls.length + " base=" + b.dmeta().auto.emotion.base);
        b.addRound(); b.emit("message_received");
        ok(await waitFor(() => b.calls.length === 1, 30000), "第 5 楼按原节奏触发");
        ok(b.calls[0].user.indexOf("【跟组记录｜你此前已下达的 1 条指导") >= 0, "导演记得自己在另一台设备上下过的指导");
        b.killPoll();
    }

    // ───────────────────────────────────────────────
    section("老存档 · 从浏览器旧键搬家一次");
    {
        const legacy = {};
        legacy["arrebol_d_auto_trigger_state_v1"] = JSON.stringify({ "chat-a::emotion": { base: 7, updatedAt: 1, broad: "char::x", mode: "window-v1" }, "other::emotion": { base: 99 } });
        legacy["arrebol_d_director_log_v1"] = JSON.stringify({ "chat-a::emotion": [{ t: 1, floor: 7, text: "旧指导一" }, { t: 2, floor: 5, text: "旧指导二" }] });
        legacy["arrebol_d_float_note_v1"] = JSON.stringify({ "chat-a": { t: 1, type: "emotion", text: "【暗河红霞 Arrebol D｜情感导演·最新指导（常驻）】\n旧贴耳稿" } });
        legacy["arrebol_d_graze_v1"] = JSON.stringify({ "chat-a::plot": { on: true, t: 1, floor: 7 } });
        const b = build({ settings: clone(DIRECTOR), localStorage: legacy, chat: roundMsgs(8) });
        b.emit("app_ready");
        await waitFor(() => b.dmeta() && b.dmeta().auto && b.dmeta().auto.emotion, 20000);
        const d = b.dmeta();
        ok(d && d.auto.emotion && d.auto.emotion.base === 7, "旧基准线 7 搬进聊天文件", JSON.stringify(d && d.auto));
        ok(d && !d.auto.plot, "别的聊天的记录（other::）没被误搬");
        ok(d && d.log.emotion.length === 2 && d.log.emotion[1].text === "旧指导二", "旧跟组记录搬进来了");
        ok(d && d.float && d.float.text.indexOf("旧贴耳稿") >= 0, "旧贴耳稿搬进来了");
        ok(d && d.graze.plot && d.graze.plot.on === true, "放养标记搬进来了");
        ok(await waitFor(() => b.prompts[FLOAT_EP_KEY] && b.prompts[FLOAT_EP_KEY].value.indexOf("旧贴耳稿") >= 0, 20000), "搬家当场就把旧贴耳稿挂上");
        ok(b.logs.some(l => l.indexOf("导演记忆已从浏览器搬进聊天文件") >= 0), "日志说了一声");
        ok(JSON.parse(b.ls("arrebol_d_auto_trigger_state_v1"))["chat-a::emotion"].base === 7, "旧键原样留着，回退 1.23 仍可用");
        b.addRound(); b.emit("message_received");
        ok(await waitFor(() => b.calls.length === 1, 30000), "第 9 楼＝7+2，按老进度到点触发（进度没丢）");
        b.killPoll();
    }

    // ───────────────────────────────────────────────
    section("两把聊天 · 各记各的，不靠猜");
    {
        const b = build({ settings: clone(DIRECTOR) });
        b.emit("app_ready"); await tick(3000);
        b.addRound(); b.emit("message_received");
        await waitFor(() => b.dmeta() && b.dmeta().auto.emotion, 30000);
        const metaA = b.meta();
        // 同角色、更长的另一把聊天，聊天文件里没有导演记录
        b.switchChat("chat-b", {}, roundMsgs(30));
        b.emit("chat_changed");
        ok(await waitFor(() => b.dmeta() && b.dmeta().auto.emotion && b.dmeta().auto.emotion.base === 30, 30000), "新聊天从自己的当前楼数起步（旧版会继承 chat-a 的 base=1 然后立刻触发）", JSON.stringify(b.dmeta() && b.dmeta().auto));
        await tick(9000);
        ok(b.calls.length === 0, "没有莫名触发", "calls=" + b.calls.length);
        b.switchChat("chat-a", metaA, roundMsgs(1));
        b.emit("chat_changed"); await tick(9000);
        ok(b.dmeta().auto.emotion.base === 1, "切回 chat-a，基准线还是 1");
        b.killPoll();
    }

    // ───────────────────────────────────────────────
    section("计数显示 · 只读，不再顺手建账");
    {
        const b = build({ settings: clone(DIRECTOR), chat: roundMsgs(5) });
        b.emit("app_ready"); await tick(2000);
        // 页面刚载入的 20 秒启动保护期（真实时间，不受 SPEED 影响）里，计数条走只读 peek 分支
        ok(b.counterText("emotion").indexOf("启动保护") >= 0, "第一次检查之前计数条走只读分支（启动保护）", b.counterText("emotion").slice(0, 40));
        ok(!b.dmeta(), "显示没有往聊天文件里写任何东西", JSON.stringify(b.dmeta()));
        ok(await waitFor(() => b.dmeta() && b.dmeta().auto.emotion && b.dmeta().auto.emotion.base === 5, 30000), "轮询带来的第一次检查才建账，基准线 = 当前 5 楼");
        await waitFor(() => b.counterText("emotion").indexOf("0/2") >= 0 || b.counterText("emotion").indexOf("已攒") >= 0, 15000);
        ok(b.counterText("emotion").indexOf("等第一次检查对表") < 0, "建账后计数条正常显示", b.counterText("emotion").slice(0, 40));
        b.killPoll();
    }

    // ───────────────────────────────────────────────
    section("删楼 · 基准线在聊天文件里照样位移");
    {
        const b = build({ settings: clone(DIRECTOR) });
        b.emit("app_ready"); await tick(3000);
        b.addRound(); b.addRound(); b.addRound(); b.emit("message_received");
        await waitFor(() => b.dmeta() && b.dmeta().auto.emotion && b.dmeta().auto.emotion.base === 3, 30000);
        await tick(10000);
        b.chat.splice(2, 4);                      // 删掉两轮
        b.emit("message_deleted");
        ok(await waitFor(() => b.dmeta().auto.emotion.base === 1, 30000), "删两楼，基准线 3 → 1", JSON.stringify(b.dmeta().auto.emotion));
        b.killPoll();
    }

    // ───────────────────────────────────────────────
    section("面板手感 · 备份不再每次解析、观察器不再盯整棵树");
    {
        const b = build({ settings: clone(DIRECTOR) });
        b.emit("app_ready"); await tick(3000);
        b.resetBackupReads();
        for (let i = 0; i < 3; i++) { b.addRound(); b.emit("message_received"); await tick(9000); }
        ok(b.backupReads <= 3, "一整段自动触发流程里备份最多读几次（旧版几十上百次）", "reads=" + b.backupReads);
        const bodyObs = b.observed.filter(o => o.target === "body");
        ok(bodyObs.length >= 1 && bodyObs.every(o => o.options && o.options.subtree === false), "body 上的观察器只盯直接子节点", JSON.stringify(bodyObs.map(o => o.options)));
        b.killPoll();
    }

    // ───────────────────────────────────────────────
    section("导演稿 v1.52.0 · 两位各占一格、「这几楼」到期撤下、判「维持」不换稿");
    {
        const QUIET = Object.assign(clone(DIRECTOR), { autoTriggerEmotion: false });   // 这一节自己动手挂稿，不让自动触发插进来
        const b = build({ settings: clone(QUIET), chat: roundMsgs(3) });
        b.emit("app_ready"); await tick(3200);
        const T = b.win.__adrDFloatTest, ep = () => (b.prompts[FLOAT_EP_KEY] ? b.prompts[FLOAT_EP_KEY].value : "");
        const has = (t, arr) => arr.every(x => t.indexOf(x) >= 0);
        // 出厂提示词
        ok(has(T.presets.emotion, ["演法不同", "真出戏", "顺着它找补", "就判「维持」", "【验收】", "【判断】", "【这几楼】", "【长期边界】", "【换个写法】", "别这样 → 换成这样", "连着两次没执行", "口号不合格"]), "情感导演的出厂提示词：先分演法不同与真出戏、允许维持、稿子分两类、提醒要配换成什么、验收");
        ok(T.presets.emotion.indexOf("【避免】") < 0, "情感导演不再有纯禁令的【避免】一栏");
        ok(has(T.presets.plot, ["【派人】", "【顺场】", "【收线】", "【本轮重点】", "「【判断】维持」", "连着两次没执行", "必须带名字带条目", "它会一直挂着"]), "统筹的出厂提示词：四栏照旧，多了维持的出口和两次没执行换安排，收线标明常驻");
        ok(T.presets.emotionV1 !== T.presets.emotion && T.presets.plotV2 !== T.presets.plot && has(T.presets.emotionV1, ["【情感方向】", "【避免】"]), "上一版的两份出厂提示词留着做比对");
        // 认栏目
        const NEW_E = "【验收】\n上次让他先问她吃了没，执行了。\n\n【判断】\n找补\n\n【这几楼】\n让他把伞往她那边偏一点，别说话。\n\n【长期边界】\n他不会先说喜欢；心疼只落在动作上。\n\n【换个写法】\n别让他直接道歉 → 让他把她的杯子续满。";
        const pe = T.parts("emotion", NEW_E);
        ok(pe.full.indexOf("【验收】") < 0 && pe.full.indexOf("【判断】") < 0 && has(pe.full, ["【这几楼】", "把伞往她那边偏", "【长期边界】", "【换个写法】"]), "新格式：验收和判断两栏不贴耳边，其余都在");
        ok(pe.long === "【长期边界】\n他不会先说喜欢；心疼只落在动作上。", "新格式：长期的只有【长期边界】那一段", JSON.stringify(pe.long));
        const po = T.parts("emotion", "【情感方向】\n先降温。\n\n【人设边界】\n他嘴硬。\n\n【避免】\n秒软。");
        ok(po.full.indexOf("【情感方向】") === 0 && po.long === "【人设边界】\n他嘴硬。", "旧格式也认：【人设边界】算长期，方向和避免算这几楼");
        const pp = T.parts("plot", "【派人】\n让老周把口信送到。\n\n【顺场】\n从码头切回茶楼少一句过门。\n\n【收线】\n那把钥匙还没兑现。\n\n【本轮重点】\n先收钥匙。");
        ok(pp.long === "【收线】\n那把钥匙还没兑现。" && has(pp.full, ["【派人】", "【顺场】", "【本轮重点】"]), "统筹：【收线】算长期，派人、顺场、本轮重点算这几楼");
        ok(T.parts("emotion", "随便写的一段话，没有小标题。").long === "" && T.parts("emotion", "【长期边界】\n只有这一栏。").long === "", "认不出长期栏目、或者整份只有长期栏目：不拆，整份照旧常驻");
        ok(T.isHold("【判断】维持") && T.isHold("【验收】\n执行了。\n\n【判断】\n维持") && T.isHold("【判断】：维持，戏走得顺") && !T.isHold("【情感方向】\n维持") && !T.isHold("【判断】\n修正") && !T.isHold(""), "判「维持」只认【判断】那一栏写的是维持");
        // 两位各占一格
        ok(T.shortFloors() === 3 && b.doc.querySelectorAll("#adr044-float-short-floors").length >= 1, "「这几楼」默认挂 3 楼，面板上有这一栏");
        ok(T.write("emotion", NEW_E) === true, "情感导演的稿挂上");
        ok(ep().indexOf("【暗河红霞 Arrebol D｜情感导演·最新指导（常驻）】\n【这几楼】") === 0 && ep().indexOf("【验收】") < 0, "耳边：情感导演的整份（不带验收、判断）");
        ok(b.lastAi().mes.indexOf("【验收】") >= 0, "楼里那份是原样的，验收给人看");
        await tick(30);
        const PLOT_G = "【派人】\n让老周把口信送到。\n\n【收线】\n那把钥匙还没兑现。\n\n【本轮重点】\n先收钥匙。";
        ok(T.write("plot", PLOT_G) === true, "统筹的稿也挂上");
        const both = ep();
        ok(both.indexOf("情感导演·最新指导（常驻）") >= 0 && both.indexOf("统筹·最新指导（常驻）") > both.indexOf("情感导演·最新指导（常驻）") && has(both, ["把伞往她那边偏", "让老周把口信送到"]), "耳边两份都在：统筹来了，情感导演那份没被顶掉；新的排在后面");
        const d1 = b.dmeta();
        ok(d1.floats && d1.floats.emotion && d1.floats.plot && d1.floats.emotion.r === 3 && d1.floats.plot.r === 3, "聊天文件里两格各记各的，都记着是第 3 楼挂的", JSON.stringify(d1.floats && { e: d1.floats.emotion && d1.floats.emotion.r, p: d1.floats.plot && d1.floats.plot.r }));
        ok(d1.float && d1.float.type === "plot" && d1.float.text === d1.floats.plot.text, "旧字段 float 记最新的那一份（旧版本读得懂）");
        // 到期
        b.addRound(); b.addRound(); T.refresh();
        ok(ep() === both, "又过了 2 楼：两份都还是整份");
        b.addRound(); T.refresh();
        const aged = ep();
        ok(aged.indexOf("【暗河红霞 Arrebol D｜情感导演·长期边界（常驻）】\n【长期边界】\n他不会先说喜欢") >= 0 && aged.indexOf("把伞往她那边偏") < 0 && aged.indexOf("【换个写法】") < 0, "过了 3 楼：情感导演只剩长期边界，「这几楼」和「换个写法」撤下");
        ok(aged.indexOf("【暗河红霞 Arrebol D｜统筹·没收的线（常驻）】\n【收线】\n那把钥匙还没兑现。") >= 0 && aged.indexOf("让老周把口信送到") < 0 && aged.indexOf("【本轮重点】") < 0, "统筹只剩没收的线，派人和本轮重点撤下");
        ok(b.dmeta().floats.emotion.text.indexOf("把伞往她那边偏") >= 0, "撤下的只是贴耳那段，聊天文件里那份稿是完整的");
        b.win.SillyTavern.getContext().extensionSettings[Object.keys(b.win.SillyTavern.getContext().extensionSettings)[0]].floatShortFloors = 0; T.refresh();
        ok(ep() === both, "把「挂几楼就撤」填成 0：不撤，整份常驻，和以前一样");
        b.win.SillyTavern.getContext().extensionSettings[Object.keys(b.win.SillyTavern.getContext().extensionSettings)[0]].floatShortFloors = 3; T.refresh();
        ok(ep() === aged, "填回 3：又只剩长期的");
        // 任选：都贴着，还是后来的顶掉先来的
        {
            const S0 = b.win.SillyTavern.getContext().extensionSettings; const st0 = S0[Object.keys(S0)[0]];
            ok(st0.floatKeepBoth !== false && b.doc.querySelectorAll("#adr044-float-keep-both").length >= 1 && b.doc.querySelector("#adr044-float-keep-both").checked, "「两位导演的稿都贴着」默认勾着，面板上有这一枚");
            st0.floatKeepBoth = false; T.refresh();
            ok(ep().indexOf("统筹·没收的线（常驻）") >= 0 && ep().indexOf("情感导演") < 0, "取消：只贴最新的那一份（统筹后挂的），情感导演那份不贴了", ep().slice(0, 60));
            ok(!!b.dmeta().floats.emotion && !!b.dmeta().floats.plot, "两格都还存着，只是先来的不贴");
            st0.floatKeepBoth = true; T.refresh();
            ok(ep() === aged, "再勾上：两份都回来");
            st0.floatKeepBoth = false; T.refresh();
            ok(T.clearType("plot") === true && ep().indexOf("情感导演·长期边界（常驻）") >= 0 && ep().indexOf("统筹") < 0, "只贴最新一份时，把后来的那份撤掉：先来的那份顶上来");
            T.write("plot", PLOT_G); st0.floatKeepBoth = true; T.refresh();
        }
        // 新稿把这一格换掉，重新计楼
        ok(T.write("emotion", "【这几楼】\n让他先开口。\n\n【长期边界】\n他不会先说喜欢。") === true && ep().indexOf("让他先开口") >= 0 && ep().indexOf("统筹·最新指导（常驻）") >= 0, "情感导演再来一份：它那一格换成新的整份，统筹那格不受影响");
        // 判「维持」
        const before = ep(), logN = b.dmeta().log.emotion.length;
        T.update("emotion", "【验收】\n执行了。\n\n【判断】\n维持");
        ok(ep() === before && b.dmeta().floats.emotion.text.indexOf("让他先开口") >= 0, "判「维持」的稿不会把耳边那份顶掉");
        // 放养只撤自己那一格
        ok(T.clearType("plot") === true && ep().indexOf("统筹") < 0 && ep().indexOf("让他先开口") >= 0 && b.dmeta().floats.plot === null && b.dmeta().float.type === "emotion", "撤统筹那一格：情感导演的照旧挂着，旧字段跟着指向它");
        ok(T.clearType("plot") === false, "那一格已经空了，再撤是空操作");
        ok(b.logs.filter(l => l.indexOf("E ") === 0).length === 0, "这一节全程没有 console.error", b.logs.filter(l => l.indexOf("E ") === 0).join(" | "));
        b.killPoll();
    }

    section("导演稿 v1.52.0 · 自动触发时判「维持」：不往楼里挂、不换稿，进度照常往前走");
    {
        const b = build({ settings: clone(DIRECTOR) });
        b.emit("app_ready"); await tick(3000);
        b.addRound(); b.emit("message_received");
        await waitFor(() => b.dmeta() && b.dmeta().auto && b.dmeta().auto.emotion && b.dmeta().auto.emotion.base === 1, 30000);
        b.setScript(() => "【这几楼】\n让他先问她吃了没。\n\n【长期边界】\n他嘴硬心软。");
        b.addRound(); b.addRound(); b.emit("message_received");
        ok(await waitFor(() => b.calls.length === 1 && b.lastAi().mes.indexOf("arrebol_d_visible:emotion###") >= 0, 30000), "第一次到点：照常挂稿");
        await waitFor(() => b.dmeta().auto.emotion.base === 3, 15000);
        const ep = () => (b.prompts[FLOAT_EP_KEY] ? b.prompts[FLOAT_EP_KEY].value : "");
        const before = ep();
        ok(before.indexOf("让他先问她吃了没") >= 0, "耳边是这一份");
        b.setScript(() => "【验收】\n上次的方向执行了。\n\n【判断】\n维持");
        b.addRound(); b.addRound(); b.emit("message_received");
        ok(await waitFor(() => b.calls.length === 2, 30000), "第二次到点：导演照常被请来");
        ok(await waitFor(() => b.dmeta().auto.emotion.base === 5, 15000), "判了维持也算这一拍结算：基准线前移到 5", JSON.stringify(b.dmeta().auto.emotion));
        ok(b.lastAi().mes.indexOf("arrebol_d") < 0 && b.lastAi().mes.indexOf("维持") < 0, "这一楼里没有挂任何导演稿");
        ok(b.dmeta().floats.emotion.text.indexOf("让他先问她吃了没") >= 0 && b.dmeta().floats.emotion.r === 3, "耳边那一格没换，还是第 3 楼挂的那份");
        ok(b.dmeta().log.emotion.length === 2 && b.dmeta().log.emotion[1].text.indexOf("维持") >= 0, "跟组记录里记了一笔「维持」，下次它知道这一轮自己没动");
        ok(b.calls[1].user.indexOf("让他先问她吃了没") >= 0 || b.calls[1].sys.indexOf("让他先问她吃了没") >= 0, "第二次请它时，上一份指导在跟组记录里带给了它");
        b.killPoll();
    }

    section("导演稿 v1.52.0 · 存量迁移：出厂提示词只升级没改过的；旧的单格贴耳稿搬进来不丢");
    {
        const probe = build({ settings: clone(DIRECTOR) }); probe.emit("app_ready"); await tick(600);
        const P0 = probe.win.__adrDFloatTest.presets; probe.killPoll();
        const stOf = b => { const es = b.win.SillyTavern.getContext().extensionSettings; return es[Object.keys(es)[0]]; };
        const b1 = build({ settings: Object.assign(clone(DIRECTOR), { emotionPreset: P0.emotionV1, plotPreset: P0.plotV2 }) });
        b1.emit("app_ready"); await tick(3000);
        b1.addRound(); b1.emit("message_received");
        await waitFor(() => b1.dmeta() && b1.dmeta().auto && b1.dmeta().auto.emotion, 30000);
        b1.addRound(); b1.addRound(); b1.emit("message_received");
        ok(await waitFor(() => b1.calls.length === 1, 30000) && b1.calls[0].sys.indexOf(P0.emotion) === 0, "存着上一版出厂提示词（逐字相同）的人：这次请导演用的已经是新的");
        b1.killPoll();
        const mine = P0.emotionV1 + "\n另外：称呼一律用小名。";
        const b2 = build({ settings: Object.assign(clone(DIRECTOR), { emotionPreset: mine }) });
        b2.emit("app_ready"); await tick(3000);
        b2.addRound(); b2.emit("message_received");
        await waitFor(() => b2.dmeta() && b2.dmeta().auto && b2.dmeta().auto.emotion, 30000);
        b2.addRound(); b2.addRound(); b2.emit("message_received");
        ok(await waitFor(() => b2.calls.length === 1, 30000) && b2.calls[0].sys.indexOf(mine) === 0 && b2.calls[0].sys.indexOf("【这几楼】") < 0, "自己改过哪怕一句的人：提示词一个字不动");
        b2.killPoll();
        // 旧的单格贴耳稿
        const legacyMeta = {}; legacyMeta[D_META_KEY] = { v: 1, auto: {}, log: {}, float: { t: 5, type: "plot", text: "【暗河红霞 Arrebol D｜统筹·最新指导（常驻）】\n【派人】\n老周。\n\n【收线】\n钥匙。" }, graze: {} };
        const b3 = build({ settings: Object.assign(clone(DIRECTOR), { autoTriggerEmotion: false }), metadata: legacyMeta, chat: roundMsgs(2) });
        b3.emit("app_ready");
        ok(await waitFor(() => b3.prompts[FLOAT_EP_KEY] && b3.prompts[FLOAT_EP_KEY].value === legacyMeta[D_META_KEY].float.text, 20000), "升级前挂着的那份稿：启动后原样贴回耳边");
        for (let i = 0; i < 5; i++) b3.addRound(); b3.win.__adrDFloatTest.refresh();
        ok(b3.prompts[FLOAT_EP_KEY].value === legacyMeta[D_META_KEY].float.text, "它不知道是哪一楼挂的，所以不撤，整份照旧常驻到下一次导演上岗");
        b3.killPoll();
    }

    console.log("\n════════════════════════════════");
    console.log("通过 " + PASS + " · 失败 " + FAIL);
    if (failures.length) console.log("失败项：\n  - " + failures.join("\n  - "));
    console.log("════════════════════════════════");
    process.exit(FAIL ? 1 : 0);
})();
