import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import neighborhoodAges from './neighborhoods-through-the-ages';
import classSizeAndQuality from './class-size-and-quality';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    neighborhoodAges,
    classSizeAndQuality,
    ...asyncReducers,
  });
}
