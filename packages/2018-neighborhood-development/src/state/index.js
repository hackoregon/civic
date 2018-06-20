import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import neighborhoodAges from './neighborhoods-through-the-ages';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    neighborhoodAges,
    ...asyncReducers,
  });
}
