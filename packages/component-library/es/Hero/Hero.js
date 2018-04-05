var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  background: rgb(34, 15, 37);\n  height: 75vh;\n  min-height: 420px;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  background-size: cover;\n  background-position: center center;\n  z-index: -100;\n  align-items: center;\n  justify-content: center;\n'], ['\n  display: flex;\n  background: rgb(34, 15, 37);\n  height: 75vh;\n  min-height: 420px;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  background-size: cover;\n  background-position: center center;\n  z-index: -100;\n  align-items: center;\n  justify-content: center;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: flex;\n  width: 100%;\n  max-width: 800px;\n\n  @media (max-width: 640px) {\n    padding: 0 15px;\n  }\n'], ['\n  display: flex;\n  width: 100%;\n  max-width: 800px;\n\n  @media (max-width: 640px) {\n    padding: 0 15px;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  position: relative;\n  padding-top: 0px;\n\n  & > h1 {\n    font-size: 3em;\n    line-height: 1.25em;\n    color: #FFF;\n    font-weight: 100;\n  }\n'], ['\n  position: relative;\n  padding-top: 0px;\n\n  & > h1 {\n    font-size: 3em;\n    line-height: 1.25em;\n    color: #FFF;\n    font-weight: 100;\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { css } from 'emotion';

var heroClass = css(_templateObject);

var containerClass = css(_templateObject2);

var contentClass = css(_templateObject3);

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
    { className: heroClass },
    React.createElement(
      'div',
      { className: containerClass },
      React.createElement(
        'div',
        { className: contentClass },
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