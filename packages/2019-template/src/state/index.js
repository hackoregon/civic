import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import templateData from "./template-file-data";
import demoData from "./demo-data";
import plateauInRidershipAPI from "./plateau-in-ridership/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    templateData,
    demoData,
    ...plateauInRidershipAPI.reducers,
    ...asyncReducers
  });
}
