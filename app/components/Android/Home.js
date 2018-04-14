import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import Router from 'reactors-router';
import {Dimensions} from 'reactors';

import Run from './Run';
import Log from './Log';


const Android = ({app}) => (
  <div>
    <Tabs onChange={value => Router.get(`${app.path}-android`).go(value)}>
      <Tab label="Run" value="Run" />
      <Tab label="Log" value="Log" />
    </Tabs>
    <Router
      name={`${app.path}-android`}
      width={Dimensions.get('window').width}
    >
      <Router.Route name="Run">
        <Run app={app} />
      </Router.Route>
      <Router.Route name="Log">
        <Log />
      </Router.Route>
    </Router>
  </div>
);

export default Android;
