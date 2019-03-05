import React from 'react';
import { shallow } from 'enzyme';
import PieChart from './PieChart';

describe('PieChart', () => {
  const data = [
    { x: 'slice1', y: 3000 },
    { x: 'slice2', y: 20 },
    { x: 'slice3', y: 6500 },
  ];
  const defaultProps = {
    data,
  };

  it('should render a VictoryPie inside a ChartContainer', () => {
    const wrapper = shallow(<PieChart {...defaultProps} />);
    expect(wrapper.find('ChartContainer')).to.have.length(1);
    expect(
      wrapper
        .find('ChartContainer')
        .children()
        .find('VictoryPie')
    ).to.have.length(1);
  });

  describe('nullable props handling', () => {
    const nullProps = {
      dataLabel: null,
      dataValue: null,
    };
    const valueProps = {
      dataLabel: 'foo',
      dataValue: 'bar',
    };
    const nulledWrapper = shallow(
      <PieChart {...defaultProps} {...nullProps} />
    );
    const valuedWrapper = shallow(
      <PieChart {...defaultProps} {...valueProps} />
    );

    it('should handle nullable dataKey', () => {
      expect(nulledWrapper.find('VictoryPie').prop('x')).to.eql('x');
      expect(valuedWrapper.find('VictoryPie').prop('x')).to.eql(
        valueProps.dataLabel
      );
    });

    it('should handle nullable labelKey', () => {
      expect(nulledWrapper.find('VictoryPie').prop('y')).to.eql('y');
      expect(valuedWrapper.find('VictoryPie').prop('y')).to.eql(
        valueProps.dataValue
      );
    });
  });
});
