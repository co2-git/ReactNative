import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import Router from 'reactors-router';
import {Dimensions} from 'reactors';

import Install from './Install';
import Uninstall from './Uninstall';
import Link from './Link';
import Unlink from './Unlink';
import NewLibrary from './NewLibrary';

const IOS = ({app}) => (
  <div>
    <Tabs onChange={value => Router.get(`${app.path}-native-modules`).go(value)}>
      <Tab label="Install" value="Install" />
      <Tab label="Uninstall" value="Uninstall" />
      <Tab label="Link" value="Link" />
      <Tab label="Unlink" value="Unlink" />
      <Tab label="New library" value="New library" />
    </Tabs>
    <Router
      name={`${app.path}-native-modules`}
      width={Dimensions.get('window').width}
    >
      <Router.Route name="Install">
        <Install app={app} />
      </Router.Route>
      <Router.Route name="Uninstall">
        <Uninstall app={app} />
      </Router.Route>
      <Router.Route name="Link">
        <Link app={app} />
      </Router.Route>
      <Router.Route name="Unlink">
        <Unlink app={app} />
      </Router.Route>
      <Router.Route name="New library">
        <NewLibrary app={app} />
      </Router.Route>
    </Router>
  </div>
);

export default IOS;
