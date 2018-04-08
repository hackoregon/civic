import React, { Component } from 'react';
import Slider from 'rc-slider';
import BubbleChart from './BubbleChart';
import { bubbleData, min, max, step, marks, style } from './utils';

import 'rc-slider/assets/index.css';

class StickySlider extends Component {

  constructor(props) {
    super(props);
    this.handleClickChange = this.handleClickChange.bind(this);
    this.delayState = this.delayState.bind(this);

    this.state = {
      value: max,
      data: [],
    };
  }

  componentWillMount() {
    const myData = [];
    bubbleData.forEach((t) => {
      Object.keys(t).map(key =>
        myData.push(t[key]),
      );
      this.setState({ data: myData });
    });
  }

  handleClickChange(event) {
    this.setState({ value: event });
  }

  handleStateChange(newValue) {
    this.setState({ value: newValue });
  }

  timer(j) {
    setTimeout(() => {
      const newValue = (j);
      this.setState({ value: newValue });
    }, (j - 1) * 4000);
  }

  delayState() {
    this.setState({ value: min });
    for (let i = min + 1; i <= max; i += step) {
      this.timer(i);
    }
  }

  render() {
    return (
      <div style={style}>
        <Slider
          min={min}
          max={max}
          step={step}
          marks={marks}
          tipFormatter={null}
          onChange={this.handleClickChange}
          value={this.state.value}
        />
        <div>
          <br /><br /><br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={this.delayState} >Play over time</button>
          </div>
        </div>
        <BubbleChart
          data={this.state.data[this.state.value]}
        />
      </div>
    );
  }
}

export default StickySlider;
