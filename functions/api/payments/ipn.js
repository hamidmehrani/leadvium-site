import {
  BillingNotConfiguredError,
  buildNowPaymentsEventId,
  getNowPaymentsConfig,
  kvGet,
  kvPut,
  nowPaymentsStatusToAction,
  verifyNowPaymentsIpnSignature,
} from "./_lib/nowpayments.js";
import { sendReceiptEmail } from "./_lib/email.js";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * NOWPayments IPN webhook.
 *
 * Order of operations (Nov 3 defect #396 — process-then-record):
 * 1. Verify the HMAC-SHA512 signature (400 on failure — no processing).
 * 2. Resolve the local invoice by order_id.
 * 3. Claim the event (KV key event:<paymentId>:<paymentStatus> — a
 *    redelivery is a no-op 200). The claim is deleted on processing
 *    failure so the processor's retry can claim again.
 * 4. Process by payment_status (paid → record + receipt, re-runnable;
 *    partial/failed/expired → invoice state only).
 * Activation happens ONLY here — never from the checkout success URL.
 * A 'finished' IPN that is SHORT of the invoice amount never grants
 * access: it is recorded as a partial instead.
 */
export async function onRequestPost(context) {
  const rawBody = await context.request.text();

  let config;
  try {
    config = getNowPaymentsConfig(context.env);
  } catch (e) {
    if (e instanceof BillingNotConfiguredError) {
      return json({ ok: false, error: "PAYMENTS_NOT_CONFIGURED" }, 503);
    }
    throw e;
  }

  const signature = context.request.headers.get("x-nowpayments-sig") || undefined;
  if (!(await verifyNowPaymentsIpnSignature(rawBody, signature, config.ipnSecret))) {
    return json({ ok: false, error: "INVALID_SIGNATURE" }, 400);
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return json({ ok: false, error: "INVALID_JSON" }, 400);
  }

  const paymentId = String(body.payment_id ?? "");
  const paymentStatus = String(body.payment_status ?? "");
  const orderId = String(body.order_id ?? "");
  if (!paymentId || !paymentStatus || !orderId) {
    return json({ ok: true, ignored: true });
  }

  const kv = context.env?.LEADVIUM_PAYMENTS;
  if (!kv) return json({ ok: false, error: "PAYMENTS_NOT_CONFIGURED" }, 503);

  const invoice = await kvGet(kv, `invoice:${orderId}`);
  if (!invoice) {
    return json({ ok: true, ignored: true });
  }

  const eventId = buildNowPaymentsEventId(paymentId, paymentStatus);
  const claimKey = `event:${eventId}`;
  if (await kv.get(claimKey)) {
    return json({ ok: true, deduped: true });
  }
  await kv.put(claimKey, JSON.stringify({ claimedAt: new Date().toISOString(), orderId }));

  try {
    const action = nowPaymentsStatusToAction(paymentStatus);
    const progress = {
      paymentId: paymentId || null,
      payCurrency: typeof body.pay_currency === "string" ? body.pay_currency : null,
      payAmount:
        body.pay_amount !== undefined && body.pay_amount !== null
          ? `${String(body.pay_amount)} ${String(body.pay_currency ?? "")}`.trim()
          : null,
    };

    if (action === "paid") {
      const paidUSD = Number(body.actually_paid_at_fiat ?? body.price_amount ?? invoice.amountUSD);
      const received = Number.isFinite(paidUSD) && paidUSD > 0 ? paidUSD : invoice.amountUSD;
      if (received < invoice.amountUSD) {
        // 'finished' but short — a partial payment never grants access.
        invoice.status = "partial";
        invoice.paidUSD = round2(received);
        invoice.paymentId = paymentId;
        invoice.payCurrency = progress.payCurrency;
        await kvPut(kv, `invoice:${orderId}`, invoice);
      } else {
        invoice.status = "paid";
        invoice.paidUSD = round2(received);
        invoice.paymentId = paymentId;
        invoice.payCurrency = progress.payCurrency;
        invoice.paidAt = new Date().toISOString();
        await kvPut(kv, `invoice:${orderId}`, invoice);
        // Receipt (best-effort — email must never fail the webhook).
        const admin = (context.env?.ADMIN_EMAIL || "").trim() || "pmbuzhmehrani@gmail.com";
        await sendReceiptEmail(context.env, {
          to: invoice.email,
          subject: `Leadvium receipt — ${orderId}`,
          text: [
            `Thanks — your Leadvium payment is confirmed.`,
            ``,
            `Order: ${orderId}`,
            `Plan: ${invoice.planName}`,
            `Amount: $${invoice.amountUSD} USD`,
            `Received: $${invoice.paidUSD} USD`,
            `Status: paid`,
            ``,
            `Save your order reference above. The Leadvium team will be in touch at this address to start your engagement.`,
          ].join("\n"),
        });
        await sendReceiptEmail(context.env, {
          to: admin,
          subject: `Leadvium payment received — ${orderId}`,
          text: [
            `Leadvium payment confirmed.`,
            ``,
            `Order: ${orderId}`,
            `Plan: ${invoice.planName} ($${invoice.amountUSD} USD)`,
            `Buyer: ${invoice.email}`,
            `Received: $${invoice.paidUSD} USD`,
            `Payment id: ${paymentId}`,
          ].join("\n"),
        });
      }
    } else if (action === "partial") {
      const partialUSD = Number(body.actually_paid_at_fiat ?? body.price_amount ?? 0);
      invoice.status = "partial";
      invoice.paidUSD = Number.isFinite(partialUSD) ? round2(partialUSD) : 0;
      invoice.paymentId = paymentId;
      invoice.payCurrency = progress.payCurrency;
      await kvPut(kv, `invoice:${orderId}`, invoice);
    } else if (action === "failed" || action === "expired") {
      invoice.status = action;
      invoice.paymentId = paymentId;
      invoice.payCurrency = progress.payCurrency;
      await kvPut(kv, `invoice:${orderId}`, invoice);
    } else {
      // awaiting / ignored: record progress only, never activate.
      invoice.paymentId = paymentId;
      invoice.payCurrency = progress.payCurrency;
      invoice.payAmount = progress.payAmount;
      await kvPut(kv, `invoice:${orderId}`, invoice);
    }
    return json({ ok: true });
  } catch (e) {
    await kv.delete(claimKey).catch(() => {});
    return json({ ok: false, error: "PROCESSING_FAILED" }, 500);
  }
}
