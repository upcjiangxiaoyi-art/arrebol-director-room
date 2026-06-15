/*
 * 红霞壳测试 Shell Test v0.3.3
 * 保留 v0.3.2 成功外壳：EXT_NAME + drt-* DOM id 不换
 * 本版接入真实导演内容与副 API 生成
 */

const DRT_EXT_NAME = "arrebol-director-room-shell-test-v032";

const DRT_DEFAULT_DIRECTOR_PRESET = "你是 RP 情感导演。请阅读最近的聊天内容和用户补充信息，只分析情感曲线与人设稳定，不写正文。\n\n你需要判断：\n1. 当前关系阶段是什么。\n2. 情绪温度是否过热、过冷、空转或错拍。\n3. 角色是否出现 OOC 风险。\n4. 是否存在秒爱、秒软、秒承诺、隐藏深情化。\n5. 是否把照顾误写成占有，把心疼误写成告白。\n6. 是否过度代演用户的心理与选择。\n7. 当前角色根据人设应该如何承接情绪。\n8. 下一阶段情感应该升温、降温、维持、错拍，还是延迟。\n\n输出必须短，不超过 300 字。不要写分析过程。不要写正文。只给下一阶段情感方向，要给可执行动作与明确禁区。\n\n固定输出格式：\n【情感方向】\n……\n\n【人设边界】\n……\n\n【避免】\n……";

const DRT_DEFAULTS = {
    showQuickEntry: true,
    quickEntryLeft: "",
    quickEntryTop: "",

    apiEndpoint: "",
    apiKey: "",
    model: "",
    requestTimeout: 0,

    range: "30",
    customRange: 0,
    supplementMemory: "",
    directorPreset: DRT_DEFAULT_DIRECTOR_PRESET,
    previewText: ""
};

let drtInitialized = false;
let drtProcessing = false;
let drtAbortController = null;
let drtCurrentResult = "";

function drtCtx() {
    return SillyTavern.getContext();
}

function drtRootWindow() {
    try {
        if (window.top && window.top.document) return window.top;
    } catch(e) {}
    return window;
}

function drtRootDocument() {
    try {
        var w = drtRootWindow();
        if (w && w.document) return w.document;
    } catch(e) {}
    return document;
}

function drtQ(sel) {
    var d = drtRootDocument();
    try {
        var el = d.querySelector(sel);
        if (el) return el;
    } catch(e) {}
    try { return document.querySelector(sel); } catch(e) {}
    return null;
}

function drtEsc(s) {
    if (!s) return "";
    var d = drtRootDocument().createElement("div");
    d.textContent = s;
    return d.innerHTML;
}

function drtLoadSettings() {
    try {
        var c = drtCtx();
        if (!c.extensionSettings[DRT_EXT_NAME]) c.extensionSettings[DRT_EXT_NAME] = {};
        var st = c.extensionSettings[DRT_EXT_NAME];

        for (var k in DRT_DEFAULTS) {
            if (st[k] === undefined) st[k] = DRT_DEFAULTS[k];
        }

        if (!st.directorPreset) st.directorPreset = DRT_DEFAULT_DIRECTOR_PRESET;

        // 沿用成功测试壳：测试期强制显示入口，避免旧设置干扰。
        st.showQuickEntry = true;

        if (typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced();
    } catch(e) {
        console.error("[DRT] loadSettings failed:", e);
    }
}

function drtCfg() {
    try { return drtCtx().extensionSettings[DRT_EXT_NAME]; }
    catch(e) {
        var d = {};
        for (var k in DRT_DEFAULTS) d[k] = DRT_DEFAULTS[k];
        return d;
    }
}

function drtSave(key, val) {
    try {
        var c = drtCtx();
        if (!c.extensionSettings[DRT_EXT_NAME]) c.extensionSettings[DRT_EXT_NAME] = {};
        c.extensionSettings[DRT_EXT_NAME][key] = val;
        if (typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced();
    } catch(e) {}
}

function drtSaveNow() {
    try {
        var c = drtCtx();
        if (c && typeof c.saveSettings === "function") c.saveSettings();
        else if (c && typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced();
    } catch(e) {}
}

function drtSetStatus(text, color) {
    var st = drtQ("#drt-status");
    if (st) {
        st.textContent = text;
        st.style.color = color || "";
    }
}

function drtSetPreview(text) {
    var pv = drtQ("#drt-preview-text");
    if (pv) pv.value = text || "";
    drtCurrentResult = text || "";
    drtSave("previewText", text || "");
}

function drtSetButtons(reroll, copy, stop) {
    var bg = drtQ("#drt-generate");
    var br = drtQ("#drt-reroll");
    var bc = drtQ("#drt-copy");
    var bs = drtQ("#drt-stop");
    if (bg) bg.disabled = !!drtProcessing;
    if (br) br.disabled = !reroll || !!drtProcessing;
    if (bc) bc.disabled = !copy;
    if (bs) {
        bs.disabled = !stop;
        bs.style.opacity = stop ? "1" : ".45";
    }
}

function drtNormalizeApiBase(base) {
    var url = (base || "").trim();
    if (!url) return "";
    while (url.length > 1 && url.charAt(url.length - 1) === "/") url = url.slice(0, -1);
    if (url.indexOf("/chat/completions") >= 0) url = url.replace(/\/chat\/completions\/?$/, "");
    if (url.indexOf("/models") >= 0) url = url.replace(/\/models\/?$/, "");
    if (!url.endsWith("/v1")) url += "/v1";
    return url;
}

function drtBuildChatUrl(base) {
    var root = drtNormalizeApiBase(base);
    return root ? root + "/chat/completions" : "";
}

function drtGetActiveRange() {
    var c = drtCfg();
    if (String(c.range) === "custom") {
        var n = Number(c.customRange || 0);
        return n > 0 ? n : 30;
    }
    var r = Number(c.range || 30);
    return r > 0 ? r : 30;
}

function drtGetRecentChat(rounds) {
    var chat;
    try { chat = drtCtx().chat; } catch(e) { return ""; }
    if (!chat || !chat.length) return "";

    var msgCount = rounds * 2;
    var collected = [];
    var count = 0;

    for (var i = chat.length - 1; i >= 0 && count < msgCount; i--) {
        var m = chat[i];
        if (!m) continue;
        if (m.is_system) continue;

        var role = m.is_user ? "用户" : (m.name || "角色");
        var text = String(m.mes || "").trim();

        // 清掉生图注入，避免导演误读。
        text = text.replace(/image###[\s\S]*?###/g, "").trim();

        // 清掉旧导演注入，避免循环污染。
        text = text.replace(/【导演注入】[\s\S]*$/g, "").trim();

        if (!text) continue;
        collected.unshift("[" + role + "] " + text);
        count++;
    }

    return collected.join("\n\n");
}

function drtBuildUserPrompt(supplement) {
    var c = drtCfg();
    var rounds = drtGetActiveRange();
    var user = "";

    var mem = c.supplementMemory || "";
    if (mem.trim()) {
        user += "【角色卡要点 / 世界书 / 当前担心】\n" + mem.trim() + "\n\n";
    }

    var recent = drtGetRecentChat(rounds);
    if (recent) user += "【最近 " + rounds + " 轮 RP】\n" + recent + "\n\n";
    else user += "【最近 RP】\n（未读取到聊天内容）\n\n";

    if (supplement && supplement.trim()) {
        user += "【本次额外指令】\n" + supplement.trim() + "\n\n";
    }

    user += "请根据以上内容输出导演方向。只输出方向结果，不要复述分析过程，不要写正文。";
    return user;
}

function drtParseChatResponse(data) {
    if (!data) return "";

    if (data.choices && data.choices[0]) {
        var ch = data.choices[0];

        if (ch.message) {
            var msg = ch.message;
            if (typeof msg.content === "string" && msg.content.trim()) return msg.content.trim();

            if (msg.content && Array.isArray(msg.content)) {
                var parts = [];
                msg.content.forEach(function(p) {
                    if (!p) return;
                    if (typeof p === "string") parts.push(p);
                    else if (p.text) parts.push(p.text);
                    else if (p.type === "text" && p.text) parts.push(p.text);
                });
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

function drtSyncSettingsFromEditors() {
    var pairs = [
        ["drt-api-endpoint", "apiEndpoint"],
        ["drt-api-key", "apiKey"],
        ["drt-model", "model"],
        ["drt-range", "range"],
        ["drt-custom-range", "customRange"],
        ["drt-supplement-memory", "supplementMemory"],
        ["drt-director-preset", "directorPreset"],
        ["drt-preview-text", "previewText"]
    ];

    pairs.forEach(function(pair) {
        var el = drtQ("#" + pair[0]);
        if (!el) return;

        if (pair[1] === "customRange") drtSave(pair[1], Number(el.value || 0));
        else drtSave(pair[1], el.value || "");
    });

    drtSaveNow();
}

async function drtCallAPI(supplement) {
    var c = drtCfg();

    if (!c.apiEndpoint) throw new Error("请先填写 API 地址");
    if (!c.model) throw new Error("请先填写模型名");

    var url = drtBuildChatUrl(c.apiEndpoint);
    if (!url) throw new Error("API 地址无效");

    var headers = { "Content-Type": "application/json" };
    if (c.apiKey) headers["Authorization"] = "Bearer " + c.apiKey;

    if (typeof AbortController !== "undefined") drtAbortController = new AbortController();
    else drtAbortController = null;

    var body = {
        model: c.model,
        messages: [
            { role: "system", content: c.directorPreset || DRT_DEFAULT_DIRECTOR_PRESET },
            { role: "user", content: drtBuildUserPrompt(supplement || "") }
        ],
        temperature: 0.6,
        stream: false
    };

    var opts = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    };

    if (drtAbortController) opts.signal = drtAbortController.signal;

    var res = await fetch(url, opts);
    var raw = await res.text();

    if (!res.ok) {
        throw new Error("API " + res.status + "：" + raw.slice(0, 220));
    }

    var data;
    try { data = JSON.parse(raw); }
    catch(e) { throw new Error("API 返回非 JSON：" + raw.slice(0, 180)); }

    var out = drtParseChatResponse(data);
    if (out) return out;

    throw new Error("无法解析响应：" + raw.slice(0, 220));
}

async function drtRunDirector(supplement) {
    if (drtProcessing) return;

    drtSyncSettingsFromEditors();

    drtProcessing = true;
    var entry = drtQ("#drt-entry");
    if (entry) entry.classList.add("processing");

    drtSetStatus("正在分析…", "#8ed99d");
    drtSetButtons(false, false, true);

    try {
        var result = await drtCallAPI(supplement || "");
        drtSetPreview(result);
        drtSetStatus("分析完成 ✓ 可复制", "#8ed99d");
        drtSetButtons(true, true, false);
    } catch(e) {
        console.error("[DRT]", e);
        var msg = e && e.name === "AbortError" ? "请求已被打断" : (e.message || String(e));
        drtSetStatus("失败：" + msg, "#d4726a");
        drtSetButtons(true, !!drtCurrentResult, false);
    }

    if (entry) entry.classList.remove("processing");
    drtAbortController = null;
    drtProcessing = false;
}

function drtAbort() {
    try {
        if (drtAbortController) {
            drtAbortController.abort();
            drtAbortController = null;
            drtSetStatus("已打断请求", "#d4726a");
        } else {
            drtSetStatus("当前没有进行中的请求", "#888");
        }
    } catch(e) {
        drtSetStatus("打断失败：" + e.message, "#d4726a");
    }
    drtSetButtons(true, !!drtCurrentResult, false);
}

function drtCopy() {
    var pv = drtQ("#drt-preview-text");
    var text = (pv && pv.value) || drtCurrentResult;

    if (!text) {
        drtSetStatus("没有内容可复制", "#d4726a");
        return;
    }

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text);
        } else if (pv) {
            pv.select();
            document.execCommand("copy");
        }
        drtSetStatus("已复制 ✓", "#8ed99d");
    } catch(e) {
        drtSetStatus("复制失败", "#d4726a");
    }
}

function drtCreatePanel() {
    if (drtQ("#drt-panel")) return;

    var d = drtRootDocument();
    var c = drtCfg();

    var p = d.createElement("div");
    p.id = "drt-panel";
    p.setAttribute("data-open", "0");

    function rangeOpt(val, label) {
        return '<option value="' + val + '"' + (String(c.range) === String(val) ? " selected" : "") + '>' + label + '</option>';
    }

    p.innerHTML = ''
        + '<div class="drt-panel-header">'
        + '<b>🎬 红霞导演室 v0.3.3</b>'
        + '<button id="drt-close" type="button">×</button>'
        + '</div>'

        + '<div class="drt-panel-body">'

        + '<details open><summary>配置</summary>'
        + '<label>复盘范围</label>'
        + '<select id="drt-range">'
        + rangeOpt("10", "最近 10 轮")
        + rangeOpt("20", "最近 20 轮")
        + rangeOpt("30", "最近 30 轮")
        + rangeOpt("50", "最近 50 轮")
        + rangeOpt("custom", "自定义")
        + '</select>'
        + '<input type="number" id="drt-custom-range" placeholder="自定义轮数" value="' + drtEsc(c.customRange || "") + '" style="display:' + (String(c.range)==="custom" ? "block" : "none") + '">'
        + '<label>API 地址</label>'
        + '<input type="text" id="drt-api-endpoint" value="' + drtEsc(c.apiEndpoint || "") + '" placeholder="https://openrouter.ai/api/v1">'
        + '<label>API 密钥</label>'
        + '<input type="password" id="drt-api-key" value="' + drtEsc(c.apiKey || "") + '" placeholder="sk-...">'
        + '<label>模型</label>'
        + '<input type="text" id="drt-model" value="' + drtEsc(c.model || "") + '" placeholder="例如：gpt-4o-mini / openrouter model">'
        + '</details>'

        + '<details><summary>手动补充</summary>'
        + '<div class="drt-hint">填角色卡要点 / 世界书 / 当前担心，会随每次分析一起发送。</div>'
        + '<textarea id="drt-supplement-memory" rows="5" placeholder="例：女主表面强硬实则缺爱；男主最近因为任务起冲突…">' + drtEsc(c.supplementMemory || "") + '</textarea>'
        + '</details>'

        + '<details><summary>情感导演预设</summary>'
        + '<textarea id="drt-director-preset" rows="8">' + drtEsc(c.directorPreset || "") + '</textarea>'
        + '</details>'

        + '<details open><summary>导演方向</summary>'
        + '<div id="drt-status">点击“生成方向”开始。</div>'
        + '<textarea id="drt-preview-text" rows="8" placeholder="生成的导演方向将显示在这里…">' + drtEsc(c.previewText || "") + '</textarea>'
        + '<label>补充指令</label>'
        + '<input type="text" id="drt-supplement" placeholder="例：这段其实是冷战，别往撒娇方向写">'
        + '<div class="drt-actions">'
        + '<button id="drt-generate" type="button">生成方向</button>'
        + '<button id="drt-reroll" type="button" disabled>重新分析</button>'
        + '</div>'
        + '<div class="drt-actions">'
        + '<button id="drt-stop" type="button" disabled>打断请求</button>'
        + '<button id="drt-copy" type="button" disabled>复制</button>'
        + '</div>'
        + '</details>'

        + '</div>';

    p.style.cssText = [
        "position:fixed",
        "left:8px",
        "right:8px",
        "bottom:76px",
        "max-height:74vh",
        "display:none",
        "flex-direction:column",
        "z-index:2147483646",
        "background:rgba(28,23,25,.97)",
        "color:#eee",
        "border:1px solid rgba(214,122,106,.4)",
        "border-radius:14px",
        "box-shadow:0 10px 40px rgba(0,0,0,.42)",
        "overflow:hidden",
        "font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif",
        "font-size:13px",
        "pointer-events:auto"
    ].join(";");

    try {
        (d.body || d.documentElement).appendChild(p);
    } catch(e) {
        document.body.appendChild(p);
    }

    drtBindPanel();
}

function drtBindPanel() {
    var close = drtQ("#drt-close");
    if (close) close.addEventListener("click", drtHidePanel);

    var range = drtQ("#drt-range");
    if (range) range.addEventListener("change", function() {
        drtSave("range", range.value);
        var cr = drtQ("#drt-custom-range");
        if (cr) cr.style.display = range.value === "custom" ? "block" : "none";
        drtSaveNow();
    });

    var fields = [
        ["drt-custom-range", "customRange"],
        ["drt-api-endpoint", "apiEndpoint"],
        ["drt-api-key", "apiKey"],
        ["drt-model", "model"],
        ["drt-supplement-memory", "supplementMemory"],
        ["drt-director-preset", "directorPreset"],
        ["drt-preview-text", "previewText"]
    ];

    fields.forEach(function(pair) {
        var el = drtQ("#" + pair[0]);
        if (!el) return;

        el.addEventListener("input", function() {
            if (pair[1] === "customRange") drtSave(pair[1], Number(el.value || 0));
            else drtSave(pair[1], el.value || "");
        });

        el.addEventListener("change", function() {
            if (pair[1] === "customRange") drtSave(pair[1], Number(el.value || 0));
            else drtSave(pair[1], el.value || "");
            drtSaveNow();
        });
    });

    var gen = drtQ("#drt-generate");
    if (gen) gen.addEventListener("click", function() {
        drtRunDirector("");
    });

    var reroll = drtQ("#drt-reroll");
    if (reroll) reroll.addEventListener("click", function() {
        var sup = drtQ("#drt-supplement");
        drtRunDirector((sup && sup.value) || "");
    });

    var stop = drtQ("#drt-stop");
    if (stop) stop.addEventListener("click", drtAbort);

    var copy = drtQ("#drt-copy");
    if (copy) copy.addEventListener("click", drtCopy);

    drtSetButtons(!!drtCurrentResult, !!drtCurrentResult, false);
}

function drtShowPanel() {
    var p = drtQ("#drt-panel");
    if (!p) {
        drtCreatePanel();
        p = drtQ("#drt-panel");
    }
    if (!p) return;

    p.setAttribute("data-open", "1");
    p.style.setProperty("display", "flex", "important");
    p.style.setProperty("visibility", "visible", "important");
    p.style.setProperty("opacity", "1", "important");
    p.style.setProperty("pointer-events", "auto", "important");
}

function drtHidePanel() {
    var p = drtQ("#drt-panel");
    if (!p) return;
    p.setAttribute("data-open", "0");
    p.style.setProperty("display", "none", "important");
}

function drtTogglePanel() {
    var p = drtQ("#drt-panel");
    if (p && p.getAttribute("data-open") === "1") drtHidePanel();
    else drtShowPanel();
}

function drtCreateEntry() {
    var d = drtRootDocument();
    var old = drtQ("#drt-entry");
    if (old) return old;

    var btn = d.createElement("button");
    btn.id = "drt-entry";
    btn.type = "button";
    btn.textContent = "🎬 DR";
    btn.title = "红霞导演室 v0.3.3";

    function imp(k, v) {
        try { btn.style.setProperty(k, v, "important"); }
        catch(e) { try { btn.style[k] = v; } catch(_) {} }
    }

    var savedLeft = Number(drtCfg().quickEntryLeft);
    var savedTop = Number(drtCfg().quickEntryTop);
    var hasSaved = Number.isFinite(savedLeft) && Number.isFinite(savedTop);

    imp("position", "fixed");
    imp("left", hasSaved ? savedLeft + "px" : "12px");
    imp("top", hasSaved ? savedTop + "px" : "");
    imp("right", hasSaved ? "auto" : "12px");
    imp("bottom", hasSaved ? "auto" : "178px");
    imp("display", "inline-flex");
    imp("align-items", "center");
    imp("justify-content", "center");
    imp("height", "34px");
    imp("min-height", "34px");
    imp("padding", "0 11px");
    imp("border-radius", "999px");
    imp("border", "1px solid rgba(255,255,255,.32)");
    imp("background", "linear-gradient(135deg, rgba(214,122,106,.96), rgba(180,74,92,.96))");
    imp("color", "#fff");
    imp("font-size", "13px");
    imp("font-weight", "700");
    imp("box-shadow", "0 8px 22px rgba(0,0,0,.35)");
    imp("z-index", "2147483647");
    imp("cursor", "grab");
    imp("pointer-events", "auto");
    imp("touch-action", "none");
    imp("user-select", "none");
    imp("-webkit-user-select", "none");

    var dragging = false, moved = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;

    function getPoint(ev) {
        if (ev && ev.touches && ev.touches.length) return {x: ev.touches[0].clientX, y: ev.touches[0].clientY};
        if (ev && ev.changedTouches && ev.changedTouches.length) return {x: ev.changedTouches[0].clientX, y: ev.changedTouches[0].clientY};
        return {x: ev.clientX || 0, y: ev.clientY || 0};
    }

    function begin(ev) {
        var p = getPoint(ev);
        var r = btn.getBoundingClientRect();
        dragging = true;
        moved = false;
        startX = p.x;
        startY = p.y;
        startLeft = r.left;
        startTop = r.top;
        try { ev.preventDefault(); ev.stopPropagation(); } catch(e) {}
    }

    function move(ev) {
        if (!dragging) return;
        var p = getPoint(ev);
        var dx = p.x - startX;
        var dy = p.y - startY;
        if (Math.abs(dx) + Math.abs(dy) > 5) moved = true;
        imp("left", Math.max(4, startLeft + dx) + "px");
        imp("top", Math.max(4, startTop + dy) + "px");
        imp("right", "auto");
        imp("bottom", "auto");
        try { ev.preventDefault(); ev.stopPropagation(); } catch(e) {}
    }

    function end(ev) {
        if (!dragging) return;
        dragging = false;
        var r = btn.getBoundingClientRect();
        drtSave("quickEntryLeft", String(Math.round(r.left)));
        drtSave("quickEntryTop", String(Math.round(r.top)));
        if (!moved) drtTogglePanel();
        try { ev.preventDefault(); ev.stopPropagation(); } catch(e) {}
    }

    btn.addEventListener("mousedown", begin);
    btn.addEventListener("touchstart", begin, {passive:false});
    d.addEventListener("mousemove", move, {passive:false});
    d.addEventListener("mouseup", end, {passive:false});
    d.addEventListener("touchmove", move, {passive:false});
    d.addEventListener("touchend", end, {passive:false});
    d.addEventListener("touchcancel", end, {passive:false});

    try {
        (d.body || d.documentElement).appendChild(btn);
    } catch(e) {
        document.body.appendChild(btn);
    }
    return btn;
}

function drtCreateDrawer() {
    if (drtQ("#drt-drawer")) return;

    var h = '<div id="drt-drawer"><div class="inline-drawer">';
    h += '<div class="inline-drawer-toggle inline-drawer-header"><b>🎬 红霞壳测试 v0.3.3</b>';
    h += '<div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div>';
    h += '<div class="inline-drawer-content">';
    h += '<div style="font-size:12px;color:#888;margin-bottom:8px">成功壳接线版：打开面板后可配置 API 并生成方向。</div>';
    h += '<div style="display:flex;gap:6px"><input type="button" id="drt-open" class="menu_button" value="打开导演面板"><input type="button" id="drt-reset" class="menu_button" value="重置入口"></div>';
    h += '</div></div></div>';

    var jq = null;
    try { jq = drtRootWindow().jQuery || drtRootWindow().$ || window.jQuery || window.$; } catch(e) { jq = window.jQuery || window.$; }

    if (jq) {
        var target = jq("#extensions_settings2");
        if (target && target.length) target.append(h);
    } else {
        var d = drtRootDocument();
        var el = d.querySelector("#extensions_settings2");
        if (el) {
            var wrap = d.createElement("div");
            wrap.innerHTML = h;
            el.appendChild(wrap.firstChild);
        }
    }
}

function drtBindDrawer() {
    var open = drtQ("#drt-open");
    if (open) open.addEventListener("click", function() {
        drtCreateEntry();
        drtShowPanel();
    });

    var reset = drtQ("#drt-reset");
    if (reset) reset.addEventListener("click", function() {
        drtSave("quickEntryLeft", "");
        drtSave("quickEntryTop", "");
        var old = drtQ("#drt-entry");
        if (old && old.parentNode) {
            try { old.parentNode.removeChild(old); } catch(e) {}
        }
        drtCreateEntry();
    });

    try {
        var d = drtRootDocument();
        if (typeof MutationObserver !== "undefined" && d.body && !window.__drtObserver033) {
            window.__drtObserver033 = new MutationObserver(function() {
                if (!drtQ("#drt-entry")) setTimeout(drtCreateEntry, 100);
                if (!drtQ("#drt-panel")) setTimeout(drtCreatePanel, 100);
            });
            window.__drtObserver033.observe(d.body, {childList:true, subtree:true});
        }
    } catch(e) {}
}

function drtInit() {
    if (drtInitialized) return;
    drtInitialized = true;

    drtLoadSettings();
    drtCreatePanel();
    drtCreateDrawer();
    drtBindDrawer();
    drtCreateEntry();

    setTimeout(drtCreateEntry, 700);
    setTimeout(drtCreateEntry, 1600);
    setTimeout(drtCreateEntry, 3200);

    console.log("[DRT] shell connect v0.3.3 loaded");
}

function drtWait() {
    if (typeof SillyTavern === "undefined" || !SillyTavern.getContext) {
        setTimeout(drtWait, 300);
        return;
    }
    try {
        var c = SillyTavern.getContext();
        c.eventSource.on(c.event_types.APP_READY, function() { setTimeout(drtInit, 100); });
        setTimeout(drtInit, 1800);
    } catch(e) {
        setTimeout(drtInit, 1200);
    }
}

drtWait();
