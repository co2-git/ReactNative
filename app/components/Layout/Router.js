// @flow
import {connect} from 'react-redux';
import map from 'lodash/map';
import React, {PureComponent} from 'react';

import App from '../App/App';
import Home from './Home';
import XRouter from '../Router/XRouter';
import XRoute from '../Router/XRoute';

class Router extends PureComponent<$RouterProps> {
  render = () => (
    <XRouter index={this.props.index}>
      <Home onToggleDrawer={this.props.onToggleDrawer} />
      {map(this.props.apps, (app, routeIndex) => (
        <XRoute
          key={app.path}
          routeIndex={routeIndex + 1}
          component={App}
          componentProps={{app}}
        />
      ))}
    </XRouter>
  );
}

const selector = (state: $State): $RouterConnectProps => ({
  apps: state.apps,
  index: state.routerIndex,
});

export default connect(selector)(Router);
