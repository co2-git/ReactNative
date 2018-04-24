import * as types from '../types';
import store from '../store';

export const switchRoute = index => store.dispatch({
  type: types.SWITCH_ROUTE,
  payload: {index},
});

export const switchingRoute = index => store.dispatch({
  type: types.SWITCHING_ROUTE,
  payload: {index},
});

export const switchedRoute = index => store.dispatch({
  type: types.SWITCHED_ROUTE,
  payload: {index},
});

export const switchAppRoute = (app, index) => store.dispatch({
  type: types.SWITCH_APP_ROUTE,
  payload: {app, index},
});

export const switchingAppRoute = (app, index) => store.dispatch({
  type: types.SWITCHING_APP_ROUTE,
  payload: {app, index},
});

export const switchedAppRoute = (app, index) => store.dispatch({
  type: types.SWITCHED_APP_ROUTE,
  payload: {app, index},
});

export const switchAndroidRoute = (app, index) => store.dispatch({
  type: types.SWITCH_ANDROID_ROUTE,
  payload: {app, index},
});
