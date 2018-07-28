import React from 'react';
import { shallow } from 'enzyme';

import SimpleLegend from './SimpleLegend';

describe('SimpleLegend', () => {
  it('should render a legend when provided data', () => {
    const testLegendData = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
    const wrapper = shallow(<SimpleLegend legendData={testLegendData} />);

    expect(wrapper.find('div')).to.have.length(1);
  });
});
