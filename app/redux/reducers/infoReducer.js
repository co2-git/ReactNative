import * as types from '../types';

const initialState = {};

const reducer = (state = initialState, action) => {
  if (action.type === types.FAILED_GETTING_INFO) {
    return {
      ...state,
      [action.payload.app.path]: {
        error: action.payload.error,
      },
    };
  }
  if (action.type === types.GOT_INFO) {
    return {
      ...state,
      [action.payload.app.path]: action.payload.info,
    };
  }
  return state;
};

export default reducer;
