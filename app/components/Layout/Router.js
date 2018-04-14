// @flow
import React, {PureComponent} from 'react';
import SwipeableViews from 'react-swipeable-views';

import Home from './Home';

class Router extends PureComponent<$RouterProps, $RouterState> {
  state = {
    index: 0,
  };
  render = () => (
    <SwipeableViews index={this.state.index}>
      <Home onToggleDrawer={this.props.onToggleDrawer} />
    </SwipeableViews>
  );
}

export default Router;
