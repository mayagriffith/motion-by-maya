import { useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";
import { trackEvent } from "../lib/analytics.js";
import { DONATION_LABEL, DONATION_URL, ZOOM_CLASS, ZOOM_JOIN_URL } from "../config/site.js";

const EMAIL = "motionbymaya@gmail.com";
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;

const ZOOM_META_DESCRIPTION =
  "A gentle 40-minute yoga flow on Zoom every Thursday at 8pm Eastern with Maya Griffith, RYT-200. All levels, no experience needed. Donation-based, so pay what feels right.";

const inputClassName =
  "w-full rounded-2xl bg-[rgb(var(--mbm-bg))]/70 px-4 py-3 text-sm ring-1 ring-[rgb(var(--mbm-line))] transition focus:outline-none focus:ring-2 focus:ring-black/20";

const details = [
  { term: "When", value: `${ZOOM_CLASS.day}, ${ZOOM_CLASS.time}` },
  { term: "First class", value: ZOOM_CLASS.firstClass },
  { term: "Cost", value: `Donation, suggested ${ZOOM_CLASS.suggestedDonation}` },
];

/** Google Calendar "add event" link for the weekly class. */
function addToCalendarUrl() {
  const day = ZOOM_CLASS.firstDate.replaceAll("-", "");
  const t = (hhmm) => hhmm.replace(":", "") + "00";
  const details = [
    "Gentle Thursday Flow with Maya, 40 minutes on Zoom.",
    ZOOM_JOIN_URL ? `Join: ${ZOOM_JOIN_URL}` : "Maya emails the Zoom link before class.",
    DONATION_URL ? `Donations: ${DONATION_URL}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Gentle Thursday Flow (Zoom yoga)",
    dates: `${day}T${t(ZOOM_CLASS.start)}/${day}T${t(ZOOM_CLASS.end)}`,
    ctz: "America/New_York",
    recur: "RRULE:FREQ=WEEKLY;BYDAY=TH",
    details,
    location: ZOOM_JOIN_URL || "Zoom",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function Zoom() {
  return (
    <>
      <PageMeta
        title="Gentle Thursday Flow on Zoom"
        description={ZOOM_META_DESCRIPTION}
        path="/zoom"
        keywords="online yoga class, zoom yoga, donation based yoga, gentle yoga online, evening yoga class"
      />
      <section className="home-hero relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="home-hero-glow home-hero-glow--left" />
          <div className="home-hero-glow home-hero-glow--right" />
          <div className="home-hero-grid" />
        </div>

        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <div className="home-eyebrow">
                <span className="home-eyebrow-line" aria-hidden="true" />
                Weekly on Zoom
              </div>
              <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.92] tracking-tight">
                Gentle Thursday{" "}
                <span className="italic text-[rgb(var(--mbm-accent))]">Flow.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
                A gentle 40-minute class, all levels, from your living room.
                Sign up and you&apos;ll get the Zoom link.
              </p>
              <dl className="mt-8 grid gap-3 border-t border-[rgb(var(--mbm-line))] pt-6">
                {details.map((item) => (
                  <div key={item.term} className="flex gap-4">
                    <dt className="w-24 shrink-0 text-sm text-[rgb(var(--mbm-muted))]">{item.term}</dt>
                    <dd className="text-sm font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div id="signup" className="scroll-mt-24 lg:col-span-6">
              <SignupForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[rgb(var(--mbm-line))]">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "What you need",
                desc: "A mat or a towel, enough floor to lie down, and comfy clothes. A pillow or a couple of books can stand in for blocks.",
              },
              {
                title: "Camera on or off",
                desc: "Your choice. With it on I can offer cues for your body; with it off you can just follow along.",
              },
              {
                title: "New to yoga?",
                desc: "Perfect. Every pose has an easier option, and resting is always allowed. Move within your own limits.",
              },
            ].map((c) => (
              <article
                key={c.title}
                className="home-card rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/45 p-6 sm:p-7"
              >
                <h2 className="text-2xl leading-tight">{c.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--mbm-muted))]">{c.desc}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-[rgb(var(--mbm-muted))]">
            Want one-on-one instead?{" "}
            <NavLink className="underline underline-offset-4 hover:text-black" to="/private">
              Private sessions
            </NavLink>
          </p>
        </Container>
      </section>
    </>
  );
}

function SignupForm() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      setStatus("error");
      setErrorMessage(`Please email ${EMAIL} to sign up.`);
      return;
    }

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "form-name": "thursday-zoom-signup",
          name,
          email,
          heard_from: data.heard_from,
          _subject: `[Thursday Zoom sign-up] ${name}`,
          _replyto: email,
        }),
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(json.error || "Something went wrong. Please try again.");

      setStatus("success");
      trackEvent("sign_up", { method: "thursday-zoom", heard_from: data.heard_from });
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : `Something went wrong. Please email ${EMAIL}.`
      );
    }
  }

  const disabled = status === "submitting";

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-[rgb(var(--mbm-line))] bg-white/60 p-7 shadow-[0_24px_60px_-20px_rgba(20,20,18,0.12)] sm:p-8" role="status">
        <p className="font-serif text-3xl leading-tight">You&apos;re in.</p>
        <p className="mt-3 text-base leading-relaxed text-[rgb(var(--mbm-muted))]">
          {ZOOM_JOIN_URL
            ? `Here's the Zoom link. It's the same every week, so save it. See you ${ZOOM_CLASS.day} at 8.`
            : `I'll email you the Zoom link before class. See you ${ZOOM_CLASS.day} at 8.`}
        </p>
        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
          {ZOOM_JOIN_URL && (
            <Button as="a" href={ZOOM_JOIN_URL} target="_blank" rel="noreferrer">
              Join on Zoom
            </Button>
          )}
          <Button
            as="a"
            href={addToCalendarUrl()}
            target="_blank"
            rel="noreferrer"
            variant={ZOOM_JOIN_URL ? "ghost" : "primary"}
          >
            Add to my calendar
          </Button>
          {DONATION_URL && (
            <Button as="a" href={DONATION_URL} target="_blank" rel="noreferrer" variant="ghost">
              {DONATION_LABEL}
            </Button>
          )}
        </div>
        <button
          type="button"
          className="mt-6 text-sm text-[rgb(var(--mbm-muted))] underline underline-offset-4 hover:text-black"
          onClick={() => setStatus("idle")}
        >
          Sign up someone else
        </button>
      </div>
    );
  }

  return (
    <form
      name="thursday-zoom-signup"
      className="grid gap-4 rounded-3xl border border-[rgb(var(--mbm-line))] bg-white/60 p-7 shadow-[0_24px_60px_-20px_rgba(20,20,18,0.12)] sm:p-8"
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="text-3xl leading-tight">Save your spot</h2>
        <p className="mt-1 text-sm text-[rgb(var(--mbm-muted))]">Takes 10 seconds. Free to sign up.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" placeholder="Your name" required disabled={disabled} />
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required disabled={disabled} />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="heard_from">
          How did you hear about it?
        </label>
        <select
          id="heard_from"
          name="heard_from"
          defaultValue=""
          disabled={disabled}
          className={`${inputClassName} appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235c5c58%22 stroke-width=%222%22 stroke-linecap=%22round%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 text-black/80`}
        >
          <option value="">Choose one (optional)</option>
          <option>Facebook</option>
          <option>Instagram or TikTok</option>
          <option>A friend or family member</option>
          <option>Other</option>
        </select>
      </div>
      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      )}
      <div className="pt-2">
        <Button type="submit" disabled={disabled} className="w-full sm:w-auto">
          {disabled ? "Sending…" : "Sign me up"}
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
