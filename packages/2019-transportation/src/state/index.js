import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import beforeAfterDelayMapsApi from "./before-after-delay-maps/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...beforeAfterDelayMapsApi.reducers,
    ...asyncReducers
  });
}
