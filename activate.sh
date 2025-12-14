#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ORG_DIR="$SCRIPT_DIR"
EXT_NAME="ghost-icon@Folskyy"

# check if its already activated
if gnome-extensions info "$EXT_NAME" 2>/dev/null | grep -q "State: ENABLED"; then
    echo "Extension '$EXT_NAME' already activated."
    exit 0
fi

# Dependencies
sudo apt install -y python3-gi gir1.2-gtk-3.0

cd "$ORG_DIR"

glib-compile-schemas schemas/

chmod +x update.sh
./update.sh

# Activate the extension
if ! gnome-extensions list | grep -q "$EXT_NAME"; then
    printf "\nExtension installed, but GNOME Shell needs to reload.\n"
    printf "• Wayland: log out and log back in\n"
    printf "• X11: Alt+F2 → r\n"
    exit 0
fi

gnome-extensions enable "$EXT_NAME"

printf "\nExtension '%s' enabled.\n" "$EXT_NAME"
printf "If it does not appear immediately:\n"
printf "• X11: press Alt+F2, type 'r' and press Enter\n"
printf "• Wayland: log out and log back in\n"
