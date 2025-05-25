#!/bin/bash
# github-issue-autocreate.sh
# Description: Automates GitHub issue creation from a structured issues.txt file using GitHub CLI

echo "Splitting issues.txt into individual files..."
csplit --quiet --prefix=issue_ issues.txt "/^---$/" "{*}"

echo "Creating issues using GitHub CLI..."
for f in issue_*; do
  title=$(grep '^title:' "$f" | sed 's/title: //')
  body=$(sed -n '/^body:/,$p' "$f" | sed '1d')
  gh issue create --title "$title" --body "$body"
done

echo "Done! Issues have been created in your repository."
