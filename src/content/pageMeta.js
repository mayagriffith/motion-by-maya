/**
 * Titles, search descriptions and share images for every page, in one place.
 * Used by each page's <PageMeta> and by scripts/prerender.mjs, so the HTML
 * that search engines read and the live page always agree.
 *
 * Keep titles under ~60 characters and descriptions under ~155: Google cuts
 * off anything longer.
 */
import { CREDENTIAL, SITE_URL } from "../config/site.js";

const SHARE = (name) => `${SITE_URL}/images/share/${name}.jpg`;

export const pages = {
  "/": {
    path: "/",
    title: "Private Yoga in Brooklyn & on Zoom | Motion by Maya",
    description:
      "Yoga with Maya Griffith: private sessions at home in Brooklyn or Manhattan or on Zoom, a weekly donation-based Zoom class, and group events.",
    keywords:
      "private yoga brooklyn, yoga teacher brooklyn, online yoga class, zoom yoga, yoga for runners, beginner yoga, corporate yoga nyc",
  },
  "/private": {
    path: "/private",
    title: "Private Yoga in Brooklyn, Manhattan & Zoom | Motion by Maya",
    description:
      "One-on-one yoga with Maya Griffith, in your home in Brooklyn or Manhattan or on Zoom. 60-minute sessions from $130. Free 15-minute intro call.",
    keywords:
      "private yoga instructor brooklyn, in-home yoga park slope, private yoga brooklyn heights, private yoga nyc, private yoga zoom, yoga for runners brooklyn",
    image: SHARE("private"),
  },
  "/zoom": {
    path: "/zoom",
    title: "Donation-Based Zoom Yoga, Thursdays 8pm ET | Motion by Maya",
    description:
      "Gentle Thursday Flow: a 40-minute, all-levels yoga class on Zoom every Thursday at 8pm Eastern with Maya Griffith. Pay what you like.",
    keywords:
      "online yoga class, zoom yoga, donation based yoga, gentle yoga online, evening yoga class, free yoga class online",
    image: SHARE("zoom"),
  },
  "/classes": {
    path: "/classes",
    title: "Yoga Classes & Schedule, Brooklyn & Zoom | Motion by Maya",
    description:
      "The weekly Gentle Thursday Flow on Zoom, vinyasa, power, hatha and yoga for athletes, plus private sessions and events. See the class calendar.",
    keywords:
      "yoga classes brooklyn, online yoga class, zoom yoga, vinyasa, power yoga, yoga for runners, yoga schedule",
    image: SHARE("zoom"),
  },
  "/events": {
    path: "/events",
    title: "Corporate & Party Yoga in NYC and on Zoom | Motion by Maya",
    description:
      "Yoga for corporate teams, birthdays, bachelorettes and other groups in Brooklyn, Manhattan or on Zoom, planned around your group. Get a quote.",
    keywords:
      "corporate yoga nyc, bachelorette yoga nyc, birthday yoga party, office yoga brooklyn, team wellness yoga, private group yoga class",
    image: SHARE("events"),
  },
  "/about": {
    path: "/about",
    title: "About Maya Griffith, Brooklyn Yoga Teacher | Motion by Maya",
    description: `Maya Griffith is a ${CREDENTIAL} yoga teacher (Ulu Yoga) in Brooklyn. Runner, lifter and former dancer teaching clear, practical yoga.`,
    keywords: "yoga teacher brooklyn, maya griffith yoga, ulu yoga teacher, yoga for athletes",
  },
  "/what-to-expect": {
    path: "/what-to-expect",
    title: "What to Expect at Your First Class | Motion by Maya",
    description:
      "New to yoga? What to wear, what a class feels like, beginner modifications, and why all levels are welcome at Motion by Maya.",
    keywords: "beginner yoga, first yoga class, what to expect yoga class, yoga for beginners nyc",
  },
  "/contact": {
    path: "/contact",
    title: "Contact Maya | Motion by Maya",
    description:
      "Ask Maya about private sessions, the Thursday Zoom class, corporate and party events, or collaborations. Replies within a day.",
  },
  "/blog": {
    path: "/blog",
    title: "Yoga Blog | Motion by Maya",
    description:
      "Notes from Maya on private sessions, the Thursday Zoom class, beginner yoga, and teaching.",
    keywords: "yoga blog, beginner yoga, private yoga, online yoga class",
  },
};

export const notFoundMeta = {
  path: "/404",
  title: "Page not found | Motion by Maya",
  description: "That page doesn't exist. Head back to Motion by Maya for private sessions, the Thursday Zoom class and events.",
  noindex: true,
};

/** Meta for a blog post. Long titles drop the "| Motion by Maya" suffix. */
export function postMeta(post) {
  const suffixed = `${post.title} | Motion by Maya`;
  return {
    path: `/blog/${post.slug}`,
    title: suffixed.length <= 62 ? suffixed : post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags.join(", "),
    image: post.coverImage ? `${SITE_URL}${post.coverImage.replace(/\.webp$/, ".jpg")}` : undefined,
    type: "article",
  };
}
