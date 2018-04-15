import uniqBy from 'lodash/uniqBy';
import reject from 'lodash/reject';

import * as types from '../types';

const initialState = [];

const reducer = (state = initialState, action) => {
  if (action.type === types.OPEN_APP) {
    return uniqBy([...state, {path: action.payload.path}], 'path');
  }
  if (action.type === types.CLOSE_APP) {
    return reject(state, {path: action.payload.app.path});
  }
  return state;
};

export default reducer;
