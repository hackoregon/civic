import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ridershipOverTime from './decline-in-ridership';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ridershipOverTime,
    ...asyncReducers,
  });
}
