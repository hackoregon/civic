import React, { Component, PropTypes } from 'react';
import Slider from 'rc-slider';
import BubbleChart from './BubbleChart';
import { bubbleData } from './utils';

require('rc-slider/assets/index.css');

class StickySlider extends Component {

  constructor(props) {
    super(props);
    this.handleClickChange = this.handleClickChange.bind(this);
    this.delayState = this.delayState.bind(this);

    this.state = {
      value: 3,
      data: [],
    };
  }

  componentWillMount() {
    const rawData = bubbleData;
    const myData = [];
    rawData.forEach((t) => {
      Object.keys(t).map((key) => {
        myData.push(t[key]);
        this.setState({ data: myData,
        });
      });
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
      const newValue = j;
      this.setState({ value: newValue });
    }, j * 2000);
  }

  delayState() {
    // const { min, max, step } = this.props;
    for (let i = 0; i <= 9; i += 1) {
      this.timer(i);
    }
  }

  render() {
    const style = { width: 800, margin: 'auto', padding: 20, justifyContent: 'center' };
    const marks = {
      1: {
        label: <strong>2007</strong>,
      },
      2: '2008',
      3: '2009',
      4: '2010',
      5: '2011',
      6: '2012',
      7: '2013',
      8: '2014',
      9: '2015',
      10: {
        label: <strong>2016</strong>,
      },
    };

    return (
      <div style={style}>
        <Slider
          min={1}
          max={10}
          step={1}
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

StickySlider.propTypes = {
//  data: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default StickySlider;
