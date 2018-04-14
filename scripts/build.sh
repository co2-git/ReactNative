#! /bin/bash
APP_NAME="$1"
APP_VERSION="$2"
ELECTRON_VERSION=1.7.0

electron-packager . $APP_NAME \
  --electron-version=$ELECTRON_VERSION \
  --platform=darwin \
  --version=$ELECTRON_VERSION \
  --icon=assets/icons/icon \
  --out=release/$APP_VERSION \
  --ignore=release
