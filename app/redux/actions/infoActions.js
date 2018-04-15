import compact from 'lodash/compact';
import stripAnsi from 'strip-ansi';

import * as types from '../types';
import exec from '../../lib/exec';
import store from '../store';

// eslint-disable-next-line import/prefer-default-export
export const getInfo = async (app) => {
  try {
    let data = '';
    const ps = exec('react-native info', {cwd: app.path});
    ps.on('error', (error) => {
      store.dispatch({
        type: types.ERROR,
        payload: {error},
      });
      store.dispatch({
        type: types.FAILED_GETTING_INFO,
        payload: {app, error},
      });
    });
    ps.on('data', ({message}) => {
      data += message;
    });
    ps.on('done', () => {
      const stripped = stripAnsi(data);
      const environmentString = stripped
        .replace(/\n/g, ':NL:')
        .replace(/^.+Environment:(.+)Packages:.+$/, '$1')
        .replace(/:NL:/g, '\n');
      const environment = {};
      const lines = compact(environmentString.split(/\n/));
      for (const line of lines) {
        const [key, ...value] = line.trim().split(':');
        environment[key] = value.join(':').trim();
      }
      const packagesString = stripped
        .replace(/\n/g, ':NL:')
        .replace(/^.+Packages:(.+)$/, '$1')
        .replace(/:NL:/g, '\n')
        .trim();
      const packages = {};
      const lines2 = compact(packagesString.split(/\n/));
      lines2.shift();
      for (const line2 of lines2) {
        const [key, ...value] = line2.trim().split(':');
        const [wanted, installed] = value.join(':').split(' => ');
        packages[key] = {wanted: wanted.trim(), installed: installed.trim()};
      }
      store.dispatch({
        type: types.GOT_INFO,
        payload: {app, info: {environment, packages}},
      });
    });
  } catch (error) {
    store.dispatch({
      type: types.ERROR,
      payload: {error},
    });
    store.dispatch({
      type: types.FAILED_GETTING_INFO,
      payload: {error, app},
    });
  }
};
