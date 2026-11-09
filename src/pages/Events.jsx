import { NavLink } from "react-router-dom";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";
import Accordion from "../components/Accordion.jsx";
import { pages } from "../content/pageMeta.js";
import { EVENT_INQUIRY_URL, eventFaq, eventSteps, eventTypes } from "../content/events.js";

function Eyebrow({ children, className = "" }) {
  return (
    <div className={`home-eyebrow ${className}`}>
      <span className="home-eyebrow-line" aria-hidden="true" />
      {children}
    </div>
  );
}

export default function Events() {
  return (
    <>
      <PageMeta {...pages["/events"]} />

      <section className="home-hero relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="home-hero-glow home-hero-glow--left" />
          <div className="home-hero-glow home-hero-glow--right" />
          <div className="home-hero-grid" />
        </div>
        <Container className="py-14 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Eyebrow>Events &amp; Parties</Eyebrow>
            <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.92] tracking-tight">
              Yoga for your{" "}
              <span className="italic text-[rgb(var(--mbm-accent))]">people.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              Corporate teams, bachelorettes, birthdays and other groups. In
              Brooklyn, Manhattan or on Zoom, planned around your group.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as={NavLink} to={EVENT_INQUIRY_URL}>
                Get a quote
              </Button>
              <Button as="a" href="#how" variant="ghost">
                How it works
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[rgb(var(--mbm-line))]">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            {eventTypes.map((t) => (
              <article
                key={t.title}
                className="home-card flex flex-col rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/45 p-6 sm:p-7"
              >
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--mbm-accent))]">
                  {t.eyebrow}
                </span>
                <h2 className="mt-3 text-2xl leading-tight">{t.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--mbm-muted))]">{t.desc}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="how" className="scroll-mt-20 border-b border-[rgb(var(--mbm-line))] bg-[rgb(var(--mbm-accent-soft))]">
        <Container className="py-16 sm:py-20">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">Easy to plan.</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {eventSteps.map((s, i) => (
              <li key={s.title} className="rounded-[1.75rem] bg-white/70 p-6 ring-1 ring-[rgb(var(--mbm-line))] sm:p-7">
                <span className="font-serif text-3xl leading-none text-[rgb(var(--mbm-accent))]/70">0{i + 1}</span>
                <h3 className="mt-4 text-2xl leading-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--mbm-muted))]">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-[rgb(var(--mbm-line))]">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">Good questions.</h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={eventFaq} />
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <div className="home-cta flex flex-wrap items-center justify-between gap-6 rounded-[2rem] px-8 py-10 text-white sm:px-12">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.02] text-white">Planning something?</h2>
              <p className="mt-3 max-w-lg text-sm text-white/75 sm:text-base">
                Send the date, group size and place. I&apos;ll reply within a day with a quote.
              </p>
            </div>
            <Button as={NavLink} to={EVENT_INQUIRY_URL} variant="inverse">
              Get a quote
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
