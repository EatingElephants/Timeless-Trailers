/*
  The one bit of server code behind the public site.

  Cloudflare runs this in front of the static files in site/. It does two things:
    1. POST /api/lead  takes a form from the site (quote, hold, accessories, financing) and emails it to Matt.
    2. Everything else is served from site/ as plain files (the ASSETS binding in wrangler.jsonc).

  Email goes out through Cloudflare Email Routing (the SEND_EMAIL binding): free, no third party, but it needs
  the site's domain in Cloudflare with Email Routing on, and Matt's address verified there. Until that's set up
  the endpoint answers 503 and the site shows "call us" instead of a false "we'll call you".
  Fallback: set RESEND_API_KEY (and LEAD_FROM to an address on a domain verified at resend.com) and it uses Resend instead.

  Settings (wrangler.jsonc "vars", or the Worker's Settings → Variables in the dashboard):
    LEAD_TO     where leads go, e.g. matt@example.com (must be a verified Email Routing destination)
    LEAD_FROM   the sender, an address on the site's domain, e.g. website@timelesstrailers.com
    LEAD_NAME   the sender's display name (optional)
*/
import { EmailMessage } from "cloudflare:email";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/lead") {
      if (request.method !== "POST") return json({ ok: false, error: "POST only" }, 405);
      return lead(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

const FIELDS = [
  ["kind", "What"], ["name", "Name"], ["phone", "Phone"], ["email", "Email"], ["trailer", "Trailer"], ["stock", "Stock"], ["price", "Price"],
  ["haul", "Hauling"], ["weight", "Loaded weight"], ["tow", "Tow vehicle"], ["when", "When"], ["financing", "Financing"],
  ["unit", "Their trailer"], ["items", "Accessories"], ["as", "Buying as"], ["notes", "Notes"], ["page", "Page"],
];

function clean(v, max) {
  return String(v == null ? "" : v).replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}

async function lead(request, env) {
  let data;
  try { data = await request.json(); } catch (e) { return json({ ok: false, error: "Could not read the form." }, 400); }
  if (data.website) return json({ ok: true });  // a hidden field only robots fill in
  const name = clean(data.name, 80), phone = clean(data.phone, 40), kind = clean(data.kind, 60) || "Website lead";
  if (!name || phone.replace(/\D/g, "").length < 10) return json({ ok: false, error: "Name and a ten-digit phone number are needed." }, 400);

  const to = env.LEAD_TO, from = env.LEAD_FROM;
  if (!to || !from || !(env.SEND_EMAIL || env.RESEND_API_KEY)) return json({ ok: false, error: "Lead delivery isn't set up yet." }, 503);

  const lines = [];
  for (const [key, label] of FIELDS) {
    const v = clean(data[key], 600);
    if (v) lines.push(`${label}: ${v}`);
  }
  const when = new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" });
  lines.push(`Received: ${when} (Eastern)`);
  const subject = `${kind}: ${name}, ${phone}`;
  const body = lines.join("\n") + "\n\n(Sent by the website. Reply to the customer by phone; this address doesn't take replies.)\n";

  try {
    if (env.SEND_EMAIL) {
      const fromName = clean(env.LEAD_NAME || "Website", 60);
      const raw = [
        `From: ${fromName} <${from}>`, `To: ${to}`, `Subject: ${subject.replace(/[^\x20-\x7e]/g, "")}`,
        `Date: ${new Date().toUTCString()}`, `Message-ID: <${crypto.randomUUID()}@${from.split("@")[1]}>`,
        "MIME-Version: 1.0", "Content-Type: text/plain; charset=utf-8", "Content-Transfer-Encoding: 8bit", "", body,
      ].join("\r\n");
      await env.SEND_EMAIL.send(new EmailMessage(from, to, raw));
    } else {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: `${env.LEAD_NAME || "Website"} <${from}>`, to: [to], subject, text: body }),
      });
      if (!res.ok) throw new Error("Resend " + res.status + " " + (await res.text()).slice(0, 200));
    }
    return json({ ok: true });
  } catch (err) {
    console.error("lead email failed", err && err.message);
    return json({ ok: false, error: "Could not send the email." }, 502);
  }
}
