import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import housingDisplacementData from "./housing-displacement/api";
import blackPopulationChangeData from "./black-population-change/api";
import homeLoanApprovalsData from "./home-loan-approvals/api";
import homeOwnershipRatesData from "./home-ownership-rates/api";
import aduDistributionsData from "./adu-distributions/api";
import householdIncomeByRaceData from "./household-income-by-race/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...householdIncomeByRaceData.reducers,
    ...aduDistributionsData.reducers,
    ...homeOwnershipRatesData.reducers,
    ...homeLoanApprovalsData.reducers,
    ...blackPopulationChangeData.reducers,
    ...housingDisplacementData.reducers,
    ...asyncReducers
  });
}
