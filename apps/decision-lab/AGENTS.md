# Decision Lab working agreement

- This is a standalone application within `apps/decision-lab`. Do not change the repository-root Nexus app as part of a Decision Lab task.
- Use a feature branch and pull request. Do not merge, push application changes to `main`, or promote production without explicit owner approval.
- Run `npm run lint`, `npm run test`, `npm run type-check` and `npm run build` before requesting review.
- Use TypeScript with strict types, React and Tailwind. Keep dependency versions and the lockfile in sync.
- Keep the practice loop explicit: consider, explain, reflect, apply.
- Distinguish authored coaching about a selected approach from an assessment of free-text reasoning. Never imply AI assessment without implementing and identifying it.
- Do not treat completed sessions or self-reported application as proven mastery.
- Preserve progress schema validation, resumable drafts, export and application-specific reset behaviour.
- Do not introduce cloud storage, AI calls or external transmission of reflections without a product decision and accurate user-facing data information.
- In the managed Sites environment, follow its supported preview/browser workflow. DOM tests are not browser layout verification.
