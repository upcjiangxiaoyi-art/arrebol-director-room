/*
 *  Arrebol Director Room 红霞导演室  v0.2
 *  SillyTavern RP 场外导演插件
 *
 *  v0.2 范围：小浮窗专测版 + 单导演手动台（情感导演）
 *  - 选择最近 N 轮 RP
 *  - 手动补充框 + 导演预设框
 *  - 调副 API（OpenAI 兼容 / OpenRouter）
 *  - 预览区：可编辑 / 补充指令重新分析 / 手动注入正文末尾
 *
 *  复用图像提取器验证过的 iframe 挂载与注入路径
 */

const EXT_NAME = "arrebol-director-room";
const DEFAULTS = {
    enabled: true,
    apiEndpoint: "", apiKey: "", model: "",
    requestTimeout: 0,
    range: 30,
    customRange: 0,
    directorPreset: "",
    supplementMemory: "",
    quickEntryLeft: "",
    quickEntryTop: "",
    showQuickEntry: true
};

const DEFAULT_DIRECTOR_PRESET =
"你是 RP 情感导演。请阅读最近的聊天内容和用户补充信息，只分析情感曲线与人设稳定，不写正文。\n\n" +
"你需要判断：\n" +
"1. 当前关系阶段是什么。\n" +
"2. 情绪温度是否过热、过冷、空转或错拍。\n" +
"3. 角色是否出现 OOC 风险。\n" +
"4. 是否存在秒爱、秒软、秒承诺、隐藏深情化。\n" +
"5. 是否把照顾误写成占有，把心疼误写成告白。\n" +
"6. 是否过度代演用户的心理与选择。\n" +
"7. 当前角色根据人设应该如何承接情绪。\n" +
"8. 下一阶段情感应该升温、降温、维持、错拍，还是延迟。\n\n" +
"输出必须短，不超过 300 字。不要写分析过程。不要写正文。只给下一阶段情感方向，要给可执行动作与明确禁区。\n\n" +
"固定输出格式：\n" +
"【情感方向】\n……\n\n【人设边界】\n……\n\n【避免】\n……";

let currentResult = "", processing = false, initialized = false;
let drAbortController = null;

function ctx() { return SillyTavern.getContext(); }

/* ── iframe 顶层挂载（复用图像提取器方案）── */
function drRootWindow() {
    try { if (window.top && window.top.document) return window.top; } catch(e) {}
    return window;
}
function drRootDocument() {
    try { var w = drRootWindow(); if (w && w.document) return w.document; } catch(e) {}
    return document;
}

/* ── 设置 ── */
function loadSettings() {
    try {
        var es = ctx().extensionSettings;
        if (!es[EXT_NAME]) es[EXT_NAME] = {};
        for (var k in DEFAULTS) {
            if (es[EXT_NAME][k] === undefined) es[EXT_NAME][k] = DEFAULTS[k];
        }
        if (!es[EXT_NAME].directorPreset) es[EXT_NAME].directorPreset = DEFAULT_DIRECTOR_PRESET;
    } catch(e) { console.error("[DR] loadSettings:", e); }
}
function cfg() {
    try { return ctx().extensionSettings[EXT_NAME]; }
    catch(e) { var d = {}; for (var k in DEFAULTS) d[k] = DEFAULTS[k]; return d; }
}
function save(key, val) {
    try { ctx().extensionSettings[EXT_NAME][key] = val; ctx().saveSettingsDebounced(); } catch(e) {}
}

/* ── 工具 ── */
function esc(s) {
    if (!s) return "";
    var d = drRootDocument().createElement("div"); d.textContent = s; return d.innerHTML;
}
function q(s) {
    var rd = drRootDocument();
    try { var a = rd.querySelector(s); if (a) return a; } catch(e) {}
    try { return document.querySelector(s); } catch(e) { return null; }
}

/* ── URL 处理（复用图像提取器）── */
function normalizeApiBase(base) {
    var url = (base || "").trim();
    if (!url) return "";
    while (url.length > 1 && url.charAt(url.length - 1) === "/") url = url.slice(0, -1);
    if (url.indexOf("/chat/completions") >= 0) url = url.replace(/\/chat\/completions\/?$/, "");
    if (url.indexOf("/models") >= 0) url = url.replace(/\/models\/?$/, "");
    if (!url.endsWith("/v1")) url += "/v1";
    return url;
}
function buildChatUrl(base) { var r = normalizeApiBase(base); return r ? r + "/chat/completions" : ""; }
function buildModelsUrl(base) { var r = normalizeApiBase(base); return r ? r + "/models" : ""; }

function extractModelsFromResponse(data) {
    var models = [];
    function push(m) {
        if (!m) return;
        if (typeof m === "string") { models.push(m); return; }
        if (m.id) models.push(m.id);
        else if (m.name) models.push(m.name);
        else if (m.model) models.push(m.model);
    }
    if (data && data.data && Array.isArray(data.data)) data.data.forEach(push);
    if (models.length === 0 && data && data.models && Array.isArray(data.models)) data.models.forEach(push);
    if (models.length === 0 && Array.isArray(data)) data.forEach(push);
    var clean = [];
    models.forEach(function(id){ id = String(id||"").trim(); if(id && clean.indexOf(id)<0) clean.push(id); });
    return clean;
}

function drFetchWithTimeout(url, options, timeoutMs) {
    timeoutMs = Number(timeoutMs || 0);
    if (!timeoutMs || timeoutMs <= 0 || typeof AbortController === "undefined") return fetch(url, options);
    if (timeoutMs < 30000) timeoutMs = 30000;
    var controller = new AbortController();
    var timer = setTimeout(function(){ try{controller.abort();}catch(e){} }, timeoutMs);
    options = options || {};
    options.signal = controller.signal;
    return fetch(url, options).finally(function(){ clearTimeout(timer); });
}

/* ── 读取最近 N 轮聊天 ── */
function getRecentChat(rounds) {
    var chat;
    try { chat = ctx().chat; } catch(e) { return ""; }
    if (!chat || !chat.length) return "";

    // 一轮 = user + assistant，约等于 2 条 message
    var msgCount = rounds * 2;
    var collected = [];
    var count = 0;

    for (var i = chat.length - 1; i >= 0 && count < msgCount; i--) {
        var m = chat[i];
        if (!m) continue;
        if (m.is_system) continue;
        var role = m.is_user ? "用户" : (m.name || "角色");
        var text = String(m.mes || "").trim();
        // 去掉图像标签等注入痕迹
        text = text.replace(/image###[\s\S]*?###/g, "").trim();
        if (!text) continue;
        collected.unshift("[" + role + "] " + text);
        count++;
    }
    return collected.join("\n\n");
}

function getActiveRange() {
    var c = cfg();
    if (c.range === "custom" || c.range === -1) {
        var n = Number(c.customRange || 0);
        return n > 0 ? n : 30;
    }
    var r = Number(c.range || 30);
    return r > 0 ? r : 30;
}

/* ── API ── */
async function fetchModels() {
    var c = cfg();
    if (!c.apiEndpoint) { setStatus("请先填写 API 地址", "#d4726a"); return; }
    var url = buildModelsUrl(c.apiEndpoint);
    var headers = {};
    if (c.apiKey) headers["Authorization"] = "Bearer " + c.apiKey;
    try {
        setStatus("正在拉取模型…", "#6ec577");
        var res = await drFetchWithTimeout(url, { method:"GET", headers:headers }, Number(c.requestTimeout||0));
        var raw = await res.text();
        if (!res.ok) throw new Error("HTTP " + res.status + "：" + raw.slice(0,180));
        var data; try { data = JSON.parse(raw); } catch(e) { throw new Error("返回非 JSON：" + raw.slice(0,160)); }
        var models = extractModelsFromResponse(data);
        if (!models.length) throw new Error("未识别到模型：" + raw.slice(0,180));
        var sel = q("#dr-model");
        if (sel) {
            sel.innerHTML = "";
            var first = drRootDocument().createElement("option");
            first.value=""; first.textContent="请选择模型"; first.disabled=true;
            sel.appendChild(first);
            models.forEach(function(id){
                var opt = drRootDocument().createElement("option");
                opt.value=id; opt.textContent=id;
                if(id===c.model) opt.selected=true;
                sel.appendChild(opt);
            });
            if (c.model && models.indexOf(c.model)>=0) sel.value=c.model;
            else { sel.value=models[0]; save("model", models[0]); }
        }
        setStatus("已加载 " + models.length + " 个模型", "#6ec577");
    } catch(e) { console.error("[DR]",e); setStatus("拉取模型失败：" + e.message, "#d4726a"); }
}

async function testConnection() {
    var c = cfg();
    if (!c.apiEndpoint) { setStatus("请先填写 API 地址", "#d4726a"); return; }
    var url = buildChatUrl(c.apiEndpoint);
    var headers = { "Content-Type":"application/json" };
    if (c.apiKey) headers["Authorization"] = "Bearer " + c.apiKey;
    try {
        setStatus("正在测试连接…", "#6ec577");
        var res = await drFetchWithTimeout(url, {
            method:"POST", headers:headers,
            body: JSON.stringify({ model: c.model||"gpt-4o-mini", messages:[{role:"user",content:"Hi"}], max_tokens:5, stream:false })
        }, Number(c.requestTimeout||0));
        var raw = await res.text();
        if (!res.ok) throw new Error("HTTP " + res.status + "：" + raw.slice(0,180));
        setStatus("连接成功 ✓", "#6ec577");
    } catch(e) { console.error("[DR]",e); setStatus("连接失败：" + e.message, "#d4726a"); }
}

function parseChatResponse(data) {
    if (!data) return "";
    if (data.choices && data.choices[0]) {
        var ch = data.choices[0];
        if (ch.message) {
            var msg = ch.message;
            if (typeof msg.content === "string" && msg.content.trim()) return msg.content.trim();
            if (msg.content && Array.isArray(msg.content)) {
                var parts = [];
                msg.content.forEach(function(p){ if(!p)return; if(typeof p==="string")parts.push(p); else if(p.text)parts.push(p.text); });
                if (parts.join("").trim()) return parts.join("\n").trim();
            }
            if (msg.text) return String(msg.text).trim();
        }
        if (ch.text) return String(ch.text).trim();
    }
    if (data.content && Array.isArray(data.content) && data.content[0]) {
        if (data.content[0].text) return String(data.content[0].text).trim();
    }
    if (data.response) return String(data.response).trim();
    if (data.text) return String(data.text).trim();
    return "";
}

function buildUserPrompt(supplement) {
    var c = cfg();
    var rounds = getActiveRange();
    var user = "";

    var mem = c.supplementMemory || "";
    if (mem.trim()) user += "【角色卡要点 / 世界书 / 当前担心】\n" + mem.trim() + "\n\n";

    var recent = getRecentChat(rounds);
    if (recent) user += "【最近 " + rounds + " 轮 RP】\n" + recent + "\n\n";
    else user += "【最近 RP】\n（未读取到聊天内容）\n\n";

    if (supplement && supplement.trim()) user += "【本次额外指令】\n" + supplement.trim() + "\n\n";

    user += "请根据以上内容输出情感方向。只输出方向结果，不要复述分析过程，不要写正文。";
    return user;
}

async function callAPI(supplement) {
    var c = cfg();
    if (!c.apiEndpoint) throw new Error("请先配置 API 地址");
    if (!c.model) throw new Error("请先加载并选择模型");

    var url = buildChatUrl(c.apiEndpoint);
    var headers = { "Content-Type":"application/json" };
    if (c.apiKey) headers["Authorization"] = "Bearer " + c.apiKey;

    if (typeof AbortController !== "undefined") drAbortController = new AbortController();
    else drAbortController = null;

    var systemPrompt = c.directorPreset || DEFAULT_DIRECTOR_PRESET;

    var body = {
        model: c.model,
        messages: [
            { role:"system", content: systemPrompt },
            { role:"user", content: buildUserPrompt(supplement || "") }
        ],
        temperature: 0.6,
        stream: false
    };

    var opts = { method:"POST", headers:headers, body: JSON.stringify(body) };
    if (drAbortController) opts.signal = drAbortController.signal;

    var res = await drFetchWithTimeout(url, opts, Number(c.requestTimeout||0));
    var raw = await res.text();
    if (!res.ok) throw new Error("API " + res.status + "：" + raw.slice(0,220));
    var data; try { data = JSON.parse(raw); } catch(e) { throw new Error("API 返回非 JSON：" + raw.slice(0,180)); }
    var out = parseChatResponse(data);
    if (out) return out;
    throw new Error("无法解析响应：" + raw.slice(0,220));
}

/* ── 状态/预览 ── */
function setStatus(t, color) {
    var e = q("#dr-status"); if(e){ e.textContent=t; e.style.color=color||""; }
}
function setPreview(t) {
    var e = q("#dr-preview-text"); if(e){ e.value=t; e.disabled=false; }
}
function setBtns(reroll, inject) {
    var br=q("#dr-btn-reroll"), bj=q("#dr-btn-inject");
    if(br)br.disabled=!reroll; if(bj)bj.disabled=!inject;
}

/* ── 主流程 ── */
async function onGenerate() {
    if (processing) return;
    await runDirector("");
}

async function onReroll() {
    if (processing) return;
    var sup = q("#dr-supplement");
    await runDirector((sup && sup.value) || "");
}

async function runDirector(supplement) {
    processing = true;
    var entry = q("#dr-chat-quick-entry");
    if (entry) entry.classList.add("processing");
    setStatus("正在分析…", "#6ec577");
    setBtns(false, false);
    try {
        var result = await callAPI(supplement);
        currentResult = result;
        setPreview(result);
        setStatus("分析完成 — 可编辑后手动注入", "#6ec577");
        setBtns(true, true);
        var sec = q("#dr-section-preview");
        if (sec) sec.classList.remove("collapsed");
    } catch(e) {
        console.error("[DR]", e);
        var msg = e && e.name === "AbortError" ? "请求已被打断" : e.message;
        setStatus("失败: " + msg, "#d4726a");
        setBtns(true, false);
    }
    if (entry) entry.classList.remove("processing");
    drAbortController = null;
    processing = false;
}

function onInject() {
    var pv = q("#dr-preview-text");
    var desc = (pv && pv.value) || currentResult;
    if (!desc || !desc.trim()) { setStatus("没有可注入的内容", "#d4726a"); return; }
    try {
        var c = ctx();
        var chat = c.chat;
        if (!chat || !chat.length) throw new Error("聊天为空");
        // 注入到最后一条消息末尾
        var idx = chat.length - 1;
        var msg = chat[idx];
        if (!msg) throw new Error("消息不存在");

        var tag = "\n\n【导演注入】\n" + desc.trim();
        if (String(msg.mes||"").indexOf(desc.trim()) >= 0) {
            setStatus("已存在相同注入，跳过", "#6ec577");
            return;
        }
        msg.mes = String(msg.mes||"").trimEnd() + tag;
        if (typeof c.saveChat === "function") c.saveChat();

        var el = q('#chat .mes[mesid="'+idx+'"] .mes_text');
        if (el) el.innerHTML += "<p>" + esc(tag) + "</p>";

        setStatus("已注入正文末尾 ✓", "#6ec577");
        var sup = q("#dr-supplement"); if (sup) sup.value = "";
        console.log("[DR] 注入到消息 #" + idx);
    } catch(e) { console.error("[DR]",e); setStatus("注入失败: " + e.message, "#d4726a"); }
}

function onCopy() {
    var pv = q("#dr-preview-text");
    var desc = (pv && pv.value) || currentResult;
    if (!desc) { setStatus("没有内容可复制", "#d4726a"); return; }
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(desc);
            setStatus("已复制 ✓", "#6ec577");
        } else {
            pv.select(); document.execCommand("copy");
            setStatus("已复制 ✓", "#6ec577");
        }
    } catch(e) { setStatus("复制失败", "#d4726a"); }
}

/* ════════════════════════════════════════
   UI 构建（继续在下一段）
   ════════════════════════════════════════ */

/* ════════════════════════════════════════
   UI 构建
   ════════════════════════════════════════ */

function createUI() {
    createChatQuickButton();
    createPanel();
    createDrawer();
    bindAll();
}

function buildPanelInner() {
    var c = cfg();
    var range = c.range;
    function rangeOpt(val, label) {
        var sel = (String(range) === String(val)) ? " selected" : "";
        return '<option value="'+val+'"'+sel+'>'+label+'</option>';
    }

    var h = '';
    h += '<div class="dr-panel-header">';
    h += '<span class="dr-panel-title">🎬 红霞导演室 · 情感导演</span>';
    h += '<span class="dr-panel-close" id="dr-panel-close">✕</span>';
    h += '</div>';
    h += '<div class="dr-sections">';

    // 轮数 + API
    h += drSec("config", "配置", true,
        '<label>复盘范围（按对话轮数计）</label>'+
        '<select id="dr-range">'+
            rangeOpt(10,"最近 10 轮")+rangeOpt(20,"最近 20 轮")+
            rangeOpt(30,"最近 30 轮")+rangeOpt(50,"最近 50 轮")+
            rangeOpt("custom","自定义")+
        '</select>'+
        '<input type="number" id="dr-custom-range" placeholder="自定义轮数" value="'+esc(c.customRange||"")+'" style="display:'+(String(range)==="custom"?"block":"none")+'">'+
        '<hr><label>API 地址</label>'+
        '<input type="text" id="dr-api-endpoint" value="'+esc(c.apiEndpoint)+'" placeholder="https://openrouter.ai/api/v1">'+
        '<label>API 密钥</label>'+
        '<input type="password" id="dr-api-key" value="'+esc(c.apiKey)+'" placeholder="sk-...">'+
        '<label>模型</label>'+
        '<select id="dr-model"><option value="'+esc(c.model)+'">'+(c.model?esc(c.model)+" (已保存)":"请先加载模型")+'</option></select>'+
        '<div class="dr-actions" style="margin-top:6px">'+
            '<button id="dr-btn-models" class="dr-btn">加载模型</button>'+
            '<button id="dr-btn-test" class="dr-btn">测试连接</button>'+
        '</div>');

    // 手动补充框
    h += drSec("memory", "手动补充", true,
        '<div class="dr-hint">填角色卡要点 / 世界书 / 当前担心，会随每次分析一起发送</div>'+
        '<textarea id="dr-supplement-memory" rows="5" placeholder="例：女主表面强硬实则缺爱，怕被抛弃；男主是她下属，最近两人因为一次任务起了冲突…">'+esc(c.supplementMemory)+'</textarea>');

    // 导演预设
    h += drSec("preset", "情感导演预设", true,
        '<div class="dr-hint">告诉副 API 怎么分析，可自由编辑</div>'+
        '<textarea id="dr-director-preset" rows="8">'+esc(c.directorPreset||"")+'</textarea>');

    // 预览区
    h += drSec("preview", "导演方向", false,
        '<div id="dr-status" class="dr-status">点击下方生成情感方向</div>'+
        '<textarea id="dr-preview-text" rows="8" placeholder="生成的情感方向将显示在这里，可手动编辑…"></textarea>'+
        '<label>补充指令（重新分析时带上）</label>'+
        '<input type="text" id="dr-supplement" placeholder="例：这段其实是冷战，别往撒娇方向写">'+
        '<div class="dr-actions">'+
            '<button id="dr-btn-generate" class="dr-btn dr-btn-primary">生成方向</button>'+
            '<button id="dr-btn-reroll" class="dr-btn" disabled>重新分析</button>'+
        '</div>'+
        '<div class="dr-actions" style="margin-top:6px">'+
            '<button id="dr-btn-copy" class="dr-btn">复制</button>'+
            '<button id="dr-btn-inject" class="dr-btn dr-btn-primary" disabled>注入正文末尾</button>'+
        '</div>');

    h += '</div>';
    return h;
}

function drSec(id, title, collapsed, body) {
    return '<div class="dr-section'+(collapsed?" collapsed":"")+'" id="dr-section-'+id+'">'+
        '<div class="dr-section-header"><span>'+title+'</span><span class="dr-collapse-icon">▾</span></div>'+
        '<div class="dr-section-body">'+body+'</div></div>';
}

function createPanel() {
    if (q("#dr-panel")) return;
    var d = drRootDocument();
    var panel = d.createElement("div");
    panel.id = "dr-panel";
    panel.className = "dr-panel";
    panel.setAttribute("data-dr-open", "0");
    panel.innerHTML = buildPanelInner();
    (d.body || d.documentElement).appendChild(panel);
}

/* ── 抽屉（魔法棒入口）── */
function createDrawer() {
    if (q("#dr-drawer")) return;
    var html = '<div id="dr-drawer"><div class="inline-drawer">'+
        '<div class="inline-drawer-toggle inline-drawer-header"><b>🎬 红霞导演室</b>'+
        '<div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div>'+
        '<div class="inline-drawer-content">'+
        '<div style="color:#888;font-size:12px;margin-bottom:8px">点击下方按钮打开导演面板。也可使用聊天框旁的快捷入口。</div>'+
        '<input type="button" id="dr-open-panel" class="menu_button" value="打开导演面板">'+
        '<input type="button" id="dr-reset-entry" class="menu_button" value="重置快捷入口位置">'+
        '<hr><label style="font-size:12px">显示聊天框快捷入口 '+
        '<input type="checkbox" id="dr-show-entry"'+(cfg().showQuickEntry?" checked":"")+'></label>'+
        '</div></div></div>';
    var target = jQuery("#extensions_settings2");
    if (target.length) { target.append(html); console.log("[DR] 抽屉已挂载"); }
}

/* ── 聊天框快捷入口按钮 ── */
function drFindQuickMount() {
    var d = drRootDocument();
    var selectors = ["#send_form","#form_sheld","#chatForm","#chat","#sheld","body"];
    for (var i=0;i<selectors.length;i++) {
        try { var el = d.querySelector(selectors[i]); if (el) return el; } catch(e) {}
    }
    return d.body || d.documentElement;
}


function drRemoveQuickButton() {
    var old = q("#dr-chat-quick-entry");
    if (old && old.parentNode) {
        try { old.parentNode.removeChild(old); } catch(e) {}
    }
}

function drApplyQuickEntryVisibility() {
    var btn = q("#dr-chat-quick-entry");
    if (!btn) return;
    btn.style.display = cfg().showQuickEntry ? "flex" : "none";
}

function createChatQuickButton() {
    if (!cfg().showQuickEntry) {
        drRemoveQuickButton();
        return;
    }
    if (q("#dr-chat-quick-entry")) {
        drApplyQuickEntryVisibility();
        return;
    }
    var d = drRootDocument();
    var btn = d.createElement("div");
    btn.id = "dr-chat-quick-entry";
    btn.className = "dr-quick-entry";
    btn.title = "红霞导演室";
    btn.textContent = "🎬";

    var c = cfg();
    if (c.quickEntryLeft) btn.style.left = c.quickEntryLeft;
    if (c.quickEntryTop) btn.style.top = c.quickEntryTop;

    // 拖拽
    var dragging = false, moved = false, startX=0, startY=0, origX=0, origY=0;
    btn.addEventListener("mousedown", startDrag);
    btn.addEventListener("touchstart", startDrag, {passive:false});

    function startDrag(e) {
        dragging = true; moved = false;
        var p = e.touches ? e.touches[0] : e;
        startX = p.clientX; startY = p.clientY;
        var rect = btn.getBoundingClientRect();
        origX = rect.left; origY = rect.top;
        d.addEventListener("mousemove", onMove);
        d.addEventListener("touchmove", onMove, {passive:false});
        d.addEventListener("mouseup", endDrag);
        d.addEventListener("touchend", endDrag);
        if (e.cancelable) e.preventDefault();
    }
    function onMove(e) {
        if (!dragging) return;
        var p = e.touches ? e.touches[0] : e;
        var dx = p.clientX - startX, dy = p.clientY - startY;
        if (Math.abs(dx)>4 || Math.abs(dy)>4) moved = true;
        var nx = origX + dx, ny = origY + dy;
        btn.style.left = nx + "px";
        btn.style.top = ny + "px";
        btn.style.right = "auto";
        btn.style.bottom = "auto";
        if (e.cancelable) e.preventDefault();
    }
    function endDrag() {
        dragging = false;
        d.removeEventListener("mousemove", onMove);
        d.removeEventListener("touchmove", onMove);
        d.removeEventListener("mouseup", endDrag);
        d.removeEventListener("touchend", endDrag);
        if (moved) {
            save("quickEntryLeft", btn.style.left);
            save("quickEntryTop", btn.style.top);
        }
    }

    btn.addEventListener("click", function(e){
        if (moved) { e.preventDefault(); e.stopPropagation(); return; }
        drTogglePanel();
    });

    try {
        (d.body || d.documentElement).appendChild(btn);
    } catch(e) {
        var mount = drFindQuickMount();
        mount.appendChild(btn);
    }
    drApplyQuickEntryVisibility();
}

function drEnsureQuickButtonLater() {
    setTimeout(function(){ try { createChatQuickButton(); } catch(e){} }, 300);
    setTimeout(function(){ try { createChatQuickButton(); } catch(e){} }, 1200);
    setTimeout(function(){ try { createChatQuickButton(); } catch(e){} }, 3000);
    setTimeout(function(){ try { createChatQuickButton(); } catch(e){} }, 6000);
}

/* ── 面板开关 ── */
function drTogglePanel() {
    var p = q("#dr-panel");
    if (!p) { try { createPanel(); bindAll(); } catch(e){} p = q("#dr-panel"); }
    if (!p) return;
    var open = p.getAttribute("data-dr-open") === "1";
    if (open) {
        p.setAttribute("data-dr-open","0");
        p.classList.remove("visible");
        try { p.style.setProperty("display","none","important"); } catch(e){ p.style.display="none"; }
        return;
    }
    drOpenPanel();
}

function drOpenPanel() {
    var p = q("#dr-panel");
    if (!p) { try { createPanel(); } catch(e){} p = q("#dr-panel"); }
    if (!p) return;
    p.setAttribute("data-dr-open","1");
    p.classList.add("visible");
    function imp(k,v){ try{ p.style.setProperty(k,v,"important"); }catch(e){ p.style[k]=v; } }
    imp("display","flex");
    imp("visibility","visible");
    imp("opacity","1");
    imp("position","fixed");
    imp("z-index","2147483646");
    imp("right","8px");
    imp("left","8px");
    imp("bottom","78px");
    imp("width","auto");
    imp("max-height","74vh");
    imp("overflow","hidden");
    imp("pointer-events","auto");
    imp("transform","translateZ(0)");
    // 确保面板和按钮在同一文档
    try {
        var dd = drRootDocument();
        if (p.ownerDocument !== dd) (dd.body||dd.documentElement).appendChild(p);
    } catch(e){}
}

/* ── 事件绑定 ── */
function bindAll() {
    // 折叠
    var rd = drRootDocument();
    rd.querySelectorAll(".dr-section-header").forEach(function(h){
        h.addEventListener("click", function(){ h.parentElement.classList.toggle("collapsed"); });
    });

    // 关闭按钮
    var closeBtn = q("#dr-panel-close");
    if (closeBtn) closeBtn.addEventListener("click", function(){
        var p = q("#dr-panel");
        if (p) { p.setAttribute("data-dr-open","0"); p.classList.remove("visible"); try{p.style.setProperty("display","none","important");}catch(e){p.style.display="none";} }
    });

    // 轮数
    var rangeSel = q("#dr-range");
    if (rangeSel) rangeSel.addEventListener("change", function(){
        save("range", rangeSel.value);
        var custom = q("#dr-custom-range");
        if (custom) custom.style.display = (rangeSel.value === "custom") ? "block" : "none";
    });
    var customRange = q("#dr-custom-range");
    if (customRange) customRange.addEventListener("input", function(){ save("customRange", Number(customRange.value||0)); });

    // API 设置
    var bind = [
        ["dr-api-endpoint","apiEndpoint"],
        ["dr-api-key","apiKey"],
        ["dr-supplement-memory","supplementMemory"],
        ["dr-director-preset","directorPreset"]
    ];
    bind.forEach(function(arr){
        var el = q("#"+arr[0]);
        if (el) el.addEventListener("input", function(){ save(arr[1], el.value); });
    });

    var modelSel = q("#dr-model");
    if (modelSel) modelSel.addEventListener("change", function(){ save("model", modelSel.value); });

    // 按钮
    var bm = q("#dr-btn-models"); if (bm) bm.addEventListener("click", fetchModels);
    var bt = q("#dr-btn-test"); if (bt) bt.addEventListener("click", testConnection);
    var bg = q("#dr-btn-generate"); if (bg) bg.addEventListener("click", onGenerate);
    var brr = q("#dr-btn-reroll"); if (brr) brr.addEventListener("click", onReroll);
    var bc = q("#dr-btn-copy"); if (bc) bc.addEventListener("click", onCopy);
    var bi = q("#dr-btn-inject"); if (bi) bi.addEventListener("click", onInject);

    // 抽屉按钮
    var op = q("#dr-open-panel"); if (op) op.addEventListener("click", drOpenPanel);
    var re = q("#dr-reset-entry");
    if (re) re.addEventListener("click", function(){
        save("quickEntryLeft",""); save("quickEntryTop","");
        drRemoveQuickButton();
        createChatQuickButton();
        setStatus("已重置快捷入口位置", "#6ec577");
    });
    var se = q("#dr-show-entry");
    if (se) se.addEventListener("change", function(){
        save("showQuickEntry", se.checked);
        if (se.checked) createChatQuickButton();
        else drRemoveQuickButton();
    });

    // 保活：聊天区重绘后补回快捷入口
    try {
        var d = drRootDocument();
        if (typeof MutationObserver !== "undefined" && d.body && !window.__drQuickObserver) {
            window.__drQuickObserver = new MutationObserver(function(){
                if (cfg().showQuickEntry && !q("#dr-chat-quick-entry")) {
                    setTimeout(createChatQuickButton, 100);
                }
            });
            window.__drQuickObserver.observe(d.body, { childList:true, subtree:true });
        }
    } catch(e){}
}

/* ── 初始化 ── */
function init() {
    if (initialized) return;
    try {
        loadSettings();
        createUI();
        drEnsureQuickButtonLater();
        initialized = true;
        console.log("[DR] ✓ 红霞导演室已加载");
    } catch(e) { console.error("[DR] 初始化失败:", e); }
}

function waitAndInit() {
    if (typeof SillyTavern === "undefined" || !SillyTavern.getContext) {
        setTimeout(waitAndInit, 300); return;
    }
    try {
        var c = SillyTavern.getContext();
        c.eventSource.on(c.event_types.APP_READY, function(){ setTimeout(init, 100); });
    } catch(e) { setTimeout(init, 2000); }
}

waitAndInit();
