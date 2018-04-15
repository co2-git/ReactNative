// @flow
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import AppBar from './AppBar';
import AppBottomBar from './AppBottomBar';
import Info from '../ReactNative/Info';
import Page from '../Layout/Page';

const App = ({app}: $AppProps) => (
  <Page style={{display: 'flex', flexDirection: 'column'}}>
    <div style={{flexShrink: 0}}>
      <AppBar app={app} />
    </div>
    <div style={{flexGrow: 2, overflow: 'auto'}}>
      <SwipeableViews>
        <div>
          <Info app={app} />
        </div>
      </SwipeableViews>
    </div>
    <AppBottomBar app={app} />
  </Page>
);

export default App;
