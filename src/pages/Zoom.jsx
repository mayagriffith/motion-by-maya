import { useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";
import { pages } from "../content/pageMeta.js";
import { trackEvent } from "../lib/analytics.js";
import { DONATION_LINKS, ZOOM_CLASS, ZOOM_JOIN_URL } from "../config/site.js";
import AddToCalendar from "../components/AddToCalendar.jsx";
import Accordion from "../components/Accordion.jsx";
import { zoomFaq } from "../content/zoomFaq.js";

const EMAIL = "motionbymaya@gmail.com";
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;


const inputClassName =
  "w-full rounded-2xl bg-[rgb(var(--mbm-bg))]/70 px-4 py-3 text-sm ring-1 ring-[rgb(var(--mbm-line))] transition focus:outline-none focus:ring-2 focus:ring-black/20";

const details = [
  { term: "When", value: `${ZOOM_CLASS.day}, ${ZOOM_CLASS.time}` },
  { term: "First class", value: ZOOM_CLASS.firstClass },
  { term: "Cost", value: `Donation, suggested ${ZOOM_CLASS.suggestedDonation}` },
];

export default function Zoom() {
  return (
    <>
      <PageMeta {...pages["/zoom"]} />
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
              <AddToCalendar className="mt-6" />
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
          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="home-eyebrow">
                <span className="home-eyebrow-line" aria-hidden="true" />
                FAQ
              </div>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">Good questions.</h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={zoomFaq} />
            </div>
          </div>
          <p className="mt-10 text-sm text-[rgb(var(--mbm-muted))]">
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
  const [emailed, setEmailed] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();

    setStatus("submitting");
    setErrorMessage("");

    try {
      // 1) Our own function: saves the sign-up, emails the Zoom link + invite,
      //    and enrolls them in Thursday reminders.
      const api = fetch("/api/thursday-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, heardFrom: data.heard_from }),
      })
        .then(async (r) =>
          r.ok && (r.headers.get("content-type") || "").includes("json") ? r.json() : null
        )
        .catch(() => null);

      // 2) Formspree: notifies Maya by email, as before.
      const formspree = FORMSPREE_ID
        ? fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
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
          })
            .then((r) => r.ok)
            .catch(() => false)
        : Promise.resolve(false);

      const [apiResult, notified] = await Promise.all([api, formspree]);
      if (!apiResult?.ok && !notified) {
        throw new Error(`Something went wrong. Please try again or email ${EMAIL}.`);
      }

      setEmailed(Boolean(apiResult?.emailed));
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
            ? `Here's the Zoom link. It's the same every week, so save it.${emailed ? " I've also emailed it to you with a calendar invite, and you'll get a reminder before each class." : ""} See you Thursday at 8.`
            : `I'll email you the Zoom link before class. See you Thursday at 8.`}
        </p>
        {ZOOM_JOIN_URL && (
          <Button as="a" href={ZOOM_JOIN_URL} target="_blank" rel="noreferrer" className="mt-6">
            Join on Zoom
          </Button>
        )}
        <p className="mt-6 text-sm font-medium">Get a reminder every Thursday:</p>
        <AddToCalendar className="mt-2" />
        {DONATION_LINKS.length > 0 && (
          <>
            <p className="mt-6 text-sm font-medium">
              Donation-based, suggested {ZOOM_CLASS.suggestedDonation}:
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {DONATION_LINKS.map((d) => (
                <Button key={d.url} as="a" href={d.url} target="_blank" rel="noreferrer" variant="ghost">
                  {d.label}
                </Button>
              ))}
            </div>
          </>
        )}
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
