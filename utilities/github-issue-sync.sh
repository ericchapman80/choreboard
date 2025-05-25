#!/bin/bash
# github-issue-sync.sh
# Description: Synchronizes GitHub issues to utilities/data/issues.txt

# Set variables
REPO="ericchapman80/choreboard"
OUTPUT_FILE="utilities/data/issues.txt"

# Ensure the output directory exists
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Fetch issues from GitHub and format them
gh issue list --repo "$REPO" --state all --limit 1000 --json title,body | jq -r '
  .[] | 
  "title: \(.title)\nbody: |\n  \(.body | gsub("\r\n"; "\n") | split("\n") | map("  " + .) | join("\n"))\n---"
' > "$OUTPUT_FILE"

echo "✅ Issues have been synchronized to $OUTPUT_FILE"

