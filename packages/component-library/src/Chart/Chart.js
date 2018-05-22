import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Chart extends Component {

  static displayName = 'Chart'

  static childContextTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    margin: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
    }),
  };

  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node,
    margin: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
    }),
  };

  static defaultProps = {
    height: 0,
    width: 0,
    margin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };


  getChildContext() {
    const { width, height } = this.props;
    let { margin } = this.props;

    margin = {
      ...margin,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };

    return { width, height, margin };
  }
  render() {
    const { width, height } = this.props;
    let { margin } = this.props;

    margin = {
      ...margin,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };

    const insetString = `translate(${margin.left}, ${margin.top})`;

    return (
      <div
        className="chart"
        style={{
          padding: 0,
          margin: 0,
          width,
          height,
        }}
      >
        <svg className="chart-svg" width={width} height={height}>
          <g className="chart-g-container" transform={insetString}>
            {this.props.children}
          </g>
        </svg>

        <div
          style={{
            display: 'none',
          }}
        />
      </div>
    );
  }
}
