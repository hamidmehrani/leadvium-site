/* NOWPayments client for Pages Functions (no dependencies, WebCrypto only).
 *
 * Mirrors the Exvorta RAIL-1 client (r2-cryptos/src/nowpayments.ts):
 * hosted one-time invoices, IPN HMAC-SHA512 over the recursively
 * sorted JSON payload, status mapping, dedupe by (payment, status).
 * Differences: no node:crypto (WebCrypto instead), env from
 * context.env, no 'server-only' import.
 *
 * Config is env-only, sandbox by default. NOWPAYMENTS_PAYOUT_ADDRESS
 * is a fail-closed guard (the receiving wallet is a dashboard setting,
 * never an API parameter): checkout cannot be activated before the
 * owner configures it. Its value is never sent to the processor and
 * never logged.
 */

export const CATALOG = {
  pilot_project: { amountUSD: 2900, name: "Custom Pilot Sprint", kind: "one-time" },
  monthly_managed: { amountUSD: 2400, name: "Managed Growth Retainer", kind: "first month" },
  sovereign_pod: { amountUSD: 4800, name: "Sovereign Revenue Pod", kind: "first month" },
};

export class BillingNotConfiguredError extends Error {
  constructor(message) {
    super(message);
    this.name = "BillingNotConfiguredError";
  }
}

export function getNowPaymentsConfig(env) {
  const apiKey = (env?.NOWPAYMENTS_API_KEY || "").trim();
  const ipnSecret = (env?.NOWPAYMENTS_IPN_SECRET || "").trim();
  const payoutAddress = (env?.NOWPAYMENTS_PAYOUT_ADDRESS || "").trim();
  if (!apiKey) {
    throw new BillingNotConfiguredError("NOWPAYMENTS_API_KEY is missing.");
  }
  if (!ipnSecret) {
    throw new BillingNotConfiguredError("NOWPAYMENTS_IPN_SECRET is missing.");
  }
  if (!payoutAddress) {
    throw new BillingNotConfiguredError("NOWPAYMENTS_PAYOUT_ADDRESS is missing.");
  }
  return {
    apiKey,
    ipnSecret,
    payoutAddress,
    sandbox: (env?.NOWPAYMENTS_SANDBOX || "true").trim() !== "false",
  };
}

export function nowPaymentsBaseUrl(config) {
  return config.sandbox
    ? "https://api-sandbox.nowpayments.io"
    : "https://api.nowpayments.io";
}

export function makeOrderId() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `LVP-${stamp}-${rand}`;
}

export function isValidEmail(s) {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/**
 * Create a hosted NOWPayments invoice.
 * POST /v1/invoice — price_amount (USD), order_id, optional
 * pay_currency, ipn_callback_url, success_url, cancel_url.
 */
export async function createNowPaymentsInvoice(config, input, fetchImpl = fetch) {
  const body = {
    price_amount: input.amountUSD,
    price_currency: "USD",
    order_id: input.orderId,
    order_description: input.description || `Leadvium invoice ${input.orderId}`,
  };
  if (input.payCurrency) body.pay_currency = input.payCurrency;
  if (input.ipnCallbackUrl) body.ipn_callback_url = input.ipnCallbackUrl;
  if (input.successUrl) body.success_url = input.successUrl;
  if (input.cancelUrl) body.cancel_url = input.cancelUrl;

  const res = await fetchImpl(`${nowPaymentsBaseUrl(config)}/v1/invoice`, {
    method: "POST",
    headers: { "x-api-key": config.apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`NOWPayments invoice creation failed (${res.status}): ${text.slice(0, 200)}`);
  }
  const json = await res.json();
  const railInvoiceId = String(json.id ?? "");
  const invoiceUrl = String(json.invoice_url ?? "");
  if (!railInvoiceId || !invoiceUrl) {
    throw new Error("NOWPayments invoice creation returned an incomplete response.");
  }
  return { railInvoiceId, invoiceUrl };
}

/** Recursively sort an object's keys (NOWPayments signs the sorted JSON). */
export function sortJsonKeys(value) {
  if (Array.isArray(value)) return value.map(sortJsonKeys);
  if (value !== null && typeof value === "object") {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      out[key] = sortJsonKeys(value[key]);
    }
    return out;
  }
  return value;
}

function hexEncode(buf) {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Verify the NOWPayments IPN signature (x-nowpayments-sig header):
 * HMAC-SHA512 hex of the sorted-key JSON string, keyed by the IPN
 * secret. The raw body is parsed and re-serialized (the documented
 * method — NOWPayments' own examples sort + re-encode server-side).
 */
export async function verifyNowPaymentsIpnSignature(rawBody, signature, ipnSecret) {
  if (!signature || !ipnSecret) return false;
  let parsed;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return false;
  }
  const canonical = JSON.stringify(sortJsonKeys(parsed));
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(ipnSecret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(canonical));
  const expected = hexEncode(mac);
  const given = signature.trim().toLowerCase();
  if (given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < given.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

/** What a NOWPayments payment_status means for our invoice. */
export function nowPaymentsStatusToAction(paymentStatus) {
  switch (paymentStatus) {
    case "finished":
      return "paid";
    case "partially_paid":
      return "partial";
    case "failed":
    case "refunded":
      return "failed";
    case "expired":
      return "expired";
    case "waiting":
    case "confirming":
    case "confirmed":
    case "sending":
      return "awaiting";
    default:
      return "ignored";
  }
}

/** Dedupe key for a NOWPayments IPN: one IPN per (payment, status). */
export function buildNowPaymentsEventId(paymentId, paymentStatus) {
  return `${paymentId}:${paymentStatus}`;
}

/* --- KV helpers (values are JSON) --- */

export async function kvGet(kv, key) {
  if (!kv) return null;
  const raw = await kv.get(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function kvPut(kv, key, value) {
  await kv.put(key, JSON.stringify(value));
}
