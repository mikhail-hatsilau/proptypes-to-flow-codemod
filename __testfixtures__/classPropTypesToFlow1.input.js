import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tooltip extends Component {
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
