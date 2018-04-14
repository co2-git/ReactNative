import uniqBy from 'lodash/uniqBy';
import reject from 'lodash/reject';
import map from 'lodash/map';

import * as types from '../types';

const initialState = [];

const reducer = (state = initialState, action) => {
  if (action.type === types.OPEN_APP) {
    return uniqBy([...state, {path: action.payload.path}], 'path');
  }
  if (action.type === types.CLOSE_APP) {
    return reject(state, {path: action.payload.app.path});
  }
  if (action.type === types.APP_HAS_PACKAGE) {
    return map(state, app => {
      if (app.path === action.payload.path) {
        app.hasPackage = action.payload.hasPackage;
      }
      return app;
    });
  }
  return state;
};

export default reducer;
