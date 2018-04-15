// @flow
import LogIcon from 'material-ui/svg-icons/content/content-paste';
import PackageIcon from 'material-ui/svg-icons/content/archive';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import React, {PureComponent} from 'react';
import SwipeableViews from 'react-swipeable-views';

import {gutter} from '../../styles/vars/metrics';
import AndroidLogs from './Logs';
import IconWithLabel from '../Base/IconWithLabel';
import Row from '../FlexBox/Row';
import RunAndroid from './Run';

class AndroidHome extends PureComponent<$AndroidHomeProps, $AndroidHomeState> {
  state = {
    index: 0,
  };
  render = () => (
    <div style={{margin: gutter}}>
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
      <SwipeableViews
        index={this.state.index}
      >
        <RunAndroid app={this.props.app} />
        <AndroidLogs app={this.props.app} />
      </SwipeableViews>
    </div>
  );
  selectIndex = (index: number) => this.setState({index});
}

export default AndroidHome;
