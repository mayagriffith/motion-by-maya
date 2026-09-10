const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;

export function initAnalytics() {
  if (!MEASUREMENT_ID || initialized || typeof window === "undefined") return;

  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag commands use an Arguments object, as in Google's installation snippet.
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function trackPageView(path, title) {
  if (!MEASUREMENT_ID || typeof window.gtag !== "function") return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: `${window.location.origin}${path}`,
  });
}

export function trackEvent(name, params = {}) {
  if (!MEASUREMENT_ID || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
