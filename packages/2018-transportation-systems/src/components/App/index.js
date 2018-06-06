import React from 'react';

import '@hackoregon/component-library/assets/global.styles.css';

import DeclineInRidership from '../DeclineInRidership';
import HistoricalChangesToBusService from '../HistoricalChangesToBusService';
import ReducedServiceReducedRidership from '../ReducedServiceReducedRidership';
import DriversOfPublicTransitParticipation from '../DriversOfPublicTransitParticipation';
import ExploreBusServiceAndEquity from '../ExploreBusServiceAndEquity';
import MobilityTrendsUsingRealTimeData from '../MobilityTrendsUsingRealTimeData';
import TheSecretIsInTheSensors from '../TheSecretIsInTheSensors';
import DiveDeeperIntoTransportationData from '../DiveDeeperIntoTransportationData';

const App = () => (
  <div style={{ marginTop: '30px' }}>
    <DeclineInRidership />
    <HistoricalChangesToBusService />
    <ReducedServiceReducedRidership />
    <DriversOfPublicTransitParticipation />
    <ExploreBusServiceAndEquity />
    <MobilityTrendsUsingRealTimeData />
    <TheSecretIsInTheSensors />
    <DiveDeeperIntoTransportationData />
  </div>
);

App.displayName = 'App';

export default App;
