"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SliderTooltip = function SliderTooltip(_ref) {
  var value = _ref.value;
  return _react2.default.createElement(
    "div",
    { className: "panel panel-default" },
    _react2.default.createElement(
      "div",
      { className: "panel-body" },
      _react2.default.createElement(
        "ul",
        { className: "list-inline" },
        _react2.default.createElement(
          "li",
          null,
          _react2.default.createElement(
            "span",
            { className: "hour" },
            "$ ",
            value.toFixed(2)
          ),
          " /hour"
        ),
        _react2.default.createElement(
          "li",
          null,
          _react2.default.createElement(
            "span",
            { className: "day" },
            "$ ",
            value * 8
          ),
          " /day"
        ),
        _react2.default.createElement(
          "li",
          null,
          _react2.default.createElement(
            "span",
            { className: "week" },
            "$ ",
            Math.round(value * 8 * 5)
          ),
          " /week"
        ),
        _react2.default.createElement(
          "li",
          null,
          _react2.default.createElement(
            "span",
            { className: "month" },
            "$ ",
            value * 8 * 22
          ),
          " /month"
        ),
        _react2.default.createElement(
          "li",
          null,
          _react2.default.createElement(
            "span",
            { className: "year" },
            "$ ",
            value * 8 * 22 * 12
          ),
          " /year"
        )
      )
    )
  );
};

exports.default = SliderTooltip;