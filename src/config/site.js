/**
 * Site-wide switches. Flip these as things become true.
 */

// Liability insurance. Every "insured" claim on the site is gated on this.
// Flip to true once the policy is active.
export const INSURED = false;

// Cal.com booking link, e.g. "motionbymaya/intro" (the part after cal.com/).
// While empty, /private#book shows the "Request a session" form instead.
export const CAL_COM_LINK = "";

// Gentle Thursday Flow on Zoom (donation-based, see /zoom).
export const ZOOM_CLASS = {
  day: "Thursdays",
  time: "8:00 to 8:40pm Eastern",
  firstClass: "Thursday, November 12",
  suggestedDonation: "$10",
  // Used for the "Add to my calendar" link (Eastern time, 24h).
  firstDate: "2026-11-12",
  start: "20:00",
  end: "20:40",
};

// Where donations go, e.g. "https://venmo.com/u/your-handle" or a Stripe
// Payment Link. While empty, no donate button shows; the page says
// donation details come by email.
export const DONATION_URL = "";
// Shown on the button, e.g. "Venmo @your-handle".
export const DONATION_LABEL = "Leave a donation";

// The recurring Zoom meeting's join link (with the passcode built in).
// While set, people see it right after they sign up. While empty, the
// page says "I'll email you the link" and you send it yourself.
export const ZOOM_JOIN_URL = "";

export const SITE_URL = import.meta.env?.VITE_SITE_URL || "https://motionbymaya.com";
export const INSTAGRAM_URL = "https://instagram.com/motionbymaya";
export const TIKTOK_URL = "https://tiktok.com/@motionbymaya";
