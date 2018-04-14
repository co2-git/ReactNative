// eslint-disable-next-line import/no-unresolved, import/extensions
import {remote} from 'electron';
import first from 'lodash/first';
import find from 'lodash/find';

import store from '../store';
import * as types from '../types';

export const openApp = async (appPath, cb) => {
  try {
    let path;
    if (appPath) {
      path = appPath;
    } else {
      const directories = await remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
      });
      if (directories) {
        path = first(directories);
      }
    }
    if (path) {
      if (cb) {
        const unsub = store.subscribe(() => {
          const state = store.getState();
          if (state.selected.app === path && find(state.apps, {path})) {
            unsub();
            setTimeout(() => cb(path));
          }
        });
      }
      try {
        const info = await import(`${path}/package.json`);
        store.dispatch({type: types.OPEN_APP, payload: {path, info}});
      } catch (error) {
        store.dispatch({
          type: types.ERROR,
          payload: {
            error: new Error(`${path} is not a React Native app`),
          },
        });
      }
    }
  } catch (error) {
    store.dispatch({type: types.ERROR, payload: {error}});
  }
};

export const closeApp = async (app) => {
  try {
    store.dispatch({type: types.CLOSE_APP, payload: {app}});
  } catch (error) {
    store.dispatch({type: types.ERROR, payload: {error}});
  }
};
