import React, { Component } from 'react';
import { ErPieChart } from '../index';

const data = [
  { name: 'Medical', value: 71.9 },
  { name: 'Fire', value: 3.2 },
  { name: 'False Alarms', value: 7.7 },
  { name: 'Service Calls', value: 10 },
  { name: 'Good Intent', value: 4.9 },
  { name: 'Other', value: 2.3 },
];

class PieWhatTheyDo extends Component {
  render() {
    return (
      <ErPieChart data={data} />
    );
  }
}

export default PieWhatTheyDo;
