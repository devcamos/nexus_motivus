# Decision Lab

A human skills sandbox by Nexus Motivus. Practise judgment and communication through ordinary situations, review your thinking, and choose one action to apply in real life.

## First release

- Eight scenarios across judgment and communication.
- Three defensible starting approaches per scenario, each with authored strengths, risks and next steps.
- A four-step practice flow: consider, explain, reflect, apply.
- Four reflection lenses: reasoning, evidence, consequences, people.
- Confidence recorded before reviewing an approach, without treating confidence as correctness.
- Resumable drafts, completed attempts and self-reported real-life application.
- Retry comparisons with the previous completed attempt.
- Track filters, a progress journal, JSON export and confirmed clearing of local progress.
- Responsive layouts, native radio inputs, labelled fields, reduced-motion support and keyboard focus indicators.

Feedback discusses the selected approach. It does **not** analyse or grade free-text writing, use an AI service, score character, or claim that completing scenarios demonstrates mastery.

## Run and check

Requires Node.js 24 and npm. Dependencies are pinned and committed in `package-lock.json`.

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run test
npm run type-check
npm run build
```

The test suite covers the complete React DOM practice flow, persistence, retry comparison, progress tracking, corrupt data, unavailable storage and deliberate reset confirmation. DOM tests run in JSDOM; they do not verify rendered browser layout.

## Data and architecture

React + TypeScript + Vite + Tailwind CSS. Vite emits a static site into `dist/`. There is no backend, account system or cloud sync in this release.

- `src/scenarios.ts`: scenario content, approaches and reflection lenses.
- `src/model.ts`: versioned progress validation, completion and coaching prompts.
- `src/App.tsx`: navigation, scenario library, progress journal and local persistence.
- `src/Session.tsx`: the four-step practice flow.
- `src/style.css`: Tailwind integration, design tokens and responsive styles.

Reflections, confidence, drafts and actions live in `localStorage` under `nexus-decision-lab-v1`. The app keeps the most recent 1,000 valid completed sessions. Export a copy before changing devices or clearing browser data. JSON export is a backup/readable record; importing that file is not implemented. Application status is self-reported and reversible.

## GitHub and Vercel

This independent app lives at `apps/decision-lab` in `devcamos/nexus_motivus`. It uses its own package manifest, lockfile, build output and Vercel configuration. The existing Nexus application remains the repository-root project.

Create a separate Vercel project named `decision-lab`, connected to this repository:

- Root directory: `apps/decision-lab`
- Framework: Vite
- Node.js: 24.x
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`

Use a preview deployment of the feature branch for review. Application changes go through a pull request. Merge or production promotion requires owner approval after checks pass. The repository includes a path-scoped `Decision Lab checks` workflow with no deployment credentials.

## Verification limits and next release

Automated DOM checks verify the practice flow; actual browser layout still needs review at phone and desktop widths. Coaching is authored, not a semantic assessment of a user's reasoning. Progress is local to a browser and is not synchronised between devices.

Possible later releases: more scenarios, optional cloud sync, import of exported progress, real-life outcome reflection, and the emotional regulation, learning and numeracy tracks. Those tracks are described as future work and are not presented as unlocked features.
