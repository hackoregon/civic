import React from 'react';
import { shallow } from 'enzyme';
import PieChart from './PieChart';

describe('PieChart', () => {
  const data = [{ x: 'slice1', y: 3000 }, { x: 'slice2', y: 20 }, { x: 'slice3', y: 6500 }];
  const colors =['#a6cee3', '#1f78b4', '#b2df8a'];
  const defaultProps = {
    data,
    colors,
  };

  it('should render a VictoryPie inside a container div', () => {
    const wrapper = shallow(<PieChart {...defaultProps} />)
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').children().find('VictoryPie')).to.have.length(1);
  });

  describe('nullable props handling', () => {
    const nullProps = {
      dataKey: null,
      labelKey: null,
      height: null,
      width: null,
    };
    const valueProps = {
      dataKey: 'foo',
      labelKey: 'bar',
      height: 20,
      width: 30,
    };
    const nulledWrapper = shallow(<PieChart {...defaultProps} {...nullProps} />);
    const valuedWrapper = shallow(<PieChart {...defaultProps} {...valueProps} />);

    it('should handle nullable dataKey', () => {
      expect(nulledWrapper.find('VictoryPie').prop('x')).to.eql('x');
      expect(valuedWrapper.find('VictoryPie').prop('x')).to.eql(valueProps.labelKey);
    });

    it('should handle nullable labelKey', () => {
      expect(nulledWrapper.find('VictoryPie').prop('y')).to.eql('y');
      expect(valuedWrapper.find('VictoryPie').prop('y')).to.eql(valueProps.dataKey);
    });

    it('should handle nullable height', () => {
      expect(nulledWrapper.find('div').prop('style')).to.include({ height: '100vh' });
      expect(valuedWrapper.find('div').prop('style')).to.include({ height: valueProps.height });
    });

    it('should handle nullable width', () => {
      expect(nulledWrapper.find('div').prop('style')).to.include({ width: '100vw' });
      expect(valuedWrapper.find('div').prop('style')).to.include({ width: valueProps.width });
    });
  })
});
