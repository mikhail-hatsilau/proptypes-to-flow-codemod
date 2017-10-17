import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tooltip extends Component {
  static defaultProps = {
    headline: 'Test'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <div />;
  }
}

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
