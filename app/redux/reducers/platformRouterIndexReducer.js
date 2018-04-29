import * as types from '../types';

const initialState = {};

const reducer = (state = initialState, action) => {
  if (action.type === types.SWITCH_PLATFORM_ROUTE) {
    return {
      ...state,
      [action.payload.app.path]: {
        ...(state[action.payload.app.path] || {}),
        [action.payload.platform]: action.payload.index,
      },
    };
  }
  return state;
};

export default reducer;
