// v1.38.5 测试：导演不抢半楼。旧写法 GENERATION_STARTED 升旗、3 分钟没等到结束事件就强制降旗，
// 慢模型一楼出 5 分钟，保险丝一烧导演就拿半楼开分析。现在看三样：旗子 / 酒馆停止按钮 / 最后一楼字数还在不在长，
// 并且楼写完至少安静 4 秒才读。用 jsdom 真跑 index.js，模拟流式长楼、漏事件、只有停止按钮三种情形。
// 跑法同其余几套：npm install jsdom && SPEED=10 node test_settle.js
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
const SPEED = Number(process.env.SPEED || 1);
const tick = ms => new Promise(r => setTimeout(r, Math.max(1, Math.round(ms / SPEED))));
const real = ms => new Promise(r => setTimeout(r, ms));           // 真实时间：安静期、保险丝按 Date.now() 算
async function waitFor(fn, maxMs) {
    const t0 = Date.now();
    while (Date.now() - t0 < (maxMs || 30000)) { if (fn()) return true; await new Promise(r => setTimeout(r, 20)); }
    return !!fn();
}
const reply = text => JSON.stringify({ choices: [{ message: { content: text } }] });

function build(settings) {
    const dom = new JSDOM('<!doctype html><html><body><div id="mes_stop" style="display:none"></div></body></html>',
        { url: "https://example.org/", pretendToBeVisual: true, runScripts: "outside-only" });
    const win = dom.window; win.top = win;
    win.TextDecoder = TextDecoder;
    const chat = [], prompts = {}, extensionSettings = {}, chatMetadata = {}, handlers = {};
    extensionSettings[SET_KEY] = settings || {};
    const calls = [];
    let responder = () => ({ ok: true, status: 200, text: async () => reply("【情感方向】\n维持") });
    win.SillyTavern = { getContext: () => context };
    win.toastr = { info() {}, success() {}, warning() {}, error() {} };
    win.fetch = async (url, init) => { const rec = { url, body: JSON.parse(init.body), at: Date.now() }; calls.push(rec); return responder(rec); };
    const logs = [];
    win.console = { log(...a) { logs.push(a.map(String).join(" ")); }, warn(...a) { logs.push("W " + a.map(String).join(" ")); }, error(...a) { logs.push("E " + a.map(String).join(" ")); }, info() {}, debug() {} };
    win.reloadCurrentChat = () => {};
    const context = {
        extensionSettings, chatMetadata, chat, chatId: "settle", getCurrentChatId: () => "settle",
        name1: "江", name2: "陆冀北",
        saveSettingsDebounced() {}, saveSettings() {}, saveMetadataDebounced() {}, saveMetadata() {}, saveChat: async () => {},
        setExtensionPrompt(k, v) { prompts[k] = { value: v }; }, extensionPrompts: prompts,
        extensionPromptTypes: { IN_CHAT: 1 }, extensionPromptRoles: { SYSTEM: 0 },
        substituteParams: s => s, eventSource: { on(t, f) { (handlers[t] = handlers[t] || []).push(f); } },
        event_types: { APP_READY: "app_ready", MESSAGE_RECEIVED: "message_received", MESSAGE_SENT: "message_sent", GENERATION_STARTED: "generation_started", GENERATION_ENDED: "generation_ended", GENERATION_STOPPED: "generation_stopped", CHAT_CHANGED: "chat_changed" },
        updateMessageBlock() {}
    };
    if (SPEED > 1) {
        const rT = win.setTimeout.bind(win), rI = win.setInterval.bind(win);
        win.setTimeout = (fn, ms, ...a) => rT(fn, Math.max(0, Math.round((ms || 0) / SPEED)), ...a);
        win.setInterval = (fn, ms, ...a) => rI(fn, Math.max(1, Math.round((ms || 0) / SPEED)), ...a);
    }
    try { win.localStorage.clear(); } catch (e) {}
    win.eval(SRC);
    return {
        win, calls, chat, logs, prompts,
        setResponder(f) { responder = f; },
        addRound(userText, aiText) {
            chat.push({ is_user: true, mes: userText || "他把话说到一半就停住了。" });
            const mes = aiText || "<content>屋里安静下来，谁都没有先开口。</content>";
            chat.push({ is_user: false, name: "陆冀北", mes, swipe_id: 0, swipes: [mes] });
            return chat[chat.length - 1];
        },
        emit(t, ...args) { (handlers[t] || []).forEach(f => { try { f(...args); } catch (e) {} }); },
        stopBtn(on) { win.document.querySelector("#mes_stop").style.display = on ? "flex" : "none"; },
        promptText() { const c = this.calls[0]; return c ? String(c.body.messages[1].content || "") : ""; },
        stop() { try { win.clearInterval(win.__arrebolDAutoTriggerPoll); win.__arrebolDAutoTriggerPoll = null; } catch (e) {} try { dom.window.close(); } catch (e2) {} }
    };
}

const DIRECTOR = {
    masterEnabled: true, autoInjectEmotion: true, autoTriggerEmotion: true, autoTriggerEmotionRange: "custom", autoTriggerEmotionCustomRange: 2,
    autoTriggerPlot: false, showAutoTriggerPopup: false, floatInjectEnabled: true, streamEnabled: false,
    emotionApiEndpoint: "https://dir.example/v1", emotionApiKey: "k", emotionModel: "m", cdEnabled: false
};
// 到基准线：1 轮 + message_received，再等安静期过去。
async function baseline(b) {
    b.emit("app_ready"); await tick(3000);
    b.addRound(); b.emit("message_received"); await tick(6000); await real(4500);
}
// 模拟流式：一楼从空开始，每 250ms 真实时间长一截，总共 chunks 次。
async function streamFloor(b, msgObj, chunks) {
    for (let i = 1; i <= chunks; i++) { msgObj.mes = "<content>" + "慢模型一字一字往外吐，".repeat(i) + "</content>"; msgObj.swipes[0] = msgObj.mes; await real(250); }
    msgObj.mes = "<content>" + "慢模型一字一字往外吐，".repeat(chunks) + "最后一句才是关键：他转身走了。</content>";
    msgObj.swipes[0] = msgObj.mes;
}
const FINAL = "最后一句才是关键：他转身走了。";

(async () => {
    section("漏洞现场 · 旗子升了、结束事件迟迟不来、保险丝烧了：楼还在长就不能开分析");
    {
        const b = build(DIRECTOR);
        b.win.__adrDGenTest.setFuseMs(1500);      // 保险丝 1.5 秒（真实时间），模拟"3 分钟到了"
        b.win.__adrDGenTest.setEvidenceMs(3000);
        await baseline(b);
        ok(b.calls.length === 0, "基准线阶段没发请求");
        b.addRound();                                    // 第 2 轮（写完的）
        b.emit("generation_started", "normal", {}, false);
        const m = b.addRound("下一句", "");             // 第 3 轮到点，但楼是空的、正在流式
        ok(b.win.__adrDGenTest.flag() === true, "旗子升了");
        await streamFloor(b, m, 14);                     // 3.5 秒，远超 1.5 秒的保险丝
        ok(b.calls.length === 0, "楼还在长：保险丝烧了也没开分析", String(b.calls.length));
        ok(b.win.__adrDGenTest.flag() === true, "有字数在长的证据：旗子没被降");
        // 结束事件永远没来（漏事件）。楼停了、停止按钮也没亮：证据耗尽才降旗、才开工
        await waitFor(() => b.calls.length >= 1, 20000);
        ok(b.calls.length === 1, "楼停下、安静期过了之后才发请求", String(b.calls.length));
        ok(b.promptText().indexOf(FINAL) >= 0, "导演读到的是写完的整楼（含最后一句）");
        ok(b.logs.some(l => /generation flag cleared/.test(l)), "日志记了一笔：没等到结束事件、按证据降旗");
        b.stop();
    }

    section("正常流程 · 事件齐全：MESSAGE_RECEIVED 一到就能开工，不多等");
    {
        const b = build(DIRECTOR);
        await baseline(b);
        b.addRound();
        b.emit("generation_started", "normal", {}, false);
        const m = b.addRound("下一句", "");
        const grow = streamFloor(b, m, 6);
        await real(600);
        ok(b.calls.length === 0, "流式中没发请求");
        await grow;
        b.emit("message_received"); b.emit("generation_ended");
        const t0 = Date.now();
        await waitFor(() => b.calls.length >= 1, 20000);
        ok(b.calls.length === 1, "楼落定后发了请求");
        ok(Date.now() - t0 < 3000, "事件齐全就不多等安静期（< 3 秒）", String(Date.now() - t0));
        ok(b.promptText().indexOf(FINAL) >= 0, "读到整楼");
        b.stop();
    }

    section("只有停止按钮 · 事件全漏、字数也不长（模型在思考）：按钮亮着就等，灭了才开工");
    {
        const b = build(DIRECTOR);
        await baseline(b);
        b.addRound();
        b.addRound("下一句", "<content>完整的一楼。</content>");   // 第 3 轮到点
        b.stopBtn(true);                                            // 酒馆正在生成（比如在等思考），没发任何事件
        await real(4500); await tick(10000);
        ok(b.calls.length === 0, "停止按钮亮着：不发请求", String(b.calls.length));
        b.stopBtn(false);
        await waitFor(() => b.calls.length >= 1, 20000);
        ok(b.calls.length === 1, "按钮灭了才发");
        b.stop();
    }

    console.log("\n════════════════════════════════\n通过 " + PASS + " · 失败 " + FAIL + "\n════════════════════════════════" + (FAIL ? "\n  " + failures.join("\n  ") : ""));
    process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
