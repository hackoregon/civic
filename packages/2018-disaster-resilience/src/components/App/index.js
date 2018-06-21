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
  <PageLayout
    teamTitle="Disaster Resiliance"
    heroTitle="Assessing Risk and Prioritizing Action to Strengthen Resilience in the Face of a Natural Disaster"
  >
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
