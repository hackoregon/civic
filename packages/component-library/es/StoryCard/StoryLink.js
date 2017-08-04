import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './StoryLink.css';

var StoryLink = function StoryLink(_ref) {
  var children = _ref.children,
      icon = _ref.icon,
      route = _ref.route,
      action = _ref.action;
  return React.createElement(
    'div',
    { className: 'StoryLink' },
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