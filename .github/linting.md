# Linting and formatting

- ESLint flat config (`eslint.config.mjs`) with `next/core-web-vitals`, TypeScript recommended, Prettier compatibility, and `import/order`.
- `npm run lint` must pass with `--max-warnings 0`.
- Prettier is the formatter; `npm run format:check` is required in CI.
- Husky pre-commit runs lint-staged (Prettier + ESLint on staged files).
