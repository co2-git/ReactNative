import {remote} from 'electron';
import first from 'lodash/first';
import find from 'lodash/find';

import store from '../store';
import * as types from '../types';
import {read, stat} from '../../helpers/fsHelpers';

export const openApp = async (appPath, cb) => {
  try {
    let path;
    if (appPath) {
      path = appPath;
    } else {
      const directories = await remote.dialog.showOpenDialog({
        properties: ['openDirectory']
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
      store.dispatch({type: types.OPEN_APP, payload: {path}});
      store.dispatch({type: types.SELECT_APP, payload: {path}});
      try {
        const stats = await stat(`${path}/package.json`);
        store.dispatch({type: types.APP_HAS_PACKAGE, payload: {path, hasPackage: true}});
      } catch (error) {
        if (error.code === 'ENOENT') {
          store.dispatch({type: types.APP_HAS_PACKAGE, payload: {path, hasPackage: false}});
        } else {
          throw error;
        }
      }
    }
  } catch (error) {
    console.log(error.stack);
    store.dispatch({type: types.ERROR, payload: {error}});
  }
}

export const closeApp = async (app) => {
  try {
    store.dispatch({type: types.CLOSE_APP, payload: {app}});
  } catch (error) {
    store.dispatch({type: types.ERROR, payload: {error}});
  }
};

export const openBase = async () => {
  try {
    let path;
    const directories = await remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    if (directories) {
      path = first(directories);
    }
    if (path) {
    }
  } catch (error) {
    console.log(error.stack);
    store.dispatch({type: types.ERROR, payload: {error}});
  }
};
