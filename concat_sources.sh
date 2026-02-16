#!/bin/bash

# === CONFIGURATION ===
EXTENSIONS=("js" "ts" "py" "jsx" "java" "css")
OUTPUT_DIR="."
OUTPUT_PREFIX="combined"

# === INPUT DIRECTORIES ===
SOURCE_DIRS=("$@")

# === CREATE OUTPUT DIRECTORY ===
mkdir -p "$OUTPUT_DIR"

# === PROCESS EACH EXTENSION ===
for ext in "${EXTENSIONS[@]}"; do
    OUTPUT_FILE="$OUTPUT_DIR/${OUTPUT_PREFIX}.${ext}" > "$OUTPUT_FILE"
  
    for dir in "${SOURCE_DIRS[@]}"; do
        if [ ! -d "$dir" ]; then
            echo "⚠️ Skipping missing directory: $dir"
            continue
        fi

        find "$dir" -type f -name "*.${ext}" 2>/dev/null | while read -r file; do
            echo -e "\n# File: $file" >> "$OUTPUT_FILE"
            cat "$file" >> "$OUTPUT_FILE"
        done
    done

    echo "✅ Created: $OUTPUT_FILE"
done
