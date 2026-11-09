/**
 * Site-wide switches. Flip these as things become true.
 */

// Liability insurance. Every "insured" claim on the site is gated on this.
// Flip to true once the policy is active.
export const INSURED = false;

// Cal.com booking link, e.g. "motionbymaya/intro" (the part after cal.com/).
// While empty, /private#book shows the "Request a session" form instead.
export const CAL_COM_LINK = "";

// Set to true when group classes are on the calendar again. While false,
// /schedule shows a "between seasons" note pointing to private sessions
// instead of an empty calendar. (The Google Calendar embed can't tell us
// whether it has upcoming events without an API key, so this is manual.)
export const GROUP_CLASSES_IN_SEASON = false;

// Thursday Night Flow on Zoom (donation-based, see /zoom).
export const ZOOM_CLASS = {
  day: "Thursdays",
  time: "7:00 to 7:40pm Eastern",
  firstClass: "Thursday, November 19",
  suggestedDonation: "$10",
};

// Venmo/PayPal/Stripe link for donations. While empty, the page says
// donation details come with the Zoom link.
export const DONATION_URL = "";

export const SITE_URL = import.meta.env?.VITE_SITE_URL || "https://motionbymaya.com";
export const INSTAGRAM_URL = "https://instagram.com/motionbymaya";
export const TIKTOK_URL = "https://tiktok.com/@motionbymaya";
