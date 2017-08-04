import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.styles.css';

var cx = classNames.bind(styles);

var className = cx({ base: true });

var Button = function Button(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick;
  return React.createElement(
    'button',
    { className: className, onClick: onClick },
    children
  );
};

Button.displayName = 'Button';

Button.propTypes = {
  children: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default Button;