// @flow
import omit from 'lodash/omit';
import React from 'react';

const ownProps = [
  'alignY',
  'around',
  'between',
  'center',
  'column',
  'row',
];

const makeStyle = (props: $FlexProps) => {
  const {style: propsStyle = {}} = props;
  const style = {...propsStyle, display: 'flex', flexDirection: 'row'};
  if (props.row === true) {
    style.flexDirection = 'row';
  } else if (props.column === true) {
    style.flexDirection = 'column';
  } else if (props.direction) {
    style.flexDirection = props.direction;
  } else if (props.flexDirection) {
    style.flexDirection = props.flexDirection;
  }
  if (props.between) {
    style.justifyContent = 'space-between';
  }
  if (props.around) {
    style.justifyContent = 'space-around';
  }
  if (props.center) {
    style.justifyContent = 'center';
    style.alignItems = 'center';
  }
  if (props.alignY && style.flexDirection === 'row') {
    if (props.alignY === 'center') {
      style.alignItems = 'center';
    }
  }
  return style;
};

const Flex = (props: $FlexProps) => (
  <div {...omit(props, ownProps)} style={makeStyle(props)}>
    {props.children}
  </div>
);

export default Flex;
