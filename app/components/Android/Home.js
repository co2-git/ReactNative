// @flow
import findIndex from 'lodash/findIndex';
import LogIcon from 'material-ui/svg-icons/content/content-paste';
import PackageIcon from 'material-ui/svg-icons/content/archive';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import React, {PureComponent} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

import AndroidLogs from './Logs';
import APKs from './APKs';
import config from '../../../config.json';
import IconWithLabel from '../Base/IconWithLabel';
import Row from '../FlexBox/Row';
import RunAndroid from './Run';
import XRouter from '../Router/XRouter';
import XRoute from '../Router/XRoute';

const Loading = () => (
  <div>
    Loading...
  </div>
);

class AndroidHome extends PureComponent {
  state = {index: 0};
  render = () => (
    <div style={{margin: 12}}>
      <BottomNavigation selectedIndex={this.state.index} style={{marginBottom: 12}}>
        <BottomNavigationItem
          label="Run"
          onClick={() => this.selectIndex(0)}
          icon={<PlayIcon />}
        />
        <BottomNavigationItem
          label="Logs"
          onClick={() => this.selectIndex(1)}
          icon={<LogIcon />}
        />
        <BottomNavigationItem
          label="APKs"
          onClick={() => this.selectIndex(2)}
          icon={<PackageIcon />}
        />
      </BottomNavigation>
      <XRouter index={this.state.index}>
        <XRoute
          routeIndex={0}
          component={RunAndroid}
          componentProps={{app: this.props.app}}
        />
        <XRoute
          routeIndex={1}
          component={AndroidLogs}
          componentProps={{app: this.props.app}}
        />
        <XRoute
          routeIndex={2}
          component={APKs}
          componentProps={{app: this.props.app}}
        />
      </XRouter>
    </div>
  );
  selectIndex = (index: number) => this.setState({index});
}

export default AndroidHome;
