// @flow
import {connect} from 'react-redux';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import AppBar from './AppBar';
import AppBottomBar from './AppBottomBar';
import Info from '../ReactNative/Info';
import Page from '../Layout/Page';

const App = ({app, index}: $AppProps) => (
  <Page style={{display: 'flex', flexDirection: 'column'}}>
    <div style={{flexShrink: 0}}>
      <AppBar app={app} />
    </div>
    <div style={{flexGrow: 2, overflow: 'auto'}}>
      <SwipeableViews index={index}>
        <div>
          <Info app={app} />
        </div>
        <div>
          Start
        </div>
        <div>
          Android
        </div>
        <div>
          iOS
        </div>
        <div>
          Upgrade
        </div>
        <div>
          Native
        </div>
        <div>
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
