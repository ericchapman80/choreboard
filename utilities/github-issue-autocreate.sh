#!/bin/bash
# github-issue-autocreate.sh
# Description: Automates GitHub issue creation from a structured issues.txt file using GitHub CLI (macOS compatible)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$SCRIPT_DIR"

# Clean up any old splits
rm -f issue_*

echo "Splitting issues.txt into individual files..."
csplit -f issue_ "$REPO_ROOT/issues.txt" '/^---$/' '{*}' >/dev/null

echo "Creating issues using GitHub CLI..."
for f in issue_*; do
  title=$(grep '^title:' "$f" | sed 's/title: //')
  body=$(sed -n '/^body:/,$p' "$f" | sed '1d')
  if [[ -n "$title" && -n "$body" ]]; then
    gh issue create --title "$title" --body "$body"
  else
    echo "⚠️ Skipped $f — missing title or body."
  fi
done

echo "✅ Done! Issues have been created in your repository."