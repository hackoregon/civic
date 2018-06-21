import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import affordableRentalUnits from './affordable-rental-units';
import priceToIncome from './price-to-income';
import rentalCrisis from './rental-crisis';
import pnwSurge from './pnw-surge';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    affordableRentalUnits,
    priceToIncome,
    rentalCrisis,
    pnwSurge,
    ...asyncReducers,
  });
}
