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
        onClick={() => {}}
        icon={<InfoIcon />}
      />
      <BottomNavigationItem
        label="Start"
        onClick={() => {}}
        icon={<PlayIcon />}
      />
      <BottomNavigationItem
        label="Android"
        onClick={() => {}}
        icon={<AndroidIcon />}
      />
      <BottomNavigationItem
        label="iOS"
        onClick={() => {}}
        icon={<i className="icon-apple" style={{fontSize: 24, color: '#777', marginTop: -3}} />}
      />
      <BottomNavigationItem
        label="Upgrade"
        onClick={() => {}}
        icon={<UpgradeIcon />}
      />
      <BottomNavigationItem
        label="Native"
        onClick={() => {}}
        icon={<SmartPhoneIcon />}
      />
      <BottomNavigationItem
        label="Eject"
        onClick={() => {}}
        icon={<EjectIcon />}
      />
    </BottomNavigation>
  </Paper>
);

export default AppBottomBar;
