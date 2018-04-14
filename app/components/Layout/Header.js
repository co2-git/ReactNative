// @flow
import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

const Header = ({onToggle}: $HeaderOwnProps) => (
  <header>
    <AppBar
      iconElementLeft={(
        <IconButton>
          <MenuIcon color="#444" />
        </IconButton>
      )}
      onLeftIconButtonClick={onToggle}
      title="React Native"
      style={{backgroundColor: 'transparent'}}
      titleStyle={{color: '#444'}}
    />
  </header>
);

export default Header;
