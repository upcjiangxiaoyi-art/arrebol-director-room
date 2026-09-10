// v1.29.0: layout changes must keep settings, counters and both panel surfaces in sync.
// Run: npm install --no-save jsdom && node test_ui.js
const fs = require('fs');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const KEY = 'arrebol-d-final-v1040-stable-settings';
const source = fs.readFileSync('index.js', 'utf8').replace('    wait();',
    '    window.uiTest = { init, switchTab, adrDUpdateAutoCounters, adr048OpenPopupPanel, adr048ClosePopupPanel, adr048ApplyPanelTheme, adr048FabTheme, adr048ApplyFabTheme, adr048InstallFabClock };');
const delay = ms => new Promise(r => setTimeout(r, ms));
let passed = 0;
function check(condition, name) { assert.ok(condition, name); console.log('✓ ' + name); passed++; }
function build() {
    const dom = new JSDOM('<!doctype html><html><body><div id="extensions_settings2"></div></body></html>',
        { url: 'https://example.org/', pretendToBeVisual: true, runScripts: 'outside-only' });
    const w = dom.window, d = w.document, chat = [], handlers = {};
    const extensionSettings = { [KEY]: { activeTab: 'emotion', dawnTheme: true, autoTriggerEmotion: true,
        autoTriggerPlot: true, autoTriggerEmotionRange: 'custom', autoTriggerEmotionCustomRange: 17,
        autoTriggerPlotRange: '30', cdEnabled: true, cdN: 5, supplementMemory: '原始记忆', streamEnabled: false } };
    const chatMetadata = { arrebol_d: { v: 1, auto: { emotion: { base: 30, mode: 'full-chat-v1' }, plot: { base: 24, mode: 'full-chat-v1' } } },
        arrebol_d_cd: { lastDrawAt: 32, history: [] } };
    for (let i = 0; i < 34; i++) chat.push({ is_user: true, mes: '继续' }, { is_user: false, mes: '<content>灯亮了。</content>' });
    const timers = [];
    const nativeInterval = w.setInterval.bind(w);
    w.setInterval = (fn, ms) => { timers.push({ fn, ms }); return nativeInterval(fn, ms); };
    let requests = 0;
    w.fetch = async () => { requests++; throw Error('No network in UI tests'); };
    w.toastr = { success() {}, info() {}, error() {}, warning() {} };
    const context = { extensionSettings, chatMetadata, chat, chatId: 'ui-test', getCurrentChatId: () => 'ui-test',
        saveSettingsDebounced() {}, saveSettings() {}, saveMetadataDebounced() {}, saveMetadata() {},
        extensionPrompts: {}, setExtensionPrompt() {}, extensionPromptTypes: { IN_CHAT: 1 }, extensionPromptRoles: { SYSTEM: 0 },
        substituteParams: s => s, eventSource: { on(t, f) { (handlers[t] ||= []).push(f); } },
        event_types: { APP_READY: 'app_ready', MESSAGE_RECEIVED: 'message_received', CHAT_CHANGED: 'chat_changed' } };
    w.SillyTavern = { getContext: () => context };
    w.eval(source); w.uiTest.init();
    return { w, d, chat, extensionSettings, chatMetadata, timers, requests: () => requests, close: () => dom.window.close() };
}
(async () => {
    const e = build(), { w, d } = e;
    try {
        await delay(450);
        w.uiTest.adr048OpenPopupPanel(); await delay(200);
        const root = () => d.querySelector('#adr048-popup-body');
        const drawer = d.querySelector('#adr044-drawer .adr044-box');
        const click = el => el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
        const counter = (scope, type) => scope.querySelector('#adr044-auto-counter-' + type);
        for (const [name, scope] of [['浮窗', root()], ['抽屉', drawer]]) {
            check(scope.firstElementChild.classList.contains('adr-top-tabs'), name + '第一项为导演切换');
            check(scope.firstElementChild.nextElementSibling.classList.contains('adr-top-progress'), name + '进度紧跟切换');
            check(!scope.querySelector('[data-drawer-id="shared-main"]').open, name + '共享设置默认收起');
            const ids = [...scope.querySelectorAll('[id]')].map(el => el.id);
            check(new Set(ids).size === ids.length, name + '内部没有新增重复 ID');
            check(counter(scope, 'emotion').querySelector('.arb-ct-nums b').textContent === '4', name + '原有情感进度 4/17 保留');
            check(counter(scope, 'plot').querySelector('.arb-ct-nums b').textContent === '10', name + '原有统筹进度 10/30 保留');
            check(counter(scope, 'cd').querySelector('.arb-ct-nums b').textContent === '2', name + '抽卡按原 lastDrawAt 显示 2/5');
        }
        const before = JSON.stringify(e.chatMetadata);
        for (const type of ['plot', 'cd', 'emotion']) {
            root().scrollTop = 600;
            click(root().querySelector('#adr044-tab-' + type));
            for (const scope of [root(), drawer]) {
                const panes = [...scope.querySelectorAll('.adr-top-pane')].filter(el => !el.hidden);
                check(panes.length === 1 && panes[0].dataset.director === type, '切到 ' + type + ' 时两端进度对应当前页');
                check(scope.querySelector('#adr044-tab-' + type).getAttribute('aria-pressed') === 'true', type + ' 导航辅助状态同步');
            }
            check(root().scrollTop === 0, '切到 ' + type + ' 返回顶部，避免停在上一页中部');
        }
        w.uiTest.adrDUpdateAutoCounters();
        check(JSON.stringify(e.chatMetadata) === before, '切页与计数展示不改两位导演和抽卡的基准线');
        let details = counter(root(), 'emotion').querySelector('.adr-counter-details');
        details.open = true;
        const current = counter(root(), 'emotion').firstElementChild;
        w.uiTest.adrDUpdateAutoCounters();
        check(counter(root(), 'emotion').firstElementChild === current, '无变化的刷新不重建进度 DOM');
        e.chat.push({ is_user: true, mes: '继续' }, { is_user: false, mes: '<content>天亮了。</content>' });
        w.uiTest.adrDUpdateAutoCounters();
        check(counter(root(), 'emotion').querySelector('.arb-ct-nums b').textContent === '5', '新楼数显示为 5/17');
        check(counter(root(), 'emotion').querySelector('.adr-counter-details').open, '进度更新仍保留展开的计数详情');
        check(counter(root(), 'emotion').querySelector('[role="progressbar"]').getAttribute('aria-valuenow') === '5', '进度辅助读数更新');
        check(JSON.stringify(e.chatMetadata) === before, '单纯更新显示不落盘');
        const shared = root().querySelector('[data-drawer-id="shared-main"]');
        shared.open = true;
        const memory = root().querySelector('#adr044-memory');
        memory.value = '修改后的共享记忆';
        memory.dispatchEvent(new w.Event('input', { bubbles: true }));
        memory.dispatchEvent(new w.Event('change', { bubbles: true }));
        await delay(650);
        check(e.extensionSettings[KEY].supplementMemory === '修改后的共享记忆', '折叠后的共享设置仍自动保存');
        const range = root().querySelector('#adr044-auto-trigger-range-emotion');
        const plotBase = e.chatMetadata.arrebol_d.auto.plot.base;
        range.value = '10'; range.dispatchEvent(new w.Event('change', { bubbles: true }));
        await delay(80);
        check(e.extensionSettings[KEY].autoTriggerEmotionRange === '10', '移到顶部的触发间隔仍保存');
        check(drawer.querySelector('#adr044-auto-trigger-range-emotion').value === '10', '触发间隔两端镜像同步');
        check(root().querySelector('#adr044-auto-trigger-custom-emotion').style.display === 'none', '非自定义间隔隐藏自定义输入');
        check(e.chatMetadata.arrebol_d.auto.plot.base === plotBase, '修改情感间隔不动统筹基准线');
        w.uiTest.switchTab('cd');
        const pause = root().querySelector('#adr044-cd-paused');
        pause.dispatchEvent(new w.MouseEvent('mousedown', { bubbles: true }));
        click(pause); await delay(100);
        check(counter(root(), 'cd').textContent.includes('已暂停'), '暂停投卡立即反映在顶部');
        check(e.chatMetadata.arrebol_d_cd.lastDrawAt === 32, '暂停显示不改变抽卡进度');
        w.uiTest.adr048ClosePopupPanel(); w.uiTest.adr048OpenPopupPanel(); await delay(150);
        check(root().querySelector('[data-drawer-id="shared-main"]').open, '重新打开浮窗保留共享设置展开状态');
        check(root().querySelector('#adr044-memory').value === '修改后的共享记忆', '重新打开浮窗保留编辑内容');
        check(root().querySelector('.adr-top-pane:not([hidden])').dataset.director === 'cd', '重新打开保留当前页');
        check(!root().querySelector('#adr044-stream-enabled').checked, '改版保留原流式开关');
        click(d.querySelector('#adr048-theme-toggle')); await delay(50);
        check(d.querySelector('#adr048-popup-panel').dataset.arbTheme === 'dusk', '主题切换仍可用');
        const settings = e.extensionSettings[KEY];
        const fab = d.querySelector('#adr048-fab');
        const svg = fab.firstElementChild;
        const position = [fab.style.left, fab.style.top, fab.style.right, fab.style.bottom].join('|');
        check(root().querySelector('#adr044-fab-theme-mode').value === 'clock', '新浮标默认使用当地时间');
        for (const [hour, expected] of [[0, 'dusk'], [6, 'dusk'], [7, 'dawn'], [12, 'dawn'], [18, 'dawn'], [19, 'dusk'], [23, 'dusk']]) {
            check(w.uiTest.adr048FabTheme({ getHours: () => hour }) === expected, hour + ' 点昼夜配色正确');
        }
        const mode = root().querySelector('#adr044-fab-theme-mode');
        mode.value = 'panel'; mode.dispatchEvent(new w.Event('change', { bubbles: true }));
        check(settings.fabThemeMode === 'panel', '浮标配色选择自动保存');
        check(drawer.querySelector('#adr044-fab-theme-mode').value === 'panel', '两端配色选择同步');
        check(fab.dataset.arbTheme === 'dusk', '跟随面板时立即同步夜色');
        click(d.querySelector('#adr048-theme-toggle'));
        check(fab.dataset.arbTheme === 'dawn', '点太阳按钮时浮标同步日色');
        check(w.uiTest.adr048FabTheme({ getHours: () => 23 }) === 'dawn', '跟随面板模式不被时钟覆盖');
        mode.value = 'clock'; mode.dispatchEvent(new w.Event('change', { bubbles: true }));
        const NativeDate = w.Date;
        let hour = 6;
        w.Date = class extends NativeDate { getHours() { return hour; } };
        d.dispatchEvent(new w.Event('visibilitychange'));
        check(fab.dataset.arbTheme === 'dusk', '返回页面时更新当地昼夜');
        hour = 7;
        const clock = e.timers.find(t => t.ms === 60000);
        check(!!clock, '只需每分钟检查一次浮标时间');
        clock.fn();
        check(fab.dataset.arbTheme === 'dawn', '跨过 7 点自动变成日色');
        hour = 19; w.dispatchEvent(new w.Event('focus'));
        check(fab.dataset.arbTheme === 'dusk', '页面恢复焦点后同步夜色');
        w.uiTest.adr048InstallFabClock();
        check(e.timers.filter(t => t.ms === 60000).length === 1, '重复初始化不叠加时钟');
        check(fab.firstElementChild === svg, '换色不重建浮标，不丢拖动监听');
        check([fab.style.left, fab.style.top, fab.style.right, fab.style.bottom].join('|') === position, '换色保留浮标位置');
        w.Date = NativeDate;
        check(e.requests() === 0, '全部 UI 操作没有发送 API 请求');
        console.log('\n通过 ' + passed + ' · 失败 0');
    } finally { e.close(); }
})().catch(err => { console.error(err); process.exitCode = 1; });
