// @flow
import * as reducers from '../app/redux/reducers';

// eslint-disable-next-line no-undef
declare type $App = {
  path: string,
};

declare type $State = $Keys<typeof reducers>;
