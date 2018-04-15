import * as types from '../types';
import store from '../store';

export const switchRoute = index => store.dispatch({
  type: types.SWITCH_ROUTE,
  payload: {index},
});

export const switchAppRoute = (app, index) => store.dispatch({
  type: types.SWITCH_APP_ROUTE,
  payload: {app, index},
});
