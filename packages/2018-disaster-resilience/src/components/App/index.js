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
    <p>The Cascadia Subduction Zone fault, running 100 miles off the coast from northern California to British Columbia, has the potential to cause a 9.0+ magnitude earthquake. Scientists estimate there is a 40% chance this event will occur within the next 50 years. Portland is well within the affected zone for this earthquake.</p>
    <p>Residents of Portland will not be able to change the physical impact of an earthquake of this magnitude, but there ARE actions that can be taken to change how individuals, neighborhoods and the city as a whole are able to adapt, prepare and recover from this event. This is called disaster resilience.</p>
    {/* <ViolentShakingAndGroundDeformation /> */}
    {/* <SignificantStructuralDamage /> */}
    {/* <LifeAlteringEvent /> */}
    <p>The first step in increasing disaster resiliency for most Portlanders will be to understand what the estimated impact is within their immediate vicinity.</p>
    {/* <YouAndYourNeighbors /> */}
    <WhatYouCanDoToPrepare />
    {/* <IncreasingSocialCapital /> */}
    <p className="transition">Preparedness and disaster resiliency go hand-in-hand.</p>
    <ProactivePlanning />
  </PageLayout>
);

App.displayName = 'App';

export default App;
