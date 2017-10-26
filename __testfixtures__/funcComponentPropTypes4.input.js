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

const Tooltip = (props: TooltipProps) => {
  const { text, icon } = props;
  if (!text) {
    return null;
  }
  return <div />;
};


Tooltip.propTypes = {
  headline: PropTypes.string.isRequired,
  children: PropTypes.node,
  text: PropTypes.string,
  shouldBeShown: PropTypes.bool,
  icon: PropTypes.oneOf(['default', 'custom']),
  time: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }).isRequired,
  fonts: PropTypes.arrayOf(PropTypes.string),
  onShow: PropTypes.func,
  position: PropTypes.object,
  colors: PropTypes.array,
};
