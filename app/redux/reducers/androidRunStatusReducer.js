import * as types from '../types';

const initialState = {};

const reducer = (state = initialState, action) => {
  if (action.type === types.RUN_ANDROID) {
    return {
      ...state,
      [action.payload.app.path]: 'running',
    };
  }
  if (action.type === types.STOP_ANDROID) {
    return {
      ...state,
      [action.payload.app.path]: 'stopped',
    };
  }
  return state;
};

export default reducer;
