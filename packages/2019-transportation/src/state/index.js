import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import transportationData from "./transportation-data";
import disturbanceStopsData from "./disturbance-stops/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...disturbanceStopsData.reducers,
    transportationData,
    ...asyncReducers
  });
}
