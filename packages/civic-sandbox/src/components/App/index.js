import React from 'react';
import { css } from 'emotion';
import Packages from '../Packages';

import '@hackoregon/component-library/assets/global.styles.css';

const placeholderClass = css`
  margin: 30px auto;
  border: 2px solid #EEE;
  max-width: 800px;
`;

const App = () => (
  <div className={placeholderClass}>
    <h1>Civic Sandbox</h1>
    <Packages />
  </div>
);

App.displayName = 'App';

export default App;
