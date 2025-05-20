# Explain to Five

A Next.js application that explains complex topics in simple, child-friendly terms.

## Project Overview

This project aims to make complex topics accessible to young minds through:

- Interactive UI components
- Simple, clear explanations
- Visual aids and analogies
- Progressive topic exploration

## Technical Stack

- Next.js 15.3.2 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint + Prettier for code quality

## Development Guidelines

Please review these documents before contributing:

- `.github/copilot.md` - Project structure and coding standards
- `.github/linting.md` - Linting and code style guidelines
- `.github/agent-preferences.md` - AI agent interaction preferences

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Development Workflow

1. Install dependencies:

```bash
npm install
```

2. Set up your editor:

- Install recommended VS Code extensions
- Use provided workspace settings
- Enable format on save

3. Start development server:

```bash
npm run dev
```

4. Quality checks:

```bash
# Lint check
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Type checking
npm run type-check
```

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - Reusable UI components
- `src/lib/` - Utilities and constants
- `.github/` - Project documentation and guidelines

## Contributing

1. Review the documentation in `.github/`
2. Follow the coding standards and linting rules
3. Make sure to update documentation when adding features
4. Test thoroughly before submitting changes
