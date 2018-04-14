// @flow
import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import CodeIcon from 'material-ui/svg-icons/action/code';
import BugIcon from 'material-ui/svg-icons/action/bug-report';
import HelpIcon from 'material-ui/svg-icons/communication/live-help';
import open from 'open';

import info from '../../../package.json';

const DrawerMenu = () => (
  <div>
    <div style={{textAlign: 'center'}}>
      <strong>{info.name}</strong> v<em>{info.version}</em>
    </div>
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
  </div>
);

export default DrawerMenu;
