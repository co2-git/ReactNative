// @flow
import React, {PureComponent} from 'react';
import TextField from 'material-ui/TextField';
import map from 'lodash/map';
import filter from 'lodash/filter';
import path from 'path';
import {connect} from 'react-redux';

import Header from './Header';
import Page from './Page';
import Open from './Open';
import AppCard from './AppCard';

class Home extends PureComponent<$HomeProps, $HomeState> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.apps !== prevState.apps) {
      return {apps: nextProps.apps};
    }
    return null;
  }
  state = {
    apps: this.props.apps,
    search: '',
  };
  render = () => (
    <Page>
      <Header onToggle={this.props.onToggleDrawer} />
      <div style={{margin: 12}}>
        <Open />
        {this.props.apps.length > 0 && (
          <div style={{marginBottom: 12}}>
            <TextField
              floatingLabelText="Search apps"
              fullWidth
              hintText="Search apps"
              onChange={this.onChangeSearch}
              value={this.state.search}
            />
          </div>
        )}
        {map(this.state.apps, (app, index) => (
          <AppCard app={app} key={app.path} index={index} />
        ))}
      </div>
    </Page>
  );
  onChangeSearch = (event) => {
    const search = event.target.value;
    if (!search) {
      this.setState({search, apps: this.props.apps});
    } else {
      const regex = new RegExp(search, 'i');
      this.setState({
        search,
        apps: filter(this.props.apps, app => regex.test(path.basename(app.path))),
      });
    }
  };
}

const selector = (state: $State): $HomeConnectProps => ({
  apps: state.apps,
});

export default connect(selector)(Home);
