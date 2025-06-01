#!/bin/bash
# cleanup-issues.sh
# Cleans up the issues.txt file by removing malformed issues

INPUT="utilities/data/issues.txt"
TEMP_FILE="$(mktemp)"

# Function to check if an issue is valid
is_valid_issue() {
  local file="$1"
  local has_id has_title has_body
  
  has_id=$(grep -q '^id:' "$file" && echo 1 || echo 0)
  has_title=$(grep -q '^title:' "$file" && echo 1 || echo 0)
  has_body=$(grep -q '^body: |' "$file" && echo 1 || echo 0)
  
  # An issue is valid if it has all three required fields
  if [ "$has_id" -eq 1 ] && [ "$has_title" -eq 1 ] && [ "$has_body" -eq 1 ]; then
    return 0
  else
    return 1
  fi
}

# Create a temporary directory for processing
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

# Split the file into individual issues
awk -v dir="$TEMP_DIR" 'BEGIN{n=0;file=dir"/issue_"n} /^---$/{n++;file=dir"/issue_"n;next} {print > file}' "$INPUT"

# Process each issue
echo "Processing issues..."
for f in "$TEMP_DIR"/issue_*; do
  if is_valid_issue "$f"; then
    # If the issue is valid, append it to the output file
    cat "$f" >> "$TEMP_FILE"
    echo "---" >> "$TEMP_FILE"
  else
    echo "Skipping invalid issue: $(head -n 1 "$f")"
  fi
done

# Remove the last '---' to keep the file clean
sed -i '' -e '${/^---$/d;}' "$TEMP_FILE"

# Replace the original file
mv "$TEMP_FILE" "$INPUT"

echo "✅ Issues file has been cleaned up successfully!"
