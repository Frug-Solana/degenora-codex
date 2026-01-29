#!/usr/bin/env bash
set -euo pipefail

# Public copy guardrails
# Fails if we accidentally include assistant/meta/instruction tone in public-facing markdown.

ROOT_DIR="${1:-.}"

# Files to scan
FILES=$(git ls-files "${ROOT_DIR}" | grep -E '\.(md|txt)$' || true)

if [ -z "$FILES" ]; then
  echo "No markdown/text files found to scan."
  exit 0
fi

# Banned patterns (case-insensitive)
# Keep this list tight, avoid false positives.
BANNED_REGEX='(as an ai|i can\x27t|i cannot|i will\b|note:|internal\b|do not share|safety\b|assistant\b|instructions\b|paste here|next step|i recommend)'

# Disallow em dash character
EM_DASH='—'

fail=0

while IFS= read -r f; do
  # Skip vendored or generated folders if any in future
  if echo "$f" | grep -qE '^(node_modules/|dist/|build/|\.git/)'; then
    continue
  fi

  if grep -Ein "$BANNED_REGEX" "$f" >/dev/null 2>&1; then
    echo "FAIL: banned phrasing found in $f"
    grep -Ein "$BANNED_REGEX" "$f" || true
    echo
    fail=1
  fi

  if grep -n "$EM_DASH" "$f" >/dev/null 2>&1; then
    echo "FAIL: em dash found in $f"
    grep -n "$EM_DASH" "$f" || true
    echo
    fail=1
  fi

done <<< "$FILES"

if [ $fail -eq 1 ]; then
  echo "Public copy check failed. Remove assistant/meta phrasing and em dashes."
  exit 1
fi

echo "Public copy check OK."
