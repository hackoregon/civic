import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { chapters } from "./chapters";
import { kit } from "./kit";
import { user } from "./user";
import { settings } from "./settings";
import tasks from "./tasks";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    chapters,
    kit,
    user,
    settings,
    tasks,
    ...asyncReducers
  });
}
