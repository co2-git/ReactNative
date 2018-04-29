// @flow
import React from 'react';

import PlatformHome from '../Platform/Home';

const IOSHome = ({app}: $IOSHomeProps) => (
  <PlatformHome
    app={app}
    platform="ios"
  />
);

export default IOSHome;
