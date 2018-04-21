import * as types from '../types';

const initialState = [];

const reducer = (state = initialState, action) => {
  if (action.type === types.SWITCHED_ROUTE) {
    return [
      ...state,
      {
        index: action.payload.index,
        switched: true,
      },
    ];
  }
  return state;
};

export default reducer;
