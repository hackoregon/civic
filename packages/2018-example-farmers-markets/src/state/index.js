import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import farmersMarketsOverTime from './farmers-markets-over-time';
import portlandFarmersMarkets from './portland-farmers-markets';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    farmersMarketsOverTime,
    portlandFarmersMarkets,
    ...asyncReducers,
  });
}
