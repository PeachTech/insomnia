#! /bin/bash
echo "will set version on package.json to latest tag"
# lock the version to the latest git tag
# can't actually use "from-git" due to repo not being clean and it not respecting --no-git-tag-version
# it should work, but it errors every time
ver=$(git describe --abbrev=0)
echo "ver has been set to $ver"
npm version $ver --no-git-tag-version --allow-same-version --force
# now we need to apply this to app/package.json
# ironically, 'npm version' outputs the version number but not in the format
# that we need, so just read the file we just changed
cd packages/insomnia-app
npm version $ver --no-git-tag-version --allow-same-version --force
export INSOMNIA_VERSION=$ver
