import React from 'react';
import Header from '@hackoregon/component-library/lib/Navigation/Header';
import Footer from '@hackoregon/component-library/lib/Footer/Footer';
import '@hackoregon/component-library/lib/global.styles.css';

import AboutPage from '../client/views/AboutPage';

const About = () => {
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
      <AboutPage />
      <Footer />
    </div>);
};

export default About;
