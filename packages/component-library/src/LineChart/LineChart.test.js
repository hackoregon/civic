import React from 'react';
import { shallow } from 'enzyme';

import LineChart from './LineChart';

describe('LineChart', () => {
  const data = [
    { year: 2015, population: 1 },
    { year: 2016, population: 2 },
    { year: 2017, population: 3 },
  ];

  const defaultProps = {
    data,
    dataKey: 'year',
    dataValue: 'population',
  };

  it('should render a VictoryChart', () => {
    const wrapper = shallow(<LineChart {...defaultProps} />);

    expect(wrapper.find('VictoryChart').length).to.eql(1);
  });
/* TODO: rewrite these tests
  it('should render the relevant axis', () => {
    const wrapper = shallow(<LineChart xLabel="Year" {...defaultProps} />);

    const xAxis = wrapper
      .find('VictoryAxis')
      .find({ label: 'Year' });
    const yAxis = wrapper
      .find('VictoryAxis')
      .find({ dependentAxis: true });

    expect(xAxis.prop('tickValues')).to.eql([2015, 2016, 2017]);
    expect(yAxis.prop('tickValues')).to.eql([1, 2, 3]);
  });

  it('should render the VictoryLine', () => {
    const wrapper = shallow(<LineChart {...defaultProps} />);

    expect(wrapper.find('VictoryLine').prop('data')).to.eql([
      { dataKey: 2015, dataValue: 1 },
      { dataKey: 2016, dataValue: 2 },
      { dataKey: 2017, dataValue: 3 },
    ]);
  });
*/
});
