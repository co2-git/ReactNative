// @flow
import {connect} from 'react-redux';
import React, {PureComponent} from 'react';

import {gutter} from '../../styles/vars/metrics';

const Route = (
  Component: () => React$Element<*>,
  routeProps: $RouteConfig,
) => connect(routeProps.selector)(
  class BaseRoute extends PureComponent<$BaseRouteProps, $BaseRouteState> {
    static index = routeProps.index;
    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.index === BaseRoute.index && !prevState.readyToLoad && prevState.mounted) {
        return {readyToLoad: true};
      }
      if (
        nextProps.index === BaseRoute.index &&
        nextProps.status.switched &&
        !prevState.loaded
      ) {
        return {loaded: true};
      }
      return null;
    }
    state = {
      loaded: false,
      mounted: false,
      readyToLoad: false,
    };
    componentDidMount = () => {
      this.setState({mounted: true});
    };
    render = () => (
      <div style={{margin: gutter}}>
        <div>
          {!this.state.loaded && typeof routeProps.loading === 'function' && (
            <routeProps.loading />
          )}
        </div>
        <div>
          {!this.state.loaded && typeof routeProps.loading !== 'function' && (
            <div>Loading</div>
          )}
        </div>
        <div>
          {this.state.loaded && (
            <Component />
          )}
        </div>
      </div>
    );
  },
);

export default Route;
