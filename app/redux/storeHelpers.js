// @flow
import * as types from './types';
import store from './store';

export const dispatch = (
  type: string,
  payload: $ReduxActionPayload,
): $ReduxActionPayload => store.dispatch({type, payload});

export const dispatchError = (
  error: Error,
  type: string,
  payload: $ReduxActionPayload = {},
) => {
  dispatch(types.ERROR, {error});
  dispatch(type, {error, ...payload});
};
