import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import demoEducationData from "./demo-education/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...demoEducationData.reducers,
    ...asyncReducers
  });
}
