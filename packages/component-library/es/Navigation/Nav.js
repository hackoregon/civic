var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  position: relative;\n  min-width: 320px;\n\n  & ul {\n    display: flex;\n    list-style: none;\n    align-items: center;\n    justify-content: center;\n\n    & > li {\n      flex: 1 1 100%;\n\n      & span i {\n        margin-left: 10px;\n      }\n    }\n  }\n\n  & .nav-item {\n    color: white;\n    flex: 1;\n    display: block;\n    font-family: \'Rubik\', sans-serif;\n    font-size: 1.25rem;\n    border: none;\n    text-transform: uppercase;\n    text-decoration: none;\n    padding: 1rem;\n    text-align: center;\n\n    &:hover {\n      color: rgba(255, 255, 255, 0.85);\n      text-decoration: none;\n    }\n  }\n\n  @media (max-width: 640px) {\n    position: absolute;\n    z-index: 1;\n    height: 100%;\n    width: 100%;\n    margin: 0 !important;\n    padding: 0 !important;\n    top: 0;\n    left: 0;\n    background-color: rgb(34, 15, 37);\n\n    & ul {\n      display: block;position: relative;\n      margin: 0;\n      padding-top: 80px;\n\n      & > li {\n        color: #FFF;\n        display: block;\n        text-align: center;\n        text-decoration: none;\n        transition: all .25s ease-in-out;\n        margin: 0;\n        padding: 0;\n        flex: none;\n      }\n    }\n  }\n'], ['\n  position: relative;\n  min-width: 320px;\n\n  & ul {\n    display: flex;\n    list-style: none;\n    align-items: center;\n    justify-content: center;\n\n    & > li {\n      flex: 1 1 100%;\n\n      & span i {\n        margin-left: 10px;\n      }\n    }\n  }\n\n  & .nav-item {\n    color: white;\n    flex: 1;\n    display: block;\n    font-family: \'Rubik\', sans-serif;\n    font-size: 1.25rem;\n    border: none;\n    text-transform: uppercase;\n    text-decoration: none;\n    padding: 1rem;\n    text-align: center;\n\n    &:hover {\n      color: rgba(255, 255, 255, 0.85);\n      text-decoration: none;\n    }\n  }\n\n  @media (max-width: 640px) {\n    position: absolute;\n    z-index: 1;\n    height: 100%;\n    width: 100%;\n    margin: 0 !important;\n    padding: 0 !important;\n    top: 0;\n    left: 0;\n    background-color: rgb(34, 15, 37);\n\n    & ul {\n      display: block;position: relative;\n      margin: 0;\n      padding-top: 80px;\n\n      & > li {\n        color: #FFF;\n        display: block;\n        text-align: center;\n        text-decoration: none;\n        transition: all .25s ease-in-out;\n        margin: 0;\n        padding: 0;\n        flex: none;\n      }\n    }\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    display: none;\n    position: absolute;\n    right: 1rem;\n    width: auto;\n    z-index: 999;\n\n    @media (max-width: 640px) {\n      display: block;\n      color: rgba(255, 255, 255, 0.65);\n      border: none;\n      font-family: \'Rubik\', sans-serif;\n      font-size: 1.25rem;\n      font-weight: 500;\n      padding: 1rem;\n    }\n'], ['\n    display: none;\n    position: absolute;\n    right: 1rem;\n    width: auto;\n    z-index: 999;\n\n    @media (max-width: 640px) {\n      display: block;\n      color: rgba(255, 255, 255, 0.65);\n      border: none;\n      font-family: \'Rubik\', sans-serif;\n      font-size: 1.25rem;\n      font-weight: 500;\n      padding: 1rem;\n    }\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { Component } from 'react';
import { css } from 'emotion';
import NavSubMenu from './NavSubMenu';
import NavLink from './NavRouterLink';
import Icon from '../Icon/Icon';
import PropTypes from 'prop-types';

var defaultMenu = [{
  name: 'Collections',
  path: '/',
  nestedMenu: [{ name: 'Disaster Resilience', path: '/cities/portland/disaster' }, { name: 'Housing Affordability', path: '/cities/portland/housing' }, { name: 'Local Elections', path: '/cities/portland/elections' }, { name: 'Neighborhood Development', path: '/cities/portland/neighborhood' }, { name: 'Transportation Systems', path: '/cities/portland/transportation' }]
}, {
  name: 'Sandbox',
  path: '/sandbox'
}];

var navClass = css(_templateObject);

var exClass = css(_templateObject2);

var Nav = function (_Component) {
  _inherits(Nav, _Component);

  function Nav() {
    _classCallCheck(this, Nav);

    var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this));

    _this.handleClick = function (name, menu, e) {
      e.preventDefault();
      var items = menu;

      _this.setState(function () {
        return { menuActive: !_this.state.menuActive, items: items };
      });
    };

    _this.state = {
      menuActive: false,
      items: []
    };
    return _this;
  }

  _createClass(Nav, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$menu = _props.menu,
          menu = _props$menu === undefined ? defaultMenu : _props$menu,
          _props$toggleNestedMe = _props.toggleNestedMenu,
          toggleNestedMenu = _props$toggleNestedMe === undefined ? this.handleClick : _props$toggleNestedMe;

      return React.createElement(
        'div',
        { className: navClass },
        React.createElement(
          'a',
          { className: exClass },
          React.createElement(Icon, { key: 'nav-ex', className: 'fa fa-times', handleClick: this.props.toggleSubNav })
        ),
        React.createElement(
          'ul',
          null,
          menu.map(function (item, idx) {
            return item.nestedMenu ? React.createElement(
              'li',
              { key: idx, onClick: function onClick(e) {
                  return toggleNestedMenu(item.name, item.nestedMenu, e);
                } },
              React.createElement(
                'a',
                { className: 'nav-item' },
                item.name,
                React.createElement(Icon, { className: 'fa fa-angle-down' })
              )
            ) : React.createElement(NavLink, {
              key: idx,
              name: item.name,
              path: item.path
            });
          })
        ),
        React.createElement(NavSubMenu, { isVisible: this.state.menuActive, items: this.state.items })
      );
    }
  }]);

  return Nav;
}(Component);

Nav.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, path: PropTypes.string })),
  toggleNestedMenu: PropTypes.func,
  toggleSubNav: PropTypes.func
};

export default Nav;