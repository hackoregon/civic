import React from 'react';
import { shallow } from 'enzyme';

import HorizontalBarChart from './HorizontalBarChart';

const simpleData = [
  { x: 100, y: 'cat' },
  { x: 200, y: 'dog' },
  { x: 300, y: 'fish' },
  { x: 400, y: 'rat' },
];

const updatedSimpleData = [
  { x: 100, y: 'cat' },
  { x: 200, y: 'dog' },
  { x: 300, y: 'fish' },
  { x: 400, y: 'rat' },
  { x: 500, y: 'bat' },
];

const simpleDataDomain = { x: [0, 400], y: [0, 4] };

const sampleUnstructuredData = [
  { population: 2000, label: 'Labrador Retriever' },
  { population: 8000, label: 'Standard Poodle' },
  { population: 6000, label: 'French Bulldog' },
];

const sampleUnstructuredDataSorted = [
  { order: 1, population: 2000, label: 'Labrador Retriever' },
  { order: 2, population: 8000, label: 'Standard Poodle' },
  { order: 3, population: 6000, label: 'French Bulldog' },
];

describe('HorizontalBarChart', () => {
  it('renders a VictoryChart', () => {
    const wrapper = shallow(<HorizontalBarChart data={simpleData} />);
    expect(wrapper.find('VictoryChart').length).to.eql(1);
  });

  it('renders a HorizontalBarChart with sample data', () => {
    const wrapper = shallow(<HorizontalBarChart data={simpleData} />);
    expect(wrapper.find({ title: 'Horizontal Bar Chart' }).length).to.eql(1);
    expect(wrapper.find({ title: 'Horizontal Bar Chart' }).props().data).to.eql([
      { sortOrder: 1, dataValue: 100, label: "cat: 100" },
      { sortOrder: 2, dataValue: 200, label: "dog: 200" },
      { sortOrder: 3, dataValue: 300, label: "fish: 300" },
      { sortOrder: 4, dataValue: 400, label: "rat: 400" },
    ]);
  });

  it('renders an updated HorizontalBarChart when passed new data', () => {
    const wrapper = shallow(<HorizontalBarChart data={simpleData} />);
    expect(wrapper.find({ title: 'Horizontal Bar Chart' }).length).to.eql(1);
    wrapper.setProps({ data: updatedSimpleData });

    expect(wrapper.find({ title: 'Horizontal Bar Chart' }).props().data).to.eql([
      { sortOrder: 1, dataValue: 100, label: "cat: 100" },
      { sortOrder: 2, dataValue: 200, label: "dog: 200" },
      { sortOrder: 3, dataValue: 300, label: "fish: 300" },
      { sortOrder: 4, dataValue: 400, label: "rat: 400" },
      { sortOrder: 5, dataValue: 500, label: "bat: 500" },
    ]);
  });

  it('renders both axes', () => {
    const wrapper = shallow(<HorizontalBarChart data={simpleData} />);

    const axes = wrapper.find('VictoryAxis');
    const xAxis = wrapper.find({ title: 'X Axis' });
    const yAxis = wrapper.find({ title: 'Y Axis' });

    expect(axes.length).to.eql(2);
    expect(xAxis.length).to.eql(1);
    expect(yAxis.length).to.eql(1);
  });

  it('should properly set a domain if provided with one', () => {
    const wrapper = shallow(<HorizontalBarChart data={simpleData} domain={simpleDataDomain} />);
    const chart = wrapper.find('VictoryChart');

    expect(chart.props().domain).to.eql(simpleDataDomain);
  });

  it('renders unstructured data', () => {
    const props = {
      data: sampleUnstructuredData,
      dataLabel: 'label',
      dataValue: 'population',
    };
    const wrapper = shallow(<HorizontalBarChart {...props} />);
    expect(wrapper.find({ title: 'Horizontal Bar Chart' }).props().data).to.eql([
      { sortOrder: 1, dataValue: 2000, label: "Labrador Retriever: 2,000" },
      { sortOrder: 2, dataValue: 8000, label: "Standard Poodle: 8,000" },
      { sortOrder: 3, dataValue: 6000, label: "French Bulldog: 6,000" },
    ]);
  });
});
