import React from 'react';

import '@hackoregon/component-library/assets/global.styles.css';
import { StoryCard, Placeholder } from '@hackoregon/component-library';

const App = () => (
  <StoryCard title="An example transportation Story Card">
    <Placeholder />
  </StoryCard>
);

App.displayName = 'App';

export default App;
