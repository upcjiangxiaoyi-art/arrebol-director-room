/*
 * 红霞导演室 V0.4 内容测试
 * 基于 v0.3.2 成功外壳：全新 EXT_NAME + 全新 DOM id
 * 本版目标：接入真实面板内容与设置保存，不调用 API
 */

const ADR_EXT_NAME = "arrebol-director-room-v04";

const ADR_DEFAULT_DIRECTOR_PRESET = "你是 RP 情感导演。请阅读最近的聊天内容和用户补充信息，只分析情感曲线与人设稳定，不写正文。\n\n你需要判断：\n1. 当前关系阶段是什么。\n2. 情绪温度是否过热、过冷、空转或错拍。\n3. 角色是否出现 OOC 风险。\n4. 是否存在秒爱、秒软、秒承诺、隐藏深情化。\n5. 是否把照顾误写成占有，把心疼误写成告白。\n6. 是否过度代演用户的心理与选择。\n7. 当前角色根据人设应该如何承接情绪。\n8. 下一阶段情感应该升温、降温、维持、错拍，还是延迟。\n\n输出必须短，不超过 300 字。不要写分析过程。不要写正文。只给下一阶段情感方向，要给可执行动作与明确禁区。\n\n固定输出格式：\n【情感方向】\n……\n\n【人设边界】\n……\n\n【避免】\n……";

const ADR_DEFAULTS = {
    enabled: true,
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
    directorPreset: ADR_DEFAULT_DIRECTOR_PRESET,
    previewText: ""
};

let adrInitialized = false;

function adrCtx() {
    return SillyTavern.getContext();
}

function adrRootWindow() {
    try {
        if (window.top && window.top.document) return window.top;
    } catch(e) {}
    return window;
}

function adrRootDocument() {
    try {
        var w = adrRootWindow();
        if (w && w.document) return w.document;
    } catch(e) {}
    return document;
}

function adrQ(sel) {
    var d = adrRootDocument();
    try {
        var el = d.querySelector(sel);
        if (el) return el;
    } catch(e) {}
    try { return document.querySelector(sel); } catch(e) {}
    return null;
}

function adrEsc(s) {
    if (!s) return "";
    var d = adrRootDocument().createElement("div");
    d.textContent = s;
    return d.innerHTML;
}

function adrLoadSettings() {
    try {
        var c = adrCtx();
        if (!c.extensionSettings[ADR_EXT_NAME]) c.extensionSettings[ADR_EXT_NAME] = {};
        var st = c.extensionSettings[ADR_EXT_NAME];

        for (var k in ADR_DEFAULTS) {
            if (st[k] === undefined) st[k] = ADR_DEFAULTS[k];
        }

        if (!st.directorPreset) st.directorPreset = ADR_DEFAULT_DIRECTOR_PRESET;

        // V0.4 测试版强制默认显示入口，避免旧设置干扰。
        st.showQuickEntry = true;

        if (typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced();
    } catch(e) {
        console.error("[ADR] loadSettings failed:", e);
    }
}

function adrCfg() {
    try { return adrCtx().extensionSettings[ADR_EXT_NAME]; }
    catch(e) {
        var d = {};
        for (var k in ADR_DEFAULTS) d[k] = ADR_DEFAULTS[k];
        return d;
    }
}

function adrSave(key, val) {
    try {
        var c = adrCtx();
        if (!c.extensionSettings[ADR_EXT_NAME]) c.extensionSettings[ADR_EXT_NAME] = {};
        c.extensionSettings[ADR_EXT_NAME][key] = val;
        if (typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced();
    } catch(e) {}
}

function adrSaveNow() {
    try {
        var c = adrCtx();
        if (c && typeof c.saveSettings === "function") c.saveSettings();
        else if (c && typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced();
    } catch(e) {}
}

function adrSetStatus(text, color) {
    var st = adrQ("#adr-status");
    if (st) {
        st.textContent = text;
        st.style.color = color || "";
    }
}

function adrGetActiveRange() {
    var c = adrCfg();
    if (String(c.range) === "custom") {
        var n = Number(c.customRange || 0);
        return n > 0 ? n : 30;
    }
    var r = Number(c.range || 30);
    return r > 0 ? r : 30;
}

function adrCollectRecentChatPreview(rounds) {
    var chat;
    try { chat = adrCtx().chat; } catch(e) { return "（无法读取聊天内容）"; }
    if (!chat || !chat.length) return "（未读取到聊天内容）";

    var msgCount = rounds * 2;
    var collected = [];
    var count = 0;

    for (var i = chat.length - 1; i >= 0 && count < msgCount; i--) {
        var m = chat[i];
        if (!m) continue;
        if (m.is_system) continue;

        var role = m.is_user ? "用户" : (m.name || "角色");
        var text = String(m.mes || "").trim();
        text = text.replace(/image###[\s\S]*?###/g, "").trim();
        if (!text) continue;

        if (text.length > 220) text = text.slice(0, 220) + "…";
        collected.unshift("[" + role + "] " + text);
        count++;
    }

    return collected.length ? collected.join("\n\n") : "（最近消息为空）";
}

function adrBuildDryRunPreview() {
    var rounds = adrGetActiveRange();
    var c = adrCfg();
    var out = "";
    out += "【V0.4 预览】\n";
    out += "本版暂不调用 API，只验证真实内容面板与保存。\n\n";

    if (c.supplementMemory && c.supplementMemory.trim()) {
        out += "【手动补充】\n" + c.supplementMemory.trim() + "\n\n";
    } else {
        out += "【手动补充】\n（未填写）\n\n";
    }

    out += "【最近 " + rounds + " 轮 RP 预览】\n";
    out += adrCollectRecentChatPreview(rounds);
    out += "\n\n【下一步】\nV0.5 会把这份内容真正发送给副 API，生成情感导演方向。";

    return out;
}

function adrSec(id, title, collapsed, body) {
    return '<div class="adr-section'+(collapsed?' collapsed':'')+'" id="adr-section-'+id+'">'+
        '<div class="adr-section-header"><span>'+title+'</span><span class="adr-collapse-icon">▾</span></div>'+
        '<div class="adr-section-body">'+body+'</div></div>';
}

function adrRangeOpt(current, val, label) {
    return '<option value="'+val+'"'+(String(current)===String(val)?' selected':'')+'>'+label+'</option>';
}

function adrCreatePanel() {
    if (adrQ("#adr-panel")) return;

    var c = adrCfg();
    var d = adrRootDocument();
    var panel = d.createElement("div");
    panel.id = "adr-panel";
    panel.className = "adr-panel";
    panel.setAttribute("data-open", "0");

    var h = "";
    h += '<div class="adr-panel-header">';
    h += '<span class="adr-panel-title">🎬 红霞导演室 V0.4</span>';
    h += '<div style="display:flex;align-items:center;gap:8px">';
    h += '<label class="adr-toggle"><input type="checkbox" id="adr-enabled"'+(c.enabled?' checked':'')+'><span class="adr-toggle-slider"></span></label>';
    h += '<button id="adr-close" type="button" class="adr-btn" style="flex:none;padding:3px 8px">×</button>';
    h += '</div></div>';

    h += '<div class="adr-sections">';

    h += adrSec("config", "配置", true,
        '<label>复盘范围（按对话轮数计）</label>'+
        '<select id="adr-range">'+
            adrRangeOpt(c.range, "10", "最近 10 轮")+
            adrRangeOpt(c.range, "20", "最近 20 轮")+
            adrRangeOpt(c.range, "30", "最近 30 轮")+
            adrRangeOpt(c.range, "50", "最近 50 轮")+
            adrRangeOpt(c.range, "custom", "自定义")+
        '</select>'+
        '<input type="number" id="adr-custom-range" placeholder="自定义轮数" value="'+adrEsc(c.customRange || "")+'" style="display:'+(String(c.range)==="custom"?"block":"none")+'">'+
        '<hr>'+
        '<label>API 地址</label>'+
        '<input type="text" id="adr-api-endpoint" value="'+adrEsc(c.apiEndpoint)+'" placeholder="https://openrouter.ai/api/v1">'+
        '<label>API 密钥</label>'+
        '<input type="password" id="adr-api-key" value="'+adrEsc(c.apiKey)+'" placeholder="sk-...">'+
        '<label>模型</label>'+
        '<input type="text" id="adr-model" value="'+adrEsc(c.model)+'" placeholder="例如：gpt-4o-mini / gemini / openrouter model">'+
        '<div class="adr-hint">V0.4 只保存配置，暂不连接 API。</div>'
    );

    h += adrSec("memory", "手动补充", true,
        '<div class="adr-hint">填角色卡要点 / 世界书 / 当前担心，会随分析一起发送。</div>'+
        '<textarea id="adr-supplement-memory" rows="5" placeholder="例：女主表面强硬实则缺爱；男主最近因为任务起冲突…">'+adrEsc(c.supplementMemory)+'</textarea>'
    );

    h += adrSec("preset", "情感导演预设", true,
        '<div class="adr-hint">告诉副 API 怎么分析。V0.5 会真正使用它。</div>'+
        '<textarea id="adr-director-preset" rows="8">'+adrEsc(c.directorPreset || "")+'</textarea>'
    );

    h += adrSec("preview", "导演方向", false,
        '<div id="adr-status" class="adr-status">V0.4 内容测试：点击“生成预览”检查读取与保存。</div>'+
        '<textarea id="adr-preview-text" rows="8" placeholder="生成的导演方向会显示在这里。V0.4 暂时只生成本地预览。">'+adrEsc(c.previewText || "")+'</textarea>'+
        '<label>补充指令</label>'+
        '<input type="text" id="adr-supplement" placeholder="例：这段其实是冷战，别往撒娇方向写">'+
        '<div class="adr-actions">'+
            '<button id="adr-btn-preview" class="adr-btn adr-btn-primary" type="button">生成预览</button>'+
            '<button id="adr-btn-save" class="adr-btn" type="button">保存设置</button>'+
        '</div>'+
        '<div class="adr-actions">'+
            '<button id="adr-btn-copy" class="adr-btn" type="button">复制预览</button>'+
            '<button id="adr-btn-placeholder" class="adr-btn" type="button">API 下一版接入</button>'+
        '</div>'
    );

    h += '</div>';
    panel.innerHTML = h;

    try {
        (d.body || d.documentElement).appendChild(panel);
    } catch(e) {
        document.body.appendChild(panel);
    }
}

function adrOpenPanel() {
    var p = adrQ("#adr-panel");
    if (!p) {
        adrCreatePanel();
        adrBind();
        p = adrQ("#adr-panel");
    }
    if (!p) return;

    p.setAttribute("data-open", "1");
    p.classList.add("visible");

    function imp(k, v) {
        try { p.style.setProperty(k, v, "important"); }
        catch(e) { try { p.style[k] = v; } catch(_) {} }
    }

    imp("display", "flex");
    imp("visibility", "visible");
    imp("opacity", "1");
    imp("position", "fixed");
    imp("z-index", "2147483646");
    imp("right", "8px");
    imp("left", "8px");
    imp("bottom", "76px");
    imp("width", "auto");
    imp("max-height", "74vh");
    imp("overflow", "hidden");
    imp("pointer-events", "auto");
    imp("transform", "translateZ(0)");
}

function adrClosePanel() {
    var p = adrQ("#adr-panel");
    if (!p) return;
    p.setAttribute("data-open", "0");
    p.classList.remove("visible");
    try { p.style.setProperty("display", "none", "important"); } catch(e) { p.style.display = "none"; }
}

function adrTogglePanel() {
    var p = adrQ("#adr-panel");
    if (p && p.getAttribute("data-open") === "1") adrClosePanel();
    else adrOpenPanel();
}

function adrCreateEntry() {
    var d = adrRootDocument();
    var old = adrQ("#adr-entry");
    if (old) return old;

    var btn = d.createElement("button");
    btn.id = "adr-entry";
    btn.type = "button";
    btn.textContent = "🎬 DR";
    btn.title = "红霞导演室 V0.4";

    function imp(k, v) {
        try { btn.style.setProperty(k, v, "important"); }
        catch(e) { try { btn.style[k] = v; } catch(_) {} }
    }

    var savedLeft = Number(adrCfg().quickEntryLeft);
    var savedTop = Number(adrCfg().quickEntryTop);
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
        adrSave("quickEntryLeft", String(Math.round(r.left)));
        adrSave("quickEntryTop", String(Math.round(r.top)));
        if (!moved) adrTogglePanel();
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

function adrCreateDrawer() {
    if (adrQ("#adr-drawer")) return;

    var h = '<div id="adr-drawer"><div class="inline-drawer">';
    h += '<div class="inline-drawer-toggle inline-drawer-header"><b>🎬 红霞导演室 V0.4</b>';
    h += '<div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div>';
    h += '<div class="inline-drawer-content">';
    h += '<div style="font-size:12px;color:#888;margin-bottom:8px">V0.4 内容测试：真实面板内容 + 设置保存，暂不调用 API。</div>';
    h += '<div style="display:flex;gap:6px"><input type="button" id="adr-open" class="menu_button" value="打开导演面板"><input type="button" id="adr-reset" class="menu_button" value="重置入口"></div>';
    h += '</div></div></div>';

    var jq = null;
    try { jq = adrRootWindow().jQuery || adrRootWindow().$ || window.jQuery || window.$; } catch(e) { jq = window.jQuery || window.$; }

    if (jq) {
        var target = jq("#extensions_settings2");
        if (target && target.length) target.append(h);
    } else {
        var d = adrRootDocument();
        var el = d.querySelector("#extensions_settings2");
        if (el) {
            var wrap = d.createElement("div");
            wrap.innerHTML = h;
            el.appendChild(wrap.firstChild);
        }
    }
}

function adrForceSaveFromEditors() {
    var pairs = [
        ["adr-api-endpoint", "apiEndpoint"],
        ["adr-api-key", "apiKey"],
        ["adr-model", "model"],
        ["adr-range", "range"],
        ["adr-custom-range", "customRange"],
        ["adr-supplement-memory", "supplementMemory"],
        ["adr-director-preset", "directorPreset"],
        ["adr-preview-text", "previewText"]
    ];

    for (var i = 0; i < pairs.length; i++) {
        var el = adrQ("#" + pairs[i][0]);
        if (!el) continue;
        adrSave(pairs[i][1], el.value);
    }

    adrSaveNow();
}

function adrBind() {
    adrRootDocument().querySelectorAll(".adr-section-header").forEach(function(h){
        h.addEventListener("click", function(){
            h.parentElement.classList.toggle("collapsed");
        });
    });

    var close = adrQ("#adr-close");
    if (close) close.addEventListener("click", adrClosePanel);

    var enabled = adrQ("#adr-enabled");
    if (enabled) enabled.addEventListener("change", function(){ adrSave("enabled", enabled.checked); });

    var bind = [
        ["adr-api-endpoint", "apiEndpoint"],
        ["adr-api-key", "apiKey"],
        ["adr-model", "model"],
        ["adr-supplement-memory", "supplementMemory"],
        ["adr-director-preset", "directorPreset"],
        ["adr-preview-text", "previewText"]
    ];

    bind.forEach(function(arr){
        var el = adrQ("#" + arr[0]);
        if (!el) return;
        el.addEventListener("input", function(){
            adrSave(arr[1], el.value);
        });
        el.addEventListener("change", function(){
            adrSave(arr[1], el.value);
            adrSaveNow();
        });
    });

    var range = adrQ("#adr-range");
    if (range) range.addEventListener("change", function(){
        adrSave("range", range.value);
        var custom = adrQ("#adr-custom-range");
        if (custom) custom.style.display = (range.value === "custom") ? "block" : "none";
        adrSaveNow();
    });

    var customRange = adrQ("#adr-custom-range");
    if (customRange) customRange.addEventListener("input", function(){
        adrSave("customRange", Number(customRange.value || 0));
    });

    var previewBtn = adrQ("#adr-btn-preview");
    if (previewBtn) previewBtn.addEventListener("click", function(){
        adrForceSaveFromEditors();
        var out = adrBuildDryRunPreview();
        var pv = adrQ("#adr-preview-text");
        if (pv) {
            pv.value = out;
            adrSave("previewText", out);
        }
        adrSetStatus("本地预览已生成 ✓", "#8ed99d");
    });

    var saveBtn = adrQ("#adr-btn-save");
    if (saveBtn) saveBtn.addEventListener("click", function(){
        adrForceSaveFromEditors();
        adrSetStatus("设置已保存 ✓", "#8ed99d");
    });

    var copyBtn = adrQ("#adr-btn-copy");
    if (copyBtn) copyBtn.addEventListener("click", function(){
        var pv = adrQ("#adr-preview-text");
        var text = pv ? pv.value : "";
        if (!text) {
            adrSetStatus("没有内容可复制", "#d4726a");
            return;
        }
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text);
            } else {
                pv.select();
                document.execCommand("copy");
            }
            adrSetStatus("已复制 ✓", "#8ed99d");
        } catch(e) {
            adrSetStatus("复制失败", "#d4726a");
        }
    });

    var placeholder = adrQ("#adr-btn-placeholder");
    if (placeholder) placeholder.addEventListener("click", function(){
        adrSetStatus("API 调用会在 V0.5 接入，现在先测内容面板。", "#d6b177");
    });

    var open = adrQ("#adr-open");
    if (open) open.addEventListener("click", function(){
        adrCreateEntry();
        adrOpenPanel();
    });

    var reset = adrQ("#adr-reset");
    if (reset) reset.addEventListener("click", function(){
        adrSave("quickEntryLeft", "");
        adrSave("quickEntryTop", "");
        var old = adrQ("#adr-entry");
        if (old && old.parentNode) {
            try { old.parentNode.removeChild(old); } catch(e) {}
        }
        adrCreateEntry();
    });

    try {
        var d = adrRootDocument();
        if (typeof MutationObserver !== "undefined" && d.body && !window.__adrObserverV04) {
            window.__adrObserverV04 = new MutationObserver(function(){
                if (!adrQ("#adr-entry")) setTimeout(adrCreateEntry, 100);
                if (!adrQ("#adr-panel")) setTimeout(adrCreatePanel, 100);
            });
            window.__adrObserverV04.observe(d.body, {childList:true, subtree:true});
        }
    } catch(e) {}
}

function adrInit() {
    if (adrInitialized) return;
    adrInitialized = true;

    adrLoadSettings();
    adrCreatePanel();
    adrCreateDrawer();
    adrBind();
    adrCreateEntry();

    setTimeout(adrCreateEntry, 700);
    setTimeout(adrCreateEntry, 1600);
    setTimeout(adrCreateEntry, 3200);

    console.log("[ADR] V0.4 content shell loaded");
}

function adrWait() {
    if (typeof SillyTavern === "undefined" || !SillyTavern.getContext) {
        setTimeout(adrWait, 300);
        return;
    }

    try {
        var c = SillyTavern.getContext();
        c.eventSource.on(c.event_types.APP_READY, function(){
            setTimeout(adrInit, 100);
        });
        setTimeout(adrInit, 1800);
    } catch(e) {
        setTimeout(adrInit, 1200);
    }
}

adrWait();
