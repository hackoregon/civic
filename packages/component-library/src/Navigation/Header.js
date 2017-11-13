import React, { PropTypes, Component } from 'react';
import Nav from './Nav';
import Logo from '../Logo/LogoAnimated';
import styles from './Header.css';
import Icon from '../Icon/Icon';
import { ICONS } from '../styleConstants';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuActive: false,
    };
  }

  togglesNestedMenu = () => this.setState({ menuActive: !this.state.menuActive })

  render() {
    const { children, menu, title } = this.props;
    return (
      <div className={styles.container}>
        <nav className={styles.header}>
          <div className={styles.logo}>
            <Logo alt={title} />
          </div>
          <div className={`${styles.nav} ${this.state.menuActive ? styles.active : styles.inactive}`}>
            <Nav
              menu={menu}
              toggleSubNav={this.togglesNestedMenu}
              showNestedMenu={this.state.nestedMenu}
              togglesNestedMenu={this.togglesNestedMenu}
            />

            { children }
          </div>
          <a className={styles.burger}>
            <Icon
              key="nav-burger"
              className={`${ICONS.hamburger}`}
              handleClick={this.togglesNestedMenu}
            />
          </a>
        </nav>
      </div>
    );
  }

}

Header.displayName = 'Header';
Header.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Header;
