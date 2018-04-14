import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'reactors';
import * as Flex from 'reactors-flex';
import {connect} from 'react-redux';
import Button from 'reactors-button';
import Input from 'reactors-input';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import * as metroActions from '../../redux/actions/metroActions';

// const Other = () => (
//   <View>
//     <TextField
//       id="port"
//       value={this.state.port}
//       onChange={event => this.setState({port: Number(event.target.value)})}
//       hintText="Port"
//     />
//     <RaisedButton
//       label="Start"
//       primary
//       onClick={() => metroActions.startMetroRequest({
//         app: this.props.app,
//         port: this.props.metroOptions.port,
//       })}
//     />
//   </View>
//   <Flex.Row>
//     <Text>Status</Text>
//     <Text>{this.props.metroStatus.state}</Text>
//   </Flex.Row>
//
//   <View style={styles.terminal}>
//     {this.props.metroOutput.map((data, index) => (
//       <Text key={index} style={styles.terminalOutput}>{data.message}</Text>
//     ))}
//   </View>
// )

class Metro extends PureComponent {
  state = {port: 8081};
  render = () => (
    <Card expanded={false} onExpandChange={() => {}}>
      <CardHeader
        title="Start"
        subtitle="Metro Bundle Packager"
        actAsExpander
        showExpandableButton
      />
      <CardText>
        Hello
      </CardText>
    </Card>
  );
}

const selector = state => {
  return {metroStatus: state.metroStatus, metroOutput: state.metroOutput, metroOptions: state.metroOptions};
}

export default connect(selector)(Metro);

const styles = new StyleSheet({
  terminal: {
    backgroundColor: '#000',
  },
  terminalOutput: {
    color: '#fff',
  },
});
