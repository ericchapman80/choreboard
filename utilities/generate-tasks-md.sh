#!/bin/bash
# generate-tasks-md.sh
# Generates TASKS.md grouped by milestone from issues.txt

# Set paths relative to script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
INPUT="$REPO_ROOT/utilities/data/issues.txt"
OUTPUT="$REPO_ROOT/TASKS.md"

echo "Generating TASKS.md from $INPUT..."

# Create a temporary file for the AWK script
AWK_SCRIPT=$(mktemp)
cat > "$AWK_SCRIPT" << 'EOF'
BEGIN {
    print "# Choreboard Tasks" > output
    in_body = 0
}

# Reset variables for each issue
/^---$/ {
    if (id != "") {
        print_issue()
    }
    id = ""; title = ""; labels = ""; state = ""; body = ""
    next
}

# Handle each field
/^milestone:/ {
    ms = substr($0, 11)
    if (ms != lastms) {
        printf "\n## %s\n\n", ms >> output
        lastms = ms
    }
    next
}

/^id:/ { id = substr($0, 5); next }
/^title:/ { title = substr($0, 8); next }
/^labels:/ { labels = substr($0, 9); next }
/^state:/ { state = substr($0, 8); next }

# Handle body content
/^body: \|/ {
    in_body = 1
    body = ""
    next
}

# If we're in the body, collect lines until we hit the next issue or end of file
in_body == 1 {
    if ($0 ~ /^---$/) {
        in_body = 0
        next
    }
    body = body (body == "" ? "    " : "\n    ") $0
    next
}

# Function to print the issue
function print_issue() {
    printf "- [%s] **%s** (%s)\n  _Labels: %s_%s\n\n", 
        (state == "closed" ? "x" : " "), 
        title, 
        id, 
        labels, 
        (body != "" ? "\n" body : "") >> output
}

# Handle the last issue if file doesn't end with ---
END {
    if (id != "") {
        print_issue()
    }
}
EOF

# Run the AWK script
if [ -f "$INPUT" ]; then
    awk -v output="$OUTPUT" -f "$AWK_SCRIPT" "$INPUT"
    echo "Generated $OUTPUT successfully!"
else
    echo "Error: Input file $INPUT not found!" >&2
    exit 1
fi

# Clean up
rm -f "$AWK_SCRIPT"
