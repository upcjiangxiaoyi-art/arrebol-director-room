// v1.43.0 测试：红霞剧场。每层助手正文落地后在楼尾插一场，范围同掌灯，主题仓固定 / 随机，剥离正则把它从楼里原样摘干净。
// 跑法同其余：npm install jsdom && node test_theater.js
const fs = require("fs");
const { JSDOM } = require("jsdom");

const SRC = fs.readFileSync("index.js", "utf8");
const SET_KEY = "arrebol-d-final-v1040-stable-settings";

let PASS = 0, FAIL = 0; const failures = [];
function ok(c, name, extra) {
    if (c) { PASS++; console.log("  ✓ " + name); }
    else { FAIL++; failures.push(name); console.log("  ✗ " + name + (extra ? "  → " + extra : "")); }
}
function section(t) { console.log("\n── " + t + " ──"); }
const tick = ms => new Promise(r => setTimeout(r, ms));

const TAIL = "\n\narrebol_d_visible:plot###\n【暗河红霞 Arrebol D｜统筹】\n派人：老周送口信\n###";
const FLOOR5 = "<status>HP 80 · 夜 · 书房</status>\n<content>\n他把信放在桌上，说：「三天前就该到的人，今晚到了。」她笑了笑，立刻答应跟他走。\n</content>\n<report>信送到，她当场答应同行。</report>";

function build(opts) {
    opts = opts || {};
    const dom = new JSDOM("<!doctype html><html><body><div id=\"extensions_settings2\"></div></body></html>",
        { url: "https://example.org/", pretendToBeVisual: true, runScripts: "outside-only" });
    const win = dom.window; win.top = win;
    const chat = [], extensionSettings = {}, chatMetadata = {}, handlers = {};
    extensionSettings[SET_KEY] = Object.assign({
        activeTab: "lamp",
        plotApiEndpoint: "https://plot.example/v1", plotApiKey: "k-plot", plotModel: "plot-model"
    }, opts.settings || {});

    chat.push({ is_user: true, name: "江", mes: "开场白" });
    chat.push({ is_user: false, is_system: true, name: "阿尔", mes: "<content>这楼被藏了</content><report>隐藏楼的摘要</report>" });
    chat.push({ is_user: true, name: "江", mes: "我问他信里写了什么" });
    chat.push({ is_user: false, name: "阿尔", mes: "<content>前一楼正文</content><report>他收到了一封信。</report>" });
    chat.push({ is_user: true, name: "江", mes: "我说：你念给我听" });
    chat.push({ is_user: false, name: "阿尔", mes: FLOOR5, swipes: [FLOOR5], swipe_id: 0 });

    const calls = [];
    let script = () => "好的";
    let hang = null;
    let saveChatCalls = 0, redraws = [];
    win.SillyTavern = { getContext: () => context };
    win.toastr = { info() {}, success() {}, warning() {}, error() {} };
    win.fetch = async (url, init) => {
        const body = JSON.parse(init.body);
        calls.push({ url: String(url), body, headers: init.headers });
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
        chatId: "theater-test", getCurrentChatId: () => "theater-test",
        characters: [{ name: "阿尔", description: "阿尔是个送信的，嘴硬心软。" }],
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
        st: () => extensionSettings[SET_KEY],
        setScript(f) { script = f; },
        hangNext() { hang = {}; return hang; }, unhang() { hang = null; },
        saves: () => saveChatCalls, redraws: () => redraws, handlers,
        T: () => win.__adrTheaterTest,
        fire() { (handlers["message_received"] || []).forEach(f => { try { f(); } catch (x) {} }); }
    };
}

const click = (W, el) => el.dispatchEvent(new W.Event("click", { bubbles: true }));
const change = (W, el) => el.dispatchEvent(new W.Event("change", { bubbles: true }));
const blocks = mes => (String(mes).match(/<details class="arrebol-d-theater"/g) || []).length;
const isTheater = body => body.messages[0].content.indexOf("红霞剧场") >= 0 && body.messages[body.messages.length - 1].content.indexOf("【本场主题") === 0;

(async () => {
    const e = build();
    e.doc.dispatchEvent(new e.win.Event("DOMContentLoaded")); await tick(500);
    (e.handlers["app_ready"] || []).forEach(f => { try { f(); } catch (x) {} }); await tick(400);
    const d = e.doc, W = e.win, T = e.T();
    click(W, d.querySelector("#adr048-fab")); await tick(500);
    const P = s => d.querySelector("#adr048-popup-body " + s);

    section("面板");
    ok(!!d.querySelector('#adr044-drawer [data-drawer-id="lamp-theater"]') && !!P('[data-drawer-id="lamp-theater"]'), "抽屉与浮窗的掌灯页里都有「红霞剧场」一节");
    const chatDr = P('[data-drawer-id="lamp-chat"]'), thDr = P('[data-drawer-id="lamp-theater"]'), apiDr = P('[data-drawer-id="lamp-api"]');
    ok((chatDr.compareDocumentPosition(thDr) & 4) !== 0 && (thDr.compareDocumentPosition(apiDr) & 4) !== 0, "排在聊天区之后、API 之前");
    ok(P("#adr044-theater-enabled") && !P("#adr044-theater-enabled").checked && e.st().theaterEnabled !== true, "开关在、默认关");
    const names = T.names();
    ok(names.length === 6 && names[0] === "弹幕吐槽" && names.indexOf("场外嗑瓜子") >= 0 && names.indexOf("读者评论区") >= 0, "主题仓出厂六个", names.join("/"));
    ok(P("#adr044-theater-select").querySelectorAll("option").length === 6, "下拉列出六个主题");
    ok(P("#adr044-theater-name").value === "弹幕吐槽" && P("#adr044-theater-text").value === T.factory["弹幕吐槽"], "名字与写法两个框回填了选中的主题");
    ok(P("#adr044-theater-pick").value === "fixed", "默认固定用选中的");
    ok(P("#adr044-theater-regex").value === T.regexText && T.regexText === '/\\s*<details class="arrebol-d-theater"[\\s\\S]*?<\\/details>/g', "面板上摆着剥离正则", P("#adr044-theater-regex").value);
    ok(P("#adr044-theater-regex").readOnly, "正则那一行只读");

    section("默认关：新楼落地不演");
    e.fire(); await tick(1800);
    ok(e.calls.length === 0 && blocks(e.chat[5].mes) === 0, "没开就不发请求、不动楼");

    section("开了：每层楼尾来一场");
    const en = P("#adr044-theater-enabled"); en.checked = true; change(W, en); await tick(50);
    ok(e.st().theaterEnabled === true, "勾上存进设置");
    ok(P("#adr044-theater-status").textContent.indexOf("剥离正则") >= 0, "开的时候提醒贴剥离正则");
    e.setScript((n, body) => isTheater(body)
        ? "```\n🎭 红霞剧场 · 弹幕吐槽\n前排围观\n哈哈哈哈 <b>她答应得也太快了</b>\n\n\n\n高能预警：信 & 人一起到\n```"
        : "别的回答");
    const before5 = e.chat[5].mes;
    e.fire(); await tick(2000);
    ok(e.calls.length === 1, "新楼落地发了一次请求", String(e.calls.length));
    const c1 = e.calls[0];
    ok(c1.url.indexOf("plot.example") >= 0 && c1.body.model === "plot-model", "走聊天位（默认借统筹）");
    ok(c1.body.messages[0].role === "system" && c1.body.messages[0].content.indexOf("你是 Arrebol，小红霞。你在给这篇文的每一楼配「红霞剧场」") === 0, "系统提示是剧场规矩");
    ok(c1.body.messages[0].content.indexOf("【本篇原文 · #5") >= 0 && c1.body.messages[0].content.indexOf("三天前就该到的人") >= 0, "本篇全文在里面");
    ok(c1.body.messages[0].content.indexOf("【此前剧情") >= 0 && c1.body.messages[0].content.indexOf("他收到了一封信") >= 0 && c1.body.messages[0].content.indexOf("隐藏楼的摘要") < 0, "此前剧情读未隐藏楼的摘要，隐藏楼不读（范围同掌灯）");
    ok(c1.body.messages[0].content.indexOf("【角色卡 / 世界书 / 人设") >= 0 && c1.body.messages[0].content.indexOf("嘴硬心软") >= 0, "角色卡也在");
    ok(c1.body.messages.length === 2 && c1.body.messages[1].content.indexOf("【本场主题 · 弹幕吐槽】\n" + T.factory["弹幕吐槽"]) === 0 && c1.body.messages[1].content.indexOf("针对本篇（#5）写一场") > 0, "用户句是本场主题与任务");
    ok(c1.body.max_tokens === undefined, "不设 max_tokens");
    const m5 = e.chat[5];
    ok(m5.mes.indexOf(before5) === 0, "楼里原来的东西（状态栏、正文、摘要）一个字没动");
    const tailBlock = m5.mes.slice(before5.length);
    ok(tailBlock === '\n\n<details class="arrebol-d-theater" open><summary>🎭 红霞剧场 · 弹幕吐槽</summary>前排围观<br>哈哈哈哈 &lt;b&gt;她答应得也太快了&lt;/b&gt;<br><br>高能预警：信 &amp; 人一起到</details>',
        "楼尾插了一整块：围栏和它自己加的标题去掉、尖括号转义、换行成 <br>、空行最多一个、整块一行", JSON.stringify(tailBlock));
    ok(m5.swipes[m5.swipe_id] === m5.mes, "当前 swipe 同写，翻页不丢");
    ok(e.saves() >= 1 && e.redraws().indexOf(5) >= 0, "保存了聊天、只重画这一楼");
    ok(P("#adr044-theater-status").textContent.indexOf("#5 的「弹幕吐槽」已插在楼尾 ✓") >= 0, "状态行报了哪一楼哪个主题", P("#adr044-theater-status").textContent);
    ok(W.__adrDGenTest.looksLive() === false, "自己插的这一笔不算「楼还在生成」");

    section("剥离正则：摘得干干净净");
    const mre = /^\/(.*)\/([a-z]*)$/.exec(T.regexText);
    const stripRe = new RegExp(mre[1], mre[2]);
    ok(m5.mes.replace(stripRe, "") === before5, "面板上那条正则套上去，楼恢复成插入前一字不差");
    ok(T.strip(m5.mes) === before5 && T.has(m5.mes) && !T.has(before5), "插件自己的摘除与判断也一致");
    const twoBlocks = before5 + T.block("甲", "一\n二", false) + TAIL + T.block("乙", "三", true);
    ok(twoBlocks.replace(new RegExp(mre[1], mre[2]), "") === before5 + TAIL, "一楼里夹着导演稿、前后各一块，也只摘剧场、导演稿原样留着");
    ok(T.block("乙", "三", true).indexOf('<details class="arrebol-d-theater"><summary>') === 2, "折叠版不带 open");

    section("小红霞自己读楼时当它不存在");
    const mat = W.__adrLampTest.materials();
    ok(mat.body.indexOf("前排围观") < 0 && mat.body.indexOf("三天前就该到的人") >= 0, "掌灯的本篇原文不含剧场");
    e.st().contentTagNames = "*";
    e.chat.push({ is_user: true, name: "江", mes: "没标签的一楼" });
    e.chat.push({ is_user: false, name: "阿尔", mes: "整楼正文没有标签" + T.block("弹幕吐槽", "飘过", false) });
    const mat2 = W.__adrLampTest.materials();
    ok(mat2.idx === 7 && mat2.body === "整楼正文没有标签", "整楼当正文读的模式下也把剧场洗掉", JSON.stringify(mat2.body));
    e.chat.pop(); e.chat.pop(); e.st().contentTagNames = "content";

    section("同一楼不重复演；重 roll 换一场");
    e.fire(); await tick(1800);
    ok(e.calls.length === 1, "同一楼再来事件不重复");
    T.state.lastSig = "";
    e.fire(); await tick(1800);
    ok(e.calls.length === 1, "刷新后（签名丢了）楼里已经有一场，也不重复");
    e.setScript((n, body) => isTheater(body) ? "新一版的弹幕\n第二条" : "别的回答");
    const rerolled = "<content>\n她没答应，只是把信推了回去。\n</content>\n<report>她把信推回去。</report>";
    e.chat[5].mes = rerolled; e.chat[5].swipes.push(rerolled); e.chat[5].swipe_id = 1;
    e.fire(); await tick(2000);
    ok(e.calls.length === 2, "重 roll 换了正文，再演一场");
    ok(blocks(e.chat[5].mes) === 1 && e.chat[5].mes === rerolled + T.block("弹幕吐槽", "新一版的弹幕\n第二条", false), "新一页的楼尾是新的那场，只有一块");
    ok(e.chat[5].swipes[0] === FLOOR5 + tailBlock - 0 || e.chat[5].swipes[0].indexOf("前排围观") >= 0, "旧那页带着它自己的那场，各页各的");

    section("手动：现在来一场 / 撤掉");
    en.checked = false; change(W, en); await tick(50);
    e.setScript((n, body) => isTheater(body) ? "手动点的一场" : "别的回答");
    await tick(500); click(W, P("#adr044-theater-now")); await tick(1800);
    ok(e.calls.length === 3, "开关关着，「现在来一场」也演");
    ok(blocks(e.chat[5].mes) === 1 && e.chat[5].mes.indexOf("手动点的一场") > 0 && e.chat[5].mes.indexOf("新一版的弹幕") < 0, "一楼只留一场：新的换掉旧的");
    await tick(500); click(W, P("#adr044-theater-remove")); await tick(400);
    ok(e.chat[5].mes === rerolled && e.chat[5].swipes[1] === rerolled, "「撤掉最新一楼的」把楼还原");
    ok(P("#adr044-theater-status").textContent.indexOf("撤掉了") >= 0, "状态行说撤了");
    await tick(500); click(W, P("#adr044-theater-remove")); await tick(100);
    ok(P("#adr044-theater-status").textContent.indexOf("没有剧场可撤") >= 0, "没有可撤的时候直说");

    section("主题仓：自己写、固定、随机、删除");
    const nameEl = P("#adr044-theater-name"), textEl = P("#adr044-theater-text");
    nameEl.value = "奶茶店老板娘"; textEl.value = "楼下奶茶店老板娘一边摇奶茶一边跟熟客八卦这一楼，三句话，句句带价目表。";
    await tick(500); click(W, P("#adr044-theater-save")); await tick(100);
    ok(T.names().length === 7 && T.store()["奶茶店老板娘"] === textEl.value && e.st().theaterCurrent === "奶茶店老板娘", "自己写的主题存进仓并选中");
    ok(P("#adr044-theater-select").value === "奶茶店老板娘" && P("#adr044-theater-select").querySelectorAll("option").length === 7, "下拉跟着多一个并指到它");
    ok(d.querySelector("#adr044-drawer #adr044-theater-select").querySelectorAll("option").length === 7, "抽屉那份下拉同步");
    e.setScript((n, body) => isTheater(body) ? "三块五一杯的八卦" : "别的回答");
    await tick(500); click(W, P("#adr044-theater-now")); await tick(1800);
    const c4 = e.calls[e.calls.length - 1];
    ok(c4.body.messages[1].content.indexOf("【本场主题 · 奶茶店老板娘】\n楼下奶茶店老板娘") === 0, "固定模式用的是选中的自写主题");
    ok(e.chat[5].mes.indexOf("<summary>🎭 红霞剧场 · 奶茶店老板娘</summary>三块五一杯的八卦</details>") > 0, "楼尾标题是主题名");
    const sel = P("#adr044-theater-select"); sel.value = "Q版四格"; change(W, sel); await tick(50);
    ok(e.st().theaterCurrent === "Q版四格" && nameEl.value === "Q版四格" && textEl.value === T.factory["Q版四格"], "下拉换主题：两个框跟着换");
    ok(T.pick().name === "Q版四格", "固定模式抽到的就是选中的");
    const pick = P("#adr044-theater-pick"); pick.value = "random"; change(W, pick); await tick(50);
    ok(e.st().theaterPick === "random", "改成随机存进设置");
    T.state.lastName = "弹幕吐槽";
    ok(T.pick(() => 0).name === "场外嗑瓜子", "随机：不连着抽上一场的主题（上一场是第一个，抽 0 得第二个）");
    ok(T.pick(() => 0.999).name === "奶茶店老板娘", "随机：抽得到自己写的那个");
    const seen = {}; for (let i = 0; i < 200; i++) seen[T.pick().name] = 1;
    ok(Object.keys(seen).length === 6 && !seen["弹幕吐槽"], "随机两百次：除了上一场那个，其余六个都抽到过", Object.keys(seen).join("/"));
    pick.value = "fixed"; change(W, pick); await tick(50);
    sel.value = "弹幕吐槽"; change(W, sel); await tick(50);
    const del = P("#adr044-theater-delete");
    await tick(500); click(W, del); await tick(50);
    ok(del.textContent === "确定删除？" && T.names().length === 7, "删除第一下只是问");
    await tick(500); click(W, del); await tick(100);
    ok(T.names().length === 6 && T.names().indexOf("弹幕吐槽") < 0, "第二下删掉");
    ok(T.store()["弹幕吐槽"] === undefined && e.st().theaterSeeded.indexOf("弹幕吐槽") >= 0, "出厂条目删了不复活");
    ok(T.pick().name === T.names()[0], "选中的被删了就退到仓里第一个");
    e.st().theaterStore = {}; e.st().theaterSeeded = Object.keys(T.factory).concat(["奶茶店老板娘"]);
    ok(T.pick().name === "弹幕吐槽" && T.pick().text === T.factory["弹幕吐槽"], "仓被删空了也不罢工，用内置的弹幕吐槽兜底");
    e.st().theaterStore = Object.assign({}, T.factory); e.st().theaterCurrent = "弹幕吐槽";

    section("写的时候楼变了 / 换聊天了：作废");
    en.checked = true; change(W, en); await tick(50);
    e.chat.push({ is_user: true, name: "江", mes: "上车" });
    e.chat.push({ is_user: false, name: "阿尔", mes: "<content>车门一关，他说：「系好。」</content><report>两人上车。</report>" });
    e.setScript((n, body) => isTheater(body) ? "晚到的一场" : "别的回答");
    let h = e.hangNext();
    e.fire(); await tick(1500);
    ok(e.calls.length === 5 && e.calls[4].body.messages[0].content.indexOf("【本篇原文 · #7") >= 0, "新楼 #7 的请求发出去挂着");
    e.chat[7].mes = "<content>车门一关，他什么也没说。</content><report>两人上车。</report>";
    h.resolve(); e.unhang(); await tick(300);
    ok(blocks(e.chat[7].mes) === 0 && P("#adr044-theater-status").textContent.indexOf("作废") >= 0, "写的时候这一楼被重 roll / 编辑了：不往新版本上贴旧的一场");
    h = e.hangNext();
    e.fire(); await tick(1500);
    ok(e.calls.length === 6, "新版本自己再演一场，请求挂着");
    e.context.chatId = "other"; e.context.getCurrentChatId = () => "other";
    h.resolve(); e.unhang(); await tick(300);
    ok(blocks(e.chat[7].mes) === 0, "中途换了聊天：不贴");
    e.context.chatId = "theater-test"; e.context.getCurrentChatId = () => "theater-test";

    section("总开关关着不演；和导演稿互不打架");
    e.st().masterEnabled = false; T.state.lastSig = "";
    e.fire(); await tick(1800);
    ok(e.calls.length === 6, "「小红霞正在运行」关着就不演");
    e.st().masterEnabled = true;
    e.setScript((n, body) => isTheater(body) ? "和导演稿做邻居" : "别的回答");
    e.fire(); await tick(2000);
    ok(e.calls.length === 7 && blocks(e.chat[7].mes) === 1, "总开关开回来就演");
    const pv = P("#adr044-plot-preview"); pv.value = "派人：让老周把口信送到";
    const inj = P("#adr044-plot-inject");
    await tick(500); click(W, inj); await tick(500); click(W, inj); await tick(1600);
    ok(e.chat[7].mes.indexOf("arrebol_d_visible:plot###") > 0 && e.chat[7].mes.indexOf("让老周把口信送到") > 0, "导演稿挂进同一楼");
    ok(blocks(e.chat[7].mes) === 1 && e.chat[7].mes.indexOf("和导演稿做邻居") > 0, "导演稿挂上之后剧场还在");
    e.setScript((n, body) => isTheater(body) ? "导演稿后面再来一场" : "别的回答");
    // 导演稿刚写进这一楼，楼的字数变了：「楼还在出字」的证据要安静 4 秒才算落定，剧场会等它
    await tick(500); click(W, P("#adr044-theater-now")); await tick(1200);
    ok(e.calls.length === 7 && W.__adrDGenTest.looksLive() === true, "导演稿刚挂上的 4 秒里剧场先等着，不抢");
    await tick(4800);
    ok(blocks(e.chat[7].mes) === 1 && e.chat[7].mes.indexOf("导演稿后面再来一场") > 0 && e.chat[7].mes.indexOf("和导演稿做邻居") < 0, "再演一场：旧的换掉");
    ok(e.chat[7].mes.indexOf("让老周把口信送到") > 0 && e.chat[7].mes.indexOf("<content>车门一关，他什么也没说。</content>") === 0, "导演稿与正文都原样留着");

    section("默认折叠；和自动蛐蛐一起开");
    const fold = P("#adr044-theater-fold"); fold.checked = true; change(W, fold); await tick(50);
    ok(e.st().theaterFold === true, "折叠存进设置");
    e.st().lampAutoQuip = true;
    e.chat.push({ is_user: true, name: "江", mes: "去哪" });
    e.chat.push({ is_user: false, name: "阿尔", mes: "<content>「到了再说。」</content><report>到了再说。</report>" });
    e.setScript((n, body) => isTheater(body) ? "折叠着的一场" : (body.messages[body.messages.length - 1].content.indexOf("【自动蛐蛐】") >= 0 ? "到了再说，这人把悬念当饭吃。" : "别的回答"));
    const before = e.calls.length;
    e.fire(); await tick(2400);
    const mine = e.calls.slice(before);
    ok(mine.length === 2 && mine.filter(c => isTheater(c.body)).length === 1 && mine.filter(c => c.body.messages[c.body.messages.length - 1].content.indexOf("【自动蛐蛐】") >= 0).length === 1, "一层落地：剧场一次、蛐蛐一次，各发各的", String(mine.length));
    ok(e.chat[9].mes.indexOf('<details class="arrebol-d-theater"><summary>🎭 红霞剧场 · 弹幕吐槽</summary>折叠着的一场</details>') > 0, "默认折叠的那块不带 open");
    ok(e.calls.slice(before).every(c => c.body.messages[0].content.indexOf("折叠着的一场") < 0 && c.body.messages[0].content.indexOf("导演稿后面再来一场") < 0), "蛐蛐读楼时读不到任何一场剧场");
    const pop = d.getElementById("adr044-auto-trigger-popup");
    ok(!!pop && pop.querySelector(".adr044-auto-trigger-popup-text").textContent.indexOf("悬念当饭吃") >= 0, "蛐蛐的小窗照弹");

    section("收尾");
    ok(e.logs.filter(l => l.indexOf("ERR") === 0).length === 0, "全程没有 console.error", e.logs.filter(l => l.indexOf("ERR") === 0).join(" | "));

    console.log("\n通过 " + PASS + " · 失败 " + FAIL + (FAIL ? "\n  " + failures.join("\n  ") : ""));
    process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
