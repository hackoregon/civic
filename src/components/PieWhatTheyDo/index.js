import React, { Component } from 'react';
import { ErPieChart } from '../index';

const data = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];

class PieWhatTheyDo extends Component {
  render() {
    return (
      <ErPieChart data={data} />
    );
  }
}

export default PieWhatTheyDo;
