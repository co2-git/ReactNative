import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import Runner from '../Terminal/Runner';
import EjectSettings from './EjectSettings';

const Eject = ({app}) => (
  <Runner
    app={app}
    settingsComponent={<EjectSettings />}
    buttonComponent={<RaisedButton label="Run" primary />}
  />
);

export default Eject;
