import React from 'react';
import ReactDOM from 'react-dom';
import fixPath from 'fix-path';
// eslint-disable-next-line import/no-unresolved, import/extensions
import {app, autoUpdater} from 'electron';
import isDev from 'electron-is-dev';

import App from './App';
import config from '../config.json';

fixPath();

const root = document.getElementById('root');

ReactDOM.render(<App />, root);

if (!isDev) {
  const server = config.now.url;
  const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

  autoUpdater.setFeedURL(feed);

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 1000 * 60 * 60 * 24);
}
