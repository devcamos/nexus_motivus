# Nexus Motivus

Company marketing website for **NEXUS MOTIVUS LTD**.

Calm, static-first App Router site: home, contact (mailto only), and draft legal pages. No database, auth, payments, AI, uploads, or background jobs.

## Stack

- Next.js 16 (App Router) + TypeScript (strict, `noUncheckedIndexedAccess`)
- Tailwind CSS v4 with cream / ink / copper brand tokens
- Vitest + Testing Library (unit) and Playwright (e2e smoke)
- ESLint (`--max-warnings 0`), Prettier, Husky + lint-staged

## Pages

| Route            | Purpose                                 |
| ---------------- | --------------------------------------- |
| `/`              | Mission, what Nexus builds, Contact CTA |
| `/contact`       | Company details + `mailto:`             |
| `/legal/terms`   | Draft terms placeholder                 |
| `/legal/privacy` | Draft privacy placeholder               |
| `/legal/refund`  | Draft refund placeholder                |

Legal pages are intentionally marked **Draft** until formal copy is supplied.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables are required for build or local run.

## Quality scripts

```bash
npm run format:check   # prettier --check .
npm run lint           # eslint . --max-warnings 0
npm run typecheck      # tsc --noEmit
npm run test           # vitest
npm run test:coverage  # vitest + ≥80% thresholds
npm run test:e2e       # Playwright smoke (home, contact, terms)
npm run build          # next build
```

CI runs the same sequence on every push and pull request (plus `npm audit --audit-level=high` and Gitleaks).

## Deploy notes

- Host: Vercel Hobby
- Ship shareable **Preview** deployments first; production promotion is a separate founder GO
- Do **not** attach custom domains or change DNS for `nexusmotivus.ai` from this repo workstream
- Do **not** run production deploys as part of routine PR work

## Company footer

Footer shows `NEXUS MOTIVUS LTD` and United Kingdom. Registered office details are not published on this site.

## Project layout

```
src/app/           App Router pages
src/components/    Header, footer, shared layout pieces
src/lib/           Company constants and helpers
e2e/               Playwright smoke tests
.github/workflows  CI + Dependabot
```
