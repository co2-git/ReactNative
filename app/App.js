// @flow
import 'babel-polyfill';

import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import React from 'react';

import Layout from './components/Layout/Layout';
import store from './redux/store';

const Loading = () => (
  <div>Loading</div>
);

const persistor = persistStore(store);

// persistor.purge();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Layout />
    </PersistGate>
  </Provider>
);

export default App;
