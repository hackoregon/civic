import React, { Component, PropTypes } from 'react';
import Bubbles from './Bubbles';

import { createNodes, width, height, center } from './utils';

class BubleAreaChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    this.setState({
      data: createNodes(this.props.data),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        data: createNodes(this.props.data),
      });
    }
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
          />
        </svg>
      </div>
    );
  }
}

BubleAreaChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BubleAreaChart;
