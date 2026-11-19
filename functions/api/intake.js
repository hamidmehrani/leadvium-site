import { Resend } from "resend";

const ALLOWED_MODES = new Set(["pilot_project", "monthly_managed", "sovereign_pod", "advisory_fit"]);

function cleanText(val, maxLen = 500) {
  if (typeof val !== "string") return "";
  return val.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLen);
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function onRequestPost(context) {
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "INVALID_JSON" }),
      { status: 400, headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  }

  // Honeypot trap
  if (payload && cleanText(payload.company_fax_hp, 80)) {
    return new Response(
      JSON.stringify({ ok: true, referenceId: "LV-FILTERED", status: "accepted" }),
      { status: 200, headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  }

  const company = cleanText(payload?.company, 140);
  const email = cleanText(payload?.email, 160);
  const product = cleanText(payload?.product, 600);
  const website = cleanText(payload?.website, 200);
  const dealSize = cleanText(payload?.dealSize, 80);
  const handle = cleanText(payload?.handle, 120);
  const notes = cleanText(payload?.notes, 1200);
  const locale = ["en", "fa", "ar"].includes(payload?.locale) ? payload.locale : "en";
  const mode = ALLOWED_MODES.has(payload?.engagementMode) ? payload.engagementMode : "monthly_managed";
  const regions = Array.isArray(payload?.regions)
    ? payload.regions.map((r) => cleanText(String(r), 40)).filter(Boolean).slice(0, 8)
    : [];
  const channels = Array.isArray(payload?.channels)
    ? payload.channels.map((c) => cleanText(String(c), 40)).filter(Boolean).slice(0, 6)
    : [];

  if (!company || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !product) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "VALIDATION_FAILED",
        fields: {
          company: !company,
          email: !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
          product: !product
        }
      }),
      { status: 422, headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  }

  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  const referenceId = `LV-${stamp}-${rand}`;

  const recommendedArchitecture = {
    referenceId,
    submittedAt: new Date().toISOString(),
    locale,
    company,
    website: website || "new-domain-setup",
    engagementMode: mode,
    dealSize: dealSize || "custom",
    regions: regions.length ? regions : ["gulf_mena", "europe"],
    channels: channels.length ? channels : ["email", "whatsapp", "telegram"],
    handle: handle || null,
    notesLength: notes.length,
    deliverables: [
      "Isolated Workspace & SQLite Vault",
      "Sister-Domain Fleet + SPF/DKIM/DMARC DNS Doctor",
      "FACTS.md & NEGOTIATION.md Guardrail Codification",
      "Custom 240+ Registry & Trade-Fair Harvester",
      "Canary Batch Validation (100-200 Tier-A Prospects)"
    ]
  };

  // Email notifications (Resend). Best-effort by design: a mail failure
  // must never fail the intake itself. No key configured -> skip silently.
  const emailStatus = { ownerNotified: false, visitorConfirmed: false };
  const apiKey = context.env?.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const from = context.env?.LEAD_EMAIL_FROM || "Leadvium <leads@getexvorta.com>";
      const admin = context.env?.ADMIN_EMAIL || "pmbuzhmehrani@gmail.com";

      const ownerText = [
        `New Leadvium brief ${referenceId}`,
        ``,
        `Company: ${company}`,
        `Email: ${email}`,
        `Product: ${product}`,
        `Website: ${website || "-"}`,
        `Deal size: ${dealSize || "-"}`,
        `Handle: ${handle || "-"}`,
        `Locale: ${locale}`,
        `Engagement: ${mode}`,
        `Regions: ${regions.join(", ") || "-"}`,
        `Channels: ${channels.join(", ") || "-"}`,
        `Notes: ${notes || "-"}`,
      ].join("\n");
      const owner = await resend.emails.send({
        from,
        to: admin,
        subject: `New Leadvium brief ${referenceId} — ${company}`,
        text: ownerText,
      });
      if (!owner.error) emailStatus.ownerNotified = true;

      const visitor = await resend.emails.send({
        from,
        to: email,
        subject: `Your Leadvium brief is in — ${referenceId}`,
        text: [
          `Thanks — we've received your brief.`,
          ``,
          `Your reference: ${referenceId}`,
          `Company: ${company}`,
          ``,
          `The Leadvium team will review it and reply to this address.`,
        ].join("\n"),
        html: `<p>Thanks — we've received your brief.</p><p>Your reference: <strong>${escHtml(referenceId)}</strong><br>Company: ${escHtml(company)}</p><p>The Leadvium team will review it and reply to this address.</p>`,
      });
      if (!visitor.error) emailStatus.visitorConfirmed = true;
    } catch {
      // Deliberately swallowed: email is best-effort, intake already accepted.
    }
  }

  return new Response(
    JSON.stringify({
      ok: true,
      referenceId,
      blueprint: recommendedArchitecture,
      emailSent: emailStatus.ownerNotified,
      email: emailStatus
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    }
  );
}
