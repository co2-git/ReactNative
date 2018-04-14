import * as types from '../types';

const initialState = null;

const reducer = (state = initialState, action) => {
  if (action.type === types.ERROR) {
    return action.payload.error;
  }
  if (action.type === types.CLEAR_ERROR) {
    return null;
  }
  return state;
};

export default reducer;
