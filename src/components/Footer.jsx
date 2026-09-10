import { Link } from "react-router-dom";
import Container from "./Container.jsx";
import NewsletterSignup from "./NewsletterSignup.jsx";

const footerLinkClass =
  "w-fit text-black/70 transition hover:text-black hover:underline underline-offset-4";

export default function Footer() {
  return (
    <footer className="site-footer border-t border-[rgb(var(--mbm-line))]">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="text-base font-semibold tracking-tight text-[rgb(var(--mbm-ink))]">
              Motion <span className="font-normal text-black/60">by</span> Maya
            </div>
            <p className="mt-3 text-sm leading-relaxed text-black/65">
              Vinyasa, power yoga, and private classes with Maya.
            </p>
            <p className="mt-4 text-sm text-black/55">
              <a className={footerLinkClass} href="mailto:motionbymaya@gmail.com">
                motionbymaya@gmail.com
              </a>
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="text-sm font-medium text-[rgb(var(--mbm-ink))]">Explore</div>
            <nav className="mt-3 grid gap-2.5 text-sm" aria-label="Footer">
              <Link className={footerLinkClass} to="/#offerings">
                Offerings
              </Link>
              <Link className={footerLinkClass} to="/classes">
                Classes
              </Link>
              <Link className={footerLinkClass} to="/schedule">
                Schedule
              </Link>
              <Link className={footerLinkClass} to="/blog">
                Blog
              </Link>
              <Link className={footerLinkClass} to="/what-to-expect">
                What to Expect
              </Link>
              <Link className={footerLinkClass} to="/contact">
                Contact
              </Link>
            </nav>
          </div>

          <div className="lg:col-span-2">
            <div className="text-sm font-medium text-[rgb(var(--mbm-ink))]">Social</div>
            <div className="mt-3 flex items-center gap-3">
              <a
                className="footer-social inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-[rgb(var(--mbm-line))] text-black/70 transition hover:-translate-y-0.5 hover:bg-white/70 hover:text-black"
                href="https://instagram.com/motionbymaya"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 2H17C20.3137 2 23 4.68629 23 8V16C23 19.3137 20.3137 22 17 22H7C3.68629 22 1 19.3137 1 16V8C1 4.68629 3.68629 2 7 2Z" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M12 16.2C14.3196 16.2 16.2 14.3196 16.2 12C16.2 9.6804 14.3196 7.8 12 7.8C9.6804 7.8 7.8 9.6804 7.8 12C7.8 14.3196 9.6804 16.2 12 16.2Z" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M17.8 6.2H17.81" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
              <a
                className="footer-social inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-[rgb(var(--mbm-line))] text-black/70 transition hover:-translate-y-0.5 hover:bg-white/70 hover:text-black"
                href="https://tiktok.com/@motionbymaya"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M13 3V14.5C13 16.9853 10.9853 19 8.5 19C6.01472 19 4 16.9853 4 14.5C4 12.0147 6.01472 10 8.5 10C9.337 10 10.119 10.2326 10.8 10.6364V7.9C10.0722 7.63638 9.29806 7.5 8.5 7.5C4.91015 7.5 2 10.4101 2 14C2 17.5899 4.91015 20.5 8.5 20.5C12.0899 20.5 15 17.5899 15 14V9.3C16.3553 10.4689 18.0874 11.2 20 11.2V8.9C17.2386 8.9 15 6.66142 15 3.9H13Z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <NewsletterSignup variant="footer" />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[rgb(var(--mbm-line))] pt-6 text-xs text-black/50">
          <p>© {new Date().getFullYear()} Motion by Maya</p>
          <p>Online + NYC / North Jersey</p>
        </div>
      </Container>
    </footer>
  );
}
