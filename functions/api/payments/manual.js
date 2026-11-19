import { CATALOG, kvPut, makeOrderId } from "./_lib/nowpayments.js";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

/* GET /api/payments/manual?plan=<id> — manual USDT (TRC-20) details.
 * Fail-closed: when MANUAL_USDT_TRC20_ADDRESS is not configured the
 * route answers 503 and the pay page hides the manual section.
 * The returned reference is a fresh order id the buyer must put in
 * the transfer memo so the payment can be matched.
 */
export async function onRequestGet(context) {
  const kv = context.env?.LEADVIUM_PAYMENTS;
  if (!kv) return json({ ok: false, error: "PAYMENTS_NOT_CONFIGURED" }, 503);

  const address = (context.env?.MANUAL_USDT_TRC20_ADDRESS || "").trim();
  if (!address) return json({ ok: false, error: "MANUAL_NOT_CONFIGURED" }, 503);

  const url = new URL(context.request.url);
  const plan = (url.searchParams.get("plan") || "").trim();
  const item = CATALOG[plan];
  if (!item) return json({ ok: false, error: "VALIDATION_FAILED" }, 422);

  const orderId = makeOrderId();
  await kvPut(kv, `invoice:${orderId}`, {
    orderId,
    plan,
    planName: item.name,
    amountUSD: item.amountUSD,
    kind: item.kind,
    email: null,
    rail: "manual",
    status: "manual_pending",
    createdAt: new Date().toISOString(),
    railInvoiceId: null,
    payUrl: null,
    paidUSD: null,
    payCurrency: "usdttrc20",
    paymentId: null,
    paidAt: null,
  });

  return json({
    ok: true,
    plan,
    planName: item.name,
    amountUSD: item.amountUSD,
    address,
    network: "TRC-20",
    currency: "USDT",
    reference: orderId,
  });
}
