import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import templateData from "./template-file-data";
import demoData from "./demo-data";
import newTemplateAPI from "./template-api-data/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    templateData,
    demoData,
    ...newTemplateAPI.reducers,
    ...asyncReducers
  });
}
