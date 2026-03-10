# WORK RESPONSE — Civic Reserve Dashboard
## VS Code Static Project · v7.0 · City of Toronto Pilot 2026

---

## Project Structure

```
wr-dashboard-vscode/
├── index.html     ← Open this in browser or VS Code Live Server
├── styles.css     ← Full design system (47KB · all components)
├── data.js        ← All mock data (workers, shifts, events, KPIs)
├── pages.js       ← All page render functions
├── app.js         ← Router, nav, toast, modal, particles
├── README.md      ← This file
└── assets/        ← Place images/icons here
```

---

## How to Run

**Option 1 — Browser (simplest):**
Double-click `index.html` → opens in any browser instantly.

**Option 2 — VS Code Live Server (recommended):**
1. Open folder in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Auto-reloads on save

**No npm. No Node. No build step. No dependencies.**

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `home` | Landing / hero + stats strip |
| Dashboard | `dashboard` | City ops overview + KPIs + activity |
| Shift Board | `shifts` | All shifts, filter by status, accept shifts |
| Live Map | `map` | Real-time worker map (mock) |
| Workers | `workers` | Worker roster, search, profiles |
| Analytics | `analytics` | Charts, performance, breakdowns |
| Payroll | `payroll` | Transaction log + earnings |
| Comms | `comms` | Chat / messaging interface |
| Events | `events` | Incidents + storm events |
| Profile | `profile` | Platform settings + contact |

---

## Keyboard Shortcuts (in-app)
- `S` — simulate live storm toast sequence
- `?` — show keyboard help
- `Esc` — close modal/notification panel

---

## Design System

CSS variables in `styles.css`:
```css
--ice:    #4db8ff   /* Primary blue */
--amber:  #f59e0b   /* Warnings / fees */
--green:  #22c55e   /* Success / on-shift */
--navy:   #060c18   /* Background */
--purple: #8b5cf6   /* Highlights */
```

Font stack: Barlow Condensed (headers) · IBM Plex Mono (data/labels) · Barlow (body)

---

## Business Model (reflected in UI)
- Platform License: $3,125–$6,250/mo (Pilot Tier)
- Setup Fee: $25,000–$50,000 (one-time)
- Labour Processing Fee: **25% of all wages disbursed**
- Insurance: $5M CGL · $2M per-worker OAI (included)
- Compliance: MFIPPA · AES-256 · Bill 88 · Canadian hosting

---

## Contact
Alex Roberts · 647-454-3282 · alexroberts1960@gmail.com  
City of Toronto Pilot Proposal · Blueprint v7.0 · 2026
