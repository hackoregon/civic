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
  <PageLayout>
    <BuildingBoomInPortland />
    <WhatDoesAffordabilityMean />
    <AffordableRentalUnitsDwindling />
    <RentBurdenedHouseholds />
    <PortlandNeedsAffordableRentalUnits />
    <WhoCanAffordToBuyAHome />
    <PacificNorthwestTopsNationInSurgingHomePrices />
    <MeasuringMarketValueOfHomesInPortland />
    <AffordabilityInAComplexHousingMarket />
    <ExploreHousingPolicyImplementation />
  </PageLayout>
);

App.displayName = 'App';

export default App;
