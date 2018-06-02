import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import farmersMarketsOverTime from './farmers-markets-over-time';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    farmersMarketsOverTime,
    ...asyncReducers,
  });
}
