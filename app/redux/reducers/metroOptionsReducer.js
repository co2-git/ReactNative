import * as types from '../types';

const initialState = {
  port: 8081,
};
const metroOptionsReducer = (state = initialState, action) => {
  const nextState = {...state};
  if (action.type === types.CHANGE_METRO_PORT) {
    nextState.port = action.payload.port;
  }
  return nextState;
};
export default metroOptionsReducer;
