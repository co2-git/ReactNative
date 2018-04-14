import React from 'react';
import ReactDOM from 'react-dom';
import fixPath from 'fix-path';
// eslint-disable-next-line import/no-unresolved, import/extensions
import {app, autoUpdater, dialog} from 'electron';
import isDev from 'electron-is-dev';

import App from './App';
import config from '../config.json';
import {raiseError} from './redux/actions/errorsActions';

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

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.',
    };

    dialog.showMessageBox(dialogOpts, (response) => {
      if (response === 0) autoUpdater.quitAndInstall();
    });
  });

  autoUpdater.on('error', (message) => {
    raiseError(new Error(message));
  });
}
