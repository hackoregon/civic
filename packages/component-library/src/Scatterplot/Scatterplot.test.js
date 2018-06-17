import React from 'react';
import { shallow } from 'enzyme';

import Scatterplot from './Scatterplot';

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

const multiSeriesData = [
  { amount: 100, rate: 1, series: 'first' },
  { amount: 200, rate: 2, series: 'first' },
  { amount: 100, rate: 3, series: 'second' },
  { amount: 200, rate: 3, series: 'second' },
];

const unstructuredMultiSeriesData = [
  { amount: 100, rate: 1, type: 'first' },
  { amount: 200, rate: 2, type: 'first' },
  { amount: 100, rate: 3, type: 'second' },
  { amount: 200, rate: 3, type: 'second' },
];

describe('Scatterplot', () => {
  it('renders a VictoryChart', () => {
    const wrapper = shallow(<Scatterplot data={simpleData} />);
    expect(wrapper.find('VictoryChart').length).to.eql(1);
  });

  it('renders a Scatterplot with simple data', () => {
    const wrapper = shallow(<Scatterplot data={simpleData} />);
    expect(wrapper.find({ title: 'Scatter Plot' }).length).to.eql(1);
    expect(wrapper.find({ title: 'Scatter Plot' }).props().data).to.eql([
      { dataKey: 100, dataValue: 1, label: "X: 100 • Y: 1", series: undefined, size: 3 },
      { dataKey: 200, dataValue: 2, label: "X: 200 • Y: 2", series: undefined, size: 3 },
      { dataKey: 300, dataValue: 3, label: "X: 300 • Y: 3", series: undefined, size: 3 },
      { dataKey: 400, dataValue: 4, label: "X: 400 • Y: 4", series: undefined, size: 3 },
    ]);
  });

  it('renders an updated Scatterplot when passed new data', () => {
    const wrapper = shallow(<Scatterplot data={simpleData} />);
    expect(wrapper.find({ title: 'Scatter Plot' }).length).to.eql(1);
    wrapper.setProps({ data: customData });

    expect(wrapper.find({ title: 'Scatter Plot' }).props().data).to.eql([
      { dataKey: 100, dataValue: 1, label: "X: 100 • Y: 1", series: undefined, size: 3 },
      { dataKey: 200, dataValue: 2, label: "X: 200 • Y: 2", series: undefined, size: 3 },
      { dataKey: 300, dataValue: 3, label: "X: 300 • Y: 3", series: undefined, size: 3 },
      { dataKey: 400, dataValue: 4, label: "X: 400 • Y: 4", series: undefined, size: 3 },
      { dataKey: 500, dataValue: 5, label: "X: 500 • Y: 5", series: undefined, size: 3 },
    ]);
  });

  it('renders both axes', () => {
    const wrapper = shallow(<Scatterplot data={simpleData} />);

    const axes = wrapper.find('VictoryAxis');
    const xAxis = wrapper.find({ title: 'X Axis' });
    const yAxis = wrapper.find({ title: 'Y Axis' });

    expect(axes.length).to.eql(2);
    expect(xAxis.length).to.eql(1);
    expect(yAxis.length).to.eql(1);
  });

  it('should properly set a domain based on the data if not provided with one', () => {
    const wrapper = shallow(<Scatterplot data={simpleData} />);
    const chart = wrapper.find('VictoryChart');

    expect(chart.props().domain).to.eql(simpleDataDomain);
  });

  it('should properly set a domain if provided with one', () => {
    const wrapper = shallow(<Scatterplot data={simpleData} domain={customDataDomain} />);
    const chart = wrapper.find('VictoryChart');

    expect(chart.props().domain).to.eql(customDataDomain);
  });

  it('renders multi-series data', () => {
    const props = {
      data: multiSeriesData,
      dataKey: 'amount',
      dataValue: 'rate',
      dataSeries: 'series',
    };
    const wrapper = shallow(<Scatterplot {...props} />);
    expect(wrapper.find({ title: 'Scatter Plot' }).props().data).to.eql([
      { dataKey: 100, dataValue: 1, label: "X: 100 • Y: 1", series: 'first', size: 3 },
      { dataKey: 200, dataValue: 2, label: "X: 200 • Y: 2", series: 'first', size: 3 },
      { dataKey: 100, dataValue: 3, label: "X: 100 • Y: 3", series: 'second', size: 3 },
      { dataKey: 200, dataValue: 3, label: "X: 200 • Y: 3", series: 'second', size: 3 },
    ]);
  });

  it('renders a legend if dataSeries is specified', () => {
    const props = {
      data: multiSeriesData,
      dataKey: 'amount',
      dataValue: 'rate',
    };
    const wrapper = shallow(<Scatterplot {...props} />);
    expect(wrapper.find('.legend').length).to.eql(0);

    wrapper.setProps({ dataSeries: 'series' });
    expect(wrapper.find('.legend').length).to.eql(1);
    expect(wrapper.find('.legend').props().legendData).to.eql([
      { name: 'first' },
      { name: 'second' },
    ]);
  });

  it('renders unstructured multi-series data', () => {
    const props = {
      data: unstructuredMultiSeriesData,
      dataKey: 'amount',
      dataValue: 'rate',
      dataSeries: 'type',
    };
    const wrapper = shallow(<Scatterplot {...props} />);
    expect(wrapper.find({ title: 'Scatter Plot' }).props().data).to.eql([
      { dataKey: 100, dataValue: 1, label: "X: 100 • Y: 1", series: 'first', size: 3 },
      { dataKey: 200, dataValue: 2, label: "X: 200 • Y: 2", series: 'first', size: 3 },
      { dataKey: 100, dataValue: 3, label: "X: 100 • Y: 3", series: 'second', size: 3 },
      { dataKey: 200, dataValue: 3, label: "X: 200 • Y: 3", series: 'second', size: 3 },
    ]);
  });

  it('renders a legend from unstructured multi-series data if dataSeries is specified', () => {
    const props = {
      data: unstructuredMultiSeriesData,
      dataKey: 'amount',
      dataValue: 'rate',
    };
    const wrapper = shallow(<Scatterplot {...props} />);
    expect(wrapper.find('.legend').length).to.eql(0);

    wrapper.setProps({ dataSeries: 'type' });
    expect(wrapper.find('.legend').length).to.eql(1);
    expect(wrapper.find('.legend').props().legendData).to.eql([
      { name: 'first' },
      { name: 'second' },
    ]);
  });

  it('sets the data point size if size key is specified', () => {
    const props = {
      data: simpleData,
    };
    const wrapper = shallow(<Scatterplot {...props} />);
    expect(wrapper.find({ title: 'Scatter Plot' }).props().data).to.eql([
      { dataKey: 100, dataValue: 1, label: "X: 100 • Y: 1", series: undefined, size: 3 },
      { dataKey: 200, dataValue: 2, label: "X: 200 • Y: 2", series: undefined, size: 3 },
      { dataKey: 300, dataValue: 3, label: "X: 300 • Y: 3", series: undefined, size: 3 },
      { dataKey: 400, dataValue: 4, label: "X: 400 • Y: 4", series: undefined, size: 3 },
    ]);

    wrapper.setProps({ size: { key: 'y' } });

    expect(wrapper.find({ title: 'Scatter Plot' }).props().data).to.eql([
      { dataKey: 100, dataValue: 1, label: "X: 100 • Y: 1", series: undefined, size: 1 },
      { dataKey: 200, dataValue: 2, label: "X: 200 • Y: 2", series: undefined, size: 2 },
      { dataKey: 300, dataValue: 3, label: "X: 300 • Y: 3", series: undefined, size: 3 },
      { dataKey: 400, dataValue: 4, label: "X: 400 • Y: 4", series: undefined, size: 4 },
    ]);
  });
  // TODO: make this test pass
  // it('should properly update a domain', () => {
  //   const wrapper = shallow(<Scatterplot data={simpleData} domain={simpleDataDomain} />);
  //   const chart = wrapper.find('VictoryChart');

  //   wrapper.setProps({ domain: customDataDomain });
  //   expect(chart.props().domain).to.eql(customDataDomain);
  // });

  // TODO: make this test pass
  // it('should update a domain a based on updated data', () => {
  //   const wrapper = shallow(<Scatterplot data={simpleData} />);
  //   const chart = wrapper.find('VictoryChart');
  //   expect(chart.props().domain).to.eql(simpleDataDomain);

  //   wrapper.setProps({ data: customData });
  //   expect(chart.props().domain).to.eql(customDataDomain);
  // });
  //
  // TODO: add test around number formatting
});
