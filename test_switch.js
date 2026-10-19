// v1.38.4 测试：中途换聊天。导演等 API 的几十秒里用户换了角色卡，回来的稿子是上一把的，
// 绝不能挂到新聊天的楼里、更不能存进新聊天的浮动稿（那就常驻了）。
// 用 jsdom 桩子真跑 index.js：请求挂起 → 换聊天 → 再回稿，看新聊天干不干净；再看 CHAT_CHANGED 掐请求、同聊天对照、换聊天后浮动稿恢复。
// 跑法同其余几套：npm install jsdom && SPEED=10 node test_switch.js
const fs = require("fs");
const { JSDOM } = require("jsdom");

const SRC = fs.readFileSync("index.js", "utf8");
const SET_KEY = "arrebol-d-final-v1040-stable-settings";
const FLOAT_KEY = "ARREBOL_D_DIRECTOR_FLOAT";

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
const reply = text => JSON.stringify({ choices: [{ message: { content: text } }] });

function build(settings) {
    const dom = new JSDOM("<!doctype html><html><body></body></html>",
        { url: "https://example.org/", pretendToBeVisual: true, runScripts: "outside-only" });
    const win = dom.window; win.top = win;
    win.TextDecoder = TextDecoder;
    const prompts = {}, extensionSettings = {}, handlers = {}, popups = [];
    extensionSettings[SET_KEY] = settings || {};
    const calls = [];
    let responder = () => ({ ok: true, status: 200, text: async () => reply("【情感方向】\n维持") });

    win.SillyTavern = { getContext: () => context };
    win.toastr = { info() {}, success() {}, warning() {}, error() {} };
    win.fetch = async (url, init) => {
        const rec = { url, body: JSON.parse(init.body), signal: init.signal, chatAtSend: context.chatId };
        calls.push(rec);
        return responder(rec);
    };
    win.console = { log() {}, warn() {}, error() {}, info() {}, debug() {} };
    win.reloadCurrentChat = () => {};

    // 两把聊天：A（陆冀北）、B（另一张卡）。context 上的 chat / chatMetadata / chatId 换聊天时整个换掉，照酒馆的样子。
    const chats = { A: { chat: [], meta: {} }, B: { chat: [], meta: {} } };
    const context = {
        extensionSettings, chatMetadata: chats.A.meta, chat: chats.A.chat,
        chatId: "chat-A", getCurrentChatId: () => context.chatId,
        name1: "江", name2: "陆冀北",
        saveSettingsDebounced() {}, saveSettings() {},
        saveMetadataDebounced() {}, saveMetadata() {},
        saveChat: async () => {},
        setExtensionPrompt(k, v) { prompts[k] = { value: v }; },
        extensionPrompts: prompts,
        extensionPromptTypes: { IN_CHAT: 1 }, extensionPromptRoles: { SYSTEM: 0 },
        substituteParams: s => s,
        eventSource: { on(t, f) { (handlers[t] = handlers[t] || []).push(f); } },
        event_types: { APP_READY: "app_ready", MESSAGE_RECEIVED: "message_received", GENERATION_STARTED: "generation_started", GENERATION_ENDED: "generation_ended", CHAT_CHANGED: "chat_changed" },
        updateMessageBlock() {}
    };
    const origAppend = win.document.body.appendChild.bind(win.document.body);
    win.document.body.appendChild = function (el) {
        try { if (el && el.id === "adr044-auto-trigger-popup") popups.push(el.textContent || ""); } catch (e) {}
        return origAppend(el);
    };
    if (SPEED > 1) {
        const rT = win.setTimeout.bind(win), rI = win.setInterval.bind(win);
        win.setTimeout = (fn, ms, ...a) => rT(fn, Math.max(0, Math.round((ms || 0) / SPEED)), ...a);
        win.setInterval = (fn, ms, ...a) => rI(fn, Math.max(1, Math.round((ms || 0) / SPEED)), ...a);
    }
    try { win.localStorage.clear(); } catch (e) {}
    win.eval(SRC);

    const b = {
        win, calls, popups, prompts, chats, context,
        setResponder(f) { responder = f; },
        addRound(which, userText, aiText) {
            const arr = chats[which].chat;
            arr.push({ is_user: true, mes: userText || "他把话说到一半就停住了。" });
            const mes = aiText || "<content>屋里安静下来，谁都没有先开口。</content>";
            arr.push({ is_user: false, name: which === "A" ? "陆冀北" : "另一位", mes, swipe_id: 0, swipes: [mes] });
        },
        switchTo(which, emitEvent) {
            context.chat = chats[which].chat;
            context.chatMetadata = chats[which].meta;
            context.chatId = "chat-" + which;
            context.name2 = which === "A" ? "陆冀北" : "另一位";
            if (emitEvent) b.emit("chat_changed");
        },
        emit(t, ...args) { (handlers[t] || []).forEach(f => { try { f(...args); } catch (e) {} }); },
        lastAi(which) { const arr = chats[which].chat; for (let i = arr.length - 1; i >= 0; i--) if (!arr[i].is_user) return arr[i]; return null; },
        floatValue() { return prompts[FLOAT_KEY] ? String(prompts[FLOAT_KEY].value || "") : ""; },
        floatInMeta(which) { const m = chats[which].meta.arrebol_d; return m && m.float && m.float.text ? String(m.float.text) : ""; },
        statusText() { const el = win.document.querySelector("#adr044-emotion-status"); return el ? el.textContent : ""; },
        stop() { try { win.clearInterval(win.__arrebolDAutoTriggerPoll); win.__arrebolDAutoTriggerPoll = null; } catch (e) {} try { dom.window.close(); } catch (e2) {} }
    };
    return b;
}

const DIRECTOR = {
    masterEnabled: true, autoInjectEmotion: true, autoTriggerEmotion: true, autoTriggerEmotionRange: "custom", autoTriggerEmotionCustomRange: 2,
    autoTriggerPlot: false, showAutoTriggerPopup: false, floatInjectEnabled: true, streamEnabled: false,
    emotionApiEndpoint: "https://dir.example/v1", emotionApiKey: "k", emotionModel: "m", cdEnabled: false
};
// 把 A 推到自动触发点：先 1 轮定基准线，再加 2 轮到点，等请求发出。
async function primeDirector(b) {
    b.emit("app_ready"); await tick(3000);
    b.addRound("A"); b.emit("message_received"); await tick(6000);
    b.addRound("A"); b.addRound("A"); b.emit("message_received");
    await waitFor(() => b.calls.length >= 1, 30000);
}
// 挂起的响应：拿到 resolve 后再决定什么时候回稿；signal 一 abort 就按 AbortError 拒掉。
function hangingResponder() {
    let release;
    const gate = new Promise(r => { release = r; });
    const f = rec => new Promise((resolve, reject) => {
        if (rec.signal) rec.signal.addEventListener("abort", () => { const e = new Error("aborted"); e.name = "AbortError"; reject(e); });
        gate.then(text => resolve({ ok: true, status: 200, text: async () => reply(text) }));
    });
    return { responder: f, release: text => release(text) };
}
// 注入块两种写法：HTML 注释标记或带类型纯文本标记（v1.9.27 起）
const hasInj = mes => /ARREBOL_D_START:emotion|arrebol_d(?:_visible)?:emotion###/.test(String(mes || ""));

(async () => {
    section("对照 · 不换聊天：稿子挂进 A 的最后一楼，浮动稿贴上、存进 A");
    {
        const b = build(DIRECTOR);
        const h = hangingResponder(); b.setResponder(h.responder);
        await primeDirector(b);
        ok(b.calls.length === 1 && b.calls[0].chatAtSend === "chat-A", "A 到点，请求发出");
        ok(b.win.__adrDSwitchTest.runChatKey() === "chat-A", "开跑时记下家在 chat-A");
        h.release("【情感方向】\nA 的稿");
        await waitFor(() => /已注入/.test(b.statusText()), 10000);
        ok(/已注入/.test(b.statusText()), "状态：已注入", b.statusText());
        ok(hasInj(b.lastAi("A").mes), "A 最后一楼有注入块");
        ok(/A 的稿/.test(b.floatValue()), "浮动稿贴上了 A 的稿");
        ok(/A 的稿/.test(b.floatInMeta("A")), "A 的聊天文件记了浮动稿");
        ok(b.win.__adrDSwitchTest.runChatKey() === "", "跑完清掉家的记号");
        b.stop();
    }

    section("漏洞现场 · 请求挂着时换到 B，稿子回来：B 一根毛都不能沾");
    {
        const b = build(DIRECTOR);
        const h = hangingResponder(); b.setResponder(h.responder);
        await primeDirector(b);
        ok(b.calls.length === 1, "A 的请求挂着");
        b.addRound("B", "新卡第一句", "<content>B 的开场白。</content>");
        b.switchTo("B", false);                       // 先不发事件：模拟事件还没到、稿子先回来了
        h.release("【情感方向】\n这是 A 的稿，不该出现在 B");
        await waitFor(() => /切换/.test(b.statusText()), 10000);
        ok(/切换了聊天/.test(b.statusText()), "状态行说明中途换了聊天", b.statusText());
        ok(!hasInj(b.lastAi("B").mes), "B 的楼里没有注入块");
        ok(!hasInj(b.lastAi("A").mes), "A 的楼也没被写（人已经不在 A）");
        ok(!/A 的稿/.test(b.floatValue()), "浮动稿没贴 A 的稿");
        ok(b.floatInMeta("B") === "", "B 的聊天文件里没有浮动稿（不会常驻）");
        ok(b.floatInMeta("A") === "", "A 的聊天文件也没写");
        ok(b.popups.every(p => !/失败/.test(p)), "不弹失败窗（这不是失败）");
        // 事件晚到：恢复浮动稿照旧是空
        b.emit("chat_changed"); await tick(1200);
        ok(b.floatValue() === "", "CHAT_CHANGED 后恢复 B 的浮动稿：空");
        b.stop();
    }

    section("掐请求 · 请求挂着时 CHAT_CHANGED 到了：当场 abort，静默收场");
    {
        const b = build(DIRECTOR);
        const h = hangingResponder(); b.setResponder(h.responder);
        await primeDirector(b);
        const sig = b.calls[0].signal;
        b.addRound("B");
        b.switchTo("B", true);
        await waitFor(() => sig && sig.aborted, 5000);
        ok(sig && sig.aborted, "fetch 的 signal 被 abort");
        await waitFor(() => /取消/.test(b.statusText()), 5000);
        ok(/切换了聊天.*取消/.test(b.statusText()), "状态行：上一把的分析已取消", b.statusText());
        ok(b.popups.every(p => !/失败|超时/.test(p)), "不弹失败/超时窗");
        ok(!hasInj(b.lastAi("B").mes), "B 的楼干净");
        ok(b.floatValue() === "", "浮动稿空");
        // B 自己到点照常能跑（processing 没卡死）：先等 B 的基准线建账落定，再加两轮到点
        b.setResponder(() => ({ ok: true, status: 200, text: async () => reply("【情感方向】\nB 自己的稿") }));
        b.emit("message_received");
        await waitFor(() => { const a = (b.chats.B.meta.arrebol_d || {}).auto; return !!(a && a.emotion && Number(a.emotion.base) === 1); }, 20000);
        ok(((b.chats.B.meta.arrebol_d || {}).auto || {}).emotion.base === 1, "B 自己的基准线建账为 1（不是从 A 带过来的）");
        b.addRound("B"); b.addRound("B"); b.emit("message_received");
        await waitFor(() => b.calls.length >= 2, 60000);
        ok(b.calls.length >= 2 && b.calls[b.calls.length - 1].chatAtSend === "chat-B", "B 到点能发自己的请求（processing 没被卡死）", String(b.calls.length));
        await waitFor(() => /B 自己的稿/.test(b.floatValue()), 10000);
        ok(/B 自己的稿/.test(b.floatValue()) && /B 自己的稿/.test(b.floatInMeta("B")), "B 自己的稿正常贴上、正常存进 B");
        b.stop();
    }

    section("换聊天恢复 · A 有浮动稿，换到没稿的 B 要清空，换回 A 要贴回");
    {
        const b = build(DIRECTOR);
        await primeDirector(b);
        await waitFor(() => /已注入/.test(b.statusText()), 10000);
        ok(/维持/.test(b.floatValue()), "A 贴着浮动稿");
        b.addRound("B");
        b.switchTo("B", true); await tick(1200);
        ok(b.floatValue() === "", "换到 B：浮动稿清空", JSON.stringify(b.floatValue()));
        b.switchTo("A", true); await tick(1200);
        ok(/维持/.test(b.floatValue()), "换回 A：浮动稿贴回");
        b.stop();
    }

    console.log("\n════════════════════════════════\n通过 " + PASS + " · 失败 " + FAIL + "\n════════════════════════════════" + (FAIL ? "\n  " + failures.join("\n  ") : ""));
    process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
