#! /bin/bash
ver=$(node -e "console.log(require('./app/package.json').version);")
PATH=`echo $PATH | sed -e 's/:\.\/node_modules\/\.bin//'`;
echo "making ./dist/deploy"
mkdir -p ./dist/deploy
result=$?
echo "result of mkdir -p ./dist/deploy was $result"
echo "working directory is currently $(pwd)"
ls ./dist/deploy
# must use execdir in order to actually rename the file or it will want the full path
# in the command
echo "renaming installer"
find ./dist -type f -name *.AppImage -execdir mv {} Peach-Insomnia-Setup-$ver-x86_64-linux.AppImage \;
find ./dist -type f -name *.dmg -execdir mv {} Peach-Insomnia-Setup-$ver-x86_64-mac.dmg \;
echo "installer renamed"
# copy to dist/deploy so that upload-dir in the deploy provider will only copy 
# the files we actually want
echo "copying AppImage to ./dist/deploy"
find ./dist -type f -name Peach*.AppImage -exec cp -f {} ./dist/deploy/ \;
echo "AppImage copied."
ls -al ./dist/deploy
echo "copying dmg to ./dist/deploy"
find ./dist -type f -name Peach*.dmg -exec cp -f {} ./dist/deploy/ \;
echo "dmg copied"
ls -al ./dist/deploy
echo "done"
