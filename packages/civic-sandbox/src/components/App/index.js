import React from 'react';
import Packages from '../Packages';
import '@hackoregon/component-library/assets/global.styles.css';
import { PageLayout } from '@hackoregon/component-library';


const App = () => (
  <PageLayout>
    <Packages />
  </PageLayout>
);

App.displayName = 'App';

export default App;
