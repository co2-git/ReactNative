// @flow
import findIndex from 'lodash/findIndex';
import LogIcon from 'material-ui/svg-icons/content/content-paste';
import PackageIcon from 'material-ui/svg-icons/content/archive';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import React, {PureComponent} from 'react';
import SwipeableViews from 'react-swipeable-views';

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
    <div>
      <Row between>
        <IconWithLabel
          icon={<PlayIcon color="#777" />}
          label="Run"
          onClick={() => this.selectIndex(0)}
        />
        <IconWithLabel
          icon={<LogIcon color="#777" />}
          label="Logs"
          onClick={() => this.selectIndex(1)}
        />
        <IconWithLabel
          icon={<PackageIcon color="#777" />}
          label="APKs"
          onClick={() => this.selectIndex(2)}
        />
      </Row>
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
