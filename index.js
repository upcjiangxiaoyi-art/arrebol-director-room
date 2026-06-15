
/*
 * Arrebol Director Room 红霞导演室 v0.4.0
 * 硬跑通版：
 * - 不拖拽
 * - 不让 observer 碰面板
 * - document 事件委托
 * - 自动打开面板一次
 * - OpenAI-compatible chat/completions
 */

(function () {
    "use strict";

    var EXT = "arrebol-director-room-v040-autorun";
    var DEFAULT_PRESET = "你是 RP 情感导演。请阅读最近的聊天内容和用户补充信息，只分析情感曲线与人设稳定，不写正文。\n\n你需要判断：\n1. 当前关系阶段是什么。\n2. 情绪温度是否过热、过冷、空转或错拍。\n3. 角色是否出现 OOC 风险。\n4. 是否存在秒爱、秒软、秒承诺、隐藏深情化。\n5. 是否把照顾误写成占有，把心疼误写成告白。\n6. 是否过度代演用户的心理与选择。\n7. 当前角色根据人设应该如何承接情绪。\n8. 下一阶段情感应该升温、降温、维持、错拍，还是延迟。\n\n输出必须短，不超过 300 字。不要写分析过程。不要写正文。只给下一阶段情感方向，要给可执行动作与明确禁区。\n\n固定输出格式：\n【情感方向】\n……\n\n【人设边界】\n……\n\n【避免】\n……";

    var DEFAULTS = {
        apiEndpoint: "",
        apiKey: "",
        model: "",
        range: "30",
        customRange: 0,
        supplementMemory: "",
        directorPreset: DEFAULT_PRESET,
        previewText: "",
        quickVisible: true
    };

    var initialized = false;
    var processing = false;
    var aborter = null;
    var currentResult = "";
    var delegated = false;
    var entryTimer = null;

    function rootDoc() {
        try {
            if (window.top && window.top.document) return window.top.document;
        } catch (e) {}
        return document;
    }

    function rootWin() {
        try {
            if (window.top && window.top.document) return window.top;
        } catch (e) {}
        return window;
    }

    function q(sel) {
        var d = rootDoc();
        try {
            var el = d.querySelector(sel);
            if (el) return el;
        } catch (e) {}
        try {
            return document.querySelector(sel);
        } catch (e2) {}
        return null;
    }

    function ctx() {
        return SillyTavern.getContext();
    }

    function esc(s) {
        var d = rootDoc();
        var div = d.createElement("div");
        div.textContent = s == null ? "" : String(s);
        return div.innerHTML;
    }

    function settings() {
        var c = ctx();
        if (!c.extensionSettings[EXT]) c.extensionSettings[EXT] = {};
        var st = c.extensionSettings[EXT];
        for (var k in DEFAULTS) {
            if (st[k] === undefined) st[k] = DEFAULTS[k];
        }
        return st;
    }

    function save(key, val) {
        try {
            settings()[key] = val;
            var c = ctx();
            if (typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced();
        } catch (e) {}
    }

    function saveNow() {
        try {
            var c = ctx();
            if (typeof c.saveSettings === "function") c.saveSettings();
            else if (typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced();
        } catch (e) {}
    }

    function status(text, color) {
        var el = q("#adr040-status");
        if (el) {
            el.textContent = text;
            if (color) el.style.color = color;
        }
    }

    function setPreview(text) {
        currentResult = text || "";
        var pv = q("#adr040-preview");
        if (pv) pv.value = currentResult;
        save("previewText", currentResult);
    }

    function syncFromUI() {
        var pairs = [
            ["adr040-endpoint", "apiEndpoint"],
            ["adr040-key", "apiKey"],
            ["adr040-model", "model"],
            ["adr040-range", "range"],
            ["adr040-custom", "customRange"],
            ["adr040-memory", "supplementMemory"],
            ["adr040-preset", "directorPreset"],
            ["adr040-preview", "previewText"]
        ];

        for (var i = 0; i < pairs.length; i++) {
            var el = q("#" + pairs[i][0]);
            if (!el) continue;
            if (pairs[i][1] === "customRange") save(pairs[i][1], Number(el.value || 0));
            else save(pairs[i][1], el.value || "");
        }
        saveNow();
    }

    function normalizeBase(base) {
        var url = (base || "").trim();
        if (!url) return "";
        while (url.length > 1 && url.charAt(url.length - 1) === "/") url = url.slice(0, -1);
        if (url.indexOf("/chat/completions") >= 0) url = url.replace(/\/chat\/completions\/?$/, "");
        if (url.indexOf("/models") >= 0) url = url.replace(/\/models\/?$/, "");
        if (!url.endsWith("/v1")) url += "/v1";
        return url;
    }

    function chatUrl(base) {
        var b = normalizeBase(base);
        return b ? b + "/chat/completions" : "";
    }

    function activeRange() {
        var st = settings();
        if (String(st.range) === "custom") {
            var n = Number(st.customRange || 0);
            return n > 0 ? n : 30;
        }
        var r = Number(st.range || 30);
        return r > 0 ? r : 30;
    }

    function recentChat(rounds) {
        var chat;
        try { chat = ctx().chat; } catch (e) { return ""; }
        if (!chat || !chat.length) return "";

        var limit = rounds * 2;
        var arr = [];
        var count = 0;

        for (var i = chat.length - 1; i >= 0 && count < limit; i--) {
            var m = chat[i];
            if (!m || m.is_system) continue;

            var role = m.is_user ? "用户" : (m.name || "角色");
            var text = String(m.mes || "").trim();
            text = text.replace(/image###[\s\S]*?###/g, "").trim();
            text = text.replace(/【导演注入】[\s\S]*$/g, "").trim();
            if (!text) continue;

            arr.unshift("[" + role + "] " + text);
            count++;
        }
        return arr.join("\n\n");
    }

    function buildPrompt(extra) {
        var st = settings();
        var r = activeRange();
        var out = "";

        if (st.supplementMemory && st.supplementMemory.trim()) {
            out += "【角色卡要点 / 世界书 / 当前担心】\n" + st.supplementMemory.trim() + "\n\n";
        }

        var recent = recentChat(r);
        out += "【最近 " + r + " 轮 RP】\n" + (recent || "（未读取到聊天内容）") + "\n\n";

        if (extra && extra.trim()) {
            out += "【本次额外指令】\n" + extra.trim() + "\n\n";
        }

        out += "请根据以上内容输出导演方向。只输出方向结果，不要复述分析过程，不要写正文。";
        return out;
    }

    function parseResponse(data) {
        if (!data) return "";
        if (data.choices && data.choices[0]) {
            var ch = data.choices[0];
            if (ch.message) {
                var msg = ch.message;
                if (typeof msg.content === "string" && msg.content.trim()) return msg.content.trim();
                if (msg.content && Array.isArray(msg.content)) {
                    var parts = [];
                    msg.content.forEach(function (p) {
                        if (!p) return;
                        if (typeof p === "string") parts.push(p);
                        else if (p.text) parts.push(p.text);
                        else if (p.type === "text" && p.text) parts.push(p.text);
                    });
                    if (parts.join("").trim()) return parts.join("\n").trim();
                }
            }
            if (ch.text) return String(ch.text).trim();
        }
        if (data.response) return String(data.response).trim();
        if (data.text) return String(data.text).trim();
        return "";
    }

    async function callAPI(extra) {
        var st = settings();
        if (!st.apiEndpoint) throw new Error("请先填写 API 地址");
        if (!st.model) throw new Error("请先填写模型名");

        var url = chatUrl(st.apiEndpoint);
        if (!url) throw new Error("API 地址无效");

        var headers = { "Content-Type": "application/json" };
        if (st.apiKey) headers.Authorization = "Bearer " + st.apiKey;

        if (typeof AbortController !== "undefined") aborter = new AbortController();
        else aborter = null;

        var body = {
            model: st.model,
            messages: [
                { role: "system", content: st.directorPreset || DEFAULT_PRESET },
                { role: "user", content: buildPrompt(extra || "") }
            ],
            temperature: 0.6,
            stream: false
        };

        var opts = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        };
        if (aborter) opts.signal = aborter.signal;

        var res = await fetch(url, opts);
        var raw = await res.text();

        if (!res.ok) throw new Error("API " + res.status + "：" + raw.slice(0, 220));

        var data;
        try { data = JSON.parse(raw); }
        catch (e) { throw new Error("API 返回非 JSON：" + raw.slice(0, 180)); }

        var out = parseResponse(data);
        if (!out) throw new Error("无法解析响应：" + raw.slice(0, 220));
        return out;
    }

    function setButtons() {
        var g = q("#adr040-generate");
        var r = q("#adr040-reroll");
        var s = q("#adr040-stop");
        var c = q("#adr040-copy");
        if (g) g.disabled = processing;
        if (r) r.disabled = processing;
        if (s) s.disabled = !processing;
        if (c) c.disabled = !currentResult;
    }

    async function run(extra) {
        if (processing) return;
        syncFromUI();

        processing = true;
        setButtons();
        status("正在分析…", "#8ed99d");

        try {
            var result = await callAPI(extra || "");
            setPreview(result);
            status("分析完成 ✓", "#8ed99d");
        } catch (e) {
            var msg = e && e.name === "AbortError" ? "请求已打断" : (e.message || String(e));
            status("失败：" + msg, "#d4726a");
        }

        processing = false;
        aborter = null;
        setButtons();
    }

    function abortRun() {
        try {
            if (aborter) aborter.abort();
            status("已打断请求", "#d4726a");
        } catch (e) {
            status("打断失败：" + e.message, "#d4726a");
        }
        processing = false;
        aborter = null;
        setButtons();
    }

    function copyPreview() {
        var pv = q("#adr040-preview");
        var text = pv ? pv.value : currentResult;
        if (!text) {
            status("没有内容可复制", "#d4726a");
            return;
        }

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text);
            else if (pv) {
                pv.focus();
                pv.select();
                document.execCommand("copy");
            }
            status("已复制 ✓", "#8ed99d");
        } catch (e) {
            status("复制失败", "#d4726a");
        }
    }

    function opt(cur, val, label) {
        return '<option value="' + val + '"' + (String(cur) === String(val) ? " selected" : "") + '>' + label + '</option>';
    }

    function panelHTML() {
        var st = settings();
        return ''
            + '<div class="adr040-head"><b>🎬 红霞导演室 v0.4.0</b><button id="adr040-close" type="button">×</button></div>'
            + '<div class="adr040-body">'
            + '<details open><summary>配置</summary>'
            + '<label>复盘范围</label><select id="adr040-range">'
            + opt(st.range, "10", "最近 10 轮")
            + opt(st.range, "20", "最近 20 轮")
            + opt(st.range, "30", "最近 30 轮")
            + opt(st.range, "50", "最近 50 轮")
            + opt(st.range, "custom", "自定义")
            + '</select>'
            + '<input type="number" id="adr040-custom" placeholder="自定义轮数" value="' + esc(st.customRange || "") + '" style="display:' + (String(st.range) === "custom" ? "block" : "none") + '">'
            + '<label>API 地址</label><input type="text" id="adr040-endpoint" value="' + esc(st.apiEndpoint || "") + '" placeholder="https://openrouter.ai/api/v1">'
            + '<label>API 密钥</label><input type="password" id="adr040-key" value="' + esc(st.apiKey || "") + '" placeholder="sk-...">'
            + '<label>模型</label><input type="text" id="adr040-model" value="' + esc(st.model || "") + '" placeholder="例如：gpt-4o-mini / openrouter model">'
            + '</details>'
            + '<details><summary>手动补充</summary>'
            + '<div class="adr040-hint">填角色卡要点 / 世界书 / 当前担心。</div>'
            + '<textarea id="adr040-memory" rows="5">' + esc(st.supplementMemory || "") + '</textarea>'
            + '</details>'
            + '<details><summary>情感导演预设</summary>'
            + '<textarea id="adr040-preset" rows="8">' + esc(st.directorPreset || "") + '</textarea>'
            + '</details>'
            + '<details open><summary>导演方向</summary>'
            + '<div id="adr040-status">硬跑通版已加载。面板会自动打开一次。</div>'
            + '<textarea id="adr040-preview" rows="8" placeholder="生成的导演方向将显示在这里…">' + esc(st.previewText || "") + '</textarea>'
            + '<label>补充指令</label><input type="text" id="adr040-extra" placeholder="例：这段其实是冷战，别往撒娇方向写">'
            + '<div class="adr040-actions"><button id="adr040-generate" type="button">生成方向</button><button id="adr040-reroll" type="button">重新分析</button></div>'
            + '<div class="adr040-actions"><button id="adr040-stop" type="button" disabled>打断请求</button><button id="adr040-copy" type="button">复制</button></div>'
            + '</details>'
            + '</div>';
    }

    function createPanel() {
        var old = q("#adr040-panel");
        if (old) return old;

        var d = rootDoc();
        var p = d.createElement("div");
        p.id = "adr040-panel";
        p.setAttribute("data-open", "0");
        p.innerHTML = panelHTML();

        p.style.setProperty("position", "fixed", "important");
        p.style.setProperty("left", "8px", "important");
        p.style.setProperty("right", "8px", "important");
        p.style.setProperty("bottom", "76px", "important");
        p.style.setProperty("max-height", "74vh", "important");
        p.style.setProperty("display", "none", "important");
        p.style.setProperty("flex-direction", "column", "important");
        p.style.setProperty("z-index", "2147483646", "important");
        p.style.setProperty("background", "rgba(28,23,25,.97)", "important");
        p.style.setProperty("color", "#eee", "important");
        p.style.setProperty("border", "1px solid rgba(214,122,106,.4)", "important");
        p.style.setProperty("border-radius", "14px", "important");
        p.style.setProperty("box-shadow", "0 10px 40px rgba(0,0,0,.42)", "important");
        p.style.setProperty("overflow", "hidden", "important");
        p.style.setProperty("font-family", "-apple-system,'PingFang SC','Microsoft YaHei',sans-serif", "important");
        p.style.setProperty("font-size", "13px", "important");
        p.style.setProperty("pointer-events", "auto", "important");

        try { (d.body || d.documentElement).appendChild(p); }
        catch (e) { document.body.appendChild(p); }

        return p;
    }

    function showPanel() {
        var p = createPanel();
        p.setAttribute("data-open", "1");
        p.style.setProperty("display", "flex", "important");
        p.style.setProperty("visibility", "visible", "important");
        p.style.setProperty("opacity", "1", "important");
        p.style.setProperty("pointer-events", "auto", "important");
        setButtons();
    }

    function hidePanel() {
        var p = q("#adr040-panel");
        if (!p) return;
        p.setAttribute("data-open", "0");
        p.style.setProperty("display", "none", "important");
    }

    function togglePanel() {
        var p = q("#adr040-panel");
        if (p && p.getAttribute("data-open") === "1") hidePanel();
        else showPanel();
    }

    function createEntry() {
        var old = q("#adr040-entry");
        if (old) return old;

        var d = rootDoc();
        var btn = d.createElement("button");
        btn.id = "adr040-entry";
        btn.type = "button";
        btn.textContent = "🎬 DR";
        btn.title = "红霞导演室 v0.4.0";

        function imp(k, v) {
            try { btn.style.setProperty(k, v, "important"); }
            catch (e) { try { btn.style[k] = v; } catch (_) {} }
        }

        imp("position", "fixed");
        imp("right", "12px");
        imp("bottom", "178px");
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
        imp("pointer-events", "auto");
        imp("touch-action", "manipulation");
        imp("user-select", "none");
        imp("-webkit-user-select", "none");

        try { (d.body || d.documentElement).appendChild(btn); }
        catch (e) { document.body.appendChild(btn); }

        return btn;
    }

    function createDrawer() {
        if (q("#adr040-drawer")) return;

        var h = '<div id="adr040-drawer"><div class="inline-drawer">'
            + '<div class="inline-drawer-toggle inline-drawer-header"><b>🎬 红霞导演室 v0.4.0</b><div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div>'
            + '<div class="inline-drawer-content">'
            + '<div style="font-size:12px;color:#888;margin-bottom:8px">硬跑通版：无拖拽、自动开面板、事件委托。</div>'
            + '<div style="display:flex;gap:6px"><input type="button" id="adr040-open" class="menu_button" value="打开导演面板"><input type="button" id="adr040-reset" class="menu_button" value="重建面板"></div>'
            + '</div></div></div>';

        try {
            var jq = rootWin().jQuery || rootWin().$ || window.jQuery || window.$;
            if (jq) {
                var target = jq("#extensions_settings2");
                if (target && target.length) {
                    target.append(h);
                    return;
                }
            }
        } catch (e) {}

        var d = rootDoc();
        var el = d.querySelector("#extensions_settings2");
        if (el) {
            var wrap = d.createElement("div");
            wrap.innerHTML = h;
            el.appendChild(wrap.firstChild);
        }
    }

    function installDelegatedEvents() {
        if (delegated) return;
        delegated = true;

        var d = rootDoc();

        d.addEventListener("click", function (ev) {
            var t = ev.target;
            if (!t) return;

            var hit = null;
            try { hit = t.closest("#adr040-entry,#adr040-open,#adr040-reset,#adr040-close,#adr040-generate,#adr040-reroll,#adr040-stop,#adr040-copy,#adr040-range"); }
            catch (e) { hit = null; }

            if (!hit) return;

            var id = hit.id;

            if (id === "adr040-entry" || id === "adr040-open") {
                ev.preventDefault();
                ev.stopPropagation();
                showPanel();
                return;
            }

            if (id === "adr040-reset") {
                ev.preventDefault();
                ev.stopPropagation();
                var p = q("#adr040-panel");
                if (p && p.parentNode) p.parentNode.removeChild(p);
                createPanel();
                showPanel();
                status("面板已重建 ✓", "#8ed99d");
                return;
            }

            if (id === "adr040-close") {
                ev.preventDefault();
                ev.stopPropagation();
                hidePanel();
                return;
            }

            if (id === "adr040-generate") {
                ev.preventDefault();
                ev.stopPropagation();
                run("");
                return;
            }

            if (id === "adr040-reroll") {
                ev.preventDefault();
                ev.stopPropagation();
                var extra = q("#adr040-extra");
                run(extra ? extra.value : "");
                return;
            }

            if (id === "adr040-stop") {
                ev.preventDefault();
                ev.stopPropagation();
                abortRun();
                return;
            }

            if (id === "adr040-copy") {
                ev.preventDefault();
                ev.stopPropagation();
                copyPreview();
                return;
            }
        }, true);

        d.addEventListener("change", function (ev) {
            var t = ev.target;
            if (!t || !t.id) return;

            if (t.id === "adr040-range") {
                save("range", t.value);
                var cr = q("#adr040-custom");
                if (cr) cr.style.display = t.value === "custom" ? "block" : "none";
                saveNow();
            }
        }, true);

        d.addEventListener("input", function (ev) {
            var t = ev.target;
            if (!t || !t.id) return;

            var map = {
                "adr040-endpoint": "apiEndpoint",
                "adr040-key": "apiKey",
                "adr040-model": "model",
                "adr040-custom": "customRange",
                "adr040-memory": "supplementMemory",
                "adr040-preset": "directorPreset",
                "adr040-preview": "previewText"
            };

            var key = map[t.id];
            if (!key) return;

            if (key === "customRange") save(key, Number(t.value || 0));
            else save(key, t.value || "");
        }, true);
    }

    function ensureEntryLater() {
        createEntry();
        if (entryTimer) clearTimeout(entryTimer);
        setTimeout(createEntry, 700);
        setTimeout(createEntry, 1600);
        setTimeout(createEntry, 3200);
    }

    function init() {
        if (initialized) return;
        initialized = true;

        try {
            settings();
            createDrawer();
            createPanel();
            createEntry();
            installDelegatedEvents();
            ensureEntryLater();

            // 关键诊断：自动打开一次，不靠点击。
            setTimeout(function () {
                showPanel();
                status("面板已自动打开。若你能看到这里，内容层已经跑通。", "#8ed99d");
            }, 900);

            console.log("[ADR040] loaded");
        } catch (e) {
            console.error("[ADR040] init failed", e);
        }
    }

    function wait() {
        if (typeof SillyTavern === "undefined" || !SillyTavern.getContext) {
            setTimeout(wait, 300);
            return;
        }

        try {
            var c = SillyTavern.getContext();
            if (c.eventSource && c.event_types && c.event_types.APP_READY) {
                c.eventSource.on(c.event_types.APP_READY, function () {
                    setTimeout(init, 100);
                });
            }
            setTimeout(init, 1800);
        } catch (e) {
            setTimeout(init, 1200);
        }
    }

    wait();
})();
