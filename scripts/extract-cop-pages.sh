#!/usr/bin/env bash
#
# Renders pages from the FIG 2025–2028 Code of Points PDF to PNG files in
# public/images/cop-pages/. The SkillCard component looks for these as the
# fallback diagram when no per-skill crop exists in public/images/skills/.
#
# Usage:
#   ./scripts/extract-cop-pages.sh           # extracts referenced pages only
#   ./scripts/extract-cop-pages.sh --all     # extracts every page in the PDF
#
# Requires: poppler-utils (brew install poppler) for pdftocairo.

set -euo pipefail

cd "$(dirname "$0")/.."

OUT_DIR="public/images/cop-pages"
RESOLUTION=120  # DPI; bump to 150 for higher quality, lower for smaller files

# Auto-detect a PDF in the project root. Prefer `cop.pdf` if it exists,
# otherwise fall back to the first matching FIG/MAG-named PDF.
if [[ -f "cop.pdf" ]]; then
  PDF="cop.pdf"
else
  PDF=$(ls -1 *MAG*Code*Points*.pdf *Code*Points*MAG*.pdf 2>/dev/null | head -n1 || true)
fi

if [[ -z "${PDF:-}" || ! -f "$PDF" ]]; then
  echo "✗ No PDF found in $(pwd). Save the FIG MAG 2025–2028 PDF here and rerun." >&2
  exit 1
fi

echo "→ using $PDF"

if ! command -v pdftocairo >/dev/null 2>&1; then
  echo "✗ pdftocairo not found. Install with: brew install poppler" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

# Page ranges that hold skill diagrams, per Section. Keeping the set small
# means a smaller public/ payload; pass --all to render the whole PDF.
declare -a RANGES
if [[ "${1:-}" == "--all" ]]; then
  # Single range covering the whole document.
  RANGES=("1-138")
else
  RANGES=(
    "28-38"   # FX
    "47-58"   # PH
    "63-79"   # SR
    "85-91"   # VT
    "96-112"  # PB
    "118-134" # HB
  )
fi

for range in "${RANGES[@]}"; do
  first="${range%-*}"
  last="${range#*-}"
  echo "→ rendering pages $first-$last…"
  pdftocairo \
    -png \
    -r "$RESOLUTION" \
    -f "$first" \
    -l "$last" \
    "$PDF" \
    "$OUT_DIR/page"
done

echo "✓ wrote $(ls "$OUT_DIR" | wc -l | tr -d ' ') page images to $OUT_DIR/"
