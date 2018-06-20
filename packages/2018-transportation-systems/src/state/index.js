import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ridershipOverTime from './decline-in-ridership';
import serviceAndRidership from './service-and-ridership';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ridershipOverTime,
    serviceAndRidership,
    ...asyncReducers,
  });
}
