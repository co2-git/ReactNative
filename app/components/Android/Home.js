// @flow
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {connect} from 'react-redux';
import LogIcon from 'material-ui/svg-icons/content/content-paste';
import PackageIcon from 'material-ui/svg-icons/content/archive';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import React from 'react';

import {switchAndroidRoute} from '../../redux/actions/routerActions';
import AndroidLogs from './Logs';
import APKs from './APKs';
import RunAndroid from './Run';
import XRoute from '../Router/XRoute';
import XRouter from '../Router/XRouter';

const AndroidHome = ({app, index}: $AndroidHomeProps) => (
  <div style={{margin: 12}}>
    <div>
      <BottomNavigation selectedIndex={index} style={{marginBottom: 12}}>
        <BottomNavigationItem
          label="Run"
          onClick={() => switchAndroidRoute(app, 0)}
          icon={<PlayIcon />}
        />
        <BottomNavigationItem
          label="Logs"
          onClick={() => switchAndroidRoute(app, 1)}
          icon={<LogIcon />}
        />
        <BottomNavigationItem
          label="APKs"
          onClick={() => switchAndroidRoute(app, 2)}
          icon={<PackageIcon />}
        />
      </BottomNavigation>
    </div>
    <div>
      <XRouter index={index}>
        <XRoute
          routeIndex={0}
          component={RunAndroid}
          componentProps={{app}}
        />
        <XRoute
          routeIndex={1}
          component={AndroidLogs}
          componentProps={{app}}
        />
        <XRoute
          routeIndex={2}
          component={APKs}
          componentProps={{app}}
        />
      </XRouter>
    </div>
  </div>
);

const selector = (state, props) => ({
  index: state.androidRouterIndex[props.app.path] || 0,
});

export default connect(selector)(AndroidHome);
