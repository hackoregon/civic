import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChartData extends Component {
  static displayName = 'ChartData';

  static propTypes = {
    children: PropTypes.node,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    ]).isRequired,
  };

  static childContextTypes = {
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    ]),
  };

  getChildContext() {
    const { xScale, yScale, data } = this.props;
    return { xScale, yScale, data };
  }

  render() {
    return <g>{this.props.children}</g>;
  }
}

export default ChartData;
