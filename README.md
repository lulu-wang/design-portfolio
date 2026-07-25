# Lulu Wang — Portfolio

A minimal product design & development portfolio built with [Next.js](https://nextjs.org), TypeScript, and Tailwind CSS.

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production build locally
- `npm run lint` — run ESLint

## Deploying to Vercel

This repo is configured for [Vercel](https://vercel.com) (see `vercel.json`).

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the GitHub repo.
3. Vercel auto-detects Next.js — keep the defaults and click **Deploy**.

No environment variables are required. Every push to `main` triggers an automatic production deploy; other branches get preview deploys.
