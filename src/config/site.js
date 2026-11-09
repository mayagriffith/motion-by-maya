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

// Ways to donate after the Thursday class. Add one entry per method, e.g.
//   { label: "Venmo @your-handle", url: "https://venmo.com/u/your-handle" },
//   { label: "Card or Apple Pay", url: "https://buy.stripe.com/..." },
// While empty, no donate buttons show.
export const DONATION_LINKS = [];

// The recurring Zoom meeting's join link (with the passcode built in).
// While set, people see it right after they sign up. While empty, the
// page says "I'll email you the link" and you send it yourself.
export const ZOOM_JOIN_URL = "";

export const SITE_URL = import.meta.env?.VITE_SITE_URL || "https://motionbymaya.com";
export const INSTAGRAM_URL = "https://instagram.com/motionbymaya";
export const TIKTOK_URL = "https://tiktok.com/@motionbymaya";
