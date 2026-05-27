const FORMSPREE_ID = import.meta.env.VITE_NEWSLETTER_FORM_ID;
const CONVERTKIT_ACTION = import.meta.env.VITE_CONVERTKIT_FORM_ACTION;
const MAILCHIMP_URL = import.meta.env.VITE_MAILCHIMP_POST_URL;

export function hasNewsletterProvider() {
  return Boolean(FORMSPREE_ID || CONVERTKIT_ACTION || MAILCHIMP_URL);
}

export async function subscribeToNewsletter({ name, email }) {
  if (CONVERTKIT_ACTION) {
    const body = new URLSearchParams({
      email_address: email,
      "fields[name]": name,
    });

    const response = await fetch(CONVERTKIT_ACTION, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      mode: "no-cors",
    });

    return { ok: true, response };
  }

  if (MAILCHIMP_URL) {
    const body = new URLSearchParams({
      EMAIL: email,
      FNAME: name.split(" ")[0] || name,
      LNAME: name.split(" ").slice(1).join(" ") || "",
    });

    const response = await fetch(MAILCHIMP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      mode: "no-cors",
    });

    return { ok: true, response };
  }

  if (FORMSPREE_ID) {
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        _subject: `Motion List signup: ${name}`,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Subscription failed. Please try again.");
    }

    return { ok: true, data };
  }

  throw new Error(
    "Newsletter signup is not configured yet. Please check back soon."
  );
}
