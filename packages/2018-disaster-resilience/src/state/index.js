import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as reduxFormReducer } from "redux-form";
import proactivePlanningData from "./proactive-planning/api";
import youAndYourNeighborsLocalData from "./you-and-your-neighbors/local-api";
import youAndYourNeighborsData from "./you-and-your-neighbors/api";
import tillamookCountyEarthquakeCasualtyEstimatesData from "./tillamook-county-earthquake-casualty-estimates/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...tillamookCountyEarthquakeCasualtyEstimatesData.reducers,
    youAndYourNeighborsLocalData,
    ...youAndYourNeighborsData.reducers,
    ...proactivePlanningData.reducers,
    form: reduxFormReducer,
    ...asyncReducers
  });
}
