import { NavLink, Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";
import NewsletterSignup from "../components/NewsletterSignup.jsx";
import JournalCard from "../components/JournalCard.jsx";
import { getFeaturedPost } from "../content/journal/posts.js";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Modern Yoga for Real Life"
        description="Power and vinyasa-inspired yoga for runners, lifters, and beginners. Strength, mobility, recovery, and breath-led movement in NYC and online."
        path="/"
        keywords="yoga for runners, mobility, beginner yoga, yoga for strength training, recovery and movement, NYC yoga"
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
              Motion by Maya
            </div>

            <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.92] tracking-tight">
              Modern yoga for{" "}
              <span className="italic text-[rgb(var(--mbm-accent))]">real life.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              Vinyasa and power yoga with Maya. Expect a mix of flowing sequences, strength work, and time to slow down. Beginners are welcome.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as={NavLink} to="/private">
                Book a 1:1 session
              </Button>
              <Button as={NavLink} to="/classes" variant="ghost">
                Explore classes
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[rgb(var(--mbm-line))] pt-8">
              {[
                { value: "All levels", label: "Beginners welcome" },
                { value: "NYC + Online", label: "NYC + online" },
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
      title: "Clear instruction",
      desc: "Follow each movement with clear cues and demonstrations.",
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
      title: "Built for athletes",
      desc: "Work on mobility and balance alongside your training.",
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
      title: "All levels welcome",
      desc: "Choose a variation or take a break when you need one.",
    },
  ];

  return (
    <section className="border-y border-[rgb(var(--mbm-line))] bg-[rgb(var(--mbm-accent-soft))]">
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
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {offerings.map((o) => (
            <article
              key={o.title}
              className="home-card group flex flex-col rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/45 p-6 sm:p-7"
            >
              <span className="home-card-num font-serif text-3xl leading-none text-[rgb(var(--mbm-accent))]/45 transition-colors group-hover:text-[rgb(var(--mbm-accent))]">
                {o.num}
              </span>
              <h3 className="mt-4 text-2xl leading-tight">{o.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[rgb(var(--mbm-muted))]">
                {o.desc}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button as={NavLink} to="/classes">
            View class formats
          </Button>
          <Button as={NavLink} to="/contact" variant="ghost">
            Ask about 1:1
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
                Want to join a class?
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                Check the schedule or contact me about a private session. I can also help you choose a class.
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
                <Button as={NavLink} to="/contact" variant="inverse">
                  Contact Maya
                </Button>
                <Button as={NavLink} to="/classes" variant="inverse-ghost">
                  Browse classes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
