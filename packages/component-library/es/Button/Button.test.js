import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', function () {
  var testString = 'Hello';
  var wrapper = shallow(React.createElement(
    Button,
    null,
    testString
  ));
  it('should render a button', function () {
    expect(wrapper.find('button')).to.have.length(1);
  });
  it('should render with class base', function () {
    expect(wrapper.props().className).to.contain('base');
  });
  it('should have the appropriate child text', function () {
    expect(wrapper.text()).to.eql(testString);
  });
});