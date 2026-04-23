#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$ROOT_DIR/vendor/sakai-react"
REPO_URL="https://github.com/primefaces/sakai-react.git"

mkdir -p "$ROOT_DIR/vendor"

if [ -d "$TARGET_DIR/.git" ]; then
  git -C "$TARGET_DIR" pull --ff-only
else
  git clone --depth 1 "$REPO_URL" "$TARGET_DIR"
fi

echo "Sakai React synced at $TARGET_DIR"
