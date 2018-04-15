// @flow
import React from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import EjectIcon from 'material-ui/svg-icons/action/eject';
import InfoIcon from 'material-ui/svg-icons/action/info';
import AndroidIcon from 'material-ui/svg-icons/action/android';
import UpgradeIcon from 'material-ui/svg-icons/notification/system-update';
import SmartPhoneIcon from 'material-ui/svg-icons/hardware/smartphone';

const AppBottomBar = () => (
  <Paper zDepth={1}>
    <BottomNavigation>
      <BottomNavigationItem
        label="Info"
        onClick={() => this.select(0)}
        icon={<InfoIcon />}
      />
      <BottomNavigationItem
        label="Start"
        onClick={() => this.select(0)}
        icon={<PlayIcon />}
      />
      <BottomNavigationItem
        label="Android"
        onClick={() => this.select(0)}
        icon={<AndroidIcon />}
      />
      <BottomNavigationItem
        label="iOS"
        onClick={() => this.select(0)}
        icon={<i className="icon-apple" style={{fontSize: 24, color: '#777', marginTop: -3}} />}
      />
      <BottomNavigationItem
        label="Upgrade"
        onClick={() => this.select(0)}
        icon={<UpgradeIcon />}
      />
      <BottomNavigationItem
        label="Native"
        onClick={() => this.select(0)}
        icon={<SmartPhoneIcon />}
      />
      <BottomNavigationItem
        label="Eject"
        onClick={() => this.select(0)}
        icon={<EjectIcon />}
      />
    </BottomNavigation>
  </Paper>
);

export default AppBottomBar;
