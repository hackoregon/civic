import React from 'react';
import { shallow } from 'enzyme';

import BarChart from './BarChart';

const simpleData = [
  { x: 100, y: 1 },
  { x: 200, y: 2 },
  { x: 300, y: 3 },
  { x: 400, y: 4 },
];

const customData = [
  { x: 100, y: 1 },
  { x: 200, y: 2 },
  { x: 300, y: 3 },
  { x: 400, y: 4 },
  { x: 500, y: 5 },
];

const simpleDataDomain = { x: [100, 400], y: [0, 4] };
const customDataDomain = { x: [100, 500], y: [0, 5] };

const unstructuredMultiSeriesData = [
  { amount: 100, rate: 1, type: 'first' },
  { amount: 200, rate: 2, type: 'first' },
  { amount: 100, rate: 3, type: 'second' },
  { amount: 200, rate: 3, type: 'second' },
];

describe('BarChart', () => {
  it('renders a VictoryChart', () => {
    const wrapper = shallow(<BarChart data={simpleData} />);
    expect(wrapper.find('VictoryChart').length).to.eql(1);
  });

  it('renders a BarChart with simple data', () => {
    const wrapper = shallow(<BarChart data={simpleData} />);
    expect(wrapper.find({ title: 'Bar Chart' }).length).to.eql(1);
    expect(wrapper.find({ title: 'Bar Chart' }).props().data).to.eql([
      { dataKey: 100, dataValue: 1, label: "X: 100 • Y: 1" },
      { dataKey: 200, dataValue: 2, label: "X: 200 • Y: 2" },
      { dataKey: 300, dataValue: 3, label: "X: 300 • Y: 3" },
      { dataKey: 400, dataValue: 4, label: "X: 400 • Y: 4" },
    ]);
  });

  it('renders an updated BarChart when passed new data', () => {
    const wrapper = shallow(<BarChart data={simpleData} />);
    expect(wrapper.find({ title: 'Bar Chart' }).length).to.eql(1);
    wrapper.setProps({ data: customData });

    expect(wrapper.find({ title: 'Bar Chart' }).props().data).to.eql([
      { dataKey: 100, dataValue: 1, label: "X: 100 • Y: 1" },
      { dataKey: 200, dataValue: 2, label: "X: 200 • Y: 2" },
      { dataKey: 300, dataValue: 3, label: "X: 300 • Y: 3" },
      { dataKey: 400, dataValue: 4, label: "X: 400 • Y: 4" },
      { dataKey: 500, dataValue: 5, label: "X: 500 • Y: 5" },
    ]);
  });

  it('renders both axes', () => {
    const wrapper = shallow(<BarChart data={simpleData} />);

    const axes = wrapper.find('VictoryAxis');
    const xAxis = wrapper.find({ title: 'X Axis' });
    const yAxis = wrapper.find({ title: 'Y Axis' });

    expect(axes.length).to.eql(2);
    expect(xAxis.length).to.eql(1);
    expect(yAxis.length).to.eql(1);
  });

  it('should properly set a domain based on the data if not provided with one', () => {
    const wrapper = shallow(<BarChart data={simpleData} />);
    const chart = wrapper.find('VictoryChart');

    expect(chart.props().domain).to.eql(simpleDataDomain);
  });

  it('should properly set a domain if provided with one', () => {
    const wrapper = shallow(<BarChart data={simpleData} domain={customDataDomain} />);
    const chart = wrapper.find('VictoryChart');

    expect(chart.props().domain).to.eql(customDataDomain);
  });
});
