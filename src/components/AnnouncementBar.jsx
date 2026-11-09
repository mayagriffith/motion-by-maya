import { NavLink, useLocation } from "react-router-dom";
import { ZOOM_CLASS } from "../config/site.js";

/** Thin site-wide bar pointing to the Thursday Zoom class sign-up. */
export default function AnnouncementBar() {
  const { pathname } = useLocation();
  if (pathname === "/zoom") return null;

  return (
    <NavLink
      to="/zoom"
      className="block bg-[rgb(var(--mbm-accent))] px-4 py-2.5 text-center text-sm text-white transition hover:bg-[rgb(var(--mbm-accent))]/90"
    >
      <span className="font-medium">Gentle Thursday Flow on Zoom</span>
      <span className="hidden sm:inline"> · {ZOOM_CLASS.day}, {ZOOM_CLASS.time} · donation-based</span>
      <span className="ml-2 underline underline-offset-4">Sign up →</span>
    </NavLink>
  );
}
