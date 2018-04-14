import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';

import Runner from '../Terminal/Runner';
import RunSettings from './RunSettings';
import {run, stop} from '../../redux/actions/androidActions';

const Run = ({app, status}) => (
  <Runner
    app={app}
    settingsComponent={<RunSettings />}
    buttonComponent={
      (!status || status === 'stopped') ? (
        <RaisedButton label="Run" primary onClick={() => run(app)} />
      ) : (
        <RaisedButton label="Stop" secondary onClick={() => stop(app)} />
      )
    }
  />
);

const selector = (state, props) => ({
  status: state.androidRunStatus[props.app.path],
});

export default connect(selector)(Run);
