import React, { PropTypes, Component } from 'react';
import NavSubMenu from './NavSubMenu';
import NavLink from './NavRouterLink';
import styles from './Nav.css';
import Icon from '../Icon/Icon';

const defaultMenu = [
  {
    name: 'Collections',
    path: '/collections',
    nestedMenu: [
      { name: 'Budget', path: '/collections/budget' },
      { name: 'Emergency Response', path: '/collections/emergency' },
      { name: 'Housing', path: '/collections/housing' },
      { name: 'Homelessness', path: '/collections/homlessness' },
      { name: 'Transportation', path: '/collections/transportation' },
      { name: 'Past Projects', path: '/collections/past-projects' },
    ],
  },
  { name: 'About', path: '/about' },
];

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      menuActive: false,
      items: [],
    };
  }

  handleClick = (name, menu, e) => {
    e.preventDefault();
    const items = !this.state.menuActive ? menu : [];

    this.setState(() => ({ menuActive: !this.state.menuActive, items }));
  }

  render() {
    const { menu = defaultMenu, toggleNestedMenu = this.handleClick } = this.props;
    return (
      <div className={styles.Nav}>
        <a className={styles.ex}><Icon key="nav-ex" className={'fa fa-times'} handleClick={this.props.toggleSubNav} /></a>
        <ul>
          {menu.map((item, idx) =>
            (item.nestedMenu
              ? <li key={idx} onClick={e => toggleNestedMenu(item.name, item.nestedMenu, e)}><a>{item.name}<Icon className={'fa fa-angle-down'}></Icon></a></li> // eslint-disable-line
              : <NavLink
                key={idx}
                name={item.name}
                path={item.path}
              />
            ))
          }
        </ul>
        <NavSubMenu isVisible={this.state.menuActive} items={this.state.items} />
      </div>
    );
  }
    }

Nav.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, path: PropTypes.string })),
  toggleNestedMenu: PropTypes.func,
  toggleSubNav: PropTypes.func,
};

export default Nav;
