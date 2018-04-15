// @flow
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import React, {PureComponent} from 'react';

import {gutter} from '../../styles/vars/metrics';
import * as colors from '../../styles/vars/colors';
import LogLevelToggle from './LogLevelToggle';
import Row from '../FlexBox/Row';
import Terminal from '../Terminal/Console';

class AndroidLogs extends PureComponent<$AndroidLogsProps, $AndroidLogsState> {
  terminal: Terminal;
  state = {
    errors: true,
    fatal: true,
    info: false,
    running: false,
    showTerminal: false,
    warnings: true,
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
                onToggle={(
                  event: SyntheticUIEvent<HTMLInputElement>,
                  checked: boolean,
                ) => {
                  this.changeLogLevel({info: checked});
                }}
                label="Info"
                value={this.state.info}
                color={colors.infoColor}
              />
              <LogLevelToggle
                onToggle={(
                  event: SyntheticUIEvent<HTMLInputElement>,
                  checked: boolean,
                ) => {
                  this.changeLogLevel({warnings: checked});
                }}
                label="Warnings"
                value={this.state.warnings}
                color={colors.warningColor}
              />
              <LogLevelToggle
                onToggle={(
                  event: SyntheticUIEvent<HTMLInputElement>,
                  checked: boolean,
                ) => {
                  this.changeLogLevel({errors: checked});
                }}
                label="Errors"
                value={this.state.errors}
                color={colors.errorColor}
              />
              <LogLevelToggle
                onToggle={(
                  event: SyntheticUIEvent<HTMLInputElement>,
                  checked: boolean,
                ) => {
                  this.changeLogLevel({fatal: checked});
                }}
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
  changeLogLevel = (level: $LevelChanger) => {
    this.terminal.stop();
    setTimeout(() => {
      this.setState({showTerminal: false, ...level}, () => {
        setTimeout(() => {
          this.setState({showTerminal: true, running: true});
        }, 500);
      });
    }, 750);
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
    if (this.state.fatal) {
      command += 'F';
    }
    return command;
  };
}

export default AndroidLogs;
