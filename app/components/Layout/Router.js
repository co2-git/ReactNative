// @flow
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';
import filter from 'lodash/filter';
import get from 'lodash/get';
import IconButton from 'material-ui/IconButton';
import map from 'lodash/map';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import path from 'path';
import React, {PureComponent} from 'react';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

import {clearError} from '../../redux/actions/errorsActions';
import AppCard from './AppCard';
import DrawerMenu from './DrawerMenu';
import Index from './Index';
import merge from '../../styles/mixins/merge';
import styles from './Router.styles';

class Router extends PureComponent<$RouterProps, $RoouterState> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.apps !== prevState.apps) {
      return {apps: nextProps.apps};
    }
    return null;
  }
  state = {
    apps: this.props.apps,
    open: false,
    search: '',
  };
  render = () => (
    <MuiThemeProvider>
      <div>
        <main style={styles.container}>
          <div
            style={merge(styles.wrapper, {
              width: '300vw',
            })}
          >
            <div style={styles.page}>
              <AppBar
                iconElementLeft={(
                  <IconButton>
                    <MenuIcon color="#444" />
                  </IconButton>
                )}
                onLeftIconButtonClick={this.handleToggle}
                title="React Native"
                style={{backgroundColor: 'transparent'}}
                titleStyle={{color: '#444'}}
              />
              <div style={{margin: 12}}>
                <Index />
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
                {map(this.state.apps, app => (
                  <AppCard app={app} key={app.path} />
                ))}
              </div>
            </div>
            <div style={styles.page}>Page B</div>
          </div>
        </main>
        <Drawer open={this.state.open}>
          <div>
            <IconButton>
              <CloseIcon onClick={this.handleToggle} />
            </IconButton>
            <DrawerMenu />
          </div>
        </Drawer>
        <Snackbar
          open={this.props.error instanceof Error}
          message={get(this.props.error, 'message', '')}
          autoHideDuration={10 * 1000}
          onRequestClose={clearError}
        />
      </div>
    </MuiThemeProvider>
  );
  handleToggle = () => this.setState({open: !this.state.open});
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

const selector = (state: $State): $RouterConnectProps => ({
  apps: state.apps,
  error: state.error,
});

export default connect(selector)(Router);
