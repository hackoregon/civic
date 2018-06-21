import React from 'react';

import '@hackoregon/component-library/assets/global.styles.css';
import { PageLayout } from '@hackoregon/component-library';
import DeclineInRidership from '../DeclineInRidership';
import HistoricalChangesToBusService from '../HistoricalChangesToBusService';
import ServiceAndRidership from '../ServiceAndRidership';
import DriversOfPublicTransitParticipation from '../DriversOfPublicTransitParticipation';
import ExploreBusServiceAndEquity from '../ExploreBusServiceAndEquity';
import MobilityTrendsUsingRealTimeData from '../MobilityTrendsUsingRealTimeData';
import TheSecretIsInTheSensors from '../TheSecretIsInTheSensors';
import DiveDeeperIntoTransportationData from '../DiveDeeperIntoTransportationData';

const App = () => (
  <PageLayout
    teamTitle="Transportation Systems"
    heroTitle="Identifying Opportunities for Equitable Mobility in Cities"
  >
    <DeclineInRidership />
    <HistoricalChangesToBusService />
    <ServiceAndRidership />
    <DriversOfPublicTransitParticipation />
    <ExploreBusServiceAndEquity />
    <MobilityTrendsUsingRealTimeData />
    <TheSecretIsInTheSensors />
    <DiveDeeperIntoTransportationData />
  </PageLayout>
);

App.displayName = 'App';

export default App;
