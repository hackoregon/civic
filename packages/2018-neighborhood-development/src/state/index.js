import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import neighborhoodAges from './neighborhoods-through-the-ages';
import classSizeAndQuality from './class-size-and-quality';
import magnitudeCampsiteSweeps from './magnitude-of-urban-campsite-sweeps';
import humanImpactOfSweepingUrbanCampsites from './human-impact-of-sweeping-urban-campsites';
import exploreUrbanCampsiteSweeps from './explore-urban-campsite-sweeps';
import studentEnrollmentTrends from './student-enrollment-trends';
import understandingStaffCuts from './understanding-staff-cuts';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    magnitudeCampsiteSweeps,
    humanImpactOfSweepingUrbanCampsites,
    exploreUrbanCampsiteSweeps,
    neighborhoodAges,
    classSizeAndQuality,
    studentEnrollmentTrends,
    understandingStaffCuts,
    ...asyncReducers,
  });
}
