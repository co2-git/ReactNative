import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'reactors';
import {Column as FlexColumn, Row as FlexRow} from 'reactors-flex';
import {connect} from 'react-redux';
import Button from 'reactors-button';
import Input from 'reactors-input';

import * as metroActions from '../redux/actions/metroActions';

class Unbundle extends PureComponent {
  state = {
    port: 8081,
  };
  render = () => (
    <View>
      <FlexRow>
        <Text>Output file</Text>
        <Input />
      </FlexRow>
      <Button>Create bundle</Button>
    </View>
  );
}

const selector = state => {
  return {metroStatus: state.metroStatus, metroOutput: state.metroOutput, metroOptions: state.metroOptions};
}

export default connect(selector)(Unbundle);

const styles = new StyleSheet({
  terminal: {
    backgroundColor: '#000',
  },
  terminalOutput: {
    color: '#fff',
  },
});
