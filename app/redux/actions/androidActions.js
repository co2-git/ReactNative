// @flow
import path from 'path';
// eslint-disable-next-line import/no-unresolved, import/extensions
import {remote} from 'electron';

import * as types from '../types';
import {dispatchError} from '../storeHelpers';
import config from '../../../config.json';
import {stat} from '../../helpers/fsHelpers';
import {convertBytesToMegaBytes} from '../../helpers/mathHelpers';

export const getAPK = async (app: $App, variant: string = 'debug') => {
  try {
    const apkPath = path.join(
      app.path,
      config.android.paths.apk,
      `app-${variant}.apk`,
    );
    const stats = await stat(apkPath);
    return {
      path: apkPath,
      size: convertBytesToMegaBytes(stats.size),
    };
  } catch (error) {
    dispatchError(error, types.FAILED_GETTING_APK, {app, variant});
  }
};

export const dragAPK = (apkPath: string) => {
  remote.getCurrentWebContents().startDrag({
    file: apkPath,
    icon: path.resolve(__dirname, '../../..', 'assets/icons/apk.png'),
  });
};

export const generateAPK = () => {};
