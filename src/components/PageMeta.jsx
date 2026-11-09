import { useEffect } from "react";

const SITE_NAME = "Motion by Maya";
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://motionbymaya.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/hero.png`;
const JSON_LD_ID = "page-json-ld";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function PageMeta({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  keywords,
  jsonLd,
}) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywords);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [fullTitle, description, url, image, type, keywords]);

  useEffect(() => {
    // The prerendered HTML may already carry this page's JSON-LD (or another
    // page's, after client-side navigation). Always start clean.
    document.getElementById(JSON_LD_ID)?.remove();
    if (!jsonLdString) return undefined;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = JSON_LD_ID;
    script.textContent = jsonLdString;
    document.head.appendChild(script);
    return () => script.remove();
  }, [jsonLdString]);

  return null;
}
