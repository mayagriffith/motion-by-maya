import { useState } from "react";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";
import { trackEvent } from "../lib/analytics.js";

const EMAIL = "motionbymaya@gmail.com";
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;

const INQUIRY_TYPES = [
  { value: "private-1-1", label: "Private 1:1 session" },
  { value: "group-class", label: "Group class / booking" },
  { value: "corporate-event", label: "Corporate or private event" },
  { value: "collaboration", label: "Collaboration or partnership" },
  { value: "brand-content", label: "Brand or content opportunity" },
  { value: "workshop-retreat", label: "Workshop or retreat" },
  { value: "media-press", label: "Media or press inquiry" },
  { value: "class-help", label: "Help choosing a class" },
  { value: "general", label: "General question" },
  { value: "other", label: "Other" },
];

const inputClassName =
  "w-full rounded-2xl bg-[rgb(var(--mbm-bg))]/70 px-4 py-3 text-sm ring-1 ring-[rgb(var(--mbm-line))] transition focus:outline-none focus:ring-2 focus:ring-black/20";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!FORMSPREE_ID) {
      setStatus("error");
      setErrorMessage(
        "The contact form is not configured yet. Please email motionbymaya@gmail.com directly."
      );
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name").toString().trim();
    const email = formData.get("email").toString().trim();
    const inquiryValue = formData.get("inquiry").toString();
    const message = formData.get("message").toString().trim();
    const inquiryLabel =
      INQUIRY_TYPES.find((type) => type.value === inquiryValue)?.label ??
      inquiryValue;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          inquiry: inquiryLabel,
          message,
          _subject: `[${inquiryLabel}] New inquiry from ${name}`,
          _replyto: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      trackEvent("generate_lead", { form_name: "contact", inquiry: inquiryLabel });
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email directly."
      );
    }
  }

  return (
    <>
      <PageMeta
        title="Contact"
        description="Get in touch with Maya about classes, private sessions, collaborations, and booking."
        path="/contact"
      />
      <section className="border-b border-[rgb(var(--mbm-line))]">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-black/50">
              Contact
            </p>
            <h1 className="mt-4 text-5xl leading-[0.95] tracking-tight sm:text-6xl">
              Let&apos;s move.
            </h1>
            <p className="mt-5 text-[rgb(var(--mbm-muted))] sm:text-lg">
              Tell me what you&apos;re working on — stress, strength, mobility,
              running, recovery — and I&apos;ll recommend the best next step.
            </p>

            <div className="mt-8 rounded-3xl border border-[rgb(var(--mbm-line))] bg-white/30 p-6">
              <div className="text-sm font-medium">Direct</div>
              <div className="mt-3 grid gap-2 text-sm text-[rgb(var(--mbm-muted))]">
                <div>
                  <span className="text-black/70">Email:</span>{" "}
                  <a className="hover:text-black" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </div>
                <div>
                  <span className="text-black/70">Instagram:</span>{" "}
                  <a
                    className="hover:text-black"
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @motionbymaya
                  </a>
                </div>
                <div>
                  <span className="text-black/70">TikTok:</span>{" "}
                  <a
                    className="hover:text-black"
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @motionbymaya
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[rgb(var(--mbm-line))] bg-white/40 p-7 sm:p-8">
              <h2 className="text-3xl sm:text-4xl">Send a note</h2>
              <p className="mt-2 text-sm text-[rgb(var(--mbm-muted))] sm:text-base">
                Send a message and it&apos;ll land in my inbox. I&apos;ll get
                back to you as soon as I can.
              </p>

              {status === "success" ? (
                <div className="mt-6 rounded-2xl border border-[rgb(var(--mbm-line))] bg-[rgb(var(--mbm-bg))]/70 p-6">
                  <p className="text-base font-medium">Message sent.</p>
                  <p className="mt-2 text-sm text-[rgb(var(--mbm-muted))]">
                    Thanks for reaching out — I&apos;ll reply to your email
                    soon.
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    className="mt-4"
                    onClick={() => setStatus("idle")}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
                  <Field
                    label="Name"
                    name="name"
                    placeholder="Your name"
                    required
                    disabled={status === "submitting"}
                  />

                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    disabled={status === "submitting"}
                  />

                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="inquiry">
                      What is your inquiry about?
                    </label>
                    <select
                      id="inquiry"
                      name="inquiry"
                      required
                      disabled={status === "submitting"}
                      defaultValue=""
                      className={`${inputClassName} appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235c5c58%22 stroke-width=%222%22 stroke-linecap=%22round%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 text-black/80 invalid:text-black/45`}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      disabled={status === "submitting"}
                      placeholder="Tell me what you're looking for — goals, schedule, experience level, anything helpful."
                      className={`${inputClassName} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-700" role="alert">
                      {errorMessage}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button type="submit" disabled={status === "submitting"}>
                      {status === "submitting" ? "Sending…" : "Send message"}
                    </Button>
                    <Button as="a" href="/classes" variant="ghost">
                      Browse classes
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}

function Field({ label, name, type = "text", placeholder, required, disabled }) {
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
        className={inputClassName}
      />
    </div>
  );
}
