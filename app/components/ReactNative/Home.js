import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import Router from 'reactors-router';
import {Dimensions} from 'reactors';

import Info from './Info';
import Config from './Config';
import Upgrade from './Upgrade';


const ReactNative = ({app}) => (
  <div>
    <Tabs onChange={value => Router.get(`${app.path}-react-native`).go(value)}>
      <Tab label="Info" value="Info" />
      <Tab label="Config" value="Config" />
      <Tab label="Upgrade" value="Upgrade" />
    </Tabs>
    <Router
      name={`${app.path}-react-native`}
      width={Dimensions.get('window').width}
    >
      <Router.Route name="Info">
        <Info app={app} />
      </Router.Route>
      <Router.Route name="Config">
        <Config />
      </Router.Route>
      <Router.Route name="Upgrade">
        <Upgrade />
      </Router.Route>
    </Router>
  </div>
);

export default ReactNative;
