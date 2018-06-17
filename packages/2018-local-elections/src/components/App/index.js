import React from 'react';

import '@hackoregon/component-library/assets/global.styles.css';
import { PageLayout } from '@hackoregon/component-library';
import IncreasingVolumeOfMoney from '../IncreasingVolumeOfMoney';
import HowMuchDoesMoneyMatterInElections from '../HowMuchDoesMoneyMatterInElections';
import OutraisingYourOpponent from '../OutraisingYourOpponent';
import SuccessfulSpendingPatterns from '../SuccessfulSpendingPatterns';
import InfluentialContributorCohorts from '../InfluentialContributorCohorts';
import MeasuringThePowerOfGrassroots from '../MeasuringThePowerOfGrassroots';
import YourVoteHasAPriceTag from '../YourVoteHasAPriceTag';
import PrimariesArePredictive from '../PrimariesArePredictive';
import IsPartyAffiliationRelevant from '../IsPartyAffiliationRelevant';
import RealTimeInformationOnPoliticalCampaigns from '../RealTimeInformationOnPoliticalCampaigns';

const App = () => (
  <PageLayout>
    <IncreasingVolumeOfMoney />
    <HowMuchDoesMoneyMatterInElections />
    <OutraisingYourOpponent />
    <SuccessfulSpendingPatterns />
    <InfluentialContributorCohorts />
    <MeasuringThePowerOfGrassroots />
    <YourVoteHasAPriceTag />
    <PrimariesArePredictive />
    <IsPartyAffiliationRelevant />
    <RealTimeInformationOnPoliticalCampaigns />
  </PageLayout>
);

App.displayName = 'App';

export default App;
