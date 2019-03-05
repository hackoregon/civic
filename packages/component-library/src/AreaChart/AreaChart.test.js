import React from 'react';
import { shallow } from 'enzyme';
import AreaChart from './AreaChart';

describe('AreaChart', () => {
  const { data, colors } = {
    data: [
      { name: 'Year 1', Line1: 6000, Line2: 4000, Line3: 2000 },
      { name: 'Year 2', Line1: 3000, Line2: 2000, Line3: 1500 },
    ],
    colors: ['#a6cee3', '#1f78b4', '#b2df8a'],
  };

  const wrapper = shallow(<AreaChart data={data} colors={colors} />);

  it('should render a div', () => {
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('should render a div with one child element', () => {
    expect(wrapper.find('div').children()).to.have.length(1);
  });

  it('should render a div with one child element that itself has seven children elements', () => {
    expect(
      wrapper
        .find('div')
        .children()
        .props().children
    ).to.have.length(7);
  });
});
