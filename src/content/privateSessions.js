import { CREDENTIAL, INSURED } from "../config/site.js";

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


/** FAQ shown on /private (and published as FAQPage structured data). */
export const privateFaq = [
  {
    question: "Do I need to be flexible, fit, or have done yoga before?",
    answer: "No. The whole point of a private is that we start where you are.",
  },
  {
    question: "What do I need?",
    answer: "Floor space roughly the size of two mats. I bring mats, blocks and straps.",
  },
  {
    question: "How often should I book?",
    answer:
      "Most clients do weekly or every other week. We'll figure out what's realistic for you on the intro call.",
  },
  {
    question: "Do you work with injuries or pregnancy?",
    answer:
      "Yes, within my training. I'll ask about anything relevant up front, and if something's outside my scope I'll say so and point you to the right person.",
  },
  {
    question: "Zoom: does it actually work?",
    answer:
      "It does, for most people. I use a two-camera setup so I can see alignment, and it's great for travel weeks.",
  },
  ...(INSURED
    ? [
        {
          question: "Are you insured?",
          answer: "Yes, professional and general liability.",
        },
      ]
    : []),
  {
    question: "Do you teach groups and events?",
    answer:
      "Yes: corporate classes, birthday parties, bachelorette parties and other groups, in person or on Zoom. Send me the details through the contact page.",
  },
  {
    question: "Can I gift a package?",
    answer: "Yes. Email me and I'll send a gift note.",
  },
];
