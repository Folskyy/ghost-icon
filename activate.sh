ORG_DIR="/home/defau1t/Documents/ghost-icon/"

cat_dir(){
    pwd
}

ACT_DIR=$(cat_dir)

cd $ORG_DIR

glib-compile-schemas schemas/

./update.sh

cd $ACT_DIR

gnome-extensions enable ghost-icon@defau1t-laptop


echo "Script encerrado."