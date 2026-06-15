/*
 * 红霞壳测试 Shell Test v0.3.2
 * 全新 EXT_NAME + 全新 DOM id，绕开旧版红霞缓存/设置污染
 */

const DRT_EXT_NAME = "arrebol-director-room-shell-test-v032";

const DRT_DEFAULTS = {
    showQuickEntry: true,
    quickEntryLeft: "",
    quickEntryTop: "",
    note: "如果你能看到这个面板，说明全新身份测试壳加载成功。"
};

let drtInitialized = false;

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
        // 测试包强制显示入口
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

function drtCreatePanel() {
    if (drtQ("#drt-panel")) return;
    var d = drtRootDocument();
    var p = d.createElement("div");
    p.id = "drt-panel";
    p.setAttribute("data-open", "0");
    p.innerHTML = ''
        + '<div class="drt-panel-header">'
        + '<b>🎬 红霞壳测试 v0.3.2</b>'
        + '<button id="drt-close" type="button">×</button>'
        + '</div>'
        + '<div class="drt-panel-body">'
        + '<div id="drt-status">全新身份测试壳已加载。现在只测浮窗和面板。</div>'
        + '<textarea id="drt-note" rows="6">' + drtEsc(drtCfg().note || "") + '</textarea>'
        + '<button id="drt-ping" type="button">测试按钮</button>'
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

    var close = p.querySelector("#drt-close");
    if (close) close.addEventListener("click", drtHidePanel);

    var ping = p.querySelector("#drt-ping");
    if (ping) ping.addEventListener("click", function(){
        var st = drtQ("#drt-status");
        if (st) st.textContent = "测试按钮可用 ✓ " + new Date().toLocaleTimeString();
    });

    var note = p.querySelector("#drt-note");
    if (note) note.addEventListener("input", function(){ drtSave("note", note.value); });
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
    btn.textContent = "🎬 TEST";
    btn.title = "红霞壳测试 v0.3.2";

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
    h += '<div class="inline-drawer-toggle inline-drawer-header"><b>🎬 红霞壳测试 v0.3.2</b>';
    h += '<div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div>';
    h += '<div class="inline-drawer-content">';
    h += '<div style="font-size:12px;color:#888;margin-bottom:8px">全新身份测试包：如果看到这个标题，说明新版真的加载了。</div>';
    h += '<div style="display:flex;gap:6px"><input type="button" id="drt-open" class="menu_button" value="打开测试面板"><input type="button" id="drt-reset" class="menu_button" value="重置测试入口"></div>';
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

function drtBind() {
    var open = drtQ("#drt-open");
    if (open) open.addEventListener("click", function(){
        drtCreateEntry();
        drtShowPanel();
    });

    var reset = drtQ("#drt-reset");
    if (reset) reset.addEventListener("click", function(){
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
        if (typeof MutationObserver !== "undefined" && d.body && !window.__drtObserver032) {
            window.__drtObserver032 = new MutationObserver(function(){
                if (!drtQ("#drt-entry")) setTimeout(drtCreateEntry, 100);
                if (!drtQ("#drt-panel")) setTimeout(drtCreatePanel, 100);
            });
            window.__drtObserver032.observe(d.body, {childList:true, subtree:true});
        }
    } catch(e) {}
}

function drtInit() {
    if (drtInitialized) return;
    drtInitialized = true;
    drtLoadSettings();
    drtCreatePanel();
    drtCreateDrawer();
    drtBind();
    drtCreateEntry();
    setTimeout(drtCreateEntry, 700);
    setTimeout(drtCreateEntry, 1600);
    setTimeout(drtCreateEntry, 3200);
    console.log("[DRT] shell test v0.3.2 loaded");
}

function drtWait() {
    if (typeof SillyTavern === "undefined" || !SillyTavern.getContext) {
        setTimeout(drtWait, 300);
        return;
    }
    try {
        var c = SillyTavern.getContext();
        c.eventSource.on(c.event_types.APP_READY, function(){ setTimeout(drtInit, 100); });
        setTimeout(drtInit, 1800);
    } catch(e) {
        setTimeout(drtInit, 1200);
    }
}

drtWait();
