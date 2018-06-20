import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import affordableRentalUnits from './affordable-rental-units';
import priceToIncome from './price-to-income';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    affordableRentalUnits,
    priceToIncome,
    ...asyncReducers,
  });
}
