#!/bin/bash
# github-issue-sync.sh
# Pulls GitHub Issues → issues.txt, preserving milestones and IDs

# Set variables
REPO="ericchapman80/choreboard"
OUTPUT_FILE="utilities/data/issues.txt"
TEMP_FILE=$(mktemp)

# Ensure the output directory exists
mkdir -p "$(dirname "$OUTPUT_FILE")"

echo "Fetching issues from GitHub..."

# First, get all issues with their details
gh issue list --repo "$REPO" --state all --limit 1000 --json number,title,body,state,labels,milestone > "$TEMP_FILE"

# Process the JSON and format the output
jq -r '.[] | 
  "---\n" +
  "milestone: " + (if .milestone and .milestone.title then .milestone.title else "Uncategorized" end) + "\n" +
  "id: " + (.body | (if . and contains("ID:") then (split("ID: ")[1] | split("\\n")[0] | rtrimstr(" ")) else "" end)) + "\n" +
  "title: " + .title + "\n" +
  "labels: [" + (.labels | map(.name) | join(", ")) + "]\n" +
  "state: " + .state + "\n" +
  "body: |\n" + (
    (.body // "") as $body |
    (
      if $body | contains("ID:") then
        $body | split("ID: " + ($body | split("ID: ")[1] | split("\\n")[0]) + "\\n\\n")[1] // ""
      else
        $body
      end |
      gsub("\\r\\n"; "\\n") |
      gsub("\\\\n"; "\\n") |
      split("\\n") |
      map(select(. != "")) |
      if length > 0 then
        .[] | "  " + .
      else
        "  (No description provided)"
      end
    ) // "  (No description provided)"
  ) + "\n"
' "$TEMP_FILE" > "$OUTPUT_FILE"

# Clean up
rm -f "$TEMP_FILE"

echo "✅ Issues have been synchronized to $OUTPUT_FILE"
