// @flow
import {Card, CardHeader, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import React, {PureComponent} from 'react';
import AndroidIcon from 'material-ui/svg-icons/action/android';
import IconButton from 'material-ui/IconButton';

import Row from '../FlexBox/Row';
import Terminal from '../Terminal/Console';

class PlatformLogs extends PureComponent<$PlatformLogsProps, $PlatformLogsState> {
  terminal: Terminal;
  state = {
    running: false,
    showTerminal: false,
  };
  render = () => (
    <Card>
      <CardHeader
        title="Logs"
        subtitle={`${this.props.platform === 'android' ? 'Android' : 'iOS'} Logs`}
        avatar={this.props.platform === 'Android' ? (
          <IconButton><AndroidIcon color="#777" /></IconButton>
        ) : (
          <i className="icon-apple" style={{fontSize: 24, color: '#777'}} />
        )}
      />
      <CardActions>
        <Row alignY="center">
          <RaisedButton
            primary={!this.state.running}
            secondary={this.state.running}
            label={this.state.running ? 'Stop' : 'Start'}
            onClick={this.onToggleStart}
          />
        </Row>
      </CardActions>
    </Card>
  );
  onToggleStart = () => {
    if (this.state.running) {
      this.setState({running: false}, () => {
        this.terminal.stop();
      });
    } else if (this.state.showTerminal) {
      this.setState({showTerminal: false}, () => {
        setTimeout(() => {
          this.setState({showTerminal: true, running: true});
        }, 500);
      });
    } else {
      this.setState({showTerminal: true, running: true});
    }
  };
}

export default PlatformLogs;
