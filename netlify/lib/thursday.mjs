/**
 * Shared helpers for the Gentle Thursday Flow emails (sign-up confirmation,
 * reminders, unsubscribe). Class details come from src/config/site.js so the
 * site and the emails can never disagree.
 *
 * Env (Netlify → Site configuration → Environment variables):
 *   RESEND_API_KEY      required. A Resend API key with sending access; it
 *                       also signs the unsubscribe links.
 *   MAIL_FROM           optional, defaults to DEFAULT_FROM below (the domain
 *                       must be verified in Resend)
 *   UNSUBSCRIBE_SECRET  optional, overrides the key used to sign unsubscribe links
 *   SKIP_DATES          optional, extra Thursdays with no class (YYYY-MM-DD, comma-separated)
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { getStore } from "@netlify/blobs";
import {
  DONATION_LINKS,
  SITE_URL,
  ZOOM_CLASS,
  ZOOM_JOIN_URL,
} from "../../src/config/site.js";

export const REPLY_TO = "motionbymaya@gmail.com";
const DEFAULT_FROM = "Maya Griffith <hello@motionbymaya.com>";
const mailFrom = () => process.env.MAIL_FROM || DEFAULT_FROM;
const signingSecret = () => process.env.UNSUBSCRIBE_SECRET || process.env.RESEND_API_KEY || "";
export const signups = () => getStore("thursday-flow-signups");
export const sendLog = () => getStore("thursday-flow-sends");

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function signature(email) {
  return createHmac("sha256", signingSecret()).update(email).digest("hex").slice(0, 32);
}

export function unsubscribeUrl(email) {
  const params = new URLSearchParams({ e: email, t: signature(email) });
  return `${SITE_URL}/api/thursday-unsubscribe?${params.toString()}`;
}

export function verifyUnsubscribe(email, token) {
  const expected = Buffer.from(signature(email));
  const given = Buffer.from(String(token || ""));
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** Current date/time in New York, as plain parts. */
export function newYorkNow(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value])
  );
  return {
    weekday: parts.weekday,
    isoDate: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/**
 * Which reminder (if any) is due right now. The scheduled function runs every
 * 15 minutes, so each window is 15 minutes wide.
 *   "morning": Thursday 10:00 ET, "tonight at 8"
 *   "soon":    30 minutes before class
 */
export function dueReminder(now = newYorkNow()) {
  if (now.weekday !== "Thu") return null;
  if (now.isoDate < ZOOM_CLASS.firstDate) return null;
  const skip = [
    ...ZOOM_CLASS.skipDates,
    ...(process.env.SKIP_DATES || "").split(",").map((d) => d.trim()),
  ];
  if (skip.includes(now.isoDate)) return null;

  const start = toMinutes(ZOOM_CLASS.start);
  const windows = { morning: 10 * 60, soon: start - 30 };
  for (const [kind, at] of Object.entries(windows)) {
    if (now.minutes >= at && now.minutes < at + 15) return kind;
  }
  return null;
}

// ── Email content ─────────────────────────────────────────────────────

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function button(href, label, dark = true) {
  const bg = dark ? "#141412" : "#ffffff";
  const fg = dark ? "#faf7f3" : "#141412";
  return `<a href="${href}" style="display:inline-block;background:${bg};color:${fg};text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:600;font-size:15px;border:1px solid #141412;margin:4px 6px 4px 0">${escapeHtml(label)}</a>`;
}

function layout(bodyHtml, email) {
  return `<!doctype html><html><body style="margin:0;background:#faf7f3;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#141412">
<div style="max-width:520px;margin:0 auto;padding:32px 24px">
<p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#a0512f;margin:0 0 18px">Motion by Maya</p>
${bodyHtml}
<p style="margin-top:32px;font-size:12px;color:#8a8a85;line-height:1.5">
You signed up for Gentle Thursday Flow at motionbymaya.com.
<a href="${unsubscribeUrl(email)}" style="color:#8a8a85">Stop these emails</a>.
</p></div></body></html>`;
}

const donateHtml = () =>
  DONATION_LINKS.length
    ? `<p style="font-size:15px;line-height:1.6;margin:22px 0 6px">It's donation-based, suggested ${escapeHtml(ZOOM_CLASS.suggestedDonation)}:</p>
       ${DONATION_LINKS.map((d) => button(d.url, d.label, false)).join("")}`
    : "";

const donateText = () =>
  DONATION_LINKS.length
    ? `\nDonation-based, suggested ${ZOOM_CLASS.suggestedDonation}: ${DONATION_LINKS.map((d) => `${d.label} ${d.url}`).join(", ")}\n`
    : "";

export function confirmationEmail({ name, email }) {
  const first = escapeHtml((name || "").split(" ")[0] || "there");
  const html = layout(
    `<h1 style="font-family:Georgia,serif;font-weight:400;font-size:30px;margin:0 0 14px">You're in, ${first}.</h1>
<p style="font-size:15px;line-height:1.6;margin:0 0 6px">Gentle Thursday Flow is every <b>Thursday, ${escapeHtml(ZOOM_CLASS.time)}</b>, starting ${escapeHtml(ZOOM_CLASS.firstClass)}. 40 minutes, all levels.</p>
<p style="font-size:15px;line-height:1.6;margin:0 0 18px">The Zoom link is the same every week. I'll also email you a reminder the morning of class and 30 minutes before.</p>
${button(ZOOM_JOIN_URL, "Join on Zoom")}
<p style="font-size:15px;line-height:1.6;margin:22px 0 6px">The calendar invite is attached. Open it to add every Thursday to your calendar.</p>
<p style="font-size:15px;line-height:1.6;margin:18px 0 0">Bring a mat or towel, space to lie down, and comfy clothes. Camera on or off, your choice.</p>
${donateHtml()}
<p style="font-size:15px;line-height:1.6;margin:26px 0 0">See you Thursday,<br>Maya</p>`,
    email
  );
  const text = `You're in!

Gentle Thursday Flow is every Thursday, ${ZOOM_CLASS.time}, starting ${ZOOM_CLASS.firstClass}. 40 minutes, all levels.

Join on Zoom (same link every week): ${ZOOM_JOIN_URL}

The calendar invite is attached. I'll also email you a reminder the morning of class and 30 minutes before.
${donateText()}
See you Thursday,
Maya

Stop these emails: ${unsubscribeUrl(email)}`;
  return {
    subject: "You're in: Gentle Thursday Flow, every Thursday at 8pm ET",
    html,
    text,
  };
}

export function reminderEmail(kind, { name, email }) {
  const first = escapeHtml((name || "").split(" ")[0] || "there");
  const soon = kind === "soon";
  const subject = soon
    ? "Gentle Thursday Flow starts in 30 minutes"
    : "Tonight at 8pm ET: Gentle Thursday Flow";
  const lead = soon
    ? `Hi ${first}, we start in 30 minutes. Grab your mat and a little floor space.`
    : `Hi ${first}, Gentle Thursday Flow is tonight, ${escapeHtml(ZOOM_CLASS.time)}.`;
  const html = layout(
    `<h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;margin:0 0 14px">${soon ? "Starting soon" : "See you tonight"}</h1>
<p style="font-size:15px;line-height:1.6;margin:0 0 18px">${lead}</p>
${button(ZOOM_JOIN_URL, "Join on Zoom")}
${donateHtml()}
<p style="font-size:15px;line-height:1.6;margin:26px 0 0">Maya</p>`,
    email
  );
  const text = `${lead.replace(/<[^>]+>/g, "")}

Join on Zoom: ${ZOOM_JOIN_URL}
${donateText()}
Maya

Stop these emails: ${unsubscribeUrl(email)}`;
  return { subject, html, text };
}

/** Morning-of note to Maya: who's signed up for tonight. */
export function rosterEmail(people, isoDate) {
  const rows = people
    .map((p) => `<li>${escapeHtml(p.name)} &lt;${escapeHtml(p.email)}&gt;${p.heardFrom ? ` · ${escapeHtml(p.heardFrom)}` : ""}</li>`)
    .join("");
  const count = people.length;
  const subject = `Tonight's Gentle Thursday Flow: ${count} signed up`;
  const html = `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#141412;max-width:520px">
<h2 style="font-family:Georgia,serif;font-weight:400">${count} ${count === 1 ? "person is" : "people are"} signed up for tonight (${isoDate}).</h2>
${count ? `<ol style="line-height:1.7">${rows}</ol>` : "<p>No one has signed up yet.</p>"}
<p style="color:#8a8a85;font-size:13px">Everyone on this list gets reminders at 10am and 30 minutes before class.</p>
<p>${button(ZOOM_JOIN_URL, "Start the Zoom")}</p></div>`;
  const text = `${count} signed up for tonight (${isoDate}).\n\n${people.map((p) => `- ${p.name} <${p.email}>`).join("\n") || "No one has signed up yet."}\n\nZoom: ${ZOOM_JOIN_URL}`;
  return { subject, html, text };
}

/** .ics invite: weekly on Thursdays, with reminders 1 day and 30 minutes before. */
export function icsInvite() {
  const day = ZOOM_CLASS.firstDate.replaceAll("-", "");
  const t = (hhmm) => hhmm.replace(":", "") + "00";
  const esc = (s) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const desc = [
    "Gentle Thursday Flow with Maya. 40 minutes on Zoom, all levels.",
    `Join on Zoom: ${ZOOM_JOIN_URL}`,
    ...DONATION_LINKS.map((d) => `Donate (${d.label}): ${d.url}`),
  ].join("\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Motion by Maya//Gentle Thursday Flow//EN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    "TZID:America/New_York",
    "BEGIN:DAYLIGHT",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "DTSTART:19700308T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:-0400",
    "TZOFFSETTO:-0500",
    "TZNAME:EST",
    "DTSTART:19701101T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    "UID:gentle-thursday-flow@motionbymaya.com",
    "DTSTAMP:20261108T000000Z",
    `DTSTART;TZID=America/New_York:${day}T${t(ZOOM_CLASS.start)}`,
    `DTEND;TZID=America/New_York:${day}T${t(ZOOM_CLASS.end)}`,
    "RRULE:FREQ=WEEKLY;BYDAY=TH",
    ...ZOOM_CLASS.skipDates.map(
      (d) => `EXDATE;TZID=America/New_York:${d.replaceAll("-", "")}T${t(ZOOM_CLASS.start)}`
    ),
    "SUMMARY:Gentle Thursday Flow (Zoom yoga with Maya)",
    `DESCRIPTION:${esc(desc)}`,
    `LOCATION:${esc(ZOOM_JOIN_URL)}`,
    `URL:${ZOOM_JOIN_URL}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Gentle Thursday Flow is tomorrow at 8pm",
    "TRIGGER:-P1D",
    "END:VALARM",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Gentle Thursday Flow starts in 30 minutes",
    "TRIGGER:-PT30M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

// ── Sending ───────────────────────────────────────────────────────────

export function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

function toResend({ to, subject, html, text, attachments }, email) {
  return {
    from: mailFrom(),
    to: [to],
    reply_to: REPLY_TO,
    subject,
    html,
    text,
    headers: {
      "List-Unsubscribe": `<${unsubscribeUrl(email)}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
    ...(attachments ? { attachments } : {}),
  };
}

async function resend(path, body) {
  const res = await fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}

/** Plain email to Maya (no unsubscribe link needed). */
export function sendToMaya({ subject, html, text }) {
  return resend("/emails", {
    from: mailFrom(),
    to: [REPLY_TO],
    subject,
    html,
    text,
  });
}

export function sendOne(message, email) {
  return resend("/emails", toResend(message, email));
}

/** Resend's batch endpoint takes up to 100 emails per call (no attachments). */
export async function sendMany(messages) {
  for (let i = 0; i < messages.length; i += 100) {
    await resend(
      "/emails/batch",
      messages.slice(i, i + 100).map((m) => toResend(m, m.to))
    );
  }
}
