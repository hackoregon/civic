import React from 'react';
import './Hero.css';

var Hero = function Hero(props) {
  return React.createElement(
    'div',
    { className: 'Hero' },
    React.createElement(
      'div',
      { className: 'Container' },
      React.createElement(
        'div',
        { className: 'Content' },
        React.createElement(
          'h1',
          null,
          'Data for the people,',
          React.createElement('br', null),
          'by the people.'
        )
      )
    )
  );
};

Hero.displayName = 'Hero';

export default Hero;