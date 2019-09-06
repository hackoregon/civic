import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import transportationData from "./transportation-data";
import disturbanceStopsData from "./disturbance-stops/api";
import southwestMadisonData from "./southwest-madison/api";
import northwestEverettData from "./northwest-everett/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...northwestEverettData.reducers,
    ...southwestMadisonData.reducers,
    ...disturbanceStopsData.reducers,
    transportationData,
    ...asyncReducers
  });
}
