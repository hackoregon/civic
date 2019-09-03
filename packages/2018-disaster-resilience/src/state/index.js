import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as reduxFormReducer } from "redux-form";
import proactivePlanningData from "./proactive-planning/api";
import youAndYourNeighborsLocalData from "./you-and-your-neighbors-gorilla/local-api";
import youAndYourNeighborsGorillaData from "./you-and-your-neighbors-gorilla/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    youAndYourNeighborsLocalData,
    ...youAndYourNeighborsGorillaData.reducers,
    ...proactivePlanningData.reducers,
    form: reduxFormReducer,
    ...asyncReducers
  });
}
