import { useState } from "react";
import clsx from "clsx";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";
import Accordion from "../components/Accordion.jsx";
import { trackEvent } from "../lib/analytics.js";
import { CAL_COM_LINK, INSURED, SITE_URL } from "../config/site.js";
import { getRealTestimonials } from "../content/testimonials.js";
import {
  PRIVATE_META_DESCRIPTION,
  brooklynNeighborhoods,
  buildPrivateJsonLd,
  manhattanNeighborhoods,
  neighborhoodOptions,
  packages,
} from "../content/privateSessions.js";

const EMAIL = "motionbymaya@gmail.com";
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;

const inputClassName =
  "w-full rounded-2xl bg-[rgb(var(--mbm-bg))]/70 px-4 py-3 text-sm ring-1 ring-[rgb(var(--mbm-line))] transition focus:outline-none focus:ring-2 focus:ring-black/20";

const selectClassName = `${inputClassName} appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235c5c58%22 stroke-width=%222%22 stroke-linecap=%22round%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 text-black/80`;

const audiences = [
  {
    title: "New to yoga.",
    desc: "You've been meaning to start for years. A private is the no-pressure way in. No room full of people, no guessing what the teacher meant.",
  },
  {
    title: "Runners & lifters.",
    desc: "You train hard and your hips, hamstrings and shoulders are telling you about it. We'll build the mobility and breathing that make the rest of your training better.",
  },
  {
    title: "Busy, stressed, over-scheduled.",
    desc: "You don't have time to get to a studio at 6pm. I come to you, and the hour is actually yours.",
  },
  {
    title: "Working around something.",
    desc: "An old injury, a new baby, a desk-shaped back. We go at your pace with a plan that respects where you are.",
  },
];

const steps = [
  {
    title: "A 15-minute call.",
    desc: "We talk about your goals, your schedule, any injuries, and where you'd like to practice. Free, no commitment.",
  },
  {
    title: "Your first session.",
    desc: "I bring the mat and props. We move, I pay attention, and by the end you'll have a sense of what we're building.",
  },
  {
    title: "A plan that evolves.",
    desc: "Every session is planned for you. I track what we've done and what's next, so progress compounds instead of resetting each week.",
  },
];

const faqItems = [
  {
    question: "Do I need to be flexible, fit, or have done yoga before?",
    answer: "No. The whole point of a private is that we start where you are.",
  },
  {
    question: "What do I need?",
    answer: "Floor space roughly the size of two mats. I bring mats, blocks and straps.",
  },
  {
    question: "How often should I book?",
    answer:
      "Most clients do weekly or every other week. We'll figure out what's realistic for you on the intro call.",
  },
  {
    question: "Do you work with injuries or pregnancy?",
    answer:
      "Yes, within my training. I'll ask about anything relevant up front, and if something's outside my scope I'll say so and point you to the right person.",
  },
  {
    question: "Online: does it actually work?",
    answer:
      "It does, for most people. I use a two-camera setup so I can see alignment, and it's great for travel weeks.",
  },
  ...(INSURED
    ? [
        {
          question: "Are you insured?",
          answer: "Yes, professional and general liability.",
        },
      ]
    : []),
  {
    question: "Can I gift a package?",
    answer: "Yes. Email me and I'll send a gift note.",
  },
];

export default function Private() {
  const [selectedPackage, setSelectedPackage] = useState("");

  return (
    <>
      <PageMeta
        title="Private Yoga Sessions in Brooklyn & Manhattan"
        description={PRIVATE_META_DESCRIPTION}
        path="/private"
        keywords="private yoga instructor brooklyn, in-home yoga park slope, private yoga brooklyn heights, private yoga nyc, yoga for runners brooklyn"
        jsonLd={buildPrivateJsonLd(SITE_URL)}
      />
      <PrivateHero />
      <WhoItsFor />
      <HowItWorks />
      <Packages onChoose={setSelectedPackage} />
      <WhereITeach />
      <Testimonials />
      <Faq />
      <BookSection
        selectedPackage={selectedPackage}
        onPackageChange={setSelectedPackage}
      />
    </>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="home-eyebrow">
      <span className="home-eyebrow-line" aria-hidden="true" />
      {children}
    </div>
  );
}

function PrivateHero() {
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
            <Eyebrow>Private Sessions</Eyebrow>
            <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.92] tracking-tight">
              Yoga that fits your life,{" "}
              <span className="italic text-black/75">in your living room.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              One-on-one sessions in Brooklyn and Manhattan, in your home or
              online. Built around your body, your
              schedule, and what you actually want to work on.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as="a" href="#book">
                Book a session
              </Button>
              <Button as="a" href="#how" variant="ghost">
                How it works
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/50 p-7 shadow-[0_24px_60px_-20px_rgba(20,20,18,0.12)] sm:p-8">
              <div className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-black/45">
                At a glance
              </div>
              <dl className="mt-5 grid gap-5">
                {[
                  { term: "Session", value: "60 minutes, one-on-one" },
                  { term: "Where", value: "Your home or online" },
                  { term: "From", value: "$130 a session in a 10-pack" },
                  { term: "First step", value: "A free 15-minute call" },
                ].map((item) => (
                  <div
                    key={item.term}
                    className="flex items-baseline justify-between gap-6 border-b border-[rgb(var(--mbm-line))] pb-4 last:border-0 last:pb-0"
                  >
                    <dt className="text-sm text-[rgb(var(--mbm-muted))]">{item.term}</dt>
                    <dd className="text-right font-serif text-xl leading-tight">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section className="border-b border-[rgb(var(--mbm-line))]">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <Eyebrow>Who this is for</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
            Made for people who don&apos;t fit a studio schedule.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {audiences.map((a) => (
            <article
              key={a.title}
              className="home-card rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/45 p-6 sm:p-7"
            >
              <h3 className="text-2xl leading-tight">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--mbm-muted))]">
                {a.desc}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-b border-[rgb(var(--mbm-line))] bg-white/20">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
            Three steps, no guesswork.
          </h2>
        </div>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/45 p-6 sm:p-7"
            >
              <span className="font-serif text-3xl leading-none text-black/20">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-2xl leading-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--mbm-muted))]">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Packages({ onChoose }) {
  return (
    <section id="packages" className="scroll-mt-20 border-b border-[rgb(var(--mbm-line))]">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <Eyebrow>Packages</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
            Pick how you want to start.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
            All sessions are 60 minutes. In-home and online are the same rate.
            Packages are good for 6 months. Prices include travel within the
            neighborhoods listed below.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:items-stretch">
          {packages.map((p) => (
            <article
              key={p.id}
              className={clsx(
                "relative flex flex-col rounded-[1.75rem] border p-6 sm:p-7",
                p.highlighted
                  ? "border-transparent bg-[rgb(var(--mbm-ink))] text-white shadow-[0_24px_60px_-20px_rgba(20,20,18,0.35)]"
                  : "home-card border-[rgb(var(--mbm-line))] bg-white/45"
              )}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-[rgb(var(--mbm-bg))] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-black/70 ring-1 ring-[rgb(var(--mbm-line))]">
                  Most popular
                </span>
              )}
              <h3 className="text-2xl leading-tight">{p.name}</h3>
              <p className={clsx("mt-1 text-sm", p.highlighted ? "text-white/65" : "text-[rgb(var(--mbm-muted))]")}>
                Best for: {p.bestFor}
              </p>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-serif text-5xl leading-none">{p.price}</span>
                {p.perSession && (
                  <span className={clsx("text-sm", p.highlighted ? "text-white/65" : "text-[rgb(var(--mbm-muted))]")}>
                    {p.perSession}
                  </span>
                )}
              </div>
              <ul
                className={clsx(
                  "mt-6 grid flex-1 content-start gap-2.5 border-t pt-5 text-sm",
                  p.highlighted ? "border-white/15 text-white/85" : "border-[rgb(var(--mbm-line))] text-[rgb(var(--mbm-muted))]"
                )}
              >
                {p.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className={clsx(
                        "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                        p.highlighted ? "bg-white/50" : "bg-black/35"
                      )}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                as="a"
                href="#book"
                variant={p.highlighted ? "inverse" : "ghost"}
                className="mt-7 w-full"
                onClick={() => {
                  onChoose(p.id);
                  trackEvent("select_item", { item_id: p.id, item_list_name: "private_packages" });
                }}
              >
                {p.cta}
              </Button>
            </article>
          ))}
        </div>

        <p className="mt-6 text-sm italic text-[rgb(var(--mbm-muted))]">
          Duos (two people, one session) +$50. Online sessions available
          anywhere. 24-hour cancellation policy. Payment details come with your booking confirmation.
        </p>
      </Container>
    </section>
  );
}

function WhereITeach() {
  return (
    <section className="border-b border-[rgb(var(--mbm-line))] bg-white/20">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>Where I teach</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
              I come to you.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-2xl leading-tight">Brooklyn</h3>
                <p className="mt-1 text-sm text-[rgb(var(--mbm-muted))]">In-home sessions</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {brooklynNeighborhoods.map((n) => (
                    <NeighborhoodTag key={n}>{n}</NeighborhoodTag>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl leading-tight">Manhattan</h3>
                <p className="mt-1 text-sm text-[rgb(var(--mbm-muted))]">
                  Weekday evenings and weekends
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {manhattanNeighborhoods.map((n) => (
                    <NeighborhoodTag key={n}>{n}</NeighborhoodTag>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 space-y-4 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              <p>Not on the list? Ask. I&apos;m often able to make it work.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function NeighborhoodTag({ children }) {
  return (
    <li className="rounded-full bg-[rgb(var(--mbm-bg))]/70 px-3 py-1.5 text-xs text-black/70 ring-1 ring-[rgb(var(--mbm-line))]">
      {children}
    </li>
  );
}

function Testimonials() {
  const items = getRealTestimonials();
  if (items.length === 0) return null;

  return (
    <section className="border-b border-[rgb(var(--mbm-line))]">
      <Container className="py-16 sm:py-20">
        <Eyebrow>Kind words</Eyebrow>
        <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
          From people I teach.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={`${t.name}-${t.context}`}
              className="flex flex-col rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/45 p-6 sm:p-7"
            >
              <blockquote className="flex-1 font-serif text-xl leading-snug">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-[rgb(var(--mbm-line))] pt-4 text-sm">
                <span className="font-medium">{t.name}</span>
                {t.neighborhood && (
                  <span className="text-[rgb(var(--mbm-muted))]"> · {t.neighborhood}</span>
                )}
                <span className="mt-0.5 block text-xs text-[rgb(var(--mbm-muted))]">
                  {t.context}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Faq() {
  return (
    <section className="border-b border-[rgb(var(--mbm-line))]">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
              Good questions.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqItems} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function BookSection({ selectedPackage, onPackageChange }) {
  return (
    <section id="book" className="scroll-mt-20">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Book</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
              Book your first session.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              {CAL_COM_LINK
                ? "Pick a time below, or request one and I'll reply within a day."
                : "Tell me a little about you and when you're free, and I'll reply within a day."}
            </p>
            <p className="mt-6 text-sm text-[rgb(var(--mbm-muted))]">
              Rather email?{" "}
              <a className="underline underline-offset-4 hover:text-black" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </p>
          </div>

          <div className="lg:col-span-7">
            {CAL_COM_LINK ? (
              <div className="overflow-hidden rounded-3xl border border-[rgb(var(--mbm-line))] bg-white/40">
                <iframe
                  title="Book a private session with Maya"
                  src={`https://cal.com/${CAL_COM_LINK}?embed=true&theme=light`}
                  className="block h-[720px] w-full"
                  loading="lazy"
                />
              </div>
            ) : (
              <RequestForm
                selectedPackage={selectedPackage}
                onPackageChange={onPackageChange}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function RequestForm({ selectedPackage, onPackageChange }) {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!FORMSPREE_ID) {
      setStatus("error");
      setErrorMessage(`Please email ${EMAIL} to book.`);
      return;
    }

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const pkg = packages.find((p) => p.id === data.package);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "form-name": "private-request",
          name,
          email,
          phone: data.phone,
          neighborhood: data.neighborhood,
          format: data.format,
          package: pkg ? `${pkg.name} (${pkg.price})` : "Not sure yet",
          availability: data.availability,
          goals: data.goals,
          _subject: `[Private session request] ${name}${data.neighborhood ? `, ${data.neighborhood}` : ""}`,
          _replyto: email,
        }),
      });

      const json = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      trackEvent("generate_lead", {
        form_name: "private-request",
        package: pkg?.id || "unsure",
        format: data.format,
      });
      form.reset();
      onPackageChange("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : `Something went wrong. Please try again or email ${EMAIL}.`
      );
    }
  }

  const disabled = status === "submitting";

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-[rgb(var(--mbm-line))] bg-white/40 p-7 sm:p-8" role="status">
        <p className="font-serif text-3xl leading-tight">Got it.</p>
        <p className="mt-3 text-base leading-relaxed text-[rgb(var(--mbm-muted))]">
          I&apos;ll reply by email within a day with a couple of times. Talk
          soon. Maya
        </p>
        <Button type="button" variant="ghost" className="mt-6" onClick={() => setStatus("idle")}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      name="private-request"
      className="grid gap-4 rounded-3xl border border-[rgb(var(--mbm-line))] bg-white/40 p-7 sm:p-8"
      onSubmit={handleSubmit}
    >
      <h3 className="text-3xl leading-tight">Request a session</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" placeholder="Your name" required disabled={disabled} />
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required disabled={disabled} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" disabled={disabled} />
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="neighborhood">
            Neighborhood
          </label>
          <select id="neighborhood" name="neighborhood" required defaultValue="" disabled={disabled} className={selectClassName}>
            <option value="" disabled>
              Select one
            </option>
            {neighborhoodOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="package">
            Package
          </label>
          <select
            id="package"
            name="package"
            value={selectedPackage}
            onChange={(e) => onPackageChange(e.target.value)}
            disabled={disabled}
            className={selectClassName}
          >
            <option value="">Not sure yet</option>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}, {p.price}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="grid gap-2">
          <legend className="mb-2 text-sm font-medium">Where</legend>
          <div className="flex flex-wrap gap-2">
            {["In-home", "Online"].map((option, i) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-[rgb(var(--mbm-bg))]/70 px-4 py-2.5 text-sm ring-1 ring-[rgb(var(--mbm-line))] has-[:checked]:bg-black has-[:checked]:text-[rgb(var(--mbm-bg))] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black/40"
              >
                <input
                  type="radio"
                  name="format"
                  value={option}
                  defaultChecked={i === 0}
                  disabled={disabled}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <Field
        label="Preferred days and times"
        name="availability"
        placeholder="e.g. Tuesday or Thursday evenings, Saturday mornings"
        disabled={disabled}
      />

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="goals">
          What would you like to work on?
        </label>
        <textarea
          id="goals"
          name="goals"
          rows={4}
          required
          disabled={disabled}
          placeholder="Goals, experience level, any injuries I should know about."
          className={`${inputClassName} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="pt-2">
        <Button type="submit" disabled={disabled} className="w-full sm:w-auto">
          {disabled ? "Sending…" : "Request a session"}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, name, type = "text", placeholder, required, disabled, autoComplete }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={inputClassName}
      />
    </div>
  );
}
