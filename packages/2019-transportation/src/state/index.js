import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import transportationData from "./transportation-data";
import disturbanceStopsData from "./disturbance-stops/api";
import southwestMadisonData from "./southwest-madison/api";
import northwestEverettData from "./northwest-everett/api";
import morningRushData from "./morning-rush/api";
import systemWideSummaryData from "./system-wide-summary/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...systemWideSummaryData.reducers,
    ...morningRushData.reducers,
    ...northwestEverettData.reducers,
    ...southwestMadisonData.reducers,
    ...disturbanceStopsData.reducers,
    transportationData,
    ...asyncReducers
  });
}
