# Pull Request Guidelines

## PR Workflow

1. **Branch Naming**
   - Use descriptive, kebab-case names
   - Format: `type/description`
   - Types: `feature`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`
   - Example: `feature/add-science-topics`

2. **Commit Messages**
   - Follow conventional commits
   - Format: `type(scope): description`
   - Example: `feat(topics): add science section with basic physics`

3. **PR Size**
   - Keep PRs focused and small
   - Aim for < 400 lines of code changes
   - Split large features into smaller PRs
   - Each PR should represent one logical change

## Before Creating a PR

1. **Local Testing**
   - Run all tests: `npm test`
   - Run linting: `npm run lint`
   - Check types: `npm run type-check`
   - Test the changes locally

2. **Code Quality**
   - Follow project coding standards
   - Ensure proper TypeScript usage
   - Add/update tests as needed
   - Document new features/changes

3. **Review Your Changes**
   - Self-review the diff
   - Remove debug code
   - Check for sensitive information
   - Verify commit history is clean

## Writing a Good PR Description

1. **Title**
   - Clear and concise
   - Follow conventional commits
   - Include ticket number if applicable

2. **Description**
   - Explain the purpose
   - List main changes
   - Include context for reviewers
   - Link related issues

3. **Screenshots/Videos**
   - Include visual changes
   - Show before/after if applicable
   - Demonstrate new features

4. **Testing Instructions**
   - Clear steps to test
   - Required setup/configuration
   - Expected results

## Review Process

1. **Requesting Reviews**
   - Request at least two reviewers
   - Tag relevant team members
   - Include specific review areas

2. **Responding to Feedback**
   - Address all comments
   - Explain your changes
   - Request re-review when ready

3. **Making Changes**
   - Create new commits for changes
   - Don't force push unless necessary
   - Update the PR description if needed

## Merging

1. **Pre-merge Checklist**
   - All reviews approved
   - CI passes
   - No merge conflicts
   - Up-to-date with base branch

2. **Merge Strategy**
   - Use "Squash and merge"
   - Write a clear squash commit message
   - Delete branch after merging

3. **Post-merge**
   - Monitor deployment
   - Verify changes in staging
   - Update related tickets
   - Clean up local branches

## Child-Friendly Content Guidelines

1. **Content Review**
   - Age-appropriate language
   - Clear explanations
   - Engaging visuals
   - Safe and inclusive content

2. **Interactive Elements**
   - Simple and intuitive
   - Clear feedback
   - Error-friendly
   - Accessible to all abilities

3. **Visual Elements**
   - Appropriate colors
   - Clear typography
   - Engaging graphics
   - Consistent style

## Accessibility Requirements

1. **Technical Requirements**
   - WCAG 2.1 AA compliance
   - Proper ARIA attributes
   - Keyboard navigation
   - Screen reader support

2. **Content Requirements**
   - Alt text for images
   - Descriptive links
   - Clear headings
   - Sufficient contrast

## Performance Expectations

1. **Load Times**
   - Page load < 3s
   - First paint < 1s
   - Interactive < 5s

2. **Resource Usage**
   - Optimized images
   - Efficient code
   - Minimal dependencies
   - Proper caching

## Security Considerations

1. **Code Security**
   - No sensitive data
   - Sanitized inputs
   - Updated dependencies
   - Proper authentication

2. **Content Security**
   - Safe external links
   - Protected user data
   - Appropriate permissions
   - Content moderation
