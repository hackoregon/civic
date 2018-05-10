import React from 'react';
import { shallow } from 'enzyme';

import ScatterPlot from './ScatterPlot';

const simpleData = [
  { x: 100, y: 1 },
  { x: 200, y: 2 },
  { x: 300, y: 3 },
  { x: 400, y: 4 },
];

const multiSeriesData = [
  { amount: 100, rate: 1, series: 'first' },
  { amount: 200, rate: 2, series: 'first' },
  { amount: 100, rate: 3, series: 'second' },
  { amount: 200, rate: 3, series: 'second' },
];

describe('ScatterPlot', () => {
  it('renders a VictoryChart', () => {
    const wrapper = shallow(<ScatterPlot data={simpleData} />);
    expect(wrapper.find('VictoryChart').length).to.eql(1);
  });

  it('renders a ScatterPlot with simple data', () => {
    const wrapper = shallow(<ScatterPlot data={simpleData} />);
    expect(wrapper.find({ title: 'Scatter Plot' }).length).to.eql(1);
    expect(wrapper.find({ title: 'Scatter Plot' }).props().data).to.eql([
      { dataKey: 100, dataValue: 1, series: undefined },
      { dataKey: 200, dataValue: 2, series: undefined },
      { dataKey: 300, dataValue: 3, series: undefined },
      { dataKey: 400, dataValue: 4, series: undefined },
    ]);
  });

  it('renders both axes', () => {
    const wrapper = shallow(<ScatterPlot data={simpleData} />);

    const axes = wrapper.find('VictoryAxis');
    const xAxis = wrapper.find({ title: 'X Axis' });
    const yAxis = wrapper.find({ title: 'Y Axis' });

    expect(axes.length).to.eql(2);
    expect(xAxis.length).to.eql(1);
    expect(yAxis.length).to.eql(1);
  });

  it('renders categories for x-axis ticks if dataKeyLabel is specified', () => {
    const wrapper = shallow(<ScatterPlot data={simpleData} />);
    expect(wrapper.find({ title: 'Scatter Plot' }).props().categories).to.eql({
      x: null,
    });
    wrapper.setProps({ dataKeyLabel: ['a', 'b', 'c', 'd'] });
    expect(wrapper.find({ title: 'Scatter Plot' }).props().categories).to.eql({
      x: ['a', 'b', 'c', 'd'],
    });
  });

  it('renders multi-series data', () => {
    const props = {
      data: multiSeriesData,
      dataKey: 'amount',
      dataValue: 'rate',
    };
    const wrapper = shallow(<ScatterPlot {...props} />);
    expect(wrapper.find({ title: 'Scatter Plot' }).props().data).to.eql([
      { dataKey: 100, dataValue: 1, series: 'first' },
      { dataKey: 200, dataValue: 2, series: 'first' },
      { dataKey: 100, dataValue: 3, series: 'second' },
      { dataKey: 200, dataValue: 3, series: 'second' },
    ]);
  });

  it('renders a legend if dataSeries is specified', () => {
    const props = {
      data: multiSeriesData,
      dataKey: 'amount',
      dataValue: 'rate',
    };
    const wrapper = shallow(<ScatterPlot {...props} />);
    expect(wrapper.find('.legend').length).to.eql(0);

    wrapper.setProps({ dataSeries: ['first', 'second'] });
    expect(wrapper.find('.legend').length).to.eql(1);
    expect(wrapper.find('.legend').props().legendData).to.eql([
      { name: 'first' },
      { name: 'second' },
    ]);
  });
});
