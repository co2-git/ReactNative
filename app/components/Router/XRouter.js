// @flow
import React, {PureComponent} from 'react';
import SwipeableViews from 'react-swipeable-views';

export default class XRouter extends PureComponent<$XRouterProps, $XRouterState> {
  static defaultProps = {index: 0};
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.index !== prevState.index) {
      return {index: nextProps.index};
    }
    return null;
  }
  state = {
    index: this.props.index,
    switching: null,
    transitionned: null,
  };
  render = () => (
    <SwipeableViews
      index={this.state.index}
      onTransitionEnd={() => this.setState({transitionned: this.state.index})}
    >
      {React.Children.toArray(this.props.children).map((child, childIndex) => (
        <child.type
          key={childIndex}
          {...{
            ...child.props,
            ...this.state,
          }}
        />
      ))}
    </SwipeableViews>
  );
}
