import store from '../store';
import * as types from '../types';
import exec from '../../lib/exec';

export const startMetroRequest = ({port = 8081, app}) => {
  store.dispatch({type: types.START_METRO});
  const cli = 'node_modules/react-native/local-cli/cli.js';
  exec(`adb reverse tcp:${port} tcp:${port}`);
  const {path: dir} = app;
  const metro = exec(`node ${cli} start --port ${port}`, {cwd: dir});
  metro.on('error', (error) => {
    console.log(error);
  });
  metro.on('failed', status => store.dispatch({type: types.METRO_DOWN, payload: {status}}));
  metro.on('data', data => store.dispatch({type: types.METRO_OUTPUT, payload: {data}}));
  metro.on('pid', pid => store.dispatch({type: types.METRO_PID, payload: {pid}}));
};

export const changePort = (port) => {
  store.dispatch({type: types.CHANGE_METRO_PORT, payload: {port}});
};

export const stopMetroRequest = () => {
  const {metroStatus} = store.getState();
  if (metroStatus.state === 'started' && metroStatus.pid) {
    store.dispatch({type: types.METRO_OUTPUT, payload: {data: {message: '!! RECEIVED KILL SIGNAL !!'}}});
    exec(`kill -9 ${metroStatus.pid}`)
      .on('done', () => store.dispatch({type: types.METRO_DOWN, payload: {status: 'KILLED'}}));
  }
};

export const start = async (app) => {
  try {
    store.dispatch({
      type: types.START_METRO,
      payload: {app},
    });
  } catch (error) {
    store.dispatch({
      type: types.METRO_DOWN,
      payload: {app, error},
    });
  }
};
