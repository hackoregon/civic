import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...asyncReducers,
  });
}
