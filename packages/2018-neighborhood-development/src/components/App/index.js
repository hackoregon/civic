import React from 'react';

import '@hackoregon/component-library/assets/global.styles.css';

import TheShapeOfANeighborhood from '../TheShapeOfANeighborhood';
import MagnitudeOfUrbanCampsiteSweeps from '../MagnitudeOfUrbanCampsiteSweeps';
import HumanImpactOfSweepingUrbanCampsites from '../HumanImpactOfSweepingUrbanCampsites';
import ExploreUrbanCampsiteSweeps from '../ExploreUrbanCampsiteSweeps';
import StudentEnrollmentTrends from '../StudentEnrollmentTrends';
import VulnerableStudentPopulations from '../VulnerableStudentPopulations';
import ClassSizeAndQuality from '../ClassSizeAndQuality';
import UnderstandingStaffCuts from '../UnderstandingStaffCuts';
import NeighborhoodsThroughTheAges from '../NeighborhoodsThroughTheAges';
import ExploreAgeDemographics from '../ExploreAgeDemographics';
import VotersOnTheMove from '../VotersOnTheMove';
import DiveDeeperIntoNeighborhoodData from '../DiveDeeperIntoNeighborhoodData';

const App = () => (
  <div style={{ marginTop: '30px' }}>
    <TheShapeOfANeighborhood />
    <MagnitudeOfUrbanCampsiteSweeps />
    <HumanImpactOfSweepingUrbanCampsites />
    <ExploreUrbanCampsiteSweeps />
    <StudentEnrollmentTrends />
    <VulnerableStudentPopulations />
    <ClassSizeAndQuality />
    <UnderstandingStaffCuts />
    <NeighborhoodsThroughTheAges />
    <ExploreAgeDemographics />
    <VotersOnTheMove />
    <DiveDeeperIntoNeighborhoodData />
  </div>
);

App.displayName = 'App';

export default App;
