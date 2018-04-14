import * as types from '../types';

const initialState = 0;

const reducer = (state = initialState, action) => {
  if (action.type === types.SWITCH_ROUTE) {
    return action.payload.index;
  }
  return state;
};

export default reducer;
