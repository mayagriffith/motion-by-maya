/**
 * GET or POST /api/thursday-unsubscribe?e=<email>&t=<token>
 * Stops reminder emails for that address. POST supports one-click
 * unsubscribe from mail apps (List-Unsubscribe-Post).
 */
import { normalizeEmail, signups, verifyUnsubscribe } from "../lib/thursday.mjs";

const page = (title, message) =>
  new Response(
    `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<body style="margin:0;background:#faf7f3;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#141412">
<div style="max-width:480px;margin:80px auto;padding:0 24px"><h1 style="font-family:Georgia,serif;font-weight:400">${title}</h1>
<p style="line-height:1.6">${message}</p><p><a href="https://motionbymaya.com" style="color:#a0512f">motionbymaya.com</a></p></div>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );

export default async (req) => {
  const url = new URL(req.url);
  const email = normalizeEmail(url.searchParams.get("e"));
  const token = url.searchParams.get("t");
  if (!email || !verifyUnsubscribe(email, token)) {
    return page("Link not recognized", "Email motionbymaya@gmail.com and I'll take you off the list.");
  }

  const store = signups();
  const person = await store.get(email, { type: "json" });
  if (person) await store.setJSON(email, { ...person, active: false, unsubscribedAt: new Date().toISOString() });

  return page("You're unsubscribed", "You won't get Gentle Thursday Flow emails anymore. You're always welcome back.");
};

export const config = { path: "/api/thursday-unsubscribe" };
