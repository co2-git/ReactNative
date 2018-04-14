import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardActions} from 'material-ui/Card';
import {connect} from 'react-redux';
import map from 'lodash/map';
import Router from 'reactors-router';
import {Dimensions} from 'reactors';
import Snackbar from 'material-ui/Snackbar';
import get from 'lodash/get';

import Open from '../Card/Open';
import AppCard from '../Card/AppCard';
import App from '../App/App';
import {clearError} from '../../redux/actions/errorsActions';

const Apps = ({apps, error}) => (
  <MuiThemeProvider>
    <div>
      <Router
        name="main"
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height}
      >
        <Router.Route name="index">
          <section style={{margin: 20}}>
            <Open />
            {map(apps, app => (
              <AppCard app={app} key={app.path} />
            ))}
          </section>
        </Router.Route>
        {map(apps, app => (
          <Router.Route name={app.path} key={app.path}>
            <App app={app} />
          </Router.Route>
        ))}
      </Router>
      <Snackbar
        open={Boolean(error)}
        message={get(error, 'message', '')}
        autoHideDuration={10000}
        onRequestClose={clearError}
      />
    </div>
  </MuiThemeProvider>
);

const selector = state => ({
  selectedApp: state.selected.app,
  apps: state.apps,
  error: state.error,
});

export default connect(selector)(Apps);
