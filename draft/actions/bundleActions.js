import store from '../store';
import * as types from '../types';
import exec from '../../lib/exec';

export const bundleRequest = (options = {}) => {
  store.dispatch({type: types.START_BUNDLE});
  const state = store.getState();
  const cli = 'node_modules/react-native/local-cli/cli.js';
  const args = [
    `--entry-file ${options.entryFile}`,
    `--bundle-output ${options.bundleOutput}`,
  ];
  const bundle = exec(`node ${cli} bundle ${args.join(' ')}`, {cwd: state.main.dir});
  bundle.on('error', (error) => {
    console.log(error);
  });
  bundle.on('failed', status => store.dispatch({type: types.BUNDLE_FAILED, payload: {status}}));
  bundle.on('data', data => store.dispatch({type: types.BUNDLE_OUTPUT, payload: {data}}));
  bundle.on('done', () => store.dispatch({type: types.BUNDLE_OK}));
};
