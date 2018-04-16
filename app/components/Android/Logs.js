// @flow
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import React, {PureComponent} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

import {gutter} from '../../styles/vars/metrics';
import Row from '../FlexBox/Row';
import Terminal from '../Terminal/Console';

class AndroidLogs extends PureComponent<$AndroidLogsProps, $AndroidLogsState> {
  terminal: Terminal;
  state = {
    level: 'all',
    running: false,
    showTerminal: false,
  };
  render = () => (
    <Card>
      <CardHeader
        title="Logs"
        subtitle="Android logs"
      />
      <CardActions>
        <Row alignY="center">
          <RaisedButton
            primary={!this.state.running}
            secondary={this.state.running}
            label={this.state.running ? 'Stop' : 'Start'}
            onClick={this.onToggleStart}
          />
          {this.state.showTerminal && (
            <SelectField
              floatingLabelText="Log level"
              value={this.state.level}
              onChange={(
                event: SyntheticUIEvent<HTMLSelectElement>,
                index: number,
                value: $LogLevel,
              ) => this.changeLogLevel(value)}
              style={{marginLeft: gutter}}
            >
              <Subheader>Log level</Subheader>
              <MenuItem value="all" primaryText="All" />
              <MenuItem value="info" primaryText="Info" />
              <MenuItem value="warn" primaryText="Warnings" />
              <MenuItem value="error" primaryText="Errors" />
              <MenuItem value="fatal" primaryText="Fatal errors" />
            </SelectField>
          )}
        </Row>
      </CardActions>
      <CardText>
        {this.state.showTerminal && (
          <Terminal
            command={this.makeCommand()}
            ref={(terminal) => {
              if (!this.terminal && terminal) {
                this.terminal = terminal;
              }
            }}
            onDone={() => this.setState({running: false})}
            onFail={() => this.setState({running: false})}
          />
        )}
      </CardText>
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
  changeLogLevel = (level: $LogLevel) => {
    this.terminal.stop();
    setTimeout(() => {
      this.setState({showTerminal: false, level}, () => {
        setTimeout(() => {
          this.setState({showTerminal: true, running: true});
        }, 500);
      });
    }, 750);
  };
  makeCommand = (): string => {
    let command = 'adb logcat --dividers *:';
    switch (this.state.level) {
      case 'all':
      default:
        command += '*';
        break;
      case 'info':
        command += 'I';
        break;
      case 'warn':
        command += 'W';
        break;
      case 'error':
        command += 'E';
        break;
      case 'fatal':
        command += 'F';
        break;
    }
    return command;
  };
}

export default AndroidLogs;
