import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as reduxFormReducer } from "redux-form";
import youAndYourNeighbors from "./you-and-your-neighbors";
import proactivePlanningData from "./proactive-planning/api";
import youAndYourNeighborsGorillaData from "./you-and-your-neighbors-gorilla/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...youAndYourNeighborsGorillaData.reducers,
    ...proactivePlanningData.reducers,
    youAndYourNeighbors,
    form: reduxFormReducer,
    ...asyncReducers
  });
}
