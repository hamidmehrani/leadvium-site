/* Best-effort Resend send (fetch, no SDK). Used for payment receipts.
 * Failures are swallowed by the callers — email must never fail a
 * webhook or a claim. No key material is ever logged.
 */

export async function sendReceiptEmail(env, { to, subject, text }) {
  const apiKey = (env?.RESEND_API_KEY || "").trim();
  if (!apiKey || !to) return false;
  try {
    const from = (env?.LEAD_EMAIL_FROM || "").trim() || "Leadvium <leads@getexvorta.com>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text }),
      signal: AbortSignal.timeout(15_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
