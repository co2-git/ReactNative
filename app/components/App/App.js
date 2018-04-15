// @flow
import {connect} from 'react-redux';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import {appMainStyle, appTabStyle, appTopBarStyle} from '../../styles/main';
import AndroidHome from '../Android/Home';
import AppBar from './AppBar';
import AppBottomBar from './AppBottomBar';
import Info from '../ReactNative/Info';
import Page from '../Layout/Page';

const App = ({app, index}: $AppProps) => (
  <Page style={{display: 'flex', flexDirection: 'column'}}>
    <div style={appTopBarStyle}>
      <AppBar app={app} />
    </div>
    <div style={appMainStyle}>
      <SwipeableViews index={index}>
        <div style={appTabStyle}>
          <Info app={app} />
        </div>
        <div style={appTabStyle}>
          Start
        </div>
        <div style={appTabStyle}>
          <AndroidHome app={app} />
        </div>
        <div style={appTabStyle}>
          iOS
        </div>
        <div style={appTabStyle}>
          Upgrade
        </div>
        <div style={appTabStyle}>
          Native
        </div>
        <div style={appTabStyle}>
          Eject
        </div>
      </SwipeableViews>
    </div>
    <AppBottomBar app={app} />
  </Page>
);

const selector = (state: $State, props: $AppOwnProps): $AppConnectProps => ({
  index: state.appRouterIndex[props.app.path] || 0,
});

export default connect(selector)(App);
