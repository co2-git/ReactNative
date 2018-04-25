import * as types from '../types';

const initialState = {};

const reducer = (state = initialState, action) => {
  if (action.type === types.SWITCH_ANDROID_ROUTE) {
    return {
      ...state,
      [action.payload.app.path]: action.payload.index,
    };
  }
  return state;
};

export default reducer;
