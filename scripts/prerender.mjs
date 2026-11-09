/**
 * Post-build prerender. For every route it writes a static HTML file with:
 *   - the page's full text, rendered from the React app (so search engines
 *     and AI crawlers that don't run JavaScript can read it),
 *   - title, description, canonical, Open Graph tags,
 *   - schema.org structured data (src/content/structuredData.js).
 * It also writes sitemap.xml.
 *
 * Files are written as /about.html (not /about/index.html) so Netlify serves
 * them at /about with no trailing-slash redirect, matching the canonical URL.
 *
 * Runs after `npm run build` (see the build and postbuild scripts).
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { posts } from "../src/content/journal/posts.js";
import { CREDENTIAL, DONATION_LINKS, SITE_URL, ZOOM_CLASS } from "../src/config/site.js";
import {
  brooklynNeighborhoods,
  manhattanNeighborhoods,
  packages,
  privateFaq,
} from "../src/content/privateSessions.js";
import { jsonLdForPath } from "../src/content/structuredData.js";
import { notFoundMeta, pages, postMeta } from "../src/content/pageMeta.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_NAME = "Motion by Maya";
const DEFAULT_IMAGE = `${SITE_URL}/images/hero.png`;

// Every page, with meta from src/content/pageMeta.js (same source as the app).
const routes = [
  ...Object.values(pages),
  ...posts.filter((post) => !post.archived).map(postMeta),
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
  if (route.noindex) lines.push(`<meta name="robots" content="noindex" />`);
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
  const jsonLd = jsonLdForPath(route.path);
  if (jsonLd) {
    // Escape "<" so the JSON can never close the script tag early.
    const json = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
    lines.push(`<script type="application/ld+json" id="page-json-ld">${json}</script>`);
  }
  return lines.join("\n    ");
}

const dist = join(root, "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");
const { render } = await import(join(root, "dist-ssr", "entry-server.js"));

// Strip the tags we regenerate per route from the built template.
const stripped = template
  .replace(/^\s*<title>[\s\S]*?<\/title>\n/m, "")
  .replace(/^\s*<meta\s+name="(description|keywords|twitter:[^"]+)"[\s\S]*?\/>\n/gm, "")
  .replace(/^\s*<meta\s+property="og:[^"]+"[\s\S]*?\/>\n/gm, "");

let count = 0;
for (const route of routes) {
  const body = render(route.path);
  const html = stripped
    .replace(/<meta charset="UTF-8"\s*\/>/, `<meta charset="UTF-8" />\n    ${headBlock(route)}`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const segments = route.path.split("/").filter(Boolean);
  if (segments.length === 0) {
    writeFileSync(join(dist, "index.html"), html);
  } else {
    // /blog/meet-cue -> dist/blog/meet-cue.html
    const file = join(dist, ...segments) + ".html";
    mkdirSync(dirname(file), { recursive: true });
    // Clear any old /route/index.html from a previous build layout.
    const oldDir = join(dist, ...segments, "index.html");
    if (existsSync(oldDir)) rmSync(oldDir);
    writeFileSync(file, html);
  }
  count += 1;
}

// 404.html: Netlify serves it (with a real 404 status) for unknown URLs.
{
  const body = render("/this-page-does-not-exist");
  const html = stripped
    .replace(/<meta charset="UTF-8"\s*\/>/, `<meta charset="UTF-8" />\n    ${headBlock(notFoundMeta)}`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  writeFileSync(join(dist, "404.html"), html);
}

// sitemap.xml, generated from the same route list so it never goes stale.
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => `  <url><loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n")}
</urlset>
`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);

// llms.txt: a plain-language summary for AI assistants (llmstxt.org).
const llms = `# Motion by Maya

> Yoga with Maya Griffith, a ${CREDENTIAL} yoga teacher (Ulu Yoga) based in Brooklyn, New York. Private 1:1 sessions in person in Brooklyn and Manhattan or on Zoom, a weekly donation-based Zoom class, and corporate and group events. Beginners, runners, lifters and busy people welcome.

## Private 1:1 sessions
- 60 minutes, in your home (Brooklyn or Manhattan) or on Zoom. In-home and Zoom are the same price.
${packages.map((p) => `- ${p.name}: ${p.price}${p.perSession ? ` (${p.perSession})` : ""}. Best for: ${p.bestFor.toLowerCase()}.`).join("\n")}
- Duos (two people, one session): +$50. 24-hour cancellation policy. Packages are good for 6 months.
- First step is a free 15-minute call. Book or request a session: ${SITE_URL}/private
- In-person neighborhoods. Brooklyn: ${brooklynNeighborhoods.join(", ")}. Manhattan: ${manhattanNeighborhoods.join(", ")}.

## Gentle Thursday Flow (weekly class on Zoom)
- ${ZOOM_CLASS.day}, ${ZOOM_CLASS.time}. 40 minutes, all levels, no experience needed.
- Donation-based, suggested ${ZOOM_CLASS.suggestedDonation}${DONATION_LINKS.length ? ` (${DONATION_LINKS.map((d) => d.label).join(", ")})` : ""}.
- Sign up for the Zoom link and reminders: ${SITE_URL}/zoom

## Events and parties
- Corporate yoga, birthday parties, bachelorette parties and other groups, in person or on Zoom. Details and quotes: ${SITE_URL}/events

## Class styles
- Vinyasa, power flow, hatha, yoga for athletes and runners, mobility and recovery, breathwork. See ${SITE_URL}/classes

## FAQ
${privateFaq.map((q) => `- ${q.question} ${q.answer}`).join("\n")}

## Contact
- Email: motionbymaya@gmail.com
- Instagram and TikTok: @motionbymaya

## Pages
${routes.map((r) => `- [${r.title.replace(/ \| Motion by Maya$/, "")}](${SITE_URL}${r.path === "/" ? "/" : r.path}): ${r.description}`).join("\n")}
`;
writeFileSync(join(dist, "llms.txt"), llms);

console.log(`prerender: wrote ${count} pages with content, meta and structured data, plus sitemap.xml and llms.txt`);
