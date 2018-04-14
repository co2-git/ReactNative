import 'babel-polyfill';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import React from 'react';
import {persistStore} from 'redux-persist';

import Layout from './components/Layout/Layout';
import store from './redux/store';

const Loading = () => (
  <div>Loading</div>
);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistStore(store)}>
      <Layout />
    </PersistGate>
  </Provider>
);

export default App;
