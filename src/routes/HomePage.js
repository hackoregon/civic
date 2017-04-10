import React, { PropTypes } from 'react';
import Header from '@hackoregon/component-library/lib/Navigation/Header';
import Footer from '@hackoregon/component-library/lib/Footer/Footer';
import '@hackoregon/component-library/lib/global.styles.css';

const App = ({ children }) => {
  const navItems = [
    {
      name: 'Collections',
      path: '/collections',
      nestedMenu: [
      { name: 'Budget', path: '/collections/budget' },
      { name: 'Emergency Response', path: '/collections/emergency' },
      { name: 'Housing', path: '/collections/housing' },
      { name: 'Homlessness', path: '/collections/homlessness' },
      { name: 'Transportation', path: '/collections/transportation' },
      ],
    },
  { name: 'About', path: '/about' },
  ];
  return (
    <div>
      <Header title="Civic" menu={navItems} />
      {children}
      <Footer />
    </div>);
};

App.propTypes = {
  children: PropTypes.node,
};

App.defaultProps = {
  children: null,
};

export default App;
