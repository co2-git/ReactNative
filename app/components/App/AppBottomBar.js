// @flow
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {connect} from 'react-redux';
import AndroidIcon from 'material-ui/svg-icons/action/android';
import EjectIcon from 'material-ui/svg-icons/action/eject';
import InfoIcon from 'material-ui/svg-icons/action/info';
import Paper from 'material-ui/Paper';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import React from 'react';
import SmartPhoneIcon from 'material-ui/svg-icons/hardware/smartphone';
import UpgradeIcon from 'material-ui/svg-icons/notification/system-update';

import {switchAppRoute} from '../../redux/actions/routerActions';

const AppBottomBar = ({app, index}: $AppBottomBarProps) => (
  <Paper zDepth={1}>
    <BottomNavigation selectedIndex={index}>
      <BottomNavigationItem
        label="Info"
        onClick={() => switchAppRoute(app, 0)}
        icon={<InfoIcon />}
      />
      <BottomNavigationItem
        label="Start"
        onClick={() => switchAppRoute(app, 1)}
        icon={<PlayIcon />}
      />
      <BottomNavigationItem
        label="Android"
        onClick={() => switchAppRoute(app, 2)}
        icon={<AndroidIcon />}
      />
      <BottomNavigationItem
        label="iOS"
        onClick={() => switchAppRoute(app, 3)}
        icon={<i className="icon-apple" style={{fontSize: 24, color: '#777', marginTop: -3}} />}
      />
      <BottomNavigationItem
        label="Upgrade"
        onClick={() => switchAppRoute(app, 4)}
        icon={<UpgradeIcon />}
      />
      <BottomNavigationItem
        label="Native"
        onClick={() => switchAppRoute(app, 5)}
        icon={<SmartPhoneIcon />}
      />
      <BottomNavigationItem
        label="Eject"
        onClick={() => switchAppRoute(app, 6)}
        icon={<EjectIcon />}
      />
    </BottomNavigation>
  </Paper>
);

const selector = (state: $State, props: $AppBottomOwnProps): $AppBottomBarConnectProps => ({
  index: state.appRouterIndex[props.app.path] || 0,
});

export default connect(selector)(AppBottomBar);
