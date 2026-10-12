// v1.38.0 测试：A 社官网直连。小红霞在浏览器里直接 fetch api.anthropic.com，预检要带
// anthropic-dangerous-direct-browser-access: true 才过 CORS；/v1/models 要 x-api-key，聊天口照旧 Bearer。
// 先测纯函数（钩子 __adrDAuthTest），再用 jsdom 真跑 index.js，看导演请求与模型列表两条路实际发出的头。
// 跑法同其余几套：npm install jsdom && node test_anthropic.js
const fs = require("fs");
const { JSDOM } = require("jsdom");

const SRC = fs.readFileSync("index.js", "utf8").replace("    wait();",
    "    window.uiTest = { init, adr048OpenPopupPanel };");
const SET_KEY = "arrebol-d-final-v1040-stable-settings";

let PASS = 0, FAIL = 0; const failures = [];
function ok(c, name, extra) {
    if (c) { PASS++; console.log("  ✓ " + name); }
    else { FAIL++; failures.push(name); console.log("  ✗ " + name + (extra ? "  → " + extra : "")); }
}
function section(t) { console.log("\n── " + t + " ──"); }
const delay = ms => new Promise(r => setTimeout(r, ms));
async function openPanel(T) {
    await delay(450);
    T.win.uiTest.adr048OpenPopupPanel(); await delay(200);
    return T.doc.querySelector("#adr048-popup-body");
}
function click(T, el) { if (el) el.dispatchEvent(new T.win.MouseEvent("click", { bubbles: true })); }
async function waitFor(fn, maxMs) {
    const t0 = Date.now();
    while (Date.now() - t0 < (maxMs || 5000)) { if (fn()) return true; await new Promise(r => setTimeout(r, 20)); }
    return !!fn();
}

function build(settings) {
    const dom = new JSDOM("<!doctype html><html><body></body></html>",
        { url: "https://example.org/", pretendToBeVisual: true, runScripts: "outside-only" });
    const win = dom.window; win.top = win;
    win.TextDecoder = TextDecoder;
    const chat = [], prompts = {}, extensionSettings = {}, chatMetadata = {}, handlers = {};
    extensionSettings[SET_KEY] = settings || {};
    const calls = [];
    let responder = () => ({ ok: true, status: 200, text: async () => JSON.stringify({ choices: [{ message: { content: "【情感方向】\n维持" } }] }) });
    win.SillyTavern = { getContext: () => context };
    win.toastr = { info() {}, success() {}, warning() {}, error() {} };
    win.fetch = async (url, init) => {
        const rec = { url, method: (init && init.method) || "GET", headers: (init && init.headers) || {}, body: init && init.body ? JSON.parse(init.body) : null };
        calls.push(rec);
        return responder(rec);
    };
    win.console = { log() {}, warn() {}, error() {}, info() {}, debug() {} };
    win.reloadCurrentChat = () => {};
    const context = {
        extensionSettings, chatMetadata, chat,
        chatId: "anthropic-test", getCurrentChatId: () => "anthropic-test",
        name1: "江", name2: "陆冀北",
        saveSettingsDebounced() {}, saveSettings() {}, saveMetadataDebounced() {}, saveMetadata() {},
        saveChat: async () => {},
        setExtensionPrompt(k, v) { prompts[k] = { value: v }; }, extensionPrompts: prompts,
        extensionPromptTypes: { IN_CHAT: 1 }, extensionPromptRoles: { SYSTEM: 0 },
        substituteParams: s => s,
        eventSource: { on(t, f) { (handlers[t] = handlers[t] || []).push(f); } },
        event_types: { APP_READY: "app_ready", MESSAGE_RECEIVED: "message_received", GENERATION_STARTED: "generation_started", GENERATION_ENDED: "generation_ended" },
        updateMessageBlock() {}
    };
    try { win.localStorage.clear(); } catch (e) {}
    win.eval(SRC);
    win.uiTest.init();
    return {
        win, doc: win.document, calls, chat,
        setResponder(f) { responder = f; },
        stop() { try { win.clearInterval(win.__arrebolDAutoTriggerPoll); } catch (e) {} try { win.close(); } catch (e) {} }
    };
}

(async () => {
    section("纯函数：域名识别");
    const T0 = build({}); const H = T0.win.__adrDAuthTest;
    ok(!!H, "钩子 __adrDAuthTest 挂上了");
    ok(H.isAnthropicDirect("https://api.anthropic.com/v1/chat/completions") === true, "api.anthropic.com 认得出");
    ok(H.isAnthropicDirect("https://API.Anthropic.com/v1/models") === true, "大小写不敏感");
    ok(H.isAnthropicDirect("https://my-relay.example.com/anthropic.com/v1") === false, "路径里出现 anthropic.com 不算");
    ok(H.isAnthropicDirect("https://notanthropic.com/v1") === false, "notanthropic.com 不算");
    ok(H.isAnthropicDirect("https://api.deepseek.com/v1/chat/completions") === false, "DS 不算");
    ok(H.isAnthropicDirect("not a url") === false, "坏地址不抛错、返回 false");
    ok(H.chatUrl("https://api.anthropic.com") === "https://api.anthropic.com/v1/chat/completions", "官网裸域名补成 /v1/chat/completions");
    ok(H.chatUrl("https://api.anthropic.com/v1/") === "https://api.anthropic.com/v1/chat/completions", "官网带 /v1/ 不重复补");

    section("纯函数：请求头");
    let h = H.authHeaders({ "Content-Type": "application/json" }, "sk-ant-x", "https://api.anthropic.com/v1/chat/completions");
    ok(h["anthropic-dangerous-direct-browser-access"] === "true", "官网聊天口带浏览器直连头");
    ok(h.Authorization === "Bearer sk-ant-x", "官网聊天口仍走 Bearer（OpenAI 兼容层）");
    ok(!h["x-api-key"], "官网聊天口不带 x-api-key");
    h = H.authHeaders({}, "sk-ant-x", "https://api.anthropic.com/v1/models", "native");
    ok(h["anthropic-dangerous-direct-browser-access"] === "true", "官网模型口带浏览器直连头");
    ok(h["x-api-key"] === "sk-ant-x" && h["anthropic-version"] === "2023-06-01", "官网模型口走 x-api-key + anthropic-version");
    ok(!h.Authorization, "官网模型口不带 Bearer");
    h = H.authHeaders({ "Content-Type": "application/json" }, "sk-ds", "https://api.deepseek.com/v1/chat/completions");
    ok(h.Authorization === "Bearer sk-ds" && !h["anthropic-dangerous-direct-browser-access"] && !h["x-api-key"], "非官网：只有 Bearer，一个多余的头都没有");
    h = H.authHeaders({}, "sk-ds", "https://relay.example.com/v1/models", "native");
    ok(h.Authorization === "Bearer sk-ds" && !h["x-api-key"], "非官网模型口照旧 Bearer");
    h = H.authHeaders({}, "", "https://api.anthropic.com/v1/chat/completions");
    ok(h["anthropic-dangerous-direct-browser-access"] === "true" && !h.Authorization && !h["x-api-key"], "空钥匙：只带直连头，不造空 Bearer");

    section("纯函数：请求体（v1.38.1 temperature）");
    let b = JSON.parse(H.requestBody({ model: "claude-opus-5-5", messages: [], temperature: 0.6, top_p: 0.9, stream: true }, "https://api.anthropic.com/v1/chat/completions"));
    ok(!("temperature" in b) && !("top_p" in b), "官网：temperature / top_p 摘掉");
    ok(b.model === "claude-opus-5-5" && b.stream === true, "官网：其余字段不动");
    b = JSON.parse(H.requestBody({ model: "deepseek-chat", messages: [], temperature: 0.6, stream: true }, "https://relay.example.com/v1/chat/completions"));
    ok(b.temperature === 0.6, "中转站：temperature 原样送");
    ok(H.temperatureRejected(400, '{"error":{"message":"`temperature` is deprecated for this model."}}') === true, "认得 A 社那句 400");
    ok(H.temperatureRejected(400, '{"error":{"message":"model not found"}}') === false, "别的 400 不算");
    ok(H.temperatureRejected(401, "temperature") === false, "401 不算");
    T0.stop();

    section("真跑：官网模型列表");
    const T1 = build({ emotionApiEndpoint: "https://api.anthropic.com", emotionApiKey: "sk-ant-list", emotionModel: "claude-opus-5-5" });
    T1.setResponder(() => ({ ok: true, status: 200, text: async () => JSON.stringify({ data: [{ id: "claude-opus-5-5" }, { id: "claude-sonnet-5-5" }] }) }));
    const root1 = await openPanel(T1);
    const btn = root1 && root1.querySelector("#adr044-emotion-load-models");
    ok(!!btn, "浮窗里有「加载模型」按钮");
    click(T1, btn);
    await waitFor(() => T1.calls.length >= 1);
    const m = T1.calls[0] || {};
    ok(m.url === "https://api.anthropic.com/v1/models", "打到 /v1/models", m.url);
    ok(m.headers["x-api-key"] === "sk-ant-list", "带 x-api-key");
    ok(m.headers["anthropic-version"] === "2023-06-01", "带 anthropic-version");
    ok(m.headers["anthropic-dangerous-direct-browser-access"] === "true", "带浏览器直连头");
    ok(!m.headers.Authorization, "不带 Bearer");
    await waitFor(() => /已加载 2 个模型/.test(T1.doc.body.textContent || ""), 3000);
    ok(/已加载 2 个模型/.test(T1.doc.body.textContent || ""), "两个模型装进下拉");
    T1.stop();

    section("真跑：官网导演请求（非流式）");
    const T2 = build({ emotionApiEndpoint: "https://api.anthropic.com/", emotionApiKey: "sk-ant-chat", emotionModel: "claude-opus-5-5", streamEnabled: false });
    for (let i = 0; i < 3; i++) {
        T2.chat.push({ is_user: true, mes: "他把话说到一半就停住了。" });
        T2.chat.push({ is_user: false, name: "陆冀北", mes: "屋里安静下来。", swipe_id: 0, swipes: ["屋里安静下来。"] });
    }
    const root2 = await openPanel(T2);
    const gen = root2 && root2.querySelector("#adr044-emotion-generate");
    ok(!!gen, "浮窗里有「分析」按钮");
    click(T2, gen); await delay(600); click(T2, gen);   // 两步确认：再点一次开始分析（按钮有 450ms 防抖，隔开点）
    await waitFor(() => T2.calls.length >= 1);
    const c = T2.calls[0] || {};
    ok(c.url === "https://api.anthropic.com/v1/chat/completions", "打到 /v1/chat/completions（OpenAI 兼容层）", c.url);
    ok(c.headers.Authorization === "Bearer sk-ant-chat", "聊天口走 Bearer");
    ok(c.headers["anthropic-dangerous-direct-browser-access"] === "true", "带浏览器直连头");
    ok(!c.headers["x-api-key"], "聊天口不带 x-api-key");
    ok(c.body && c.body.model === "claude-opus-5-5" && c.body.stream === false, "请求体照旧（model / stream:false）");
    ok(c.body && !("temperature" in c.body), "官网请求体不带 temperature");
    T2.stop();

    section("真跑：中转站一字不变");
    const T3 = build({ emotionApiEndpoint: "https://relay.example.com/v1", emotionApiKey: "sk-relay", emotionModel: "deepseek-chat", streamEnabled: false });
    for (let i = 0; i < 3; i++) {
        T3.chat.push({ is_user: true, mes: "他把话说到一半就停住了。" });
        T3.chat.push({ is_user: false, name: "陆冀北", mes: "屋里安静下来。", swipe_id: 0, swipes: ["屋里安静下来。"] });
    }
    const root3 = await openPanel(T3);
    const gen3 = root3 && root3.querySelector("#adr044-emotion-generate");
    click(T3, gen3); await delay(600); click(T3, gen3);
    await waitFor(() => T3.calls.length >= 1);
    const r = T3.calls[0] || {};
    ok(r.url === "https://relay.example.com/v1/chat/completions", "中转站地址照旧", r.url);
    ok(r.headers.Authorization === "Bearer sk-relay", "中转站 Bearer 照旧");
    ok(Object.keys(r.headers).sort().join(",") === "Accept,Authorization,Content-Type", "中转站请求头只有 Accept / Authorization / Content-Type", Object.keys(r.headers).join(","));
    ok(r.body && r.body.temperature === 0.6, "中转站请求体仍带 temperature 0.6");
    T3.stop();

    section("真跑：中转站后面挂新 Claude，400 temperature 摘掉重试");
    const T4 = build({ emotionApiEndpoint: "https://relay.example.com/v1", emotionApiKey: "sk-relay", emotionModel: "claude-opus-5-5", streamEnabled: false });
    T4.setResponder(rec => {
        if ("temperature" in rec.body) return { ok: false, status: 400, text: async () => JSON.stringify({ error: { code: "invalid_request_error", message: "`temperature` is deprecated for this model.", type: "invalid_request_error" } }) };
        return { ok: true, status: 200, text: async () => JSON.stringify({ choices: [{ message: { content: "【情感方向】\n维持" } }] }) };
    });
    for (let i = 0; i < 3; i++) {
        T4.chat.push({ is_user: true, mes: "他把话说到一半就停住了。" });
        T4.chat.push({ is_user: false, name: "陆冀北", mes: "屋里安静下来。", swipe_id: 0, swipes: ["屋里安静下来。"] });
    }
    const root4 = await openPanel(T4);
    const gen4 = root4 && root4.querySelector("#adr044-emotion-generate");
    click(T4, gen4); await delay(600); click(T4, gen4);
    await waitFor(() => T4.calls.length >= 2, 5000);
    ok(T4.calls.length === 2, "发了两次：第一次带 temperature 被拒，第二次重试", String(T4.calls.length));
    ok(T4.calls[0] && T4.calls[0].body.temperature === 0.6, "第一次带 temperature");
    ok(T4.calls[1] && !("temperature" in T4.calls[1].body), "第二次摘掉 temperature");
    await waitFor(() => /维持/.test((root4.querySelector("#adr044-emotion-preview") || {}).value || ""), 3000);
    ok(/维持/.test((root4.querySelector("#adr044-emotion-preview") || {}).value || ""), "重试结果落进稿子");
    T4.stop();

    section("真跑：中转站别的 400 不重试");
    const T5 = build({ emotionApiEndpoint: "https://relay.example.com/v1", emotionApiKey: "sk-relay", emotionModel: "nope", streamEnabled: false });
    T5.setResponder(() => ({ ok: false, status: 400, text: async () => JSON.stringify({ error: { message: "model not found" } }) }));
    for (let i = 0; i < 3; i++) {
        T5.chat.push({ is_user: true, mes: "他把话说到一半就停住了。" });
        T5.chat.push({ is_user: false, name: "陆冀北", mes: "屋里安静下来。", swipe_id: 0, swipes: ["屋里安静下来。"] });
    }
    const root5 = await openPanel(T5);
    const gen5 = root5 && root5.querySelector("#adr044-emotion-generate");
    click(T5, gen5); await delay(600); click(T5, gen5);
    await waitFor(() => T5.calls.length >= 1, 5000); await delay(300);
    ok(T5.calls.length === 1, "只发一次，不重试", String(T5.calls.length));
    T5.stop();

    console.log("\n" + PASS + " passed, " + FAIL + " failed" + (FAIL ? "\n  " + failures.join("\n  ") : ""));
    process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
