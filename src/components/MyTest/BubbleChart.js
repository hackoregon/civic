import React, { Component, PropTypes } from 'react';
import Bubbles from './Bubbles';

import { createNodes, width, height, center } from './utils';

export default class BubleAreaChart extends Component {

  state = {
    data: [],
  }

  componentWillMount() {
    this.setState({
      data: createNodes(this.props.data),
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto' }} >
        <svg className="bubbleChart" width={width} height={height}>
          <Bubbles
            data={data}
            forceStrength={0.03}
            center={center}
            color={this.props.colors}
          />
        </svg>
      </div>
    );
  }
}

BubleAreaChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
  colors: PropTypes.arrayOf(PropTypes.string.isRequired),
};
