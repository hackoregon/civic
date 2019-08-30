import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as reduxFormReducer } from "redux-form";
import youAndYourNeighbors from "./you-and-your-neighbors";
import proactivePlanningPumaData from "./proactive-planning-puma/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...proactivePlanningPumaData.reducers,
    youAndYourNeighbors,
    form: reduxFormReducer,
    ...asyncReducers
  });
}
