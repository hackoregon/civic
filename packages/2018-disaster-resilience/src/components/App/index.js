import React from 'react';

import '@hackoregon/component-library/assets/global.styles.css';
import LifeAlteringEvent from '../LifeAlteringEvent';
import ViolentShakingAndGroundDeformation from '../ViolentShakingAndGroundDeformation';
import SignificantStructuralDamage from '../SignificantStructuralDamage';
import YouAndYourNeighbors from '../YouAndYourNeighbors';
import WhatYouCanDoToPrepare from '../WhatYouCanDoToPrepare';
import IncreasingSocialCapital from '../IncreasingSocialCapital';
import ProactivePlanning from '../ProactivePlanning';

const App = () => (
  <div style={{ marginTop: '30px' }}>
    <ViolentShakingAndGroundDeformation />
    <SignificantStructuralDamage />
    <LifeAlteringEvent />
    <YouAndYourNeighbors />
    <WhatYouCanDoToPrepare />
    <IncreasingSocialCapital />
    <ProactivePlanning />
  </div>
);

App.displayName = 'App';

export default App;
