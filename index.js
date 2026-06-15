
/*
 * Arrebol Director Room 红霞导演室 v0.4.3
 * 抽屉内嵌稳定版：
 * - 情感导演 / 剧情导演 双页面
 * - 双 API / 双模型 / 双预设
 * - 拉取模型
 * - 本地测试
 * - 生成方向
 * - 自动注入到当前聊天，下一轮可读到
 */

(function () {
    "use strict";

    var EXT = "arrebol-director-room-v043-dual-inject";
    var EMOTION_PRESET = "你是 RP 情感导演。请阅读最近的聊天内容和用户补充信息，只分析情感曲线与人设稳定，不写正文。\n\n你需要判断：\n1. 当前关系阶段是什么。\n2. 情绪温度是否过热、过冷、空转或错拍。\n3. 角色是否出现 OOC 风险。\n4. 是否存在秒爱、秒软、秒承诺、隐藏深情化。\n5. 是否把照顾误写成占有，把心疼误写成告白。\n6. 是否过度代演用户的心理与选择。\n7. 当前角色根据人设应该如何承接情绪。\n8. 下一阶段情感应该升温、降温、维持、错拍，还是延迟。\n\n输出必须短，不超过 300 字。不要写分析过程。不要写正文。只给下一阶段情感方向，要给可执行动作与明确禁区。\n\n固定输出格式：\n【情感方向】\n……\n\n【人设边界】\n……\n\n【避免】\n……";
    var PLOT_PRESET = "你是 RP 剧情导演。请阅读最近的聊天内容和用户补充信息，只分析剧情推进、事件张力、伏笔与场景调度，不写正文。\n\n你需要判断：\n1. 当前剧情是否停滞、空转或重复。\n2. 场景是否需要推进、转场、插入事件、制造阻碍，还是维持压抑。\n3. 哪些伏笔可以轻轻回收，哪些伏笔不能急着揭开。\n4. NPC、环境、现实阻尼是否应该介入。\n5. 当前剧情的下一步应该发生什么“可执行事件”。\n6. 避免强行相遇、强行表白、强行救场、巧合堆叠。\n7. 不要替用户决定行动，只给世界和角色侧的推进方向。\n\n输出必须短，不超过 300 字。不要写正文。不要写分析过程。只给下一阶段剧情方向。\n\n固定输出格式：\n【剧情推进】\n……\n\n【事件抓手】\n……\n\n【避免】\n……";

    var DEFAULTS = {
        activeTab: "emotion",
        autoInjectEmotion: true,
        autoInjectPlot: true,
        injectMode: "visible",

        range: "30",
        customRange: 0,
        supplementMemory: "",

        emotionApiEndpoint: "",
        emotionApiKey: "",
        emotionModel: "",
        emotionPreset: EMOTION_PRESET,
        emotionPreview: "",

        plotApiEndpoint: "",
        plotApiKey: "",
        plotModel: "",
        plotPreset: PLOT_PRESET,
        plotPreview: ""
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
        if (!st.emotionPreset) st.emotionPreset = EMOTION_PRESET;
        if (!st.plotPreset) st.plotPreset = PLOT_PRESET;
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

    function status(type, text, color) {
        var el = q("#adr043-" + type + "-status");
        if (el) {
            el.textContent = text;
            if (color) el.style.color = color;
        }
    }

    function currentType() {
        var st = settings();
        return st.activeTab === "plot" ? "plot" : "emotion";
    }

    function labelOf(type) {
        return type === "plot" ? "剧情导演" : "情感导演";
    }

    function prefixOf(type) {
        return type === "plot" ? "plot" : "emotion";
    }

    function field(type, name) {
        var p = prefixOf(type);
        return p + name.charAt(0).toUpperCase() + name.slice(1);
    }

    function setPreview(type, text) {
        var pv = q("#adr043-" + type + "-preview");
        if (pv) pv.value = text || "";
        save(field(type, "preview"), text || "");
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

    function modelsUrl(base) {
        var b = normalizeBase(base);
        return b ? b + "/models" : "";
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

    function cleanMessage(text) {
        text = String(text || "").trim();
        text = text.replace(/image###[\s\S]*?###/g, "").trim();
        text = text.replace(/<!--ARREBOL_DIRECTOR_START-->[\s\S]*?<!--ARREBOL_DIRECTOR_END-->/g, "").trim();
        return text;
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
            var text = cleanMessage(m.mes);
            if (!text) continue;

            arr.unshift("[" + role + "] " + text);
            count++;
        }

        return arr.join("\n\n");
    }

    function syncShared() {
        var st = settings();

        var range = q("#adr043-range");
        if (range) save("range", range.value || "30");

        var custom = q("#adr043-custom");
        if (custom) save("customRange", Number(custom.value || 0));

        var memory = q("#adr043-memory");
        if (memory) save("supplementMemory", memory.value || "");

        var mode = q("#adr043-inject-mode");
        if (mode) save("injectMode", mode.value || "visible");

        var aiE = q("#adr043-auto-inject-emotion");
        if (aiE) save("autoInjectEmotion", !!aiE.checked);

        var aiP = q("#adr043-auto-inject-plot");
        if (aiP) save("autoInjectPlot", !!aiP.checked);

        saveNow();
    }

    function syncType(type) {
        var p = prefixOf(type);

        var endpoint = q("#adr043-" + type + "-endpoint");
        var key = q("#adr043-" + type + "-key");
        var model = q("#adr043-" + type + "-model");
        var preset = q("#adr043-" + type + "-preset");
        var preview = q("#adr043-" + type + "-preview");

        if (endpoint) save(p + "ApiEndpoint", endpoint.value || "");
        if (key) save(p + "ApiKey", key.value || "");
        if (model) save(p + "Model", model.value || "");
        if (preset) save(p + "Preset", preset.value || "");
        if (preview) save(p + "Preview", preview.value || "");

        saveNow();
    }

    function syncAll() {
        syncShared();
        syncType("emotion");
        syncType("plot");
    }

    function buildPrompt(type, extra) {
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

        if (type === "plot") {
            out += "请根据以上内容输出剧情导演方向。只输出方向结果，不要复述分析过程，不要写正文。";
        } else {
            out += "请根据以上内容输出情感导演方向。只输出方向结果，不要复述分析过程，不要写正文。";
        }

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

    async function callAPI(type, extra) {
        var st = settings();
        var p = prefixOf(type);

        var endpoint = st[p + "ApiEndpoint"] || "";
        var key = st[p + "ApiKey"] || "";
        var model = st[p + "Model"] || "";
        var preset = st[p + "Preset"] || (type === "plot" ? PLOT_PRESET : EMOTION_PRESET);

        if (!endpoint) throw new Error("请先填写 " + labelOf(type) + " API 地址");
        if (!model) throw new Error("请先填写 " + labelOf(type) + " 模型名");

        var url = chatUrl(endpoint);
        if (!url) throw new Error("API 地址无效");

        var headers = { "Content-Type": "application/json" };
        if (key) headers.Authorization = "Bearer " + key;

        if (typeof AbortController !== "undefined") aborter = new AbortController();
        else aborter = null;

        var body = {
            model: model,
            messages: [
                { role: "system", content: preset },
                { role: "user", content: buildPrompt(type, extra || "") }
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

    function setButtons(type) {
        ["emotion", "plot"].forEach(function (t) {
            var g = q("#adr043-" + t + "-generate");
            var r = q("#adr043-" + t + "-reroll");
            var s = q("#adr043-" + t + "-stop");
            var c = q("#adr043-" + t + "-copy");
            var inj = q("#adr043-" + t + "-inject");
            var pv = q("#adr043-" + t + "-preview");
            var has = pv && pv.value;

            if (g) g.disabled = processing;
            if (r) r.disabled = processing;
            if (s) s.disabled = !processing;
            if (c) c.disabled = !has;
            if (inj) inj.disabled = !has;
        });
    }

    async function run(type, extra) {
        if (processing) return;

        syncShared();
        syncType(type);

        processing = true;
        setButtons(type);
        status(type, "正在分析…", "#8ed99d");

        try {
            var out = await callAPI(type, extra || "");
            setPreview(type, out);
            status(type, "分析完成 ✓", "#8ed99d");

            var st = settings();
            var autoKey = type === "plot" ? "autoInjectPlot" : "autoInjectEmotion";
            if (st[autoKey]) {
                var ok = injectDirector(type, out);
                if (ok) status(type, "分析完成并已注入当前聊天 ✓", "#8ed99d");
                else status(type, "分析完成，但自动注入失败，请手动复制", "#d6b177");
            }
        } catch (e) {
            var msg = e && e.name === "AbortError" ? "请求已打断" : (e.message || String(e));
            status(type, "失败：" + msg, "#d4726a");
        }

        processing = false;
        aborter = null;
        setButtons(type);
    }

    function abortRun(type) {
        try {
            if (aborter) aborter.abort();
            status(type, "已打断请求", "#d4726a");
        } catch (e) {
            status(type, "打断失败：" + e.message, "#d4726a");
        }
        processing = false;
        aborter = null;
        setButtons(type);
    }

    function copyText(type) {
        var pv = q("#adr043-" + type + "-preview");
        var text = pv ? pv.value : "";
        if (!text) {
            status(type, "没有内容可复制", "#d4726a");
            return;
        }

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text);
            else {
                pv.focus();
                pv.select();
                document.execCommand("copy");
            }
            status(type, "已复制 ✓", "#8ed99d");
        } catch (e) {
            status(type, "复制失败", "#d4726a");
        }
    }

    function injectionText(type, text) {
        var title = type === "plot" ? "剧情导演" : "情感导演";
        var hidden = settings().injectMode === "hidden";

        if (hidden) {
            return "\n\n<!--ARREBOL_DIRECTOR_START-->\n【" + title + "】\n" + text.trim() + "\n<!--ARREBOL_DIRECTOR_END-->";
        }

        return "\n\n【红霞导演室｜" + title + "】\n" + text.trim();
    }

    function findLastMessageIndex(chat) {
        if (!chat || !chat.length) return -1;

        for (var i = chat.length - 1; i >= 0; i--) {
            var m = chat[i];
            if (!m || m.is_system) continue;
            if (m.mes && String(m.mes).trim()) return i;
        }

        return chat.length - 1;
    }

    function saveChatSafe() {
        try {
            var c = ctx();
            if (typeof c.saveChat === "function") {
                c.saveChat();
                return;
            }
        } catch (e) {}

        try {
            var rw = rootWin();
            if (typeof rw.saveChatConditional === "function") rw.saveChatConditional();
            else if (typeof rw.saveChat === "function") rw.saveChat();
        } catch (e2) {}
    }

    function refreshMessageDom(index) {
        try {
            var rw = rootWin();

            if (typeof rw.reloadCurrentChat === "function") {
                // 太重，先不用。优先改 DOM。
            }

            var d = rootDoc();
            var msg = null;
            var sels = [
                '#chat .mes[mesid="' + index + '"] .mes_text',
                '#chat .mes[mesid="' + index + '"] .mes_block .mes_text',
                '#chat .mes[mesid="' + index + '"]',
                '#chat .mes[data-mesid="' + index + '"] .mes_text',
                '#chat .mes[data-mesid="' + index + '"]'
            ];

            for (var i = 0; i < sels.length; i++) {
                msg = d.querySelector(sels[i]);
                if (msg) break;
            }

            if (msg) {
                var chat = ctx().chat;
                var content = chat && chat[index] ? chat[index].mes : "";
                msg.innerHTML = content;
            }
        } catch (e) {}
    }

    function injectDirector(type, text) {
        if (!text || !text.trim()) return false;

        try {
            var c = ctx();
            var chat = c.chat;
            if (!chat || !chat.length) return false;

            var idx = findLastMessageIndex(chat);
            if (idx < 0 || !chat[idx]) return false;

            var add = injectionText(type, text);

            // 避免同类型重复注入太多：先移除最后消息里旧的同类型红霞块。
            var mes = String(chat[idx].mes || "");
            var visibleName = type === "plot" ? "剧情导演" : "情感导演";
            var reVisible = new RegExp("\\n\\n【红霞导演室｜" + visibleName + "】[\\s\\S]*$", "m");
            mes = mes.replace(reVisible, "");

            // hidden 模式旧块不区分类型，保守不全删，避免误伤另一个导演。
            chat[idx].mes = mes + add;

            saveChatSafe();
            refreshMessageDom(idx);
            return true;
        } catch (e) {
            console.error("[ADR043] inject failed", e);
            return false;
        }
    }

    function localTest(type) {
        syncAll();
        var r = activeRange();
        var title = type === "plot" ? "剧情本地测试" : "情感本地测试";
        var text = "【" + title + "】\n按钮、读取聊天、写入结果框链路可用。\n\n【读取最近 " + r + " 轮】\n" + (recentChat(r).slice(0, 1200) || "（未读取到聊天内容）");
        setPreview(type, text);
        status(type, "本地测试成功 ✓", "#8ed99d");
        setButtons(type);
    }

    function pushModel(list, m) {
        if (!m) return;
        if (typeof m === "string") { list.push(m); return; }
        if (m.id) list.push(m.id);
        else if (m.name) list.push(m.name);
        else if (m.model) list.push(m.model);
        else if (m.slug) list.push(m.slug);
    }

    function extractModels(data) {
        var list = [];

        if (!data) return list;

        if (Array.isArray(data)) data.forEach(function (m) { pushModel(list, m); });
        else if (Array.isArray(data.data)) data.data.forEach(function (m) { pushModel(list, m); });
        else if (Array.isArray(data.models)) data.models.forEach(function (m) { pushModel(list, m); });
        else if (data.id) pushModel(list, data);

        var seen = {};
        var out = [];
        list.forEach(function (x) {
            x = String(x || "").trim();
            if (!x || seen[x]) return;
            seen[x] = true;
            out.push(x);
        });
        out.sort();
        return out;
    }

    function fillModelSelect(type, models) {
        var st = settings();
        var modelKey = field(type, "model");
        var current = st[modelKey] || "";

        var sel = q("#adr043-" + type + "-model-select");
        if (!sel) return;

        var html = "";
        if (current) html += '<option value="' + esc(current) + '">' + esc(current) + '（当前）</option>';
        else html += '<option value="">加载后选择模型</option>';

        models.forEach(function (m) {
            if (m === current) return;
            html += '<option value="' + esc(m) + '">' + esc(m) + '</option>';
        });

        sel.innerHTML = html;
        if (current) sel.value = current;
    }

    async function loadModels(type) {
        syncType(type);

        var st = settings();
        var p = prefixOf(type);
        var endpoint = st[p + "ApiEndpoint"] || "";
        var key = st[p + "ApiKey"] || "";

        if (!endpoint) {
            status(type, "请先填写 API 地址", "#d4726a");
            return;
        }

        var url = modelsUrl(endpoint);
        if (!url) {
            status(type, "API 地址无效", "#d4726a");
            return;
        }

        var btn = q("#adr043-" + type + "-load-models");
        if (btn) {
            btn.disabled = true;
            btn.textContent = "加载中…";
        }

        status(type, "正在拉取模型列表…", "#8ed99d");

        try {
            var headers = {};
            if (key) headers.Authorization = "Bearer " + key;

            var res = await fetch(url, { method: "GET", headers: headers });
            var raw = await res.text();

            if (!res.ok) throw new Error("模型接口 " + res.status + "：" + raw.slice(0, 220));

            var data;
            try { data = JSON.parse(raw); }
            catch (e) { throw new Error("模型接口返回非 JSON：" + raw.slice(0, 180)); }

            var models = extractModels(data);
            if (!models.length) throw new Error("没有解析到模型名");

            fillModelSelect(type, models);
            status(type, "已加载 " + models.length + " 个模型 ✓", "#8ed99d");
        } catch (e2) {
            status(type, "加载模型失败：" + (e2.message || String(e2)), "#d4726a");
        }

        if (btn) {
            btn.disabled = false;
            btn.textContent = "加载模型";
        }
    }

    function opt(cur, val, label) {
        return '<option value="' + val + '"' + (String(cur) === String(val) ? " selected" : "") + '>' + label + '</option>';
    }

    function pageHTML(type) {
        var st = settings();
        var p = prefixOf(type);
        var title = type === "plot" ? "剧情导演" : "情感导演";
        var autoKey = type === "plot" ? "autoInjectPlot" : "autoInjectEmotion";

        return '<div class="adr043-page" id="adr043-page-' + type + '"' + (st.activeTab === type ? '' : ' style="display:none"') + '>'
            + '<details open><summary>' + title + '配置</summary>'
            + '<label>API 地址</label><input type="text" id="adr043-' + type + '-endpoint" value="' + esc(st[p + "ApiEndpoint"] || "") + '" placeholder="https://openrouter.ai/api/v1">'
            + '<label>API 密钥</label><input type="password" id="adr043-' + type + '-key" value="' + esc(st[p + "ApiKey"] || "") + '" placeholder="sk-...">'
            + '<label>模型</label><input type="text" id="adr043-' + type + '-model" value="' + esc(st[p + "Model"] || "") + '" placeholder="可以手填，或加载模型">'
            + '<select id="adr043-' + type + '-model-select"><option value="' + esc(st[p + "Model"] || "") + '">' + (st[p + "Model"] ? esc(st[p + "Model"]) + "（当前）" : "加载后选择模型") + '</option></select>'
            + '<div class="adr043-actions"><button id="adr043-' + type + '-load-models" type="button">加载模型</button><button id="adr043-' + type + '-save" type="button">保存设置</button></div>'
            + '<label class="adr043-check"><input type="checkbox" id="adr043-auto-inject-' + type + '"' + (st[autoKey] ? " checked" : "") + '> 生成后自动注入当前聊天</label>'
            + '</details>'

            + '<details><summary>' + title + '预设</summary>'
            + '<textarea id="adr043-' + type + '-preset" rows="8">' + esc(st[p + "Preset"] || "") + '</textarea>'
            + '</details>'

            + '<details open><summary>' + title + '结果</summary>'
            + '<div id="adr043-' + type + '-status">请先本地测试，或直接生成方向。</div>'
            + '<textarea id="adr043-' + type + '-preview" rows="8" placeholder="生成结果显示在这里">' + esc(st[p + "Preview"] || "") + '</textarea>'
            + '<label>补充指令</label><input type="text" id="adr043-' + type + '-extra" placeholder="只影响本次重新分析">'
            + '<div class="adr043-actions"><button id="adr043-' + type + '-local" type="button">本地测试</button><button id="adr043-' + type + '-generate" type="button">生成方向</button></div>'
            + '<div class="adr043-actions"><button id="adr043-' + type + '-reroll" type="button">重新分析</button><button id="adr043-' + type + '-stop" type="button" disabled>打断</button><button id="adr043-' + type + '-copy" type="button">复制</button></div>'
            + '<div class="adr043-actions"><button id="adr043-' + type + '-inject" type="button">手动注入当前聊天</button></div>'
            + '</details>'
            + '</div>';
    }

    function drawerHTML() {
        var st = settings();

        return '<div id="adr043-drawer"><div class="inline-drawer">'
            + '<div class="inline-drawer-toggle inline-drawer-header"><b>🎬 红霞导演室 v0.4.3</b><div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div>'
            + '<div class="inline-drawer-content">'
            + '<div class="adr043-box">'
            + '<div class="adr043-note">双导演版：情感和剧情各自独立 API / 模型 / 预设。当前仍为抽屉内嵌稳定路线。</div>'

            + '<details open><summary>共享设置</summary>'
            + '<label>复盘范围</label><select id="adr043-range">'
            + opt(st.range, "10", "最近 10 轮")
            + opt(st.range, "20", "最近 20 轮")
            + opt(st.range, "30", "最近 30 轮")
            + opt(st.range, "50", "最近 50 轮")
            + opt(st.range, "custom", "自定义")
            + '</select>'
            + '<input type="number" id="adr043-custom" placeholder="自定义轮数" value="' + esc(st.customRange || "") + '" style="display:' + (String(st.range) === "custom" ? "block" : "none") + '">'
            + '<label>角色卡要点 / 世界书 / 当前担心</label>'
            + '<textarea id="adr043-memory" rows="5" placeholder="这里会同时发给情感导演和剧情导演">' + esc(st.supplementMemory || "") + '</textarea>'
            + '<label>注入方式</label><select id="adr043-inject-mode">'
            + opt(st.injectMode, "visible", "可见文本注入（推荐测试）")
            + opt(st.injectMode, "hidden", "HTML 注释隐藏注入")
            + '</select>'
            + '</details>'

            + '<div class="adr043-tabs">'
            + '<button id="adr043-tab-emotion" type="button" class="' + (st.activeTab === "plot" ? "" : "active") + '">情感导演</button>'
            + '<button id="adr043-tab-plot" type="button" class="' + (st.activeTab === "plot" ? "active" : "") + '">剧情导演</button>'
            + '</div>'

            + pageHTML("emotion")
            + pageHTML("plot")
            + '</div>'
            + '</div></div></div>';
    }

    function mountDrawer() {
        if (q("#adr043-drawer")) return;

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

    function switchTab(type) {
        save("activeTab", type);
        var ep = q("#adr043-page-emotion");
        var pp = q("#adr043-page-plot");
        var eb = q("#adr043-tab-emotion");
        var pb = q("#adr043-tab-plot");

        if (ep) ep.style.display = type === "emotion" ? "" : "none";
        if (pp) pp.style.display = type === "plot" ? "" : "none";
        if (eb) eb.classList.toggle("active", type === "emotion");
        if (pb) pb.classList.toggle("active", type === "plot");
    }

    function bindDirect() {
        var ids = {};

        ids["adr043-tab-emotion"] = function () { switchTab("emotion"); };
        ids["adr043-tab-plot"] = function () { switchTab("plot"); };

        ["emotion", "plot"].forEach(function (type) {
            ids["adr043-" + type + "-local"] = function () { localTest(type); };
            ids["adr043-" + type + "-generate"] = function () { run(type, ""); };
            ids["adr043-" + type + "-reroll"] = function () {
                var extra = q("#adr043-" + type + "-extra");
                run(type, extra ? extra.value : "");
            };
            ids["adr043-" + type + "-stop"] = function () { abortRun(type); };
            ids["adr043-" + type + "-copy"] = function () { copyText(type); };
            ids["adr043-" + type + "-load-models"] = function () { loadModels(type); };
            ids["adr043-" + type + "-save"] = function () {
                syncShared();
                syncType(type);
                status(type, "设置已保存 ✓", "#8ed99d");
            };
            ids["adr043-" + type + "-inject"] = function () {
                syncType(type);
                var pv = q("#adr043-" + type + "-preview");
                var text = pv ? pv.value : "";
                if (!text) {
                    status(type, "没有内容可注入", "#d4726a");
                    return;
                }
                var ok = injectDirector(type, text);
                status(type, ok ? "已注入当前聊天 ✓" : "注入失败", ok ? "#8ed99d" : "#d4726a");
            };
        });

        Object.keys(ids).forEach(function (id) {
            var el = q("#" + id);
            if (!el || el.__adr043Bound) return;
            el.__adr043Bound = true;
            el.addEventListener("click", function (ev) {
                try { ev.preventDefault(); ev.stopPropagation(); } catch (e) {}
                ids[id]();
            });
        });

        var range = q("#adr043-range");
        if (range && !range.__adr043Bound) {
            range.__adr043Bound = true;
            range.addEventListener("change", function () {
                save("range", range.value);
                var custom = q("#adr043-custom");
                if (custom) custom.style.display = range.value === "custom" ? "block" : "none";
                saveNow();
            });
        }

        var mode = q("#adr043-inject-mode");
        if (mode && !mode.__adr043Bound) {
            mode.__adr043Bound = true;
            mode.addEventListener("change", function () {
                save("injectMode", mode.value || "visible");
                saveNow();
            });
        }

        ["emotion", "plot"].forEach(function (type) {
            var modelSelect = q("#adr043-" + type + "-model-select");
            if (modelSelect && !modelSelect.__adr043Bound) {
                modelSelect.__adr043Bound = true;
                modelSelect.addEventListener("change", function () {
                    var modelInput = q("#adr043-" + type + "-model");
                    if (modelInput) modelInput.value = modelSelect.value;
                    save(field(type, "model"), modelSelect.value || "");
                    saveNow();
                    status(type, "已选择模型：" + (modelSelect.value || "空"), "#8ed99d");
                });
            }

            var auto = q("#adr043-auto-inject-" + type);
            if (auto && !auto.__adr043Bound) {
                auto.__adr043Bound = true;
                auto.addEventListener("change", function () {
                    save(type === "plot" ? "autoInjectPlot" : "autoInjectEmotion", !!auto.checked);
                    saveNow();
                });
            }
        });

        var map = {
            "adr043-custom": "customRange",
            "adr043-memory": "supplementMemory"
        };

        ["emotion", "plot"].forEach(function (type) {
            map["adr043-" + type + "-endpoint"] = field(type, "apiEndpoint");
            map["adr043-" + type + "-key"] = field(type, "apiKey");
            map["adr043-" + type + "-model"] = field(type, "model");
            map["adr043-" + type + "-preset"] = field(type, "preset");
            map["adr043-" + type + "-preview"] = field(type, "preview");
        });

        Object.keys(map).forEach(function (id) {
            var el = q("#" + id);
            if (!el || el.__adr043InputBound) return;
            el.__adr043InputBound = true;
            el.addEventListener("input", function () {
                if (map[id] === "customRange") save(map[id], Number(el.value || 0));
                else save(map[id], el.value || "");
            });
        });
    }

    function init() {
        if (initialized) return;
        initialized = true;

        try {
            settings();
            mountDrawer();
            bindDirect();
            setTimeout(bindDirect, 500);
            setTimeout(bindDirect, 1500);
            setTimeout(bindDirect, 3000);
            console.log("[ADR043] dual drawer loaded");
        } catch (e) {
            console.error("[ADR043] init failed", e);
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
