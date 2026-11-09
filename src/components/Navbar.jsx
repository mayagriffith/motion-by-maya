import { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import Container from "./Container.jsx";
import Button from "./Button.jsx";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/classes", label: "Classes" },
  { to: "/private", label: "Private Sessions" },
  { to: "/schedule", label: "Schedule" },
  { to: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    clsx(
      "rounded-full px-3 py-2 text-sm transition-colors",
      "hover:bg-black/5",
      isActive ? "text-black" : "text-[rgb(var(--mbm-muted))]"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-[rgb(var(--mbm-line))] bg-[rgb(var(--mbm-bg))]/85 backdrop-blur">
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="group inline-flex items-baseline gap-2"
          >
            <span className="text-lg font-semibold tracking-tight">
              Motion <span className="font-normal text-black/60">by</span> Maya
            </span>
            <span className="hidden text-xs text-black/45 lg:inline">
              Modern yoga for real life
            </span>
          </NavLink>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            <Button as={NavLink} to="/contact" className="ml-2">
              Contact
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center rounded-full p-2 text-black/70 transition hover:bg-black/5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-90">
              {open ? (
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M5 7H19M5 12H19M5 17H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>

        <div
          className={clsx(
            "md:hidden",
            open ? "pb-4" : "pointer-events-none h-0 overflow-hidden"
          )}
        >
          <div className="grid gap-1 rounded-2xl border border-[rgb(var(--mbm-line))] bg-white/40 p-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/what-to-expect"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              What to Expect
            </NavLink>
            <Button
              as={NavLink}
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 w-full"
            >
              Contact
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
