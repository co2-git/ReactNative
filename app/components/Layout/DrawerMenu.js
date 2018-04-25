// @flow
import BugIcon from 'material-ui/svg-icons/action/bug-report';
import ClearIcon from 'material-ui/svg-icons/communication/clear-all';
import CodeIcon from 'material-ui/svg-icons/action/code';
import Divider from 'material-ui/Divider';
import HelpIcon from 'material-ui/svg-icons/communication/live-help';
import MenuItem from 'material-ui/MenuItem';
import open from 'open';
import React from 'react';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import Subheader from 'material-ui/Subheader';

import info from '../../../package.json';

const DrawerMenu = ({persistor}: $DrawerMenuProps) => (
  <div>
    <Divider />
    <Subheader>
      <strong>{info.name}</strong> v<em>{info.version}</em>
    </Subheader>
    <Divider />
    <MenuItem
      leftIcon={<CodeIcon />}
      onClick={() => open(info.repository.url)}
    >
      View source
    </MenuItem>
    <MenuItem
      leftIcon={<BugIcon />}
      onClick={() => open(info.bugs.url)}
    >
      Report a bug
    </MenuItem>
    <MenuItem
      leftIcon={<HelpIcon />}
      onClick={() => open(info.wiki.url)}
    >
      Documentation
    </MenuItem>
    <Divider />
    <MenuItem
      leftIcon={<RefreshIcon />}
      onClick={() => window.location.reload()}
    >
      Reload
    </MenuItem>
    <MenuItem
      leftIcon={<ClearIcon />}
      onClick={async () => {
        await persistor.purge();
        window.location.reload();
      }}
    >
      Reset
    </MenuItem>
    <Divider />
    <MenuItem
      leftIcon={<HelpIcon />}
      onClick={() => open('https://facebook.github.io/react-native/docs/getting-started.html')}
    >
      React Native Help
    </MenuItem>
    <Divider />
  </div>
);

export default DrawerMenu;
