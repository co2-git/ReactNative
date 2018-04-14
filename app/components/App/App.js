// @flow
import React from 'react';

import AppBar from './AppBar';
import Page from '../Layout/Page';

const App = ({app}: $AppProps) => (
  <Page>
    <AppBar app={app} />
  </Page>
);

export default App;
