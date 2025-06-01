#!/bin/bash
# github-issue-sync-debug.sh
# Debug version of the GitHub issue sync script

set -x  # Enable debug mode

# Set variables
REPO="ericchapman80/choreboard"
OUTPUT_FILE="utilities/data/issues.txt"
TEMP_JSON=$(mktemp)
TEMP_OUTPUT=$(mktemp)

# Log function
log() {
    echo "[DEBUG] $(date +'%Y-%m-%d %H:%M:%S') - $1"
}

# Ensure the output directory exists
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Step 1: Check GitHub CLI authentication
log "Checking GitHub CLI authentication..."
if ! gh auth status; then
    log "Error: GitHub CLI not authenticated. Please run 'gh auth login'"
    exit 1
fi

# Step 2: Fetch issues from GitHub
log "Fetching issues from GitHub repository: $REPO"
gh issue list --repo "$REPO" --state all --limit 1000 --json number,title,body,state,labels,milestone > "$TEMP_JSON"

# Check if we got valid JSON
if ! jq empty "$TEMP_JSON" 2>/dev/null; then
    log "Error: Failed to fetch valid JSON from GitHub"
    cat "$TEMP_JSON"
    exit 1
fi

# Count issues from GitHub
ISSUE_COUNT=$(jq '. | length' "$TEMP_JSON")
log "Found $ISSUE_COUNT issues on GitHub"

# Step 3: Process the JSON and format the output
log "Processing issues..."
jq -r '.[] | 
  "---\n" +
  "milestone: " + (if .milestone and .milestone.title then .milestone.title else "Uncategorized" end) + "\n" +
  "id: " + (.number | tostring) + "\n" +
  "title: " + (.title | gsub("\n"; " ")) + "\n" +
  "labels: [" + (.labels | map(.name) | join(", ") + "]\n") +
  "state: " + .state + "\n" +
  "body: |\n    " + (
    (.body // "(No description provided)")
    | gsub("\r\n"; "\n")
    | gsub("\\n"; "\n")
    | split("\n")
    | map(select(. != ""))
    | if length > 0 then .[] else "(No description provided)" end
    | "    " + .
  ) + "\n"
' "$TEMP_JSON" > "$TEMP_OUTPUT"

# Count processed issues
PROCESSED_ISSUES=$(grep -c "^---$" "$TEMP_OUTPUT" || echo "0")
log "Processed $PROCESSED_ISSUES issues"

# Step 4: Create backup and update the file
log "Creating backup of current issues.txt"
cp "$OUTPUT_FILE" "${OUTPUT_FILE}.bak.$(date +%Y%m%d%H%M%S)"

log "Writing $PROCESSED_ISSUES issues to $OUTPUT_FILE"
cp "$TEMP_OUTPUT" "$OUTPUT_FILE"

# Step 5: Clean up
rm -f "$TEMP_JSON" "$TEMP_OUTPUT"

log "✅ Sync completed. $PROCESSED_ISSUES issues synchronized to $OUTPUT_FILE"

# Show a summary
echo "\n=== Sync Summary ==="
echo "GitHub Issues: $ISSUE_COUNT"
echo "Processed Issues: $PROCESSED_ISSUES"
echo "Output File: $OUTPUT_FILE"

# Verify the output
if [ "$ISSUE_COUNT" -ne "$PROCESSED_ISSUES" ]; then
    echo "⚠️  Warning: Issue count mismatch! Check the logs above."
    exit 1
fi

exit 0
