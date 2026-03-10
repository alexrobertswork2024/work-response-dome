/**
 * security.js — Compliance & Adjudication Framework v9.0
 * CIVIC RESERVE | WORK RESPONSE
 *
 * ODSP THRESHOLD CORRECTION:
 * odspLimit is $200/month for SELF-EMPLOYMENT income (Directive 5.4).
 * The $1,000 figure applies to EMPLOYMENT income only (Directive 5.1).
 * Platform workers are independent micro-contractors → Directive 5.4 governs.
 * Workers must confirm classification with their ODSP caseworker.
 */

"use strict";

const SECURITY_PROTOCOL = Object.freeze({

  // ── ODSP SHIELD ──────────────────────────────────────────────────────
  // Directive 5.4 — self-employment income (most platform workers)
  odsp: Object.freeze({
    selfEmploymentExemption: 200.00,    // $200/month net — Directive 5.4
    selfEmploymentClawback:  0.50,      // 50% of net above $200
    employmentExemption:     1000.00,   // $1,000/month — Directive 5.1 ONLY
    employmentClawback:      0.75,      // 75% above $1,000 — employment only
    alertThreshold:          150.00,    // dashboard alerts at $150 (25% buffer)
    applicableDirective:     "ODSP Directive 5.4 — Self-Employment Income",
    caseworkerAdvisoryRequired: true,
  }),

  /**
   * checkOdspShield(workerId, newEarnings, workers)
   *
   * Returns a status object for the ODSP Shield dashboard component.
   * Uses the $200 self-employment threshold (Directive 5.4).
   *
   * Status levels:
   *   "safe"    — below $150 alert threshold
   *   "warning" — between $150 and $200
   *   "over"    — would exceed $200 (shift acceptance should be blocked)
   */
  checkOdspShield(workerId, newEarnings, workers) {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return { error: "Worker not found", status: "unknown" };

    const isOdspRecipient = worker.odspRecipient === true;
    if (!isOdspRecipient) return { status: "not-applicable" };

    const currentMonthly = worker.currentMonthlyEarnings ?? 0;
    const projected = currentMonthly + newEarnings;
    const limit     = this.odsp.selfEmploymentExemption;   // 200
    const alert     = this.odsp.alertThreshold;            // 150

    const remaining = Math.max(0, limit - currentMonthly);
    const pct       = Math.min(1, currentMonthly / limit);

    if (projected > limit) {
      return {
        status:    "over",
        current:   currentMonthly,
        projected,
        limit,
        remaining: 0,
        pct,
        message:   `Accepting this shift would bring monthly earnings to $${projected.toFixed(2)}, ` +
                   `exceeding the $${limit} Directive 5.4 self-employment exemption. ` +
                   `Income above $${limit} is subject to 50% ODSP clawback. ` +
                   `Confirm with your caseworker before proceeding.`,
        directive: "ODSP Directive 5.4 — Self-Employment Income",
        advisory:  true,
      };
    }

    if (currentMonthly >= alert) {
      return {
        status:    "warning",
        current:   currentMonthly,
        projected,
        limit,
        remaining,
        pct,
        message:   `You have earned $${currentMonthly.toFixed(2)} this month. ` +
                   `You are within $${remaining.toFixed(2)} of your $${limit} monthly limit ` +
                   `(Directive 5.4 — self-employment income). ` +
                   `Consider pausing shifts. Confirm with your ODSP caseworker.`,
        directive: "ODSP Directive 5.4 — Self-Employment Income",
        advisory:  true,
      };
    }

    return {
      status:    "safe",
      current:   currentMonthly,
      projected,
      limit,
      remaining,
      pct,
      message:   `Monthly earnings: $${currentMonthly.toFixed(2)} of $${limit} limit (Directive 5.4).`,
      directive: "ODSP Directive 5.4 — Self-Employment Income",
      advisory:  false,
    };
  },

  // ── DEVICE CERTIFICATION ─────────────────────────────────────────────
  deviceRequirements: Object.freeze({
    minCameraMP:   8,
    minOS: Object.freeze({ ios: 14, android: 10 }),
    gpsRequired:   true,
    dataRequired:  true,
    selfCertified: true,   // worker attests at registration — platform does not verify hardware
  }),

  checkDeviceCertification(worker) {
    if (!worker.deviceCertified) {
      return {
        certified: false,
        reason: "Device self-certification not completed. " +
                "Complete device registration before accepting shifts.",
      };
    }
    return { certified: true };
  },

  // ── 3-STEP ADJUDICATION ──────────────────────────────────────────────
  adjudication: Object.freeze({
    steps: Object.freeze([
      { step: 1, name: "Auto-Review",       maxHours: 2,  escrowReleasePct: 0.50 },
      { step: 2, name: "Supervisor Review", maxHours: 24, escrowReleasePct: 0    },
      { step: 3, name: "City Liaison Final",maxHours: 72, escrowReleasePct: 0    },
    ]),
    slaHours:             72,
    minShiftValueForStep3: 50.00,
    disputeSupplementAmt:  10.00,   // paid to worker if Step 2/3 resolves in their favour
  }),

  /**
   * logConflict(shiftId, workerId, issueType)
   * Creates a conflict record for Step 1 intake.
   * Returns an immutable conflict object; caller persists to state.
   */
  logConflict(shiftId, workerId, issueType) {
    return Object.freeze({
      id:          `CONFLICT-${shiftId}-${Date.now()}`,
      timestamp:   new Date().toISOString(),
      shiftId,
      workerId,
      issueType:   this.sanitize(issueType),
      currentStep: 1,
      status:      "Step 1 — Auto-Review Pending",
      escrowHeld:  true,
      escrowPct:   0.50,    // 50% held; 50% released to worker immediately
      slaDeadline: new Date(Date.now() + this.adjudication.slaHours * 3600000).toISOString(),
      protocol:    "WORK-RESPONSE-v9.0-ADJUDICATION",
      auditTrail:  [],
    });
  },

  escalateConflict(conflict, toStep, reviewerNote) {
    if (toStep < 2 || toStep > 3) throw new Error("Invalid step: must be 2 or 3");
    const step = this.adjudication.steps.find(s => s.step === toStep);
    return Object.freeze({
      ...conflict,
      currentStep: toStep,
      status:      `Step ${toStep} — ${step.name} Pending`,
      auditTrail:  [...conflict.auditTrail, Object.freeze({
        step:       toStep,
        timestamp:  new Date().toISOString(),
        note:       this.sanitize(reviewerNote ?? ""),
      })],
    });
  },

  resolveConflict(conflict, resolution, inWorkerFavour) {
    return Object.freeze({
      ...conflict,
      status:           "Resolved",
      resolution:       this.sanitize(resolution),
      resolvedAt:       new Date().toISOString(),
      workerFavourable: inWorkerFavour,
      // If resolved in worker's favour, the held 50% + $10 supplement is released next cycle
      escrowRelease:    inWorkerFavour
                          ? (conflict.escrowHeld ? 0.50 : 0) + this.adjudication.disputeSupplementAmt
                          : 0,
    });
  },

  // ── DATA SANITIZATION ────────────────────────────────────────────────
  sanitize(str) {
    if (typeof str !== "string") return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  },

  // ── DATA SOVEREIGNTY ─────────────────────────────────────────────────
  dataPolicy: Object.freeze({
    hosting:         "Canadian-sovereign cloud",
    crossBorderTransfer: false,
    encryption:      "AES-256 at rest and in transit",
    compliance:      Object.freeze(["MFIPPA", "DPWRA (Bill 88)", "ODSP Directive 5.4"]),
    retentionYears:  7,
    rightToDelete:   true,
    auditLogRetainYears: 7,
  }),

  // ── SERVER-SIDE SECURITY HEADERS (reference — must be set server-side) ──
  /**
   * These cannot be set by client-side JS. Document them here so the
   * server/CDN config owner implements them correctly.
   * For a static host (Netlify, Vercel, Cloudflare Pages), set in
   * netlify.toml / vercel.json / _headers respectively.
   */
  requiredHttpHeaders: Object.freeze({
    "Content-Security-Policy":
      "default-src 'self'; " +
      "script-src 'self'; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data:; " +
      "connect-src 'self'; " +
      "frame-ancestors 'none';",
    "X-Content-Type-Options":    "nosniff",
    "X-Frame-Options":           "DENY",
    "Referrer-Policy":           "strict-origin-when-cross-origin",
    "Permissions-Policy":        "geolocation=(self), camera=(self), microphone=()",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  }),
});
