#!/bin/bash
# cleanup-issues.sh
#
# CONTEXT: Cleans up the issues.txt file by removing malformed issues and ensuring proper formatting
# USAGE: ./cleanup-issues.sh [input_file]
# OUTPUT: Prints cleaned issues to stdout, use redirection to save
# DEPENDENCIES: grep, awk, mktemp
#
# This script is part of the Choreboard project's workflow automation.
# It ensures that all issues in issues.txt follow the required format.

# Set default input file if not provided
INPUT="${1:-utilities/data/issues.txt}"
TEMP_FILE="$(mktemp)"

# Log function for consistent output
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to check if an issue is valid
# Returns: 0 if valid, 1 if invalid, 2 if file doesn't exist
is_valid_issue() {
  local file="$1"
  local has_id=0 has_title=0 has_body=0
  
  # Check if file exists and is readable
  if [ ! -f "$file" ] || [ ! -r "$file" ]; then
    log "Error: File not found or not readable: $file"
    return 2
  fi
  
  # Check for required fields
  grep -q '^id:' "$file" && has_id=1
  grep -q '^title:' "$file" && has_title=1
  grep -q '^body: |' "$file" && has_body=1
  
  # Debug output
  if [ "$DEBUG" = "1" ]; then
    log "Validating $file - id:$has_id title:$has_title body:$has_body"
  fi
  
  # An issue is valid if it has all three required fields
  if [ "$has_id" -eq 1 ] && [ "$has_title" -eq 1 ] && [ "$has_body" -eq 1 ]; then
    return 0
  else
    # Log which fields are missing
    local missing=()
    [ "$has_id" -eq 0 ] && missing+=("id")
    [ "$has_title" -eq 0 ] && missing+=("title")
    [ "$has_body" -eq 0 ] && missing+=("body")
    log "Invalid issue in $file - Missing: ${missing[*]}"
    return 1
  fi
}

# Create a temporary directory for processing
TEMP_DIR=$(mktemp -d)
trap 'cleanup' EXIT

# Cleanup function
cleanup() {
  if [ -d "$TEMP_DIR" ]; then
    rm -rf "$TEMP_DIR"
    log "Temporary files cleaned up"
  fi
}

# Main processing function
process_issues() {
  local input_file="$1"
  local temp_output="$2"
  local valid_count=0
  local invalid_count=0
  
  log "Starting to process issues from: $input_file"
  
  # Split the file into individual issues
  if ! awk -v dir="$TEMP_DIR" 'BEGIN{n=0;file=dir"/issue_"n} /^---$/{n++;file=dir"/issue_"n;next} {print > file}' "$input_file" 2>/dev/null; then
    log "Error: Failed to split input file"
    return 1
  fi
  
  # Process each issue file
  local issue_count=0
  for f in "$TEMP_DIR"/issue_*; do
    [ -f "$f" ] || continue
    ((issue_count++))
    
    if is_valid_issue "$f"; then
      # If the issue is valid, append it to the output file
      cat "$f" >> "$temp_output"
      echo "---" >> "$temp_output"
      ((valid_count++))
      
      if [ "$DEBUG" = "1" ]; then
        log "Valid issue processed: $(grep '^title:' "$f" | head -1)"
      fi
    else
      log "Skipping invalid issue: $(grep '^title:' "$f" | head -1 || echo 'Unknown issue')"
      ((invalid_count++))
    fi
  done
  
  # Remove the last '---' to keep the file clean
  [ -f "$temp_output" ] && sed -i '' -e '${/^---$/d;}' "$temp_output"
  
  log "Processed $issue_count issues: $valid_count valid, $invalid_count invalid"
  
  if [ $invalid_count -gt 0 ]; then
    log "Warning: $invalid_count issues were skipped due to validation errors"
    return 2
  fi
  
  return 0
}

# Main execution
main() {
  # Check if input file exists
  if [ ! -f "$INPUT" ]; then
    log "Error: Input file not found: $INPUT"
    exit 1
  fi
  
  # Create a backup of the original file
  local backup_file="${INPUT}.bak.$(date +%Y%m%d%H%M%S)"
  cp "$INPUT" "$backup_file"
  log "Created backup at: $backup_file"
  
  # Process the issues
  if process_issues "$INPUT" "$TEMP_FILE"; then
    # Only replace the original if processing succeeded
    if [ -s "$TEMP_FILE" ]; then
      mv "$TEMP_FILE" "$INPUT"
      log "✅ Successfully cleaned up issues in: $INPUT"
    else
      log "Warning: No valid issues found in the input file"
      exit 3
    fi
  else
    log "Error: Failed to process issues"
    exit 2
  fi
}

# Run the main function
main "$@"
