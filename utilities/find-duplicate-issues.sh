#!/bin/bash
# find-duplicate-issues.sh
# Identifies potential duplicate GitHub issues based on title similarity

# Set the similarity threshold (0-100, higher means more similar)
SIMILARITY_THRESHOLD=80

# Get all issues and store in a temporary file
get_issues() {
  gh issue list --state all --json number,title,body,state,labels,milestone,createdAt,updatedAt
}

# Calculate similarity between two strings (simple percentage)
calculate_similarity() {
  local str1="$1"
  local str2="$2"
  
  # Convert to lowercase and remove special characters
  str1=$(echo "$str1" | tr '[:upper:]' '[:lower:]' | tr -d '[:punct:]')
  str2=$(echo "$str2" | tr '[:upper:]' '[:lower:]' | tr -d '[:punct:]')
  
  # Use Python for better string similarity calculation
  python3 -c "
from difflib import SequenceMatcher
str1 = '''$str1'''
str2 = '''$str2'''
print(int(SequenceMatcher(None, str1, str2).ratio() * 100))
"
}

# Main script
echo "🔍 Checking for potential duplicate issues..."

# Get all issues
ISSUES_JSON=$(get_issues)
ISSUE_COUNT=$(echo "$ISSUES_JSON" | jq length)
echo "Found $ISSUE_COUNT issues to check..."

# Create a temporary file to store checked issues
TEMP_FILE=$(mktemp)

# Process issues
echo "$ISSUES_JSON" | jq -c '.[]' | while read -r issue1; do
  id1=$(echo "$issue1" | jq -r '.number')
  title1=$(echo "$issue1" | jq -r '.title')
  
  # Skip if we've already checked this issue
  if grep -q "^$id1$" "$TEMP_FILE"; then
    continue
  fi
  
  # Mark this issue as checked
  echo "$id1" >> "$TEMP_FILE"
  
  # Compare with other issues
  echo "$ISSUES_JSON" | jq -c '.[]' | while read -r issue2; do
    id2=$(echo "$issue2" | jq -r '.number')
    title2=$(echo "$issue2" | jq -r '.title')
    
    # Skip comparing with self or already checked issues
    if [[ "$id1" == "$id2" ]] || grep -q "^$id2$" "$TEMP_FILE"; then
      continue
    fi
    
    # Calculate similarity
    similarity=$(calculate_similarity "$title1" "$title2")
    
    # If similarity is above threshold, print potential duplicate
    if [[ "$similarity" -ge "$SIMILARITY_THRESHOLD" ]]; then
      echo "\n🔍 Potential duplicates (${similarity}% similar):"
      echo "  Issue #${id1}: ${title1}"
      echo "  Issue #${id2}: ${title2}"
      echo "  URLs: https://github.com/ericchapman80/choreboard/issues/${id1} vs https://github.com/ericchapman80/choreboard/issues/${id2}"
      echo "  ---"
    fi
  done
done

# Clean up
rm -f "$TEMP_FILE"

echo "\n✅ Done checking for duplicates!"
echo "To close duplicates, use: gh issue close <number> -c 'Duplicate of #<number>'"
echo "Example: gh issue close 42 -c 'Duplicate of #24'"
echo ""
echo "To review all issues, visit: https://github.com/ericchapman80/choreboard/issues"
