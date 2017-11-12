import React from 'react';
import { Header, Footer } from '@hackoregon/component-library';
import '@hackoregon/component-library/lib/global.styles.css';

import HomePage from '../views/HomePage';

const Home = () => {
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
      <HomePage />
      <Footer />
    </div>);
};

export default Home;
