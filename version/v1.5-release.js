// ==UserScript==
// @name         小雅自动刷
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  🚀 小雅平台自动刷课神器！视频自动播放、无缝跳转，突破防切屏限制实现后台挂机 🛡️！智能监测未开启任务倒计时 ⏳，成倍提升学习效率！📈
// @author       Qy
// @match        https://*.ai-augmented.com/*
// @grant        none
// @run-at       document-start
// @icon         data:image/png;base64,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
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
            initSilent = (pref.silentEnabled ?? pref.silentAutoPlay) !== false;
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

    function main() {

        const STORAGE_KEY = 'xy_qy_task_queue';
        const POS_KEY = 'xy_qy_ui_pos';
        const NOTICE_CACHE_KEY = 'xy_qy_notice_cache';
        const PLAY_PREF_KEY = 'xy_qy_play_pref';
        const DOMAIN = window.location.hostname;
        const DEFAULT_DURATION = 10;
        const NOTICE_API = "https://xiaoya-notice-dwafgrs416f1w156r1fasd11jt.qyrun.me/notice";
        const VIDEO_EXT = /\.(mp4|flv|avi|mov|mkv|wmv|rmvb|m4v|webm)$/i;
        const UI_EDGE_MARGIN = 8;
        const ICON_BASE64 = 'data:image/png;base64,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';

        let taskQueue = [];
        let heartbeatInterval = null;
        let timerInterval = null;
        let isExpanded = false;
        let currentTask = null;
        let remainingTime = 0;
        let timerStartedAt = 0;
        let timerTotalDuration = 0;
        let nextTaskNodeId = null;
        let unlockCheckTimer = null;
        let waitingUnlockText = '';
        let docPreviewTimer = null;
        let docPreviewDoneNodeId = '';
        let uiPos = null;
        let noticeContent = "⏳ 初始化中...";
        let collapsedGroups = new Set();
        let navigationId = 0;
        let silentEnabled = true;

        function loadData() {
            try {
                const q = localStorage.getItem(STORAGE_KEY);
                const p = localStorage.getItem(POS_KEY);
                const playPref = localStorage.getItem(PLAY_PREF_KEY);
                if (q) taskQueue = JSON.parse(q);
                if (p) uiPos = JSON.parse(p);
                if (playPref) {
                    const parsed = JSON.parse(playPref);
                    silentEnabled = (parsed.silentEnabled ?? parsed.silentAutoPlay) !== false;
                }
            } catch (e) {
                taskQueue = [];
                uiPos = null;
                silentEnabled = true;
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(POS_KEY);
                localStorage.removeItem(PLAY_PREF_KEY);
            }
        }

        function saveData() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(taskQueue));
        }

        function savePlayPref() {
            localStorage.setItem(PLAY_PREF_KEY, JSON.stringify({ silentEnabled }));
        }

        function syncSilentState() {
            document.documentElement.setAttribute('data-xy-silent', silentEnabled ? '1' : '0');
            document.dispatchEvent(new CustomEvent('xy-silent-change'));
        }

        function savePos(top, left) {
            const safe = clampPositionToViewport(top, left, getContainerSize());
            uiPos = { top: safe.top, left: safe.left };
            localStorage.setItem(POS_KEY, JSON.stringify(uiPos));
        }

        function parsePx(value) {
            if (typeof value === 'number' && Number.isFinite(value)) return value;
            if (typeof value !== 'string') return NaN;
            const n = parseFloat(value.replace('px', '').trim());
            return Number.isFinite(n) ? n : NaN;
        }

        function getContainerSize() {
            const rect = container.getBoundingClientRect();
            const width = rect.width > 0 ? rect.width : (isExpanded ? 460 : 56);
            const height = rect.height > 0 ? rect.height : (isExpanded ? 220 : 56);
            return { width, height };
        }

        function clampPositionToViewport(top, left, size) {
            const width = Math.max(1, Math.ceil((size && size.width) || 56));
            const height = Math.max(1, Math.ceil((size && size.height) || 56));
            const maxLeft = Math.max(UI_EDGE_MARGIN, window.innerWidth - width - UI_EDGE_MARGIN);
            const maxTop = Math.max(UI_EDGE_MARGIN, window.innerHeight - height - UI_EDGE_MARGIN);
            const rawTop = parsePx(top);
            const rawLeft = parsePx(left);
            const safeTop = Number.isFinite(rawTop)
                ? Math.min(Math.max(rawTop, UI_EDGE_MARGIN), maxTop)
                : Math.max(UI_EDGE_MARGIN, Math.floor(window.innerHeight * 0.2));
            const safeLeft = Number.isFinite(rawLeft)
                ? Math.min(Math.max(rawLeft, UI_EDGE_MARGIN), maxLeft)
                : maxLeft;
            return { top: `${Math.round(safeTop)}px`, left: `${Math.round(safeLeft)}px` };
        }

        function applySafeContainerPosition(forceDefault = false) {
            if (forceDefault || !uiPos) {
                const safeDefault = clampPositionToViewport(`${Math.floor(window.innerHeight * 0.2)}px`, `${window.innerWidth - 72}px`, getContainerSize());
                container.style.top = safeDefault.top;
                container.style.left = safeDefault.left;
                container.style.right = 'auto';
                savePos(safeDefault.top, safeDefault.left);
                return;
            }
            const safe = clampPositionToViewport(uiPos.top, uiPos.left, getContainerSize());
            container.style.top = safe.top;
            container.style.left = safe.left;
            container.style.right = 'auto';
            if (safe.top !== uiPos.top || safe.left !== uiPos.left) savePos(safe.top, safe.left);
        }

        function getCookie(keyword = 'prd-access-token') {
            const cookies = document.cookie.split('; ');
            for (const cookie of cookies) {
                const [name, value] = cookie.split('=');
                if (name.includes(keyword)) return value;
            }
            return null;
        }

        function getPageInfo() {
            const url = window.location.href;
            const match = url.match(/mycourse\/(\d+)\/resource\/(\d+)\/(\d+)/);
            if (match) return { groupId: match[1], resourceId: match[2], nodeId: match[3] };
            const listMatch = url.match(/mycourse\/(\d+)/);
            if (listMatch) return { groupId: listMatch[1], resourceId: null, nodeId: null };
            return { groupId: null, resourceId: null, nodeId: null };
        }

        function formatSeconds(s) {
            if (!s || s < 0) return "0:00";
            const min = Math.floor(s / 60);
            const sec = Math.floor(s % 60);
            return `${min}:${sec.toString().padStart(2, '0')}`;
        }

        function getTaskIndexByNodeId(nodeId) {
            return taskQueue.findIndex(t => String(t.nodeId) === String(nodeId));
        }

        function computeNextTaskNodeId(nodeId) {
            const currentIndex = getTaskIndexByNodeId(nodeId);
            if (currentIndex === -1) return null;
            const nextTask = taskQueue[currentIndex + 1] || null;
            return nextTask ? String(nextTask.nodeId) : null;
        }

        function findTaskByNodeId(nodeId) {
            return taskQueue.find(t => String(t.nodeId) === String(nodeId)) || null;
        }

        function getTaskRouteResourceId(task) {
            if (!task) return null;
            if (task.resourceId !== undefined && task.resourceId !== null && task.resourceId !== '') return String(task.resourceId);
            if (task.taskId !== undefined && task.taskId !== null && task.taskId !== '') return String(task.taskId);
            if (task.nodeId !== undefined && task.nodeId !== null && task.nodeId !== '') return String(task.nodeId);
            return null;
        }

        function getTaskHeartbeatResourceId(task) {
            if (!task) return null;
            if (task.resourceId !== undefined && task.resourceId !== null && task.resourceId !== '') return String(task.resourceId);
            if (task.nodeId !== undefined && task.nodeId !== null && task.nodeId !== '') return String(task.nodeId);
            if (task.taskId !== undefined && task.taskId !== null && task.taskId !== '') return String(task.taskId);
            return null;
        }

        function buildTaskUrl(task) {
            const routeResourceId = getTaskRouteResourceId(task);
            if (!task || !task.groupId || !routeResourceId || !task.nodeId) return null;
            return `https://${DOMAIN}/app/jx-web/mycourse/${task.groupId}/resource/${routeResourceId}/${task.nodeId}`;
        }

        function parseDateTimeSafe(value) {
            if (!value) return null;
            const text = String(value).trim();
            const m = text.match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/);
            if (m) {
                return new Date(
                    Number(m[1]),
                    Number(m[2]) - 1,
                    Number(m[3]),
                    Number(m[4]),
                    Number(m[5]),
                    Number(m[6])
                );
            }
            const d = new Date(text);
            return Number.isNaN(d.getTime()) ? null : d;
        }

        function formatDateTime(dt) {
            if (!dt || Number.isNaN(dt.getTime())) return '';
            const y = dt.getFullYear();
            const mo = String(dt.getMonth() + 1).padStart(2, '0');
            const da = String(dt.getDate()).padStart(2, '0');
            const h = String(dt.getHours()).padStart(2, '0');
            const mi = String(dt.getMinutes()).padStart(2, '0');
            const s = String(dt.getSeconds()).padStart(2, '0');
            return `${y}-${mo}-${da} ${h}:${mi}:${s}`;
        }

        function formatDurationCn(totalSec) {
            const sec = Math.max(0, Math.floor(totalSec || 0));
            const d = Math.floor(sec / 86400);
            const h = Math.floor((sec % 86400) / 3600);
            const m = Math.floor((sec % 3600) / 60);
            const s = sec % 60;
            const parts = [];
            if (d > 0) parts.push(`${d}天`);
            if (h > 0 || d > 0) parts.push(`${h}小时`);
            if (m > 0 || h > 0 || d > 0) parts.push(`${m}分钟`);
            parts.push(`${s}秒`);
            return parts.join(' ');
        }

        function parseCnDurationSeconds(text) {
            const t = String(text || '');
            let total = 0;
            let hit = false;
            const d = t.match(/(\d+)\s*天/);
            const h = t.match(/(\d+)\s*小时/);
            const m = t.match(/(\d+)\s*分钟/);
            const s = t.match(/(\d+)\s*秒/);
            if (d) { total += Number(d[1]) * 86400; hit = true; }
            if (h) { total += Number(h[1]) * 3600; hit = true; }
            if (m) { total += Number(m[1]) * 60; hit = true; }
            if (s) { total += Number(s[1]); hit = true; }
            return hit ? total : null;
        }

        function normalizeBool(val) {
            return val === true || val === 1 || val === '1';
        }

        function getTaskUnlockInfoFromPage() {
            const el = document.querySelector('.aia-course-task-not-start');
            if (!el) return null;
            const text = (el.innerText || '').replace(/\s+/g, ' ').trim();
            if (!text) return null;

            const startMatch = text.match(/任务将于(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})开始/);
            let startAt = null;
            let remainingSec = null;
            if (startMatch) {
                startAt = parseDateTimeSafe(startMatch[1]);
                if (startAt) remainingSec = Math.ceil((startAt.getTime() - Date.now()) / 1000);
            }
            if (remainingSec == null) remainingSec = parseCnDurationSeconds(text);

            return {
                text,
                startAt,
                remainingSec: remainingSec == null ? 0 : remainingSec
            };
        }

        function evaluateTaskState(task, nowMs = Date.now()) {
            if (!task) return { state: 'unknown', remainingSec: 0, unlockAt: null, lateSubmit: false };
            const now = nowMs;
            const endAt = parseDateTimeSafe(task.endTime);
            if (endAt && now >= endAt.getTime()) {
                if (task.allowLateSubmit) {
                    return { state: 'ready', remainingSec: 0, unlockAt: null, lateSubmit: true };
                }
                return { state: 'expired', remainingSec: 0, unlockAt: null, lateSubmit: false };
            }
            const unlockAt = parseDateTimeSafe(task.unlockAt || task.startTime);
            if (unlockAt && now < unlockAt.getTime()) {
                return {
                    state: 'locked',
                    remainingSec: Math.ceil((unlockAt.getTime() - now) / 1000),
                    unlockAt,
                    lateSubmit: false
                };
            }
            return { state: 'ready', remainingSec: 0, unlockAt, lateSubmit: false };
        }

        function refreshTaskStatesFromTime() {
            const now = Date.now();
            taskQueue.forEach(t => {
                const stateInfo = evaluateTaskState(t, now);
                t.state = stateInfo.state;
                t.locked = stateInfo.state === 'locked';
                t.unlockAt = stateInfo.unlockAt ? formatDateTime(stateInfo.unlockAt) : (t.unlockAt || null);
            });
        }

        function clearUnlockCheck() {
            if (unlockCheckTimer) clearInterval(unlockCheckTimer);
            unlockCheckTimer = null;
            waitingUnlockText = '';
        }

        function clearDocPreviewCheck() {
            if (docPreviewTimer) clearInterval(docPreviewTimer);
            docPreviewTimer = null;
        }

        function isDocPreviewOpened() {
            const viewer = document.querySelector('iframe[src*="ow365.cn"], iframe[src*="office"], .disk_previewer_with_banner iframe');
            return !!viewer;
        }

        function clickDocPreviewButton() {
            const confirmBtn = document.querySelector('.xy_disk_preview .ant-btn-primary');
            if (confirmBtn) {
                confirmBtn.click();
                return true;
            }
            const fallbackBtn = document.querySelector('#ta_image_preview_btn');
            if (fallbackBtn) {
                fallbackBtn.click();
                return true;
            }
            return false;
        }

        function tryAutoOpenDocPreview(task) {
            if (!task || task.isVideo) return;
            const page = getPageInfo();
            if (!page.nodeId || String(page.nodeId) !== String(task.nodeId)) return;

            clearDocPreviewCheck();
            let attempts = 0;
            docPreviewTimer = setInterval(() => {
                attempts += 1;
                const latestPage = getPageInfo();
                if (!currentTask || String(currentTask.nodeId) !== String(task.nodeId)) {
                    clearDocPreviewCheck();
                    return;
                }
                if (!latestPage.nodeId || String(latestPage.nodeId) !== String(task.nodeId)) {
                    clearDocPreviewCheck();
                    return;
                }

                if (isDocPreviewOpened()) {
                    docPreviewDoneNodeId = String(task.nodeId);
                    clearDocPreviewCheck();
                    return;
                }

                clickDocPreviewButton();
                if (attempts >= 12) clearDocPreviewCheck();
            }, 800);
        }

        function enterUnlockWaiting(task, lockInfo = null) {
            clearUnlockCheck();
            currentTask = task;
            remainingTime = 0;
            waitingUnlockText = lockInfo && lockInfo.text
                ? lockInfo.text
                : (task && task.unlockAt ? `任务将于${task.unlockAt}开始` : '任务未开启');
            renderUI();

            unlockCheckTimer = setInterval(() => {
                const latest = getTaskUnlockInfoFromPage();
                if (latest && latest.remainingSec > 0) {
                    waitingUnlockText = latest.text;
                    updateTimerDisplay();
                    return;
                }

                const stateInfo = evaluateTaskState(task);
                if (stateInfo.state === 'locked') {
                    const unlockAtText = stateInfo.unlockAt ? formatDateTime(stateInfo.unlockAt) : '';
                    waitingUnlockText = unlockAtText
                        ? `任务将于${unlockAtText}开始（${formatDurationCn(stateInfo.remainingSec)}）`
                        : `任务未开启（${formatDurationCn(stateInfo.remainingSec)}）`;
                    updateTimerDisplay();
                    return;
                }

                clearUnlockCheck();
                const page = getPageInfo();
                if (String(page.nodeId) === String(task.nodeId)) {
                    startTimer(task);
                } else {
                    const targetUrl = buildTaskUrl(task);
                    if (targetUrl) window.location.replace(targetUrl);
                }
            }, 1000);
        }

        function stateRank(state) {
            if (state === 'ready') return 0;
            if (state === 'locked') return 1;
            if (state === 'expired') return 2;
            return 9;
        }

        function sortTaskQueueByPriority() {
            taskQueue.sort((a, b) => {
                const aState = evaluateTaskState(a).state;
                const bState = evaluateTaskState(b).state;
                const stateCmp = stateRank(aState) - stateRank(bState);
                if (stateCmp !== 0) return stateCmp;

                const groupCmp = (a.groupName || "").localeCompare(b.groupName || "");
                if (groupCmp !== 0) return groupCmp;

                const aTime = a.endTime ? new Date(a.endTime).getTime() : Infinity;
                const bTime = b.endTime ? new Date(b.endTime).getTime() : Infinity;
                return aTime - bTime;
            });
        }

        async function fetchWithRetry(url, options = {}, retries = 3, delay = 2000) {
            for (let i = 0; i < retries; i++) {
                try {
                    const res = await fetch(url, options);
                    if (res.status === 401 || res.status === 403) {
                        localStorage.removeItem('xy_user_id');
                        const newToken = getCookie();
                        if (newToken && options.headers) {
                            options.headers['authorization'] = `Bearer ${newToken}`;
                            continue;
                        }
                        throw new Error(`Token 过期 (HTTP ${res.status})`);
                    }
                    return res;
                } catch (e) {
                    if (i === retries - 1) throw e;
                    await new Promise(r => setTimeout(r, delay));
                }
            }
        }

        async function runOneShotNoticeCheck() {
            try {
                const res = await fetch(NOTICE_API, {
                    method: 'POST',
                    body: JSON.stringify({ action: 'get_notice' })
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                noticeContent = data && data.content ? String(data.content) : '暂无公告';
                localStorage.setItem(NOTICE_CACHE_KEY, noticeContent);
                const el = document.getElementById('xy-notice-board');
                if (el) el.innerText = noticeContent;
            } catch (e) {
                const cached = localStorage.getItem(NOTICE_CACHE_KEY);
                if (cached) noticeContent = cached;
                else noticeContent = "❌ 公告加载失败";
            }
        }

        async function submitFinishActivity() {
            if (!currentTask) return;
            const { groupId } = getPageInfo();
            const token = getCookie();
            const targetGroupId = groupId || currentTask.groupId;
            try {
                await fetchWithRetry(`https://${DOMAIN}/api/jx-iresource/resource/finishActivity`, {
                    method: 'POST',
                    headers: { 'authorization': `Bearer ${token}`, 'content-type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify({ group_id: targetGroupId, node_id: currentTask.nodeId, task_id: currentTask.taskId })
                });
            } catch (e) {
                console.warn('[小雅自动刷] submitFinishActivity 失败:', e.message);
            }
        }

        function tryReadVideoDuration(retryCount = 0) {
            if (!currentTask || (currentTask.duration && currentTask.duration > 0)) return;
            const video = document.querySelector('video');
            const { nodeId } = getPageInfo();
            if (!nodeId || String(nodeId) !== String(currentTask.nodeId)) return;
            if (video && video.duration && video.duration > 1) {
                const realDuration = Math.ceil(video.duration) + 5;
                updateTaskDuration(realDuration);
            } else {
                if (retryCount < 5) setTimeout(() => tryReadVideoDuration(retryCount + 1), 2000);
                else updateTaskDuration(DEFAULT_DURATION * 60);
            }
        }

        function updateTaskDuration(seconds) {
            if (!currentTask) return;
            currentTask.duration = seconds;
            remainingTime = seconds;
            timerTotalDuration = seconds;
            timerStartedAt = Date.now();
            const index = taskQueue.findIndex(t => String(t.nodeId) === String(currentTask.nodeId));
            if (index !== -1) {
                taskQueue[index].duration = seconds;
                saveData();
            }
            renderUI();
        }

        function tryAutoPlay() {
            const video = document.querySelector('video');
            if (!video || !video.paused) return;
            const p = video.play();
            if (p && typeof p.catch === 'function') {
                p.catch(() => {
                    video.muted = true;
                    const p2 = video.play();
                    if (p2 && typeof p2.finally === 'function') {
                        p2.finally(() => {
                            setTimeout(() => { video.muted = false; }, 150);
                        });
                    }
                });
            }
        }

        async function fetchTasksFromApi() {
            const myNavId = ++navigationId;
            const { groupId } = getPageInfo();
            const token = getCookie();
            if (!token) return;
            const btn = document.getElementById('xy-refresh-btn');
            if (btn) btn.innerText = "加载中";
            try {
                if (groupId) {
                    const [taskRes, resourceList] = await Promise.all([
                        fetchWithRetry(`https://${DOMAIN}/api/jx-stat/group/task/queryTaskNotices?group_id=${groupId}&role=1`, {
                            headers: { "authorization": `Bearer ${token}` }
                        }).then(r => r.json()),
                        fetchWithRetry(`https://${DOMAIN}/api/jx-iresource/resource/queryCourseResources?group_id=${groupId}`, {
                            headers: { "authorization": `Bearer ${token}` }
                        }).then(r => r.json())
                    ]);
                    if (myNavId !== navigationId) return;
                    if (taskRes.success) {
                        const resourceMap = new Map();
                        if (resourceList.success) resourceList.data.forEach(r => { if (r.is_task) resourceMap.set(String(r.task_id), r); });
                        const courseName = document.title.replace(/-.*/, '').trim() || "当前课程";
                        const now = new Date();
                        taskQueue = taskRes.data.student_tasks.filter(t => {
                            if (t.task_type !== 1 || t.finish === 2) return false;
                            const expired = t.end_time && new Date(t.end_time) <= now;
                            if (expired && !normalizeBool(t.is_allow_after_submitted)) return false;
                            return true;
                        }).map(t => {
                            const allowLateSubmit = normalizeBool(t.is_allow_after_submitted);
                            const resInfo = resourceMap.get(String(t.task_id));
                            const resourceId = String((resInfo && (resInfo.resource_id || resInfo.id)) || t.resource_id || t.task_id);
                            let isVideo = false;
                            if (resInfo) isVideo = (resInfo.type && String(resInfo.type).includes('video')) || (resInfo.mimetype && resInfo.mimetype.includes('video')) || (resInfo.name && VIDEO_EXT.test(resInfo.name));
                            let dur = isVideo ? 0 : ((resInfo && resInfo.watch_min_minutes > 0) ? (resInfo.watch_min_minutes * 60 + 20) : DEFAULT_DURATION * 60);
                            return {
                                groupId,
                                nodeId: String(t.node_id),
                                taskId: String(t.task_id),
                                resourceId,
                                name: resInfo ? resInfo.name : t.name,
                                duration: Math.ceil(dur),
                                isVideo,
                                groupName: courseName,
                                endTime: t.end_time || null,
                                startTime: t.start_time || null,
                                unlockAt: t.start_time || null,
                                locked: false,
                                state: 'ready',
                                allowLateSubmit
                            };
                        });
                    }
                } else {
                    const res = await fetchWithRetry(`https://${DOMAIN}/api/jx-stat/group/task/un_finish`, {
                        headers: { "authorization": `Bearer ${token}` }
                    }).then(r => r.json());
                    if (myNavId !== navigationId) return;
                    if (res.success) {
                        const now2 = new Date();
                        const type1Tasks = res.data.filter(t => t.task_type === 1);
                        const keepTasks = [];
                        const needLookup = new Map();
                        for (const t of type1Tasks) {
                            const expired = t.end_time && new Date(t.end_time) <= now2;
                            if (!expired) {
                                keepTasks.push(Object.assign({}, t, { _allowLate: normalizeBool(t.is_allow_after_submitted) }));
                            } else if (t.is_allow_after_submitted !== undefined && t.is_allow_after_submitted !== null) {
                                if (normalizeBool(t.is_allow_after_submitted)) {
                                    keepTasks.push(Object.assign({}, t, { _allowLate: true }));
                                }
                            } else {
                                const gid = String(t.group_id);
                                if (!needLookup.has(gid)) needLookup.set(gid, []);
                                needLookup.get(gid).push(t);
                            }
                        }
                        for (const [gid, tasks] of needLookup) {
                            if (myNavId !== navigationId) return;
                            try {
                                const noticeRes = await fetchWithRetry(
                                    `https://${DOMAIN}/api/jx-stat/group/task/queryTaskNotices?group_id=${gid}&role=1`,
                                    { headers: { "authorization": `Bearer ${token}` } }
                                ).then(r => r.json());
                                if (myNavId !== navigationId) return;
                                if (noticeRes.success) {
                                    const noticeMap = new Map();
                                    noticeRes.data.student_tasks.forEach(nt => noticeMap.set(String(nt.node_id), nt));
                                    for (const t of tasks) {
                                        const notice = noticeMap.get(String(t.node_id));
                                        if (notice && normalizeBool(notice.is_allow_after_submitted)) {
                                            keepTasks.push(Object.assign({}, t, { _allowLate: true }));
                                        }
                                    }
                                }
                            } catch (e) {
                                console.warn('[小雅自动刷] 补交反查失败:', e.message);
                            }
                        }
                        taskQueue = keepTasks.map(t => ({
                            groupId: String(t.group_id),
                            nodeId: String(t.node_id),
                            taskId: String(t.task_id || t.id || t.resource_id),
                            resourceId: String(t.resource_id || t.id || t.task_id),
                            name: t.name,
                            duration: 0,
                            isVideo: VIDEO_EXT.test(t.name),
                            groupName: t.group_name,
                            endTime: t.end_time || null,
                            startTime: t.start_time || null,
                            unlockAt: t.start_time || null,
                            locked: false,
                            state: 'ready',
                            allowLateSubmit: !!t._allowLate
                        }));
                    }
                }
                refreshTaskStatesFromTime();
                sortTaskQueueByPriority();
                saveData();
                renderUI();
                checkCurrentTask();
            } catch (e) {
                console.warn('[小雅自动刷] fetchTasksFromApi 失败:', e.message);
            } finally {
                if (btn) btn.innerText = "刷新";
            }
        }

        async function sendHeartbeat() {
            const { groupId, resourceId } = getPageInfo();
            const token = getCookie();
            if (!token) return;
            try {
                let userId = localStorage.getItem('xy_user_id');
                if (!userId) {
                    const userRes = await fetchWithRetry(`https://${DOMAIN}/api/jx-auth/oauth2/info`, {
                        headers: { "authorization": `Bearer ${token}` }
                    }).then(r => r.json());
                    userId = userRes.data.info.id;
                    localStorage.setItem('xy_user_id', userId);
                }
                const targetGroupId = groupId || (currentTask ? currentTask.groupId : null);
                const targetResourceId = resourceId || getTaskHeartbeatResourceId(currentTask);
                if (!targetGroupId || !targetResourceId) return;
                const message = JSON.stringify({ user_id: userId, group_id: targetGroupId, clientType: 1, roleType: 1, resourceId: targetResourceId });
                const timestamp = Date.now().toString(), nonce = crypto.randomUUID();
                const arr = [encodeURIComponent(message), timestamp, nonce, "--xy-create-signature--"].sort().join("");
                const hashBuffer = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(arr));
                const signature = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
                const res = await fetchWithRetry(`https://${DOMAIN}/api/jx-iresource/learnLength/learnRecord`, {
                    method: 'POST',
                    headers: { 'authorization': `Bearer ${token}`, 'content-type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify({ message, signature, timestamp, nonce })
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const result = await res.json().catch(() => null);
                if (result && result.success === false && result.code !== 200 && result.code !== 0) {
                    throw new Error(result.message || `code ${result.code}`);
                }
            } catch (e) {
                console.warn('[小雅自动刷] 心跳发送失败:', e.message);
            }
        }

        function stopTimer() {
            if (timerInterval) clearInterval(timerInterval);
            if (heartbeatInterval) clearInterval(heartbeatInterval);
            clearUnlockCheck();
            clearDocPreviewCheck();
            timerInterval = null;
            heartbeatInterval = null;
            currentTask = null;
            nextTaskNodeId = null;
            timerStartedAt = 0;
            timerTotalDuration = 0;
            renderUI();
        }

        function jumpToNext() {
            if (taskQueue.length === 0) { stopTimer(); return; }
            refreshTaskStatesFromTime();
            let nextTask = null;
            if (nextTaskNodeId) {
                const preferred = findTaskByNodeId(nextTaskNodeId);
                if (preferred && evaluateTaskState(preferred).state === 'ready') nextTask = preferred;
            }
            if (!nextTask) {
                nextTask = taskQueue.find(t => evaluateTaskState(t).state === 'ready') || null;
            }

            if (!nextTask) {
                const lockedTasks = taskQueue
                    .map(t => ({ t, info: evaluateTaskState(t) }))
                    .filter(x => x.info.state === 'locked')
                    .sort((a, b) => {
                        const at = a.info.unlockAt ? a.info.unlockAt.getTime() : Infinity;
                        const bt = b.info.unlockAt ? b.info.unlockAt.getTime() : Infinity;
                        return at - bt;
                    });
                if (lockedTasks.length > 0) {
                    const lockedTask = lockedTasks[0].t;
                    const unlockAtText = lockedTasks[0].info.unlockAt ? formatDateTime(lockedTasks[0].info.unlockAt) : '';
                    enterUnlockWaiting(lockedTask, {
                        text: unlockAtText ? `任务将于${unlockAtText}开始` : '任务未开启',
                        remainingSec: lockedTasks[0].info.remainingSec
                    });
                    return;
                }
                stopTimer();
                return;
            }
            nextTaskNodeId = null;
            const targetUrl = buildTaskUrl(nextTask);
            if (targetUrl) window.location.replace(targetUrl);
            else stopTimer();
        }

        async function handleTaskComplete() {
            if (!currentTask) { jumpToNext(); return; }
            const finishedNodeId = currentTask.nodeId;
            const pendingNextTaskNodeId = computeNextTaskNodeId(finishedNodeId);
            if (!currentTask.isVideo) await submitFinishActivity();
            stopTimer();
            nextTaskNodeId = pendingNextTaskNodeId;
            const removeIndex = getTaskIndexByNodeId(finishedNodeId);
            if (removeIndex !== -1) { taskQueue.splice(removeIndex, 1); saveData(); }
            setTimeout(jumpToNext, 1000);
        }

        function startTimer(task) {
            clearDocPreviewCheck();
            const lockInfo = getTaskUnlockInfoFromPage();
            if (lockInfo && lockInfo.remainingSec > 0) {
                const index = getTaskIndexByNodeId(task.nodeId);
                if (index !== -1) {
                    taskQueue[index].locked = true;
                    taskQueue[index].state = 'locked';
                    if (lockInfo.startAt) taskQueue[index].unlockAt = formatDateTime(lockInfo.startAt);
                }
                saveData();
                enterUnlockWaiting(task, lockInfo);
                return;
            }

            clearUnlockCheck();
            currentTask = task;
            task.locked = false;
            task.state = 'ready';
            nextTaskNodeId = computeNextTaskNodeId(task.nodeId);
            const duration = parseInt(task.duration) || 0;
            remainingTime = duration;

            timerTotalDuration = duration;
            timerStartedAt = Date.now();

            if (heartbeatInterval) clearInterval(heartbeatInterval);
            heartbeatInterval = setInterval(sendHeartbeat, 30000);
            sendHeartbeat();

            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                if (timerTotalDuration > 0 && timerStartedAt > 0) {
                    const elapsed = Math.floor((Date.now() - timerStartedAt) / 1000);
                    remainingTime = Math.max(0, timerTotalDuration - elapsed);
                    updateTimerDisplay();
                    if (remainingTime <= 0) handleTaskComplete();
                }
            }, 1000);

            if (task.duration === 0) setTimeout(() => tryReadVideoDuration(0), 2000);
            if (task.isVideo) {
                setTimeout(tryAutoPlay, 2000);
            }
            if (!task.isVideo && docPreviewDoneNodeId !== String(task.nodeId)) setTimeout(() => tryAutoOpenDocPreview(task), 400);
            renderUI();
        }

        async function checkCurrentTask() {
            const myNavId = navigationId;
            const { nodeId, groupId } = getPageInfo();
            if (!nodeId) { stopTimer(); return; }
            const taskIndex = taskQueue.findIndex(t => String(t.nodeId) === String(nodeId));
            const task = taskQueue[taskIndex];
            if (task) {
                if (!task.isVideo && (!task.duration || task.duration === 0 || task.duration === DEFAULT_DURATION * 60)) {
                    const token = getCookie();
                    try {
                        const taskRes = await fetchWithRetry(`https://${DOMAIN}/api/jx-stat/group/task/queryTaskNotices?group_id=${groupId}&role=1`, {
                            headers: { "authorization": `Bearer ${token}` }
                        }).then(r => r.json());
                        if (myNavId !== navigationId) return;
                        if (taskRes.success) {
                            const realTaskNotice = taskRes.data.student_tasks.find(t => String(t.node_id) === String(nodeId));
                            if (realTaskNotice) {
                                const realTaskId = String(realTaskNotice.task_id);
                                task.taskId = realTaskId;
                                taskQueue[taskIndex].taskId = realTaskId;
                                const lateSub = normalizeBool(realTaskNotice.is_allow_after_submitted);
                                task.allowLateSubmit = lateSub;
                                taskQueue[taskIndex].allowLateSubmit = lateSub;
                                const resourceRes = await fetchWithRetry(`https://${DOMAIN}/api/jx-iresource/resource/queryCourseResources?group_id=${groupId}`, {
                                    headers: { "authorization": `Bearer ${token}` }
                                }).then(r => r.json());
                                if (myNavId !== navigationId) return;
                                if (resourceRes.success) {
                                    const resInfo = resourceRes.data.find(r => String(r.task_id) === realTaskId);
                                    const realResourceId = String((resInfo && (resInfo.resource_id || resInfo.id)) || task.resourceId || realTaskId);
                                    task.resourceId = realResourceId;
                                    taskQueue[taskIndex].resourceId = realResourceId;
                                    if (resInfo && resInfo.watch_min_minutes > 0) {
                                        task.duration = Math.ceil((resInfo.watch_min_minutes * 60) + 20);
                                    } else {
                                        if (task.duration !== DEFAULT_DURATION * 60) task.duration = DEFAULT_DURATION * 60;
                                    }
                                    saveData();
                                    renderUI();
                                }
                            }
                        }
                    } catch (e) {
                        console.warn('[小雅自动刷] checkCurrentTask 失败:', e.message);
                    }
                }
                if (!currentTask || String(currentTask.nodeId) !== String(task.nodeId) || waitingUnlockText) startTimer(task);
            } else stopTimer();
        }

        function makeDraggable(el, handle) {
            handle.addEventListener('mousedown', (e) => {
                const rect = el.getBoundingClientRect();
                const offsetX = e.clientX - rect.left, offsetY = e.clientY - rect.top;
                el.style.right = 'auto'; el.style.bottom = 'auto';
                el.style.left = rect.left + 'px'; el.style.top = rect.top + 'px';
                function onMouseMove(e) {
                    const nextLeft = e.clientX - offsetX;
                    const nextTop = e.clientY - offsetY;
                    const safe = clampPositionToViewport(nextTop + 'px', nextLeft + 'px', { width: rect.width, height: rect.height });
                    el.style.left = safe.left;
                    el.style.top = safe.top;
                }
                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                    savePos(el.style.top, el.style.left);
                }
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        }


        const container = document.createElement('div');
        container.id = 'xy-helper-container';
        loadData();
        if (uiPos) { container.style.top = uiPos.top; container.style.left = uiPos.left; container.style.right = 'auto'; }
        else { container.style.top = '20%'; container.style.left = Math.max(10, window.innerWidth - 72) + 'px'; container.style.right = 'auto'; }
        Object.assign(container.style, { position: 'fixed', zIndex: '999999', fontFamily: "'PingFang SC', 'Segoe UI', system-ui, -apple-system, sans-serif" });
        document.body.appendChild(container);

        function ensureContainerMounted() {
            if (!container.isConnected && document.body) document.body.appendChild(container);
        }

        const style = document.createElement('style');
        style.textContent = `
        :root {
            --xy-primary: #007AFF;
            --xy-primary-hover: #0066D6;
            --xy-bg: rgba(255, 255, 255, 0.75);
            --xy-card-bg: rgba(255, 255, 255, 0.6);
            --xy-text-main: #1D1D1F;
            --xy-text-sub: #86868B;
            --xy-border: rgba(0, 0, 0, 0.08);
            --xy-shadow: 0 10px 40px -10px rgba(0,0,0,0.15);
        }

        @keyframes xy-pulse { 0%,100% { box-shadow: 0 4px 20px rgba(0,122,255,0.3); } 50% { box-shadow: 0 8px 36px rgba(0,122,255,0.5); } }
        @keyframes xy-status-dot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        
        .xy-ball { width: 56px; height: 56px; background-image: url('${ICON_BASE64}'); background-size: cover; background-position: center; border-radius: 50%; box-shadow: 0 6px 24px rgba(0,122,255,0.25); cursor: grab; display: flex; align-items: center; justify-content: center; user-select: none; transition: all 0.3s cubic-bezier(.25,.8,.25,1); }
        .xy-ball:hover { transform: scale(1.08); box-shadow: 0 10px 32px rgba(0,122,255,0.35); }
        .xy-ball.running { animation: xy-pulse 2.5s ease-in-out infinite; }

        .xy-panel { width: 460px; background: var(--xy-bg); backdrop-filter: blur(30px) saturate(1.8); -webkit-backdrop-filter: blur(30px) saturate(1.8); color: var(--xy-text-main); border-radius: 24px; box-shadow: var(--xy-shadow); overflow: hidden; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.5); font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif; transition: height 0.3s ease; }

        .xy-header { padding: 20px 28px; background: linear-gradient(135deg, #007AFF 0%, #0056D2 100%); display: flex; justify-content: space-between; align-items: center; cursor: grab; user-select: none; color: #fff; }
        .xy-header-title { font-weight: 600; font-size: 18px; letter-spacing: -0.3px; }
        .xy-header-version { font-size: 12px; opacity: 0.8; font-weight: 400; margin-left: 8px; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 10px; }
        .xy-header-btns { display: flex; gap: 10px; }
        .xy-header-btn { background: rgba(255,255,255,0.2); border: none; color: white; cursor: pointer; width: 32px; height: 32px; border-radius: 12px; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .xy-header-btn:hover { background: rgba(255,255,255,0.35); transform: scale(1.05); }

        .xy-status-bar { padding: 12px 20px; display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 500; background: rgba(255,255,255,0.5); border-bottom: 1px solid var(--xy-border); }
        .xy-status-left { display: flex; align-items: center; gap: 10px; flex: 1; padding-left: 16px; }
        .xy-status-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .xy-status-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; flex-shrink: 0; box-shadow: 0 0 8px currentColor; }
        .xy-status-dot.idle { background: var(--xy-text-sub); color: var(--xy-text-sub); }
        .xy-status-dot.active { background: #34C759; color: #34C759; animation: xy-status-dot 1.5s ease-in-out infinite; }
        .xy-status-dot.loading { background: #FF9500; color: #FF9500; animation: xy-status-dot 1s ease-in-out infinite; }
        .xy-status-text { color: var(--xy-text-main); font-weight: 600; }
        .xy-status-text.active { color: #34C759; }
        .xy-status-time { font-variant-numeric: tabular-nums; font-weight: 700; color: #34C759; background: rgba(52, 199, 89, 0.1); padding: 4px 10px; border-radius: 8px; max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block; }
        .xy-status-time.waiting { color: #d97706; background: rgba(255,149,0,0.14); }

        .xy-notice-card { margin: 10px 20px 4px; background: rgba(255,255,255,0.8); border: 1px solid var(--xy-border); border-radius: 16px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .xy-notice-header { padding: 14px 20px 8px; display: flex; align-items: center; gap: 8px; }
        .xy-notice-label { font-size: 14px; font-weight: 600; color: var(--xy-primary); }
        .xy-notice-body { padding: 0 20px 14px; font-size: 14px; color: var(--xy-text-sub); line-height: 1.6; white-space: pre-wrap; word-break: break-all; transition: max-height 0.4s ease, opacity 0.4s ease; overflow: hidden; }
        .xy-notice-body.collapsed { max-height: 44px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; margin-bottom: 0;}
        .xy-notice-toggle { display: block; width: 100%; padding: 12px 20px; border: none; border-top: 1px solid var(--xy-border); background: transparent; color: var(--xy-primary); font-size: 13px; font-weight: 500; cursor: pointer; transition: background 0.2s; border-radius: 0 0 16px 16px; }
        .xy-notice-toggle:hover { background: rgba(0,122,255,0.05); }

        .xy-list { max-height: 520px; overflow-y: auto; padding: 6px 10px 16px; scroll-behavior: smooth; flex: 1; }
        .xy-list::-webkit-scrollbar { width: 6px; }
        .xy-list::-webkit-scrollbar-track { background: transparent; }
        .xy-list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 10px; }
        .xy-list::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }

        .xy-group-header { padding: 12px 14px 6px; font-weight: 600; font-size: 13px; color: var(--xy-text-main); display: flex; align-items: center; gap: 8px; opacity: 0.9; cursor: pointer; user-select: none; border-radius: 10px; transition: background 0.2s; }
        .xy-group-header:hover { background: rgba(0,0,0,0.03); }
        .xy-group-arrow { font-size: 10px; color: var(--xy-text-sub); transition: transform 0.3s ease; display: inline-block; }
        .xy-group-arrow.collapsed { transform: rotate(-90deg); }
        .xy-group-count { font-size: 11px; color: var(--xy-text-sub); font-weight: 400; margin-left: auto; }
        .xy-group-items { overflow: hidden; transition: max-height 0.35s ease; }
        .xy-group-items.collapsed { max-height: 0 !important; }

        .xy-item { display: flex; flex-wrap: wrap; align-items: center; margin: 4px 10px; padding: 12px 16px; border-radius: 18px; background: var(--xy-card-bg); border: 1px solid var(--xy-border); transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
        .xy-item:hover { background: rgba(255,255,255,0.95); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .xy-item.active { background: rgba(0,122,255,0.05); border-color: rgba(0,122,255,0.3); box-shadow: 0 4px 16px rgba(0,122,255,0.1); }
        .xy-item.xy-urgent { background: rgba(255,59,48,0.05); border-color: rgba(255,59,48,0.2); }
        .xy-item.xy-warn { background: rgba(255,149,0,0.05); border-color: rgba(255,149,0,0.2); }
        .xy-item.xy-locked { background: rgba(255,149,0,0.08); border-color: rgba(255,149,0,0.24); }
        .xy-item.xy-late-submit { background: rgba(217,119,6,0.06); border-color: rgba(217,119,6,0.22); }
        .xy-item.xy-expired { background: rgba(120,120,128,0.08); border-color: rgba(120,120,128,0.22); opacity: 0.8; }

        .xy-item-name { flex: 1; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-right: 16px; cursor: pointer; color: var(--xy-text-main); font-weight: 500; }
        .xy-item-name:hover { color: var(--xy-primary); }

        .xy-deadline { width: 100%; font-size: 12px; margin-top: 10px; font-weight: 500; display: flex; align-items: center; gap: 4px; }

        .xy-item-right { display: flex; align-items: center; gap: 12px; }

        .xy-time-input { width: 54px; background: rgba(255,255,255,0.8); border: 1px solid var(--xy-border); color: var(--xy-text-main); font-size: 13px; text-align: center; border-radius: 10px; padding: 6px; outline: none; transition: all 0.2s; font-variant-numeric: tabular-nums; font-weight: 500; }
        .xy-time-input:focus { border-color: var(--xy-primary); box-shadow: 0 0 0 3px rgba(0,122,255,0.15); }
        .xy-time-input.waiting { color: var(--xy-text-sub); border-style: dashed; }

        .xy-delete { cursor: pointer; color: var(--xy-text-sub); font-size: 16px; padding: 6px; border-radius: 10px; transition: all 0.2s ease; display: inline-flex; background: rgba(0,0,0,0.03); }
        .xy-delete:hover { color: #FF3B30; background: rgba(255,59,48,0.1); transform: rotate(90deg); }

        .xy-tag { font-size: 11px; padding: 4px 10px; border-radius: 8px; font-weight: 600; display: inline-flex; align-items: center; margin-right: 8px; letter-spacing: 0.3px; }
        .xy-tag.video { background: var(--xy-primary); color: white; }
        .xy-tag:not(.video) { background: var(--xy-text-sub); color: white; }
        .xy-tag.locked { background: #ff9500; color: white; }
        .xy-tag.late-submit { background: #d97706; color: white; }
        .xy-tag.expired { background: #8e8e93; color: white; }

        .xy-empty { text-align: center; padding: 48px 20px; color: var(--xy-text-sub); font-size: 16px; }
        .xy-empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.6; }

        .xy-btn { border: none; padding: 6px 16px; border-radius: 100px; font-size: 12px; font-weight: 600; transition: all 0.2s ease; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
        .xy-btn.primary { background: var(--xy-primary); color: white; }
        .xy-btn.primary:hover { background: var(--xy-primary-hover); }
        .xy-btn.outline { background: transparent; color: var(--xy-text-sub); border: 1px solid var(--xy-border); }
        .xy-btn.outline:hover { background: rgba(0,0,0,0.04); color: var(--xy-text-main); }
    `;
        document.head.appendChild(style);

        function renderUI() {
            ensureContainerMounted();
            container.innerHTML = '';
            if (!isExpanded) {
                const ball = document.createElement('div');
                ball.className = 'xy-ball' + (currentTask ? ' running' : '');
                ball.title = '双击展开面板';
                ball.ondblclick = () => { isExpanded = true; renderUI(); };
                makeDraggable(container, ball);
                container.appendChild(ball);
            } else {
                const panel = document.createElement('div');
                panel.className = 'xy-panel';

                const header = document.createElement('div');
                header.className = 'xy-header';
                header.innerHTML = `<span class="xy-header-title">小雅自动刷<span class="xy-header-version">v1.5</span></span>`;
                const headerBtns = document.createElement('div');
                headerBtns.className = 'xy-header-btns';
                const closeBtn = document.createElement('button');
                closeBtn.className = 'xy-header-btn'; closeBtn.innerHTML = '✕'; closeBtn.title = '收起面板';
                closeBtn.onclick = () => { isExpanded = false; renderUI(); };
                headerBtns.appendChild(closeBtn);
                header.appendChild(headerBtns);
                makeDraggable(container, header); panel.appendChild(header);

                const status = document.createElement('div');
                status.className = 'xy-status-bar'; status.id = 'xy-timer-display';
                const statusLeft = document.createElement('div');
                statusLeft.className = 'xy-status-left';
                if (currentTask) {
                    if (waitingUnlockText) {
                        statusLeft.innerHTML = `<span class="xy-status-dot loading"></span><span class="xy-status-text">等待解锁</span><span class="xy-status-time waiting">${waitingUnlockText}</span>`;
                    } else if (remainingTime > 0) {
                        statusLeft.innerHTML = `<span class="xy-status-dot active"></span><span class="xy-status-text active">进行中</span><span class="xy-status-time">${formatSeconds(remainingTime)}</span>`;
                    } else {
                        statusLeft.innerHTML = `<span class="xy-status-dot loading"></span><span class="xy-status-text">正在读取时长…</span>`;
                    }
                } else {
                    statusLeft.innerHTML = `<span class="xy-status-dot idle"></span><span class="xy-status-text">待机中</span>`;
                }
                status.appendChild(statusLeft);
                const statusActions = document.createElement('div');
                statusActions.className = 'xy-status-actions';
                const refreshBtn = document.createElement('button');
                refreshBtn.className = 'xy-btn primary'; refreshBtn.id = 'xy-refresh-btn'; refreshBtn.innerText = '刷新';
                refreshBtn.onclick = fetchTasksFromApi;
                const silentBtn = document.createElement('button');
                silentBtn.className = 'xy-btn outline';
                silentBtn.innerText = `拦截声音:${silentEnabled ? '开' : '关'}`;
                silentBtn.title = '切换是否拦截声音';
                silentBtn.onclick = () => {
                    const wasOn = silentEnabled;
                    silentEnabled = !silentEnabled;
                    savePlayPref();
                    if (wasOn) {
                        alert('已关闭声音拦截，刷新页面后生效');
                    } else {
                        syncSilentState();
                    }
                    renderUI();
                };
                const clearBtn = document.createElement('button');
                clearBtn.className = 'xy-btn outline'; clearBtn.innerText = '清空';
                clearBtn.onclick = () => { if (confirm("确定清空本地列表吗？")) { taskQueue = []; saveData(); stopTimer(); renderUI(); } };
                statusActions.appendChild(refreshBtn); statusActions.appendChild(silentBtn); statusActions.appendChild(clearBtn);
                status.appendChild(statusActions);
                panel.appendChild(status);

                const noticeCard = document.createElement('div');
                noticeCard.className = 'xy-notice-card';
                const noticeHeader = document.createElement('div');
                noticeHeader.className = 'xy-notice-header';
                noticeHeader.innerHTML = `<span class="xy-notice-label">📌 公告</span>`;
                noticeCard.appendChild(noticeHeader);
                const noticeBody = document.createElement('div');
                noticeBody.className = 'xy-notice-body collapsed'; noticeBody.id = 'xy-notice-board';
                noticeBody.innerText = noticeContent;
                noticeCard.appendChild(noticeBody);
                const noticeToggle = document.createElement('button');
                noticeToggle.className = 'xy-notice-toggle'; noticeToggle.innerText = '阅读更多 ▾';
                noticeToggle.onclick = () => {
                    const isCollapsed = noticeBody.classList.contains('collapsed');
                    if (isCollapsed) {
                        noticeBody.classList.remove('collapsed');
                        noticeBody.style.maxHeight = noticeBody.scrollHeight + "px";
                        noticeToggle.innerText = '收起 ▴';
                    } else {
                        noticeBody.classList.add('collapsed');
                        noticeBody.style.maxHeight = '';
                        noticeToggle.innerText = '阅读更多 ▾';
                    }
                };
                noticeCard.appendChild(noticeToggle);
                panel.appendChild(noticeCard);

                const list = document.createElement('div');
                list.className = 'xy-list';
                if (taskQueue.length === 0) {
                    list.innerHTML = `<div class="xy-empty"><div class="xy-empty-icon">📂</div>暂无待完成任务</div>`;
                } else {
                    const groups = new Map();
                    taskQueue.forEach((task, index) => {
                        const gn = task.groupName || '未分类';
                        if (!groups.has(gn)) groups.set(gn, []);
                        groups.get(gn).push({ task, index });
                    });
                    groups.forEach((items, groupName) => {
                        const isGroupCollapsed = collapsedGroups.has(groupName);
                        const groupHeader = document.createElement('div');
                        groupHeader.className = 'xy-group-header';
                        groupHeader.innerHTML = `<span class="xy-group-arrow${isGroupCollapsed ? ' collapsed' : ''}">▼</span> 📂 ${groupName} <span class="xy-group-count">${items.length} 项</span>`;
                        const groupContainer = document.createElement('div');
                        groupContainer.className = 'xy-group-items' + (isGroupCollapsed ? ' collapsed' : '');
                        groupHeader.onclick = () => {
                            if (collapsedGroups.has(groupName)) collapsedGroups.delete(groupName);
                            else collapsedGroups.add(groupName);
                            renderUI();
                        };
                        list.appendChild(groupHeader);
                        items.forEach(({ task, index }) => {
                        const item = document.createElement('div');
                        const stateInfo = evaluateTaskState(task);
                        task.state = stateInfo.state;
                        task.locked = stateInfo.state === 'locked';
                        const isActive = currentTask && String(task.nodeId) === String(currentTask.nodeId);
                        let urgencyClass = '';
                        let deadlineColor = '#94a3b8', deadlineText = '';
                        if (stateInfo.state === 'expired') {
                            urgencyClass = ' xy-expired';
                            deadlineColor = '#8e8e93';
                            deadlineText = '已截止';
                        } else if (stateInfo.state === 'locked') {
                            urgencyClass = ' xy-locked';
                            deadlineColor = '#d97706';
                            const unlockAtText = stateInfo.unlockAt ? formatDateTime(stateInfo.unlockAt) : (task.unlockAt || '');
                            deadlineText = unlockAtText ? `⏳ ${formatDurationCn(stateInfo.remainingSec)} · ${unlockAtText} 开始` : `⏳ ${formatDurationCn(stateInfo.remainingSec)} 后开始`;
                        } else if (stateInfo.lateSubmit && task.endTime) {
                            urgencyClass = ' xy-late-submit';
                            deadlineColor = '#d97706';
                            const dl = new Date(task.endTime);
                            const dateStr = (dl.getMonth()+1) + '/' + dl.getDate() + ' ' + String(dl.getHours()).padStart(2,'0') + ':' + String(dl.getMinutes()).padStart(2,'0');
                            deadlineText = '📝 可补交 · 原截止 ' + dateStr;
                        } else if (task.endTime) {
                            const dl = new Date(task.endTime), nw = new Date();
                            const diffDays = (dl - nw) / 86400000;
                            if (diffDays <= 1) { urgencyClass = ' xy-urgent'; deadlineColor = '#dc2626'; deadlineText = diffDays <= 0 ? '⚠ 已截止' : '⚠ 今天截止'; }
                            else if (diffDays <= 3) { urgencyClass = ' xy-warn'; deadlineColor = '#d97706'; deadlineText = '⏰ ' + Math.ceil(diffDays) + '天后截止'; }
                            else { deadlineColor = '#94a3b8'; const dateStr = dl.getFullYear() !== nw.getFullYear() ? dl.getFullYear() + '/' + (dl.getMonth()+1) + '/' + dl.getDate() : (dl.getMonth()+1) + '/' + dl.getDate(); deadlineText = '截止 ' + dateStr; }
                        }
                        item.className = `xy-item${isActive ? ' active' : ''}${urgencyClass}`;

                        const name = document.createElement('div');
                        name.className = 'xy-item-name';
                        name.title = task.name || '未知任务';
                        const tagHtml = stateInfo.state === 'locked'
                            ? '<span class="xy-tag locked">🔒 未开启</span>'
                            : (stateInfo.state === 'expired'
                                ? '<span class="xy-tag expired">⏱ 已截止</span>'
                                : (stateInfo.lateSubmit
                                    ? '<span class="xy-tag late-submit">📝 可补交</span>'
                                    : (task.isVideo ? '<span class="xy-tag video">▶ 视频</span>' : '<span class="xy-tag">📄 文档</span>')));
                        name.innerHTML = `${tagHtml}${task.name || '未知任务'}`;
                        name.onclick = () => {
                            const targetUrl = buildTaskUrl(task);
                            if (targetUrl) window.location.replace(targetUrl);
                        };
                        item.appendChild(name);

                        const right = document.createElement('div');
                        right.className = 'xy-item-right';
                        const timeInput = document.createElement('input');
                        timeInput.type = 'text'; timeInput.className = 'xy-time-input';
                        if (task.duration && task.duration > 0) timeInput.value = (task.duration / 60).toFixed(1);
                        else { timeInput.value = ""; timeInput.placeholder = "待读取"; timeInput.className += " waiting"; }
                        timeInput.onchange = (e) => {
                            const val = parseFloat(e.target.value);
                            if (val && val > 0) {
                                task.duration = Math.ceil(val * 60);
                                if (isActive) {
                                    timerTotalDuration = task.duration;
                                    timerStartedAt = Date.now();
                                    remainingTime = task.duration;
                                }
                                saveData(); renderUI();
                            }
                        };
                        right.appendChild(timeInput);
                        if (task.duration > 0) {
                            const unit = document.createElement('span');
                            unit.className = 'xy-time-unit'; unit.innerText = 'min';
                            right.appendChild(unit);
                        }
                        const delBtn = document.createElement('div');
                        delBtn.className = 'xy-delete'; delBtn.innerHTML = '✕';
                        delBtn.title = '移除任务';
                        delBtn.onclick = () => { if (isActive) stopTimer(); taskQueue.splice(index, 1); saveData(); renderUI(); };
                        right.appendChild(delBtn); item.appendChild(right);

                        if (deadlineText) {
                            const dlRow = document.createElement('div');
                            dlRow.className = 'xy-deadline';
                            dlRow.style.color = deadlineColor;
                            dlRow.innerText = deadlineText;
                            item.appendChild(dlRow);
                        }
                        groupContainer.appendChild(item);
                        });
                        list.appendChild(groupContainer);
                    });
                }
                panel.appendChild(list);
                container.appendChild(panel);
            }
        }

        function updateTimerDisplay() {
            const el = document.getElementById('xy-timer-display');
            if (el && currentTask) {
                const left = el.querySelector('.xy-status-left');
                if (left) {
                    if (waitingUnlockText) left.innerHTML = `<span class="xy-status-dot loading"></span><span class="xy-status-text">等待解锁</span><span class="xy-status-time waiting">${waitingUnlockText}</span>`;
                    else if (remainingTime > 0) left.innerHTML = `<span class="xy-status-dot active"></span><span class="xy-status-text active">进行中</span><span class="xy-status-time">${formatSeconds(remainingTime)}</span>`;
                    else left.innerHTML = `<span class="xy-status-dot loading"></span><span class="xy-status-text">正在读取时长…</span>`;
                }
            }
        }

        function init() {
            navigationId++;
            clearDocPreviewCheck();
            loadData();
            ensureContainerMounted();
            const { groupId } = getPageInfo();
            if (!groupId && taskQueue.length === 0) fetchTasksFromApi();
            syncSilentState();
            renderUI();
            applySafeContainerPosition();
            setTimeout(checkCurrentTask, 1500);
        }

        runOneShotNoticeCheck();
        let lastUrl = location.href;
        new MutationObserver(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                init();
                return;
            }
            if (!container.isConnected) {
                ensureContainerMounted();
                renderUI();
                applySafeContainerPosition();
            }
        }).observe(document, { subtree: true, childList: true });
        init();
        window.addEventListener('resize', () => applySafeContainerPosition());

    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();
