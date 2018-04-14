import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import RaisedButton from 'material-ui/RaisedButton';
import React, {PureComponent} from 'react';
import StopIcon from 'material-ui/svg-icons/av/stop';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Column, Row} from 'reactors-flex';
import {blueGrey500, lightBlue900} from 'material-ui/styles/colors';
import Router from 'reactors-router';
import {Dimensions} from 'reactors';

import Terminal from './Console';

const Foo = () => (
  <div>
    <Row>
      <div style={{margin: 8}}>
        {this.props.buttonComponent}
      </div>
      <Tabs
        style={{flex: 2}}
        value={this.state.tab}
        onChange={tab => this.setState({tab}, () => {
          Router.get(`${this.props.app.path}-packager-start`).go(tab);
        })}
      >
        <Tab label="Settings" value="Settings" />
        <Tab label="Output" value="Output" />
      </Tabs>
    </Row>
    <Router
      name={`${this.props.app.path}-packager-start`}
      width={Dimensions.get('window').width}
    >
      <Router.Route name="Packager">
        {this.props.app.settingsComponent}
      </Router.Route>
      <Router.Route name="Output">
        {this.props.app.settingsComponent}
      </Router.Route>
    </Router>
  </div>
);

class Start extends PureComponent {
  state = {tab: 'Settings'};
  render = () => (
    <div style={{margin: 12}}>
      <Card>
        <CardHeader
          title="Packager"
          subtitle="Start/stop metro packager"
          showExpandableButton
          actAsExpander
        />
        <CardText expandable>
          {this.props.app.settingsComponent}
        </CardText>
        <CardActions>
          {this.props.buttonComponent}
        </CardActions>
      </Card>
    </div>
  );
}

export default Start;
