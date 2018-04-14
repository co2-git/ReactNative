import React from 'react';

type $FlexProps = {
  children: any,
};

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
  return style;
};

const Flex = (props: $FlexProps) => (
  <div style={makeStyle(props)}>
    {props.children}
  </div>
);

export default Flex;
