import React, { Component } from 'react';
import { ErPieChart } from '../index';

const dataA = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];

const dataB = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];

class PieHowBusy extends Component {
  render() {
    return (
      <div>
        <ErPieChart data={dataA} />
        <ErPieChart data={dataB} />
      </div>
    );
  }
}

export default PieHowBusy;
