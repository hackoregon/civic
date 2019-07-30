import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import templateData from "./template-data";
import demoData from "./demo-data";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    templateData,
    demoData,
    ...asyncReducers
  });
}
