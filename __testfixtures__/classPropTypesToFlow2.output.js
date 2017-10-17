// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

type TooltipProps = {
  headline: string,
  children?: Node,
  text?: string,
  shouldBeShown?: boolean,
  icon?: 'default' | 'custom',
  time?: number | string,
  size: {
    width: number,
    height: number,
  },
  fonts?: string[],
  onShow?: Function,
  position?: {},
  colors?: any[],
};

class Tooltip extends Component<TooltipProps> {
  static defaultProps = {
    headline: 'Test'
  }

  constructor(props) {
    super(props);
  }

  render() {
    return <div />
  }
}