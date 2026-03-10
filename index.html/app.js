// ── app.js v2 — Hardened router, nav, toast, modal, particles ────────

// ── STATE ─────────────────────────────────────────────────────────────
let currentPage = 'home';
let notifOpen   = false;

// ── ROUTER ────────────────────────────────────────────────────────────
function navigate(page) {
  IntervalManager.clearAll();
  currentPage = page;
  AppLog.info('navigate → ' + page);
  renderNav();
  renderPage();
  renderMobileNav();
  notifOpen = false;
  const np = document.getElementById('notif-panel');
  if (np) np.style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPage() {
  const el = document.getElementById('main-content');
  if (!el) return;
  const renders = {
    home: renderHome, dashboard: renderDashboard, shifts: renderShifts,
    map: renderMap, workers: renderWorkers, analytics: renderAnalytics,
    payroll: renderPayroll, comms: renderComms, events: renderEvents,
    profile: renderProfile, health: renderHealth,
  };
  const fn = renders[currentPage] || renderHome;
  HealthMonitor.recordRender();
  el.innerHTML = safeRender(fn, currentPage);
}

// ── NAV ───────────────────────────────────────────────────────────────
function renderNav() {
  const c = document.getElementById('nav-center');
  if (!c) return;
  const pages = ['dashboard','shifts','map','workers','analytics','payroll','comms','events'];
  c.innerHTML = pages.map(p => {
    const info = NAV_PAGES.find(x => x.id === p);
    return `<button class="nav-btn ${currentPage===p?'active':''}" onclick="navigate('${p}')">${info ? `${esc(info.icon)} ${esc(info.label)}` : esc(p)}</button>`;
  }).join('') +
  `<button class="nav-btn ${currentPage==='health'?'active':''}" onclick="navigate('health')" title="Health">🛡️</button>`;
}

function renderMobileNav() {
  const el = document.getElementById('mobile-nav');
  if (!el) return;
  const pages = ['home','dashboard','shifts','map','workers','health'];
  el.innerHTML = pages.map(p => {
    const info = NAV_PAGES.find(x => x.id === p) || { icon:'🛡️', label:'Health' };
    return `<button class="mobile-nav-item ${currentPage===p?'active':''}" onclick="navigate('${p}')"><span style="font-size:1.15rem">${esc(info.icon)}</span>${esc(info.label)}</button>`;
  }).join('');
}

// ── NOTIFICATIONS ─────────────────────────────────────────────────────
function toggleNotif() {
  notifOpen = !notifOpen;
  const panel = document.getElementById('notif-panel');
  if (!panel) return;
  if (notifOpen) {
    panel.style.display = 'block';
    panel.innerHTML = `
    <div class="notif-hd"><div class="notif-title">Notifications</div><button class="btn btn-xs btn-ghost" onclick="toggleNotif()">✕</button></div>
    ${NOTIFICATIONS.map(n=>`
    <div class="notif-item ${n.unread?'unread':''}">
      <div class="notif-icon" style="background:${esc(n.iconBg)}">${esc(n.icon)}</div>
      <div style="flex:1"><div class="notif-text">${esc(n.title)}</div>
      <div class="notif-text" style="font-size:.75rem;margin-top:.2rem">${esc(n.text)}</div>
      <div class="notif-time">${esc(n.time)}</div></div>
    </div>`).join('')}
    <div style="padding:.6rem 1rem;text-align:center"><button class="btn btn-xs btn-outline" onclick="toggleNotif()">Mark all read</button></div>`;
    const dot = document.getElementById('notif-dot');
    if (dot) setTimeout(() => dot.style.display = 'none', 800);
  } else {
    panel.style.display = 'none';
  }
}

// ── MODALS ────────────────────────────────────────────────────────────
function showModal(type, id) {
  const overlay = document.getElementById('modal-overlay');
  const box = document.getElementById('modal-box');
  if (!overlay || !box) return;
  box.innerHTML = safeRender(() => getModalContent(type, id), 'modal:'+type);
  overlay.style.display = 'flex';
  AppLog.info('modal: '+type+' id='+id);
}
function closeModal(event) {
  if (!event || event.target.id === 'modal-overlay')
    document.getElementById('modal-overlay').style.display = 'none';
}

// ── TOASTS ────────────────────────────────────────────────────────────
let toastId = 0;
function showToast(title, sub, icon, color) {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const id = 'toast-'+(++toastId);
  const dur = 4;
  const div = document.createElement('div');
  div.className = 'toast'; div.id = id;
  div.innerHTML = `
    <div class="toast-icon" style="background:rgba(${hexToRgb(color)},.15);color:${esc(color)}">${esc(icon)}</div>
    <div class="toast-body"><div class="toast-title">${esc(title)}</div><div class="toast-sub">${esc(sub)}</div></div>
    <div class="toast-close" onclick="removeToast('${id}')">✕</div>
    <div class="toast-progress" style="--toast-color:${esc(color)};--toast-dur:${dur}s"></div>`;
  div.onclick = () => removeToast(id);
  c.appendChild(div);
  setTimeout(() => removeToast(id), dur * 1000 + 300);
}
function removeToast(id) { const el = document.getElementById(id); if (el) el.remove(); }
function hexToRgb(hex) {
  if (typeof hex !== 'string') return '77,184,255';
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '77,184,255';
}

// ── PARTICLES ─────────────────────────────────────────────────────────
function initParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  const colors = ['#4db8ff','#1a5ebd','#22c55e','#f59e0b','#8b5cf6'];
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${Math.random()*20+15}s;animation-delay:${Math.random()*15}s;opacity:0;`;
    frag.appendChild(p);
  }
  c.appendChild(frag);
}

// ── SHIFT ACTIONS ─────────────────────────────────────────────────────
function acceptShift(id) {
  const s = SHIFTS.find(x => x.id === id);
  if (!s) return;
  if (s.status === 'open' || s.status === 'urgent') {
    s.filled = Math.min(s.filled + 1, s.workers);
    if (s.filled >= s.workers) s.status = 'active';
    AppLog.info('shift accepted: ' + s.title, s.ward);
  }
  showToast('Shift Accepted', s.title+' · '+s.ward+' · '+s.time, '✅', '#22c55e');
  const list = document.getElementById('shift-list');
  if (list) list.innerHTML = SHIFTS.map(renderShiftRow).join('');
}

function switchShiftTab(btn, label) {
  document.querySelectorAll('#shift-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const list = document.getElementById('shift-list');
  if (!list) return;
  const map = { Active: s => s.status==='active', Open: s => s.status==='open'||s.status==='urgent', Complete: s => s.status==='complete' };
  const filtered = map[label] ? SHIFTS.filter(map[label]) : SHIFTS;
  list.innerHTML = filtered.length ? filtered.map(renderShiftRow).join('') :
    `<div style="text-align:center;padding:2rem;color:var(--muted2);font-family:'IBM Plex Mono',monospace;font-size:.75rem">No shifts in this category</div>`;
}

// ── WORKER SEARCH ─────────────────────────────────────────────────────
function filterWorkers(raw) {
  const wrap = document.getElementById('workers-table-wrap');
  if (!wrap) return;
  const result = Validate.searchQuery(raw);
  const q = result.value.toLowerCase();
  const filtered = q ? WORKERS.filter(w => w.name.toLowerCase().includes(q) || w.ward.toLowerCase().includes(q)) : WORKERS;
  wrap.innerHTML = renderWorkersTable(filtered);
}

// ── CHAT ──────────────────────────────────────────────────────────────
function sendChatMsg(e) { if (e.key === 'Enter') sendChatMsgBtn(); }
function sendChatMsgBtn() {
  const input = document.getElementById('chat-input');
  const msgs  = document.getElementById('chat-msgs');
  if (!input || !msgs) return;
  const v = Validate.chatMessage(input.value);
  if (!v.ok) {
    if (v.reason !== 'empty') { showToast('Message blocked', v.reason, '🛡️', '#8b5cf6'); AppLog.security('chat blocked: '+v.reason); }
    return;
  }
  input.value = '';
  const div = document.createElement('div');
  div.className = 'msg me';
  div.innerHTML = `<div class="msg-bubble">${esc(v.value)}</div><div class="msg-time">Now</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  AppLog.info('chat sent', v.value.slice(0,30));
  setTimeout(() => {
    const r = document.createElement('div');
    r.className = 'msg them';
    r.innerHTML = `<div class="msg-bubble">Message received. Standing by.</div><div class="msg-time">Now</div>`;
    msgs.appendChild(r);
    msgs.scrollTop = msgs.scrollHeight;
  }, 900);
}

function selectThread(id, el) {
  document.querySelectorAll('.chat-thread').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  const t = CHAT_THREADS.find(x => x.id === id);
  if (!t) return;
  const hd = document.querySelector('.chat-hd-name');
  if (hd) safeSetText(hd, t.name);
  const msgs = document.getElementById('chat-msgs');
  if (!msgs) return;
  const ms = CHAT_MESSAGES[id] || [];
  msgs.innerHTML = ms.map(m =>
    `<div class="msg ${m.me?'me':'them'}"><div class="msg-bubble">${esc(m.text)}</div><div class="msg-time">${esc(m.time)}</div></div>`
  ).join('') || `<div style="text-align:center;padding:2rem;color:var(--muted2);font-size:.8rem">Start the conversation</div>`;
}

// ── STORM SIM ─────────────────────────────────────────────────────────
function simulateStorm() {
  AppLog.info('storm simulation started');
  const storms = [
    ['New shift open','Sidewalk Salting · Ward 5 · URGENT','⚡','#f59e0b'],
    ['Worker checked in','Marcus W. · GPS verified · Ward 5','📍','#22c55e'],
    ['Hydrant cleared','Aisha M. · Ward 12 · Photo confirmed','✅','#22c55e'],
    ['311 escalation','Windrow complaint · Elm & Yonge','📞','#4db8ff'],
  ];
  let i = 0;
  const fire = () => { if (i >= storms.length) return; const s = storms[i++]; showToast(s[0],s[1],s[2],s[3]); AppLog.info('sim: '+s[0]); setTimeout(fire, 2800); };
  fire();
}

// ── KEYBOARD ──────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); if (notifOpen) toggleNotif(); }
  if (!e.target.matches('input,textarea,select')) {
    if (e.key === '?') showToast('Shortcuts','Esc close · S storm · H health · ? help','⌨️','#8b5cf6');
    if (e.key==='s'||e.key==='S') simulateStorm();
    if (e.key==='h'||e.key==='H') navigate('health');
  }
});

// ── INIT ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  AppLog.info('app init', 'v2-hardened');
  AppLog.security('CSP active · XSS sanitizer loaded · error boundary active · interval manager active');
  initParticles();
  renderNav();
  renderMobileNav();
  renderPage();
  setTimeout(() => showToast('CIVIC RESERVE','Storm Level 3 · 47 workers deployed','🌨️','#4db8ff'), 600);
  IntervalManager.add(() => {
    const u = [['GPS Check-in','Worker verified · Ward 12','📍','#22c55e'],['Photo Verified','Task confirmed','✅','#22c55e'],['311 Request','Windrow complaint','📋','#f59e0b']][Math.floor(Math.random()*3)];
    showToast(u[0],u[1],u[2],u[3]); AppLog.info('live: '+u[0]);
  }, 28000);
});
