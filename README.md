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
