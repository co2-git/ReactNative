import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import Router from 'reactors-router';
import {Dimensions} from 'reactors';

import Eject from './Eject';

const Expo = ({app}) => (
  <div>
    <Tabs onChange={value => Router.get(`${app.path}-expo`).go(value)}>
      <Tab label="Eject" value="Eject" />
    </Tabs>
    <Router
      name={`${app.path}-expo`}
      width={Dimensions.get('window').width}
    >
      <Router.Route name="Eject">
        <Eject app={app} />
      </Router.Route>
    </Router>
  </div>
);

export default Expo;
