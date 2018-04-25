import filter from 'lodash/filter';
import * as types from '../types';

const initialState = [];

const reducer = (state = initialState, action) => {
  if (action.type === types.VIEW_APP) {
    return [...state, action.payload.app.path];
  }
  if (action.type === types.HIDE_APP) {
    return filter(state, path => path !== action.payload.app.path);
  }
  return state;
};

export default reducer;
