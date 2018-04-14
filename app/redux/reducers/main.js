import * as types from '../types';

const initialState = {
  dir: process.cwd(),
};

const mainReducer = (state = initialState, action) => {
  const nextState = {...state};
  if (action.type === types.CHANGE_DIR) {
    nextState.dir = action.payload.dir;
  }
  return nextState;
};

export default mainReducer;
