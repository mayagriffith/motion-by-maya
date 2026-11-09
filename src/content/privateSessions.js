import { CREDENTIAL } from "../config/site.js";

/**
 * Content for /private, shared with Contact (neighborhood select) and the
 * prerender script (JSON-LD areaServed).
 */

export const brooklynNeighborhoods = [
  "Park Slope",
  "Prospect Heights",
  "Brooklyn Heights",
  "Cobble Hill",
  "Carroll Gardens",
  "Boerum Hill",
  "DUMBO",
  "Fort Greene",
  "Williamsburg",
  "Bay Ridge",
];

export const manhattanNeighborhoods = [
  "Financial District",
  "Tribeca",
  "SoHo",
  "West Village",
  "Flatiron",
  "Gramercy",
];

export const neighborhoodOptions = [
  ...brooklynNeighborhoods.map((n) => `${n} (Brooklyn)`),
  ...manhattanNeighborhoods.map((n) => `${n} (Manhattan)`),
  "Somewhere else",
  "Zoom only",
];

// TODO(Maya): confirm pricing.
export const packages = [
  {
    id: "single",
    name: "Single",
    price: "$150",
    perSession: null,
    bestFor: "Trying it out",
    includes: ["60-min session", "Props provided"],
    cta: "Book a single",
  },
  {
    id: "starter",
    name: "Starter (5)",
    price: "$700",
    perSession: "$140/session",
    bestFor: "Building a habit",
    includes: [
      "Everything in Single",
      "Personalized home practice (short, written, yours)",
      "Text support between sessions",
    ],
    cta: "Start with 5",
    highlighted: true,
  },
  {
    id: "committed",
    name: "Committed (10)",
    price: "$1,300",
    perSession: "$130/session",
    bestFor: "Real change",
    includes: [
      "Everything in Starter",
      "One free session for a partner or friend",
      "Priority scheduling",
    ],
    cta: "Go for 10",
  },
];

export const PRIVATE_META_DESCRIPTION =
  `Private 1:1 yoga in Brooklyn & Manhattan with Maya Griffith, ${CREDENTIAL}. In-home or Zoom sessions for beginners, runners, lifters, and busy people who want a practice that works. From $130 a session.`;

/** schema.org LocalBusiness for /private. Shared by the page and the prerender script. */
export function buildPrivateJsonLd(siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Motion by Maya",
    description: PRIVATE_META_DESCRIPTION,
    url: `${siteUrl}/private`,
    image: `${siteUrl}/images/hero.png`,
    email: "motionbymaya@gmail.com",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brooklyn",
      addressRegion: "NY",
      addressCountry: "US",
    },
    areaServed: [
      ...brooklynNeighborhoods.map((name) => ({
        "@type": "Place",
        name: `${name}, Brooklyn, NY`,
      })),
      ...manhattanNeighborhoods.map((name) => ({
        "@type": "Place",
        name: `${name}, Manhattan, NY`,
      })),
    ],
    sameAs: ["https://instagram.com/motionbymaya", "https://tiktok.com/@motionbymaya"],
  };
}
