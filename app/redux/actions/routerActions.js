import * as types from '../types';
import store from '../store';

// eslint-disable-next-line import/prefer-default-export
export const switchRoute = index => store.dispatch({
  type: types.SWITCH_ROUTE,
  payload: {index},
});
