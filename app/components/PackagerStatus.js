import React from 'react';
import {Text, View} from 'reactors';
import * as Flex from 'reactors-flex';
import {connect} from 'react-redux';
import Button from 'reactors-button';

import * as metroActions from '../redux/actions/metroActions';

const PackagerStatus = props => (
  <View>
    {props.metroStatus.state === 'started' && (
      <Flex.Row flexCenter>
        <Text>Packager started on port {props.metroOptions.port}</Text>
        <Button onPress={metroActions.stopMetroRequest}>Stop</Button>
      </Flex.Row>
    )}
  </View>
);

const selector = state => {
  return {metroStatus: state.metroStatus, metroOptions: state.metroOptions};
};

export default connect(selector)(PackagerStatus);
