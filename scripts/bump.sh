#! /bin/bash

JSON="$(cat ./package.json)"
VERSION="$1"

if [ -z "$VERSION" ]; then
  VERSION="$(node ./scripts/bump bump "$JSON")"
  echo $VERSION
fi

# git co master &&
# git pull &&
# git co -b v$VERSION &&
node scripts/bump rewrite "$JSON" $VERSION > ./package.json
