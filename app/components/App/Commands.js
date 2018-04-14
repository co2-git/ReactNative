import {Column, Row} from 'reactors-flex';
import {Dimensions, Text} from 'reactors';
import DropDownMenu from 'material-ui/DropDownMenu';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import MenuItem from 'material-ui/MenuItem';
import React, {PureComponent} from 'react';
import Router from 'reactors-router';

import Start from '../Command/Start';

const commands = [
  {name: 'bundle'},
  {name: 'eject'},
  {name: 'help'},
  {name: 'info'},
  {name: 'install'},
  {name: 'link'},
  {name: 'log-android'},
  {name: 'log-ios'},
  {name: 'new-library'},
  {name: 'run-android'},
  {name: 'run-ios'},
  {name: 'start', active: true},
  {name: 'unbundle'},
  {name: 'uninstall'},
  {name: 'upgrade'},
];

class Commands extends PureComponent {
  state = {
    commandIndex: findIndex(commands, 'active'),
    command: find(commands, 'active'),
  };
  render = () => (
    <section>
      <DropDownMenu
        value={this.state.commandIndex}
        onChange={e => Router.get('Main')}
      >
        {commands.map((command, index) => (
          <MenuItem
            key={command.name}
            disabled={!command.active}
            value={index}
            primaryText={command.name}
          />
        ))}
      </DropDownMenu>
      <Router
        name={`app-${this.props.app.path}-commands`}
        width={Dimensions.get('window').width}
        initial={this.state.command.name}
      >
        {commands.map(command => (
          <Router.Route name={command.name} key={command.name}>
            {command.name === 'start' && <Start app={this.props.app} />}
          </Router.Route>
        ))}
      </Router>
    </section>
  );
}

export default Commands;
