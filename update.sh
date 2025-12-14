DES_DIR="/home/defau1t/.local/share/gnome-shell/extensions/ghost-icon@defau1t-laptop/"
ORG_DIR="/home/defau1t/Documents/ghost-icon/"

mkdir $DES_DIR

cp ${ORG_DIR}"extension.js" "${DES_DIR}"
cp ${ORG_DIR}"prefs.js" "${DES_DIR}"
cp ${ORG_DIR}"metadata.json" "${DES_DIR}"
cp ${ORG_DIR}"icon.png" "${DES_DIR}"
cp -r ${ORG_DIR}"schemas" "${DES_DIR}"