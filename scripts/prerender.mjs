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
    path: "/about",
    title: `About Maya | ${SITE_NAME}`,
    description:
      "Meet Maya — 200-hour certified yoga teacher offering modern vinyasa and power-inspired classes for athletes, beginners, and active lifestyles.",
  },
  {
    path: "/classes",
    title: `Classes | ${SITE_NAME}`,
    description:
      "Explore vinyasa, power flow, hatha, yoga for athletes, gentle classes, and private yoga sessions with Maya.",
    keywords:
      "power yoga, vinyasa, yoga for runners, mobility, beginner yoga, private yoga NYC",
  },
  {
    path: "/schedule",
    title: `Class Schedule | ${SITE_NAME}`,
    description:
      "View upcoming Motion by Maya yoga classes — online and in NYC / North Jersey. Subscribe to stay updated.",
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
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  );
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
