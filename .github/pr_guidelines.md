# Pull request guidelines — Nexus Motivus company site

## Before opening a PR

1. Branch from `main` (never push commits to `main`).
2. Run locally: `npm ci`, then `format:check`, `lint`, `typecheck`, `test:coverage`, `build`, and `test:e2e` when UI routes change.
3. Keep the site static-first: no database, auth, Stripe, AI, email backends, uploads, or background jobs unless a separate product brief says otherwise.
4. Do not configure custom domains or production DNS for `nexusmotivus.ai` in PR workstreams.
5. Open PRs as **draft** until CI is green.

## Review focus

- Brand tokens remain cream / ink / copper
- Accessibility: landmarks, focus styles, reduced-motion respect
- Legal pages stay clearly marked draft until formal copy lands
- Coverage thresholds stay at ≥80% (do not lower them)
