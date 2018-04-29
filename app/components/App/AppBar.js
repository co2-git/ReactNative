// @flow
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MaterialUIAppBar from 'material-ui/AppBar';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import DoneIcon from 'material-ui/svg-icons/action/done';
import path from 'path';
import React from 'react';

import {switchRoute} from '../../redux/actions/routerActions';

const AppBar = ({app}: $AppBarProps) => (
  <MaterialUIAppBar
    title={path.basename(app.path)}
    iconElementLeft={(
      <IconButton>
        <NavigationBack />
      </IconButton>
    )}
    onLeftIconButtonClick={() => switchRoute(0)}
    iconElementRight={app.isExpo ? (
      <FlatButton
        label="Expo App"
        icon={<DoneIcon />}
      />
    ) : <div />}
  />
);

export default AppBar;
