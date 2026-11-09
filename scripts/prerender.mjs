/**
 * Post-build prerender: writes a static index.html per route with that
 * page's title, description, and Open Graph tags, so social crawlers
 * (which don't run JS) get correct share cards for every page.
 *
 * Runs automatically after `npm run build` (see the postbuild script).
 * Netlify serves these static files ahead of the /* SPA fallback.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { posts } from "../src/content/journal/posts.js";
import {
  PRIVATE_META_DESCRIPTION,
  buildPrivateJsonLd,
} from "../src/content/privateSessions.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = process.env.VITE_SITE_URL || "https://motionbymaya.com";
const SITE_NAME = "Motion by Maya";
const DEFAULT_IMAGE = `${SITE_URL}/images/hero.png`;

const routes = [
  {
    path: "/",
    title: "Motion by Maya | Modern Yoga for Real Life",
    description:
      "Power and vinyasa-inspired yoga for runners, lifters, and beginners. Strength, mobility, recovery, and breath-led movement in NYC and online.",
    keywords:
      "yoga for runners, mobility, beginner yoga, yoga for strength training, recovery and movement, NYC yoga",
  },
  {
    path: "/private",
    title: `Private Yoga Sessions in Brooklyn & Manhattan | ${SITE_NAME}`,
    description: PRIVATE_META_DESCRIPTION,
    keywords:
      "private yoga instructor brooklyn, in-home yoga park slope, private yoga brooklyn heights, private yoga nyc, yoga for runners brooklyn",
    jsonLd: buildPrivateJsonLd(SITE_URL),
  },
  {
    path: "/zoom",
    title: `Thursday Night Flow on Zoom | ${SITE_NAME}`,
    description:
      "A gentle 40-minute yoga flow on Zoom every Thursday at 8pm Eastern with Maya Griffith, RYT-200. All levels, no experience needed. Donation-based, so pay what feels right.",
    keywords:
      "online yoga class, zoom yoga, donation based yoga, gentle yoga online, evening yoga class",
  },
  {
    path: "/about",
    title: `About Maya | ${SITE_NAME}`,
    description:
      "Meet Maya Griffith, RYT-200 (Ulu Yoga), a Brooklyn yoga teacher offering private 1:1 sessions and vinyasa, power, and breath-led classes for athletes, beginners, and busy people.",
  },
  {
    path: "/classes",
    title: `Classes | ${SITE_NAME}`,
    description:
      "Explore vinyasa, power flow, hatha, yoga for athletes, gentle classes, and private yoga sessions with Maya.",
    keywords:
      "power yoga, vinyasa, yoga for runners, mobility, beginner yoga, private yoga brooklyn, private yoga NYC",
  },
  {
    path: "/schedule",
    title: `Class Schedule | ${SITE_NAME}`,
    description:
      "Upcoming Motion by Maya group yoga classes in Brooklyn, Manhattan, and online. Subscribe to the calendar, or book a private session any week.",
  },
  {
    path: "/what-to-expect",
    title: `What to Expect | ${SITE_NAME}`,
    description:
      "New to yoga? Learn what to wear, what class feels like, beginner modifications, and why all levels are welcome at Motion by Maya.",
    keywords:
      "beginner yoga, what to expect yoga class, first yoga class, yoga for beginners NYC",
  },
  {
    path: "/contact",
    title: `Contact | ${SITE_NAME}`,
    description:
      "Get in touch with Maya about classes, private sessions, collaborations, and booking.",
  },
  {
    path: "/blog",
    title: `Blog | ${SITE_NAME}`,
    description: "Posts from Maya about yoga, teaching, and current projects.",
    keywords:
      "yoga for strength training, mobility, recovery and movement, beginner yoga",
  },
  ...posts
    .filter((post) => !post.archived)
    .map((post) => ({
      path: `/blog/${post.slug}`,
      title: `${post.title} | ${SITE_NAME}`,
      description: post.seoDescription || post.excerpt,
      keywords: post.tags.join(", "),
      image: post.coverImage ? `${SITE_URL}${post.coverImage}` : undefined,
      type: "article",
    })),
];

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function headBlock(route) {
  const url = `${SITE_URL}${route.path === "/" ? "" : route.path}`;
  const image = route.image || DEFAULT_IMAGE;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  const lines = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
  ];
  if (route.keywords) {
    lines.push(`<meta name="keywords" content="${escapeHtml(route.keywords)}" />`);
  }
  lines.push(
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.type || "website"}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  );
  if (route.jsonLd) {
    // Escape "<" so the JSON can never close the script tag early.
    const json = JSON.stringify(route.jsonLd).replace(/</g, "\\u003c");
    lines.push(`<script type="application/ld+json" id="page-json-ld">${json}</script>`);
  }
  return lines.join("\n    ");
}

const template = readFileSync(join(root, "dist", "index.html"), "utf8");

// Strip the tags we regenerate per route from the built template.
const stripped = template
  .replace(/^\s*<title>[\s\S]*?<\/title>\n/m, "")
  .replace(/^\s*<meta\s+name="(description|keywords|twitter:[^"]+)"[\s\S]*?\/>\n/gm, "")
  .replace(/^\s*<meta\s+property="og:[^"]+"[\s\S]*?\/>\n/gm, "");

let count = 0;
for (const route of routes) {
  const html = stripped.replace(
    /<meta charset="UTF-8"\s*\/>/,
    `<meta charset="UTF-8" />\n    ${headBlock(route)}`,
  );
  const outDir = join(root, "dist", ...route.path.split("/").filter(Boolean));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
  count += 1;
}

console.log(`prerender: wrote meta for ${count} routes`);
