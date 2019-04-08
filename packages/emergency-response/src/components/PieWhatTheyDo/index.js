import React, { Component } from 'react';
import ErPieChart from '../ErPieChart/index';

const data = [
  { name: 'Medical', value: 71.9 },
  { name: 'Fire', value: 3.2 },
  { name: 'False Alarms', value: 7.7 },
  { name: 'Service Calls', value: 10 },
  { name: 'Good Intent', value: 4.9 },
  { name: 'Other', value: 2.3 },
];

const PieWhatTheyDo = () => (
  <ErPieChart data={data} dataLabel='name' dataValue='value' />
);

export default PieWhatTheyDo;
