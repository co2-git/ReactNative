import * as types from '../types';
import store from '../store';

export const clearError = async () => {
  try {
    store.dispatch({
      type: types.CLEAR_ERROR,
      payload: {},
    });
  } catch (error) {
    store.dispatch({
      type: types.ERROR,
      payload: {error},
    });
  }
};

export const raiseError = async (error) => {
  store.dispatch({
    type: types.ERROR,
    payload: {error},
  });
};
