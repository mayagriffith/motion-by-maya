import { NavLink, Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";
import NewsletterSignup from "../components/NewsletterSignup.jsx";
import JournalCard from "../components/JournalCard.jsx";
import { getFeaturedPost } from "../content/journal/posts.js";
import { INSURED } from "../config/site.js";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Modern Yoga for Real Life"
        description="Private 1:1 yoga in your home, at your building, or online, plus small group classes in Brooklyn and Manhattan. Strength, mobility, breath, and recovery for beginners, runners, and lifters."
        path="/"
        keywords="private yoga brooklyn, in-home yoga, yoga for runners, beginner yoga, yoga for strength training, brooklyn yoga teacher"
      />
      <Hero />
      <Highlights />
      <Offerings />
      <FeaturedBlog />
      <NewsletterSection />
      <BottomCta />
    </>
  );
}

function Hero() {
  return (
    <section className="home-hero relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="home-hero-glow home-hero-glow--left" />
        <div className="home-hero-glow home-hero-glow--right" />
        <div className="home-hero-grid" />
      </div>

      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="home-eyebrow">
              <span className="home-eyebrow-line" aria-hidden="true" />
              Motion by Maya · Brooklyn
            </div>

            <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.92] tracking-tight">
              Modern yoga for{" "}
              <span className="italic text-black/75">real life.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              Private sessions in your home, at your building, or online, plus small group classes in Brooklyn and Manhattan. Strength, mobility, breath, and time to slow down. Beginners welcome, athletes especially.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as={NavLink} to="/private">
                Book a private session
              </Button>
              <Button as={NavLink} to="/classes" variant="ghost">
                See group classes
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[rgb(var(--mbm-line))] pt-8">
              {[
                { value: "All levels", label: "Beginners welcome" },
                { value: "Brooklyn & Manhattan", label: "In-home, studio or online" },
                { value: "Power & flow", label: "Strength + mobility + recovery" },
              ].map((stat) => (
                <div key={stat.value}>
                  <div className="text-sm font-medium tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-xs text-[rgb(var(--mbm-muted))]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="hero-photo-frame group relative mx-auto max-w-sm lg:mx-0 lg:ml-auto lg:max-w-none">
              <div className="hero-photo-accent" aria-hidden="true" />
              <div className="hero-photo-shell overflow-hidden rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/50 shadow-[0_24px_60px_-20px_rgba(20,20,18,0.18)] ring-1 ring-black/5">
                <img
                  className="hero-photo block aspect-[4/5] w-full object-cover object-[center_70%]"
                  alt="Maya teaching a yoga class"
                  src="/images/hero.png"
                  width={520}
                  height={780}
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="hero-photo-badge">
                <span className="block text-[0.65rem] font-medium uppercase tracking-[0.22em] text-black/45">
                  In class
                </span>
                <span className="mt-1 block font-serif text-lg leading-tight">
                  Move, breathe, repeat
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Highlights() {
  const items = [
    {
      icon: (
        <path
          d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
      title: "Private 1:1",
      desc: "In your home or online · from $130 a session.",
    },
    {
      icon: (
        <path
          d="M4 12h16M12 4v16M7 7l10 10M17 7L7 17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ),
      title: INSURED ? "RYT-200, insured" : "RYT-200 certified",
      desc: "Ulu Yoga trained · Brooklyn-based.",
    },
    {
      icon: (
        <path
          d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
      title: "For real bodies",
      desc: "Runners, lifters, beginners, desk people.",
    },
  ];

  return (
    <section className="border-y border-[rgb(var(--mbm-line))] bg-white/25">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {items.map((item) => (
            <div key={item.title} className="home-highlight flex gap-4">
              <div className="home-highlight-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  {item.icon}
                </svg>
              </div>
              <div>
                <h3 className="text-lg leading-tight">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[rgb(var(--mbm-muted))]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Offerings() {
  const offerings = [
    {
      num: "01",
      title: "Power & Vinyasa Flow",
      desc: "Flow between poses, practice balance, and build strength. I explain the transitions as we go.",
      tags: ["Strength", "Flow", "Mobility"],
    },
    {
      num: "02",
      title: "Slower Movement",
      desc: "Take more time in each pose, explore your range of motion, and finish with rest.",
      tags: ["Balance", "Recovery", "Control"],
    },
    {
      num: "03",
      title: "Yoga for Active Lifestyles",
      desc: "A focus on hips, shoulders, and core stability for people who run, lift, or spend long days sitting.",
      tags: ["Mobility", "Stability", "Recovery"],
    },
    {
      num: "04",
      title: "New to Yoga",
      desc: "Learn the poses with step-by-step instruction and options to adjust them. You don’t need prior yoga experience.",
      tags: ["Accessible", "Supportive", "Intentional"],
    },
  ];

  return (
    <section id="offerings" className="border-b border-[rgb(var(--mbm-line))]">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <div className="home-eyebrow">
            <span className="home-eyebrow-line" aria-hidden="true" />
            Offerings
          </div>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
            Find a class that suits you.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
            <p>
              Choose an active flow, a slower class, or a private session.
            </p>
            <p>
              Each class includes a warmup, guided movement, and time to rest. The pace and focus depend on the format.
            </p>
          </div>
        </div>

        <Link
          to="/private"
          className="group mt-12 block rounded-[1.75rem] bg-[rgb(var(--mbm-ink))] p-7 text-white shadow-[0_24px_60px_-20px_rgba(20,20,18,0.35)] transition-transform duration-300 hover:-translate-y-1 sm:p-9"
        >
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-white/55">
                Private 1:1
              </span>
              <h3 className="mt-3 text-3xl leading-tight sm:text-4xl">
                Yoga that fits your life, in your living room.
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                One-on-one sessions in Brooklyn and Manhattan, at home, in your
                building, or online. Planned around your body and your week.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <div className="font-serif text-2xl">From $130 a session</div>
              <span className="mt-3 inline-flex items-center gap-2 text-sm underline underline-offset-4 group-hover:text-white">
                See packages &amp; book
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {offerings.map((o) => (
            <article
              key={o.title}
              className="home-card group flex flex-col rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/45 p-6 sm:p-7"
            >
              <span className="home-card-num font-serif text-3xl leading-none text-black/15 transition-colors group-hover:text-black/25">
                {o.num}
              </span>
              <h3 className="mt-4 text-2xl leading-tight">{o.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[rgb(var(--mbm-muted))]">
                {o.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[rgb(var(--mbm-line))] pt-4">
                {o.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[rgb(var(--mbm-bg))]/70 px-2.5 py-1 text-[11px] text-black/60 ring-1 ring-[rgb(var(--mbm-line))]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button as={NavLink} to="/classes">
            View class formats
          </Button>
          <Button as={NavLink} to="/private" variant="ghost">
            Private sessions
          </Button>
        </div>
      </Container>
    </section>
  );
}

function FeaturedBlog() {
  const featured = getFeaturedPost();
  if (!featured) return null;

  return (
    <section className="border-b border-[rgb(var(--mbm-line))] bg-white/20">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="home-eyebrow">
              <span className="home-eyebrow-line" aria-hidden="true" />
              Blog
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
              Latest from the blog.
            </h2>
          </div>
          <Button as={Link} to={`/blog/${featured.slug}`} variant="ghost">
            Read the article
          </Button>
        </div>
        <div className="mt-10">
          <JournalCard post={featured} featured />
        </div>
      </Container>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section id="newsletter" className="border-b border-[rgb(var(--mbm-line))]">
      <Container className="py-16 sm:py-20">
        <div className="rounded-[2rem] border border-[rgb(var(--mbm-line))] bg-white/40 px-6 py-10 sm:px-10 sm:py-12">
          <NewsletterSignup />
        </div>
      </Container>
    </section>
  );
}

function BottomCta() {
  return (
    <section aria-labelledby="home-cta-heading">
      <Container className="py-16 sm:py-20">
        <div className="home-cta relative overflow-hidden rounded-[2rem] border border-[rgb(var(--mbm-line))] px-8 py-10 sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="home-cta-glow" />
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2
                id="home-cta-heading"
                className="text-[clamp(2rem,4vw,3rem)] leading-[1.02] text-white"
              >
                Ready when you are.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                Book a private session, or come to a group class and see how I teach. Either way, you&apos;ll leave with something to work on and a little more room to breathe.
              </p>
              <p className="mt-3 text-sm text-white/60">
                New here?{" "}
                <NavLink className="underline underline-offset-4 hover:text-white" to="/what-to-expect">
                  See what to expect
                </NavLink>
                .
              </p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <div className="flex flex-wrap gap-3">
                <Button as={NavLink} to="/private" variant="inverse">
                  Book a private session
                </Button>
                <Button as={NavLink} to="/classes" variant="inverse-ghost">
                  Browse classes
                </Button>
              </div>
              <p className="mt-4 text-xs text-white/60">
                Brooklyn &amp; Manhattan · in-home, studio or online
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
