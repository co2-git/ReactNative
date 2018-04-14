// @flow
import {connect} from 'react-redux';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';
import get from 'lodash/get';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, {PureComponent} from 'react';
import Snackbar from 'material-ui/Snackbar';

import {clearError} from '../../redux/actions/errorsActions';
import DrawerMenu from './DrawerMenu';
import Router from './Router';

class Layout extends PureComponent<$LayoutProps, $LayoutState> {
  state = {
    showDrawer: false,
  };
  render = () => (
    <MuiThemeProvider>
      <div>
        <Router onToggleDrawer={this.onToggleDrawer} />

        <Drawer open={this.state.showDrawer}>
          <div>
            <IconButton>
              <CloseIcon onClick={this.onToggleDrawer} />
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
  onToggleDrawer = () => this.setState({showDrawer: !this.state.showDrawer});
}

const selector = (state: $State): $LayoutConnectProps => ({
  error: state.error,
});

export default connect(selector)(Layout);
