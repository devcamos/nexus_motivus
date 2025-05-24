bash commit_changes.sh#!/bin/bash

# Create and switch to new branch
git checkout -b natural_helpers_impl

# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: implement natural helpers section and fix errors

- Fix syntax errors in ChatPrompt component
- Fix errors in topic and subtopic pages
- Improve back button styling with arrow icon
- Add proper button type attributes for accessibility
- Fix Unicode character display issues
- Ensure consistent styling across the application
- Implement proper error handling for missing topics/subtopics"

echo "Changes committed to natural_helpers_impl branch successfully!"