import React from 'react';

import '@hackoregon/component-library/assets/global.styles.css';
import { PageLayout } from '@hackoregon/component-library';
import LifeAlteringEvent from '../LifeAlteringEvent';
import ViolentShakingAndGroundDeformation from '../ViolentShakingAndGroundDeformation';
import SignificantStructuralDamage from '../SignificantStructuralDamage';
import YouAndYourNeighbors from '../YouAndYourNeighbors';
import WhatYouCanDoToPrepare from '../WhatYouCanDoToPrepare';
import IncreasingSocialCapital from '../IncreasingSocialCapital';
import ProactivePlanning from '../ProactivePlanning';

const App = () => (
  <PageLayout>
    <ViolentShakingAndGroundDeformation />
    <SignificantStructuralDamage />
    <LifeAlteringEvent />
    <YouAndYourNeighbors />
    <WhatYouCanDoToPrepare />
    <IncreasingSocialCapital />
    <ProactivePlanning />
  </PageLayout>
);

App.displayName = 'App';

export default App;
