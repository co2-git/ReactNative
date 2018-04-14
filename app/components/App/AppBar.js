// @flow
import DropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MaterialUIAppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
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
    iconElementRight={(
      <IconMenu
        iconButtonElement={(
          <IconButton><DropDownIcon /></IconButton>
        )}
        onItemClick={(event, child) => console.log(child.props.primaryText)}
      >
        <MenuItem primaryText="Packager" />
        <MenuItem primaryText="React Native" />
        <MenuItem primaryText="Android" />
        <MenuItem primaryText="iOS" />
        <MenuItem primaryText="Expo" />
        <MenuItem primaryText="Native modules" />
      </IconMenu>
    )}
  />
);

export default AppBar;
