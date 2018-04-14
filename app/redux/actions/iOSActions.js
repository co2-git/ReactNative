import * as types from '../types';
import store from '../store';

import exec from '../../lib/exec';

export const run = async (app) => {
  const onError = (error) => {
    store.dispatch({
      type: types.ERROR,
      payload: {error},
    });
    store.dispatch({
      type: types.FAILED_RUNNING_IOS,
      payload: {error, app},
    });
  };
  try {
    store.dispatch({
      type: types.RUN_IOS,
      payload: {app},
    });
  } catch (error) {
    onError(error);
  }
};

export const stop = async (app) => {
  const onError = (error) => {
    store.dispatch({
      type: types.ERROR,
      payload: {error},
    });
    store.dispatch({
      type: types.FAILED_STOPPING_IOS,
      payload: {error, app},
    });
  };
  try {
    store.dispatch({
      type: types.STOP_IOS,
      payload: {app},
    });
  } catch (error) {
    onError(error);
  }
};
