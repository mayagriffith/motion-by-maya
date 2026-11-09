/** FAQ for /zoom (also published as FAQPage structured data). */
import { ZOOM_CLASS } from "../config/site.js";

const skipped = ZOOM_CLASS.skipDates
  .map((d) => new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric" }))
  .join(" and ");

export const zoomFaq = [
  {
    question: "Do I need yoga experience?",
    answer: "No. It's a gentle, all-levels class, and every pose has an easier option. Resting is always allowed.",
  },
  {
    question: "Is it really free?",
    answer: `It's donation-based: pay what feels right (suggested ${ZOOM_CLASS.suggestedDonation}), or come for free.`,
  },
  {
    question: "What if I'm not in New York?",
    answer: "No problem. It's on Zoom, so you can join from anywhere. It runs at 8pm Eastern, which is 5pm Pacific.",
  },
  {
    question: "Do I have to turn my camera on?",
    answer: "No. Camera on or off is your choice.",
  },
  {
    question: "How do I get the Zoom link?",
    answer: "Sign up on this page. You'll see the link right away, get it by email with a calendar invite, and get reminders the morning of class and 30 minutes before.",
  },
  {
    question: "Are there any weeks off?",
    answer: skipped ? `No class on ${skipped}. Everything else runs every Thursday.` : "It runs every Thursday.",
  },
];
