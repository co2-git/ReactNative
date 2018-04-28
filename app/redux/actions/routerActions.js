// @flow
import * as types from '../types';
import store from '../store';

export const switchRoute = (index: number) => store.dispatch({
  type: types.SWITCH_ROUTE,
  payload: {index},
});

export const switchAppRoute = (app: $App, index: number) => store.dispatch({
  type: types.SWITCH_APP_ROUTE,
  payload: {app, index},
});

export const switchPlatformRoute = (
  platform: $Platform,
  app: $App,
  index: number,
) => store.dispatch({
  type: types.SWITCH_PLATFORM_ROUTE,
  payload: {app, index, platform},
});
