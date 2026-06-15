
/*
 * Arrebol Director Room 红霞导演室 v0.4.1
 * 抽屉内嵌硬跑通版：
 * - 不创建 floating entry
 * - 不创建 fixed panel
 * - 不依赖打开面板按钮
 * - 所有真实功能直接显示在 #extensions_settings2 抽屉里
 * - 使用全局函数 + 直接绑定双保险
 */

(function () {
    "use strict";

    var EXT = "arrebol-director-room-v041-drawer-inline";
    var DEFAULT_PRESET = "你是 RP 情感导演。请阅读最近的聊天内容和用户补充信息，只分析情感曲线与人设稳定，不写正文。\n\n你需要判断：\n1. 当前关系阶段是什么。\n2. 情绪温度是否过热、过冷、空转或错拍。\n3. 角色是否出现 OOC 风险。\n4. 是否存在秒爱、秒软、秒承诺、隐藏深情化。\n5. 是否把照顾误写成占有，把心疼误写成告白。\n6. 是否过度代演用户的心理与选择。\n7. 当前角色根据人设应该如何承接情绪。\n8. 下一阶段情感应该升温、降温、维持、错拍，还是延迟。\n\n输出必须短，不超过 300 字。不要写分析过程。不要写正文。只给下一阶段情感方向，要给可执行动作与明确禁区。\n\n固定输出格式：\n【情感方向】\n……\n\n【人设边界】\n……\n\n【避免】\n……";

    var DEFAULTS = {
        apiEndpoint: "",
        apiKey: "",
        model: "",
        range: "30",
        customRange: 0,
        supplementMemory: "",
        directorPreset: DEFAULT_PRESET,
        previewText: ""
    };

    var initialized = false;
    var processing = false;
    var aborter = null;

    function rootWin() {
        try {
            if (window.top && window.top.document) return window.top;
        } catch (e) {}
        return window;
    }

    function rootDoc() {
        try {
            var w = rootWin();
            if (w && w.document) return w.document;
        } catch (e) {}
        return document;
    }

    function ctx() {
        return SillyTavern.getContext();
    }

    function q(sel) {
        var d = rootDoc();
        try {
            var el = d.querySelector(sel);
            if (el) return el;
        } catch (e) {}
        try { return document.querySelector(sel); } catch (e2) {}
        return null;
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
        var el = q("#adr041-status");
        if (el) {
            el.textContent = text;
            if (color) el.style.color = color;
        }
    }

    function setPreview(text) {
        var pv = q("#adr041-preview");
        if (pv) pv.value = text || "";
        save("previewText", text || "");
    }

    function sync() {
        var pairs = [
            ["adr041-endpoint", "apiEndpoint"],
            ["adr041-key", "apiKey"],
            ["adr041-model", "model"],
            ["adr041-range", "range"],
            ["adr041-custom", "customRange"],
            ["adr041-memory", "supplementMemory"],
            ["adr041-preset", "directorPreset"],
            ["adr041-preview", "previewText"]
        ];
        pairs.forEach(function (pair) {
            var el = q("#" + pair[0]);
            if (!el) return;
            if (pair[1] === "customRange") save(pair[1], Number(el.value || 0));
            else save(pair[1], el.value || "");
        });
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

        out += "【最近 " + r + " 轮 RP】\n" + (recentChat(r) || "（未读取到聊天内容）") + "\n\n";

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

        if (!res.ok) {
            throw new Error("API " + res.status + "：" + raw.slice(0, 220));
        }

        var data;
        try { data = JSON.parse(raw); }
        catch (e) { throw new Error("API 返回非 JSON：" + raw.slice(0, 180)); }

        var out = parseResponse(data);
        if (!out) throw new Error("无法解析响应：" + raw.slice(0, 220));
        return out;
    }

    function setButtons() {
        var g = q("#adr041-generate");
        var r = q("#adr041-reroll");
        var s = q("#adr041-stop");
        var c = q("#adr041-copy");

        if (g) g.disabled = processing;
        if (r) r.disabled = processing;
        if (s) s.disabled = !processing;
        if (c) c.disabled = !(q("#adr041-preview") && q("#adr041-preview").value);
    }

    async function run(extra) {
        if (processing) return;
        sync();

        processing = true;
        setButtons();
        status("正在分析…", "#8ed99d");

        try {
            var out = await callAPI(extra || "");
            setPreview(out);
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
        var pv = q("#adr041-preview");
        var text = pv ? pv.value : "";
        if (!text) {
            status("没有内容可复制", "#d4726a");
            return;
        }

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text);
            else {
                pv.focus();
                pv.select();
                document.execCommand("copy");
            }
            status("已复制 ✓", "#8ed99d");
        } catch (e) {
            status("复制失败", "#d4726a");
        }
    }

    function testLocalPreview() {
        sync();
        var r = activeRange();
        var text = "【本地测试】\n抽屉内嵌功能已触发。\n\n【读取最近 " + r + " 轮】\n" + (recentChat(r).slice(0, 1200) || "（未读取到聊天内容）");
        setPreview(text);
        status("本地测试成功 ✓ 按钮与读取链路可用", "#8ed99d");
        setButtons();
    }

    function opt(cur, val, label) {
        return '<option value="' + val + '"' + (String(cur) === String(val) ? " selected" : "") + '>' + label + '</option>';
    }

    function drawerHTML() {
        var st = settings();

        return '<div id="adr041-drawer"><div class="inline-drawer">'
            + '<div class="inline-drawer-toggle inline-drawer-header"><b>🎬 红霞导演室 v0.4.1</b><div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div>'
            + '<div class="inline-drawer-content">'
            + '<div class="adr041-box">'
            + '<div class="adr041-note">抽屉内嵌硬跑通版：不使用浮窗/面板。先确认真实功能链路能跑。</div>'

            + '<details open><summary>配置</summary>'
            + '<label>复盘范围</label><select id="adr041-range">'
            + opt(st.range, "10", "最近 10 轮")
            + opt(st.range, "20", "最近 20 轮")
            + opt(st.range, "30", "最近 30 轮")
            + opt(st.range, "50", "最近 50 轮")
            + opt(st.range, "custom", "自定义")
            + '</select>'
            + '<input type="number" id="adr041-custom" placeholder="自定义轮数" value="' + esc(st.customRange || "") + '" style="display:' + (String(st.range) === "custom" ? "block" : "none") + '">'
            + '<label>API 地址</label><input type="text" id="adr041-endpoint" value="' + esc(st.apiEndpoint || "") + '" placeholder="https://openrouter.ai/api/v1">'
            + '<label>API 密钥</label><input type="password" id="adr041-key" value="' + esc(st.apiKey || "") + '" placeholder="sk-...">'
            + '<label>模型</label><input type="text" id="adr041-model" value="' + esc(st.model || "") + '" placeholder="例如：gpt-4o-mini / openrouter model">'
            + '</details>'

            + '<details><summary>手动补充</summary>'
            + '<textarea id="adr041-memory" rows="5" placeholder="角色卡要点 / 世界书 / 当前担心">' + esc(st.supplementMemory || "") + '</textarea>'
            + '</details>'

            + '<details><summary>情感导演预设</summary>'
            + '<textarea id="adr041-preset" rows="8">' + esc(st.directorPreset || "") + '</textarea>'
            + '</details>'

            + '<details open><summary>导演方向</summary>'
            + '<div id="adr041-status">抽屉内嵌版已加载。请先点“本地测试”。</div>'
            + '<textarea id="adr041-preview" rows="8" placeholder="生成结果显示在这里">' + esc(st.previewText || "") + '</textarea>'
            + '<label>补充指令</label><input type="text" id="adr041-extra" placeholder="例：这段其实是冷战，别往撒娇方向写">'
            + '<div class="adr041-actions"><button id="adr041-local" type="button">本地测试</button><button id="adr041-generate" type="button">生成方向</button></div>'
            + '<div class="adr041-actions"><button id="adr041-reroll" type="button">重新分析</button><button id="adr041-stop" type="button" disabled>打断请求</button><button id="adr041-copy" type="button">复制</button></div>'
            + '</details>'

            + '</div>'
            + '</div></div></div>';
    }

    function mountDrawer() {
        if (q("#adr041-drawer")) return;

        var html = drawerHTML();

        try {
            var jq = rootWin().jQuery || rootWin().$ || window.jQuery || window.$;
            if (jq) {
                var target = jq("#extensions_settings2");
                if (target && target.length) {
                    target.append(html);
                    return;
                }
            }
        } catch (e) {}

        var d = rootDoc();
        var el = d.querySelector("#extensions_settings2");
        if (el) {
            var wrap = d.createElement("div");
            wrap.innerHTML = html;
            el.appendChild(wrap.firstChild);
        }
    }

    function bindDirect() {
        var ids = {
            "adr041-local": function () { testLocalPreview(); },
            "adr041-generate": function () { run(""); },
            "adr041-reroll": function () {
                var extra = q("#adr041-extra");
                run(extra ? extra.value : "");
            },
            "adr041-stop": function () { abortRun(); },
            "adr041-copy": function () { copyPreview(); }
        };

        Object.keys(ids).forEach(function (id) {
            var el = q("#" + id);
            if (!el || el.__adr041Bound) return;
            el.__adr041Bound = true;
            el.addEventListener("click", function (ev) {
                try { ev.preventDefault(); ev.stopPropagation(); } catch (e) {}
                ids[id]();
            });
        });

        var range = q("#adr041-range");
        if (range && !range.__adr041Bound) {
            range.__adr041Bound = true;
            range.addEventListener("change", function () {
                save("range", range.value);
                var custom = q("#adr041-custom");
                if (custom) custom.style.display = range.value === "custom" ? "block" : "none";
                saveNow();
            });
        }

        var map = {
            "adr041-endpoint": "apiEndpoint",
            "adr041-key": "apiKey",
            "adr041-model": "model",
            "adr041-custom": "customRange",
            "adr041-memory": "supplementMemory",
            "adr041-preset": "directorPreset",
            "adr041-preview": "previewText"
        };

        Object.keys(map).forEach(function (id) {
            var el = q("#" + id);
            if (!el || el.__adr041InputBound) return;
            el.__adr041InputBound = true;
            el.addEventListener("input", function () {
                if (map[id] === "customRange") save(map[id], Number(el.value || 0));
                else save(map[id], el.value || "");
            });
        });
    }

    function installGlobals() {
        var w = rootWin();
        w.ADR041_run = function () { run(""); };
        w.ADR041_local = function () { testLocalPreview(); };
        w.ADR041_copy = function () { copyPreview(); };
    }

    function init() {
        if (initialized) return;
        initialized = true;

        try {
            settings();
            mountDrawer();
            bindDirect();
            installGlobals();
            setTimeout(bindDirect, 500);
            setTimeout(bindDirect, 1500);
            setTimeout(bindDirect, 3000);
            console.log("[ADR041] drawer inline loaded");
        } catch (e) {
            console.error("[ADR041] init failed", e);
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
