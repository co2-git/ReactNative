// @flow
import React, {PureComponent} from 'react';

export default class XRoute extends PureComponent<$XRouteProps, $XRouteState> {
  static getDerivedStateFromProps(nextProps: $XRouteProps, prevState: $XRouteState): ?$XRouteState {
    if (
      nextProps.index === nextProps.routeIndex &&
      prevState.status === 'off'
    ) {
      return {status: 'entering'};
    }
    if (
      nextProps.transitionned === nextProps.routeIndex &&
      prevState.status === 'entering'
    ) {
      return {status: 'transitionned'};
    }
    return null;
  }
  state = {
    status: this.props.index === this.props.routeIndex ? 'transitionned' : 'off',
  };
  render = () => (
    <div>
      {this.state.status === 'off' && (
        <div>OFF</div>
      )}
      {this.state.status === 'entering' && (
        <div>ENTER</div>
      )}
      {this.state.status === 'transitionned' && (
        <div>
          <this.props.component {...this.props.componentProps} />
        </div>
      )}
    </div>
  );
}
