// @flow
import {connect} from 'react-redux';
import React, {PureComponent} from 'react';
import SwipeableViews from 'react-swipeable-views';

import {appMainStyle, appTabStyle, appTopBarStyle} from '../../styles/main';
import {switchingAppRoute, switchedAppRoute} from '../../redux/actions/routerActions';
import AndroidHome from '../Android/Home';
import AppBar from './AppBar';
import AppBottomBar from './AppBottomBar';
import Info from '../ReactNative/Info';
import Page from '../Layout/Page';
import XRouter from '../Router/XRouter';
import XRoute from '../Router/XRoute';

class App extends PureComponent<$AppProps> {
  componentDidMount = () => {
    console.log(`APP ${this.props.app.path} MOUNTED`)
  };
  render = () => (
    <Page style={{display: 'flex', flexDirection: 'column'}}>
      <div style={appTopBarStyle}>
        <AppBar app={this.props.app} />
      </div>
      <div style={appMainStyle}>
        <XRouter index={this.props.index}>
          <XRoute
            routeIndex={0}
            component={Info}
            componentProps={{app: this.props.app}}
            style={appTabStyle}
          />
          <XRoute
            routeIndex={1}
            component={() => <div>Start</div>}
            componentProps={{app: this.props.app}}
            style={appTabStyle}
          />
          <XRoute
            routeIndex={2}
            component={AndroidHome}
            componentProps={{app: this.props.app}}
            style={appTabStyle}
          />
          <XRoute
            routeIndex={3}
            component={() => <div>iOS</div>}
            componentProps={{app: this.props.app}}
            style={appTabStyle}
          />
          <XRoute
            routeIndex={4}
            component={() => <div>Upgrade</div>}
            componentProps={{app: this.props.app}}
            style={appTabStyle}
          />
          <XRoute
            routeIndex={5}
            component={() => <div>Native</div>}
            componentProps={{app: this.props.app}}
            style={appTabStyle}
          />
          <XRoute
            routeIndex={6}
            component={() => <div>Eject</div>}
            componentProps={{app: this.props.app}}
            style={appTabStyle}
          />
        </XRouter>
      </div>
      <AppBottomBar app={this.props.app} />
    </Page>
  );
}

const selector = (state: $State, props: $AppBottomOwnProps): $AppBottomBarConnectProps => ({
  index: state.appRouterIndex[props.app.path] || 0,
});

export default connect(selector)(App);
