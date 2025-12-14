#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

EXT_NAME="ghost-icon@Folskyy"
DES_DIR="$HOME/.local/share/gnome-shell/extensions/$EXT_NAME"
ORG_DIR="$SCRIPT_DIR"

mkdir -p "$DES_DIR"

cp "$ORG_DIR/extension.js" "$DES_DIR/"
cp "$ORG_DIR/prefs.js" "$DES_DIR/"
cp "$ORG_DIR/metadata.json" "$DES_DIR/"
cp "$ORG_DIR/icon.png" "$DES_DIR/"
cp -r "$ORG_DIR/schemas" "$DES_DIR/"

echo "Extension copied to $DES_DIR"
echo "Script executed"

