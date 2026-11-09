/**
 * Scheduled every 15 minutes. On Thursdays it emails everyone signed up:
 * at 10:00am ET ("tonight at 8") and 30 minutes before class. A send log in
 * Netlify Blobs makes sure each reminder goes out once per Thursday.
 */
import {
  dueReminder,
  mailConfigured,
  newYorkNow,
  reminderEmail,
  sendLog,
  sendMany,
  signups,
} from "../lib/thursday.mjs";

export default async () => {
  if (!mailConfigured()) return;

  const now = newYorkNow();
  const kind = dueReminder(now);
  if (!kind) return;

  const log = sendLog();
  const key = `${now.isoDate}-${kind}`;
  if (await log.get(key)) return;
  await log.set(key, new Date().toISOString());

  const store = signups();
  const { blobs } = await store.list();
  const people = (
    await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })))
  ).filter((p) => p?.active);

  const messages = people.map((p) => ({ ...reminderEmail(kind, p), to: p.email }));
  await sendMany(messages);
  console.log(`sent ${messages.length} "${kind}" reminders for ${now.isoDate}`);
};

export const config = { schedule: "*/15 * * * *" };
