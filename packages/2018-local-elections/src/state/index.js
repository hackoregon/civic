import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import volumeOfMoney from './volume-of-money';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    volumeOfMoney,
    ...asyncReducers,
  });
}
