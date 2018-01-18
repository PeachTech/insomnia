#! /bin/bash
echo "will set version on package.json to latest tag"
# lock the version to the latest git tag
npm version from-git --no-git-tag-version --allow-same-version
# now we need to apply this to app/package.json
# ironically, 'npm version' outputs the version number but not in the format
# that we need, so just read the file we just changed
ver=$(node -e "console.log(require('./package.json').version);")
cd app
npm version $ver --no-git-tag-version --allow-same-version
