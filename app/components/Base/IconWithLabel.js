// @flow
import React from 'react';
import IconButton from 'material-ui/IconButton';

import Column from '../FlexBox/Column';
import merge from '../../styles/mixins/merge';

const IconWithLabel = (props: $IconWithLabelProps) => (
  <Column
    center
    style={merge({color: '#777', marginBottom: 8}, props.style)}
    onClick={props.onClick}
  >
    <IconButton>
      {props.icon}
    </IconButton>
    <div style={{marginTop: -8}}>{props.label}</div>
  </Column>
);

export default IconWithLabel;
