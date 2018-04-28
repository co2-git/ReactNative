// @flow
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {connect} from 'react-redux';
import LogIcon from 'material-ui/svg-icons/content/content-paste';
import PackageIcon from 'material-ui/svg-icons/content/archive';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import React from 'react';
import get from 'lodash/get';

import {switchPlatformRoute} from '../../redux/actions/routerActions';
import Logs from './Logs';
import Run from './Run';
import XRoute from '../Router/XRoute';
import XRouter from '../Router/XRouter';
import APKs from '../Android/APKs';

const PlatformHome = ({app, index, platform}: $PlatformHomeProps) => (
  <div style={{margin: 12}}>
    <div>
      <BottomNavigation selectedIndex={index} style={{marginBottom: 12}}>
        <BottomNavigationItem
          label="Run"
          onClick={() => switchPlatformRoute(platform, app, 0)}
          icon={<PlayIcon />}
        />
        <BottomNavigationItem
          label="Logs"
          onClick={() => switchPlatformRoute(platform, app, 1)}
          icon={<LogIcon />}
        />
        {platform === 'android' && (
          <BottomNavigationItem
            label="APKs"
            onClick={() => switchPlatformRoute(platform, app, 2)}
            icon={<PackageIcon />}
          />
        )}
      </BottomNavigation>
    </div>
    <div>
      <XRouter index={index}>
        <XRoute
          routeIndex={0}
          component={Run}
          componentProps={{app, platform}}
        />
        <XRoute
          routeIndex={1}
          component={Logs}
          componentProps={{app, platform}}
        />
        {platform === 'android' && (
          <XRoute
            routeIndex={2}
            component={APKs}
            componentProps={{app}}
          />
        )}
      </XRouter>
    </div>
  </div>
);

const selector = (state, props) => ({
  index: get(state.platformRouterIndex, `${props.app.path}.${props.platform}`, 0),
});

export default connect(selector)(PlatformHome);
