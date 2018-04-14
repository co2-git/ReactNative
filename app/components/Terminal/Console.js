// @flow
import map from 'lodash/map';
import React, {PureComponent} from 'react';
import {Card, CardHeader, CardActions} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import OpenFolderIcon from 'material-ui/svg-icons/file/folder-open';
import TermIcon from 'material-ui/svg-icons/action/code';
import stripAnsi from 'strip-ansi';

import exec from '../../lib/exec';
import Row from '../FlexBox/Row';
import Text from '../Base/Text';

type $InputHandler = (message: string, ps: EventEmitter) => void;

type $TerminalProps = {
  command: string,
  cwd: string,
  inputHandlers: $InputHandler[],
};

type $TerminalState = {
  output: string[],
  pid: ?number,
  done: boolean,
  error: ?Error,
};

class Terminal extends PureComponent<$TerminalProps, $TerminalState> {
  ps: EventEmitter;
  state: $TerminalState = {output: [], pid: null, done: false, error: null};
  componentDidMount = () => {
    const {command, cwd, inputHandlers = []} = this.props;
    this.ps = exec(command, {cwd});
    this.ps.on('pid', pid => this.setState({pid}));
    this.ps.on('data', data => this.setState({output: [...this.state.output, data]}, () => {
      for (const inputHandler of inputHandlers) {
        inputHandler(data.message, this.ps);
      }
    }));
    this.ps.on('error', error => this.setState({error}));
    this.ps.on('done', () => this.setState({done: true}, () => {
      if (typeof this.props.onDone === 'function') {
        this.props.onDone();
      }
    }));
    this.ps.on('failed', () => this.setState({done: true, error: new Error('Status closed')}));
  };
  render = () => (
    <Card>
      <CardHeader
        title={this.props.command}
        subtitle={`Embedded terminal (${
          (this.state.pid && !this.state.done) ? 'Running' : 'Done'}
        )`}
        avatar={<TermIcon />}
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
          <Chip>
            <Avatar icon={<OpenFolderIcon />} />
            {this.props.cwd}
          </Chip>
        </Row>
        <div style={styles.console}>
          {map(this.state.output, (output, index) => {
            const lines = stripAnsi(output.message).split('\n');
            return (
              <div key={index}>
                {map(lines, (line, lineIndex) => <div key={lineIndex}>{line}</div>)}
              </div>
            );
          })}
        </div>
      </CardActions>
    </Card>
  );
  onKill = () => this.ps.emit('kill');
}

export default Terminal;

const styles = {
  console: {
    padding: 10,
    backgroundColor: '#000',
    color: '#fff',
    maxHeight: 300,
    marginTop: 12,
    borderRadius: 8,
    overflow: 'auto',
    boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.25)',
  },
};
