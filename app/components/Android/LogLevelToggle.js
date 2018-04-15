// @flow
import React from 'react';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';

import {logLevelToggleStyle} from '../../styles/main';
import merge from '../../styles/mixins/merge';

const LogLevelToggle = (props: $LogLevelToggleProps) => (
  <Paper zDepth={1} style={merge(logLevelToggleStyle, {backgroundColor: props.color})}>
    <Toggle
      labelStyle={{color: 'white'}}
      label={props.label}
      labelPosition="right"
      toggled={props.value}
    />
  </Paper>
);

export default LogLevelToggle;
