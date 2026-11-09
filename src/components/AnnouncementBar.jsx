import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ZOOM_CLASS } from "../config/site.js";

const STORAGE_KEY = "mbm-hide-thursday-bar";

function readHidden() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** Thin site-wide bar pointing to the Thursday Zoom class sign-up. Dismissible. */
export default function AnnouncementBar() {
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(readHidden);

  // Netlify serves prerendered pages with a trailing slash ("/zoom/").
  if (hidden || pathname.replace(/\/+$/, "") === "/zoom") return null;

  function dismiss() {
    setHidden(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Private mode or blocked storage: the bar just comes back next visit.
    }
  }

  return (
    <div className="relative bg-[rgb(var(--mbm-accent))] text-white">
      <NavLink
        to="/zoom"
        className="block px-12 py-2.5 text-center text-sm transition hover:bg-black/10"
      >
        <span className="font-medium">Gentle Thursday Flow<span className="hidden sm:inline"> on Zoom</span></span>
        <span className="hidden sm:inline"> · {ZOOM_CLASS.day}, {ZOOM_CLASS.time} · donation-based</span>
        <span className="ml-2 underline underline-offset-4">Sign up →</span>
      </NavLink>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Hide this announcement"
        className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
