import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import educationData from "./education-data";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    educationData,
    ...asyncReducers
  });
}
