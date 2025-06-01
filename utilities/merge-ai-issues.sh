#!/bin/bash
# merge-ai-issues.sh
# Merges AI tooling issues into the main issues.txt file

set -e

# Define file paths
ISSUES_FILE="utilities/data/issues.txt"
AI_ISSUES_FILE="utilities/data/ai-tooling-issues.txt"
BACKUP_FILE="${ISSUES_FILE}.bak.$(date +%Y%m%d%H%M%S)"
TEMP_FILE=$(mktemp)

# Log function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Check if files exist
if [ ! -f "$ISSUES_FILE" ]; then
    log "Error: $ISSUES_FILE not found"
    exit 1
fi

if [ ! -f "$AI_ISSUES_FILE" ]; then
    log "Error: $AI_ISSUES_FILE not found"
    exit 1
fi

# Create a backup of the original file
log "Creating backup of $ISSUES_FILE at $BACKUP_FILE"
cp "$ISSUES_FILE" "$BACKUP_FILE"

# Merge the files
log "Merging AI tooling issues into $ISSUES_FILE"
{
    # Copy the original file
    cat "$ISSUES_FILE"
    # Ensure there's a newline between the files
    echo -e "\n"
    # Add the AI issues
    cat "$AI_ISSUES_FILE"
} > "$TEMP_FILE"

# Replace the original file
mv "$TEMP_FILE" "$ISSUES_FILE"
log "Successfully merged AI tooling issues into $ISSUES_FILE"

# Optionally, you can remove the AI issues file after merging
# rm "$AI_ISSUES_FILE"
# log "Removed $AI_ISSUES_FILE"

log "Done"
