import React, {PureComponent} from 'react';
import {Column, Row} from 'reactors-flex';
import {Text, View} from 'reactors';
import Icon from 'reactors-icons';
import {connect} from 'react-redux';
import map from 'lodash/map';
import path from 'path';
import Router from 'reactors-router';
import Divider from 'material-ui/Divider';

import * as appsActions from '../../redux/actions/appsActions';
import AppTabLink from './AppTabLink';

const AppsBar = ({apps, selectedApp}) => (
  <View>
    <Row style={styles.container}>
      <View style={styles.tabPlus}>
        <Icon
          name="plus"
          onPress={() => appsActions.openApp(null, path => Router.get('Main').go(path))}
          style={{padding: 5, cursor: 'pointer', fontSize: 16}}
        />
      </View>
      {map(apps, app => (
        <AppTabLink key={app.path} app={app} selected={app.path === selectedApp} />
      ))}
    </Row>
    <Divider />
  </View>
);

const selector = state => ({
  selectedApp: state.selected.app,
  apps: state.apps,
});

export default connect(selector)(AppsBar);

const styles = {
  container: {
    alignItems: 'center',
  },
  tabPlus: {
    border: '1px solid #555',
    borderBottomWidth: 0,
    padding: 6,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
};
