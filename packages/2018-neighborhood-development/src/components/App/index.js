import React from "react";

import "@hackoregon/component-library/assets/global.styles.css";
import { PageLayout, PullQuote } from "@hackoregon/component-library";
import TheShapeOfANeighborhood from "../TheShapeOfANeighborhood";
import MagnitudeOfUrbanCampsiteSweeps from "../MagnitudeOfUrbanCampsiteSweeps";
import HumanImpactOfSweepingUrbanCampsites from "../HumanImpactOfSweepingUrbanCampsites";
import ExploreUrbanCampsiteSweeps from "../ExploreUrbanCampsiteSweeps";
import StudentEnrollmentTrends from "../StudentEnrollmentTrends";
import VulnerableStudentPopulations from "../VulnerableStudentPopulations";
import ClassSizeAndQuality from "../ClassSizeAndQuality";
import UnderstandingStaffCuts from "../UnderstandingStaffCuts";
import NeighborhoodsThroughTheAges from "../NeighborhoodsThroughTheAges";
import ExploreAgeDemographics from "../ExploreAgeDemographics";
import VotersOnTheMove from "../VotersOnTheMove";
import DiveDeeperIntoNeighborhoodData from "../DiveDeeperIntoNeighborhoodData";

const App = () => (
  <PageLayout
    teamTitle="Neighborhood Development"
    heroTitle="Examining Local Patterns, Movement, and Our Sense of Place"
  >
    <p>
      Neighborhoods are more important than ever. With a volatile political
      environment, and general uncertainty of the future, neighborhoods are what
      bring people together to create a safe and healthy environment. But what
      is a neighborhood? Are neighborhoods defined by boundaries/polygons on a
      map? Zoning, buildings, and tax lots? The environment? The people who live
      there?
    </p>
    <p>
      Neighborhood development changes landscapes, buildings, as well as the
      people who inhabit and spend time there. Our data dive focuses on a single
      dimension of development: the movement of people around Portland and a
      sense of place.
    </p>
    {/* <TheShapeOfANeighborhood /> */}
    <MagnitudeOfUrbanCampsiteSweeps />
    <HumanImpactOfSweepingUrbanCampsites />
    <PullQuote quoteText="Portland’s response to unsanctioned camping in urban/natural areas has increased over 18mos; about 143 people are affected per week out of 1,668 people who are unsheltered on any given night" />
    <ExploreUrbanCampsiteSweeps />
    <p>
      Campsite sweeps displace people living in Portland's neighborhoods, and
      shows movement/migration of people on a micro time scale. Another
      dimension of Portland's neighborhoods, our schools, also shows a
      demographic shift over the past 10 years.
    </p>
    <StudentEnrollmentTrends />
    {/* <VulnerableStudentPopulations /> */}
    <ClassSizeAndQuality />
    <UnderstandingStaffCuts />
    <p>
      Migration of people within Portland's neighborhoods is apparent within the
      population of Portland's registered voters from 2006-2016. The age
      demographics of Portland's neighborhoods have been shifting; we tracked
      Portland's old and young voters as they moved around the city over time.
    </p>
    <NeighborhoodsThroughTheAges />
    {/* <ExploreAgeDemographics /> */}
    <VotersOnTheMove />
    {/* <DiveDeeperIntoNeighborhoodData /> */}
  </PageLayout>
);

App.displayName = "App";

export default App;
