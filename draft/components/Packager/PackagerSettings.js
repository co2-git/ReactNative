import React, {PureComponent} from 'react';
import TextField from 'material-ui/TextField';
import {Column, Row} from 'reactors-flex';

class PackagerSettings extends PureComponent {
  state = {
    port: 8081,
    host: '127.0.0.1',
  };
  render = () => (
    <div style={{margin: 12, marginRight: 24, marginLeft: 0}}>
      <Row flexBetween>
        <TextField
          hintText="Port"
          value={this.state.port}
          onChange={this.onChangePort}
          floatingLabelText="Port"
        />
        <TextField
          hintText="Host"
          value={this.state.host}
          onChange={this.onChangeHost}
          floatingLabelText="Host"
        />
      </Row>
    </div>
  );
  onChangePort = event => this.setState({port: Number(event.target.value)});
  onChangeHost = event => this.setState({host: event.target.value});
}

export default PackagerSettings;
