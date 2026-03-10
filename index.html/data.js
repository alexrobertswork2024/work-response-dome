// ── data.js — All mock data for WORK RESPONSE platform ───────────────

const WORKERS = [
    { id: 1,  name: "Marcus Williams",  initials: "MW", ward: "Ward 5",  status: "on-shift",  score: 97, shifts: 34, rating: 4.9, earnings: 2140, color: "#3b87f5", bg: "rgba(59,135,245,.15)",  phone: "416-555-0101", joined: "Oct 2025" },
    { id: 2,  name: "Priya Sharma",     initials: "PS", ward: "Ward 12", status: "available",  score: 94, shifts: 28, rating: 4.8, earnings: 1820, color: "#8b5cf6", bg: "rgba(139,92,246,.15)", phone: "416-555-0102", joined: "Nov 2025" },
    { id: 3,  name: "James Okonkwo",    initials: "JO", ward: "Ward 3",  status: "on-shift",  score: 91, shifts: 41, rating: 4.7, earnings: 2600, color: "#14b8a6", bg: "rgba(20,184,166,.15)", phone: "416-555-0103", joined: "Sep 2025" },
    { id: 4,  name: "Elena Vasquez",    initials: "EV", ward: "Ward 8",  status: "available",  score: 88, shifts: 19, rating: 4.6, earnings: 1200, color: "#ec4899", bg: "rgba(236,72,153,.15)", phone: "416-555-0104", joined: "Dec 2025" },
    { id: 5,  name: "Devon Clarke",     initials: "DC", ward: "Ward 5",  status: "offline",    score: 85, shifts: 22, rating: 4.5, earnings: 1380, color: "#f59e0b", bg: "rgba(245,158,11,.15)", phone: "416-555-0105", joined: "Oct 2025" },
    { id: 6,  name: "Aisha Mohammed",   initials: "AM", ward: "Ward 12", status: "on-shift",  score: 96, shifts: 37, rating: 4.9, earnings: 2340, color: "#22c55e", bg: "rgba(34,197,94,.15)",  phone: "416-555-0106", joined: "Sep 2025" },
    { id: 7,  name: "Tommy Nguyen",     initials: "TN", ward: "Ward 3",  status: "available",  score: 82, shifts: 15, rating: 4.4, earnings: 940,  color: "#4db8ff", bg: "rgba(77,184,255,.15)", phone: "416-555-0107", joined: "Jan 2026" },
    { id: 8,  name: "Fatima Al-Rashid", initials: "FA", ward: "Ward 8",  status: "offline",    score: 79, shifts: 11, rating: 4.3, earnings: 700,  color: "#a78bfa", bg: "rgba(167,139,250,.15)",phone: "416-555-0108", joined: "Jan 2026" },
];

const SHIFTS = [
    { id: 1,  type: "snow",  icon: "❄️",  title: "Windrow Clearance",       ward: "Ward 5",  priority: "P1", time: "06:00–10:00", pay: "$19.14/hr", workers: 3, filled: 3, status: "active",   color: "#4db8ff" },
    { id: 2,  type: "snow",  icon: "🧹", title: "Hydrant Recovery",          ward: "Ward 12", priority: "P1", time: "06:00–09:00", pay: "$19.14/hr", workers: 2, filled: 2, status: "active",   color: "#4db8ff" },
    { id: 3,  type: "snow",  icon: "🚶", title: "Transit Stop Clearance",    ward: "Ward 3",  priority: "P2", time: "08:00–12:00", pay: "$17.50/hr", workers: 4, filled: 3, status: "open",     color: "#f59e0b" },
    { id: 4,  type: "civic", icon: "🏙️", title: "Post-Event Cleanup",       ward: "Ward 8",  priority: "P2", time: "14:00–18:00", pay: "$17.50/hr", workers: 6, filled: 4, status: "open",     color: "#22c55e" },
    { id: 5,  type: "snow",  icon: "❄️",  title: "Sidewalk Salting Run",     ward: "Ward 5",  priority: "P1", time: "05:00–08:00", pay: "$19.14/hr", workers: 2, filled: 0, status: "urgent",   color: "#ef4444" },
    { id: 6,  type: "civic", icon: "🌳", title: "Park Path Clearance",       ward: "Ward 12", priority: "P3", time: "10:00–14:00", pay: "$16.25/hr", workers: 3, filled: 3, status: "complete", color: "#8b5cf6" },
    { id: 7,  type: "snow",  icon: "🚒", title: "Fire Route Priority",       ward: "Ward 3",  priority: "P1", time: "07:00–11:00", pay: "$21.00/hr", workers: 1, filled: 1, status: "active",   color: "#4db8ff" },
    { id: 8,  type: "flood", icon: "💧", title: "Storm Drain Inspection",    ward: "Ward 8",  priority: "P2", time: "13:00–17:00", pay: "$18.00/hr", workers: 2, filled: 1, status: "open",     color: "#14b8a6" },
];

const EVENTS = [
    { id: 1, title: "WINTER STORM ALERT — LEVEL 3",  ward: "All Wards",  time: "Today 04:15",  sev: "high",   icon: "🌨️", desc: "12–18cm snowfall forecast. Priority windrow and hydrant recovery required across all 25 wards. Activating Civic Reserve full deployment.", workers: 47, shifts: 18 },
    { id: 2, title: "TRANSIT DISRUPTION — ROUTE 29",  ward: "Ward 5",     time: "Today 07:40",  sev: "med",    icon: "🚌", desc: "Bus stop blockage at Eglinton & Yonge. 3 workers dispatched. ETA 25 min.", workers: 3,  shifts: 1  },
    { id: 3, title: "HYDRANT RECOVERY REQUEST",        ward: "Ward 12",    time: "Today 08:10",  sev: "high",   icon: "🚒", desc: "6 hydrants buried post-plow on Willowdale Ave. Fire department flagged. Dispatching priority team.", workers: 4,  shifts: 2  },
    { id: 4, title: "ACCESSIBLE RAMP OBSTRUCTION",    ward: "Ward 3",     time: "Yesterday",    sev: "med",    icon: "♿", desc: "AODA-designated ramp at subway entrance blocked by windrow. Escalated from 311.", workers: 2,  shifts: 1  },
    { id: 5, title: "POST-STORM RECOVERY COMPLETE",   ward: "Ward 8",     time: "Yesterday",    sev: "low",    icon: "✅", desc: "Ward 8 full clearance complete. 23/23 priority routes verified. All hydrants confirmed.", workers: 8,  shifts: 4  },
];

const ACTIVITY = [
    { icon: "✅", color: "#22c55e", bg: "rgba(34,197,94,.1)",   title: "Marcus W. completed GPS verification",         sub: "Windrow Clearance · Ward 5 · Photo confirmed",        time: "2m ago" },
    { icon: "⚡", color: "#f59e0b", bg: "rgba(245,158,11,.1)",  title: "Urgent shift opened — Sidewalk Salting",         sub: "Ward 5 · 05:00–08:00 · $19.14/hr",                    time: "4m ago" },
    { icon: "💰", color: "#4db8ff", bg: "rgba(77,184,255,.1)",  title: "Payroll batch processed",                        sub: "$4,280 disbursed to 6 workers",                       time: "12m ago" },
    { icon: "📍", color: "#8b5cf6", bg: "rgba(139,92,246,.1)", title: "Aisha M. checked in — Hydrant Recovery",         sub: "Ward 12 · GPS: 43.7532°N 79.3832°W",                  time: "18m ago" },
    { icon: "🌨️", color: "#85cfff", bg: "rgba(133,207,255,.1)", title: "Storm Alert Level 3 issued",                    sub: "12–18cm forecast · Full deployment activated",         time: "31m ago" },
    { icon: "✅", color: "#22c55e", bg: "rgba(34,197,94,.1)",   title: "Ward 8 clearance certified complete",            sub: "23/23 routes verified · All hydrants clear",          time: "1h ago" },
    { icon: "👤", color: "#ec4899", bg: "rgba(236,72,153,.1)", title: "New worker registered — Fatima Al-Rashid",       sub: "Ward 8 · Training complete",                          time: "2h ago" },
    { icon: "📋", color: "#14b8a6", bg: "rgba(20,184,166,.1)", title: "Weekly report generated",                        sub: "Week 10 · 134 shifts · $18,200 disbursed",            time: "3h ago" },
];

const PAYROLL = [
    { icon: "💰", iconBg: "rgba(34,197,94,.1)",  name: "Marcus Williams",  meta: "34 shifts · Ward 5",        amount: "$651.76", type: "credit" },
    { icon: "💰", iconBg: "rgba(34,197,94,.1)",  name: "Aisha Mohammed",   meta: "37 shifts · Ward 12",       amount: "$708.18", type: "credit" },
    { icon: "💰", iconBg: "rgba(34,197,94,.1)",  name: "James Okonkwo",    meta: "41 shifts · Ward 3",        amount: "$784.74", type: "credit" },
    { icon: "🏙️", iconBg: "rgba(77,184,255,.1)", name: "Platform Fee",     meta: "25% processing · Week 10",  amount: "$476.48", type: "debit"  },
    { icon: "🛡️", iconBg: "rgba(139,92,246,.1)", name: "Insurance Premium", meta: "OAI · $2M per-worker",     amount: "$124.00", type: "debit"  },
];

const CHAT_THREADS = [
    { id: 1, name: "Marcus Williams",   av: "MW", avBg: "#3b87f5", avFg: "#04091a", preview: "On route to Ward 5 sector", time: "2m",   unread: 2, status: "onshift" },
    { id: 2, name: "Dispatch HQ",       av: "DH", avBg: "#f59e0b", avFg: "#04091a", preview: "Storm Level 3 — all hands", time: "5m",   unread: 0, status: "online"  },
    { id: 3, name: "Aisha Mohammed",    av: "AM", avBg: "#22c55e", avFg: "#04091a", preview: "Hydrant 4 cleared ✅",       time: "12m",  unread: 0, status: "onshift" },
    { id: 4, name: "Ward 5 Team",       av: "W5", avBg: "#8b5cf6", avFg: "#fff",    preview: "3 workers active",          time: "18m",  unread: 1, status: "online"  },
    { id: 5, name: "City Liaison",      av: "CL", avBg: "#14b8a6", avFg: "#04091a", preview: "Priority update received",  time: "1h",   unread: 0, status: "away"    },
];

const CHAT_MESSAGES = {
    1: [
        { me: false, text: "Heading out now, gear check complete.",               time: "06:12" },
        { me: true,  text: "Copy. Sector map sent. Priority: windrow on Elm St.", time: "06:14" },
        { me: false, text: "On route to Ward 5 sector — ETA 8 min.",             time: "06:18" },
        { me: true,  text: "10-4. GPS active. Timer starts on arrival.",          time: "06:19" },
    ],
};

const NOTIFICATIONS = [
    { id: 1, icon: "🌨️", iconBg: "rgba(77,184,255,.1)",  title: "Storm Alert <strong>Level 3</strong> activated",    text: "Full deployment across all wards. 47 workers dispatched.", time: "2m ago",  unread: true  },
    { id: 2, icon: "⚡",  iconBg: "rgba(245,158,11,.1)", title: "Urgent shift needs filling",                          text: "Sidewalk Salting · Ward 5 · 05:00–08:00", time: "4m ago",  unread: true  },
    { id: 3, icon: "✅",  iconBg: "rgba(34,197,94,.1)",  title: "Payroll batch processed",                            text: "$4,280 disbursed to 6 workers", time: "12m ago", unread: false },
    { id: 4, icon: "📍",  iconBg: "rgba(139,92,246,.1)", title: "Worker check-in: <strong>Aisha M.</strong>",         text: "GPS verified · Hydrant Recovery · Ward 12", time: "18m ago", unread: false },
];

const MAP_WORKERS = [
    { id: 1, name: "Marcus W.", left: "28%", top: "35%", status: "active",    color: "#22c55e", shift: "Windrow Clearance" },
    { id: 2, name: "Aisha M.",  left: "55%", top: "28%", status: "active",    color: "#22c55e", shift: "Hydrant Recovery"  },
    { id: 3, name: "James O.",  left: "42%", top: "58%", status: "active",    color: "#22c55e", shift: "Transit Stop"      },
    { id: 4, name: "Priya S.",  left: "70%", top: "44%", status: "standby",   color: "#f59e0b", shift: "Available"         },
    { id: 5, name: "Devon C.",  left: "18%", top: "62%", status: "offline",   color: "#4a5a74", shift: "Off duty"          },
    { id: 6, name: "Elena V.",  left: "62%", top: "68%", status: "standby",   color: "#f59e0b", shift: "Available"         },
];

const ACHIEVEMENTS = [
    { icon: "⭐", label: "First Shift",       unlocked: true  },
    { icon: "🔟", label: "10 Shifts",         unlocked: true  },
    { icon: "🌨️", label: "Storm Ready",       unlocked: true  },
    { icon: "⚡", label: "Rapid Responder",   unlocked: true  },
    { icon: "💯", label: "Perfect Week",      unlocked: true  },
    { icon: "🚒", label: "Hydrant Hero",      unlocked: false },
    { icon: "♿", label: "AODA Champion",     unlocked: false },
    { icon: "🏆", label: "Top Worker",        unlocked: false },
    { icon: "🌟", label: "30 Shifts",         unlocked: false },
];

const KPI_DATA = {
    activeWorkers:  { val: "47",    lbl: "Active Workers",    sub: "Right now · 3 wards",      delta: "+12 from yesterday", up: true,   color: "#4db8ff", top: "#4db8ff" },
    shiftsToday:    { val: "134",   lbl: "Shifts Today",      sub: "Completed + in progress",  delta: "+22 vs last storm",  up: true,   color: "#22c55e", top: "#22c55e" },
    verifiedToday:  { val: "98.4%", lbl: "Verification Rate", sub: "GPS + photo confirmed",    delta: "↑ 0.6% this week",   up: true,   color: "#4db8ff", top: "#4db8ff" },
    responseTime:   { val: "11m",   lbl: "Avg Response Time", sub: "Blast → first check-in",   delta: "↓ 4m vs target",     up: true,   color: "#22c55e", top: "#22c55e" },
    earnedToday:    { val: "$8,420",lbl: "Wages Disbursed",   sub: "All workers today",        delta: "+$1,240 vs forecast",up: true,   color: "#f59e0b", top: "#f59e0b" },
    platformFee:    { val: "$2,105",lbl: "Platform Fee",      sub: "25% of wages today",       delta: "YTD: $18,240",       up: false,  color: "#f59e0b", top: "#f59e0b" },
};

const TIMELINE_DATA = [
    { time: "04:15", title: "Storm Level 3 Alert issued",           sub: "Automated blast to 312 registered workers",     dot: "done"    },
    { time: "04:31", title: "First 12 workers acknowledged",        sub: "Ward 5, 12, 3 — all confirmed available",       dot: "done"    },
    { time: "05:00", title: "Priority shifts opened",               sub: "Windrow + Hydrant teams dispatched",            dot: "done"    },
    { time: "06:12", title: "47 workers on-shift (peak)",           sub: "GPS tracking active across 3 wards",            dot: "active"  },
    { time: "08:00", title: "Midshift photo verification sweep",    sub: "Awaiting 3 pending submissions",                dot: "active"  },
    { time: "10:00", title: "First shift rotation",                 sub: "Incoming 28 workers for afternoon wave",        dot: ""        },
    { time: "14:00", title: "Council reporting window",             sub: "Automated KPI summary to City Liaison",         dot: ""        },
];

const WEEK_EARNINGS = [
    { day: "Mon", val: 580  },
    { day: "Tue", val: 320  },
    { day: "Wed", val: 760  },
    { day: "Thu", val: 440  },
    { day: "Fri", val: 980  },
    { day: "Sat", val: 1240 },
    { day: "Sun", val: 640  },
];

// Page/nav config
const NAV_PAGES = [
    { id: "home",       label: "Home",       icon: "🏠" },
    { id: "dashboard",  label: "Dashboard",  icon: "📊" },
    { id: "shifts",     label: "Shifts",     icon: "📋" },
    { id: "map",        label: "Live Map",   icon: "📍" },
    { id: "workers",    label: "Workers",    icon: "👥" },
    { id: "analytics",  label: "Analytics",  icon: "📈" },
    { id: "payroll",    label: "Payroll",    icon: "💰" },
    { id: "comms",      label: "Comms",      icon: "💬" },
    { id: "events",     label: "Events",     icon: "⚡" },
    { id: "profile",    label: "Profile",    icon: "👤" },
];

const ADMIN_SIDEBAR = [
    { group: "Operations",  items: [
        { id: "dashboard", label: "Overview",       icon: "📊", badge: null    },
        { id: "shifts",    label: "Shift Board",    icon: "📋", badge: 3,  badgeClass: "sb-amber" },
        { id: "map",       label: "Live Map",       icon: "📍", badge: 47, badgeClass: "sb-blue"  },
        { id: "events",    label: "Events",         icon: "⚡", badge: 2,  badgeClass: "sb-red"   },
    ]},
    { group: "Workforce",   items: [
        { id: "workers",   label: "Workers",        icon: "👥", badge: 8,  badgeClass: "sb-blue"  },
        { id: "payroll",   label: "Payroll",        icon: "💰", badge: null    },
        { id: "analytics", label: "Analytics",      icon: "📈", badge: null    },
        { id: "comms",     label: "Comms",          icon: "💬", badge: 3,  badgeClass: "sb-green" },
    ]},
    { group: "Platform",    items: [
        { id: "profile",   label: "Settings",       icon: "⚙️", badge: null    },
    ]},
];