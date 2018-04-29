// @flow
import React from 'react';

import PlatformHome from '../Platform/Home';

const AndroidHome = ({app}: $AndroidHomeProps) => (
  <PlatformHome
    app={app}
    platform="android"
  />
);

export default AndroidHome;
