// @flow
import React from 'react';

import AppBar from './AppBar';
import Page from '../Layout/Page';
import AppBottomBar from './AppBottomBar';

const App = ({app}: $AppProps) => (
  <Page style={{display: 'flex', flexDirection: 'column'}}>
    <AppBar app={app} />
    <div style={{flexGrow: 2}}>

    </div>
    <AppBottomBar app={app} />
  </Page>
);

export default App;
