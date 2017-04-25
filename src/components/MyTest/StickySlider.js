import React, { Component, PropTypes } from 'react';
import Slider from 'rc-slider';
// require('rc-slider/assets/index.css');

export default class StickySlider extends Component {
  static displayName = 'StickySlider'

  static propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    marks: PropTypes.object,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.handleClickChange = this.handleClickChange.bind(this);
    this.delayState = this.delayState.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.timer = this.timer.bind(this);

    this.state = {
      value: 4,
    };
  }

  handleClickChange = (event) => {
    this.setState({ value: event });
  };

  handleStateChange = (newValue) => {
    this.setState({ value: newValue });
  };

  timer(j) {
    setTimeout(() => {
      const newValue = j;
      this.setState({ value: newValue });
    }, j * 2000);
  }

  delayState = () => {
    const { min, max, step } = this.props;
    for (let i = min; i <= max; i += step) {
      this.timer(i);
    }
  }

  render() {
    const { min, max, step, marks, style } = this.props;
    return (
      <div style={style}>
        <Slider
          min={min}
          max={max}
          marks={marks}
          tipFormatter={null}
          step={step}
          onChange={this.handleClickChange}
          value={this.state.value}
        />
        <div>
          <br /><br /><br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={this.delayState} >Play over time</button>
          </div>
        </div>
      </div>
    );
  }
}
