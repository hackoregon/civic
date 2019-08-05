import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import transportationData from "./transportation-data";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    transportationData,
    ...asyncReducers
  });
}
