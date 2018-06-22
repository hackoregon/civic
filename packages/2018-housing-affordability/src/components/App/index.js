import React from 'react';

import '@hackoregon/component-library/assets/global.styles.css';
import { PageLayout } from '@hackoregon/component-library';
import BuildingBoomInPortland from '../BuildingBoomInPortland';
import WhatDoesAffordabilityMean from '../WhatDoesAffordabilityMean';
import AffordableRentalUnitsDwindling from '../AffordableRentalUnitsDwindling';
import RentBurdenedHouseholds from '../RentBurdenedHouseholds';
import PortlandNeedsAffordableRentalUnits from '../PortlandNeedsAffordableRentalUnits';
import WhoCanAffordToBuyAHome from '../WhoCanAffordToBuyAHome';
import PacificNorthwestTopsNationInSurgingHomePrices from '../PacificNorthwestTopsNationInSurgingHomePrices';
import MeasuringMarketValueOfHomesInPortland from '../MeasuringMarketValueOfHomesInPortland';
import AffordabilityInAComplexHousingMarket from '../AffordabilityInAComplexHousingMarket';
import ExploreHousingPolicyImplementation from '../ExploreHousingPolicyImplementation';

const App = () => (
  <PageLayout
    teamTitle="Housing Affordability"
    heroTitle="Synthesizing Complex Information to Better Understand Affordable Housing Trends and Policy Dynamics"
  >
    <p>Over the past 10 years, the United States housing market has been dominated by two major trends: a surging demand in the rental market and a crash in the rate of homeownership.  The 2017 State of the Nation's Housing Report by the Joint Center of Housing Studies at Harvard University shows these trends are particularly evident in Portland.</p>
    <BuildingBoomInPortland />
    {/* <WhatDoesAffordabilityMean /> */}
    <p className="transition">In the Portland Region, affordable means a monthly housing budget of $1,375 for a family of four.</p>
    <AffordableRentalUnitsDwindling />
    <p className="transition">From 2005 to 2015, the Portland Metro lost 39,645 units below $1000/month.</p>
    <RentBurdenedHouseholds />
    <p className="transition">24% of all Portland Metro households were severely burdened in 2015</p>
    <PortlandNeedsAffordableRentalUnits />
    <p className="transition">The Portland region needs 78,806 NEW affordable units</p>
    <WhoCanAffordToBuyAHome />
    <p className="transition">In 2016, Portland metro ranked in the bottom 10% of metropolitan areas in regards to home ownership affordability.</p>
    <PacificNorthwestTopsNationInSurgingHomePrices />
    <p className="transition">Portland had the second highest growth rate in home prices out of 120 U.S metro-areas in 2016, exceeded only by Seattle</p>
    <MeasuringMarketValueOfHomesInPortland />
    {/* <AffordabilityInAComplexHousingMarket /> */}
    {/* <ExploreHousingPolicyImplementation /> */}
  </PageLayout>
);

App.displayName = 'App';

export default App;
