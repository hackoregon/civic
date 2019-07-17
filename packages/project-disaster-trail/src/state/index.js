import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import chapters from "./chapters";
import kit from "./kit";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    chapters,
    kit,
    ...asyncReducers
  });
}
