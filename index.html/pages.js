// ── pages.js — All page render functions ─────────────────────────────

// ─── HOME PAGE ──────────────────────────────────────────────────────
function renderHome() {
  return `
  <div class="hero-v15">
    <div class="hero-v15-bg">
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>
      <div class="hero-orb hero-orb-3"></div>
    </div>
    <div class="hero-grid page-enter" style="padding:5rem 2rem 4rem;max-width:1200px;margin:0 auto;position:relative;z-index:1;width:100%">
      <div>
        <div class="hero-tag stagger-1">
          <span class="blink"></span>
          CIVIC RESERVE · Live Deployment
        </div>
        <h1 class="hero-title stagger-2">
          <span class="t1">WORK</span>
          <span class="t2">RESPONSE</span>
        </h1>
        <p class="hero-sub stagger-3">Toronto's on-demand municipal workforce platform. Verified workers. Real-time dispatch. GPS-confirmed delivery. Built for the City, powered by community.</p>
        <div class="hero-ctas stagger-4">
          <button class="btn btn-lg btn-ice" onclick="navigate('dashboard')">City Dashboard</button>
          <button class="btn btn-lg btn-outline" onclick="navigate('shifts')">View Shifts</button>
        </div>
        <div class="hazard-row stagger-5">
          <span class="hz-pill hz-snow">❄️ Windrow Clearance</span>
          <span class="hz-pill hz-snow">🚒 Hydrant Recovery</span>
          <span class="hz-pill hz-flood">💧 Storm Drain</span>
          <span class="hz-pill hz-civic">♿ AODA Access</span>
          <span class="hz-pill hz-wind">🚌 Transit Stops</span>
        </div>
      </div>
      <div class="hero-right-col stagger-6">
        <div class="live-card">
          <div class="live-card-hd">
            <span class="live-lbl">Live Operations</span>
            <div class="live-dot-row"><div class="blink"></div>47 active</div>
          </div>
          <div class="live-card-body">
            <div class="mini-alert">
              <div class="mini-alert-icon">🌨️</div>
              <div class="mini-alert-text"><strong>Storm Level 3 Active</strong>Full deployment — all 3 pilot wards</div>
            </div>
            ${WORKERS.filter(w => w.status === 'on-shift').slice(0, 3).map(w => `
            <div class="mini-worker">
              <div class="mini-av" style="background:${w.bg};color:${w.color};border:1.5px solid ${w.color}">${w.initials}</div>
              <div class="mini-info">
                <div class="mini-name">${w.name}</div>
                <div class="mini-sub">${w.ward} · GPS active</div>
              </div>
              <div class="mini-status" style="color:var(--green)">On-Shift</div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="stats-strip">
    <div class="stat-item"><div class="stat-num">47</div><div class="stat-lbl">Active Workers</div></div>
    <div class="stat-item"><div class="stat-num">134</div><div class="stat-lbl">Shifts Today</div></div>
    <div class="stat-item"><div class="stat-num">98.4%</div><div class="stat-lbl">Verified Rate</div></div>
    <div class="stat-item"><div class="stat-num">11m</div><div class="stat-lbl">Avg Response</div></div>
    <div class="stat-item"><div class="stat-num">$8,420</div><div class="stat-lbl">Wages Today</div></div>
  </div>
  <div class="trust-bar">
    <span class="trust-item"><span class="trust-dot"></span>MFIPPA Compliant</span>
    <span class="trust-item"><span class="trust-dot"></span>AES-256 Encrypted</span>
    <span class="trust-item"><span class="trust-dot"></span>Canadian Data Hosting</span>
    <span class="trust-item"><span class="trust-dot"></span>$5M CGL Insurance</span>
    <span class="trust-item"><span class="trust-dot"></span>Bill 88 Compliant</span>
    <span class="trust-item"><span class="trust-dot"></span>ODSP Directive 5.1</span>
  </div>`;
}

// ─── DASHBOARD ──────────────────────────────────────────────────────
function renderDashboard() {
  const maxEarn = Math.max(...WEEK_EARNINGS.map(d => d.val));
  return `
  <div class="admin-shell">
    ${renderAdminSidebar('dashboard')}
    <div class="admin-main">
      <div class="admin-title page-enter">
        <span>Operations Overview</span>
        <div style="display:flex;gap:.5rem;align-items:center">
          <span class="live-badge"><span class="blink" style="width:5px;height:5px;border-radius:50%;background:var(--red);flex-shrink:0"></span>LIVE</span>
          <button class="btn btn-sm btn-amber" onclick="showToast('Report generated','Weekly KPI summary ready','📋','#f59e0b')">Export Report</button>
        </div>
      </div>

      <!-- DISPATCH ALERT -->
      <div class="dispatch-ev stagger-1">
        <div class="dispatch-ev-icon">🌨️</div>
        <div class="dispatch-ev-info">
          <div class="dispatch-ev-title">Storm Level 3 — Active Deployment</div>
          <div class="dispatch-ev-meta">47 workers dispatched · Wards 3, 5, 12 · Issued 04:15 today</div>
        </div>
        <button class="btn-dispatch" onclick="navigate('map')">Live Map →</button>
      </div>

      <!-- KPI STRIP -->
      <div class="g3 stagger-2" style="margin-bottom:1.1rem">
        ${Object.values(KPI_DATA).map(k => `
        <div class="kpi" style="--top-color:${k.top};--val-color:${k.color}">
          <div class="kpi-lbl">${k.lbl}</div>
          <div class="kpi-val">${k.val}</div>
          <div class="kpi-sub">${k.sub}</div>
          <div class="kpi-delta ${k.up ? 'up' : 'dn'}">${k.up ? '▲' : '▼'} ${k.delta}</div>
        </div>`).join('')}
      </div>

      <div class="g2 stagger-3">
        <!-- ACTIVITY -->
        <div class="card card-accent">
          <div class="card-hd">Activity Feed <span class="badge badge-green">Live</span></div>
          <div class="activity-feed">
            ${ACTIVITY.slice(0, 6).map(a => `
            <div class="af-item">
              <div class="af-icon" style="background:${a.bg};color:${a.color}">${a.icon}</div>
              <div class="af-body">
                <div class="af-title">${a.title}</div>
                <div class="af-sub">${a.sub}</div>
              </div>
              <div class="af-time">${a.time}</div>
            </div>`).join('')}
          </div>
        </div>

        <!-- RIGHT COL -->
        <div>
          <!-- WEATHER -->
          <div class="weather-card stagger-4" style="margin-bottom:1rem">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <div class="weather-temp">−7°C</div>
                <div class="weather-cond">Heavy Snow · Storm Level 3</div>
              </div>
              <div style="font-size:2.5rem">🌨️</div>
            </div>
            <div class="weather-detail">
              <span class="weather-detail-item">💨 Wind 32km/h</span>
              <span class="weather-detail-item">👁 Vis 400m</span>
              <span class="weather-detail-item">❄️ 12–18cm forecast</span>
            </div>
          </div>

          <!-- EARNINGS CHART -->
          <div class="card" style="margin-bottom:1rem">
            <div class="card-hd">Weekly Earnings</div>
            <div class="earnings-bar-wrap">
              ${WEEK_EARNINGS.map(d => `
              <div class="earnings-bar-row">
                <div class="earnings-bar-lbl">${d.day}</div>
                <div class="earnings-bar-track">
                  <div class="earnings-bar-fill" style="width:${Math.round(d.val/maxEarn*100)}%;background:linear-gradient(90deg,var(--ice),var(--ice2))"></div>
                </div>
                <div class="earnings-bar-val">$${d.val}</div>
              </div>`).join('')}
            </div>
          </div>

          <!-- TIMELINE -->
          <div class="card">
            <div class="card-hd">Today's Timeline</div>
            <div class="timeline">
              ${TIMELINE_DATA.map(t => `
              <div class="tl-item">
                <div class="tl-dot ${t.dot}" style="border-color:${t.dot==='done'?'var(--ice)':t.dot==='active'?'var(--amber)':'var(--border)'}"></div>
                <div class="tl-time">${t.time}</div>
                <div class="tl-title">${t.title}</div>
                <div class="tl-sub">${t.sub}</div>
              </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// ─── SHIFTS ─────────────────────────────────────────────────────────
function renderShifts() {
  return `
  <div class="admin-shell">
    ${renderAdminSidebar('shifts')}
    <div class="admin-main">
      <div class="admin-title page-enter">
        Shift Board
        <button class="btn btn-sm btn-ice" onclick="showModal('new-shift')">+ New Shift</button>
      </div>
      <div class="tab-row" id="shift-tabs">
        ${['All Shifts','Active','Open','Complete'].map((t,i) => `
        <button class="tab-btn ${i===0?'active':''}" onclick="switchShiftTab(this,'${t}')">${t}</button>`).join('')}
      </div>
      <div id="shift-list" class="stagger-1">
        ${SHIFTS.map(s => renderShiftRow(s)).join('')}
      </div>
    </div>
  </div>`;
}

function renderShiftRow(s) {
  const statusBadge = {
    active: 'badge-green', open: 'badge-amber',
    urgent: 'badge-red',   complete: 'badge-muted'
  }[s.status] || 'badge-muted';
  return `
  <div class="shift-row-v15" style="--shift-color:${s.color}" onclick="showModal('shift-detail',${s.id})">
    <div class="shift-icon">${s.icon}</div>
    <div class="shift-info">
      <div class="shift-name">${esc(s.title)}</div>
      <div class="shift-meta">${esc(s.ward)} · ${esc(s.time)} · ${esc(s.pay)}</div>
    </div>
    <div style="display:flex;gap:.5rem;align-items:center;flex-shrink:0">
      <span class="p-chip ${s.priority==='P1'?'p-critical':s.priority==='P2'?'p-high':'p-normal'}">${esc(s.priority)}</span>
      <span class="badge ${statusBadge}">${esc(s.status)}</span>
      <span style="font-size:.75rem;color:var(--muted2);font-family:'IBM Plex Mono',monospace">${esc(s.filled)}/${esc(s.workers)}</span>
      ${s.status === 'open' || s.status === 'urgent'
        ? `<button class="btn btn-xs btn-ice" onclick="event.stopPropagation();acceptShift(${s.id})">Accept</button>`
        : ''}
    </div>
  </div>`;
}

// ─── MAP ─────────────────────────────────────────────────────────────
function renderMap() {
  return `
  <div class="map-page page-enter">
    <div class="map-sidebar">
      <div class="map-sidebar-hd">
        <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:.9rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ice4);margin-bottom:.5rem">Live Map</div>
        <div style="display:flex;gap:.4rem;align-items:center">
          <span class="live-badge" style="font-size:.52rem"><span class="blink" style="width:5px;height:5px;border-radius:50%;background:var(--red);flex-shrink:0"></span>LIVE</span>
          <span style="font-family:'IBM Plex Mono',monospace;font-size:.6rem;color:var(--muted2)">47 workers tracked</span>
        </div>
      </div>
      ${MAP_WORKERS.map(w => `
        <div class="map-worker-item ${w.status==='active'?'active':''}">
        <div class="map-status-dot" style="background:${w.color}"></div>
        <div style="flex:1">
          <div style="font-size:.84rem;font-weight:600;color:var(--ice4)">${esc(w.name)}</div>
          <div style="font-family:'IBM Plex Mono',monospace;font-size:.62rem;color:var(--muted2)">${esc(w.shift)}</div>
        </div>
        <span class="status-pill ${w.status==='active'?'onshift':w.status==='standby'?'away':'offline'}">${esc(w.status)}</span>
      </div>`).join('')}
    </div>
    <div class="map-main">
      <div class="map-grid" style="width:100%;height:100%;position:absolute;inset:0"></div>
      <!-- Ward zones -->
      <div class="map-zone-overlay" style="left:15%;top:15%;width:28%;height:35%;pointer-events:none">
        <span style="font-family:'IBM Plex Mono',monospace;font-size:.58rem;color:rgba(77,184,255,.5);letter-spacing:.1em">WARD 5</span>
      </div>
      <div class="map-zone-overlay" style="left:50%;top:12%;width:32%;height:32%;pointer-events:none;border-color:rgba(34,197,94,.2);background:rgba(34,197,94,.04)">
        <span style="font-family:'IBM Plex Mono',monospace;font-size:.58rem;color:rgba(34,197,94,.5);letter-spacing:.1em">WARD 12</span>
      </div>
      <div class="map-zone-overlay" style="left:20%;top:55%;width:35%;height:30%;pointer-events:none;border-color:rgba(139,92,246,.2);background:rgba(139,92,246,.04)">
        <span style="font-family:'IBM Plex Mono',monospace;font-size:.58rem;color:rgba(139,92,246,.5);letter-spacing:.1em">WARD 3</span>
      </div>
      <!-- Worker dots -->
      ${MAP_WORKERS.map(w => `
      <div class="map-dot" style="left:${w.left};top:${w.top};background:${w.color};color:${w.color}" title="${w.name}: ${w.shift}"></div>`).join('')}
      <!-- Controls -->
      <div class="map-controls">
        <div class="map-ctrl-btn" title="Zoom In">+</div>
        <div class="map-ctrl-btn" title="Zoom Out">−</div>
        <div class="map-ctrl-btn" title="Recenter">⊙</div>
        <div class="map-ctrl-btn" title="Layers">⊞</div>
      </div>
      <!-- Legend -->
      <div class="map-legend">
        <div style="font-family:'IBM Plex Mono',monospace;font-size:.58rem;color:var(--muted2);margin-bottom:.3rem;text-transform:uppercase;letter-spacing:.08em">Legend</div>
        <div class="map-legend-item"><div style="width:8px;height:8px;border-radius:50%;background:var(--green);flex-shrink:0"></div><span style="color:var(--ice3)">On Shift</span></div>
        <div class="map-legend-item"><div style="width:8px;height:8px;border-radius:50%;background:var(--amber);flex-shrink:0"></div><span style="color:var(--ice3)">Standby</span></div>
        <div class="map-legend-item"><div style="width:8px;height:8px;border-radius:50%;background:var(--muted);flex-shrink:0"></div><span style="color:var(--ice3)">Offline</span></div>
      </div>
    </div>
  </div>`;
}

// ─── WORKERS ─────────────────────────────────────────────────────────
function renderWorkers() {
  return `
  <div class="admin-shell">
    ${renderAdminSidebar('workers')}
    <div class="admin-main page-enter">
      <div class="admin-title">
        Workers <span style="font-size:1rem;color:var(--muted2)">(${WORKERS.length})</span>
        <div style="display:flex;gap:.5rem">
          <input class="filter-input" id="worker-search" placeholder="Search workers…" oninput="filterWorkers(this.value)" style="width:180px"/>
          <button class="btn btn-sm btn-ice" onclick="showToast('Export ready','Worker roster CSV downloaded','📋','#4db8ff')">Export</button>
        </div>
      </div>
      <div id="workers-table-wrap" class="stagger-1">
        ${renderWorkersTable(WORKERS)}
      </div>
    </div>
  </div>`;
}

function renderWorkersTable(workers) {
  return `
  <div style="overflow-x:auto">
    <table class="wtable">
      <thead>
        <tr>
          <th>Worker</th><th>Ward</th><th>Status</th>
          <th>Score</th><th>Shifts</th><th>Rating</th><th>Earnings</th><th></th>
        </tr>
      </thead>
      <tbody>
        ${workers.map(w => `
        <tr>
          <td><div class="w-cell">
            <div class="w-av" style="background:${w.bg};color:${w.color};border-color:${w.color}">${esc(w.initials)}</div>
            <div>
              <div style="font-weight:600;color:var(--ice4)">${esc(w.name)}</div>
              <div style="font-family:'IBM Plex Mono',monospace;font-size:.6rem;color:var(--muted2)">Joined ${esc(w.joined)}</div>
            </div>
          </div></td>
          <td style="color:var(--muted2)">${esc(w.ward)}</td>
          <td><span class="status-pill ${w.status==='on-shift'?'onshift':w.status==='available'?'online':'offline'}">${esc(w.status)}</span></td>
          <td>
            <div style="color:${w.score>=90?'var(--green2)':w.score>=80?'var(--amber2)':'var(--red2)'}">
              ${esc(w.score)}<span style="font-size:.7rem;color:var(--muted2)">/100</span>
            </div>
          </td>
          <td style="color:var(--ice3)">${esc(w.shifts)}</td>
          <td style="color:var(--amber)">★ ${esc(w.rating)}</td>
          <td style="font-family:'Barlow Condensed',sans-serif;font-weight:700;color:var(--green2)">$${esc(w.earnings.toLocaleString())}</td>
          <td>
            <div style="display:flex;gap:.3rem">
              <button class="btn btn-xs btn-navy" onclick="showModal('worker-detail',${w.id})">View</button>
              <button class="btn btn-xs btn-outline" onclick="showToast('Message sent','Direct message opened','💬','#4db8ff')">Msg</button>
            </div>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

// ─── ANALYTICS ────────────────────────────────────────────────────────
function renderAnalytics() {
  return `
  <div class="admin-shell">
    ${renderAdminSidebar('analytics')}
    <div class="admin-main page-enter">
      <div class="admin-title">Analytics</div>

      <!-- KPIs -->
      <div class="g4 stagger-1" style="margin-bottom:1.5rem">
        <div class="kpi-xl" style="--top-color:var(--ice);--val-color:var(--ice)">
          <div class="kpi-xl-lbl">Total Shifts YTD</div>
          <div class="kpi-xl-val">1,847</div>
          <div class="kpi-xl-delta up">▲ +312 vs target</div>
        </div>
        <div class="kpi-xl" style="--top-color:var(--green);--val-color:var(--green)">
          <div class="kpi-xl-lbl">Verification Rate</div>
          <div class="kpi-xl-val">98.4%</div>
          <div class="kpi-xl-delta up">▲ Best ever week</div>
        </div>
        <div class="kpi-xl" style="--top-color:var(--amber);--val-color:var(--amber)">
          <div class="kpi-xl-lbl">Avg Response Time</div>
          <div class="kpi-xl-val">11m</div>
          <div class="kpi-xl-delta up">▲ ↓ 4m vs pilot start</div>
        </div>
        <div class="kpi-xl" style="--top-color:var(--purple);--val-color:var(--purple3)">
          <div class="kpi-xl-lbl">Wages Disbursed YTD</div>
          <div class="kpi-xl-val">$72.8k</div>
          <div class="kpi-xl-delta up">▲ +$8.2k this week</div>
        </div>
      </div>

      <!-- Earnings chart -->
      <div class="card stagger-2" style="margin-bottom:1rem">
        <div class="card-hd">Daily Earnings — This Week</div>
        <div class="chart-area">
          ${WEEK_EARNINGS.map((d,i) => {
            const h = Math.round(d.val / Math.max(...WEEK_EARNINGS.map(x=>x.val)) * 100);
            const colors = ['var(--ice)','var(--ice)','var(--ice)','var(--ice)','var(--ice)','var(--amber)','var(--ice)'];
            return `<div class="chart-bar" style="height:${h}%;background:${colors[i]};opacity:.8">
              <div class="chart-bar-tooltip">${d.day}: $${d.val}</div>
            </div>`;
          }).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;padding:.35rem 4px 0;font-family:'IBM Plex Mono',monospace;font-size:.58rem;color:var(--muted2)">
          ${WEEK_EARNINGS.map(d=>`<span>${d.day}</span>`).join('')}
        </div>
      </div>

      <!-- Performance -->
      <div class="g2 stagger-3">
        <div class="card">
          <div class="card-hd">Worker Performance</div>
          ${WORKERS.map(w => `
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.65rem">
            <div class="w-av" style="background:${w.bg};color:${w.color};border-color:${w.color};width:26px;height:26px;font-size:.65rem">${w.initials}</div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;margin-bottom:.25rem;font-size:.8rem">
                <span style="color:var(--ice4)">${w.name}</span>
                <span style="color:${w.score>=90?'var(--green2)':w.score>=80?'var(--amber2)':'var(--red2)'}">${w.score}</span>
              </div>
              <div class="prog-track"><div class="prog-fill ${w.score>=90?'prog-green':w.score>=80?'prog-amber':'prog-ice'}" style="width:${w.score}%"></div></div>
            </div>
          </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-hd">Shift Type Breakdown</div>
          ${[
            { label: 'Windrow Clearance',  pct: 38, color: 'prog-ice'   },
            { label: 'Hydrant Recovery',   pct: 22, color: 'prog-green'  },
            { label: 'Transit Stops',      pct: 18, color: 'prog-amber'  },
            { label: 'Civic Events',       pct: 14, color: 'prog-purple' },
            { label: 'Storm Drains',       pct: 8,  color: 'prog-ice'   },
          ].map(s => `
          <div class="funnel-step">
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;margin-bottom:.3rem;font-size:.8rem">
                <span style="color:var(--ice4)">${s.label}</span>
                <span style="color:var(--muted2)">${s.pct}%</span>
              </div>
              <div class="prog-track"><div class="prog-fill ${s.color}" style="width:${s.pct*2.5}%"></div></div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

// ─── PAYROLL ─────────────────────────────────────────────────────────
function renderPayroll() {
  return `
  <div class="admin-shell">
    ${renderAdminSidebar('payroll')}
    <div class="admin-main page-enter">
      <div class="admin-title">Payroll <span class="badge badge-amber" style="font-size:.7rem">Week 10</span></div>

      <div class="g3 stagger-1" style="margin-bottom:1.5rem">
        <div class="card card-green">
          <div class="kpi-lbl">Total Disbursed</div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:2rem;color:var(--green2)">$8,420</div>
          <div class="kpi-sub">6 workers · Today</div>
        </div>
        <div class="card card-amber">
          <div class="kpi-lbl">Platform Fee (25%)</div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:2rem;color:var(--amber)">$2,105</div>
          <div class="kpi-sub">Revenue · Today</div>
        </div>
        <div class="card card-accent">
          <div class="kpi-lbl">Pending Payments</div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:2rem;color:var(--ice)">3</div>
          <div class="kpi-sub">Next batch: 18:00</div>
        </div>
      </div>

      <div class="card stagger-2">
        <div class="card-hd">Transaction Log</div>
        ${PAYROLL.map(p => `
        <div class="pay-row">
          <div class="pay-icon" style="background:${p.iconBg}">${p.icon}</div>
          <div class="pay-info">
            <div class="pay-name">${p.name}</div>
            <div class="pay-meta">${p.meta}</div>
          </div>
          <div class="pay-amount ${p.type}">${p.amount}</div>
        </div>`).join('')}
      </div>

      <div class="alert alert-blue stagger-3" style="margin-top:1rem">
        <div class="alert-icon">ℹ️</div>
        <div class="alert-body">
          <strong>Bi-Weekly Payment Cycle</strong>
          Payments processed on City's standard bi-weekly payroll schedule, consistent with Ontario ESA. Next batch: Friday 18:00. Workers receive full posted rate — platform fee invoiced separately to City.
        </div>
      </div>
    </div>
  </div>`;
}

// ─── COMMS / CHAT ─────────────────────────────────────────────────────
function renderComms() {
  const activeThread = CHAT_THREADS[0];
  const msgs = CHAT_MESSAGES[activeThread.id] || [];
  return `
  <div class="page-enter" style="margin-top:56px;height:calc(100vh - 56px);display:grid;grid-template-columns:280px 1fr;overflow:hidden">
    <div class="chat-sidebar">
      <div class="chat-sidebar-hd">Comms
        <span class="badge badge-green" style="margin-left:.4rem">3 active</span>
      </div>
      ${CHAT_THREADS.map((t,i) => `
      <div class="chat-thread ${i===0?'active':''}" onclick="selectThread(${t.id},this)">
        <div class="chat-av" style="background:${t.avBg};color:${t.avFg}">${t.av}</div>
        <div class="chat-thread-info">
          <div class="chat-thread-name">${t.name}</div>
          <div class="chat-thread-preview">${t.preview}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.3rem">
          <div class="chat-thread-time">${t.time}</div>
          ${t.unread > 0 ? `<div class="chat-unread">${t.unread}</div>` : ''}
        </div>
      </div>`).join('')}
    </div>
    <div class="chat-main">
      <div class="chat-hd">
        <div class="chat-av" style="background:${activeThread.avBg};color:${activeThread.avFg};width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;flex-shrink:0">${activeThread.av}</div>
        <div class="chat-hd-info">
          <div class="chat-hd-name">${activeThread.name}</div>
          <div class="chat-hd-sub">${activeThread.status === 'onshift' ? '🟢 On Shift' : '🟡 Available'} · ${WORKERS.find(w=>w.initials===activeThread.av)?.ward || 'Dispatch'}</div>
        </div>
        <button class="btn btn-xs btn-outline" onclick="navigate('map')">📍 Track</button>
      </div>
      <div class="chat-msgs" id="chat-msgs">
        ${msgs.map(m => `
        <div class="msg ${m.me?'me':'them'}">
          <div class="msg-bubble">${m.text}</div>
          <div class="msg-time">${m.time}</div>
        </div>`).join('')}
      </div>
      <div class="chat-input-row">
        <input class="chat-input" id="chat-input" placeholder="Type a message…" onkeydown="sendChatMsg(event)"/>
        <button class="btn btn-sm btn-ice" onclick="sendChatMsgBtn()">Send</button>
      </div>
    </div>
  </div>`;
}

// ─── EVENTS ──────────────────────────────────────────────────────────
function renderEvents() {
  return `
  <div class="admin-shell">
    ${renderAdminSidebar('events')}
    <div class="admin-main page-enter">
      <div class="admin-title">Events & Incidents</div>
      <div class="stagger-1">
        ${EVENTS.map(e => `
        <div class="ev-card sev-${e.sev}" onclick="showModal('event-detail',${e.id})">
          <div style="display:flex;align-items:flex-start;gap:.85rem">
            <div style="font-size:2rem;flex-shrink:0">${e.icon}</div>
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.3rem;flex-wrap:wrap">
                <div class="ev-title">${e.title}</div>
                <span class="badge ev-badge-${e.sev}">${e.sev.toUpperCase()}</span>
              </div>
              <div class="ev-meta">${e.ward} · ${e.time} · ${e.workers} workers · ${e.shifts} shifts</div>
              <div style="font-size:.8rem;color:var(--muted2);margin-top:.4rem;line-height:1.6">${e.desc}</div>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

// ─── PROFILE ─────────────────────────────────────────────────────────
function renderProfile() {
  return `
  <div class="page page-sm page-enter">
    <div class="profile-hero">
      <div style="display:flex;align-items:flex-start;gap:1.25rem">
        <div class="profile-avatar-lg" style="background:rgba(77,184,255,.12);color:var(--ice);border-color:var(--ice)">AR</div>
        <div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.75rem;color:var(--ice4);letter-spacing:-.01em">Alex Roberts</div>
          <div style="font-family:'IBM Plex Mono',monospace;font-size:.65rem;color:var(--muted2);margin:.2rem 0 .5rem">alexroberts1960@gmail.com · 647-454-3282</div>
          <div style="display:flex;gap:.4rem;flex-wrap:wrap">
            <span class="badge badge-blue">Platform Founder</span>
            <span class="badge badge-green">Toronto Resident</span>
            <span class="badge badge-purple">Diverse Supplier</span>
          </div>
        </div>
      </div>
      <div class="profile-stats-row">
        <div class="profile-stat"><div class="profile-stat-val">v7.0</div><div class="profile-stat-lbl">Blueprint</div></div>
        <div class="profile-stat"><div class="profile-stat-val">25</div><div class="profile-stat-lbl">Wards</div></div>
        <div class="profile-stat"><div class="profile-stat-val">500</div><div class="profile-stat-lbl">Workers</div></div>
        <div class="profile-stat"><div class="profile-stat-val">2026</div><div class="profile-stat-lbl">Pilot Year</div></div>
      </div>
    </div>

    <div class="card stagger-2" style="margin-bottom:1rem">
      <div class="card-hd">Platform Settings</div>
      ${[
        { lbl: 'Storm Alerts',           sub: 'Receive Level 1–3 activation alerts',   on: true  },
        { lbl: 'Worker GPS Tracking',    sub: 'Real-time location during shifts',       on: true  },
        { lbl: 'Photo Verification AI',  sub: 'AI-assisted task completion review',     on: true  },
        { lbl: 'Bi-weekly Payroll',      sub: 'Automated payment processing',           on: true  },
        { lbl: 'Council Reporting',      sub: 'Auto-generate weekly KPI summaries',     on: false },
        { lbl: 'ODSP Directive 5.1',     sub: 'Earnings exemption mode (pending)',      on: false },
      ].map(s => `
      <div class="settings-row">
        <div>
          <div class="settings-lbl">${s.lbl}</div>
          <div class="settings-sub">${s.sub}</div>
        </div>
        <div class="toggle ${s.on?'on':'off'}" onclick="this.classList.toggle('on');this.classList.toggle('off')">
          <div class="toggle-thumb"></div>
        </div>
      </div>`).join('')}
    </div>

    <div class="card stagger-3">
      <div class="card-hd">Submitted To</div>
      <div style="display:flex;flex-direction:column;gap:.5rem;font-size:.84rem;color:var(--ice3);line-height:1.7">
        <div>🏛️ Office of the Mayor — City of Toronto</div>
        <div>🚌 General Manager, Transportation Services</div>
        <div>🤝 Director, Social Development Finance & Administration (SDFA)</div>
        <div>💡 Innovation & Technology Division</div>
      </div>
    </div>
  </div>`;
}

// ─── MODALS ──────────────────────────────────────────────────────────
function getModalContent(type, id) {
  if (type === 'shift-detail') {
    const s = SHIFTS.find(x => x.id === id) || SHIFTS[0];
    return `
    <div class="modal-hd">
      <div>
        <div class="modal-title">${s.icon} ${s.title}</div>
        <div class="modal-subtitle">${s.ward} · ${s.time}</div>
      </div>
      <button class="btn btn-xs btn-ghost" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="g2" style="margin-bottom:1rem">
        <div class="card" style="margin:0">
          <div class="kpi-lbl">Pay Rate</div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.4rem;color:var(--green2)">${s.pay}</div>
        </div>
        <div class="card" style="margin:0">
          <div class="kpi-lbl">Workers</div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.4rem;color:var(--ice)">${s.filled}/${s.workers}</div>
        </div>
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem">
        <span class="badge badge-blue">${s.priority}</span>
        <span class="badge ${s.status==='active'?'badge-green':s.status==='urgent'?'badge-red':'badge-amber'}">${s.status}</span>
        <span class="badge badge-muted">${s.type}</span>
      </div>
      ${s.status === 'open' || s.status === 'urgent'
        ? `<button class="btn btn-md btn-green" style="width:100%" onclick="acceptShift(${s.id});closeModal()">✓ Accept This Shift</button>`
        : `<button class="btn btn-md btn-outline" style="width:100%">View Details</button>`}
    </div>`;
  }

  if (type === 'worker-detail') {
    const w = WORKERS.find(x => x.id === id) || WORKERS[0];
    return `
    <div class="modal-hd">
      <div style="display:flex;align-items:center;gap:.85rem">
        <div class="w-av" style="background:${w.bg};color:${w.color};border-color:${w.color};width:44px;height:44px;font-size:.9rem">${w.initials}</div>
        <div>
          <div class="modal-title">${w.name}</div>
          <div class="modal-subtitle">${w.ward} · Joined ${w.joined}</div>
        </div>
      </div>
      <button class="btn btn-xs btn-ghost" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="g2" style="margin-bottom:1rem">
        <div class="card" style="margin:0"><div class="kpi-lbl">Reliability Score</div><div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.6rem;color:${w.score>=90?'var(--green2)':'var(--amber2)'}">${w.score}/100</div></div>
        <div class="card" style="margin:0"><div class="kpi-lbl">Total Shifts</div><div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.6rem;color:var(--ice)">${w.shifts}</div></div>
        <div class="card" style="margin:0"><div class="kpi-lbl">Rating</div><div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.6rem;color:var(--amber)">★ ${w.rating}</div></div>
        <div class="card" style="margin:0"><div class="kpi-lbl">Total Earnings</div><div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.6rem;color:var(--green2)">$${w.earnings.toLocaleString()}</div></div>
      </div>
      <div class="sh"><div class="sh-title">Achievements</div><div class="sh-line"></div></div>
      <div class="ach-grid">
        ${ACHIEVEMENTS.slice(0,6).map(a => `
        <div class="ach-item ${a.unlocked?'unlocked':'locked'}">
          <div class="ach-icon">${a.icon}</div>
          <div class="ach-lbl">${a.label}</div>
        </div>`).join('')}
      </div>
    </div>`;
  }

  if (type === 'event-detail') {
    const e = EVENTS.find(x => x.id === id) || EVENTS[0];
    return `
    <div class="modal-hd">
      <div>
        <div class="modal-title">${e.icon} ${e.title}</div>
        <div class="modal-subtitle">${e.ward} · ${e.time}</div>
      </div>
      <button class="btn btn-xs btn-ghost" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="alert alert-${e.sev==='high'?'red':e.sev==='med'?'amber':'blue'}" style="margin-bottom:1rem">
        <div class="alert-icon">${e.icon}</div>
        <div class="alert-body"><strong>${e.title}</strong>${e.desc}</div>
      </div>
      <div class="g2">
        <div class="card" style="margin:0"><div class="kpi-lbl">Workers Dispatched</div><div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.4rem;color:var(--ice)">${e.workers}</div></div>
        <div class="card" style="margin:0"><div class="kpi-lbl">Active Shifts</div><div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.4rem;color:var(--amber)">${e.shifts}</div></div>
      </div>
    </div>`;
  }

  if (type === 'new-shift') {
    return `
    <div class="modal-hd">
      <div><div class="modal-title">New Shift</div><div class="modal-subtitle">Create a new dispatch request</div></div>
      <button class="btn btn-xs btn-ghost" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="g2" style="gap:.75rem;margin-bottom:.75rem">
        <div class="fg full"><label>Shift Title</label><input placeholder="e.g. Windrow Clearance" /></div>
        <div class="fg"><label>Ward</label>
          <select><option>Ward 3</option><option>Ward 5</option><option>Ward 12</option></select>
        </div>
        <div class="fg"><label>Priority</label>
          <select><option>P1 – Priority 1 Route</option><option>P2 – Priority 2 Route</option><option>P3 – Transit Stop</option></select>
        </div>
        <div class="fg"><label>Start Time</label><input type="time" value="06:00" /></div>
        <div class="fg"><label>End Time</label><input type="time" value="10:00" /></div>
        <div class="fg"><label>Pay Rate</label><input placeholder="$19.14/hr" /></div>
        <div class="fg"><label>Workers Needed</label><input type="number" value="3" min="1" /></div>
      </div>
      <button class="btn btn-md btn-ice" style="width:100%" onclick="closeModal();showToast('Shift created','New shift posted to worker pool','✅','#22c55e')">Create Shift</button>
    </div>`;
  }

  return `<div class="modal-hd"><div class="modal-title">Detail</div><button class="btn btn-xs btn-ghost" onclick="closeModal()">✕</button></div>
  <div class="modal-body"><p style="color:var(--muted2)">No content for this modal.</p></div>`;
}

// ─── SIDEBAR HELPER ──────────────────────────────────────────────────
function renderAdminSidebar(activePage) {
  return `
  <div class="sidebar">
    ${ADMIN_SIDEBAR.map(grp => `
    <div class="sb-grp">
      <div class="sb-grp-lbl">${grp.group}</div>
      ${grp.items.map(item => `
      <div class="sb-item ${activePage === item.id ? 'active' : ''}" onclick="navigate('${item.id}')">
        <span>${item.icon}</span>
        <span>${item.label}</span>
        ${item.badge ? `<span class="sb-badge ${item.badgeClass}">${item.badge}</span>` : ''}
      </div>`).join('')}
    </div>`).join('')}
  </div>`;
}
