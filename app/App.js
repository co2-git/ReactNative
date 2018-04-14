import 'babel-polyfill';
import {Provider} from 'react-redux';
import React from 'react';

import Router from './components/Layout/Router';
import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
