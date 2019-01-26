import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  const testString = 'Hello';
  const wrapper = shallow(<Button>{testString}</Button>);
  it('should render a button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });
  it('should have the appropriate child text', () => {
    expect(wrapper.text()).to.eql(testString);
  });
});
