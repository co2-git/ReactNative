// @flow
import fs from 'fs';
import path from 'path';

import * as types from '../types';
import {dispatch, dispatchError} from '../storeHelpers';
import config from '../../../config.json';

export const getAPK = async (app, variant = 'debug') => {
  try {
    const apkPath = path.join(
      app.path,
      config.android.paths.apk,
      `app-${variant}.apk`,
    );
    console.log({apkPath});
    let source = '';
    fs.createReadStream(apkPath)
      .on('error', error => dispatchError(error, types.FAILED_GETTING_APK, {app, variant}))
      .on('data', (data) => {
        source += data;
      })
      .on('end', () => {
        console.log(source);
      });
  } catch (error) {
    dispatchError(error, types.FAILED_GETTING_APK, {app, variant});
  }
};

export const generateAPK = () => {};
