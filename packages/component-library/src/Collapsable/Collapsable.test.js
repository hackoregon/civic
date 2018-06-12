import React from 'react';
import { shallow } from 'enzyme';
import Collapsable from './Collapsable';

describe('Collapsable', () => {
  it('should render all children by default', () => {
    const wrapper = shallow(
      <Collapsable>
        <span>test1</span>
        <span>test2</span>
      </Collapsable>
    );

    expect(wrapper.find('span').length).to.eql(2);
  });

  it('should collapse hidden children by default', () => {
    const wrapper = shallow(
      <Collapsable>
        <span>test1</span>
        <span hidden>test2</span>
      </Collapsable>
    );

    expect(wrapper.find('span').length).to.eql(1);
  });

  it('should expand and collapse', () => {
    const wrapper = shallow(
      <Collapsable>
        <span>test1</span>
        <span hidden>test2</span>
      </Collapsable>
    );

    expect(wrapper.find('a').text()).to.eql('Show more');
    expect(wrapper.find('span').length).to.eql(1);
    wrapper.find('a').simulate('click');
    expect(wrapper.find('a').text()).to.eql('Show less');
    expect(wrapper.find('span').length).to.eql(2);
    wrapper.find('a').simulate('click');
    expect(wrapper.find('span').length).to.eql(1);
  });
});
