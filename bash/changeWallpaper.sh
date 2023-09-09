#!/bin/bash
# cd ..

image_name="$1"
background_color="$2"
text_color="$3"

image_dir=$(pwd)
image_path="$image_dir/$image_name"


gsettings set org.gnome.desktop.background picture-uri "file://$image_path"
gsettings set org.gnome.desktop.background picture-uri-dark "file://$image_path"

gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:$(gsettings get org.gnome.Terminal.ProfilesList default | tr -d \')/ background-color "$background_color"
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:$(gsettings get org.gnome.Terminal.ProfilesList default | tr -d \')/ foreground-color "$text_color"

# echo "Wallpaper set successfully and terminal colors changed successfully"
echo $image_path
