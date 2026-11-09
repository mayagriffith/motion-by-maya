/**
 * POST /api/thursday-signup  { name, email, heardFrom }
 * Saves the sign-up and emails the Zoom link with a calendar invite attached.
 */
import {
  confirmationEmail,
  icsInvite,
  isValidEmail,
  mailConfigured,
  normalizeEmail,
  sendOne,
  signups,
} from "../lib/thursday.mjs";

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  let body;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Invalid request" });
  }

  const email = normalizeEmail(body.email);
  const name = String(body.name || "").trim().slice(0, 120);
  if (!name || !isValidEmail(email)) {
    return json(400, { error: "Please enter your name and a valid email." });
  }

  const store = signups();
  const existing = await store.get(email, { type: "json" });
  await store.setJSON(email, {
    name,
    email,
    heardFrom: String(body.heardFrom || "").slice(0, 80),
    createdAt: existing?.createdAt || new Date().toISOString(),
    active: true,
  });

  if (!mailConfigured()) return json(200, { ok: true, emailed: false });

  try {
    const message = confirmationEmail({ name, email });
    await sendOne(
      {
        ...message,
        to: email,
        attachments: [
          {
            filename: "gentle-thursday-flow.ics",
            content: Buffer.from(icsInvite()).toString("base64"),
          },
        ],
      },
      email
    );
    return json(200, { ok: true, emailed: true });
  } catch (err) {
    console.error("confirmation email failed", err);
    return json(200, { ok: true, emailed: false });
  }
};

export const config = { path: "/api/thursday-signup" };
