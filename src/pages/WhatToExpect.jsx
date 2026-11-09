import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import PageMeta from "../components/PageMeta.jsx";
import Accordion from "../components/Accordion.jsx";
import Button from "../components/Button.jsx";

const faqItems = [
  {
    question: "Am I flexible enough?",
    answer:
      "You don’t need to be flexible to start. I offer variations so you can work within a comfortable range.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    question: "What do I wear?",
    answer:
      "Wear comfortable clothes you can move in. Most people practice barefoot. Bring a layer for the rest at the end.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M6 4h12v16H6zM9 8h6M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    question: "What if I am self-conscious?",
    answer:
      "It’s normal to feel unsure in your first class. I explain the movements and offer variations. You can ask questions or take a break at any time.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    question: "Is it heated?",
    answer:
      "These are not hot yoga classes. Check the event details for information about the venue.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3c2 3 4 5 4 8a4 4 0 1 1-8 0c0-3 2-5 4-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    question: "Do I need a mat?",
    answer:
      "Bring a mat if you have one. If you need to borrow one, ask before class. For online classes, set up your mat with enough space to move your arms and legs.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="8" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    question: "What if I've never done yoga before?",
    answer:
      "You can start here. Let me know it’s your first class so I can help you get set up and explain unfamiliar poses.",
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
              Before your first class.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              Here&apos;s what to bring, how class works, and how to adjust the practice.
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
                    We start with a warmup, move into the main poses or sequences, and finish with rest. Power Flow is more active; Hatha and Breathe + Restore move more slowly.
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
                      Rest whenever you need it
                    </li>
                  </ul>
                </div>

                <div className="mt-4 rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-[rgb(var(--mbm-ink))] p-6 text-[rgb(var(--mbm-bg))] sm:p-7">
                  <p className="font-serif text-2xl leading-tight">
                    Beginners are welcome.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    If you&apos;re unsure which class to try, contact me and I&apos;ll help you choose.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button as={Link} to="/classes#schedule" variant="inverse-ghost">
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
