import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import electionsData from "./elections-data";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    electionsData,
    ...asyncReducers
  });
}
