#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$SCRIPT_DIR"

# Clean up any old splits
rm -f issue_*

echo "Splitting issues.txt into individual files using awk..."

awk -v RS="---" '
  {
    filename = sprintf("issue_%03d", NR)
    print $0 > filename
  }
' "$REPO_ROOT/issues.txt"

echo "Creating issues using GitHub CLI..."
for f in issue_*; do
  title=$(grep '^title:' "$f" | sed 's/title: //')
  body=$(sed -n '/^body:/,$p' "$f" | sed '1d')
  if [[ -n "$title" && -n "$body" ]]; then
    # Detect label from title prefix
    if [[ "$title" == chore:* ]]; then
      label="chore"
    elif [[ "$title" == feat:* ]]; then
      label="enhancement"
    elif [[ "$title" == docs:* ]]; then
      label="documentation"
    elif [[ "$title" == refactor:* ]]; then
      label="refactor"
    else
      label="unlabeled"
    fi

    echo "🔧 Creating issue: $title [$label]"
    gh issue create --title "$title" --body "$body" --label "$label"
  else
    echo "⚠️ Skipped $f — missing title or body."
  fi
done

echo "✅ Done! Issues have been created in your repository."
