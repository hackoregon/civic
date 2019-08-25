import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import housingDisplacementData from "./housing-displacement/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...housingDisplacementData.reducers,
    ...asyncReducers
  });
}
