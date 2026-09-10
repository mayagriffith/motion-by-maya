import { useState } from "react";
import clsx from "clsx";
import Button from "./Button.jsx";
import { hasNewsletterProvider, subscribeToNewsletter } from "../lib/newsletter.js";
import { trackEvent } from "../lib/analytics.js";

const inputClassName =
  "w-full rounded-2xl bg-white/70 px-4 py-3 text-sm ring-1 ring-[rgb(var(--mbm-line))] transition placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-black/20";

export default function NewsletterSignup({
  variant = "section",
  className,
}) {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isCompact = variant === "footer";

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();

    setStatus("submitting");
    setErrorMessage("");

    try {
      await subscribeToNewsletter({ name, email });
      setStatus("success");
      trackEvent("sign_up", { method: "newsletter" });
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className={clsx(
          "rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/50 p-6 sm:p-8",
          className
        )}
        role="status"
      >
        <p className="font-serif text-2xl leading-tight">You&apos;re on the list.</p>
        <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--mbm-muted))]">
          Thanks for signing up for class updates and new posts.
        </p>
        {!isCompact && (
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 text-sm text-black/60 underline hover:text-black"
          >
            Back to signup
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {!isCompact && (
        <div className="max-w-xl">
          <div className="home-eyebrow">
            <span className="home-eyebrow-line" aria-hidden="true" />
            Stay Connected
          </div>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
            Join the Motion List
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
            Get occasional emails about upcoming classes and new blog posts.
          </p>
        </div>
      )}

      {isCompact && (
        <div>
          <p className="text-sm font-medium">Join the Motion List</p>
          <p className="mt-1 text-sm text-[rgb(var(--mbm-muted))]">
            Occasional class updates and new posts.
          </p>
        </div>
      )}

      <form
        className={clsx(
          "grid gap-3",
          !isCompact && "mt-8 max-w-xl",
          isCompact && "mt-4",
          isCompact ? "sm:grid-cols-1" : "sm:grid-cols-2"
        )}
        onSubmit={handleSubmit}
      >
        <div className={clsx(!isCompact && "sm:col-span-1")}>
          <label className="sr-only" htmlFor={`newsletter-name-${variant}`}>
            Name
          </label>
          <input
            id={`newsletter-name-${variant}`}
            name="name"
            type="text"
            required
            disabled={status === "submitting"}
            placeholder="Your name"
            className={inputClassName}
          />
        </div>
        <div className={clsx(!isCompact && "sm:col-span-1")}>
          <label className="sr-only" htmlFor={`newsletter-email-${variant}`}>
            Email
          </label>
          <input
            id={`newsletter-email-${variant}`}
            name="email"
            type="email"
            required
            disabled={status === "submitting"}
            placeholder="you@example.com"
            className={inputClassName}
          />
        </div>
        <div className={clsx(!isCompact && "sm:col-span-2")}>
          <Button
            type="submit"
            disabled={status === "submitting" || !hasNewsletterProvider()}
            className={clsx(isCompact && "w-full")}
          >
            {status === "submitting" ? "Joining…" : "Subscribe"}
          </Button>
        </div>
      </form>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      {!hasNewsletterProvider() && status !== "error" && (
        <p className="mt-3 text-xs text-[rgb(var(--mbm-muted))]">
          Email updates aren’t available yet. Please contact Maya for class news.
        </p>
      )}
    </div>
  );
}
