import React, { PropTypes } from 'react';
import Header from '@hackoregon/component-library/lib/Navigation/Header';

const Home = ({ children }) => {
  const navItems = [
    { name: 'Collections', path: '/civic/collections' },
    { name: 'About', path: '/civic/about' },
    { name: 'Explore', path: '/civic/explore' },
  ];
  return (
    <div>
      <Header title="Civic" menu={navItems} />
      {children}
    </div>);
};

Home.propTypes = {
  children: PropTypes.node,
};

export default Home;
