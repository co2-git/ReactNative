import React, {PureComponent} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import Router from 'reactors-router';
import {Dimensions} from 'reactors';

import Start from './Start';

class Packager extends PureComponent {
  state = {index: 0};
  render = () => (
    <div>
      <Tabs
        onChange={() => {}}
        value={this.state.index}
      >
        <Tab label="Packager" value={0} />
        <Tab label="Bundle" value={1} />
        <Tab label="Unbundle" value={2} />
      </Tabs>
      <Router
        name={`${this.props.app.path}-packager`}
        width={Dimensions.get('window').width}
      >
        <Router.Route name="Packager">
          <Start app={this.props.app} />
        </Router.Route>
      </Router>
    </div>
  );
}

export default Packager;
