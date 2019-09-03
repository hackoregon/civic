/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import "@hackoregon/component-library/assets/global.styles.css";
import {
  PageLayout,
  PullQuote,
  CivicCardLayoutClassic
} from "@hackoregon/component-library";
import YouAndYourNeighborsGorilla from "../YouAndYourNeighborsGorilla";
import SignificantStructuralDamage from "../SignificantStructuralDamage";
import ProactivePlanning from "../ProactivePlanning";
import WhatYouCanDoToPrepare from "../WhatYouCanDoToPrepare";

const sectionMarginMedium = css`
  display: block;
  margin: 64px auto;
`;

const App = () => (
  <PageLayout
    teamTitle="Disaster Resilience"
    heroTitle="Assessing Risk and Prioritizing Action to Strengthen Resilience in the Face of a Natural Disaster"
  >
    <p>
      The Cascadia Subduction Zone fault, running 100 miles off the coast from
      northern California to British Columbia, has the potential to cause a 9.0+
      magnitude earthquake. Scientists estimate there is a 40% chance this event
      will occur within the next 50 years. Portland is well within the affected
      zone for this earthquake.
    </p>
    <p>
      Residents of Portland will not be able to change the physical impact of an
      earthquake of this magnitude, but there ARE actions that can be taken to
      change how individuals, neighborhoods and the city as a whole are able to
      adapt, prepare and recover from this event. This is called disaster
      resilience.
    </p>
    {/* <ViolentShakingAndGroundDeformation /> */}
    <section css={sectionMarginMedium}>
      <SignificantStructuralDamage Layout={CivicCardLayoutClassic} />
    </section>
    {/* <LifeAlteringEvent /> */}
    <p className="transition">
      The first step in increasing disaster resilience for most Portlanders will
      be to understand what the estimated impact is within their immediate
      vicinity.
    </p>
    <section css={sectionMarginMedium}>
      <YouAndYourNeighborsGorilla Layout={CivicCardLayoutClassic} />
    </section>
    <PullQuote
      quoteText="Does your family have a plan for earthquake preparedness? Here are the steps to help you get started."
      url="https://civicplatform.org/cards/what-you-can-do-to-prepare-for-an-earthquake"
    />
    <WhatYouCanDoToPrepare />
    <p className="transition">
      Social capital is a statistic derived from measuring community engagement.
      Disaster resilience, measuring the ability for an entity to bounce back
      from a crisis and learn from it, increases dramatically when community
      members engage.
    </p>
    {/* <IncreasingSocialCapital /> */}
    <PullQuote quoteText="The #1 thing you can do to increase social capital is to meet your neighbors. Do you know 3 people within a 3 block radius of your house?" />
    <section className={sectionMarginMedium}>
      <ProactivePlanning Layout={CivicCardLayoutClassic} />
    </section>
  </PageLayout>
);

App.displayName = "App";

export default App;
