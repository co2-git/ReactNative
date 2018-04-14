import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'reactors';
import {Column as FlexColumn, Row} from 'reactors-flex';
import {connect} from 'react-redux';
import Button from 'reactors-button';
import Input from 'reactors-input';

import * as bundleActions from '../redux/actions/bundleActions';
import * as stylesMixins from '../styles/mixins';

class Bundle extends PureComponent {
  state = {
    entryFile: 'index.js',
    bundleOutput: 'bundle.js',
  };
  render = () => (
    <View>
      <Row flexBetween>
        <Text>Assets dest</Text>
        <Input />
      </Row>

      <Row flexBetween>
        <Text>Bundle encoding</Text>
        <Input />
      </Row>

      <Row flexBetween>
        <Text>Bundle output</Text>
        <Input
          placeholder="Bundle output"
          value={this.state.bundleOutput}
          onChangeText={bundleOutput => this.setState({bundleOutput})}
        />
      </Row>

      <Row flexBetween>
        <Text>Config</Text>
        <Input />
      </Row>

      <Row flexBetween>
        <Text>Dev</Text>
        <input type="checkbox" />
      </Row>

      <Row flexBetween>
        <Text>Entry file</Text>
        <Input
          placeholder="Entry file"
          value={this.state.entryFile}
          onChangeText={entryFile => this.setState({entryFile})}
        />
      </Row>

      <Row flexBetween>
        <Text>Max workers</Text>
        <Input number />
      </Row>

      <Row flexBetween>
        <Text>Platform</Text>
        <select>
          <option>android</option>
          <option>ios</option>
        </select>
      </Row>

      <Row flexBetween>
        <Text>Read global cache</Text>
        <input type="checkbox" />
      </Row>

      <Row flexBetween>
        <Text>Reset cache</Text>
        <input type="checkbox" />
      </Row>

      <Row flexBetween>
        <Text>Sourcemap output</Text>
        <Input />
      </Row>

      <Row flexBetween>
        <Text>Sourcemap sources root</Text>
        <Input />
      </Row>

      <Row flexBetween>
        <Text>Sourcemap use absolute path</Text>
        <input type="checkbox" />
      </Row>

      <Row flexBetween>
        <Text>Transformer</Text>
        <Input />
      </Row>

      <Row flexBetween>
        <Text>Verbose</Text>
        <input type="checkbox" />
      </Row>

      <Row flexCenter style={{padding: 16}}>
        <Button
          disabled={this.props.bundle.status === 'IN_PROGRESS'}
          onPress={() => bundleActions.bundleRequest(this.state)}
          style={stylesMixins.primaryButton()}
        >
          Create bundle
        </Button>
      </Row>

      <View style={styles.terminal}>
        {this.props.bundle.output.map((data, index) => (
          <Text key={index} style={styles.terminalOutput}>{data.message}</Text>
        ))}
      </View>
    </View>
  );
}

const selector = state => {
  return {bundle: state.bundle};
}

export default connect(selector)(Bundle);

const styles = new StyleSheet({
  terminal: {
    backgroundColor: '#000',
    padding: 8,
  },
  terminalOutput: {
    color: '#fff',
  },
});
