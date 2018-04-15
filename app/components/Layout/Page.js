// @flow
import React from 'react';

import {pageStyle} from '../../styles/main';
import merge from '../../styles/mixins/merge';

const Page = (props: $PageOwnProps) => (
  <div {...props} style={merge(pageStyle, props.style)} />
);

export default Page;
