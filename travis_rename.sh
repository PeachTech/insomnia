#! /bin/bash
ver=$(node -e "console.log(require('./app/package.json').version);")
PATH=`echo $PATH | sed -e 's/:\.\/node_modules\/\.bin//'`;
find ./dist -type f -name *.AppImage -execdir mv {} peach_insomnia_setup-$ver-x86_64-linux.AppImage \;
find ./dist -type f -name *.dmg -execdir mv {} peach_insomnia_setup-$ver-x86_64-mac.dmg \;
