/* eslint-disable import/no-named-as-default */
import React from "react";

import "@hackoregon/component-library/assets/global.styles.css";
import { PageLayout } from "@hackoregon/component-library";
import DeclineInRidership from "../DeclineInRidership";
import ServiceAndRidership from "../ServiceAndRidership";
import DriversOfPublicTransitParticipation from "../DriversOfPublicTransitParticipation";

const App = () => (
  <PageLayout
    teamTitle="Transportation Systems"
    heroTitle="Identifying Opportunities for Equitable Mobility in Cities"
  >
    <p>
      Data released in 2017 from TriMet shows a plateau in public transit
      ridership over the last 10 years, a pattern which appears to be consistent
      across the nation. This plateau in ridership doesn’t point to a single
      variable, but through complex analysis we can begin to gather insight
      regarding equity and mobility in cities.
    </p>
    <DeclineInRidership />
    {/* <HistoricalChangesToBusService /> */}
    <ServiceAndRidership />
    <DriversOfPublicTransitParticipation />
    {/* <ExploreBusServiceAndEquity /> */}
    {/* <MobilityTrendsUsingRealTimeData /> */}
    {/* <TheSecretIsInTheSensors /> */}
    {/* <DiveDeeperIntoTransportationData /> */}
  </PageLayout>
);

App.displayName = "App";

export default App;
