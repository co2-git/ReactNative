import path from 'path';

import * as types from '../types';
import store from '../store';
import exec from '../../lib/exec';

export const init = async (app) => {
  try {
    const dirname = path.dirname(app.path);
    const name = path.basename(app.path);
    const ps = exec(`react-native init ${name}`, {cwd: dirname});
    ps.on('error', error => store.dispatch({type: types.ERROR, payload: {error}}));
    ps.on('data', data => store.dispatch({type: types.INIT_OUTPUT, payload: {data, app}}));
  } catch (error) {
    store.dispatch({type: types.ERROR, payload: {error}});
  }
};
