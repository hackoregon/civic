'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Button', function () {
  var testString = 'Hello';
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _Button2.default,
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