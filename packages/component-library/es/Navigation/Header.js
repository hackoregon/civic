var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  background-color: ', ';\n  width: 100%;\n  min-width: 320px;\n'], ['\n  background-color: ', ';\n  width: 100%;\n  min-width: 320px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  background-color: ', ';\n  display: flex;\n  z-index: 1;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  min-width: 320px;\n  margin: 0 auto;\n  padding: 1rem 0;\n'], ['\n  background-color: ', ';\n  display: flex;\n  z-index: 1;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  min-width: 320px;\n  margin: 0 auto;\n  padding: 1rem 0;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  margin: 0 30px 0 0;\n  display:block;\n\n  @media (max-width: 640px) {\n    &.active {\n      display:block;\n    }\n\n    &.inactive {\n      display:none;\n    }\n  }\n'], ['\n  margin: 0 30px 0 0;\n  display:block;\n\n  @media (max-width: 640px) {\n    &.active {\n      display:block;\n    }\n\n    &.inactive {\n      display:none;\n    }\n  }\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  margin: 1rem 0 0 2rem;\n  flex: 2;\n'], ['\n  margin: 1rem 0 0 2rem;\n  flex: 2;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  a& {\n    display: none;\n    padding: 2rem;\n    border: none;\n\n    @media (max-width: 640px) {\n      display:block;\n    }\n  }\n'], ['\n  a& {\n    display: none;\n    padding: 2rem;\n    border: none;\n\n    @media (max-width: 640px) {\n      display:block;\n    }\n  }\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { PropTypes, Component } from 'react';
import { css } from 'emotion';
import Nav from './Nav';
import Logo from '../Logo/LogoAnimated';
import Icon from '../Icon/Icon';
import { ICONS } from '../styleConstants';

var primaryColor = 'rgb(34, 15, 37)';

var containerClass = css(_templateObject, primaryColor);

var headerClass = css(_templateObject2, primaryColor);

var navClass = css(_templateObject3);

var logoClass = css(_templateObject4);

var burgerClass = css(_templateObject5);

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));

    _this.togglesNestedMenu = function () {
      return _this.setState({ menuActive: !_this.state.menuActive });
    };

    _this.state = {
      menuActive: false
    };
    return _this;
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          menu = _props.menu,
          title = _props.title;

      return React.createElement(
        'div',
        { className: containerClass },
        React.createElement(
          'nav',
          { className: headerClass },
          React.createElement(
            'div',
            { className: logoClass },
            React.createElement(Logo, { alt: title })
          ),
          React.createElement(
            'div',
            { className: navClass + ' ' + (this.state.menuActive ? 'active' : 'inactive') },
            React.createElement(Nav, {
              menu: menu,
              toggleSubNav: this.togglesNestedMenu,
              showNestedMenu: this.state.nestedMenu,
              togglesNestedMenu: this.togglesNestedMenu
            }),
            children
          ),
          React.createElement(
            'a',
            { className: burgerClass },
            React.createElement(Icon, {
              key: 'nav-burger',
              className: '' + ICONS.hamburger,
              handleClick: this.togglesNestedMenu
            })
          )
        )
      );
    }
  }]);

  return Header;
}(Component);

Header.displayName = 'Header';
Header.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  children: PropTypes.node
};

export default Header;