/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import "@hackoregon/component-library/assets/global.styles.css";
import {
  PageLayout,
  PullQuote,
  CivicCardLayoutClassic
} from "@hackoregon/component-library";
import WhatYouCanDoToPrepare from "../WhatYouCanDoToPrepare";
import SignificantStructuralDamage from "../SignificantStructuralDamage";
import ProactivePlanning from "../ProactivePlanning";
import YouAndYourNeighbors from "../YouAndYourNeighbors";

const sectionMarginMedium = css`
  display: block;
  margin: 64px auto;
`;

const App = () => (
  <PageLayout
    teamTitle="Disaster Resilience"
    heroTitle="Assessing Risk and Prioritizing Action to Strengthen Resilience in the Face of a Natural Disaster"
  >
    {/* <ViolentShakingAndGroundDeformation /> */}
    <section css={sectionMarginMedium}>
      <SignificantStructuralDamage Layout={CivicCardLayoutClassic} />
    </section>
    {/* <LifeAlteringEvent /> */}
    <section css={sectionMarginMedium}>
      <YouAndYourNeighbors Layout={CivicCardLayoutClassic} />
    </section>
    <PullQuote
      quoteText="Does your family have a plan for earthquake preparedness? Here are the steps to help you get started."
      url="https://civicplatform.org/cards/what-you-can-do-to-prepare-for-an-earthquake"
    />
    <section css={sectionMarginMedium}>
      <WhatYouCanDoToPrepare Layout={CivicCardLayoutClassic} />
    </section>
    {/* <IncreasingSocialCapital /> */}
    <PullQuote quoteText="The #1 thing you can do to increase social capital is to meet your neighbors. Do you know 3 people within a 3 block radius of your house?" />
    <section className={sectionMarginMedium}>
      <ProactivePlanning Layout={CivicCardLayoutClassic} />
    </section>
  </PageLayout>
);

App.displayName = "App";

export default App;
