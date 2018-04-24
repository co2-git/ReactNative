// @flow
import path from 'path';
// $FlowFixMe No electron
import {remote} from 'electron'; // eslint-disable-line import/no-unresolved, import/extensions
import capitalize from 'lodash/capitalize';

import * as types from '../types';
import {dispatchError} from '../storeHelpers';
import config from '../../../config.json';
import {stat} from '../../helpers/fsHelpers';
import {convertBytesToMegaBytes} from '../../helpers/mathHelpers';
import exec from '../../lib/exec';

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
    return null;
  }
};

export const dragAPK = (apkPath: string) => {
  remote.getCurrentWebContents().startDrag({
    file: apkPath,
    icon: path.resolve(__dirname, '../../..', 'assets/icons/apk.png'),
  });
};

export const generateAPK = async (app: $App, variant: string = 'debug') => {
  try {
    const ps = exec(`./gradlew assemble${capitalize(variant)}`, {
      cwd: path.join(app.path, 'android'),
    });
    ps.on('error', error => dispatchError(error, types.FAILED_GENERATING_APK, {app, variant}));
  } catch (error) {
    dispatchError(error, types.FAILED_GENERATING_APK, {app, variant});
  }
};
