import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import neighborhoodAges from './neighborhoods-through-the-ages';
import exploreUrbanCampsiteSweeps from './explore-urban-campsite-sweeps';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    exploreUrbanCampsiteSweeps,
    neighborhoodAges,
    ...asyncReducers,
  });
}
