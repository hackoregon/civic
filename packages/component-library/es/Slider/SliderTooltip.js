import React from 'react';

var SliderTooltip = function SliderTooltip(_ref) {
  var value = _ref.value;
  return React.createElement(
    "div",
    { className: "panel panel-default" },
    React.createElement(
      "div",
      { className: "panel-body" },
      React.createElement(
        "ul",
        { className: "list-inline" },
        React.createElement(
          "li",
          null,
          React.createElement(
            "span",
            { className: "hour" },
            "$ ",
            value.toFixed(2)
          ),
          " /hour"
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "span",
            { className: "day" },
            "$ ",
            value * 8
          ),
          " /day"
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "span",
            { className: "week" },
            "$ ",
            Math.round(value * 8 * 5)
          ),
          " /week"
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "span",
            { className: "month" },
            "$ ",
            value * 8 * 22
          ),
          " /month"
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
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

export default SliderTooltip;