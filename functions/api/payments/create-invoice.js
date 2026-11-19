import {
  CATALOG,
  BillingNotConfiguredError,
  createNowPaymentsInvoice,
  getNowPaymentsConfig,
  isValidEmail,
  kvGet,
  kvPut,
  makeOrderId,
} from "./_lib/nowpayments.js";

const SITE_ORIGIN = "https://leadvium.pages.dev";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function onRequestPost(context) {
  const kv = context.env?.LEADVIUM_PAYMENTS;
  if (!kv) return json({ ok: false, error: "PAYMENTS_NOT_CONFIGURED" }, 503);

  let config;
  try {
    config = getNowPaymentsConfig(context.env);
  } catch (e) {
    if (e instanceof BillingNotConfiguredError) {
      return json({ ok: false, error: "PAYMENTS_NOT_CONFIGURED" }, 503);
    }
    throw e;
  }

  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ ok: false, error: "INVALID_JSON" }, 400);
  }

  const plan = String(payload?.plan || "");
  const email = String(payload?.email || "").trim();
  const payCurrency =
    typeof payload?.payCurrency === "string" && /^[a-z0-9]{2,20}$/.test(payload.payCurrency)
      ? payload.payCurrency
      : undefined;

  const item = CATALOG[plan];
  if (!item || !isValidEmail(email)) {
    return json(
      {
        ok: false,
        error: "VALIDATION_FAILED",
        fields: { plan: !item, email: !isValidEmail(email) },
      },
      422
    );
  }

  const orderId = makeOrderId();
  const invoice = {
    orderId,
    plan,
    planName: item.name,
    amountUSD: item.amountUSD,
    kind: item.kind,
    email,
    rail: "nowpayments",
    status: "awaiting",
    createdAt: new Date().toISOString(),
    railInvoiceId: null,
    payUrl: null,
    paidUSD: null,
    payCurrency: null,
    paymentId: null,
    paidAt: null,
  };
  await kvPut(kv, `invoice:${orderId}`, invoice);

  let created;
  try {
    created = await createNowPaymentsInvoice(config, {
      amountUSD: item.amountUSD,
      orderId,
      description: `Leadvium ${item.name} — ${orderId}`,
      payCurrency,
      ipnCallbackUrl: `${SITE_ORIGIN}/api/payments/ipn`,
      successUrl: `${SITE_ORIGIN}/pay/?invoice=${orderId}&paid=1`,
      cancelUrl: `${SITE_ORIGIN}/pay/?invoice=${orderId}&cancelled=1`,
    });
  } catch {
    invoice.status = "failed";
    await kvPut(kv, `invoice:${orderId}`, invoice).catch(() => {});
    return json({ ok: false, error: "INVOICE_FAILED" }, 502);
  }

  invoice.railInvoiceId = created.railInvoiceId;
  invoice.payUrl = created.invoiceUrl;
  await kvPut(kv, `invoice:${orderId}`, invoice);

  return json({
    ok: true,
    orderId,
    invoiceUrl: created.invoiceUrl,
    amountUSD: item.amountUSD,
    plan,
  });
}
