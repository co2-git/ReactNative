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

import {consoleStyle} from '../../styles/main';
import exec from '../../lib/exec';
import Row from '../FlexBox/Row';

class Terminal extends PureComponent<$TerminalProps, $TerminalState> {
  ps: $Emitter;
  state: $TerminalState = {
    code: null,
    done: false,
    error: null,
    output: [],
    pid: null,
  };
  componentDidMount = () => {
    const {command, cwd, inputHandlers = []} = this.props;
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
    this.ps.on('done', () => this.setState({done: true, code: 0}, () => {
      if (typeof this.props.onDone === 'function') {
        this.props.onDone();
      }
    }));
    this.ps.on('failed', code => this.setState({
      done: true,
      error: new Error('Status closed'),
      code,
    }, () => {
      if (typeof this.props.onFail === 'function') {
        this.props.onFail(code);
      }
    }));
  };
  componentDidUpdate = () => {
    const terminal = document.getElementById('terminal');
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight;
    }
  };
  componentWillUnmount = () => {
    this.ps.removeAllListeners('data');
    this.ps.emit('kill');
    this.ps = null;
  };
  render = () => (
    <Card initiallyExpanded>
      <CardHeader
        title={this.props.command}
        subtitle={`Embedded terminal (${
          (this.state.pid && !this.state.done) ? 'Running' : 'Done'}
        )`}
        avatar={<TermIcon />}
        actAsExpander
        showExpandableButton
      />
      <CardActions>
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
      </CardText>
    </Card>
  );
  onKill = () => this.ps.emit('kill');
  stop = () => {
    if (!this.state.done) {
      this.ps.emit('kill');
    }
  };
}

export default Terminal;
