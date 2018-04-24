import * as types from '../types';

const initialState = {};

const reducer = (state = initialState, action) => {
  if (action.type === types.SWITCHED_APP_ROUTE) {
    return {
      ...state,
      [action.payload.app.path]: {
        index: action.payload.index,
        switched: true,
      },
    };
  }
  return state;
};

export default reducer;
