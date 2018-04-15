import * as types from '../types';
import store from '../store';

export const run = async (app) => {
  const onError = (error) => {
    store.dispatch({
      type: types.ERROR,
      payload: {error},
    });
    store.dispatch({
      type: types.FAILED_RUNNING_ANDROID,
      payload: {error, app},
    });
  };
  try {
    store.dispatch({
      type: types.RUN_ANDROID,
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
      type: types.FAILED_STOPPING_ANDROID,
      payload: {error, app},
    });
  };
  try {
    store.dispatch({
      type: types.STOP_ANDROID,
      payload: {app},
    });
  } catch (error) {
    onError(error);
  }
};
