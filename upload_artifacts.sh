#! /bin/bash

echo "Installing artifacts uploader which should be pre-installed but it is not."
ARTIFACTS_DEST=${ARTIFACTS_DEST:-$HOME/bin/artifacts}
OS=$(uname | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)
if [[ $ARCH == x86_64 ]] ; then
  ARCH=amd64
fi

mkdir -p $(dirname "$ARTIFACTS_DEST")
curl -sL -o "$ARTIFACTS_DEST" \
  https://s3.amazonaws.com/travis-ci-gmbh/artifacts/stable/build/$OS/$ARCH/artifacts
chmod +x "$ARTIFACTS_DEST"
PATH="$(dirname "$ARTIFACTS_DEST"):$PATH" artifacts -v

echo "starting upload script"
echo Using insomnia version $INSOMNIA_VERSION 
INSOMNIA_VERSION=$(node -e "console.log(require('./package.json').version);")
echo insomnia version is now $INSOMNIA_VERSION
echo would upload from artifacts paths: $ARTIFACTS_PATHS
echo Artifacts working dir is: $ARTIFACTS_WORKING_DIR
echo "if the above is blank, something is wrong"
UPLOADFILES=$(find ./dist/deploy -type f -name *.AppImage -o -name *.dmg -o -name *.snap | tr "\n" ":")
echo "files to upload are $UPLOADFILES"
artifacts -D upload --target-paths "release/1.5/$INSOMNIA_VERSION" $UPLOADFILES
echo "Upload would have been completed here"
