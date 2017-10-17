// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import PropTypes from 'prop-types';

type TooltipProps = {
  headline?: any,
  children?: Node,
  text: string,
  shouldBeShown?: boolean,
  icon?: 'default' | 'custom' | null,
  background?: any,
  time?: number | string,
  size: {
    width: number,
    height: number,
  },
  fonts?: string[],
  onShow?: Function,
  position?: {},
  colors?: any[],
  arrowDirection?: any,
};

class Tooltip extends Component<TooltipProps> {
  static propTypes = {
    headline: PropTypes.any,
    children: PropTypes.node,
    text: PropTypes.string.isRequired,
    shouldBeShown: PropTypes.bool,
    icon: PropTypes.oneOf(['default', 'custom', null]),
    background: PropTypes.oneOf([colors.red, colors.blue]),
    time: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }).isRequired,
    fonts: PropTypes.arrayOf(PropTypes.string),
    onShow: PropTypes.func,
    position: PropTypes.object,
    colors: PropTypes.array,
    arrowDirection: someVariableName,
  };

  static defaultProps = {
    headline: 'Test'
  };

  constructor(props) {
    super(props);
  }
  
  render() {
    return <div />
  }
}
