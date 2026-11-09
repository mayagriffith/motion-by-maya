/**
 * schema.org structured data (JSON-LD) for each page, so Google and AI
 * assistants can read who Maya is, what she offers, and when classes are.
 * Used by PageMeta in the browser and by scripts/prerender.mjs at build time,
 * so the two always match.
 */
import { CREDENTIAL, DONATION_LINKS, SITE_URL, ZOOM_CLASS } from "../config/site.js";
import {
  PRIVATE_META_DESCRIPTION,
  brooklynNeighborhoods,
  manhattanNeighborhoods,
  packages,
  privateFaq,
} from "./privateSessions.js";
import { getPostBySlug } from "./journal/posts.js";
import { eventFaq } from "./events.js";
import { zoomFaq } from "./zoomFaq.js";

const ORG_ID = `${SITE_URL}/#business`;
const PERSON_ID = `${SITE_URL}/#maya`;
const SAME_AS = ["https://instagram.com/motionbymaya", "https://tiktok.com/@motionbymaya"];

const priceNumber = (price) => Number(String(price).replace(/[^0-9.]/g, ""));

function person() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Maya Griffith",
    jobTitle: `Yoga teacher (${CREDENTIAL}, Ulu Yoga)`,
    description:
      "Brooklyn-based yoga teacher offering private 1:1 sessions in person and on Zoom, a weekly donation-based Zoom class, and corporate and group events.",
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/images/about.png`,
    worksFor: { "@id": ORG_ID },
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Vermont" },
    knowsAbout: [
      "Vinyasa yoga",
      "Power yoga",
      "Hatha yoga",
      "Yoga for runners",
      "Yoga for athletes",
      "Mobility",
      "Breathwork",
      "Beginner yoga",
    ],
    sameAs: SAME_AS,
  };
}

function business() {
  return {
    "@type": "HealthAndBeautyBusiness",
    "@id": ORG_ID,
    name: "Motion by Maya",
    description: PRIVATE_META_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/images/hero.png`,
    email: "motionbymaya@gmail.com",
    priceRange: "$$",
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brooklyn",
      addressRegion: "NY",
      addressCountry: "US",
    },
    areaServed: [
      ...brooklynNeighborhoods.map((n) => ({ "@type": "Place", name: `${n}, Brooklyn, NY` })),
      ...manhattanNeighborhoods.map((n) => ({ "@type": "Place", name: `${n}, Manhattan, NY` })),
      { "@type": "VirtualLocation", name: "Online on Zoom (anywhere)" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Private yoga sessions",
      itemListElement: packages.map((p) => ({
        "@type": "Offer",
        name: `Private yoga, ${p.name}`,
        price: priceNumber(p.price),
        priceCurrency: "USD",
        url: `${SITE_URL}/private#packages`,
        itemOffered: {
          "@type": "Service",
          name: "Private 1:1 yoga session (60 minutes, in your home or on Zoom)",
        },
      })),
    },
    sameAs: SAME_AS,
  };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Motion by Maya",
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
  };
}

function thursdayClass() {
  const [h, m] = ZOOM_CLASS.start.split(":");
  return {
    "@type": "Event",
    "@id": `${SITE_URL}/zoom#gentle-thursday-flow`,
    name: "Gentle Thursday Flow",
    description:
      "A gentle 40-minute yoga class on Zoom every Thursday at 8pm Eastern. All levels, no experience needed, donation-based.",
    startDate: `${ZOOM_CLASS.firstDate}T${h}:${m}:00-05:00`,
    endDate: `${ZOOM_CLASS.firstDate}T${ZOOM_CLASS.end}:00-05:00`,
    eventSchedule: {
      "@type": "Schedule",
      repeatFrequency: "P1W",
      byDay: "https://schema.org/Thursday",
      startDate: ZOOM_CLASS.firstDate,
      startTime: `${ZOOM_CLASS.start}:00`,
      endTime: `${ZOOM_CLASS.end}:00`,
      scheduleTimezone: "America/New_York",
      exceptDate: ZOOM_CLASS.skipDates,
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: { "@type": "VirtualLocation", url: `${SITE_URL}/zoom` },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/zoom`,
      description: `Donation-based, suggested ${ZOOM_CLASS.suggestedDonation}${
        DONATION_LINKS.length ? ` (${DONATION_LINKS.map((d) => d.label).join(", ")})` : ""
      }`,
    },
    organizer: { "@id": ORG_ID },
    performer: { "@id": PERSON_ID },
    image: `${SITE_URL}/images/blog/covers/gentle-thursday-flow.jpg`,
  };
}

function faqPage(path, items) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

function eventsService() {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/events#service`,
    name: "Corporate, party and group yoga",
    serviceType: "Group yoga classes for corporate teams, bachelorettes, birthdays and private groups",
    description:
      "Yoga sessions planned around your group, in offices, homes, rentals and parks in Brooklyn and Manhattan, or on Zoom.",
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "City", name: "Brooklyn, NY" },
      { "@type": "City", name: "Manhattan, NY" },
      { "@type": "VirtualLocation", name: "Online on Zoom" },
    ],
    url: `${SITE_URL}/events`,
  };
}

function blogPosting(post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.date,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: url,
    ...(post.coverImage ? { image: `${SITE_URL}${post.coverImage}` } : {}),
    keywords: post.tags.join(", "),
  };
}

/** Structured data for a path ("/", "/private", "/blog/slug", …), or null. */
export function jsonLdForPath(path) {
  const clean = path.replace(/\/+$/, "") || "/";
  const graph = [website(), business(), person()];

  if (clean === "/private") graph.push(faqPage("/private", privateFaq));
  if (clean === "/zoom") graph.push(thursdayClass(), faqPage("/zoom", zoomFaq));
  if (clean === "/classes") graph.push(thursdayClass());
  if (clean === "/events") graph.push(eventsService(), faqPage("/events", eventFaq));
  if (clean.startsWith("/blog/")) {
    const post = getPostBySlug(clean.slice("/blog/".length));
    if (post) graph.push(blogPosting(post));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
