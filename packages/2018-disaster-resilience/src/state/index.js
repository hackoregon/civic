import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as reduxFormReducer } from "redux-form";
import youAndYourNeighbors from "./you-and-your-neighbors";
import proactivePlanningData from "./proactive-planning/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...proactivePlanningData.reducers,
    youAndYourNeighbors,
    form: reduxFormReducer,
    ...asyncReducers
  });
}
