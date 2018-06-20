import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sandbox from './sandbox';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    sandbox,
    ...asyncReducers,
  });
}
