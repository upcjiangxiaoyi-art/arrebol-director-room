// v1.22.0 择池测试。DS 用假接口顶替，既能断言"我们到底喂了什么、按什么顺序"，
// 也能脚本化它的答复来验弃权、节流、降级三条链路。
// 语境顺序是这一版的核心改动，必须逐段断言，不能只看"跑通了"。
const fs = require("fs");
const { JSDOM } = require("jsdom");

const SRC = fs.readFileSync("index.js", "utf8");
const SET_KEY = "arrebol-d-final-v1040-stable-settings";
const META_KEY = "arrebol_d_cd";

let PASS = 0, FAIL = 0; const failures = [];
function ok(c, name, extra) {
    if (c) { PASS++; console.log("  ✓ " + name); }
    else { FAIL++; failures.push(name); console.log("  ✗ " + name + (extra ? "  → " + extra : "")); }
}
function section(t) { console.log("\n── " + t + " ──"); }
const tick = ms => new Promise(r => setTimeout(r, ms));

function build(opts) {
    opts = opts || {};
    const dom = new JSDOM("<!doctype html><html><body></body></html>",
        { url: "https://example.org/", pretendToBeVisual: true, runScripts: "outside-only" });
    const win = dom.window; win.top = win;
    const chat = [], prompts = {}, extensionSettings = {}, chatMetadata = {}, handlers = {};
    if (opts.settings) extensionSettings[SET_KEY] = opts.settings;

    const calls = [];                 // 每次发给 DS 的请求
    let script = () => "";            // DS 这次答什么
    let failNext = false;             // 让 DS 这次直接挂掉

    win.SillyTavern = { getContext: () => context };
    win.toastr = { info() {}, success() {}, warning() {}, error() {} };
    win.fetch = async (url, init) => {
        const body = JSON.parse(init.body);
        calls.push({ url, sys: body.messages[0].content, user: body.messages[1].content, body });
        if (failNext) throw new Error("mock DS down");
        const answer = script(calls.length, body);
        return {
            ok: true, status: 200,
            text: async () => JSON.stringify({ choices: [{ message: { content: answer } }] })
        };
    };
    const draws = [], logs = [];
    win.console = {
        log(...a) { logs.push(String(a[0] || "")); if (String(a[0] || "").indexOf("投卡") >= 0 && a[1]) draws.push(a[1]); },
        warn(...a) { logs.push(a.map(x => (typeof x === "object" ? JSON.stringify(x) : String(x))).join(" ")); },
        error() {}, info() {}, debug() {}
    };

    const context = {
        extensionSettings, chatMetadata, chat,
        chatId: "pick-test", getCurrentChatId: () => "pick-test",
        saveSettingsDebounced() {}, saveSettings() {},
        saveMetadataDebounced() {}, saveMetadata() {},
        setExtensionPrompt(k, v) { prompts[k] = { value: v }; },
        extensionPrompts: prompts,
        extensionPromptTypes: { IN_CHAT: 1 }, extensionPromptRoles: { SYSTEM: 0 },
        substituteParams: s => s,
        eventSource: { on(t, f) { (handlers[t] = handlers[t] || []).push(f); } },
        event_types: { APP_READY: "app_ready", MESSAGE_RECEIVED: "message_received" }
    };
    win.eval(SRC);

    return {
        win, doc: win.document, context, prompts, calls, draws, logs,
        setScript(f) { script = f; },
        setFail(v) { failNext = v; },
        st: () => extensionSettings[SET_KEY],
        meta: () => chatMetadata[META_KEY],
        addRound() {
            chat.push({ is_user: true, mes: "用户回了一句。" });
            chat.push({ is_user: false, mes: "<content>第 " + (chat.length + 1) + " 段正文。</content>" });
        },
        emit(t) { (handlers[t] || []).forEach(f => { try { f(); } catch (e) {} }); },
        killPoll() { try { win.clearInterval(win.__arrebolDAutoTriggerPoll); win.__arrebolDAutoTriggerPoll = null; } catch (e) {} },
        stop() { try { win.clearInterval(win.__arrebolDAutoTriggerPoll); } catch (e) {} dom.window.close(); }
    };
}
function tapFast(win, el) {
    el.__adrDLastAcceptedTapAt = 0; el.__adrDLastTouchEndAt = 0; el.__adrDTapStart = null;
    el.dispatchEvent(new win.Event("click", { bubbles: true }));
}
function setCheck(win, el, v) {
    el.dispatchEvent(new win.Event("pointerdown", { bubbles: true }));
    el.checked = v; el.dispatchEvent(new win.Event("change", { bubbles: true }));
}
function setSelect(win, el, v) {
    el.dispatchEvent(new win.Event("pointerdown", { bubbles: true }));
    el.value = v; el.dispatchEvent(new win.Event("change", { bubbles: true }));
}
function setInput(win, el, v) {
    el.dispatchEvent(new win.Event("pointerdown", { bubbles: true }));
    el.value = v;
    el.dispatchEvent(new win.Event("input", { bubbles: true }));
    el.dispatchEvent(new win.Event("change", { bubbles: true }));
}

// 三格建库 + 开择池 + 填好假 API
async function bootPick(opts) {
    opts = opts || {};
    const e = build({ settings: { supplementMemory: "调性设定：" + "情欲描写".repeat(1200) } });
    e.win.document.dispatchEvent(new e.win.Event("DOMContentLoaded"));
    await tick(2400);
    e.killPoll();
    const d = e.doc;

    const libs = [["专属卡库", "## 甲\nS1\nS2\nS3\nS4\nS5", "story"],
                  ["通用卡库", "## 乙\nC1\nC2\nC3\nC4\nC5", "common"]];
    if (opts.nsfw !== false) libs.push(["情欲卡库", "## 丙\nN1\nN2\nN3\nN4\nN5", "nsfw"]);
    for (const [name, text, slot] of libs) {
        setSelect(e.win, d.querySelector("#adr044-cd-import-slot"), slot);
        await tick(30);
        d.querySelector("#adr044-cd-lib-name").value = name;
        d.querySelector("#adr044-cd-lib-editor").value = text;
        tapFast(e.win, d.querySelector("#adr044-cd-lib-save"));
        await tick(120);
    }
    const stock = d.querySelector('#adr044-cd-slot-common [data-adrcd-lib="通用"]');
    if (stock && stock.classList.contains("on")) { tapFast(e.win, stock); await tick(1700); }
    ["story", "common"].forEach(s => setCheck(e.win, d.querySelector("#adr044-cd-slot-on-" + s), true));
    setCheck(e.win, d.querySelector("#adr044-cd-slot-on-nsfw"), opts.nsfw !== false);

    setInput(e.win, d.querySelector("#adr044-cd-endpoint"), "https://ds.example.org/v1/chat/completions");
    setInput(e.win, d.querySelector("#adr044-cd-model"), "deepseek-chat");
    setSelect(e.win, d.querySelector("#adr044-cd-mode"), "pick");
    setCheck(e.win, d.querySelector("#adr044-cd-enabled"), true);
    setInput(e.win, d.querySelector("#adr044-cd-n"), String(opts.n || 1));
    await tick(150);
    return e;
}
async function beat(e) { e.addRound(); e.emit("message_received"); await tick(4600); }

(async function main() {

section("撤掉的两条闸确实不在了");
{
    const e = await bootPick();
    ok(!e.doc.querySelector("#adr044-cd-nsfwfreq"), "NSFW 出场频率下拉已移除（那是给盲抽用户的，打错了靶）");
    ok(e.st().cdNsfwFreq === undefined, "设置里也没留下这个字段", String(e.st().cdNsfwFreq));
    e.stop();
}

section("喂给 DS 的语境：顺序与配额");
{
    const e = await bootPick({ n: 1 });
    e.setScript(() => "通用·乙");
    for (let i = 0; i < 2; i++) await beat(e);
    ok(e.calls.length >= 1, "择池确实调用了 DS", "调用 " + e.calls.length + " 次");
    const u = e.calls[e.calls.length - 1].user;
    const s = e.calls[e.calls.length - 1].sys;

    const iNow = u.indexOf("【刚刚这一楼");
    const iBefore = u.indexOf("【再往前几楼");
    const iMenu = u.indexOf("【卡池名单】");
    const iTone = u.indexOf("【这个故事的整体调性");

    ok(iNow === 0, "此刻排在最前（旧版这里是 8000 字角色卡）", "位置 " + iNow);
    ok(iBefore > iNow, "前情排在此刻之后", "位置 " + iBefore);
    ok(iMenu > iBefore, "名单排在正文之后", "位置 " + iMenu);
    ok(iTone > iMenu, "静态调性被压到最后", "位置 " + iTone);

    const tone = u.slice(iTone);
    ok(tone.length < 2300, "静态调性截到 2000 上下（旧版 8000）", "长度 " + tone.length);
    ok(/只用来判断某类情节允不允许发生/.test(tone), "并且明说了它不是此刻的依据");
    ok(u.indexOf("此刻不投卡") > 0, "名单里带上了弃权位");
    ok(/【刚刚这一楼】就是此刻/.test(s), "系统提示词把此刻锚定在最后一楼");
    ok(/宁可这一楼什么都不投/.test(s), "系统提示词讲清了弃权的取舍");
    ok(/判断依据只看【刚刚这一楼】/.test(s), "NSFW 硬门也改成只看此刻（前几楼收场的不算数）");
    e.stop();
}

section("没有 NSFW 池时，那段硬门整段不注入");
{
    const e = await bootPick({ n: 1, nsfw: false });
    e.setScript(() => "通用·乙");
    for (let i = 0; i < 2; i++) await beat(e);
    const s = e.calls[e.calls.length - 1].sys;
    ok(!/NSFW/.test(s), "菜单里没有 NSFW 池就不提这个概念（省 token，也不平白种进去）");
    ok(/此刻不投卡/.test(s), "弃权位照常在");
    e.stop();
}

section("弃权 · DS 说此刻不投，就真的不投");
{
    const e = await bootPick({ n: 1 });
    e.setScript(() => "此刻不投卡");
    for (let i = 0; i < 3; i++) await beat(e);
    ok(e.draws.length === 0, "一张都没投", "投出 " + e.draws.length + " 张");
    ok(Number(e.meta().passUntil) > 0, "记下了节流窗口", "passUntil=" + e.meta().passUntil);
    ok(e.logs.some(l => /弃权/.test(l)), "日志里说清了是 DS 弃权，不是出错");
    const line = e.doc.querySelector("#adr044-cd-status-line");
    ok(line && /空过中/.test(line.textContent), "状态行明说正在空过", line && line.textContent);
    e.stop();
}

section("弃权节流 · 不该每楼都去问一次");
{
    // N=4 → 弃权后隔 3 楼再问。第一拍只对齐基准线，第五拍才到投卡点。
    const e = await bootPick({ n: 4 });
    e.setScript(() => "此刻不投卡");
    for (let i = 0; i < 5; i++) await beat(e);
    const after1 = e.calls.length;
    ok(after1 === 1, "到投卡点问了 DS 一次，得到弃权", "调用 " + after1 + " 次");
    await beat(e); await beat(e);
    ok(e.calls.length === after1, "空过期间没有再问（每楼都问就是白烧钱）",
        "累计 " + e.calls.length + " 次");
    await beat(e);
    ok(e.calls.length > after1, "节流窗口过后会重新问", "累计 " + e.calls.length + " 次");
    e.stop();
}

section("弃权后恢复 · 一旦 DS 改口就照常投卡，节流作废");
{
    const e = await bootPick({ n: 1 });
    let turn = 0;
    e.setScript(() => (++turn <= 1 ? "此刻不投卡" : "专属·甲"));
    for (let i = 0; i < 6; i++) await beat(e);
    ok(e.draws.length > 0, "后来投出来了", "投出 " + e.draws.length + " 张");
    ok(Number(e.meta().passUntil) === 0, "投出后节流窗口清零", "passUntil=" + e.meta().passUntil);
    ok(e.draws.every(x => String(x["卡池"]) === "专属·甲"), "投的正是 DS 点的池",
        e.draws.map(x => x["卡池"]).join("、"));
    e.stop();
}

section("DS 点 NSFW 池就照给 · 该来的时候不能被拦下");
{
    const e = await bootPick({ n: 1 });
    e.setScript(() => "NSFW·丙");
    for (let i = 0; i < 6; i++) await beat(e);
    ok(e.draws.length >= 3, "连着投了几张", "投出 " + e.draws.length + " 张");
    ok(e.draws.every(x => String(x["卡池"]).indexOf("NSFW·") === 0),
        "场面持续时连点同一格不会被拦（v1.21 那条连抽闸已撤，正是它会打断场面）",
        e.draws.map(x => x["卡池"]).join("、"));
    e.stop();
}

section("降级 · DS 挂掉时排除 NSFW，并且要出声");
{
    const e = await bootPick({ n: 1 });
    e.setFail(true);
    for (let i = 0; i < 12; i++) await beat(e);
    const drew = e.draws.length;
    ok(drew >= 8, "降级路径反复走到", "投出 " + drew + " 张");
    ok(e.draws.every(x => String(x["卡池"]).indexOf("NSFW·") !== 0),
        "降级 " + drew + " 次一张 NSFW 都没有（无闸门时撞不上的概率约 " +
        (Math.pow(2 / 3, drew) * 100).toFixed(2) + "%）",
        e.draws.map(x => x["卡池"]).join("、"));
    const line = e.doc.querySelector("#adr044-cd-status-line");
    ok(line && /DS 没应答时随机给的/.test(line.textContent),
        "状态行主动说明这张是降级随机给的（旧版降级完全静默）", line && line.textContent);
    e.stop();
}

section("答复清洗 · 弃权位也要认得出，垃圾答复照旧作废");
{
    const e = await bootPick({ n: 1 });
    e.setScript(() => "「此刻不投卡」");
    await beat(e); await beat(e);
    ok(Number(e.meta().passUntil) > 0, "带引号的弃权答复照样认", "passUntil=" + e.meta().passUntil);
    e.stop();
}
{
    const e = await bootPick({ n: 1 });
    e.setScript(() => "我觉得应该选通用·乙这个池子比较合适");
    for (let i = 0; i < 3; i++) await beat(e);
    ok(e.draws.length > 0, "答复不合法时降级盲抽，不停摆", "投出 " + e.draws.length + " 张");
    ok(e.draws.every(x => String(x["模式"] || "").indexOf("降级") >= 0),
        "并且如实记为降级", e.draws.map(x => x["模式"]).join("/"));
    e.stop();
}

console.log("\n════════════════════════════════");
console.log("通过 " + PASS + " · 失败 " + FAIL);
if (failures.length) console.log("失败项：\n  - " + failures.join("\n  - "));
console.log("════════════════════════════════");
process.exit(FAIL ? 1 : 0);

})().catch(e => { console.error("测试崩溃：", e); process.exit(2); });
