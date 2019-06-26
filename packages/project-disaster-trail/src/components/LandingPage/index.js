/* eslint-disable import/no-named-as-default */
import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

import "@hackoregon/component-library/assets/global.styles.css";
import { PageLayout, PullQuote } from "@hackoregon/component-library";

const LandingPage = () => (
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

    <p>
      Social capital is a statistic derived from measuring community engagement.
      Disaster resilience, measuring the ability for an entity to bounce back
      from a crisis and learn from it, increases dramatically when community
      members engage.
    </p>
    <PullQuote quoteText="The #1 thing you can do to increase social capital is to meet your neighbors. Do you know 3 people within a 3 block radius of your house?" />
    <CenterStyle>
      <ButtonStyle to="/game">Play the Game</ButtonStyle>
    </CenterStyle>
  </PageLayout>
);

const CenterStyle = styled.div`
  display: flex;
  justify-content: center;
`;

// Copied from packages/component-library/src/LandingPage/LandingPage.js. Is there a component?
const ButtonStyle = styled(Link)`
  border: 2px solid #ef495c;
  padding: 10px 20px;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  color: #ef495c;
  background-color: transparent;
  margin: 10px 0px 50px;

  :hover {
    cursor: pointer;
  }
`;

LandingPage.displayName = "LandingPage";

export default LandingPage;
