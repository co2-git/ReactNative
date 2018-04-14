import * as types from '../types';

const initialState = {
  app: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === types.SELECT_APP) {
    return {...state, app: action.payload.path};
  }
  if (action.type === types.CLOSE_APP && action.payload.app.path === state.app) {
    return {...state, app: null};
  }
  return state;
};

export default reducer;
