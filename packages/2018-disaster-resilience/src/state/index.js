import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import proactivePlanning from './proactive-planning';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    proactivePlanning,
    ...asyncReducers,
  });
}
