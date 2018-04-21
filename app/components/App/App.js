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
import Route from '../Layout/Route';

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
        <SwipeableViews
          index={this.props.index}
          onSwitching={() => switchingAppRoute(this.props.app, this.props.index)}
          onTransitionEnd={() => switchedAppRoute(this.props.app, this.props.index)}
        >
          <div style={appTabStyle}>
            <Info app={this.props.app} />
          </div>
          <div style={appTabStyle}>
            Start
          </div>
          <div style={appTabStyle}>
            <AndroidHome app={this.props.app} />
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
      <AppBottomBar app={this.props.app} />
    </Page>
  );
}

export default App;
