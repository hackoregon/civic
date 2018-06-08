import React from 'react';
import { Link } from 'react-router';
import { PageLayout } from '@hackoregon/component-library';

const HomePage = () => (
  <PageLayout>
    <h1>Temporary home page with example routes</h1>
    <ul>
      <li><Link to="/cities/portland">Portland Collection</Link></li>
      <li><Link to="/states/oregon">Oregon Collection</Link></li>
      <li><Link to="/cities/seattle">Theoretical Seattle Collection</Link></li>
      <li><Link to="/states/california">Theoretical California Collection</Link></li>
    </ul>
  </PageLayout>
);

HomePage.displayName = 'HomePage';

export default HomePage;
