import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import Runner from '../Terminal/Runner';
import InstallSettings from './InstallSettings';

const Install = ({app}) => (
  <Runner
    app={app}
    settingsComponent={<InstallSettings />}
    buttonComponent={<RaisedButton label="Run" primary />}
  />
);

export default Install;
