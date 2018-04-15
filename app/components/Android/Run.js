// @flow
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import AndroidIcon from 'material-ui/svg-icons/action/android';
import IconButton from 'material-ui/IconButton';
import open from 'open';
import RaisedButton from 'material-ui/RaisedButton';
import React, {PureComponent} from 'react';

import {adjustWithCard} from '../../styles/vars/metrics';
import {lightInfoMessage, linkStyle} from '../../styles/main';
import AndroidRunOptions from './RunOptions';
import Animated from '../Base/Animated';
import Terminal from '../Terminal/Console';

class RunAndroid extends PureComponent<$RunAndroidProps, $RunAndroidState> {
  state = {
    options: {},
    running: false,
    showTerminal: false,
  };
  terminal: Terminal;
  render = () => (
    <Animated rubberBand>
      <Card>
        <CardHeader
          actAsExpander
          avatar={<IconButton><AndroidIcon /></IconButton>}
          showExpandableButton
          subtitle="Install your app on Android device (or emulator)"
          title="Run Android"
        />
        <CardText expandable>
          <AndroidRunOptions
            onChange={this.onChangeOption}
          />
        </CardText>
        <CardActions>
          <div style={{marginLeft: adjustWithCard}}>
            <RaisedButton
              primary={!this.state.running}
              secondary={this.state.running}
              label={this.state.running ? 'Stop' : 'Run'}
              onClick={this.onActionClick}
            />
            {this.state.running && (
              <span>
                <span style={lightInfoMessage}>
                  Might not always terminate sub shells
                </span>
                <span style={linkStyle} onClick={this.seeBug1}>
                  See issue
                </span>
              </span>
            )}
          </div>
        </CardActions>
        <CardText>
          {this.state.showTerminal && (
            <Terminal
              command={this.makeCommand()}
              cwd={this.props.app.path}
              onVerifyDone={this.onVerifyDone}
              onDone={() => this.setState({running: false})}
              onFail={() => this.setState({running: false})}
              ref={(terminal) => {
                if (!this.terminal && terminal) {
                  this.terminal = terminal;
                }
              }}
            />
          )}
        </CardText>
      </Card>
    </Animated>
  );
  onActionClick = () => {
    if (this.state.running) {
      this.terminal.stop();
      setTimeout(() => {
        this.setState({running: false});
      }, 1500);
    } else if (this.state.showTerminal) {
      this.setState({showTerminal: false}, () => {
        setTimeout(() => {
          this.setState({running: true, showTerminal: true});
        }, 500);
      });
    } else {
      this.setState({running: true, showTerminal: true});
    }
  };
  onChangeOption = (key: string, option: $CliOptions, value: $AnyPrimitive) => this.setState({
    options: {
      ...this.state.options,
      [key]: value,
    },
  });
  onVerifyDone = (output: $Output[]): Promise<void> => new Promise(async (resolve, reject) => {
    const messages = [];
    for (const singleOutput of output) {
      messages.push(singleOutput.message);
    }
    if (
      /FAILURE: Build failed with an exception/.test(messages.join('')) ||
      /BUILD FAILED/.test(messages.join(''))
    ) {
      reject(new Error('Build failed'));
    }
    resolve();
  });
  makeCommand = (): string => {
    const cmd = 'react-native run-android';
    const options = [];
    for (const option in this.state.options) {
      if (typeof this.state.options[option] === 'boolean') {
        options.push(`--${option}`);
      } else {
        options.push(`--${option} "${this.state.options[option]}"`);
      }
    }
    return `${cmd} ${options.join(' ')}`;
  };
  seeBug1 = () => open('https://github.com/co2-git/ReactNative/issues/35');
}

export default RunAndroid;
