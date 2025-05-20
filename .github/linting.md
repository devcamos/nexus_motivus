# Next.js Linting Guidelines

## ESLint Configuration

The project uses ESLint with the following key configurations:

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ]
}
```

## Key Linting Rules

1. **React Rules**
   - No unused variables or imports
   - Proper React Hooks usage
   - No array indexes as keys
   - Proper accessibility attributes

2. **TypeScript Rules**
   - Strict type checking
   - No explicit `any` types
   - Proper interface and type definitions
   - Consistent type assertions

3. **Import Rules**
   - No duplicate imports
   - Proper import ordering
   - No circular dependencies
   - Absolute imports for project files

4. **Next.js Specific**
   - Proper Image component usage
   - Correct Link component implementation
   - Server/client component separation
   - Proper metadata handling

## Running Lint Checks

Run these commands for linting:

```bash
# Regular lint check
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Type checking
npm run type-check
```

## VS Code Integration

Recommended VS Code settings for the project:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Common Issues and Solutions

1. **Import Errors**
   - Use absolute imports from `src/`
   - Maintain proper file extension (.ts, .tsx)
   - Use named exports over default exports

2. **Type Errors**
   - Always define prop types for components
   - Use proper type imports from Next.js
   - Avoid type assertions unless necessary

3. **React Hooks**
   - Follow hooks order (useState, useEffect, custom hooks)
   - Proper dependency arrays in useEffect
   - No hooks in conditions or loops

4. **Component Structure**
   - One component per file
   - PascalCase for component names
   - Proper props destructuring
