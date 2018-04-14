// @flow
import React, {PureComponent} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {connect} from 'react-redux';
import map from 'lodash/map';

import App from '../App/App';
import Home from './Home';

class Router extends PureComponent<$RouterProps> {
  render = () => (
    <SwipeableViews index={this.props.index}>
      <Home onToggleDrawer={this.props.onToggleDrawer} />
      {map(this.props.apps, app => (
        <App key={app.path} app={app} />
      ))}
    </SwipeableViews>
  );
}

const selector = (state: $State): $RouterConnectProps => ({
  apps: state.apps,
  index: state.routerIndex,
});

export default connect(selector)(Router);
