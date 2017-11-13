var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from 'react';
import Nav from './Nav';
import Logo from '../Logo/LogoAnimated';
import styles from './Header.css';
import Icon from '../Icon/Icon';
import { ICONS } from '../styleConstants';

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
        { className: styles.container },
        React.createElement(
          'nav',
          { className: styles.header },
          React.createElement(
            'div',
            { className: styles.logo },
            React.createElement(Logo, { alt: title })
          ),
          React.createElement(
            'div',
            { className: styles.nav + ' ' + (this.state.menuActive ? styles.active : styles.inactive) },
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
            { className: styles.burger },
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