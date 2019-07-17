import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import chapters from "./chapters";
import kit from "./kit";
import user from "./user";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    chapters,
    kit,
    user,
    ...asyncReducers
  });
}
