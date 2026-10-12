// ==UserScript==
// @name         小雅自动刷
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  🚀 小雅平台自动刷课神器！视频自动播放、无缝跳转，突破防切屏限制实现后台挂机 🛡️！智能监测未开启任务倒计时 ⏳，成倍提升学习效率！📈
// @author       Qy
// @match        https://*.ai-augmented.com/*
// @grant        none
// @run-at       document-start
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTYiIGZpbGw9IiNlOGVkZmMiLz48cG9seWdvbiBwb2ludHM9IjUuMjEsNDQgMTUuNDcsMjYgMjMuOTcsMjYgMTMuNzEsNDQiIGZpbGw9IiNhZWJmZjMiLz48cG9seWdvbiBwb2ludHM9IjE1LjIxLDQ5IDMyLjg4LDE4IDQxLjM4LDE4IDIzLjcxLDQ5IiBmaWxsPSIjNmQ4YmVjIi8+PHBvbHlnb24gcG9pbnRzPSIyNS4yMSw1NCA1MC4yOSwxMCA1OC43OSwxMCAzMy43MSw1NCAyOC40NCw1MC40IiBmaWxsPSIjMmY1NGQ0Ii8+PHBvbHlnb24gcG9pbnRzPSI1MC4yOSwxMCA1OC43OSwxMCA0NS4xNiwxOSIgZmlsbD0iIzFkMzc5YiIvPjwvc3ZnPg==
// ==/UserScript==

(function () {
    'use strict';
    (function injectAntiPause() {
        const s = document.createElement('script');
        s.textContent = `(function(){
            Object.defineProperty(document,'hidden',{get:()=>false,configurable:false});
            Object.defineProperty(document,'visibilityState',{get:()=>'visible',configurable:false});
            Object.defineProperty(document,'onvisibilitychange',{get:()=>null,set:()=>{},configurable:false});
            Object.defineProperty(window,'onblur',{get:()=>null,set:()=>{},configurable:false});
            Object.defineProperty(window,'onfocus',{get:()=>null,set:()=>{},configurable:false});
            const _add=EventTarget.prototype.addEventListener;
            const BLOCKED=['visibilitychange','blur','focus','focusout','pagehide'];
            EventTarget.prototype.addEventListener=function(t,fn,o){
                if(BLOCKED.includes(t)&&(this===window||this===document))return;
                return _add.call(this,t,fn,o);
            };
        })()`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
    })();
    (function injectAudioIntercept() {
        let initSilent = true;
        try {
            const pref = JSON.parse(localStorage.getItem('xy_qy_play_pref') || '{}');
            initSilent = pref.silentEnabled !== false;
        } catch(e) {}
        if (document.documentElement) {
            document.documentElement.setAttribute('data-xy-silent', initSilent ? '1' : '0');
        }
        const s = document.createElement('script');
        s.textContent = `(function(){
            var _silent=(document.documentElement.getAttribute('data-xy-silent')==='1');
            var _medias=[];
            var _connected=[];
            var _gains=[];
            var _ctx=null;
            var proto=HTMLMediaElement.prototype;
            var _oPlay=proto.play;
            function getCtx(){
                if(!_ctx){var C=window.AudioContext||window.webkitAudioContext;if(C)_ctx=new C();}
                return _ctx;
            }
            function connectGain(el){
                if(!el||_connected.indexOf(el)!==-1)return;
                try{
                    var ctx=getCtx();if(!ctx)return;
                    if(ctx.state==='suspended')ctx.resume().catch(function(){});
                    var src=ctx.createMediaElementSource(el);
                    var gn=ctx.createGain();
                    gn.gain.value=_silent?0:1;
                    src.connect(gn);gn.connect(ctx.destination);
                    _gains.push({node:gn,ctx:ctx,el:el});
                    _connected.push(el);
                }catch(e){}
            }
            function enforce(el){
                if(!el)return;
                if(_medias.indexOf(el)===-1)_medias.push(el);
                if(_silent)connectGain(el);
            }
            function refreshAll(){
                _silent=(document.documentElement.getAttribute('data-xy-silent')==='1');
                for(var i=_medias.length-1;i>=0;i--){
                    var el=_medias[i];
                    if(!el.isConnected){_medias.splice(i,1);var ci=_connected.indexOf(el);if(ci!==-1)_connected.splice(ci,1);continue;}
                    if(_silent)connectGain(el);
                }
                for(var j=0;j<_gains.length;j++){
                    try{var g=_gains[j];
                    if(g.ctx.state==='suspended')g.ctx.resume().catch(function(){});
                    g.node.gain.value=_silent?0:1;}catch(e){}
                }
            }
            document.addEventListener('click',function(){
                if(_ctx&&_ctx.state==='suspended')_ctx.resume().catch(function(){});
            },true);
            document.addEventListener('xy-silent-change',refreshAll);
            proto.play=function(){
                enforce(this);
                return _oPlay.call(this);
            };
            ['AudioContext','webkitAudioContext'].forEach(function(name){
                var Ctx=window[name];
                if(!Ctx||!Ctx.prototype||!Ctx.prototype.createMediaElementSource)return;
                var _oCMS=Ctx.prototype.createMediaElementSource;
                Ctx.prototype.createMediaElementSource=function(mediaEl){
                    var src=_oCMS.call(this,mediaEl);
                    var gn=this.createGain();
                    gn.gain.value=_silent?0:1;
                    src.connect(gn);
                    _gains.push({node:gn,ctx:this,el:mediaEl});
                    if(_medias.indexOf(mediaEl)===-1)_medias.push(mediaEl);
                    if(_connected.indexOf(mediaEl)===-1)_connected.push(mediaEl);
                    src.connect=function(){return gn.connect.apply(gn,arguments);};
                    src.disconnect=function(){return gn.disconnect.apply(gn,arguments);};
                    return src;
                };
            });
            new MutationObserver(function(muts){
                for(var i=0;i<muts.length;i++){
                    var added=muts[i].addedNodes;
                    for(var j=0;j<added.length;j++){
                        var nd=added[j];
                        if(nd.nodeType!==1)continue;
                        if(nd.tagName==='VIDEO'||nd.tagName==='AUDIO')enforce(nd);
                        if(nd.querySelectorAll){var ms=nd.querySelectorAll('video,audio');for(var k=0;k<ms.length;k++)enforce(ms[k]);}
                    }
                }
            }).observe(document,{childList:true,subtree:true});
        })()`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
    })();
    if (window.top !== window) return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', main, { once: true });
    else main();
    function main() {
        const VERSION = '1.8';
        const NOTICE_API = 'https://xiaoya.qyovo.com/notice';
        const KEY = {
            tasks: 'xy_qy_tasks_v17',
            pref: 'xy_qy_play_pref',
            ui: 'xy_qy_ui_v17',
            user: 'xy_qy_user_v17',
            hang: 'xy_qy_hang_v18',
        };
        const VIDEO_EXT = /\.(mp4|flv|avi|mov|mkv|wmv|rmvb|m4v|webm)$/i;
        const HEARTBEAT_MS = 30000;
        const STALE_MS = 30 * 60000;
        const DOC_EXTRA_S = 20;
        const VERIFY = { doc: { tries: 6, gap: 4000 }, video: { tries: 12, gap: 5000 } };
        const BALL = 52;
        const EDGE = 8;
        const store = {
            get(key, empty) {
                try {
                    const value = JSON.parse(localStorage.getItem(key));
                    return value === null || value === undefined ? empty : value;
                } catch (e) {
                    return empty;
                }
            },
            set(key, value) {
                try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
            },
        };
        ['xy_qy_task_queue', 'xy_qy_ui_pos', 'xy_user_id'].forEach(key => {
            try { localStorage.removeItem(key); } catch (e) {}
        });
        const pref = store.get(KEY.pref, {});
        const ui = Object.assign({ x: null, y: null, open: false, folded: [], seen: '', theme: null, welcomed: false, tab: 'task' }, store.get(KEY.ui, {}));
        let silent = pref.silentEnabled !== false;
        let autoResume = pref.autoResumeEnabled !== false;
        let tasks = [];
        let fetchedAt = 0;
        let loading = false;
        let notice = null;
        let noticeOpen = false;
        let run = null;
        let idleNote = null;
        let flashText = '';
        let flashTimer = null;
        let clearArmed = false;
        let clearTimer = null;
        let suppressClick = 0;
        let dragging = false;
        let obStep = 1;
        let obPick = ui.theme || 'night';
        const hang = Object.assign({ def: 60, pageMin: null, mode: 'one', each: 5, list: [], fetchedAt: 0, c: {}, on: null }, store.get(KEY.hang, {}));
        let hangLoading = false;
        let resetArmed = false;
        let resetTimer = null;
        let here = null;
        const TAB = (() => {
            try { return sessionStorage.getItem('xy_qy_tab') || (sessionStorage.setItem('xy_qy_tab', Math.random().toString(36).slice(2)), sessionStorage.getItem('xy_qy_tab')); } catch (e) { return ''; }
        })();
        const myHang = () => !!hang.on && hang.on.tab === TAB;
        function loadTasks() {
            const saved = store.get(KEY.tasks, {});
            tasks = Array.isArray(saved.tasks) ? saved.tasks : [];
            fetchedAt = saved.fetchedAt || 0;
        }
        const saveTasks = () => store.set(KEY.tasks, { fetchedAt, tasks });
        const saveUi = () => store.set(KEY.ui, ui);
        const saveHang = () => store.set(KEY.hang, hang);
        const savePref = () => store.set(KEY.pref, { silentEnabled: silent, autoResumeEnabled: autoResume });
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        const clamp = (n, min, max) => Math.min(Math.max(n, min), Math.max(min, max));
        const pad = n => String(n).padStart(2, '0');
        const esc = s => String(s === null || s === undefined ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
        const yes = v => v === true || v === 1 || v === '1';
        function idOf(value) {
            const text = value === null || value === undefined ? '' : String(value).trim();
            return text && text !== '_' && text !== 'null' && text !== 'undefined' ? text : null;
        }
        function parseTime(value) {
            if (value === null || value === undefined || value === '') return null;
            if (typeof value === 'number') return value < 1e12 ? value * 1000 : value;
            const text = String(value).trim();
            const m = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})[ T](\d{1,2}):(\d{2})(?::(\d{2}))?$/);
            const ms = m ? new Date(+m[1], m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0)).getTime() : Date.parse(text);
            return Number.isFinite(ms) ? ms : null;
        }
        function clock(sec) {
            sec = Math.max(0, Math.round(sec));
            const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
            return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
        }
        function dayText(ms) {
            const d = new Date(ms), today = new Date();
            const days = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
            const hm = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
            if (days === 0) return `今天 ${hm}`;
            if (days === 1) return `明天 ${hm}`;
            if (days === -1) return `昨天 ${hm}`;
            return `${d.getFullYear() !== today.getFullYear() ? `${d.getFullYear()}年` : ''}${d.getMonth() + 1}月${d.getDate()}日 ${hm}`;
        }
        function isNewer(latest, current) {
            if (!latest || latest === '0') return false;
            const a = latest.split('.').map(Number), b = current.split('.').map(Number);
            for (let i = 0; i < Math.max(a.length, b.length); i++) {
                if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0);
            }
            return false;
        }
        function page() {
            const m = location.pathname.match(/\/(mycourse|course)\/(\d+)(?:\/resource\/(\d+)\/(\d+))?/);
            return m
                ? { route: m[1], groupId: m[2], resourceId: m[3] || null, nodeId: m[4] || null }
                : { route: 'mycourse', groupId: null, resourceId: null, nodeId: null };
        }
        const LOG_KEY = 'xy_qy_log_v18';
        const LOG_MAX = 250000;
        let logPending = '', logTimer = null, logLast = '', logRepeat = 0;
        const when = (ms = Date.now()) => {
            const d = new Date(ms);
            return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
        };
        function logStr(v) {
            if (v instanceof Error) return v.message;
            if (v && typeof v === 'object') {
                try { return JSON.stringify(v).slice(0, 300); } catch (e) { return String(v); }
            }
            return String(v);
        }
        function log(...parts) {
            const text = parts.filter(v => v !== '' && v !== null && v !== undefined).map(logStr).join(' ');
            if (text === logLast) {
                logRepeat++;
                return;
            }
            const d = new Date();
            const at = `${when(d)}.${String(d.getMilliseconds()).padStart(3, '0')}`;
            if (logRepeat) logPending += `${at} ↑ 上一条又重复了 ${logRepeat} 次\n`;
            logLast = text;
            logRepeat = 0;
            logPending += `${at} ${text}\n`;
            if (!logTimer) logTimer = setTimeout(saveLog, 1000);
        }
        function saveLog() {
            clearTimeout(logTimer);
            logTimer = null;
            let text = '';
            try { text = localStorage.getItem(LOG_KEY) || ''; } catch (e) {}
            text += logPending;
            logPending = '';
            if (text.length > LOG_MAX) text = text.slice(text.indexOf('\n', text.length - LOG_MAX * 0.8) + 1);
            try {
                localStorage.setItem(LOG_KEY, text);
            } catch (e) {
                text = text.slice(text.indexOf('\n', text.length / 2) + 1);
                try { localStorage.setItem(LOG_KEY, text); } catch (e2) {}
            }
            return text;
        }
        const taskLine = t => `「${t.name}」${t.groupName} ${t.kind} node=${t.nodeId} 资源=${t.resourceId || '无'} 开始=${t.start ? when(t.start) : '-'} 截止=${t.end ? when(t.end) : '-'}`
            + `${t.lateOk ? ' 可补交' : ''}${t.minutes ? ` 要求${t.minutes}分` : ''}${t.custom ? ` 手填${t.custom}秒` : ''}${t.length ? ` 时长${t.length}秒` : ''}${t.failed ? ' 未确认' : ''}${t.blocked ? ' 打不开' : ''}`;
        function logHeader() {
            const r = run;
            return [
                `小雅自动刷 v${VERSION} 诊断日志`,
                `导出：${new Date().toString()}`,
                `页面：${location.host}${location.pathname}`,
                `浏览器：${navigator.userAgent}`,
                `时区：${Intl.DateTimeFormat().resolvedOptions().timeZone}，窗口 ${innerWidth}×${innerHeight}`,
                `设置：拦截声音=${silent} 恢复播放=${autoResume} 风格=${ui.theme}`,
                `公告：${notice ? (notice.error ? '加载失败' : `v${notice.version}`) : '未加载'}`,
                `运行：${r ? `${r.mode}/${r.phase} 「${r.task.name}」 ${Math.round(r.done)}/${Math.round(r.total)}秒` : '无'}`,
                `任务：${tasks.length} 个，${fetchedAt ? `${when(fetchedAt)} 获取` : '未获取'}`,
                ...tasks.map(t => `  ${taskLine(t)}`),
                '',
                '',
            ].join('\n');
        }
        function copyLog() {
            const text = logHeader() + saveLog().trimEnd().split('\n').slice(-150).join('\n');
            navigator.clipboard.writeText(text).then(
                () => flash('诊断日志已复制（最近 150 条），发给作者就行'),
                () => flash('复制失败，双击版本号可以下载完整日志'));
        }
        function downloadLog() {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([logHeader() + saveLog()], { type: 'text/plain;charset=utf-8' }));
            a.download = `小雅自动刷日志-v${VERSION}-${when().replace(/\D/g, '')}.txt`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(a.href), 10000);
            flash('完整诊断日志已下载');
        }
        function token() {
            let suffixMatch = null;
            for (const cookie of document.cookie.split('; ')) {
                const i = cookie.indexOf('=');
                if (i < 0) continue;
                const name = cookie.slice(0, i);
                if (name === 'prd-access-token') return cookie.slice(i + 1);
                if (!suffixMatch && name.endsWith('access-token')) suffixMatch = cookie.slice(i + 1);
            }
            return suffixMatch;
        }
        async function api(path, body) {
            const tk = token();
            const method = body ? 'POST' : 'GET';
            if (!tk) {
                log('接口', method, path, '没有登录 token');
                throw new Error('没有读到登录信息，请重新登录小雅');
            }
            for (let attempt = 1; ; attempt++) {
                let res = null;
                const t0 = Date.now();
                try {
                    res = await fetch(path, {
                        method,
                        headers: body
                            ? { authorization: `Bearer ${tk}`, 'content-type': 'application/json; charset=UTF-8' }
                            : { authorization: `Bearer ${tk}` },
                        body: body ? JSON.stringify(body) : undefined,
                    });
                } catch (e) {
                    log('接口', method, path, `网络错误（第 ${attempt} 次）`, e);
                    if (attempt >= 3) throw new Error('网络连接失败');
                }
                if (!res || (res.status >= 500 && attempt < 3)) {
                    if (res) log('接口', method, path, res.status, `（第 ${attempt} 次，重试）`);
                    await sleep(1500);
                    continue;
                }
                const data = await res.json().catch(() => null);
                log('接口', method, path, res.status, `${Date.now() - t0}ms`, apiSummary(path, data));
                if (!res.ok || !data || data.success === false) throw new Error((data && data.message) || `请求失败（HTTP ${res.status}）`);
                return data;
            }
        }
        function apiSummary(path, data) {
            if (!data) return '返回不是 JSON';
            if (data.success === false) return `失败：${data.message}`;
            if (path.includes('oauth2/info')) return 'ok';
            const list = listOf(data);
            return list.length ? `${list.length} 条` : logStr(data.data).slice(0, 160);
        }
        function listOf(res) {
            const data = res && res.data;
            if (Array.isArray(data)) return data;
            for (const key of ['student_tasks', 'records', 'list', 'items', 'data']) {
                if (data && Array.isArray(data[key])) return data[key];
            }
            return [];
        }
        const taskNotices = groupId => api(`/api/jx-stat/group/task/queryTaskNotices?group_id=${groupId}&role=1`).then(listOf);
        async function resourceIndex(groupId) {
            const index = { byTask: new Map(), byNode: new Map() };
            const walk = list => {
                if (!Array.isArray(list)) return;
                for (const item of list) {
                    if (!item || typeof item !== 'object') continue;
                    if (idOf(item.task_id)) index.byTask.set(idOf(item.task_id), item);
                    const node = idOf(item.node_id) || idOf(item.id);
                    if (node) index.byNode.set(node, item);
                    walk(item.children);
                    walk(item.child_nodes);
                    walk(item.items);
                }
            };
            walk((await api(`/api/jx-iresource/resource/queryCourseResources?group_id=${groupId}`)).data);
            return index;
        }
        const resourceIdOf = res => res ? idOf(res.parent_id) || idOf(res.resource_id) || idOf(res.id) : null;
        const isVideoRes = x => Number(x.type) === 9 || String(x.type || '').includes('video') || String(x.mimetype || '').includes('video') || VIDEO_EXT.test(String(x.name || ''));
        async function userId() {
            const tail = (token() || '').slice(-12), cached = store.get(KEY.user, {});
            if (cached.id && cached.tail === tail) return cached.id;
            const id = (await api('/api/jx-auth/oauth2/info')).data.info.id;
            store.set(KEY.user, { id, tail });
            return id;
        }
        function taskState(t, now = Date.now()) {
            if (t.end && now >= t.end) return t.lateOk ? 'late' : 'expired';
            if (t.start && now < t.start) return 'locked';
            return 'ready';
        }
        const runnable = t => !t.failed && !t.blocked && (t.kind === 'video' || t.custom || t.minutes);
        function canAuto(t, now = Date.now()) {
            const state = taskState(t, now);
            return (state === 'ready' || state === 'late') && runnable(t);
        }
        function toTask(raw, groupId, groupName, index, route) {
            const nodeId = idOf(raw.node_id) || idOf(raw.nodeId);
            const taskId = idOf(raw.task_id) || idOf(raw.taskId) || idOf(raw.id) || idOf(raw.resource_id);
            const rawName = String(raw.name || '').trim();
            if (!groupId || !nodeId || !taskId || !rawName) return null;
            const res = index ? index.byTask.get(taskId) || index.byNode.get(nodeId) : null;
            const name = (res && res.name) || rawName;
            const video = res ? isVideoRes(res) : VIDEO_EXT.test(name);
            const old = tasks.find(t => t.nodeId === nodeId) || {};
            return {
                nodeId,
                taskId,
                groupId,
                groupName: groupName || old.groupName || '未分类',
                route: route || 'mycourse',
                resourceId: resourceIdOf(res) || old.resourceId || null,
                name,
                kind: video ? 'video' : 'doc',
                start: parseTime(raw.start_time),
                end: parseTime(raw.end_time),
                lateOk: yes(raw.is_allow_after_submitted),
                minutes: !video && res && Number(res.watch_min_minutes) > 0 ? Number(res.watch_min_minutes) : null,
                custom: old.custom || null,
                length: old.length || null,
            };
        }
        function sortTasks(list) {
            const now = Date.now();
            const rank = { ready: 0, late: 1, locked: 2, expired: 3 };
            const key = t => {
                const state = taskState(t, now);
                return [rank[state], (state === 'locked' ? t.start : t.end) || Infinity];
            };
            const cmp = (a, b) => a[0] - b[0] || (a[1] === b[1] ? 0 : a[1] < b[1] ? -1 : 1);
            const groupKey = new Map();
            for (const t of list) {
                const k = key(t), g = groupKey.get(t.groupId);
                if (!g || cmp(k, g) < 0) groupKey.set(t.groupId, k);
            }
            return list.slice().sort((a, b) => cmp(groupKey.get(a.groupId), groupKey.get(b.groupId))
                || a.groupName.localeCompare(b.groupName)
                || a.groupId.localeCompare(b.groupId)
                || cmp(key(a), key(b)));
        }
        async function refreshAll() {
            const now = Date.now(), keep = [], unknown = new Map();
            const all = listOf(await api('/api/jx-stat/group/task/un_finish'));
            for (const t of all) {
                if (Number(t.task_type) !== 1) continue;
                const end = parseTime(t.end_time), groupId = idOf(t.group_id);
                if (!end || end > now || yes(t.is_allow_after_submitted)) keep.push(t);
                else if ((t.is_allow_after_submitted === undefined || t.is_allow_after_submitted === null) && groupId) {
                    if (!unknown.has(groupId)) unknown.set(groupId, []);
                    unknown.get(groupId).push(t);
                }
            }
            const groupIds = [...new Set([...keep.map(t => idOf(t.group_id)), ...unknown.keys()])].filter(Boolean);
            const courses = new Map(await Promise.all(groupIds.map(async groupId => {
                const [index, notices] = await Promise.all([
                    resourceIndex(groupId).catch(() => null),
                    unknown.has(groupId) ? taskNotices(groupId).catch(() => []) : [],
                ]);
                return [groupId, { index, lateOk: new Set(notices.filter(n => yes(n.is_allow_after_submitted)).map(n => idOf(n.node_id))) }];
            })));
            for (const [groupId, list] of unknown) {
                for (const t of list) {
                    if (courses.get(groupId).lateOk.has(idOf(t.node_id))) keep.push(Object.assign({}, t, { is_allow_after_submitted: true }));
                }
            }
            tasks = sortTasks(keep.map(t => {
                const groupId = idOf(t.group_id);
                return toTask(t, groupId, t.group_name, groupId && courses.get(groupId).index, 'mycourse');
            }).filter(Boolean));
            log('刷新', `首页：未完成 ${all.length} 条，观看任务 ${all.filter(t => Number(t.task_type) === 1).length} 个，截止后待确认能否补交的课 ${unknown.size} 门，最后留下 ${tasks.length} 个`);
            for (const [groupId, c] of courses) if (!c.index) log('刷新', `课程 ${groupId} 的资源树没取到`);
        }
        async function refreshCourse(groupId, route) {
            const [list, index, name] = await Promise.all([
                taskNotices(groupId),
                resourceIndex(groupId).catch(() => null),
                api(`/api/jx-iresource/group/queryGroup/${groupId}`).then(res => String((res.data && res.data.name) || '').trim()).catch(() => ''),
            ]);
            const now = Date.now();
            const fresh = list
                .filter(t => Number(t.task_type) === 1 && Number(t.finish) !== 2)
                .filter(t => {
                    const end = parseTime(t.end_time);
                    return !end || end > now || yes(t.is_allow_after_submitted);
                })
                .map(t => toTask(t, groupId, name, index, route))
                .filter(Boolean);
            tasks = sortTasks([...tasks.filter(t => t.groupId !== groupId), ...fresh]);
            log('刷新', `课程页「${name}」：任务 ${list.length} 条，留下观看任务 ${fresh.length} 个${index ? '' : '，资源树没取到'}`);
        }
        async function refresh() {
            if (loading) return;
            const p = page();
            loading = true;
            idleNote = null;
            render();
            try {
                if (p.groupId) await refreshCourse(p.groupId, p.route);
                else await refreshAll();
                fetchedAt = Date.now();
                saveTasks();
                tasks.forEach(t => log('任务', taskLine(t)));
            } catch (e) {
                log('刷新', '失败', e);
                flash(`任务获取失败：${e.message}`);
            }
            loading = false;
            syncRun();
        }
        function setTask(nodeId, patch) {
            for (const t of tasks) if (t.nodeId === nodeId) Object.assign(t, patch);
            if (run && run.task.nodeId === nodeId) Object.assign(run.task, patch);
            saveTasks();
        }
        function removeTask(nodeId) {
            log('列表', '移出', nodeId);
            if (run && run.task.nodeId === nodeId) stopRun('任务被移出列表');
            tasks = tasks.filter(t => t.nodeId !== nodeId);
            saveTasks();
            render();
        }
        function clearList() {
            clearTimeout(clearTimer);
            if (!clearArmed) {
                clearArmed = true;
                clearTimer = setTimeout(() => { clearArmed = false; render(); }, 3000);
            } else {
                clearArmed = false;
                log('列表', `清空 ${tasks.length} 个任务`);
                stopRun('清空列表');
                tasks = [];
                saveTasks();
            }
            render();
        }
        function setDuration(nodeId, value) {
            const minutes = parseFloat(value);
            log('列表', '改时长', nodeId, JSON.stringify(value), minutes > 0 ? `→ ${Math.round(minutes * 60)} 秒` : '→ 恢复自动');
            setTask(nodeId, { custom: minutes > 0 ? Math.round(minutes * 60) : null });
            render();
        }
        function syncRun() {
            const nodeId = page().nodeId;
            if (myHang()) {
                if (hang.on.nodeId === nodeId) {
                    if (!run || run.mode !== 'hang') startHang();
                    render();
                    return;
                }
                log('挂时长', '当前页不是正在挂的那一页，不再挂', location.pathname);
                hang.on = null;
                saveHang();
            }
            if (run && run.mode === 'hang') stopRun('挂时长已取消');
            const task = nodeId && tasks.find(t => t.nodeId === nodeId);
            if (task && !task.failed) {
                if (!run || run.mode !== 'task' || run.task.nodeId !== nodeId) startTask(task);
            } else if (run && run.mode === 'task' && run.phase !== 'finishing') {
                stopRun(task ? '这个任务上次未确认完成，等用户点它重试' : '当前页不是列表里的任务');
            }
            render();
        }
        function startTask(task) {
            stopRun('换成另一个任务');
            idleNote = null;
            log('开始', taskLine(task));
            const now = Date.now();
            run = { mode: 'task', task, phase: 'loading', total: 0, done: 0, startedAt: now, watched: 0, lastCT: null, lastTick: now, previewTries: 0, pausedSince: 0, lastPlay: 0 };
            run.timer = setInterval(tick, 1000);
            run.beat = setInterval(heartbeat, HEARTBEAT_MS);
            tick();
            heartbeat();
        }
        function startWait(task) {
            stopRun('改为等待');
            idleNote = null;
            log('等待', `下一个能做的任务 ${when(task.start)} 才开始`, taskLine(task));
            run = { mode: 'wait', task, phase: 'waiting', total: 0, done: 0 };
            run.timer = setInterval(tick, 1000);
            tick();
        }
        function stopRun(why) {
            if (!run) return;
            log('停止', why, `${run.mode}/${run.phase}「${run.task.name}」`);
            clearInterval(run.timer);
            clearInterval(run.beat);
            if (run.abort) run.abort.abort();
            run = null;
        }
        function tick() {
            const r = run;
            if (!r || r.phase === 'finishing') return;
            if (r.mode === 'wait') {
                const t = tasks.find(x => x.nodeId === r.task.nodeId);
                if (!t) {
                    stopRun('等待的任务已不在列表里');
                    render();
                } else if (Date.now() >= t.start) {
                    stopRun('等待的任务到点了');
                    goNext(t);
                }
                paint();
                return;
            }
            if (page().nodeId !== r.task.nodeId) {
                if (r.mode === 'hang') {
                    hang.on = null;
                    saveHang();
                }
                stopRun(`页面换了：${location.pathname}`);
                render();
                return;
            }
            const lock = pageLock();
            if (lock) {
                r.phase = 'locked';
                r.startAt = lock.startAt;
                if (lock.startAt && Date.now() >= lock.startAt + 3000 && reloadAllowed(r.task.nodeId)) {
                    log('锁定', '到开始时间了，刷新页面');
                    saveLog();
                    location.reload();
                }
            } else if (r.mode === 'hang') {
                tickHang(r);
            } else if (r.task.kind === 'video') {
                tickVideo(r);
            } else {
                tickDoc(r);
            }
            if (run === r && r.phase !== r.logged) {
                r.logged = r.phase;
                const v = r.video;
                log('状态', r.phase, r.phase === 'locked' ? `开始时间 ${r.startAt ? when(r.startAt) : '读不到'}，页面写着「${(document.querySelector('.aia-course-task-not-start') || {}).innerText || ''}」`.replace(/\s+/g, ' ')
                    : v ? `进度 ${(v.currentTime || 0).toFixed(1)}/${(v.duration || 0).toFixed(1)} 暂停=${v.paused} 就绪=${v.readyState} 静音=${v.muted} 已看=${Math.round(r.watched)}秒`
                    : `${Math.round(r.done)}/${Math.round(r.total)}秒`);
            }
            paint();
        }
        function pageLock() {
            const el = document.querySelector('.aia-course-task-not-start');
            const text = el ? (el.innerText || '').replace(/\s+/g, ' ').trim() : '';
            if (!text) return null;
            const m = text.match(/任务将于(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(?::\d{2})?)开始/);
            if (m) return { startAt: parseTime(m[1].replace(/\s+/, ' ')) };
            let left = null;
            for (const [re, unit] of [[/(\d+)\s*天/, 86400], [/(\d+)\s*小时/, 3600], [/(\d+)\s*分钟/, 60], [/(\d+)\s*秒/, 1]]) {
                const hit = text.match(re);
                if (hit) left = (left || 0) + hit[1] * unit;
            }
            return { startAt: left === null ? null : Date.now() + left * 1000 };
        }
        function reloadAllowed(nodeId) {
            try {
                const key = `xy_qy_reload_${nodeId}`;
                if (Date.now() - (Number(sessionStorage.getItem(key)) || 0) < 60000) return false;
                sessionStorage.setItem(key, String(Date.now()));
                return true;
            } catch (e) {
                return false;
            }
        }
        function tickVideo(r) {
            const video = document.querySelector('video');
            if (!video) {
                r.phase = 'loading';
                return;
            }
            if (r.video !== video) attachVideo(r, video);
            const now = Date.now(), ct = video.currentTime || 0;
            const duration = Number.isFinite(video.duration) && video.duration > 1 ? video.duration : 0;
            if (duration && r.task.length !== Math.ceil(duration)) {
                setTask(r.task.nodeId, { length: Math.ceil(duration) });
                render();
            }
            if (r.lastCT !== null) {
                const delta = ct - r.lastCT;
                if (delta > 0 && delta <= (now - r.lastTick) / 1000 * 2 + 2) r.watched += delta;
            }
            r.lastCT = ct;
            r.lastTick = now;
            const custom = r.task.custom;
            r.total = custom || duration;
            r.done = custom ? r.watched : ct;
            if (video.ended || (duration && ct >= duration - 0.5) || (custom && r.watched >= custom)) {
                finish(r, video.ended ? '视频播完（ended）' : custom && r.watched >= custom ? `手填时长看满 ${Math.round(r.watched)} 秒` : `播到结尾 ${ct.toFixed(1)}/${duration.toFixed(1)}`);
                return;
            }
            keepPlaying(r, video, now);
        }
        function keepPlaying(r, video, now) {
            if (!video.paused) {
                r.autoplayed = true;
                r.pausedSince = 0;
                r.phase = video.readyState < 3 ? 'buffering' : 'playing';
                return;
            }
            r.pausedSince = r.pausedSince || now;
            if (!r.autoplayed && now - r.attachedAt >= 2000) {
                r.autoplayed = true;
                kick(r, video);
            } else if (r.autoplayed && autoResume) {
                kick(r, video);
            }
            r.phase = !r.autoplayed ? 'loading' : !autoResume ? 'paused' : now - r.pausedSince > 9000 ? 'blocked' : 'resuming';
        }
        function attachVideo(r, video) {
            if (r.abort) r.abort.abort();
            r.abort = new AbortController();
            r.video = video;
            r.lastCT = null;
            r.attachedAt = Date.now();
            log('视频', '找到视频', (video.currentSrc || video.src || '').split('?')[0].split('/').pop() || '（还没有地址）');
            for (const type of ['loadedmetadata', 'play', 'playing', 'pause', 'waiting', 'stalled', 'seeking', 'seeked', 'ratechange', 'emptied', 'error', 'ended']) {
                video.addEventListener(type, () => log('视频', type, `${(video.currentTime || 0).toFixed(1)}/${(video.duration || 0).toFixed(1)}`,
                    type === 'ratechange' ? `倍速=${video.playbackRate}` : '',
                    type === 'error' && video.error ? `错误码=${video.error.code} ${video.error.message || ''}` : ''), { signal: r.abort.signal });
            }
            video.addEventListener('ended', tick, { signal: r.abort.signal });
            video.addEventListener('pause', () => setTimeout(() => {
                if (r.autoplayed && autoResume) kick(r, video);
            }, 600), { signal: r.abort.signal });
        }
        function kick(r, video) {
            const now = Date.now();
            if (run !== r || r.phase === 'finishing' || !video.paused || video.ended || now - r.lastPlay < 4000) return;
            r.lastPlay = now;
            log('播放', '尝试播放');
            tryAutoPlay(video);
        }
        function tryAutoPlay(video) {
            const p = video.play();
            if (p && typeof p.catch === 'function') {
                p.catch(e => {
                    log('播放', '被拦截，改为先静音播放', e && e.name);
                    video.muted = true;
                    const p2 = video.play();
                    if (p2 && typeof p2.finally === 'function') {
                        p2.catch(e2 => log('播放', '静音播放也失败', e2 && e2.name)).finally(() => setTimeout(() => { video.muted = false; }, 150));
                    }
                });
            }
        }
        function confirmPreview(r) {
            if (r.previewDone || r.previewTries >= 12) return;
            if (document.querySelector('iframe[src*="ow365.cn"], iframe[src*="office"], .disk_previewer_with_banner iframe')) {
                r.previewDone = true;
                log('文档', '预览已打开');
            } else {
                r.previewTries++;
                const confirm = document.querySelector('.xy_disk_preview .ant-btn-primary');
                if (confirm) confirm.click();
                log('文档', `第 ${r.previewTries} 次找预览`, confirm ? '点了「确定」' : '没找到「确定」按钮');
            }
        }
        function tickDoc(r) {
            confirmPreview(r);
            const t = r.task;
            const total = t.custom || (t.minutes ? Math.ceil(t.minutes * 60) + DOC_EXTRA_S : 0);
            if (!total) {
                r.phase = 'nodur';
                r.startedAt = Date.now();
                return;
            }
            r.phase = 'counting';
            r.total = total;
            r.done = (Date.now() - r.startedAt) / 1000;
            if (r.done >= total) finish(r, `文档停留满 ${total} 秒`);
        }
        async function heartbeat() {
            const r = run;
            if (!r || r.mode === 'wait' || r.phase === 'locked' || r.phase === 'nodur') return;
            const t = r.task;
            const resourceId = t.nodeId;
            log('心跳', `${r.phase} ${Math.round(r.done)}/${Math.round(r.total)}秒`);
            try {
                const message = JSON.stringify({ user_id: await userId(), group_id: t.groupId, clientType: 1, roleType: 1, resourceId });
                const timestamp = Date.now().toString(), nonce = crypto.randomUUID();
                const raw = [encodeURIComponent(message), timestamp, nonce, '--xy-create-signature--'].sort().join('');
                const hash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(raw));
                const signature = Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join('');
                await api('/api/jx-iresource/learnLength/learnRecord', { message, signature, timestamp, nonce });
            } catch (e) {
                log('心跳', '失败', e);
            }
        }
        async function finish(r, why) {
            if (run !== r || r.phase === 'finishing') return;
            r.phase = 'finishing';
            r.done = r.total;
            clearInterval(r.timer);
            clearInterval(r.beat);
            if (r.abort) r.abort.abort();
            paint();
            const t = r.task;
            log('完成', why, `「${t.name}」`);
            if (t.kind === 'doc') {
                await api('/api/jx-iresource/resource/finishActivity', { group_id: t.groupId, node_id: t.nodeId, task_id: t.taskId }).catch(e => log('完成', '完成接口失败', e));
            }
            const ok = await verify(r);
            if (run !== r) {
                log('完成', '确认途中任务被换掉了，不再处理');
                return;
            }
            const next = nextAfter(t.nodeId);
            log('完成', ok ? '平台已确认完成，移出列表' : '平台一直没确认，标成「未确认完成」', next ? `下一个：「${next.name}」` : '没有能自动做的下一个');
            run = null;
            if (ok) {
                tasks = tasks.filter(x => x.nodeId !== t.nodeId);
                saveTasks();
            } else {
                setTask(t.nodeId, { failed: true });
            }
            goNext(next);
        }
        async function verify(r) {
            const { tries, gap } = VERIFY[r.task.kind];
            for (let i = 0; i < tries; i++) {
                await sleep(i ? gap : 1500);
                if (run !== r) return false;
                try {
                    const hit = (await taskNotices(r.task.groupId)).find(n => idOf(n.node_id) === r.task.nodeId);
                    log('确认', `第 ${i + 1}/${tries} 次`, hit ? `finish=${hit.finish}` : '课程任务列表里找不到这个任务');
                    if (hit && Number(hit.finish) === 2) return true;
                } catch (e) {
                    log('确认', `第 ${i + 1}/${tries} 次出错`, e);
                }
            }
            return false;
        }
        function nextAfter(nodeId) {
            const i = tasks.findIndex(t => t.nodeId === nodeId), now = Date.now();
            const order = i < 0 ? tasks : [...tasks.slice(i + 1), ...tasks.slice(0, i)];
            return order.find(t => canAuto(t, now)) || null;
        }
        async function goNext(next) {
            const tried = new Set();
            while (next && !tried.has(next.nodeId)) {
                tried.add(next.nodeId);
                if (await openTask(next)) return;
                log('连播', `「${next.name}」打不开，跳过`);
                next = nextAfter(next.nodeId);
            }
            const now = Date.now();
            const soonest = tasks
                .filter(t => taskState(t, now) === 'locked' && runnable(t))
                .sort((a, b) => a.start - b.start)[0];
            if (soonest) startWait(soonest);
            else {
                idleNote = tasks.length
                    ? { tab: 'task', label: '自动连播已结束', name: `还有 ${tasks.length} 个任务需要手动处理`, meta: '列表里标出了原因，点任务可以手动打开' }
                    : { tab: 'task', label: '全部完成', name: '列表里的任务都完成了', meta: '有新任务时点「刷新任务」获取' };
                log('连播', '结束', idleNote.name);
                tasks.forEach(t => log('连播', `剩下：${taskState(t, now)}${runnable(t) ? '' : ' 不能自动做'}`, taskLine(t)));
            }
            render();
        }
        async function openTask(task) {
            let resourceId = task.resourceId;
            if (!resourceId) {
                try {
                    const index = await resourceIndex(task.groupId);
                    resourceId = resourceIdOf(index.byTask.get(task.taskId) || index.byNode.get(task.nodeId));
                    setTask(task.nodeId, resourceId ? { resourceId } : { blocked: true });
                } catch (e) {
                    log('打开', `「${task.name}」查资源 ID 出错`, e);
                    flash(`打不开「${task.name}」：${e.message}`);
                    return false;
                }
            }
            if (!resourceId) {
                log('打开', `「${task.name}」资源树里找不到资源 ID`);
                flash(`「${task.name}」缺少资源 ID，无法打开`);
                return false;
            }
            const url = `/app/jx-web/${task.route || 'mycourse'}/${task.groupId}/resource/${resourceId}/${task.nodeId}`;
            log('打开', `「${task.name}」`, url);
            saveLog();
            location.replace(url);
            return true;
        }
        function clickTask(nodeId) {
            const task = tasks.find(t => t.nodeId === nodeId);
            log('面板', '点任务', task ? taskLine(task) : `${nodeId}（列表里已经没有了）`);
            if (!task) return;
            if (myHang()) {
                hang.on = null;
                saveHang();
            }
            if (task.failed || task.blocked) setTask(nodeId, { failed: false, blocked: false });
            if (page().nodeId === nodeId) syncRun();
            else openTask(task);
        }
        const HANG_SAVE_S = 10;
        const hc = id => (hang.c[id] = hang.c[id] || { target: null, done: 0, hidden: false, pick: null });
        const hangGoal = id => (hc(id).target === null ? hang.def : hc(id).target) * 60;
        const pageGoal = () => (hang.pageMin === null ? hang.def : hang.pageMin) * 60;
        const hangCourses = () => hang.list.filter(g => !hc(g.id).hidden);
        const hangable = g => hc(g.id).pick !== false && hangGoal(g.id) > 0 && hc(g.id).done < hangGoal(g.id);
        async function refreshCourses() {
            if (hangLoading) return;
            hangLoading = true;
            render();
            try {
                const list = listOf(await api('/api/jx-iresource/group/student/groups?time_flag=1'));
                hang.list = list.map(g => ({ id: idOf(g.id), name: String(g.name || g.site_name || '').trim() })).filter(g => g.id && g.name);
                hang.fetchedAt = Date.now();
                hang.list.forEach(g => Object.assign(hc(g.id), { hidden: false, pick: null }));
                saveHang();
                log('挂时长', `课程 ${hang.list.length} 门`, hang.list.map(g => g.name).join('、'));
            } catch (e) {
                log('挂时长', '课程获取失败', e);
                flash(`课程获取失败：${e.message}`);
            }
            hangLoading = false;
            render();
        }
        async function courseFiles(groupId) {
            const list = listOf(await api(`/api/jx-iresource/resource/queryCourseResources/v2?group_id=${groupId}`));
            const byId = new Map(list.map(x => [idOf(x.id), x]));
            const order = x => String(x.path || x.id).split('/').map(id => Number((byId.get(id) || {}).sort_position) || 0);
            const cmp = (a, b) => {
                const p = order(a), q = order(b);
                for (let i = 0; i < Math.min(p.length, q.length); i++) if (p[i] !== q[i]) return p[i] - q[i];
                return p.length - q.length;
            };
            const files = list.filter(x => idOf(x.id) && idOf(x.parent_id) && (isVideoRes(x) || Number(x.type) === 6)).sort(cmp);
            const plain = files.filter(x => !/^image\//.test(x.mimetype || ''));
            const videos = files.filter(isVideoRes);
            const first = videos[0] || plain[0] || files[0];
            const rotation = plain.length ? plain : files;
            log('挂时长', `这门课有 ${list.length} 条资源，视频 ${videos.length} 个，文件 ${files.length - videos.length} 个，轮流挂的有 ${rotation.length} 个`,
                first ? `第一个是「${first.name}」 type=${first.type} mimetype=${first.mimetype}` : '没有能挂的视频或文档');
            const pick = x => ({ nodeId: idOf(x.id), parentId: idOf(x.parent_id), name: String(x.name || ''), kind: isVideoRes(x) ? 'video' : 'doc' });
            return { first: first ? pick(first) : false, rotation: rotation.map(pick) };
        }
        async function hangCourse(id) {
            const c = hc(id), g = hang.list.find(x => x.id === id), rotate = hang.mode === 'rotate';
            if (c.pick === null || rotate) {
                try {
                    const f = await courseFiles(id);
                    c.count = f.rotation.length;
                    c.pick = rotate ? f.rotation[(c.at || 0) % Math.max(1, c.count)] || false : f.first;
                } catch (e) {
                    log('挂时长', '取课程资源失败', e);
                    flash(`打不开这门课：${e.message}`);
                    return false;
                }
                saveHang();
            }
            if (!c.pick) {
                render();
                return false;
            }
            if (c.done >= hangGoal(id)) c.done = 0;
            return hangOpen(Object.assign({ mode: 'course', groupId: id, groupName: g ? g.name : '', since: 0 }, c.pick));
        }
        function hangPage() {
            const p = page(), g = hang.list.find(x => x.id === p.groupId);
            const known = here && here.nodeId === p.nodeId;
            hangOpen({ mode: 'page', groupId: p.groupId, groupName: g ? g.name : '', nodeId: p.nodeId, parentId: p.resourceId,
                name: known ? here.name : '这一页', kind: known ? here.kind : null, done: 0 });
        }
        function hangOpen(on) {
            hang.on = Object.assign(on, { tab: TAB });
            saveHang();
            idleNote = null;
            log('挂时长', on.mode === 'page' ? '只挂这一页' : '挂这门课', `「${on.groupName}」「${on.name}」 node=${on.nodeId}`);
            if (page().nodeId === on.nodeId) {
                syncRun();
                return true;
            }
            const url = `/app/jx-web/mycourse/${on.groupId}/resource/${on.parentId}/${on.nodeId}`;
            log('打开', url);
            saveLog();
            location.replace(url);
            return true;
        }
        function startHang() {
            stopRun('改为挂时长');
            const on = hang.on, now = Date.now();
            run = { mode: 'hang', on, task: { nodeId: on.nodeId, groupId: on.groupId, groupName: on.groupName, name: on.name, kind: on.kind },
                phase: 'loading', total: 0, done: 0, lastTick: now, lastCT: null, watched: 0, previewTries: 0, pausedSince: 0, lastPlay: 0, unsaved: 0 };
            log('开始', '挂时长', on);
            run.timer = setInterval(tick, 1000);
            run.beat = setInterval(heartbeat, HEARTBEAT_MS);
            tick();
            heartbeat();
        }
        function tickHang(r) {
            const now = Date.now();
            const dt = (now - r.lastTick) / 1000;
            r.lastTick = now;
            const video = document.querySelector('video');
            if (video) {
                if (r.video !== video) attachVideo(r, video);
                if (video.ended) {
                    log('挂时长', '视频播完，从头再播');
                    video.currentTime = 0;
                    r.lastPlay = 0;
                    kick(r, video);
                }
                keepPlaying(r, video, now);
            } else if (r.task.kind === 'video') {
                r.phase = 'loading';
            } else {
                confirmPreview(r);
                r.phase = 'counting';
            }
            const on = r.on, course = hc(on.groupId);
            if ((r.phase === 'playing' || r.phase === 'buffering' || r.phase === 'counting') && dt > 0 && dt < 90) {
                course.done += dt;
                if (on.mode === 'page') on.done += dt;
                on.since = (on.since || 0) + dt;
                r.unsaved += dt;
            }
            r.total = on.mode === 'page' ? pageGoal() : hangGoal(on.groupId);
            r.done = on.mode === 'page' ? on.done : course.done;
            if (r.unsaved >= HANG_SAVE_S) {
                r.unsaved = 0;
                saveHang();
            }
            if (r.done >= r.total) hangDone(r);
            else if (on.mode === 'course' && hang.mode === 'rotate' && on.since >= hang.each * 60) hangRotate(r);
        }
        function hangRotate(r) {
            const on = r.on, c = hc(on.groupId);
            c.at = (c.at || 0) + 1;
            log('挂时长', `「${on.name}」挂满 ${hang.each} 分钟，换下一个文件（第 ${c.at % Math.max(1, c.count) + 1}/${c.count} 个）`);
            hang.on = null;
            saveHang();
            stopRun('轮流挂：换下一个文件');
            hangCourse(on.groupId);
        }
        function hangDone(r) {
            const on = r.on;
            log('挂时长', `挂够了「${on.groupName}」「${on.name}」 ${Math.round(r.done)}/${Math.round(r.total)}秒`);
            hang.on = null;
            saveHang();
            stopRun('挂够了');
            if (on.mode === 'course') {
                hangNext(on.groupId);
                return;
            }
            idleNote = { tab: 'hang', label: '挂机完成', big: '1', unit: '页已挂够', name: `「${on.name}」挂够 ${Math.round(r.total / 60)} 分钟`, meta: '想多挂一会，就把分钟数改大再点一次' };
            render();
        }
        async function hangNext(groupId) {
            const list = hangCourses(), i = list.findIndex(g => g.id === groupId);
            for (const g of [...list.slice(i + 1), ...list.slice(0, Math.max(i, 0))]) {
                if (hangable(g) && await hangCourse(g.id)) return;
            }
            const n = list.filter(g => hangGoal(g.id) > 0 && hc(g.id).done >= hangGoal(g.id)).length;
            log('挂时长', `全部挂完，${n} 门挂够`);
            idleNote = { tab: 'hang', label: '挂机完成', big: String(n), unit: '门课已挂够', name: '列表里的课程都挂够了', meta: '想多挂一会，就把分钟数改大再点一次' };
            render();
        }
        function hangStop() {
            log('挂时长', '用户点了停止');
            hang.on = null;
            saveHang();
            stopRun('用户停止挂时长');
            render();
        }
        async function loadHere() {
            const p = page();
            if (!p.nodeId || (here && here.nodeId === p.nodeId)) return;
            if (hang.on && hang.on.nodeId === p.nodeId) {
                here = { nodeId: p.nodeId, name: hang.on.name, kind: hang.on.kind };
                return;
            }
            here = { nodeId: p.nodeId, name: '这一页', kind: null };
            try {
                const res = listOf(await api(`/api/jx-iresource/resource/queryCourseResources/v2?group_id=${p.groupId}`)).find(x => idOf(x.id) === p.nodeId);
                if (res) Object.assign(here, { name: String(res.name || '这一页'), kind: isVideoRes(res) ? 'video' : 'doc' });
            } catch (e) {
                log('挂时长', '读这一页的名称失败', e);
            }
            render();
        }
        function setHangTarget(id, value) {
            const text = String(value).trim(), n = Math.round(Number(text));
            if (text && !(n >= 0)) return render();
            const v = text ? n : null;
            if (id === 'page') hang.pageMin = v;
            else hc(id).target = v;
            log('挂时长', '改分钟数', id, v === null ? '恢复默认' : `${v} 分钟`);
            saveHang();
            render();
        }
        function setHangDef(value) {
            const n = Math.round(Number(value));
            if (n > 0) hang.def = n;
            log('挂时长', '改默认分钟数', JSON.stringify(value), `→ ${hang.def}`);
            saveHang();
            render();
        }
        function setHangMode(mode) {
            hang.mode = mode === 'rotate' ? 'rotate' : 'one';
            log('挂时长', '挂法', hang.mode === 'rotate' ? `轮流挂，每个文件 ${hang.each} 分钟` : '一个挂到底');
            saveHang();
            render();
        }
        function setHangEach(value) {
            const n = Math.round(Number(value));
            if (n > 0) hang.each = n;
            log('挂时长', '改每个文件的分钟数', JSON.stringify(value), `→ ${hang.each}`);
            saveHang();
            render();
        }
        function hideCourse(id) {
            log('挂时长', '移出课程', id);
            hc(id).hidden = true;
            if (myHang() && hang.on.mode === 'course' && hang.on.groupId === id) hangStop();
            saveHang();
            render();
        }
        function resetHang() {
            clearTimeout(resetTimer);
            if (!resetArmed) {
                resetArmed = true;
                resetTimer = setTimeout(() => { resetArmed = false; render(); }, 3000);
            } else {
                resetArmed = false;
                log('挂时长', '重置所有课程的已挂时长');
                Object.values(hang.c).forEach(c => { c.done = 0; });
                if (hang.on && hang.on.mode === 'page') hang.on.done = 0;
                idleNote = null;
                saveHang();
            }
            render();
        }
        async function loadNotice() {
            for (let attempt = 1; attempt <= 2; attempt++) {
                try {
                    const data = await (await fetch(NOTICE_API, { method: 'POST', body: JSON.stringify({ action: 'get_notice' }) })).json();
                    notice = {
                        content: String(data.content || '暂无公告'),
                        version: String(data.version || '').replace(/[^0-9.]/g, ''),
                        updatedAt: String(data.updatedAt || ''),
                    };
                    log('公告', `最新版本 v${notice.version || '-'}，更新于 ${notice.updatedAt || '-'}`);
                    break;
                } catch (e) {
                    log('公告', `加载失败（第 ${attempt} 次）`, e);
                    notice = { content: '公告加载失败', error: true };
                    if (attempt < 2) await sleep(2000);
                }
            }
            render();
        }
        const firstLine = text => String(text).split('\n').map(s => s.trim()).find(Boolean) || '';
        const noticeKey = () => notice ? `${notice.content}|${notice.updatedAt}` : '';
        const noticeUnread = () => !!notice && !notice.error && notice.content !== '暂无公告' && ui.seen !== noticeKey();
        const hasUpdate = () => !!notice && isNewer(notice.version, VERSION);
        const LOGO = { night: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#131c31"/><polygon points="5.21,44 15.47,26 23.97,26 13.71,44" fill="#2a4594"/><polygon points="15.21,49 32.88,18 41.38,18 23.71,49" fill="#3d66e8"/><polygon points="25.21,54 50.29,10 58.79,10 33.71,54 28.44,50.4" fill="#5b8cff"/><polygon points="50.29,10 58.79,10 45.16,19" fill="#1f3a9e"/></svg>', porcelain: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#e8edfc"/><polygon points="5.21,44 15.47,26 23.97,26 13.71,44" fill="#aebff3"/><polygon points="15.21,49 32.88,18 41.38,18 23.71,49" fill="#6d8bec"/><polygon points="25.21,54 50.29,10 58.79,10 33.71,54 28.44,50.4" fill="#2f54d4"/><polygon points="50.29,10 58.79,10 45.16,19" fill="#1d379b"/></svg>' };
        const icon = d => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
        const ICON = {
            minimize: icon('<path d="M6 12h12"/>'),
            theme: icon('<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/>'),
            refresh: icon('<path d="M20 11a8 8 0 0 0-14.9-3.9M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.9 3.9M20 20v-4h-4"/>'),
            silent: icon('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6M16 9l6 6"/>'),
            resume: icon('<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4 4.5v3.7h3.7"/><path d="M10.5 9.3v5.4l4.3-2.7z" fill="currentColor"/>'),
            remove: icon('<path d="M17 7 7 17M7 7l10 10"/>'),
            chevron: icon('<path d="m9 6 6 6-6 6"/>'),
        };
        const THEMES = {
            night: { name: '夜航', desc: '深色玻璃 · 发光光轨' },
            porcelain: { name: '青花', desc: '白釉钴蓝 · 毛笔进度' },
        };
        const STROKE = 'M2 9 C6 3.2 16 2.6 30 4.6 C96 6.4 206 5.8 300 6.2 C332 6.4 346 5.4 350 7.8 C351.6 10 342 11.6 320 11.1 C220 10.6 112 10.9 32 11.6 C16 12.1 5 12.6 2 9 Z';
        const brush = cls => `<svg class="brush ${cls}" viewBox="0 0 352 16" preserveAspectRatio="none" aria-hidden="true"><path d="${STROKE}"/></svg>`;
        const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
        const WAVE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='11'%3E%3Cpath d='M0 6 Q11 0 22 6 T44 6' fill='none' stroke='%231f3f97' stroke-width='1.1'/%3E%3C/svg%3E")`;
        const SERIF = '"Cambria", "Palatino Linotype", "Book Antiqua", "Iowan Old Style", "Times New Roman", serif';
        const THIN = '"Segoe UI Variable Display", "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif';
        const CSS = `
        :host { all: initial; }
        .xy { position: relative; color: var(--ink); font: 400 13px/1.5 var(--ui); -webkit-font-smoothing: antialiased; }
        .xy *, .xy *::before, .xy *::after { box-sizing: border-box; }
        button, input { margin: 0; font: inherit; color: inherit; }
        button { padding: 0; border: 0; background: none; cursor: pointer; }
        button:focus-visible, input:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
        svg { display: block; }
        [hidden] { display: none !important; }

        .xy[data-theme="night"] {
            color-scheme: dark;
            --ui: "Segoe UI Variable Text", "Segoe UI", -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif;
            --big: 200 64px/0.95 ${THIN};
            --ink: #eef3fb; --ink-2: #c3cddd; --muted: #8391a8; --faint: #5d6a82;
            --line: rgba(255, 255, 255, .08); --hover: rgba(255, 255, 255, .055); --icon: #9aa7bd; --focus: #6fd6ff;
            --accent: #6fd6ff; --ring-soft: rgba(111, 214, 255, .18); --link: #92b6ff; --label: #92b6ff; --alert: #ff6b7a;
            --urgent: #ff9a9a; --warn: #f1c27d; --waitc: #93a9cc; --good: #6ee0ad;
        }
        .xy[data-theme="porcelain"] {
            --ui: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei UI", "Microsoft YaHei", "Segoe UI", sans-serif;
            --big: 400 60px/1 ${SERIF};
            --ink: #14203d; --ink-2: #3c4864; --muted: #7b86a0; --faint: #a3acc0;
            --line: rgba(20, 32, 61, .09); --hover: rgba(31, 63, 151, .055); --icon: #56627f; --focus: #3559c7;
            --accent: #1f3f97; --ring-soft: rgba(31, 63, 151, .14); --link: #1f3f97; --label: #1f3f97; --alert: #b5372f;
            --urgent: #b5372f; --warn: #a8711c; --waitc: #5a74b0; --good: #2e7d62;
        }

        
        .ball { position: relative; display: block; width: ${BALL}px; height: ${BALL}px; border-radius: 15px; touch-action: none; user-select: none; transition: transform .2s cubic-bezier(.2, .8, .2, 1); }
        .ball:hover { transform: translateY(-2px); }
        
        .ball, .mark { background: center / cover no-repeat; }
        .xy[data-theme="night"] :is(.ball, .mark) { background-image: url("data:image/svg+xml,${encodeURIComponent(LOGO.night)}"); }
        .xy[data-theme="porcelain"] :is(.ball, .mark) { background-image: url("data:image/svg+xml,${encodeURIComponent(LOGO.porcelain)}"); }
        .ring { position: absolute; inset: -6px; padding: 2.5px; border-radius: 20px; opacity: 0; transition: opacity .3s;
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
        .ball.running .ring { opacity: 1; }
        .badge { position: absolute; left: 50%; bottom: -12px; transform: translateX(-50%); padding: 0 8px; border-radius: 99px; white-space: nowrap; font-size: 11px; font-weight: 600; line-height: 18px; }
        .badge:empty { display: none; }
        .dot { position: absolute; top: -4px; right: -4px; width: 11px; height: 11px; border-radius: 50%; background: var(--alert); box-shadow: 0 0 0 2px #fff; }
        .xy[data-theme="night"] .ball { box-shadow: 0 16px 30px -12px rgba(4, 10, 26, .75), 0 0 0 1px rgba(255, 255, 255, .5); }
        .xy[data-theme="night"] .ring { background: conic-gradient(#2f6bff, #6fd6ff calc(var(--p, 0) * 1turn), rgba(47, 107, 255, .2) 0); filter: drop-shadow(0 0 6px rgba(111, 214, 255, .55)); }
        .xy[data-theme="night"] .badge { background: rgba(10, 15, 24, .94); color: #fff; box-shadow: 0 0 0 1px rgba(255, 255, 255, .14); font-variant-numeric: tabular-nums; }
        .xy[data-theme="porcelain"] .ball { box-shadow: 0 14px 28px -14px rgba(20, 35, 85, .6), 0 0 0 1px rgba(255, 255, 255, .7); }
        .xy[data-theme="porcelain"] .ring { padding: 2px; background: conic-gradient(#1f3f97 calc(var(--p, 0) * 1turn), rgba(31, 63, 151, .14) 0); }
        .xy[data-theme="porcelain"] .badge { background: #fcfdfe; color: #1f3f97; font: 600 12px/18px ${SERIF}; font-variant-numeric: lining-nums tabular-nums; box-shadow: 0 0 0 1px rgba(31, 63, 151, .25); }

        
        .panel { position: relative; width: 400px; max-width: calc(100vw - ${EDGE * 2}px); max-height: calc(100vh - ${EDGE * 2}px); display: flex; flex-direction: column; overflow: hidden;
            transform-origin: var(--origin, top right); animation: xy-pop .22s cubic-bezier(.2, .8, .2, 1); }
        .panel > * { position: relative; }
        @keyframes xy-pop { from { opacity: 0; transform: scale(.96) translateY(-6px); } }
        .xy[data-theme="night"] .panel { border-radius: 22px; border: 1px solid rgba(255, 255, 255, .08);
            background: ${NOISE}, radial-gradient(130% 55% at -12% -8%, rgba(47, 107, 255, .46), transparent 58%), radial-gradient(70% 45% at 112% 4%, rgba(111, 214, 255, .17), transparent 62%), linear-gradient(180deg, #101a2b 0%, #0b121e 52%, #0a0f18 100%);
            box-shadow: 0 50px 90px -42px rgba(4, 10, 26, .9), 0 20px 44px -26px rgba(4, 10, 26, .6), inset 0 1px 0 rgba(255, 255, 255, .08); }
        .xy[data-theme="porcelain"] .panel { border-radius: 20px; border: 1px solid rgba(20, 32, 61, .08);
            background: radial-gradient(80% 42% at 100% 0%, rgba(59, 95, 208, .08), transparent 62%), #fcfdfe;
            box-shadow: 0 44px 80px -44px rgba(20, 35, 85, .55), 0 14px 32px -20px rgba(20, 35, 85, .3); }
        .xy[data-theme="porcelain"] .panel::before { content: ""; position: absolute; top: 0; right: 0; width: 250px; height: 190px; pointer-events: none; opacity: .2; background-image: ${WAVE};
            -webkit-mask-image: radial-gradient(farthest-side at 100% 0%, #000 25%, transparent); mask-image: radial-gradient(farthest-side at 100% 0%, #000 25%, transparent); }

        .head { display: flex; align-items: center; gap: 8px; padding: 14px 12px 2px 20px; cursor: grab; user-select: none; touch-action: none; }
        .head:active { cursor: grabbing; }
        .mark { width: 26px; height: 26px; flex: none; margin-right: 2px; border-radius: 8px; }
        .title { font-size: 13.5px; font-weight: 600; letter-spacing: .1em; white-space: nowrap; }
        
        .ver { color: var(--muted); font-size: 11.5px; letter-spacing: .04em; cursor: inherit; }
        .update { padding: 0 8px; border-radius: 99px; font-size: 11px; font-weight: 600; line-height: 18px; white-space: nowrap; }
        .sp { flex: 1; }
        .icon-btn { display: grid; place-items: center; flex: none; width: 30px; height: 30px; border-radius: 9px; color: var(--icon); transition: background .15s, color .15s; }
        .icon-btn:hover { background: var(--hover); color: var(--ink); }
        .icon-btn svg { width: 16px; height: 16px; }
        .xy[data-theme="night"] .mark { box-shadow: 0 0 0 1px rgba(255, 255, 255, .1); }
        .xy[data-theme="night"] .update { background: linear-gradient(135deg, #2f6bff, #4d8dff); color: #fff; }
        .xy[data-theme="porcelain"] .title { font-size: 14.5px; letter-spacing: .12em; }
        .xy[data-theme="porcelain"] .ver { font: italic 13.5px ${SERIF}; letter-spacing: 0; }
        .xy[data-theme="porcelain"] .mark { box-shadow: 0 6px 14px -6px rgba(20, 35, 85, .45); }
        .xy[data-theme="porcelain"] .update { background: #1f3f97; color: #fcfdfe; }

        
        .now { display: flex; flex-direction: column; padding: 16px 24px 20px; }
        .state { display: flex; align-items: center; gap: 8px; color: var(--label); font-size: 11.5px; letter-spacing: .3em; }
        .state::before { content: ""; width: 6px; height: 6px; flex: none; border-radius: 50%; background: currentColor; }
        .now[data-tone="idle"] .state { color: var(--muted); }
        .now[data-tone="warn"] .state { color: var(--warn); }
        .now[data-tone="wait"] .state { color: var(--waitc); }
        .now[data-tone="done"] .state { color: var(--good); }
        .now[data-tone="run"] .state::before, .now[data-tone="busy"] .state::before { animation: xy-breathe 1.8s ease-in-out infinite; }
        @keyframes xy-breathe { 50% { opacity: .35; } }
        .big-row { display: flex; align-items: baseline; gap: 10px; min-width: 0; margin-top: 12px; }
        .big { font: var(--big); letter-spacing: -.02em; white-space: nowrap; font-variant-numeric: lining-nums tabular-nums; }
        .unit { color: var(--muted); font-size: 12px; letter-spacing: .24em; white-space: nowrap; }
        .now-name { margin-top: 14px; font-size: 16px; font-weight: 500; line-height: 1.45; word-break: break-all; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .now-course { margin-top: 3px; color: var(--muted); font-size: 12.5px; }
        .bar { position: relative; margin-top: 18px; }
        .now-meta { display: flex; justify-content: space-between; gap: 12px; margin-top: 10px; color: var(--muted); font-size: 11.5px; letter-spacing: .04em; font-variant-numeric: lining-nums tabular-nums; }
        .brush { position: absolute; inset: 0; width: 100%; height: 100%; }
        .brush path { fill: #1f3f97; }
        .brush.track path { fill-opacity: .1; }
        .brush.ink { clip-path: inset(0 calc(100% - var(--p, 0) * 100%) 0 0); transition: clip-path .95s linear; }
        .xy[data-theme="night"] .big { color: #f5f8fd; text-shadow: 0 0 44px rgba(77, 141, 255, .4); }
        .xy[data-theme="night"] .now[data-tone="run"] .state::before { background: #6fd6ff; box-shadow: 0 0 0 4px rgba(111, 214, 255, .12), 0 0 14px #6fd6ff; }
        .xy[data-theme="night"] .bar { height: 2px; border-radius: 2px; background: rgba(255, 255, 255, .09); }
        .xy[data-theme="night"] .bar .brush { display: none; }
        .xy[data-theme="night"] .bar i { position: absolute; inset: 0 auto 0 0; width: calc(var(--p, 0) * 100%); border-radius: inherit; background: linear-gradient(90deg, #2f6bff, #6fd6ff); box-shadow: 0 0 10px rgba(111, 214, 255, .5); transition: width .95s linear; }
        .xy[data-theme="night"] .bar b { position: absolute; top: 50%; left: calc(var(--p, 0) * 100%); width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #fff;
            box-shadow: 0 0 0 3px rgba(111, 214, 255, .25), 0 0 16px #6fd6ff; transition: left .95s linear; }
        .xy[data-theme="porcelain"] .state { letter-spacing: .38em; }
        .xy[data-theme="porcelain"] .state::before { display: none; }
        .xy[data-theme="porcelain"] .big { color: #1f3f97; letter-spacing: .01em; }
        .xy[data-theme="porcelain"] .now-name { font-weight: 600; line-height: 1.5; }
        .xy[data-theme="porcelain"] .bar { height: 14px; margin-top: 16px; }
        .xy[data-theme="porcelain"] .bar i, .xy[data-theme="porcelain"] .bar b { display: none; }
        .xy[data-theme="porcelain"] .now-meta { margin-top: 6px; font: 13px ${SERIF}; letter-spacing: 0; font-variant-numeric: lining-nums tabular-nums; }

        
        .controls { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .ctl { display: flex; align-items: center; justify-content: center; gap: 7px; white-space: nowrap; font-size: 12.5px; transition: background .15s, border-color .15s, color .15s; }
        .ctl svg { width: 15px; height: 15px; flex: none; }
        .ctl em { width: 6px; height: 6px; flex: none; border-radius: 50%; }
        .ctl:disabled { cursor: progress; }
        .ctl:disabled svg { animation: xy-spin 1s linear infinite; }
        @keyframes xy-spin { to { transform: rotate(360deg); } }
        .xy[data-theme="night"] .controls { gap: 8px; padding: 0 16px 16px; }
        .xy[data-theme="night"] .ctl { height: 38px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, .06); background: rgba(255, 255, 255, .045); color: var(--ink-2); }
        .xy[data-theme="night"] .ctl:hover { background: rgba(255, 255, 255, .08); }
        .xy[data-theme="night"] .ctl svg { color: #92b6ff; }
        .xy[data-theme="night"] .ctl.primary { border-color: rgba(120, 170, 255, .35); background: linear-gradient(135deg, rgba(47, 107, 255, .92), rgba(47, 107, 255, .55)); color: #fff; box-shadow: 0 10px 24px -12px rgba(47, 107, 255, .85); }
        .xy[data-theme="night"] .ctl.primary:hover { background: linear-gradient(135deg, #3b77ff, rgba(47, 107, 255, .72)); }
        .xy[data-theme="night"] .ctl.primary svg { color: #fff; }
        .xy[data-theme="night"] .ctl em { background: rgba(255, 255, 255, .2); }
        .xy[data-theme="night"] .ctl[aria-pressed="true"] em { background: #6fd6ff; box-shadow: 0 0 10px #6fd6ff; }
        .xy[data-theme="porcelain"] .controls { margin: 2px 22px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .xy[data-theme="porcelain"] .ctl { height: 46px; color: var(--ink-2); font-size: 13px; }
        .xy[data-theme="porcelain"] .ctl + .ctl { border-left: 1px solid var(--line); }
        .xy[data-theme="porcelain"] .ctl:hover { background: rgba(31, 63, 151, .04); }
        .xy[data-theme="porcelain"] .ctl svg { color: #1f3f97; }
        .xy[data-theme="porcelain"] .ctl.primary { color: #1f3f97; font-weight: 600; }
        .xy[data-theme="porcelain"] .ctl em { width: 5px; height: 5px; background: #c3cad9; }
        .xy[data-theme="porcelain"] .ctl[aria-pressed="true"] em { background: #1f3f97; }

        
        .notice { display: flex; align-items: center; gap: 10px; font-size: 12.5px; }
        .notice.open { align-items: flex-start; }
        .notice-tag { flex: none; display: inline-flex; align-items: center; gap: 6px; padding-top: 1px; color: var(--label); font-size: 11px; letter-spacing: .24em; }
        .notice-tag.unread::after { content: ""; width: 5px; height: 5px; border-radius: 50%; background: var(--alert); }
        .notice-text { flex: 1; min-width: 0; overflow: hidden; color: var(--ink-2); text-overflow: ellipsis; white-space: nowrap; }
        .notice.open .notice-text { max-height: 168px; overflow: auto; white-space: pre-wrap; word-break: break-all; text-overflow: clip; }
        .link { flex: none; color: var(--link); font-size: 12px; }
        .link:hover { text-decoration: underline; text-underline-offset: 3px; }
        .link.muted { color: var(--muted); }
        .link.armed { color: var(--alert); }
        .xy[data-theme="night"] .notice { margin: 0 16px; padding: 11px 14px; border-radius: 12px; background: rgba(255, 255, 255, .04); }
        .xy[data-theme="porcelain"] .notice { margin: 16px 26px 0; font-size: 13px; }
        .xy[data-theme="porcelain"] .notice-tag { font-size: 11.5px; letter-spacing: .34em; }

        
        .list-head { display: flex; align-items: baseline; gap: 18px; padding: 20px 24px 6px; }
        .tab { position: relative; display: inline-flex; align-items: baseline; gap: 8px; padding-bottom: 5px; color: var(--muted); font-size: 11.5px; letter-spacing: .3em; transition: color .15s; }
        .tab b { color: var(--faint); font-size: 12px; font-weight: 400; letter-spacing: 0; font-variant-numeric: lining-nums tabular-nums; }
        .tab:hover { color: var(--ink-2); }
        .tab[aria-selected="true"] { color: var(--ink); }
        .tab[aria-selected="true"] b { color: var(--ink-2); }
        .tab[aria-selected="true"]::after { content: ""; position: absolute; left: 0; right: .3em; bottom: 0; height: 1.5px; border-radius: 1px; background: var(--accent); }
        .lh-tools { display: flex; align-items: baseline; gap: 12px; margin-left: auto; }
        .lh-tools .dur { color: var(--muted); font-size: 11.5px; }
        .lh-tools .dur input { width: 30px; }
        .synced { color: var(--faint); font-size: 11.5px; font-variant-numeric: tabular-nums; }
        .task-sub.good { color: var(--good); }
        .here-tag { flex: none; margin-left: 6px; padding: 0 6px; border-radius: 99px; color: var(--accent); font-size: 10.5px; line-height: 16px; letter-spacing: .1em; vertical-align: 1px; box-shadow: inset 0 0 0 1px var(--ring-soft); }
        .task.here { margin-bottom: 6px; }
        .now .stop { position: absolute; top: 14px; right: 22px; font-size: 12px; }
        
        .hang-mode { display: flex; align-items: center; gap: 10px; padding: 2px 24px 8px; color: var(--muted); font-size: 11.5px; }
        .hang-mode .dur { margin-left: auto; color: var(--muted); font-size: 11.5px; }
        .hang-mode .dur input { width: 30px; }
        .seg { display: inline-flex; padding: 2px; border-radius: 9px; box-shadow: inset 0 0 0 1px var(--line); }
        .seg button { padding: 2px 10px; border-radius: 7px; color: var(--muted); font-size: 12px; transition: background .15s, color .15s; }
        .seg button:hover { color: var(--ink-2); }
        .seg button[aria-pressed="true"] { background: var(--hover); color: var(--ink); }
        .xy[data-theme="porcelain"] .seg button[aria-pressed="true"] { color: #1f3f97; }
        .xy[data-theme="night"] .tab[aria-selected="true"]::after { box-shadow: 0 0 8px var(--accent); }
        .xy[data-theme="night"] .t-good .lead { background: var(--good); }
        .xy[data-theme="porcelain"] .tab { letter-spacing: .38em; }
        .xy[data-theme="porcelain"] .tab b { font: 13.5px ${SERIF}; font-variant-numeric: lining-nums tabular-nums; }
        .xy[data-theme="porcelain"] .tab[aria-selected="true"] { color: #1f3f97; }
        .list { flex: 1 1 auto; min-height: 96px; overflow: auto; padding: 0 12px 14px; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--line) transparent; }
        .group + .group { margin-top: 2px; }
        .group-head { display: flex; align-items: center; gap: 6px; width: 100%; padding: 10px 12px 4px; color: var(--ink-2); font-size: 12px; font-weight: 600; letter-spacing: .06em; text-align: left; }
        .group-head span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .group-head em { color: var(--faint); font-style: normal; font-weight: 400; font-variant-numeric: lining-nums tabular-nums; }
        .chev { display: grid; color: var(--faint); transition: transform .2s; }
        .chev svg { width: 11px; height: 11px; }
        .group:not(.folded) .chev { transform: rotate(90deg); }
        .group.folded .group-body { display: none; }
        .task { position: relative; display: flex; align-items: center; gap: 2px; padding-right: 6px; border-radius: 12px; transition: background .15s; }
        .task:hover { background: var(--hover); }
        .task-main { flex: 1; min-width: 0; display: flex; align-items: center; gap: 12px; padding: 10px 6px 10px 12px; border-radius: 12px; text-align: left; }
        .lead { flex: none; }
        .task-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .task-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13.5px; }
        .task-sub { margin-top: 2px; color: var(--muted); font-size: 11.5px; font-variant-numeric: tabular-nums; }
        .task-sub.urgent, .task-sub.bad { color: var(--urgent); }
        .task-sub.warn { color: var(--warn); }
        .task-sub.wait { color: var(--waitc); }
        .task-sub.off, .task.off .task-name { color: var(--faint); }
        .dur { display: flex; align-items: baseline; gap: 2px; flex: none; color: var(--faint); font-size: 11px; }
        .dur input { width: 38px; padding: 2px 0; border: 0; border-bottom: 1px dashed transparent; background: transparent; outline: none; text-align: right;
            color: var(--ink-2); font-size: 12.5px; font-variant-numeric: lining-nums tabular-nums; }
        .dur input:hover { border-bottom-color: var(--faint); }
        .dur input:focus { border-bottom: 1px solid var(--accent); color: var(--ink); }
        .dur input.auto { color: var(--faint); }
        .dur input::placeholder { color: var(--faint); }
        .dur input:placeholder-shown + span { display: none; }
        .remove { width: 26px; height: 26px; color: var(--faint); opacity: 0; }
        .task:hover .remove, .remove:focus-visible { opacity: 1; }
        .remove:hover { color: var(--urgent); }
        .empty { padding: 26px 16px 30px; color: var(--muted); font-size: 12.5px; text-align: center; }
        .empty b { display: block; margin-bottom: 3px; color: var(--ink-2); font-size: 13px; font-weight: 600; }
        
        .xy[data-theme="night"] .lead { width: 7px; height: 7px; border-radius: 50%; background: #4d6a99; font-size: 0; }
        .xy[data-theme="night"] .t-urgent .lead, .xy[data-theme="night"] .t-bad .lead { background: #ff8b8b; }
        .xy[data-theme="night"] .t-warn .lead { background: #f1b45c; }
        .xy[data-theme="night"] .t-wait .lead { background: transparent; box-shadow: inset 0 0 0 1.5px #6b84ad; }
        .xy[data-theme="night"] .t-off .lead { background: #3a4558; }
        .xy[data-theme="night"] .task-name { color: #e3e9f3; }
        .xy[data-theme="night"] .task.active { background: linear-gradient(90deg, rgba(47, 107, 255, .3), rgba(47, 107, 255, .12) calc(var(--p, 0) * 100%), rgba(255, 255, 255, .035) calc(var(--p, 0) * 100%)); }
        .xy[data-theme="night"] .task.active .lead { background: #6fd6ff; box-shadow: 0 0 10px #6fd6ff; }
        .xy[data-theme="night"] .task.active .task-name { color: #fff; }
        
        .xy[data-theme="porcelain"] .list-head { padding: 22px 26px 8px; }
        .xy[data-theme="porcelain"] .list { padding: 0 14px 16px; }
        .xy[data-theme="porcelain"] .group-head { width: calc(100% - 24px); margin: 0 12px; padding: 10px 0 6px; font-size: 12.5px; letter-spacing: .08em; }
        .xy[data-theme="porcelain"] .group + .group .group-head { border-top: 1px solid var(--line); }
        .xy[data-theme="porcelain"] .group-head em { font: 13px ${SERIF}; }
        .xy[data-theme="porcelain"] .task-main { gap: 10px; }
        .xy[data-theme="porcelain"] .lead { width: 22px; color: #1f3f97; opacity: .5; font: 15px/1 ${SERIF}; font-variant-numeric: lining-nums tabular-nums; }
        .xy[data-theme="porcelain"] .dur input { font: 14px ${SERIF}; font-variant-numeric: lining-nums tabular-nums; }
        .xy[data-theme="porcelain"] .dur input.auto, .xy[data-theme="porcelain"] .dur input:placeholder-shown { font: 11.5px var(--ui); }
        .xy[data-theme="porcelain"] .task.active { background: rgba(31, 63, 151, .065); }
        .xy[data-theme="porcelain"] .task.active .lead { opacity: 1; }
        .xy[data-theme="porcelain"] .task.active .task-name { color: #1f3f97; font-weight: 600; }
        .xy[data-theme="porcelain"] .task.active::after { content: ""; position: absolute; left: 44px; bottom: 5px; width: calc((100% - 120px) * var(--p, 0)); height: 1.5px; border-radius: 1px; background: #1f3f97; transition: width .95s linear; }

        
        .ob { padding-bottom: 22px; }
        .ob-body { display: flex; flex-direction: column; gap: 14px; padding: 14px 24px 0; }
        .ob-step { color: var(--label); font-size: 11.5px; letter-spacing: .3em; }
        .ob-title { margin: 0; font-size: 22px; line-height: 1.35; letter-spacing: .04em; }
        .ob-desc { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.7; }
        .ob-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 2px; }
        .ob-card { display: flex; flex-direction: column; gap: 9px; padding: 8px 8px 12px; border: 1px solid var(--line); border-radius: 16px; text-align: left; transition: border-color .2s, box-shadow .2s, transform .2s; }
        .ob-card:hover { transform: translateY(-2px); }
        .ob-card[aria-pressed="true"] { border-color: var(--accent); box-shadow: 0 0 0 3px var(--ring-soft); }
        .ob-card b { padding: 0 4px; font-size: 14px; font-weight: 600; letter-spacing: .12em; }
        .ob-card small { margin-top: -5px; padding: 0 4px; color: var(--muted); font-size: 11.5px; }
        .ob-preview { position: relative; display: flex; flex-direction: column; justify-content: center; gap: 6px; height: 112px; padding: 14px; overflow: hidden; border-radius: 10px; }
        .ob-preview .pl { font-size: 9.5px; letter-spacing: .3em; }
        .ob-preview .pb { font-size: 34px; line-height: 1; font-variant-numeric: lining-nums tabular-nums; }
        .ob-preview .pr { position: relative; height: 10px; margin-top: 2px; }
        .ob-preview.night { background: radial-gradient(120% 70% at 0% 0%, rgba(47, 107, 255, .5), transparent 60%), linear-gradient(180deg, #101a2b, #0a0f18); color: #f5f8fd; }
        .ob-preview.night .pl { color: #92b6ff; }
        .ob-preview.night .pb { font-family: ${THIN}; font-weight: 200; text-shadow: 0 0 24px rgba(77, 141, 255, .5); }
        .ob-preview.night .pr::before, .ob-preview.night .pr::after { content: ""; position: absolute; left: 0; top: 4px; height: 2px; border-radius: 2px; }
        .ob-preview.night .pr::before { right: 0; background: rgba(255, 255, 255, .1); }
        .ob-preview.night .pr::after { width: 46%; background: linear-gradient(90deg, #2f6bff, #6fd6ff); box-shadow: 0 0 8px #6fd6ff; }
        .ob-preview.porcelain { background: radial-gradient(90% 60% at 100% 0%, rgba(59, 95, 208, .1), transparent 62%), #fcfdfe; color: #1f3f97; box-shadow: inset 0 0 0 1px rgba(20, 32, 61, .08); }
        .ob-preview.porcelain::before { content: ""; position: absolute; top: 0; right: 0; width: 120px; height: 90px; opacity: .22; background-image: ${WAVE};
            -webkit-mask-image: radial-gradient(farthest-side at 100% 0%, #000 20%, transparent); mask-image: radial-gradient(farthest-side at 100% 0%, #000 20%, transparent); }
        .ob-preview.porcelain .pb { font-family: ${SERIF}; }
        .ob-actions { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 4px; }
        .ob-next { height: 40px; padding: 0 22px; border-radius: 12px; font-size: 13.5px; font-weight: 600; letter-spacing: .08em; }
        .ob-list { display: flex; flex-direction: column; gap: 14px; margin: 2px 0 0; padding: 0; list-style: none; }
        .ob-list li { display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: 12px; align-items: start; }
        .ob-list i { font: var(--big); font-size: 30px; font-style: normal; line-height: 1; text-align: center; font-variant-numeric: lining-nums; }
        .ob-list b { display: block; font-size: 14px; font-weight: 600; }
        .ob-list span { color: var(--muted); font-size: 12.5px; line-height: 1.65; }
        .xy[data-theme="night"] .ob-title { font-weight: 300; }
        .xy[data-theme="night"] .ob-next { background: linear-gradient(135deg, #2f6bff, #4d8dff); color: #fff; box-shadow: 0 12px 26px -12px rgba(47, 107, 255, .9); }
        .xy[data-theme="night"] .ob-list i { color: #f5f8fd; text-shadow: 0 0 20px rgba(77, 141, 255, .55); }
        .xy[data-theme="porcelain"] .ob-step { letter-spacing: .38em; }
        .xy[data-theme="porcelain"] .ob-title { font-weight: 600; }
        .xy[data-theme="porcelain"] .ob-next { background: #1f3f97; color: #fcfdfe; box-shadow: 0 12px 26px -14px rgba(31, 63, 151, .7); }
        .xy[data-theme="porcelain"] .ob-list i { color: #1f3f97; }

        
        .flash { position: absolute; z-index: 1; width: max-content; max-width: 300px; padding: 9px 14px; border-radius: 12px; font-size: 12.5px; line-height: 1.5; animation: xy-fade .2s ease-out; }
        @keyframes xy-fade { from { opacity: 0; } }
        .xy.open .flash { left: 50%; translate: -50% 0; }
        .xy.open[data-flash="below"] .flash { top: calc(100% + 10px); }
        .xy.open[data-flash="above"] .flash { bottom: calc(100% + 10px); }
        .xy.open[data-flash="inside"] .flash { bottom: 14px; }
        .xy:not(.open) .flash { top: 10px; right: calc(100% + 14px); }
        .xy.left:not(.open) .flash { right: auto; left: calc(100% + 14px); }
        .xy[data-theme="night"] .flash { background: rgba(12, 18, 30, .96); color: #eef3fb; box-shadow: 0 16px 34px -14px rgba(0, 0, 0, .6), 0 0 0 1px rgba(255, 255, 255, .08); }
        .xy[data-theme="porcelain"] .flash { background: #14203d; color: #fcfdfe; box-shadow: 0 16px 34px -14px rgba(20, 35, 85, .55); }
        @media (prefers-reduced-motion: reduce) {
            .xy *, .xy *::before, .xy *::after { animation: none !important; transition: none !important; }
        }
        `;
        const host = document.createElement('div');
        host.style.cssText = 'position:fixed;z-index:2147483000;left:0;top:0;';
        const shadow = host.attachShadow({ mode: 'closed' });
        shadow.innerHTML = `<style>${CSS}</style><div class="xy"></div>`;
        const root = shadow.querySelector('.xy');
        document.body.appendChild(host);
        function countdown(at) {
            const sec = Math.max(0, (at - Date.now()) / 1000);
            return sec >= 86400 ? `${Math.floor(sec / 86400)} 天` : clock(sec);
        }
        function nowView() {
            const r = run;
            const base = { pct: 0, bar: false, metaL: '', metaR: '', badge: '' };
            if (!r) {
                const tab = ui.tab === 'hang' ? 'hang' : 'task';
                if (idleNote && idleNote.tab === tab) {
                    return Object.assign(base, { tone: 'done', label: idleNote.label, big: idleNote.big || String(tasks.length), unit: idleNote.unit || (tasks.length ? '个需要处理' : '个待完成'), name: idleNote.name, course: idleNote.meta });
                }
                if (tab === 'hang') {
                    return Object.assign(base, { tone: 'idle', label: '待机中', big: String(hangCourses().filter(hangable).length), unit: '门课要挂',
                        name: page().nodeId ? '点一门课开始，或者只挂这一页' : '点一门课开始挂时长', course: `每门默认挂 ${hang.def} 分钟，挂够自动换下一门` });
                }
                const nodeId = page().nodeId, here = nodeId && tasks.find(t => t.nodeId === nodeId);
                const [name, course] = !tasks.length ? ['先获取任务列表', '点「刷新任务」获取所有未完成的观看任务']
                    : here && here.failed ? ['这个任务未确认完成', '在下面的列表里点它重试']
                    : nodeId && !here ? ['这个页面不在任务列表里', '在下面的列表里点一个任务开始']
                    : ['在下面的列表里点一个任务开始', '完成后会自动打开下一个任务'];
                return Object.assign(base, { tone: 'idle', label: '待机中', big: String(tasks.length), unit: '个待完成', name, course });
            }
            const t = r.task;
            if (r.mode === 'hang') {
                const on = r.on, list = hangCourses(), left = Math.max(0, r.total - r.done);
                const label = { loading: '正在加载', buffering: '正在缓冲', locked: '等待开始', resuming: '已暂停，正在恢复', paused: '已暂停', blocked: '等待播放' }[r.phase] || '正在挂时长';
                const course = r.phase === 'paused' ? '「恢复播放」已关闭，点视频的播放键继续'
                    : r.phase === 'blocked' ? '浏览器拦截了自动播放，点一下视频就能继续'
                    : on.mode === 'page' ? `${on.groupName || '这门课'} · 只挂这一页`
                    : `${on.groupName} · 第 ${list.findIndex(g => g.id === on.groupId) + 1}/${list.length} 门${rotating(on) ? ` · 第 ${(hc(on.groupId).at || 0) % hc(on.groupId).count + 1}/${hc(on.groupId).count} 个文件` : ''}`;
                const tone = ['playing', 'buffering', 'counting'].includes(r.phase) ? 'run' : r.phase === 'loading' ? 'busy' : r.phase === 'locked' ? 'wait' : 'warn';
                return Object.assign(base, { tone, label, big: r.total ? clock(left) : '--:--', unit: r.total ? '剩余' : '', name: on.name, course,
                    pct: r.total ? Math.min(1, r.done / r.total) : 0, bar: true, metaL: `已挂 ${clock(r.done)}`, badge: clock(left),
                    metaR: rotating(on) ? `这个文件还剩 ${clock(Math.max(0, hang.each * 60 - on.since))}` : `目标 ${Math.round(r.total / 60)} 分钟` });
            }
            if (r.mode === 'wait') {
                return Object.assign(base, { tone: 'wait', label: '等待下一个任务', big: countdown(t.start), unit: '后开始', name: t.name, course: `${t.groupName} · ${dayText(t.start)} 开始，到点自动打开`, badge: '等待' });
            }
            const known = r.total > 0, left = Math.max(0, r.total - r.done);
            const progress = {
                pct: known ? Math.min(1, r.done / r.total) : 0,
                bar: true,
                big: known ? clock(left) : '--:--',
                unit: known ? '剩余' : '',
                name: t.name,
                course: t.groupName,
                metaL: known ? `${t.kind === 'video' ? '已看' : '已停留'} ${clock(r.done)}` : '',
                metaR: known ? `共 ${clock(r.total)}` : '',
                badge: known ? clock(left) : '',
            };
            switch (r.phase) {
                case 'locked':
                    return Object.assign(base, { tone: 'wait', label: '等待开始', big: r.startAt ? countdown(r.startAt) : '--:--', unit: r.startAt ? '后开始' : '', name: t.name, course: r.startAt ? `${dayText(r.startAt)} 开始，到点自动开始` : '任务还没有开始', badge: '等待' });
                case 'loading':
                    return Object.assign(base, { tone: 'busy', label: '正在加载视频', big: '--:--', unit: '', name: t.name, course: t.groupName });
                case 'playing':
                    return Object.assign(base, progress, { tone: 'run', label: '正在播放' });
                case 'buffering':
                    return Object.assign(base, progress, { tone: 'run', label: '正在缓冲' });
                case 'resuming':
                    return Object.assign(base, progress, { tone: 'warn', label: '已暂停，正在恢复', badge: '暂停' });
                case 'paused':
                    return Object.assign(base, progress, { tone: 'warn', label: '已暂停', course: '「恢复播放」已关闭，点视频的播放键继续', badge: '暂停' });
                case 'blocked':
                    return Object.assign(base, progress, { tone: 'warn', label: '等待播放', course: '浏览器拦截了自动播放，点一下视频就能继续', badge: '暂停' });
                case 'counting':
                    return Object.assign(base, progress, { tone: 'run', label: '正在计时' });
                case 'nodur':
                    return Object.assign(base, { tone: 'warn', label: '缺少观看时长', big: '--:--', unit: '', name: t.name, course: '在列表里给它填写分钟数后开始计时' });
                default:
                    return Object.assign(base, { tone: 'busy', label: '正在确认完成', big: '0:00', unit: '', name: t.name, course: '向平台确认任务状态，确认后打开下一个', pct: 1, bar: true, badge: '确认' });
            }
        }
        function taskSub(t, now) {
            if (t.blocked) return ['缺少资源 ID，无法自动打开', 'bad'];
            if (t.failed) return ['未确认完成，点击重试', 'bad'];
            const state = taskState(t, now);
            if (state === 'expired') return ['已截止', 'off'];
            if (state === 'late') return ['已截止 · 可补交', 'warn'];
            if (state === 'locked') return [`${dayText(t.start)} 开始`, 'wait'];
            if (t.kind === 'doc' && !t.custom && !t.minutes) return ['缺少观看时长，请填写分钟数', 'bad'];
            if (!t.end) return ['没有截止时间', ''];
            const hours = (t.end - now) / 3600000;
            return [`${dayText(t.end)} 截止`, hours < 24 ? 'urgent' : hours < 72 ? 'warn' : ''];
        }
        const minutesText = sec => String(Math.round(sec / 6) / 10);
        function taskHTML(t, now, order) {
            const [sub, tone] = taskSub(t, now);
            const active = run && run.task.nodeId === t.nodeId;
            const auto = t.kind === 'video' ? t.length : t.minutes ? t.minutes * 60 : null;
            const value = t.custom ? minutesText(t.custom) : auto ? minutesText(auto) : '';
            const id = esc(t.nodeId);
            return `<div class="task t-${tone || 'plain'}${active ? ' active' : ''}${taskState(t, now) === 'expired' ? ' off' : ''}" data-id="${id}" data-kind="${t.kind}">
                <button class="task-main" data-act="open" data-id="${id}" title="${esc(t.name)}">
                    <span class="lead">${pad(order)}</span>
                    <span class="task-text"><span class="task-name">${esc(t.name)}</span><span class="task-sub ${tone}">${esc(sub)}</span></span>
                </button>
                <label class="dur" title="观看时长（分钟）。清空后恢复自动：视频播完为止，文档按老师要求的时长">
                    <input class="${t.custom ? '' : 'auto'}" data-id="${id}" value="${value}" placeholder="${t.kind === 'video' ? '自动' : '填写'}" inputmode="decimal" aria-label="观看时长（分钟）"><span>分</span>
                </label>
                <button class="icon-btn remove" data-act="remove" data-id="${id}" title="移出列表" aria-label="移出列表">${ICON.remove}</button>
            </div>`;
        }
        function listHTML() {
            if (!tasks.length) {
                return loading
                    ? '<div class="empty"><b>正在获取任务…</b>首页获取全部课程，课程页只更新这门课</div>'
                    : '<div class="empty"><b>没有待完成的观看任务</b>点「刷新任务」重新获取</div>';
            }
            const now = Date.now(), groups = [];
            for (const t of tasks) {
                const last = groups[groups.length - 1];
                if (last && last.id === t.groupId) last.items.push(t);
                else groups.push({ id: t.groupId, name: t.groupName, items: [t] });
            }
            let order = 0;
            return groups.map(g => `<section class="group${ui.folded.includes(g.id) ? ' folded' : ''}">
                <button class="group-head" data-act="fold" data-id="${esc(g.id)}"><i class="chev">${ICON.chevron}</i><span>${esc(g.name)}</span><em>${g.items.length}</em></button>
                <div class="group-body">${g.items.map(t => taskHTML(t, now, ++order)).join('')}</div>
            </section>`).join('');
        }
        const rotating = on => on.mode === 'course' && hang.mode === 'rotate' && hc(on.groupId).count > 0;
        function hangSub(g) {
            const c = hc(g.id), goal = hangGoal(g.id), min = s => Math.floor(s / 60);
            const nth = hang.mode === 'rotate' && c.count ? ` · 第 ${(c.at || 0) % c.count + 1}/${c.count} 个文件` : '';
            if (c.pick === false) return ['这门课没有视频或文档，跳过', 'off'];
            if (!goal) return ['不挂这门', 'off'];
            if (c.done >= goal) return [`已挂够 ${min(goal)} 分钟`, 'good'];
            if (run && run.mode === 'hang' && run.on.mode === 'course' && run.on.groupId === g.id) return [`正在挂 · ${c.pick.name}${nth}`, ''];
            if (!c.done) return [c.pick ? `还没挂 · ${c.pick.name}` : '还没挂', ''];
            return [`已挂 ${min(c.done)} / ${min(goal)} 分钟${nth}`, ''];
        }
        function hangRowHTML(g, order) {
            const c = hc(g.id), [sub, tone] = hangSub(g), id = esc(g.id);
            const active = run && run.mode === 'hang' && run.on.mode === 'course' && run.on.groupId === g.id;
            return `<div class="task t-${tone || 'plain'}${active ? ' active' : ''}${tone === 'off' ? ' off' : ''}">
                <button class="task-main" data-act="hang" data-id="${id}" title="从这门课开始挂，挂够自动换下一门">
                    <span class="lead">${pad(order)}</span>
                    <span class="task-text"><span class="task-name">${esc(g.name)}</span><span class="task-sub ${tone}">${esc(sub)}</span></span>
                </button>
                <label class="dur" title="这门课挂多少分钟。清空恢复默认，填 0 不挂">
                    <input class="${c.target === null ? 'auto' : ''}" data-hang="${id}" value="${c.target === null ? '' : c.target}" placeholder="${hang.def}" inputmode="numeric" aria-label="挂机分钟数"><span>分</span>
                </label>
                <button class="icon-btn remove" data-act="hang-hide" data-id="${id}" title="移出列表，点「刷新课程」会回来" aria-label="移出列表">${ICON.remove}</button>
            </div>`;
        }
        function hereRowHTML() {
            const p = page();
            if (!p.nodeId || (hang.on && hang.on.mode === 'course' && hang.on.nodeId === p.nodeId)) return '';
            const active = run && run.mode === 'hang' && run.on.mode === 'page';
            const name = active ? run.on.name : here && here.nodeId === p.nodeId ? here.name : '这一页';
            const g = hang.list.find(x => x.id === p.groupId);
            return `<div class="task here${active ? ' active' : ''}">
                <button class="task-main" data-act="hang-here" title="只挂这一页，挂够就停">
                    <span class="lead">·</span>
                    <span class="task-text"><span class="task-name">${esc(name)}<span class="here-tag">本页</span></span><span class="task-sub">只挂这一页${g ? ` · ${esc(g.name)}` : ''}</span></span>
                </button>
                <label class="dur" title="这一页挂多少分钟，清空恢复默认">
                    <input class="${hang.pageMin === null ? 'auto' : ''}" data-hang="page" value="${hang.pageMin === null ? '' : hang.pageMin}" placeholder="${hang.def}" inputmode="numeric" aria-label="这一页挂多少分钟"><span>分</span>
                </label>
                <span class="remove"></span>
            </div>`;
        }
        function hangListHTML() {
            const list = hangCourses();
            const body = list.length ? `<section class="group"><div class="group-body">${list.map((g, i) => hangRowHTML(g, i + 1)).join('')}</div></section>`
                : hangLoading ? '<div class="empty"><b>正在获取课程…</b>取的是本学期正在上的课</div>'
                : '<div class="empty"><b>还没有课程</b>点「刷新课程」获取本学期正在上的课</div>';
            return hereRowHTML() + body;
        }
        const headHTML = extra => `<header class="head" data-drag>
            <span class="mark"></span><span class="title">小雅自动刷</span><button class="ver" data-act="log">v${VERSION}</button>${extra}
            <button class="icon-btn" data-act="close" title="收起面板" aria-label="收起面板">${ICON.minimize}</button>
        </header>`;
        function panelHTML() {
            const update = hasUpdate();
            const other = THEMES[ui.theme === 'night' ? 'porcelain' : 'night'];
            const showNoticeToggle = notice && !notice.error && notice.content !== '暂无公告';
            const hangTab = ui.tab === 'hang', busy = hangTab ? hangLoading : loading;
            const refreshTitle = hangTab ? '获取本学期正在上的课' : page().groupId ? '在课程页只更新这门课的任务' : '获取所有课程的未完成观看任务';
            return `<div class="panel">
                ${headHTML(`${update ? `<span class="update" title="在脚本猫里检查更新即可升级">v${esc(notice.version)} 可用</span>` : ''}<span class="sp"></span>
                    <button class="icon-btn" data-act="theme" title="切换到「${other.name}」风格" aria-label="切换到${other.name}风格">${ICON.theme}</button>`)}
                <section class="now" data-tone="idle">
                    <div class="state"></div>
                    <div class="big-row"><span class="big"></span><span class="unit"></span></div>
                    <div class="now-name"></div>
                    <div class="now-course"></div>
                    <div class="bar" hidden>${brush('track')}${brush('ink')}<i></i><b></b></div>
                    <div class="now-meta" hidden><span></span><span></span></div>
                    <button class="link muted stop" data-act="hang-stop" hidden>停止</button>
                </section>
                <div class="controls">
                    <button class="ctl primary" data-act="refresh" ${busy ? 'disabled' : ''} title="${refreshTitle}">${ICON.refresh}<span>${busy ? '正在获取' : hangTab ? '刷新课程' : '刷新任务'}</span></button>
                    <button class="ctl" data-act="silent" aria-pressed="${silent}" title="拦截视频的声音，视频照常播放">${ICON.silent}<span>拦截声音</span><em></em></button>
                    <button class="ctl" data-act="resume" aria-pressed="${autoResume}" title="视频被暂停后自动继续播放">${ICON.resume}<span>恢复播放</span><em></em></button>
                </div>
                <div class="notice${noticeOpen ? ' open' : ''}">
                    <span class="notice-tag${noticeUnread() ? ' unread' : ''}">公告</span>
                    <span class="notice-text">${esc(!notice ? '正在加载公告…' : noticeOpen ? notice.content : firstLine(notice.content))}</span>
                    ${showNoticeToggle ? `<button class="link" data-act="notice">${noticeOpen ? '收起' : '展开'}</button>` : ''}
                </div>
                <div class="list-head" role="tablist">
                    <button class="tab" role="tab" data-act="tab" data-id="task" aria-selected="${!hangTab}">待完成<b>${tasks.length}</b></button>
                    <button class="tab" role="tab" data-act="tab" data-id="hang" aria-selected="${hangTab}">挂时长<b>${hangCourses().length}</b></button>
                    <span class="lh-tools">${hangTab
                        ? `<label class="dur" title="每门课默认挂多少分钟">每门<input data-hang-def value="${hang.def}" inputmode="numeric" aria-label="每门课默认挂多少分钟"><span>分</span></label>
                            <button class="link ${resetArmed ? 'armed' : 'muted'}" data-act="hang-reset" title="把所有课程的已挂时长清零">${resetArmed ? '再点一次重置' : '重置'}</button>`
                        : `<span class="synced">${fetchedAt ? `${dayText(fetchedAt)} 更新` : ''}</span>
                            ${tasks.length ? `<button class="link ${clearArmed ? 'armed' : 'muted'}" data-act="clear">${clearArmed ? '再点一次清空' : '清空'}</button>` : ''}`}</span>
                </div>
                ${hangTab ? `<div class="hang-mode"><span>挂法</span>
                    <span class="seg" role="group" aria-label="挂法">
                        <button data-act="hang-mode" data-id="one" aria-pressed="${hang.mode !== 'rotate'}" title="一门课只挂一个视频或文件，挂满这门课的时长">一个挂到底</button>
                        <button data-act="hang-mode" data-id="rotate" aria-pressed="${hang.mode === 'rotate'}" title="按目录顺序，每个文件挂一会儿就换下一个，挂满这门课的时长为止">轮流挂</button>
                    </span>
                    ${hang.mode === 'rotate' ? `<label class="dur" title="轮流挂时每个文件挂多少分钟">每个文件<input data-hang-each value="${hang.each}" inputmode="numeric" aria-label="每个文件挂多少分钟"><span>分</span></label>` : ''}
                </div>` : ''}
                <div class="list">${hangTab ? hangListHTML() : listHTML()}</div>
            </div>`;
        }
        function onboardingHTML() {
            const body = obStep === 1
                ? `<div class="ob-step">第 1 步 · 共 2 步</div>
                    <h2 class="ob-title">选一个面板风格</h2>
                    <p class="ob-desc">两种风格功能完全一样。选好之后，随时可以点面板右上角的半圆按钮切换。</p>
                    <div class="ob-cards">${Object.entries(THEMES).map(([id, t]) => `
                        <button class="ob-card" data-act="pick" data-id="${id}" aria-pressed="${obPick === id}">
                            <span class="ob-preview ${id}"><span class="pl">正在播放</span><span class="pb">12:34</span><span class="pr" style="--p:.46">${id === 'porcelain' ? brush('track') + brush('ink') : ''}</span></span>
                            <b>${t.name}</b><small>${t.desc}</small>
                        </button>`).join('')}
                    </div>
                    <div class="ob-actions"><span></span><button class="ob-next" data-act="ob-next">下一步</button></div>`
                : `<div class="ob-step">第 2 步 · 共 2 步</div>
                    <h2 class="ob-title">它会这样帮你刷课</h2>
                    <ol class="ob-list">
                        <li><i>1</i><div><b>点一个任务</b><span>在首页会自动列出所有未完成的观看任务，点任意一个开始。</span></div></li>
                        <li><i>2</i><div><b>自动往下刷</b><span>视频播完、文档看够老师要求的时长，向平台确认完成后，自动打开下一个。</span></div></li>
                        <li><i>3</i><div><b>放着就行</b><span>收起成小球后，外圈是进度，下方是剩余时间。</span></div></li>
                    </ol>
                    <div class="ob-actions"><button class="link muted" data-act="ob-back">上一步</button><button class="ob-next" data-act="ob-done">开始使用</button></div>`;
            return `<div class="panel ob">${headHTML('<span class="sp"></span>')}<div class="ob-body">${body}</div></div>`;
        }
        function ballHTML() {
            const dot = noticeUnread() || hasUpdate() || !ui.theme;
            return `<button class="ball" data-act="expand" data-drag title="小雅自动刷" aria-label="打开小雅自动刷面板">
                <span class="ring"></span>${dot ? '<span class="dot"></span>' : ''}<span class="badge"></span>
            </button>`;
        }
        const tpl = document.createElement('template');
        function render() {
            root.dataset.theme = ui.theme || obPick;
            root.classList.toggle('open', ui.open);
            tpl.innerHTML = (ui.open ? (ui.theme ? panelHTML() : onboardingHTML()) : ballHTML())
                + (flashText ? `<div class="flash" role="status">${esc(flashText)}</div>` : '');
            const opening = !root.querySelector('.panel');
            patch(root, tpl.content);
            paint();
            place(opening);
        }
        function patch(parent, next) {
            const now = parent.childNodes, want = next.childNodes;
            for (let i = 0; i < want.length; i++) {
                const a = now[i], b = want[i];
                if (!a) parent.appendChild(b.cloneNode(true));
                else if (a.nodeName !== b.nodeName) parent.replaceChild(b.cloneNode(true), a);
                else if (a.nodeType !== 1) {
                    if (a.nodeValue !== b.nodeValue) a.nodeValue = b.nodeValue;
                } else {
                    for (const { name } of [...a.attributes]) if (!b.hasAttribute(name)) a.removeAttribute(name);
                    for (const { name, value } of b.attributes) if (a.getAttribute(name) !== value) a.setAttribute(name, value);
                    if (a.tagName === 'INPUT' && a !== shadow.activeElement && a.value !== b.value) a.value = b.value;
                    patch(a, b);
                }
            }
            while (now.length > want.length) parent.lastChild.remove();
        }
        function paint() {
            const v = nowView();
            const card = root.querySelector('.now');
            if (card) {
                card.dataset.tone = v.tone;
                card.style.setProperty('--p', v.pct);
                card.querySelector('.state').textContent = v.label;
                card.querySelector('.big').textContent = v.big;
                card.querySelector('.unit').textContent = v.unit;
                card.querySelector('.now-name').textContent = v.name;
                card.querySelector('.now-course').textContent = v.course;
                card.querySelector('.bar').hidden = !v.bar;
                card.querySelector('.stop').hidden = !(run && run.mode === 'hang');
                const meta = card.querySelector('.now-meta');
                meta.hidden = !v.metaL && !v.metaR;
                meta.children[0].textContent = v.metaL;
                meta.children[1].textContent = v.metaR;
            }
            const active = root.querySelector('.task.active');
            if (active) active.style.setProperty('--p', run && run.mode !== 'wait' ? v.pct : 0);
            const ball = root.querySelector('.ball');
            if (ball) {
                ball.classList.toggle('running', !!run);
                ball.style.setProperty('--p', run && run.mode !== 'wait' ? v.pct : 0);
                ball.querySelector('.badge').textContent = run ? v.badge : '';
                ball.title = `小雅自动刷 · ${v.label}`;
            }
        }
        function flash(text) {
            flashText = text;
            clearTimeout(flashTimer);
            flashTimer = setTimeout(() => { flashText = ''; render(); }, 4200);
            render();
        }
        function place(anchor) {
            if (dragging) return;
            const w = window.innerWidth, h = window.innerHeight;
            const x = clamp(ui.x === null ? w - BALL - 24 : ui.x, EDGE, w - BALL - EDGE);
            const y = clamp(ui.y === null ? Math.round(h * 0.22) : ui.y, EDGE, h - BALL - EDGE);
            const toLeft = x + BALL / 2 > w / 2;
            root.classList.toggle('left', !toLeft);
            const panel = root.querySelector('.panel');
            if (!panel) {
                host.style.left = `${x}px`;
                host.style.top = `${y}px`;
                return;
            }
            const pw = panel.offsetWidth;
            if (anchor) panel.style.maxHeight = '';
            let top = anchor ? clamp(y, EDGE, h - panel.offsetHeight - EDGE) : parseFloat(host.style.top);
            panel.style.maxHeight = `${h - top - EDGE}px`;
            const cut = panel.scrollHeight - panel.clientHeight;
            if (cut > 1) {
                top = Math.max(EDGE, top - cut);
                panel.style.maxHeight = `${h - top - EDGE}px`;
            }
            host.style.left = `${clamp(toLeft ? x + BALL - pw : x, EDGE, w - pw - EDGE)}px`;
            host.style.top = `${top}px`;
            const ph = panel.offsetHeight;
            panel.style.setProperty('--origin', toLeft ? 'top right' : 'top left');
            root.dataset.flash = top + ph + 64 <= h ? 'below' : top >= 64 ? 'above' : 'inside';
        }
        function onPointerDown(e) {
            const handle = e.target.closest('[data-drag]');
            if (!handle || e.button !== 0 || (e.target.closest('button') && e.target.closest('button') !== handle)) return;
            e.preventDefault();
            const rect = host.getBoundingClientRect(), startX = e.clientX, startY = e.clientY;
            let moved = false;
            const move = ev => {
                const dx = ev.clientX - startX, dy = ev.clientY - startY;
                if (!moved && Math.hypot(dx, dy) < 5) return;
                moved = dragging = true;
                host.style.left = `${clamp(rect.left + dx, EDGE, window.innerWidth - rect.width - EDGE)}px`;
                host.style.top = `${clamp(rect.top + dy, EDGE, window.innerHeight - rect.height - EDGE)}px`;
            };
            const up = () => {
                document.removeEventListener('pointermove', move);
                document.removeEventListener('pointerup', up);
                document.removeEventListener('pointercancel', up);
                dragging = false;
                if (!moved) return;
                suppressClick = Date.now() + 300;
                const left = parseFloat(host.style.left);
                ui.x = ui.open && left + rect.width / 2 > window.innerWidth / 2 ? left + rect.width - BALL : left;
                ui.y = parseFloat(host.style.top);
                saveUi();
                place(true);
            };
            document.addEventListener('pointermove', move);
            document.addEventListener('pointerup', up);
            document.addEventListener('pointercancel', up);
        }
        function onClick(e) {
            const el = e.target.closest('[data-act]');
            if (!el) return;
            if (Date.now() < suppressClick) {
                e.preventDefault();
                return;
            }
            const id = el.dataset.id;
            if (el.dataset.act !== 'log') log('面板', el.dataset.act, id);
            switch (el.dataset.act) {
                case 'log':
                    copyLog();
                    break;
                case 'expand':
                    ui.open = true;
                    saveUi();
                    render();
                    break;
                case 'close':
                    ui.open = false;
                    saveUi();
                    render();
                    break;
                case 'refresh':
                    if (ui.tab === 'hang') refreshCourses();
                    else refresh();
                    break;
                case 'tab':
                    ui.tab = id;
                    saveUi();
                    if (id === 'hang') {
                        if (!hang.list.length) refreshCourses();
                        loadHere();
                    }
                    render();
                    break;
                case 'hang':
                    if (hc(id).pick === false) hc(id).pick = null;
                    hangCourse(id);
                    break;
                case 'hang-here':
                    hangPage();
                    break;
                case 'hang-stop':
                    hangStop();
                    break;
                case 'hang-hide':
                    hideCourse(id);
                    break;
                case 'hang-mode':
                    setHangMode(id);
                    break;
                case 'hang-reset':
                    resetHang();
                    break;
                case 'silent':
                    silent = !silent;
                    savePref();
                    syncSilent();
                    render();
                    break;
                case 'resume':
                    autoResume = !autoResume;
                    savePref();
                    render();
                    break;
                case 'notice':
                    noticeOpen = !noticeOpen;
                    if (noticeOpen) {
                        ui.seen = noticeKey();
                        saveUi();
                    }
                    render();
                    break;
                case 'fold':
                    ui.folded = ui.folded.includes(id) ? ui.folded.filter(x => x !== id) : [...ui.folded, id];
                    saveUi();
                    render();
                    break;
                case 'open':
                    clickTask(id);
                    break;
                case 'remove':
                    removeTask(id);
                    break;
                case 'clear':
                    clearList();
                    break;
                case 'theme':
                    ui.theme = ui.theme === 'night' ? 'porcelain' : 'night';
                    saveUi();
                    render();
                    break;
                case 'pick':
                    obPick = id;
                    render();
                    break;
                case 'ob-next':
                case 'ob-back':
                    obStep = el.dataset.act === 'ob-next' ? 2 : 1;
                    render();
                    break;
                case 'ob-done':
                    ui.theme = obPick;
                    obStep = 1;
                    saveUi();
                    render();
                    break;
            }
        }
        function syncSilent() {
            document.documentElement.setAttribute('data-xy-silent', silent ? '1' : '0');
            document.dispatchEvent(new CustomEvent('xy-silent-change'));
        }
        function onRoute() {
            const p = page();
            log('路由', location.pathname);
            if (ui.tab === 'hang') loadHere();
            if (!p.groupId && !loading && (!tasks.length || Date.now() - fetchedAt > STALE_MS)) refresh();
            else syncRun();
        }
        shadow.addEventListener('click', onClick);
        shadow.addEventListener('dblclick', e => {
            if (e.target.closest('[data-act="log"]')) downloadLog();
        });
        shadow.addEventListener('pointerdown', onPointerDown);
        shadow.addEventListener('change', e => {
            if (e.target.matches('input[data-id]')) setDuration(e.target.dataset.id, e.target.value);
            else if (e.target.matches('input[data-hang]')) setHangTarget(e.target.dataset.hang, e.target.value);
            else if (e.target.matches('input[data-hang-def]')) setHangDef(e.target.value);
            else if (e.target.matches('input[data-hang-each]')) setHangEach(e.target.value);
        });
        shadow.addEventListener('keydown', e => {
            if (e.key === 'Enter' && e.target.matches('input')) e.target.blur();
        });
        window.addEventListener('resize', () => place(true));
        window.addEventListener('storage', e => {
            if (e.key === KEY.hang && e.newValue && !(run && run.mode === 'hang')) {
                Object.assign(hang, JSON.parse(e.newValue));
                render();
                return;
            }
            if (e.key !== KEY.tasks || loading) return;
            loadTasks();
            log('列表', `其它标签页改了任务列表，同步过来 ${tasks.length} 个`);
            syncRun();
        });
        window.addEventListener('error', e => log('报错', e.message, e.filename ? `${e.filename.split('?')[0].split('/').pop()}:${e.lineno}` : ''));
        window.addEventListener('unhandledrejection', e => log('报错', '未处理的 Promise', e.reason));
        const POPUP = '.ant-modal, .ant-message-notice, .ant-notification-notice, [role="dialog"], [role="alertdialog"]';
        new MutationObserver(list => {
            for (const m of list) {
                for (const n of m.addedNodes) {
                    if (n.nodeType !== 1 || n === host) continue;
                    const hit = n.matches(POPUP) ? n : n.querySelector(POPUP);
                    if (hit) setTimeout(() => {
                        const text = (hit.innerText || '').replace(/\s+/g, ' ').trim();
                        if (text) log('弹窗', text.slice(0, 200));
                    }, 300);
                }
            }
        }).observe(document.body, { childList: true, subtree: true });
        let lastHref = location.href;
        setInterval(() => {
            if (!host.isConnected && document.body) document.body.appendChild(host);
            if (location.href !== lastHref) {
                lastHref = location.href;
                onRoute();
            }
        }, 800);
        setInterval(render, 30000);
        if (!ui.welcomed) {
            ui.welcomed = true;
            if (!ui.theme) ui.open = true;
            saveUi();
        }
        loadTasks();
        log('=====', `页面加载 v${VERSION}`, location.host + location.pathname, `已存任务 ${tasks.length} 个`, `拦截声音=${silent} 恢复播放=${autoResume}`);
        syncSilent();
        render();
        loadNotice();
        onRoute();
    }
})();
