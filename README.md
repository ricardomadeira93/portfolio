# ricardomadeira.dev

The source of my portfolio, [ricardomadeira.dev](https://www.ricardomadeira.dev/). It is a single page in English, Portuguese and Spanish that shows what I build and where I have worked.

## What is on the page

- **Header.** Stays at the top while scrolling, with links to the projects and contact sections, a language select and the theme toggle.
- **Hero.** Role, a short summary and three columns: domains, employers and stack.
- **Projects.** Five cards with the key points first, then the technology and a detail list: a geospatial portal for the public administration, Aorus Tale, STARK, Draft and CoderStein Events. Cards link to a live site where one is public.
- **RAG pipeline demo.** An animated walkthrough of query, retrieval, context and generation. It is a simulation: the retrieved passages, scores and timings are prepared data, not a live retrieval system.
- **Contact.** Links to GitHub, LinkedIn and email.

## How it is built

- **Next.js 16** (App Router), **React 19**, **TypeScript** and **Tailwind CSS 4**. The animations are plain CSS.
- **Languages.** English, Portuguese (Portugal) and Spanish, chosen with a select. The choice is remembered in the browser and defaults to the browser language.
- **Theme.** Light and dark through `next-themes`. Switching runs a short wipe from the right edge, built on the View Transitions API (`lib/theme-transition.ts`). It falls back to an instant switch without that API or when the visitor prefers reduced motion.
- **Findability.** `robots.txt`, `sitemap.xml`, an `llms.txt` summary, Person structured data (JSON-LD), a canonical URL and Open Graph tags.
- **Analytics.** Vercel Analytics in production only.

## Running it

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000. `pnpm build` makes a production build and `pnpm lint` runs ESLint.

## Deployment

Pushes to `main` deploy on Vercel to https://www.ricardomadeira.dev/.

## Known limits

- The language is set in the browser, not in the URL, so only one language version is indexable by search engines.
- The RAG demo is simulated, as described above.
