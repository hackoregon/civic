'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelectize = require('react-selectize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownMenu = function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu(props) {
    _classCallCheck(this, DropdownMenu);

    var _this = _possibleConstructorReturn(this, (DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call(this, props));

    _this.state = {
      value: '',
      label: ''
    };
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(DropdownMenu, [{
    key: 'handleChange',
    value: function handleChange(option) {
      if (option) {
        if (this.props.dispatch) {
          this.props.dispatch(this.props.reduxAction(option.value));
        }
        this.setState({ value: option.value, label: option.label });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      require('react-selectize/dist/index.css');
      return _react2.default.createElement(_reactSelectize.SimpleSelect, _extends({}, this.props, {
        onValueChange: this.handleChange,
        theme: 'default',
        transitionEnter: true,
        transitionLeave: true,
        options: this.props.options
      }));
    }
  }]);

  return DropdownMenu;
}(_react.Component);

DropdownMenu.propTypes = {
  options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    value: _react.PropTypes.string,
    label: _react.PropTypes.string
  })),
  dispatch: _react.PropTypes.func,
  reduxAction: _react.PropTypes.func
};
exports.default = DropdownMenu;