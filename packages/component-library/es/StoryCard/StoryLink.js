var _templateObject = _taggedTemplateLiteral(['\n  border-bottom: 2px solid ', ';\n\n  & a {\n    display: flex;\n    padding: 6px 8px 6px 6px;\n    flex-wrap: nowrap;\n    align-items: center;\n    justify-content: space-between;\n    border-bottom: none;\n\n    &:hover {\n      background-color: ', ';\n      color: #FFF;\n    }\n\n    &:focus {\n      outline: none;\n    }\n\n    & i {\n      margin-right: 12px;\n    }\n  }\n\n  & span {\n    flex-wrap: nowrap;\n    transition: all 0.2s ease-in-out;\n  }\n'], ['\n  border-bottom: 2px solid ', ';\n\n  & a {\n    display: flex;\n    padding: 6px 8px 6px 6px;\n    flex-wrap: nowrap;\n    align-items: center;\n    justify-content: space-between;\n    border-bottom: none;\n\n    &:hover {\n      background-color: ', ';\n      color: #FFF;\n    }\n\n    &:focus {\n      outline: none;\n    }\n\n    & i {\n      margin-right: 12px;\n    }\n  }\n\n  & span {\n    flex-wrap: nowrap;\n    transition: all 0.2s ease-in-out;\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { css } from 'emotion';

var primaryColor = 'rgb(238, 73, 80)';
var storyLinkClass = css(_templateObject, primaryColor, primaryColor);

var StoryLink = function StoryLink(_ref) {
  var children = _ref.children,
      icon = _ref.icon,
      route = _ref.route,
      action = _ref.action;
  return React.createElement(
    'div',
    { className: storyLinkClass },
    route ? React.createElement(
      Link,
      { to: route },
      React.createElement('i', { className: icon }),
      React.createElement(
        'span',
        null,
        children
      )
    ) : React.createElement(
      'a',
      { tabIndex: '0', onClick: action },
      React.createElement('i', { className: icon }),
      React.createElement(
        'span',
        null,
        children
      )
    )
  );
};

StoryLink.displayName = 'StoryLink';
StoryLink.propTypes = {
  action: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.string,
  route: PropTypes.string
};

export default StoryLink;