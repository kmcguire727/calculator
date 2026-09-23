#!/usr/bin/env bash
set -euo pipefail

# Resolve this script's OWN directory, regardless of where it's called from.
IMG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$IMG_DIR")"
SOURCE="$IMG_DIR/source.png"
HTML_FILE="$PROJECT_ROOT/index.html"

if [[ ! -f "$SOURCE" ]]; then
    echo "Error: expected source.png at $SOURCE" >&2
    exit 1
fi

if [[ ! -f "$HTML_FILE" ]]; then
    echo "Error: expected index.html at $HTML_FILE" >&2
    exit 1
fi

echo "Generating favicon.ico..."
convert "$SOURCE" -define icon:auto-resize=16,32,48 "$IMG_DIR/favicon.ico"

echo "Generating apple-touch-icon.png..."
convert "$SOURCE" -resize 180x180 "$IMG_DIR/apple-touch-icon.png"

# Paths below are relative to index.html's location, hence "img/..."
START="<!-- favicon:start -->"
END="<!-- favicon:end -->"
BLOCK="  ${START}
  <link rel=\"icon\" href=\"img/favicon.ico\" sizes=\"any\">
  <link rel=\"apple-touch-icon\" href=\"img/apple-touch-icon.png\">
  ${END}"

if grep -q "$START" "$HTML_FILE"; then
    echo "Existing favicon tags found — replacing in place."
    awk -v block="$BLOCK" '
        /<!-- favicon:start -->/ {print block; skip=1; next}
        /<!-- favicon:end -->/ {skip=0; next}
        !skip {print}
    ' "$HTML_FILE" > "$HTML_FILE.tmp" && mv "$HTML_FILE.tmp" "$HTML_FILE"
else
    if ! grep -q "<title>" "$HTML_FILE"; then
        echo "Error: no <title> line found in $HTML_FILE to anchor on" >&2
        exit 1
    fi
    echo "No existing favicon tags — inserting after <title>."
    awk -v block="$BLOCK" '
        {print}
        /<title>/ {print block}
    ' "$HTML_FILE" > "$HTML_FILE.tmp" && mv "$HTML_FILE.tmp" "$HTML_FILE"
fi

echo "Done."