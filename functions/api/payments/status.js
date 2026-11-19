import { kvGet } from "./_lib/nowpayments.js";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

/* GET /api/payments/status?invoice=<orderId> — public receipt view.
 * No secrets and no email addresses are ever returned here.
 */
export async function onRequestGet(context) {
  const kv = context.env?.LEADVIUM_PAYMENTS;
  if (!kv) return json({ ok: false, error: "PAYMENTS_NOT_CONFIGURED" }, 503);

  const url = new URL(context.request.url);
  const orderId = (url.searchParams.get("invoice") || "").trim();
  if (!orderId) return json({ ok: false, error: "NOT_FOUND" }, 404);

  const invoice = await kvGet(kv, `invoice:${orderId}`);
  if (!invoice) return json({ ok: false, error: "NOT_FOUND" }, 404);

  return json({
    ok: true,
    orderId: invoice.orderId,
    status: invoice.status,
    plan: invoice.plan,
    planName: invoice.planName,
    amountUSD: invoice.amountUSD,
    paidUSD: invoice.paidUSD ?? null,
    payCurrency: invoice.payCurrency ?? null,
    paymentId: invoice.paymentId ?? null,
    paidAt: invoice.paidAt ?? null,
  });
}
