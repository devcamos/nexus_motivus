# Nexus Motivus

Home of the company website for **NEXUS MOTIVUS LTD**, a UK software studio building focused, practical web products.

## Status

- **Company site (in progress):** a calm, static-first marketing site is being built on the [`company-site`](../../tree/company-site) branch ([PR #1](../../pull/1)). Pages: home (mission and what Nexus builds), contact (mailto only) and draft legal pages (terms, privacy, refunds). No database, auth, payments or AI.
- **Current `main`:** still holds the earlier *Explain to Five* prototype (a Next.js app explaining topics in child-friendly terms). It will be replaced when the company site is merged.

## Company site stack

- Next.js 16 (App Router) + TypeScript (strict)
- Tailwind CSS v4
- Vitest + Testing Library (unit, ≥80% coverage) and Playwright (e2e smoke)
- ESLint (zero warnings), Prettier
- Hosted on Vercel

## Run locally

```bash
npm ci
npm run dev        # http://localhost:3000
```

No environment variables are required.

## Checks

On the `company-site` branch:

```bash
npm run lint
npm run typecheck
npm run test:coverage
npm run test:e2e
npm run build
```

On current `main`: `npm run lint`, `npm run type-check`, `npm run build`.
