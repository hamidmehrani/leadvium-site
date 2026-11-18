export async function onRequestGet() {
  return new Response(
    JSON.stringify({
      ok: true,
      service: "leadvium-edge-api",
      engine: "autonomous-outbound-v1",
      gates: ["sister-domain-shield", "facts-verified", "single-send-path", "atomic-opt-out"],
      timestamp: new Date().toISOString()
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
