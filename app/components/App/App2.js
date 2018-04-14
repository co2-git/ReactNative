import {Column, Row} from 'reactors-flex';
import {Dimensions, Text, View} from 'reactors';
import AppBar from 'material-ui/AppBar';
import DropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Icon from 'reactors-icons';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import path from 'path';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Router from 'reactors-router';
import Packager from '../Packager/Home';
import ReactNative from '../ReactNative/Home';
import Android from '../Android/Home';
import IOS from '../IOS/Home';
import Expo from '../Expo/Home';
import NativeModules from '../NativeModules/Home';

import Commands from './Commands';
import Init from '../Command/Init';

const App = ({app}) => (
  <section>
    <AppBar
      title={path.basename(app.path)}
      iconElementLeft={(
        <IconButton>
          <NavigationBack />
        </IconButton>
      )}
      onLeftIconButtonClick={() => Router.get('main').go('index')}
      iconElementRight={(
        <IconMenu
          iconButtonElement={(
            <IconButton><DropDownIcon /></IconButton>
          )}
          onItemClick={(event, child) => Router.get(app.path).go(child.props.primaryText)}
        >
          <MenuItem primaryText="Packager" />
          <MenuItem primaryText="React Native" />
          <MenuItem primaryText="Android" />
          <MenuItem primaryText="iOS" />
          <MenuItem primaryText="Expo" />
          <MenuItem primaryText="Native modules" />
        </IconMenu>
      )}
    />
    <Router
      name={app.path}
      width={Dimensions.get('window').width}
      height={Dimensions.get('window').height - 80}
    >
      <Router.Route name="Packager">
        <Packager app={app} />
      </Router.Route>
      <Router.Route name="React Native">
        <ReactNative app={app} />
      </Router.Route>
      <Router.Route name="Android">
        <Android app={app} />
      </Router.Route>
      <Router.Route name="iOS">
        <IOS app={app} />
      </Router.Route>
      <Router.Route name="Expo">
        <Expo app={app} />
      </Router.Route>
      <Router.Route name="Native modules">
        <NativeModules app={app} />
      </Router.Route>
    </Router>
  </section>
);

export default App;
