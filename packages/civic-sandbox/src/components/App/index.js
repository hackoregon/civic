import React from 'react';
import { css } from 'emotion';

const placeholderClass = css`
  margin: 30px auto;
  padding: 30px;
  border: 2px solid #EEE;
  text-align: center;
  max-width: 800px;
`;

import '@hackoregon/component-library/assets/global.styles.css';

const App = () => (
  <div className={placeholderClass}>
    <h1>Civic Sandbox Placeholder</h1>
  </div>
);

App.displayName = 'App';

export default App;
