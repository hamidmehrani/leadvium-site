import { isValidEmail, kvGet, kvPut } from "./_lib/nowpayments.js";
import { sendReceiptEmail } from "./_lib/email.js";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

/* POST /api/payments/manual-claim {orderId, txHash, email}
 * Records a manual USDT payment claim for human on-chain verification.
 * NEVER activates anything: status stays 'manual_pending' until a
 * person verifies the transaction on TRON and marks it paid.
 */
export async function onRequestPost(context) {
  const kv = context.env?.LEADVIUM_PAYMENTS;
  if (!kv) return json({ ok: false, error: "PAYMENTS_NOT_CONFIGURED" }, 503);

  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ ok: false, error: "INVALID_JSON" }, 400);
  }

  const orderId = String(payload?.orderId || "").trim();
  const txHash = String(payload?.txHash || "").trim();
  const email = String(payload?.email || "").trim();

  if (!orderId || !/^[0-9a-fA-F]{64}$/.test(txHash) || !isValidEmail(email)) {
    return json(
      {
        ok: false,
        error: "VALIDATION_FAILED",
        fields: {
          orderId: !orderId,
          txHash: !/^[0-9a-fA-F]{64}$/.test(txHash),
          email: !isValidEmail(email),
        },
      },
      422
    );
  }

  const invoice = await kvGet(kv, `invoice:${orderId}`);
  if (!invoice) return json({ ok: false, error: "NOT_FOUND" }, 404);
  if (invoice.status !== "manual_pending") {
    return json({ ok: false, error: "INVALID_STATE" }, 409);
  }

  invoice.txHash = txHash;
  invoice.claimedAt = new Date().toISOString();
  invoice.claimEmail = email;
  await kvPut(kv, `invoice:${orderId}`, invoice);

  // Team notification (best-effort) so the claim is verified on-chain.
  const admin = (context.env?.ADMIN_EMAIL || "").trim() || "pmbuzhmehrani@gmail.com";
  await sendReceiptEmail(context.env, {
    to: admin,
    subject: `Leadvium manual payment claim — ${orderId}`,
    text: [
      `A manual USDT payment claim was submitted. Verify it on-chain before activating anything.`,
      ``,
      `Order: ${orderId}`,
      `Plan: ${invoice.planName} ($${invoice.amountUSD} USD)`,
      `Tx hash: ${txHash}`,
      `Claim email: ${email}`,
    ].join("\n"),
  });

  return json({ ok: true, status: "manual_pending" });
}
