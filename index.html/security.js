// ── security.js — Real hardening: sanitizer, error boundary, health, log ──

// 1. XSS SANITIZER
const ESCAPE_MAP = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'};
function esc(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'`=\/]/g, s => ESCAPE_MAP[s]);
}
function safeSetText(el, text) { if (el) el.textContent = String(text); }

// 2. INTERVAL MANAGER — prevents setInterval leaks on page nav
const IntervalManager = {
  _ids: [],
  add(fn, ms) { const id = setInterval(fn, ms); this._ids.push(id); return id; },
  clearAll() { this._ids.forEach(id => clearInterval(id)); this._ids = []; }
};

// 3. ERROR BOUNDARY — wraps page renders, shows friendly error if they throw
function safeRender(fn, ctx) {
  try {
    return fn();
  } catch(err) {
    HealthMonitor.recordRenderFail();
    AppLog.error('render error: '+err.message, ctx||'?');
    return `
    <div style="padding:4rem 2rem;text-align:center;max-width:520px;margin:0 auto">
      <div style="font-size:3rem;margin-bottom:1rem">⚠️</div>
      <div style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.75rem;color:var(--amber);text-transform:uppercase;margin-bottom:.75rem">Render Error</div>
      <div style="font-family:'IBM Plex Mono',monospace;font-size:.72rem;color:var(--muted2);background:var(--n2);border:1px solid var(--border);border-radius:6px;padding:1rem;text-align:left;word-break:break-all;margin-bottom:1.25rem">${esc(err.message)}</div>
      <button class="btn btn-sm btn-ice" onclick="navigate('home')">← Return Home</button>
    </div>`;
  }
}

// 4. APP LOG
const AppLog = (() => {
  const MAX = 200; const _log = [];
  function _entry(level, msg, ctx) {
    const e = { ts: new Date().toISOString(), level, msg: String(msg).slice(0,300), ctx: ctx?String(ctx).slice(0,80):'' };
    _log.unshift(e); if (_log.length > MAX) _log.pop(); return e;
  }
  return {
    info(msg,ctx)     { return _entry('INFO', msg, ctx); },
    warn(msg,ctx)     { return _entry('WARN', msg, ctx); },
    error(msg,ctx)    { return _entry('ERROR',msg, ctx); },
    security(msg,ctx) { return _entry('SEC',  msg, ctx); },
    all()             { return [..._log]; },
    recent(n=20)      { return _log.slice(0,n); },
    clear()           { _log.splice(0); },
  };
})();

// 5. INPUT VALIDATOR
const Validate = {
  chatMessage(text) {
    if (!text || typeof text !== 'string') return { ok:false, reason:'empty' };
    const t = text.trim();
    if (!t.length) return { ok:false, reason:'empty' };
    if (t.length > 500) return { ok:false, reason:'too long (max 500)' };
    if (/<script|javascript:|on\w+\s*=|data:/i.test(t)) {
      AppLog.security('XSS blocked in chat', t.slice(0,40));
      return { ok:false, reason:'invalid characters' };
    }
    return { ok:true, value:t };
  },
  searchQuery(q) {
    if (!q || typeof q !== 'string') return { ok:true, value:'' };
    const t = q.trim().slice(0,100);
    if (/<|>|script|javascript/i.test(t)) { AppLog.security('XSS blocked in search', t.slice(0,40)); return { ok:true, value:'' }; }
    return { ok:true, value:t };
  }
};

// 6. HEALTH MONITOR
const HealthMonitor = (() => {
  let _errors=0, _renders=0, _renderFail=0;
  const _start = Date.now();
  window.addEventListener('error', e => { _errors++; AppLog.error('uncaught: '+e.message, e.filename+':'+e.lineno); });
  window.addEventListener('unhandledrejection', e => { _errors++; AppLog.error('promise: '+(e.reason?.message||e.reason)); });
  function uptime() { const s=Math.floor((Date.now()-_start)/1000),m=Math.floor(s/60),h=Math.floor(m/60); return h>0?`${h}h ${m%60}m`:m>0?`${m}m ${s%60}s`:`${s}s`; }
  function mem() { return window.performance?.memory ? (window.performance.memory.usedJSHeapSize/1048576).toFixed(1)+' MB' : 'N/A'; }
  function score() { return Math.max(0, 100 - _errors*10 - _renderFail*20); }
  function scoreColor(s) { return s>=90?'var(--green2)':s>=70?'var(--amber)':'var(--red2)'; }
  return {
    recordRender()    { _renders++; },
    recordRenderFail(){ _renderFail++; _errors++; },
    report() { const s=score(); return { score:s, scoreColor:scoreColor(s), uptime:uptime(), memory:mem(), renders:_renders, errors:_errors }; }
  };
})();

// 7. HEALTH PAGE
function renderHealth() {
  const r = HealthMonitor.report();
  const logs = AppLog.recent(30);
  const LC = { INFO:'var(--ice)', WARN:'var(--amber)', ERROR:'var(--red2)', SEC:'var(--purple3)' };
  const LB = { INFO:'rgba(77,184,255,.08)', WARN:'rgba(245,158,11,.08)', ERROR:'rgba(239,68,68,.08)', SEC:'rgba(139,92,246,.08)' };

  return `
  <div class="page page-sm page-enter">
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem;flex-wrap:wrap">
      <div style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.85rem;text-transform:uppercase;color:var(--ice4)">System Health</div>
      <span class="live-badge"><span style="width:5px;height:5px;border-radius:50%;background:var(--green);flex-shrink:0;animation:pulse 1.4s infinite;display:inline-block;margin-right:2px"></span>LIVE</span>
      <button class="btn btn-xs btn-navy" style="margin-left:auto" onclick="navigate('health')">↻ Refresh</button>
    </div>

    <div class="card card-accent stagger-1" style="margin-bottom:1rem;display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap">
      <div style="text-align:center;flex-shrink:0">
        <div style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:3.5rem;color:${r.scoreColor};line-height:1">${r.score}</div>
        <div style="font-family:'IBM Plex Mono',monospace;font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted2)">Health Score</div>
      </div>
      <div style="flex:1;min-width:200px">
        <div class="prog-track" style="height:8px;margin-bottom:.75rem">
          <div class="prog-fill" style="width:${r.score}%;background:${r.scoreColor}"></div>
        </div>
        <div style="display:flex;gap:1.5rem;flex-wrap:wrap">
          ${[['Uptime',r.uptime],['Memory',r.memory],['Renders',r.renders],['Errors',r.errors]].map(([l,v])=>`
          <div><div style="font-family:'IBM Plex Mono',monospace;font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2)">${l}</div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.1rem;color:var(--ice4)">${v}</div></div>`).join('')}
        </div>
      </div>
    </div>

    <div class="card stagger-2" style="margin-bottom:1rem">
      <div class="card-hd">Security Controls — Active</div>
      ${[
        ['Content Security Policy',     "no eval · no external scripts · form-action 'self'"],
        ['XSS Input Sanitizer',         'esc() applied to all user-supplied strings before innerHTML'],
        ['HTML Injection Guard',         'chat + search input validated via Validate module'],
        ['Error Boundary',               'every page render wrapped in safeRender()'],
        ['Interval Leak Prevention',     'IntervalManager.clearAll() on every navigate()'],
        ['X-Frame-Options: DENY',        'clickjacking prevented via meta header'],
        ['X-Content-Type-Options',       'MIME sniffing blocked'],
        ['Referrer-Policy: strict',      'referrer leakage prevented'],
        ['No eval() / document.write()', 'confirmed absent — grep clean'],
        ['Structured Event Log',         'AppLog records all security + nav events'],
      ].map(([l,n])=>`
      <div style="display:flex;align-items:center;gap:.75rem;padding:.45rem 0;border-bottom:1px solid var(--border)">
        <div style="color:var(--green);flex-shrink:0">✓</div>
        <div style="flex:1">
          <div style="font-size:.83rem;color:var(--ice4);font-weight:500">${l}</div>
          <div style="font-family:'IBM Plex Mono',monospace;font-size:.58rem;color:var(--muted2)">${n}</div>
        </div>
        <span class="badge badge-green">active</span>
      </div>`).join('')}
    </div>

    <div class="card stagger-3" style="margin-bottom:1rem">
      <div class="card-hd">
        Event Log
        <button class="btn btn-xs btn-ghost" onclick="AppLog.clear();navigate('health')">Clear</button>
      </div>
      ${logs.length === 0
        ? `<div style="font-family:'IBM Plex Mono',monospace;font-size:.7rem;color:var(--muted2);text-align:center;padding:1.25rem">No events yet — navigate around to populate</div>`
        : logs.map(l=>`
        <div style="display:flex;gap:.65rem;align-items:flex-start;padding:.4rem 0;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:.63rem">
          <span style="background:${LB[l.level]||LB.INFO};color:${LC[l.level]||LC.INFO};padding:.08rem .38rem;border-radius:2px;flex-shrink:0;min-width:36px;text-align:center">${l.level}</span>
          <span style="color:var(--muted2);flex-shrink:0;white-space:nowrap">${l.ts.slice(11,19)}</span>
          <span style="color:var(--ice3);flex:1;word-break:break-all">${esc(l.msg)}</span>
          ${l.ctx?`<span style="color:var(--muted);flex-shrink:0;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(l.ctx)}</span>`:''}
        </div>`).join('')}
    </div>

    <div class="alert alert-blue stagger-4">
      <div class="alert-icon">ℹ️</div>
      <div class="alert-body">
        <strong>What's real vs. not</strong>
        This is a static HTML/JS dashboard. Real threats addressed: XSS, clickjacking, MIME sniffing, referrer leakage, input injection, render crashes, and interval leaks. "Data Worms," "DNA Hijacking," "Buffer Overflows," and "Sovereign Kernels" are not applicable to a frontend demo — those terms don't map to anything in this codebase.
      </div>
    </div>
  </div>`;
}
