import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

/* eslint-disable import/no-named-as-default */
import chapters from "./chapters";
import kit from "./kit";
import user from "./user";
import settings from "./settings";
import tasks from "./tasks";
import orbs from "./orbs";
/* eslint-enable import/no-named-as-default */

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    chapters,
    kit,
    user,
    settings,
    tasks,
    orbs,
    ...asyncReducers
  });
}
