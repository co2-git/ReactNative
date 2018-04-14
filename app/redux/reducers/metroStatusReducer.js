import find from 'lodash/find';
import filter from 'lodash/filter';
import * as types from '../types';

const initialState = {};

const metroStatusReducer = (state = initialState, action) => {
  if (action.type === types.START_METRO) {
    return {
      ...state,
      [action.payload.app.path]: {
        code: null,
        on: true,
        pid: null,
      },
    };
  }
  return state;
};

export default metroStatusReducer;
