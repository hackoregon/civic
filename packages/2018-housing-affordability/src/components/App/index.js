import React from 'react';

import '@hackoregon/component-library/assets/global.styles.css';
import { StoryCard, Placeholder } from '@hackoregon/component-library';

const App = () => console.log('rendering app') || (
  <StoryCard title="An example Story Card">
    <Placeholder />
  </StoryCard>
);

App.displayName = 'App';

export default App;
