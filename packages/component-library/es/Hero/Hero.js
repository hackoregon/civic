import React from 'react';
import styles from './Hero.css';

var DefaultChildren = function DefaultChildren() {
  return React.createElement(
    'h1',
    null,
    'Data for the people,',
    React.createElement('br', null),
    'by the people.'
  );
};

var Hero = function Hero(_ref) {
  var children = _ref.children;
  return React.createElement(
    'div',
    { className: styles.hero },
    React.createElement(
      'div',
      { className: styles.container },
      React.createElement(
        'div',
        { className: styles.content },
        children || React.createElement(DefaultChildren, null)
      )
    )
  );
};

Hero.displayName = 'Hero';

Hero.propTypes = {
  children: React.PropTypes.node
};

export default Hero;