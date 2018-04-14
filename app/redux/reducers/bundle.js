import * as types from '../types';

const initialState = {
  status: null,
  output: [],
};

const bundleReducer = (state = initialState, action) => {
  const nextState = {...state};
  if (action.type === types.START_BUNDLE) {
    nextState.status = 'IN_PROGRESS';
    nextState.output = [];
  } else if (action.type === types.BUNDLE_FAILED) {
    nextState.status = null;
  } else if (action.type === types.BUNDLE_OK) {
    nextState.status = null;
  } else if (action.type === types.BUNDLE_OUTPUT) {
    nextState.output.push(action.payload.data);
  }
  return nextState;
};

export default bundleReducer;
