# Motion by Maya

The website for [motionbymaya.com](https://motionbymaya.com) — modern vinyasa and power-inspired yoga taught by Maya, with class info, a live schedule, a blog, and a newsletter signup. Built with React, Vite, Tailwind CSS, and React Router; deployed to Netlify.

## Development

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build into dist/ (then prerenders per-page meta tags)
npm run lint     # eslint
```

## How things are wired

- **Content**: blog posts live in `src/content/journal/posts.js`; page copy lives in the components under `src/pages/`.
- **Forms**: the contact form and newsletter signup post to Formspree (form IDs in `.env`, see `.env.example`).
- **Schedule**: pulls from a public Google Calendar (`VITE_GOOGLE_CALENDAR_ID`).
- **Analytics**: Google Analytics 4 (`VITE_GA_MEASUREMENT_ID`).
- **SEO / sharing**: `scripts/prerender.mjs` runs after each build and writes a static HTML file per route with that page's title, description, and Open Graph tags, so social share cards work for every page of the SPA.
- **Deploys**: Netlify, published from this machine with `netlify deploy --prod` (builds `dist/` per `netlify.toml`).

## Gentle Thursday Flow emails

Sign-ups on `/zoom` go to `netlify/functions/thursday-signup.mjs`, which saves
them in Netlify Blobs and emails the Zoom link with a calendar invite.
`thursday-reminders.mjs` runs every 15 minutes and, on Thursdays, emails
everyone at 10am ET and 30 minutes before class. `thursday-unsubscribe.mjs`
handles the "Stop these emails" link. Class details come from
`src/config/site.js`.

Needs these Netlify environment variables (emails are skipped until all
three are set; sign-ups are still saved):

- `RESEND_API_KEY`: Resend API key with sending access
- `MAIL_FROM`: e.g. `Maya Griffith <hello@motionbymaya.com>`; motionbymaya.com
  must be verified in Resend (DNS records go in Netlify DNS)
- `UNSUBSCRIBE_SECRET`: any long random string
- `SKIP_DATES` (optional): extra Thursdays with no class, on top of `skipDates` in `src/config/site.js`
