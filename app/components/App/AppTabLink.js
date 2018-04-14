import React from 'react';
import {Text} from 'reactors';
import {Column, Row} from 'reactors-flex';
import Icon from 'reactors-icons';
import path from 'path';
import Router from 'reactors-router';

import * as appsActions from '../../redux/actions/appsActions';

const AppTabLink = ({app, selected}) => (
  <Row style={[styles.container, selected && styles.selected]}>
    <Text
      onClick={() => Router.get('Main').go(app.path)}
    >
      {path.basename(app.path)}
    </Text>
    <Icon name="cancel" onClick={() => appsActions.closeApp(app)} />
  </Row>
);

export default AppTabLink;

const styles = {
  container: {
    border: '1px solid #555',
    borderBottomWidth: 0,
    padding: 6,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  selected: {
    backgroundColor: 'white',
  },
};
