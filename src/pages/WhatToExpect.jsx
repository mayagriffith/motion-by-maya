import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import PageMeta from "../components/PageMeta.jsx";
import Accordion from "../components/Accordion.jsx";
import Button from "../components/Button.jsx";

const faqItems = [
  {
    question: "Am I flexible enough?",
    answer:
      "Almost certainly yes — flexibility is not a prerequisite. Classes are designed with options and progressions so you can meet your body where it is today. Most students are working on mobility, not showing off range they already have.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    question: "What do I wear?",
    answer:
      "Wear something you can move comfortably in — leggings or shorts, a fitted top, and layers if you tend to run warm or cool. Nothing fancy required. Most people practice barefoot.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M6 4h12v16H6zM9 8h6M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    question: "What if I am self-conscious?",
    answer:
      "It's normal to feel that way before your first class. The room is focused on breath and movement — not performance. Clear cues, beginner-friendly options, and a calm pace help everyone feel like they belong.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    question: "Is it heated?",
    answer:
      "Classes are not hot yoga. Expect a comfortable room temperature — enough to move freely without overheating. You'll build warmth through movement, not the thermostat.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3c2 3 4 5 4 8a4 4 0 1 1-8 0c0-3 2-5 4-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    question: "Do I need a mat?",
    answer:
      "If you have one, bring it. If not, reach out before class — mats are often available for in-person sessions, and for online classes you'll just need a bit of floor space.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="8" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    question: "What if I've never done yoga before?",
    answer:
      "You're in the right place. Classes include clear language, slower moments to find alignment, and modifications so you're never left guessing. No prior experience needed — just curiosity and willingness to try.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function WhatToExpect() {
  return (
    <>
      <PageMeta
        title="What to Expect"
        description="New to yoga? Learn what to wear, what class feels like, beginner modifications, and why all levels are welcome at Motion by Maya."
        path="/what-to-expect"
        keywords="beginner yoga, what to expect yoga class, first yoga class, yoga for beginners NYC"
      />

      <section className="border-b border-[rgb(var(--mbm-line))]">
        <Container className="py-14 sm:py-20">
          <header className="max-w-3xl">
            <div className="home-eyebrow">
              <span className="home-eyebrow-line" aria-hidden="true" />
              What to Expect
            </div>
            <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.92] tracking-tight">
              Your first class, explained calmly.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              If you&apos;re new to yoga — or returning after a long break — this
              page is for you. No jargon, no pressure, just a clear picture of
              what class actually feels like.
            </p>
          </header>

          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Accordion items={faqItems} />
            </div>

            <aside className="lg:col-span-5">
              <div className="expect-aside lg:sticky lg:top-24">
                <div className="rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/45 p-6 sm:p-7">
                  <h2 className="text-2xl leading-tight">Class pacing</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-base">
                    Classes move with intention — not rush. Expect a mobility-focused
                    warmup, breath-led flow or strength work in the middle, and
                    time to slow down at the end. You&apos;ll always know what
                    you&apos;re doing and why.
                  </p>
                </div>

                <div className="mt-4 rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/25 p-6 sm:p-7">
                  <h2 className="text-2xl leading-tight">Beginner modifications</h2>
                  <ul className="mt-4 grid gap-3 text-sm text-[rgb(var(--mbm-muted))]">
                    <li className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/35" />
                      Blocks and variations offered throughout class
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/35" />
                      Clear cues — no guessing what shape to make
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/35" />
                      Permission to rest whenever you need it
                    </li>
                  </ul>
                </div>

                <div className="mt-4 rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-[rgb(var(--mbm-ink))] p-6 text-[rgb(var(--mbm-bg))] sm:p-7">
                  <p className="font-serif text-2xl leading-tight">
                    All levels are welcome — truly.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    You don&apos;t need to arrive flexible, experienced, or
                    &ldquo;good at yoga.&rdquo; You just need to show up.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button as={Link} to="/schedule" variant="inverse-ghost">
                      View schedule
                    </Button>
                    <Button as={Link} to="/contact" variant="inverse">
                      Ask a question
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
