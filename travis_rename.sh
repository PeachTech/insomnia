#! /bin/bash
set -x
ver=$(node -e "console.log(require('./packages/insomnia-app/package.json').version);")
PATH=`echo $PATH | sed -e 's/:\.\/node_modules\/\.bin//'`;
BUILDDIR=./dist/deploy
echo "making $BUILDDIR"
mkdir -p $BUILDDIR
result=$?
echo "result of mkdir -p $BUILDDIR was $result"
echo "working directory is currently $(pwd)"
deploydir=$(pwd)/dist/deploy
ls $deploydir
echo "deploydir will be $deploydir"
# must use execdir in order to actually rename the file or it will want the full path
# in the command
echo "renaming installer"
find ./packages/insomnia-app/dist -type f -name *.AppImage -execdir cp {} $deploydir/Peach-Sidecar-Setup-$ver-x86_64-linux.AppImage \;
find ./packages/insomnia-app/dist -type f -name *.snap -execdir cp {} $deploydir/Peach-Sidecar-Setup-$ver-x86_64-linux.snap \;
find ./packages/insomnia-app/dist -type f -name *.dmg -execdir cp {} $deploydir/Peach-Sidecar-Setup-$ver-x86_64-mac.dmg \;
echo "installer renamed"
# copy to dist/deploy so that upload-dir in the deploy provider will only copy 
# the files we actually want
# echo "copying AppImage to ./dist/deploy"
# find ./packages/insomnia-app/dist -type f -name Peach*.AppImage -exec mv -f {} ./dist/deploy/ \;
# echo "AppImage copied."
# ls -al ./dist/deploy
# echo "copying dmg to ./dist/deploy"
# find ./packages/insomnia-app/dist -type f -name Peach*.dmg -exec mv -f {} ./dist/deploy/ \;
# echo "dmg copied"
# echo "copying snap to ./dist/deploy"
# find ./packages/insomnia-app/dist -type f -name Peach*.snap -exec mv -f {} ./dist/deploy/ \;
# echo "dmg copied"
echo "Contents of $deploydir folder are:"
ls -al $deploydir
echo "done"
