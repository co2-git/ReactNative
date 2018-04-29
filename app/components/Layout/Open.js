// @flow
import {Card, CardHeader, CardActions} from 'material-ui/Card';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import React, {PureComponent} from 'react';
import path from 'path';

import * as appsActions from '../../redux/actions/appsActions';
import Init from './Init';
import Terminal from '../Terminal/Console';
import Animated from '../Base/Animated';

class Open extends PureComponent<$OpenProps, $OpenState> {
  state = {
    anchorEl: null,
    create: null,
    expand: false,
    open: false,
    showTerminal: false,
  };
  render = () => (
    <Animated jello>
      <Card style={{marginBottom: 12}} expanded={this.state.expand}>
        <CardHeader
          title="Open React Native app"
          subtitle="Open an existing React Native app or create a new one"
          showExpandableButton={false}
        />
        <CardActions>
          <RaisedButton
            label="Open"
            primary
            style={{margin: 12}}
            onClick={() => appsActions.openApp()}
          />
          <RaisedButton
            label="Init"
            secondary
            style={{margin: 12}}
            onClick={this.handleClick}
          />
        </CardActions>
        <CardActions expandable>
          {this.state.showTerminal && this.state.create && (
            <Terminal
              command={
                `${
                  this.state.create.expo ? 'create-react-native-app' : 'react-native init'
                } ${
                  this.state.create.name
                }`
              }
              cwd={this.state.create.base}
              inputHandlers={[
                (data: string, ps: $Emitter) => {
                  if (/Directory.+already exists.+Continue\?/i.test(data)) {
                    ps.emit('write', 'yes\n');
                  }
                },
              ]}
              onDone={() => {
                setTimeout(() => {
                  this.setState({showTerminal: false}, () => {
                    const {create} = this.state;
                    if (create) {
                      appsActions.openApp(path.join(create.base, create.name));
                    }
                  });
                });
              }}
            />
          )}
        </CardActions>
      </Card>
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
      >
        <Init onCreate={this.onCreate} />
      </Popover>
    </Animated>
  );
  handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  onCreate = (options: $Create) => {
    this.setState({
      create: options,
      expand: true,
      open: false,
      showTerminal: true,
    });
  };
}

export default Open;
