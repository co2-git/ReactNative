import React from 'react';
import {Dimensions, Image, Text, View} from 'reactors';
import * as Flex from 'reactors-flex';
import Router from 'reactors-router';
import path from 'path';
import {connect} from 'react-redux';
import Icon from 'reactors-icons';

import Start from './Start';
import Bundle from './Bundle';
import Unbundle from './Unbundle';
// import Icon from '../../assets/react-native-icon.png';
// import Folder from '../../assets/folder.png';
import Info from '../../package.json';
import * as mainActions from '../redux/actions/mainActions';
import PackagerStatus from './PackagerStatus';

const commands = [
  {name: 'bundle', active: true},
  {name: 'eject'},
  {name: 'help'},
  {name: 'info'},
  {name: 'install'},
  {name: 'link'},
  {name: 'log-android'},
  {name: 'log-ios'},
  {name: 'new-library'},
  {name: 'run-android'},
  {name: 'run-ios'},
  {name: 'start', active: true},
  {name: 'unbundle'},
  {name: 'uninstall'},
  {name: 'upgrade'},
];

const printAppName = (dir) => {
  const [name, base] = dir.split(/\//).reverse();
  return (
    <Flex.Row>
      <Text style={{fontStyle: 'italic', color: '#999', fontSize: '95%'}}>{base}/</Text>
      <Text style={{fontWeight: 'bold', fontSize: '120%'}}>{name}</Text>
    </Flex.Row>
  );
}

const getPackageVersion = (name) => {
  // const pkg = require(path.join(process.cwd(), 'package.json'));
  // return pkg.dependencies[name];
};

const Home = props => (
  <View style={{backgroundColor: '#efefef'}}>
    <Flex.Row>
      <Icon name="folder" style={{width: 24, height: 24}} />
    </Flex.Row>
    <Flex.Row flexBetween flexCenterVertical style={{padding: 8}}>
      <Flex.Row flexCenter>
        <Icon name="mobile" style={{width: 24, height: 24}} />
        <Text style={{fontStyle: 'italic', paddingLeft: 5}}>v{Info.version}</Text>
      </Flex.Row>
      <Flex.Column flexCenter>
        <Flex.Row flexCenter>
          <Text>{printAppName(props.main.dir)}</Text>
          <Icon
            name="folder"
            onPress={() => mainActions.changeDirRequest()}
            style={{padding: 5, cursor: 'pointer'}}
          />
        </Flex.Row>
        <Flex.Row>
          <Text style={{fontStyle: 'italic', color: '#999', fontSize: '90%'}}>
            react-native v{getPackageVersion('react-native')} react v{getPackageVersion('react')}
          </Text>
          <Text style={{fontWeight: 'bold', color: '#999', marginLeft: 10, cursor: 'pointer'}}>
            Update
          </Text>
        </Flex.Row>
      </Flex.Column>
    </Flex.Row>
    <Flex.Row style={{padding: 16}} flexCenter>
      <select onChange={(e) => Router.get('Main').go(e.target.value)}>
        {commands.map(command => (
          <option key={command.name} disabled={!command.active}>{command.name}</option>
        ))}
      </select>
    </Flex.Row>
    <PackagerStatus />
    <View
      style={{
        margin: 8,
        backgroundColor: 'white',
        padding: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      <Router name="Main" width={Dimensions.get('window').width - 32}>
        <Router.Route name="bundle">
          <Bundle />
        </Router.Route>
        <Router.Route name="start">
          <Start />
        </Router.Route>
        <Router.Route name="unbundle">
          <Unbundle />
        </Router.Route>
      </Router>
    </View>
  </View>
);

const selector = state => {
  console.log({state});
  return {main: state.main};
};

export default connect(selector)(Home);
