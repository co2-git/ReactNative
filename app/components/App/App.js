// @flow
import {connect} from 'react-redux';
import React from 'react';

import {appMainStyle, appTabStyle, appTopBarStyle} from '../../styles/main';
import AndroidHome from '../Android/Home';
import AppBar from './AppBar';
import AppBottomBar from './AppBottomBar';
import Info from '../ReactNative/Info';
import Page from '../Layout/Page';
import XRouter from '../Router/XRouter';
import XRoute from '../Router/XRoute';

const App = (props: $AppProps) => (
  <Page style={{display: 'flex', flexDirection: 'column'}}>
    <div style={appTopBarStyle}>
      <AppBar app={props.app} />
    </div>
    <div style={appMainStyle}>
      <XRouter index={props.index}>
        <XRoute
          routeIndex={0}
          component={Info}
          componentProps={{app: props.app}}
          style={appTabStyle}
        />
        <XRoute
          routeIndex={1}
          component={() => <div>Start</div>}
          componentProps={{app: props.app}}
          style={appTabStyle}
        />
        <XRoute
          routeIndex={2}
          component={AndroidHome}
          componentProps={{app: props.app}}
          style={appTabStyle}
        />
        <XRoute
          routeIndex={3}
          component={() => <div>iOS</div>}
          componentProps={{app: props.app}}
          style={appTabStyle}
        />
        <XRoute
          routeIndex={4}
          component={() => <div>Upgrade</div>}
          componentProps={{app: props.app}}
          style={appTabStyle}
        />
        <XRoute
          routeIndex={5}
          component={() => <div>Native</div>}
          componentProps={{app: props.app}}
          style={appTabStyle}
        />
        <XRoute
          routeIndex={6}
          component={() => <div>Eject</div>}
          componentProps={{app: props.app}}
          style={appTabStyle}
        />
      </XRouter>
    </div>
    <AppBottomBar app={props.app} />
  </Page>
);

const selector = (state: $State, props: $AppBottomOwnProps): $AppBottomBarConnectProps => ({
  index: state.appRouterIndex[props.app.path] || 0,
});

export default connect(selector)(App);
