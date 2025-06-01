#!/bin/bash
# github-issue-autocreate.sh (macOS compatible, robust)
# Pushes issues.txt to GitHub Issues (create/update/close by id)
# - Uses awk for splitting (BSD/macOS compatible)
# - Creates missing labels dynamically
# - Cleans up temp files
# - Works from any directory

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
REPO="ericchapman80/choreboard"
INPUT="$REPO_ROOT/utilities/data/issues.txt"
TMP_DIR="$REPO_ROOT/utilities/tmp_issues"

# Ensure temporary directory exists and is clean
mkdir -p "$TMP_DIR"
rm -f "$TMP_DIR"/issue_* "$TMP_DIR"/labels.txt

# Function to get or create a milestone and return its number
get_or_create_milestone() {
  local title="$1"
  # First try to find existing milestone
  local milestone_number
  milestone_number=$(gh api \
    -X GET \
    repos/$REPO/milestones \
    -f state=all \
    --jq ".[] | select(.title == \"$title\") | .number" 2>/dev/null || true)
  
  if [ -z "$milestone_number" ]; then
    echo "  🚩 Creating missing milestone: $title"
    milestone_number=$(gh api \
      -X POST \
      repos/$REPO/milestones \
      -f title="$title" \
      -f state=open \
      --jq '.number' 2>/dev/null || echo "")
  fi
  
  echo "$milestone_number"
}

# Function to ensure all labels exist
ensure_labels() {
  echo "🔍 Extracting labels and milestones from issues..."
  
  # Extract all unique labels from issues file
  grep '^labels:' "$INPUT" | 
    sed 's/^labels: \[\(.*\)\]/\1/' | 
    tr -d ' ' | 
    tr ',' '\n' | 
    sort -u > "$TMP_DIR/labels.txt"

  # Create each label if it doesn't exist
  while read -r label; do
    if [ -n "$label" ]; then
      echo "  🏷️  Ensuring label exists: $label"
      gh label create "$label" --repo "$REPO" --color "#ededed" --description "$label label" 2>/dev/null || true
    fi
  done < "$TMP_DIR/labels.txt"
  
  # Extract all unique milestones and create them
  echo "🔍 Checking milestones..."
  grep '^milestone:' "$INPUT" | 
    cut -d' ' -f2- | 
    sort -u | 
    while read -r milestone; do
      if [ -n "$milestone" ]; then
        echo "  🎯 Ensuring milestone exists: $milestone"
        get_or_create_milestone "$milestone" > /dev/null || true
      fi
    done
}

# Main script execution
main() {
  # First ensure all labels exist
  ensure_labels

  echo "📂 Splitting issues.txt into individual files..."
  awk -v dir="$TMP_DIR/" 'BEGIN{n=0;file=dir "issue_"n} /^---/{n++;file=dir "issue_"n;next} {print > file}' "$INPUT"

  echo "🚀 Processing issues..."
  local found_any=0
  
  for f in "$TMP_DIR"/issue_*; do
    [ -s "$f" ] || continue  # skip empty files
    
    found_any=1
    
    # Extract issue data with error handling for missing fields
    local id title labels state milestone body
    
    # Get ID (required)
    if ! id=$(grep '^id:' "$f" | cut -d' ' -f2); then
      echo "❌ Missing required 'id' field in issue file: $f"
      continue
    fi
    
    # Get title (required)
    if ! title=$(grep '^title:' "$f" | sed 's/title: //'); then
      echo "❌ Missing required 'title' field in issue: $id"
      continue
    fi
    
    # Get labels (optional)
    labels=$(grep '^labels:' "$f" | sed 's/labels: //;s/\[//;s/\]//;s/,/ /g' 2>/dev/null || true)
    
    # Get state (default to 'open' if not specified)
    state=$(grep '^state:' "$f" | cut -d' ' -f2 2>/dev/null || echo "open")
    
    # Get milestone (optional)
    milestone=$(grep '^milestone:' "$f" | cut -d' ' -f2- 2>/dev/null || true)
    
    # Get body (required)
    if ! body=$(awk '/^body: \|/{flag=1;next}/^$/{flag=0}flag' "$f"); then
      echo "❌ Missing required 'body' field in issue: $id"
      continue
    fi
    
    # Skip if any required fields are empty
    if [ -z "$id" ] || [ -z "$title" ] || [ -z "$body" ]; then
      echo "❌ Missing required fields in issue: $id"
      continue
    fi

    echo "\n🔍 Processing $id: $title"
    echo "   Labels: $labels"
    echo "   State: $state"
    echo "   Milestone: $milestone"

    # Find existing issue by id (in body)
    local issue_number
    if ! issue_number=$(gh issue list --repo "$REPO" --state all --json number,body | 
                  jq -r --arg id "$id" '.[] | select(.body | contains($id)) | .number'); then
      echo "❌ Failed to fetch existing issues from GitHub"
      continue
    fi

    # Prepare label arguments
    local label_args=()
    local add_label_args=()
    
    # Only process labels if they exist
    if [ -n "$labels" ]; then
      for l in $labels; do
        if [ -n "$l" ]; then
          label_args+=(--label "$l")
          add_label_args+=(--add-label "$l")
        fi
      done
    fi
    
    # Ensure arrays are defined even if empty
    : ${label_args=()}
    : ${add_label_args=()}

    # Prepare milestone argument if available
    local milestone_arg=()
    if [ -n "$milestone" ]; then
      # First ensure the milestone exists
      echo "  🎯 Ensuring milestone exists: $milestone"
      get_or_create_milestone "$milestone" > /dev/null
      # Use the milestone title (not number) with GitHub CLI
      milestone_arg=(--milestone "$milestone")
    fi
    
    # Create or update issue
    if [[ -z "$issue_number" ]]; then
      echo "  🆕 Creating new issue..."
      if ! gh issue create \
           --repo "$REPO" \
           --title "$title" \
           --body "ID: $id\n\n$body" \
           "${label_args[@]}" \
           "${milestone_arg[@]}"; then
        echo "❌ Failed to create issue: $title"
        continue
      fi
    else
      echo "  ✏️  Updating existing issue #$issue_number..."
      if ! gh issue edit "$issue_number" \
           --title "$title" \
           --body "ID: $id\n\n$body" \
           "${add_label_args[@]}" \
           "${milestone_arg[@]}"; then
        echo "❌ Failed to update issue: $title"
        continue
      fi
      
      # Update issue state if needed
      if [[ "$state" == "closed" ]]; then
        gh issue close "$issue_number" || true
      elif [[ "$state" == "open" ]]; then
        gh issue reopen "$issue_number" || true
      fi
    fi
    
    echo "✅ Successfully processed $id ($title)"
  done

  # Clean up
  rm -rf "$TMP_DIR"
  
  if [[ $found_any -eq 1 ]]; then
    echo "\n🎉 All issues have been processed successfully!"
  else
    echo "\n⚠️ No issues found to process. Check your issues.txt format."
  fi
}

# Run the main function
main "$@"