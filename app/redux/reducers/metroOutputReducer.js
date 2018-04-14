import * as types from '../types';

const initialState = [];
const metroOutputReducer = (state = initialState, action) => {
  const nextState = [...state];
  if (action.type === types.METRO_OUTPUT) {
    nextState.push(action.payload.data);
  }
  return nextState;
};
export default metroOutputReducer;
