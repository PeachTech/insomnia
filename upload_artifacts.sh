#! /bin/bash
echo "starting upload script"
echo Using insomnia version $INSOMNIA_VERSION 
INSOMNIA_VERSION=$(node -e "console.log(require('./package.json').version);")
echo insomnia version is now $INSOMNIA_VERSION
echo would upload from artifacts paths: $ARTIFACTS_PATHS
echo Artifacts working dir is: $ARTIFACTS_WORKING_DIR
echo "if the above is blank, something is wrong"
echo $(find dist -type f -name *.AppImage -o -name *.dmg -o -name *.snap | tr "\n" ":")
echo "environment is:"
env
# artifacts -D upload --target-paths /release/1.5/$INSOMNIA_VERSION
echo "Upload would have been completed here"

