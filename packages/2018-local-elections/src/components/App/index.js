/* eslint-disable import/no-named-as-default */
import React from "react";

import "@hackoregon/component-library/assets/global.styles.css";
import { PageLayout } from "@hackoregon/component-library";
import IncreasingVolumeOfMoney from "../IncreasingVolumeOfMoney";
import OutraisingYourOpponent from "../OutraisingYourOpponent";
import RealTimeInformationOnPoliticalCampaigns from "../RealTimeInformationOnPoliticalCampaigns";

const App = () => (
  <PageLayout
    teamTitle="Local Elections"
    heroTitle="Quantifying Influence and Understanding the Impact of Money in our Political System"
  >
    <p>
      The amount of money in our political system has been increasing over time,
      with a lot of focus on national elections. Very little is known about how
      money influences our state and local elections. This project seeks to move
      beyond simply money in politics and national campaigns to examine how an
      increasing volume of money flowing into Oregon election influences who
      wins, and even whose name goes on the primary ballot. This project used
      data science, machine learning and AI to analyze data from over a million
      transactions totaling over $1.5B exchanged between candidates, businesses,
      PACs, unions and state parties since 2002, including the nearly 33% of
      contributions from outside Oregon.
    </p>
    <IncreasingVolumeOfMoney />
    {/* <HowMuchDoesMoneyMatterInElections /> */}
    <OutraisingYourOpponent />
    {/* <SuccessfulSpendingPatterns /> */}
    {/* <InfluentialContributorCohorts /> */}
    {/* <MeasuringThePowerOfGrassroots /> */}
    {/* <YourVoteHasAPriceTag /> */}
    {/* <PrimariesArePredictive /> */}
    {/* <IsPartyAffiliationRelevant /> */}
    <RealTimeInformationOnPoliticalCampaigns />
  </PageLayout>
);

App.displayName = "App";

export default App;
