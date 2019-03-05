import React from 'react';
import { shallow } from 'enzyme';

import ChartContainer from './ChartContainer';

describe('ChartContainer', () => {
  it('should render a div with contents', () => {
    const wrapper = shallow(
      <ChartContainer>
        <p>test</p>
      </ChartContainer>
    );

    expect(wrapper.find('p').text()).to.eql('test');
  });
});
