var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from 'react';
import NavSubMenu from './NavSubMenu';
import NavLink from './NavRouterLink';
import styles from './Nav.css';
import Icon from '../Icon/Icon';

var defaultMenu = [{
  name: 'Collections',
  path: '/collections',
  nestedMenu: [{ name: 'Budget', path: '/collections/budget' }, { name: 'Emergency Response', path: '/collections/emergency' }, { name: 'Housing', path: '/collections/housing' }, { name: 'Homelessness', path: '/collections/homlessness' }, { name: 'Transportation', path: '/collections/transportation' }, { name: 'Past Projects', path: '/collections/past-projects' }]
}, { name: 'About', path: '/about' }];

var Nav = function (_Component) {
  _inherits(Nav, _Component);

  function Nav() {
    _classCallCheck(this, Nav);

    var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this));

    _this.handleClick = function (name, menu, e) {
      e.preventDefault();
      var items = !_this.state.menuActive ? menu : [];

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
        { className: styles.Nav },
        React.createElement(
          'a',
          { className: styles.ex },
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
                null,
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