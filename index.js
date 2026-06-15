
/* 红霞导演室 v0.3.5 隔离接线版
 * 关键：不再使用 drt-*，避免和旧成功壳互相污染。
 * observer 只补入口，不碰面板。面板常驻，只切 display。
 */

const DRS_EXT_NAME = "arrebol-director-room-isolated-v035";
const DRS_DEFAULT_DIRECTOR_PRESET = "你是 RP 情感导演。请阅读最近的聊天内容和用户补充信息，只分析情感曲线与人设稳定，不写正文。\n\n你需要判断：\n1. 当前关系阶段是什么。\n2. 情绪温度是否过热、过冷、空转或错拍。\n3. 角色是否出现 OOC 风险。\n4. 是否存在秒爱、秒软、秒承诺、隐藏深情化。\n5. 是否把照顾误写成占有，把心疼误写成告白。\n6. 是否过度代演用户的心理与选择。\n7. 当前角色根据人设应该如何承接情绪。\n8. 下一阶段情感应该升温、降温、维持、错拍，还是延迟。\n\n输出必须短，不超过 300 字。不要写分析过程。不要写正文。只给下一阶段情感方向，要给可执行动作与明确禁区。\n\n固定输出格式：\n【情感方向】\n……\n\n【人设边界】\n……\n\n【避免】\n……";
const DRS_DEFAULTS = {
    showQuickEntry: true,
    quickEntryLeft: "",
    quickEntryTop: "",
    apiEndpoint: "",
    apiKey: "",
    model: "",
    range: "30",
    customRange: 0,
    supplementMemory: "",
    directorPreset: DRS_DEFAULT_DIRECTOR_PRESET,
    previewText: ""
};

let drsInitialized = false;
let drsProcessing = false;
let drsAbortController = null;
let drsCurrentResult = "";

function drsCtx() { return SillyTavern.getContext(); }
function drsRootWindow() { try { if (window.top && window.top.document) return window.top; } catch(e) {} return window; }
function drsRootDocument() { try { var w = drsRootWindow(); if (w && w.document) return w.document; } catch(e) {} return document; }
function drsQ(sel) {
    var d = drsRootDocument();
    try { var el = d.querySelector(sel); if (el) return el; } catch(e) {}
    try { return document.querySelector(sel); } catch(e) {}
    return null;
}
function drsEsc(s) { if (!s) return ""; var d = drsRootDocument().createElement("div"); d.textContent = s; return d.innerHTML; }
function drsLoadSettings() {
    try {
        var c = drsCtx();
        if (!c.extensionSettings[DRS_EXT_NAME]) c.extensionSettings[DRS_EXT_NAME] = {};
        var st = c.extensionSettings[DRS_EXT_NAME];
        for (var k in DRS_DEFAULTS) if (st[k] === undefined) st[k] = DRS_DEFAULTS[k];
        if (!st.directorPreset) st.directorPreset = DRS_DEFAULT_DIRECTOR_PRESET;
        st.showQuickEntry = true;
        if (typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced();
    } catch(e) { console.error("[DRS] loadSettings failed:", e); }
}
function drsCfg() { try { return drsCtx().extensionSettings[DRS_EXT_NAME]; } catch(e) { var d={}; for (var k in DRS_DEFAULTS) d[k]=DRS_DEFAULTS[k]; return d; } }
function drsSave(key, val) { try { var c=drsCtx(); if (!c.extensionSettings[DRS_EXT_NAME]) c.extensionSettings[DRS_EXT_NAME]={}; c.extensionSettings[DRS_EXT_NAME][key]=val; if (typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced(); } catch(e) {} }
function drsSaveNow() { try { var c=drsCtx(); if (c && typeof c.saveSettings === "function") c.saveSettings(); else if (c && typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced(); } catch(e) {} }
function drsStatus(text, color) { var st=drsQ("#drs-status"); if (st) { st.textContent=text; st.style.color=color||""; } }
function drsSetPreview(text) { var pv=drsQ("#drs-preview"); if (pv) pv.value=text||""; drsCurrentResult=text||""; drsSave("previewText", text||""); }
function drsSetButtons() {
    var gen=drsQ("#drs-generate"), rer=drsQ("#drs-reroll"), stop=drsQ("#drs-stop"), copy=drsQ("#drs-copy");
    if (gen) gen.disabled = !!drsProcessing;
    if (rer) rer.disabled = !!drsProcessing;
    if (stop) stop.disabled = !drsProcessing;
    if (copy) copy.disabled = !((drsQ("#drs-preview") && drsQ("#drs-preview").value) || drsCurrentResult);
}
function drsNormalizeApiBase(base) {
    var url=(base||"").trim(); if (!url) return "";
    while (url.length > 1 && url.charAt(url.length-1) === "/") url=url.slice(0,-1);
    if (url.indexOf("/chat/completions") >= 0) url=url.replace(/\/chat\/completions\/?$/, "");
    if (url.indexOf("/models") >= 0) url=url.replace(/\/models\/?$/, "");
    if (!url.endsWith("/v1")) url += "/v1";
    return url;
}
function drsChatUrl(base) { var r=drsNormalizeApiBase(base); return r ? r + "/chat/completions" : ""; }
function drsRange() { var c=drsCfg(); if (String(c.range)==="custom") { var n=Number(c.customRange||0); return n>0?n:30; } var r=Number(c.range||30); return r>0?r:30; }
function drsRecentChat(rounds) {
    var chat; try { chat=drsCtx().chat; } catch(e) { return ""; }
    if (!chat || !chat.length) return "";
    var max=rounds*2, out=[], count=0;
    for (var i=chat.length-1; i>=0 && count<max; i--) {
        var m=chat[i]; if (!m || m.is_system) continue;
        var role=m.is_user ? "用户" : (m.name || "角色");
        var text=String(m.mes || "").trim();
        text=text.replace(/image###[\s\S]*?###/g, "").trim();
        text=text.replace(/【导演注入】[\s\S]*$/g, "").trim();
        if (!text) continue;
        out.unshift("["+role+"] "+text); count++;
    }
    return out.join("\n\n");
}
function drsUserPrompt(extra) {
    var c=drsCfg(), rounds=drsRange(), s="";
    if (c.supplementMemory && c.supplementMemory.trim()) s += "【角色卡要点 / 世界书 / 当前担心】\n" + c.supplementMemory.trim() + "\n\n";
    var recent=drsRecentChat(rounds);
    s += "【最近 " + rounds + " 轮 RP】\n" + (recent || "（未读取到聊天内容）") + "\n\n";
    if (extra && extra.trim()) s += "【本次额外指令】\n" + extra.trim() + "\n\n";
    s += "请根据以上内容输出导演方向。只输出方向结果，不要复述分析过程，不要写正文。";
    return s;
}
function drsParseResponse(data) {
    if (!data) return "";
    if (data.choices && data.choices[0]) {
        var ch=data.choices[0];
        if (ch.message) {
            if (typeof ch.message.content === "string" && ch.message.content.trim()) return ch.message.content.trim();
            if (ch.message.content && Array.isArray(ch.message.content)) {
                var parts=[]; ch.message.content.forEach(function(p){ if (!p) return; if (typeof p==="string") parts.push(p); else if (p.text) parts.push(p.text); });
                if (parts.join("").trim()) return parts.join("\n").trim();
            }
        }
        if (ch.text) return String(ch.text).trim();
    }
    if (data.response) return String(data.response).trim();
    if (data.text) return String(data.text).trim();
    return "";
}
function drsSyncEditors() {
    var pairs=[["endpoint","apiEndpoint"],["key","apiKey"],["model","model"],["range","range"],["custom","customRange"],["memory","supplementMemory"],["preset","directorPreset"],["preview","previewText"]];
    pairs.forEach(function(p){ var el=drsQ("#drs-"+p[0]); if (!el) return; if (p[1]==="customRange") drsSave(p[1], Number(el.value||0)); else drsSave(p[1], el.value||""); });
    drsSaveNow();
}
async function drsCallAPI(extra) {
    var c=drsCfg();
    if (!c.apiEndpoint) throw new Error("请先填写 API 地址");
    if (!c.model) throw new Error("请先填写模型名");
    var url=drsChatUrl(c.apiEndpoint); if (!url) throw new Error("API 地址无效");
    var headers={"Content-Type":"application/json"}; if (c.apiKey) headers.Authorization="Bearer "+c.apiKey;
    if (typeof AbortController !== "undefined") drsAbortController = new AbortController(); else drsAbortController = null;
    var body={ model:c.model, messages:[{role:"system", content:c.directorPreset || DRS_DEFAULT_DIRECTOR_PRESET},{role:"user", content:drsUserPrompt(extra||"")}], temperature:0.6, stream:false };
    var opts={method:"POST", headers:headers, body:JSON.stringify(body)}; if (drsAbortController) opts.signal=drsAbortController.signal;
    var res=await fetch(url, opts); var raw=await res.text();
    if (!res.ok) throw new Error("API " + res.status + "：" + raw.slice(0,220));
    var data; try { data=JSON.parse(raw); } catch(e) { throw new Error("API 返回非 JSON：" + raw.slice(0,180)); }
    var out=drsParseResponse(data); if (out) return out;
    throw new Error("无法解析响应：" + raw.slice(0,220));
}
async function drsRun(extra) {
    if (drsProcessing) return;
    drsSyncEditors(); drsProcessing=true; drsSetButtons();
    var entry=drsQ("#drs-entry"); if (entry) entry.classList.add("processing");
    drsStatus("正在分析…", "#8ed99d");
    try { var out=await drsCallAPI(extra||""); drsSetPreview(out); drsStatus("分析完成 ✓", "#8ed99d"); }
    catch(e) { var msg=(e && e.name==="AbortError") ? "请求已被打断" : (e.message || String(e)); drsStatus("失败："+msg, "#d4726a"); }
    drsAbortController=null; drsProcessing=false; if (entry) entry.classList.remove("processing"); drsSetButtons();
}
function drsCopy() { var pv=drsQ("#drs-preview"), text=(pv&&pv.value)||drsCurrentResult; if (!text) { drsStatus("没有内容可复制", "#d4726a"); return; } try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text); else if (pv) { pv.select(); document.execCommand("copy"); } drsStatus("已复制 ✓", "#8ed99d"); } catch(e) { drsStatus("复制失败", "#d4726a"); } }
function drsAbort() { try { if (drsAbortController) drsAbortController.abort(); drsStatus("已打断请求", "#d4726a"); } catch(e) {} drsProcessing=false; drsSetButtons(); }
function drsPanelHTML() {
    var c=drsCfg();
    function opt(v,t){ return '<option value="'+v+'"'+(String(c.range)===String(v)?' selected':'')+'>'+t+'</option>'; }
    return ''+
    '<div class="drs-head"><b>🎬 红霞导演室 v0.3.5</b><button id="drs-close" type="button">×</button></div>'+
    '<div class="drs-body">'+
    '<details open><summary>配置</summary><label>复盘范围</label><select id="drs-range">'+opt('10','最近 10 轮')+opt('20','最近 20 轮')+opt('30','最近 30 轮')+opt('50','最近 50 轮')+opt('custom','自定义')+'</select><input type="number" id="drs-custom" placeholder="自定义轮数" value="'+drsEsc(c.customRange||'')+'" style="display:'+(String(c.range)==='custom'?'block':'none')+'"><label>API 地址</label><input type="text" id="drs-endpoint" value="'+drsEsc(c.apiEndpoint||'')+'" placeholder="https://openrouter.ai/api/v1"><label>API 密钥</label><input type="password" id="drs-key" value="'+drsEsc(c.apiKey||'')+'" placeholder="sk-..."><label>模型</label><input type="text" id="drs-model" value="'+drsEsc(c.model||'')+'" placeholder="例如：gpt-4o-mini / openrouter model"></details>'+
    '<details><summary>手动补充</summary><div class="drs-hint">填角色卡要点 / 世界书 / 当前担心。</div><textarea id="drs-memory" rows="5">'+drsEsc(c.supplementMemory||'')+'</textarea></details>'+
    '<details><summary>情感导演预设</summary><textarea id="drs-preset" rows="8">'+drsEsc(c.directorPreset||'')+'</textarea></details>'+
    '<details open><summary>导演方向</summary><div id="drs-status">隔离接线版已加载。点“生成方向”测试。</div><textarea id="drs-preview" rows="8" placeholder="生成的导演方向将显示在这里…">'+drsEsc(c.previewText||'')+'</textarea><label>补充指令</label><input type="text" id="drs-extra" placeholder="例：这段其实是冷战，别往撒娇方向写"><div class="drs-actions"><button id="drs-generate" type="button">生成方向</button><button id="drs-reroll" type="button">重新分析</button></div><div class="drs-actions"><button id="drs-stop" type="button" disabled>打断请求</button><button id="drs-copy" type="button">复制</button></div></details>'+
    '</div>';
}
function drsCreatePanel() {
    var old=drsQ("#drs-panel"); if (old) return old;
    var d=drsRootDocument(), p=d.createElement("div"); p.id="drs-panel"; p.setAttribute("data-open","0"); p.innerHTML=drsPanelHTML();
    p.style.cssText=["position:fixed","left:8px","right:8px","bottom:76px","max-height:74vh","display:none","flex-direction:column","z-index:2147483646","background:rgba(28,23,25,.97)","color:#eee","border:1px solid rgba(214,122,106,.4)","border-radius:14px","box-shadow:0 10px 40px rgba(0,0,0,.42)","overflow:hidden","font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif","font-size:13px","pointer-events:auto"].join(";");
    try { (d.body || d.documentElement).appendChild(p); } catch(e) { document.body.appendChild(p); }
    drsBindPanel(); return p;
}
function drsBindPanel() {
    var close=drsQ("#drs-close"); if (close) close.onclick=drsHidePanel;
    var range=drsQ("#drs-range"); if (range) range.onchange=function(){ drsSave("range", range.value); var cr=drsQ("#drs-custom"); if (cr) cr.style.display=range.value==="custom"?"block":"none"; drsSaveNow(); };
    [["custom","customRange"],["endpoint","apiEndpoint"],["key","apiKey"],["model","model"],["memory","supplementMemory"],["preset","directorPreset"],["preview","previewText"]].forEach(function(pair){ var el=drsQ("#drs-"+pair[0]); if (!el) return; el.oninput=function(){ if (pair[1]==="customRange") drsSave(pair[1], Number(el.value||0)); else drsSave(pair[1], el.value||""); }; el.onchange=function(){ if (pair[1]==="customRange") drsSave(pair[1], Number(el.value||0)); else drsSave(pair[1], el.value||""); drsSaveNow(); }; });
    var gen=drsQ("#drs-generate"); if (gen) gen.onclick=function(){ drsRun(""); };
    var rer=drsQ("#drs-reroll"); if (rer) rer.onclick=function(){ var ex=drsQ("#drs-extra"); drsRun((ex&&ex.value)||""); };
    var stop=drsQ("#drs-stop"); if (stop) stop.onclick=drsAbort;
    var copy=drsQ("#drs-copy"); if (copy) copy.onclick=drsCopy;
    drsSetButtons();
}
function drsShowPanel() { var p=drsCreatePanel(); if (!p) return; p.setAttribute("data-open","1"); p.style.setProperty("display","flex","important"); p.style.setProperty("visibility","visible","important"); p.style.setProperty("opacity","1","important"); p.style.setProperty("pointer-events","auto","important"); }
function drsHidePanel() { var p=drsQ("#drs-panel"); if (!p) return; p.setAttribute("data-open","0"); p.style.setProperty("display","none","important"); }
function drsTogglePanel() { var p=drsQ("#drs-panel"); if (p && p.getAttribute("data-open")==="1") drsHidePanel(); else drsShowPanel(); }
function drsCreateEntry() {
    var d=drsRootDocument(), old=drsQ("#drs-entry"); if (old) return old;
    var btn=d.createElement("button"); btn.id="drs-entry"; btn.type="button"; btn.textContent="🎬 DR"; btn.title="红霞导演室 v0.3.5";
    function imp(k,v){ try{ btn.style.setProperty(k,v,"important"); }catch(e){ try{btn.style[k]=v;}catch(_){} } }
    var l=Number(drsCfg().quickEntryLeft), t=Number(drsCfg().quickEntryTop), saved=Number.isFinite(l)&&Number.isFinite(t);
    imp("position","fixed"); imp("left", saved?l+"px":"12px"); imp("top", saved?t+"px":""); imp("right", saved?"auto":"12px"); imp("bottom", saved?"auto":"178px"); imp("display","inline-flex"); imp("align-items","center"); imp("justify-content","center"); imp("height","34px"); imp("min-height","34px"); imp("padding","0 11px"); imp("border-radius","999px"); imp("border","1px solid rgba(255,255,255,.32)"); imp("background","linear-gradient(135deg, rgba(214,122,106,.96), rgba(180,74,92,.96))"); imp("color","#fff"); imp("font-size","13px"); imp("font-weight","700"); imp("box-shadow","0 8px 22px rgba(0,0,0,.35)"); imp("z-index","2147483647"); imp("cursor","grab"); imp("pointer-events","auto"); imp("touch-action","none"); imp("user-select","none"); imp("-webkit-user-select","none");
    var dragging=false, moved=false, sx=0, sy=0, sl=0, st=0, justDrag=false;
    function pt(ev){ if(ev&&ev.touches&&ev.touches.length)return{x:ev.touches[0].clientX,y:ev.touches[0].clientY}; if(ev&&ev.changedTouches&&ev.changedTouches.length)return{x:ev.changedTouches[0].clientX,y:ev.changedTouches[0].clientY}; return{x:ev.clientX||0,y:ev.clientY||0}; }
    function begin(ev){ var p=pt(ev), r=btn.getBoundingClientRect(); dragging=true; moved=false; sx=p.x; sy=p.y; sl=r.left; st=r.top; try{ev.preventDefault();ev.stopPropagation();}catch(e){} }
    function move(ev){ if(!dragging)return; var p=pt(ev), dx=p.x-sx, dy=p.y-sy; if(Math.abs(dx)+Math.abs(dy)>10)moved=true; imp("left",Math.max(4,sl+dx)+"px"); imp("top",Math.max(4,st+dy)+"px"); imp("right","auto"); imp("bottom","auto"); try{ev.preventDefault();ev.stopPropagation();}catch(e){} }
    function end(ev){ if(!dragging)return; dragging=false; var r=btn.getBoundingClientRect(); drsSave("quickEntryLeft",String(Math.round(r.left))); drsSave("quickEntryTop",String(Math.round(r.top))); if(!moved){ justDrag=true; drsTogglePanel(); setTimeout(function(){justDrag=false;},350); } try{ev.preventDefault();ev.stopPropagation();}catch(e){} }
    btn.addEventListener("mousedown", begin); btn.addEventListener("touchstart", begin,{passive:false}); d.addEventListener("mousemove", move,{passive:false}); d.addEventListener("mouseup", end,{passive:false}); d.addEventListener("touchmove", move,{passive:false}); d.addEventListener("touchend", end,{passive:false}); d.addEventListener("touchcancel", end,{passive:false});
    btn.addEventListener("click", function(ev){ if(justDrag){ try{ev.preventDefault();ev.stopPropagation();}catch(e){} return; } drsTogglePanel(); try{ev.preventDefault();ev.stopPropagation();}catch(e){} });
    try{ (d.body||d.documentElement).appendChild(btn); }catch(e){ document.body.appendChild(btn); }
    return btn;
}
function drsCreateDrawer(){ if(drsQ("#drs-drawer"))return; var h='<div id="drs-drawer"><div class="inline-drawer"><div class="inline-drawer-toggle inline-drawer-header"><b>🎬 红霞导演室 v0.3.5</b><div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div><div class="inline-drawer-content"><div style="font-size:12px;color:#888;margin-bottom:8px">隔离接线版：避开旧壳污染，测试真实面板与副 API。</div><div style="display:flex;gap:6px"><input type="button" id="drs-open" class="menu_button" value="打开导演面板"><input type="button" id="drs-reset" class="menu_button" value="重置入口"></div></div></div></div>'; var jq=null; try{jq=drsRootWindow().jQuery||drsRootWindow().$||window.jQuery||window.$;}catch(e){jq=window.jQuery||window.$;} if(jq){var target=jq("#extensions_settings2"); if(target&&target.length)target.append(h);}else{var d=drsRootDocument(), el=d.querySelector("#extensions_settings2"); if(el){var wrap=d.createElement("div"); wrap.innerHTML=h; el.appendChild(wrap.firstChild);}} }
function drsBindDrawer(){ var open=drsQ("#drs-open"); if(open)open.onclick=function(){drsCreateEntry();drsShowPanel();}; var reset=drsQ("#drs-reset"); if(reset)reset.onclick=function(){drsSave("quickEntryLeft","");drsSave("quickEntryTop",""); var old=drsQ("#drs-entry"); if(old&&old.parentNode){try{old.parentNode.removeChild(old);}catch(e){}} drsCreateEntry();}; try{var d=drsRootDocument(); if(typeof MutationObserver!=="undefined"&&d.body&&!window.__drsObserver035){var pending=false; window.__drsObserver035=new MutationObserver(function(){ if(pending)return; if(!drsQ("#drs-entry")){pending=true; setTimeout(function(){pending=false; try{drsCreateEntry();}catch(e){}},250);} }); window.__drsObserver035.observe(d.body,{childList:true,subtree:true});}}catch(e){} }
function drsInit(){ if(drsInitialized)return; drsInitialized=true; drsLoadSettings(); drsCreatePanel(); drsCreateDrawer(); drsBindDrawer(); drsCreateEntry(); setTimeout(drsCreateEntry,700); setTimeout(drsCreateEntry,1600); setTimeout(drsCreateEntry,3200); console.log("[DRS] v0.3.5 isolated loaded"); }
function drsWait(){ if(typeof SillyTavern==="undefined" || !SillyTavern.getContext){setTimeout(drsWait,300);return;} try{var c=SillyTavern.getContext(); c.eventSource.on(c.event_types.APP_READY,function(){setTimeout(drsInit,100);}); setTimeout(drsInit,1800);}catch(e){setTimeout(drsInit,1200);} }
drsWait();
