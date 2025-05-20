# GitHub Copilot Instructions

This document provides guidance for GitHub Copilot when working with this Next.js application that explains complex topics in simple terms.

## Agent Interaction Guidelines

Please refer to `.github/agent-preferences.md` for detailed instructions on:
- How to communicate design decisions
- When to wait for user confirmation
- How to handle documentation updates
- Preferred workflow patterns
- Context management requirements

## Project Overview

This is a Next.js application that takes complex topics and explains them in simple terms that a five-year-old could understand. The application features:
- Interactive UI components
- Dynamic routing for topics and subtopics
- Rotating quotes component
- Responsive design with Tailwind CSS

## Key Files and Directories

- `src/app/page.tsx` - Main landing page
- `src/app/topics/[topic]/page.tsx` - Dynamic topic pages
- `src/app/topics/[topic]/[subtopic]/page.tsx` - Dynamic subtopic pages
- `src/components/` - Reusable UI components
- `src/lib/constants/` - Contains topic content and configuration

## Coding Standards

When working with this project:

1. **Linting**:
   - Follow the linting guidelines in `.github/linting.md`
   - Run linting checks before committing
   - Ensure VS Code settings match project requirements

2. **TypeScript**:
   - Use TypeScript for all new files
   - Ensure proper type definitions
   - Avoid using `any` type when possible

3. **Components**:
   - Keep components focused and single-responsibility
   - Use functional components with hooks
   - Implement proper prop types
   - Follow the existing component structure

4. **Styling**:
   - Use Tailwind CSS for styling
   - Follow the existing design system
   - Ensure responsive design

5. **Content**:
   - Keep explanations simple and child-friendly
   - Use analogies when explaining complex topics
   - Break down complex ideas into digestible chunks

6. **File Structure**:
   - Place new topics in the appropriate directory under `src/app/topics`
   - Add new components to `src/components`
   - Keep constants in `src/lib/constants`

## Adding New Topics

When adding new topics:
1. Create a new topic file in `src/app/topics/[topic]`
2. Add topic content to `src/lib/constants/topic-content.ts`
3. Ensure content follows the child-friendly format
4. Include relevant illustrations or examples

## Testing

- Test components for proper rendering
- Verify dynamic routing functionality
- Ensure responsive design works across devices
- Check accessibility features

## Performance Considerations

- Optimize images and assets
- Use proper Next.js features for optimization
- Implement proper loading states
- Consider code splitting when necessary
