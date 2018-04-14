#! /bin/bash
APP_NAME="$1"
APP_VERSION="$2"
PLATFORM=${3:-all}
ELECTRON_VERSION=1.8.4

electron-packager . $APP_NAME \
  --electron-version=$ELECTRON_VERSION \
  --platform=$PLATFORM \
  --version=$ELECTRON_VERSION \
  --icon=assets/icons/icon \
  --out=release/$APP_VERSION \
  --ignore=release \
  --ignore=assets/screenshots
