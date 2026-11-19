// TEMPORARY — delivery proof only. Sends exactly one email to Resend's
// test mailbox (delivered@resend.dev). No request input is used: the
// recipient is hardcoded. REMOVE THIS FILE after the delivery proof,
// then redeploy.
import { Resend } from "resend";

export async function onRequestPost(context) {
  const apiKey = context.env?.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ ok: false, error: "EMAIL_NOT_CONFIGURED" }),
      { status: 503, headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  }
  try {
    const resend = new Resend(apiKey);
    const from = context.env?.LEAD_EMAIL_FROM || "Leadvium <leads@getexvorta.com>";
    const { data, error } = await resend.emails.send({
      from,
      to: "delivered@resend.dev",
      subject: `Leadvium delivery proof ${new Date().toISOString()}`,
      text: "Leadvium Resend delivery proof.",
    });
    if (error) {
      return new Response(
        JSON.stringify({ ok: false, error: "SEND_FAILED", detail: String(error.message || error) }),
        { status: 502, headers: { "Content-Type": "application/json; charset=utf-8" } }
      );
    }
    return new Response(
      JSON.stringify({ ok: true, id: data?.id || null, to: "delivered@resend.dev" }),
      { status: 200, headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, error: "SEND_FAILED", detail: String(e?.message || e) }),
      { status: 502, headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  }
}
