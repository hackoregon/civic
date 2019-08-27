import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import housingDisplacementData from "./housing-displacement/api";
import blackPopulationChangeData from "./black-population-change/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...blackPopulationChangeData.reducers,
    ...housingDisplacementData.reducers,
    ...asyncReducers
  });
}
