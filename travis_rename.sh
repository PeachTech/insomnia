#! /bin/bash
ver=$(node -e "console.log(require('./app/package.json').version);")
PATH=`echo $PATH | sed -e 's/:\.\/node_modules\/\.bin//'`;
echo "making ./dist/deploy"
mkdir -p ./dist/deploy
result=$?
echo "result of mkdir -p ./dist/deploy was $result"
echo "working directory is currently $(pwd)"
ls
find ./dist -type f -name *.AppImage -execdir mv {} Peach-Insomnia-Setup-$ver-x86_64-linux.AppImage \;
find ./dist -type f -name *.dmg -execdir mv {} Peach-Insomnia-Setup-$ver-x86_64-mac.dmg \;
