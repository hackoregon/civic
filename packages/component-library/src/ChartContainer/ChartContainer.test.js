import React from 'react';
import { shallow } from 'enzyme';

import ChartContainer from './ChartContainer';

describe('ChartContainer', () => {
  it('should render a title and subtitle when provided', () => {
    const wrapper = shallow(<ChartContainer title="Fun title" subtitle="Fun subtitle" />);

    expect(wrapper.find('h3').text()).to.eql('Fun title');
    expect(wrapper.find('span').text()).to.eql('Fun subtitle');
  });

  it('should neither render a title nor a subtitle when neither are provided', () => {
    const wrapper = shallow(<ChartContainer />);

    expect(wrapper.find('h3').length).to.eql(0);
    expect(wrapper.find('span').length).to.eql(0);
  });
});
