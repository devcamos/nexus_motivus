#!/bin/bash

# Create and switch to new branch
git checkout -b home_dashboard

# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: improve home dashboard dropdown and button UX

- Restore original placeholder option in dropdown for better UX
- Keep button always visible with dynamic states (enabled/disabled)
- Add screen reader accessibility with sr-only label
- Fix JSX syntax errors and corrupted code structure
- Maintain smooth transitions and hover effects
- Button shows 'Select a topic first' when disabled, 'Start Learning!' when enabled"

echo "Changes committed to home_dashboard branch successfully!"