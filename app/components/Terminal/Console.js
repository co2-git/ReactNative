// @flow
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import {green800, redA700} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import DoneIcon from 'material-ui/svg-icons/action/done';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import map from 'lodash/map';
import OpenFolderIcon from 'material-ui/svg-icons/file/folder-open';
import React, {PureComponent} from 'react';
import stripAnsi from 'strip-ansi';
import TermIcon from 'material-ui/svg-icons/action/code';
import TextField from 'material-ui/TextField';

import {consoleStyle} from '../../styles/main';
import exec from '../../lib/exec';
import Row from '../FlexBox/Row';

class Terminal extends PureComponent<$TerminalProps, $TerminalState> {
  ps: $Emitter;
  state: $TerminalState = {
    code: null,
    command: '',
    done: false,
    error: null,
    output: [],
    pid: null,
  };
  componentDidMount = () => {
    const {command, ...options} = this.props;
    this.run(command, options);
  };
  componentDidUpdate = () => {
    const terminal = document.getElementById('terminal');
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight;
    }
  };
  componentWillUnmount = () => {
    this.ps.removeAllListeners('data');
    this.ps.removeAllListeners('error');
    this.ps.removeAllListeners('done');
    this.ps.removeAllListeners('failed');
    this.ps.emit('kill');
    this.ps = null;
  };
  render = () => (
    <Card initiallyExpanded>
      <CardHeader
        title={this.props.command}
        subtitle={this.makeSubtitle()}
        avatar={<TermIcon />}
        actAsExpander
        showExpandableButton
      />
      <CardActions style={{marginLeft: 12, marginRight: 12}}>
        {this.state.error && (
          <div>
            {this.state.error.message}
          </div>
        )}
        <Row between>
          <Chip>
            <Avatar>PID</Avatar>
            {this.state.pid}
          </Chip>
          {typeof this.state.code === 'number' && (
            <Chip
              backgroundColor={this.state.code === 0 ? green800 : redA700}
            >
              <Avatar
                backgroundColor={this.state.code === 0 ? green800 : redA700}
                icon={
                  this.state.code === 0 ? (
                    <DoneIcon />
                  ) : (
                    <ErrorIcon />
                  )
                }
              />
              {this.state.code > 0 && (
                <span style={{color: 'white'}}>{this.state.code}</span>
              )}
            </Chip>
          )}
          <Chip>
            <Avatar icon={<OpenFolderIcon />} />
            {this.props.cwd}
          </Chip>
        </Row>
      </CardActions>
      <CardText expandable>
        <div style={consoleStyle} id="terminal">
          {map(this.state.output, (output, index) => {
            const lines = stripAnsi(output.message).split('\n');
            return (
              <div key={index}>
                {map(lines, (line, lineIndex) => <div key={lineIndex}>{line}</div>)}
              </div>
            );
          })}
        </div>
        <TextField
          hintText="Run command"
          fullWidth
          value={this.state.command}
          onChange={event => this.setState({command: event.target.value})}
          onKeyDown={({keyCode}) => {
            if (keyCode === 13) {
              if (!this.state.done) {
                this.ps.emit('write', this.state.command);
                this.setState({command: ''});
              } else {
                const {cwd} = this.props;
                this.run(this.state.command, {cwd});
                this.setState({command: ''});
              }
            }
          }}
        />
      </CardText>
    </Card>
  );
  onKill = () => this.ps.emit('kill');
  run = (command, {cwd, inputHandlers = []}) => {
    this.ps = exec(command, {cwd});
    this.ps.on('pid', pid => this.setState({pid}));
    this.ps.on('data', data => this.setState({output: [...this.state.output, data]}, () => {
      for (const inputHandler of inputHandlers) {
        inputHandler(data.message, this.ps);
      }
    }));
    this.ps.on('error', (error) => {
      this.setState({error});
    });
    this.ps.on('done', async () => {
      if (typeof this.props.onVerifyDone === 'function') {
        try {
          await this.props.onVerifyDone(this.state.output);
          this.setState({done: true, code: 0}, () => {
            if (typeof this.props.onDone === 'function') {
              this.props.onDone(this.state.output);
            }
          });
        } catch (error) {
          this.setState({
            done: true,
            error: new Error('Status closed'),
            code: -1000,
          }, () => {
            if (typeof this.props.onFail === 'function') {
              this.props.onFail(-1000, this.state.output);
            }
          });
        }
      } else {
        this.setState({done: true, code: 0}, () => {
          if (typeof this.props.onDone === 'function') {
            this.props.onDone(this.state.output);
          }
        });
      }
    });
    this.ps.on('failed', code => this.setState({
      done: true,
      error: new Error('Status closed'),
      code,
    }, () => {
      if (typeof this.props.onFail === 'function') {
        this.props.onFail(code, this.state.output);
      }
    }));
  };
  makeSubtitle = (): string => {
    let message = 'Embedded terminal (';
    if (this.state.pid && !this.state.done) {
      message += 'Running';
    } else {
      message += 'Done';
      if (this.state.code !== 0) {
        message += ' with errors';
      }
    }
    message += ')';
    return message;
  }
  stop = () => {
    if (!this.state.done) {
      this.ps.emit('kill');
    }
  };
}

export default Terminal;
