import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import chapters from "./chapters";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    chapters,
    ...asyncReducers
  });
}
