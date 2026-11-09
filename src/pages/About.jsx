import { NavLink } from "react-router-dom";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";

const focusAreas = [
  "Vinyasa Yoga",
  "Power Yoga",
  "Beginner-Friendly Flow",
  "Mobility & Recovery",
  "Hatha Yoga",
  "Slow Flow + Breathwork",
];

export default function About() {
  return (
    <>
      <PageMeta
        title="About Maya"
        description="Meet Maya — 200-hour certified yoga teacher offering modern vinyasa and power-inspired classes for athletes, beginners, and active lifestyles."
        path="/about"
      />
      <AboutHero />
      <TrainingSection />
      <CueSection />
      <AboutCta />
    </>
  );
}

function AboutHero() {
  return (
    <section className="home-hero relative overflow-hidden border-b border-[rgb(var(--mbm-line))]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="home-hero-glow home-hero-glow--left" />
        <div className="home-hero-glow home-hero-glow--right" />
      </div>

      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-first lg:col-span-5 lg:pt-4">
            <div className="hero-photo-frame group relative mx-auto max-w-sm lg:mx-0 lg:max-w-none">
              <div className="about-photo-accent" aria-hidden="true" />
              <div className="hero-photo-shell overflow-hidden rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/50 shadow-[0_24px_60px_-20px_rgba(20,20,18,0.18)] ring-1 ring-black/5">
                <img
                  className="about-photo block aspect-[3/4] w-full object-cover"
                  alt="Maya in dancer pose at a waterfall"
                  src="/images/about.png"
                  width={669}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:col-span-7">
            <div className="home-eyebrow">
              <span className="home-eyebrow-line" aria-hidden="true" />
              About
            </div>

            <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.92] tracking-tight">
              Meet Maya.
            </h1>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              <p>
                Hi, I&apos;m Maya, a 200-hour certified yoga teacher. I teach vinyasa, power yoga, and slower classes.
              </p>
              <p>
                I&apos;m also an athlete. My classes include strength work, balance, and mobility, with options for different experience levels.
              </p>
              <p>
                I like a class that gives you something to work on and time to slow down.
              </p>
              <p>
                I explain each sequence as we go. You can ask questions, adjust a pose, or rest at any point.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TrainingSection() {
  return (
    <section className="border-b border-[rgb(var(--mbm-line))] bg-white/20">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:pt-2">
            <div className="home-eyebrow">
              <span className="home-eyebrow-line" aria-hidden="true" />
              Training &amp; Teaching
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
              What I teach.
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              I&apos;m a 200-hour certified teacher, and most of my classes
              fall into these areas:
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <li
                  key={area}
                  className="home-card flex items-center gap-3 rounded-2xl border border-[rgb(var(--mbm-line))] bg-white/45 px-5 py-4"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-black/35"
                    aria-hidden="true"
                  />
                  <span className="text-base">{area}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-5 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              <p>
                Classes begin with a warmup and end with time to rest.
              </p>
              <p>
                Between those, we work through poses and sequences at a pace that fits the class.
              </p>
              <p>
                I offer variations so you can adjust the practice to your experience and how you feel that day.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CueSection() {
  return (
    <section className="border-b border-[rgb(var(--mbm-line))]">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:pt-2">
            <div className="home-eyebrow">
              <span className="home-eyebrow-line" aria-hidden="true" />
              Beyond the Mat
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
              I also build Cue.
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-5 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              <p>
                Cue is a class planning app I&apos;m building for yoga and
                movement teachers. You plan a sequence in a visual builder,
                teach from one calm screen with cues, breath counts, and
                timing, and capture what worked in a quick note after class.
              </p>
              <p>
                It grew out of my own teaching — and it&apos;s free to try in
                any browser, or on iPhone and Android.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as="a" href="https://cueyoga.com">
                Explore Cue
              </Button>
              <Button as={NavLink} to="/blog/meet-cue" variant="ghost">
                Read the story behind it
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function AboutCta() {
  return (
    <section>
      <Container className="py-16 sm:py-20">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/40 px-8 py-10 sm:px-10">
          <div>
            <h2 className="text-3xl leading-tight sm:text-4xl">
              Want to practice together?
            </h2>
            <p className="mt-3 max-w-prose text-[rgb(var(--mbm-muted))]">
              Take a look at my classes, or reach out if you&apos;re not sure
              where to start.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button as={NavLink} to="/classes">
              Explore classes
            </Button>
            <Button as={NavLink} to="/contact" variant="ghost">
              Get in touch
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
