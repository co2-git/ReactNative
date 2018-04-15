#! /bin/bash

VERSION=$1
TYPE=$2
ISSUE=$3

git co $VERSION
git pull
git co -b "$TYPE/$ISSUE"
git push
