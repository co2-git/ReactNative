// @flow
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import React, {PureComponent} from 'react';

import {gutter} from '../../styles/vars/metrics';
import * as colors from '../../styles/vars/colors';
import LogLevelToggle from './LogLevelToggle';
import Row from '../FlexBox/Row';
import Terminal from '../Terminal/Console';

class AndroidLogs extends PureComponent {
  terminal: Terminal;
  state = {
    info: false,
    warnings: false,
    errors: true,
    fatal: true,
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
        <RaisedButton
          primary={!this.state.running}
          secondary={this.state.running}
          label={this.state.running ? 'Stop' : 'Start'}
          onClick={this.onToggleStart}
        />
      </CardActions>
      <CardText>
        {this.state.showTerminal && (
          <div>
            <Row between style={{marginBottom: gutter}}>
              <LogLevelToggle
                label="Info"
                value={this.state.info}
                color={colors.infoColor}
              />
              <LogLevelToggle
                label="Warnings"
                value={this.state.warnings}
                color={colors.warningColor}
              />
              <LogLevelToggle
                label="Errors"
                value={this.state.errors}
                color={colors.errorColor}
              />
              <LogLevelToggle
                label="Fatal errors"
                value={this.state.fatal}
                color={colors.dangerColor}
              />
            </Row>
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
          </div>
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
  makeCommand = (): string => {
    let command = 'adb logcat --dividers *:';
    if (this.state.info) {
      command += 'I';
    }
    if (this.state.warnings) {
      command += 'W';
    }
    if (this.state.errors) {
      command += 'E';
    }
    if (this.state.fatals) {
      command += 'F';
    }
    return command;
  };
}

export default AndroidLogs;
