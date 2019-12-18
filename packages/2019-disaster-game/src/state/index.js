import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { chapters } from "./chapters";
import { kit } from "./kit";
import { settings } from "./settings";
import { sfx } from "./sfx";
import tasks from "./tasks";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    chapters,
    kit,
    settings,
    sfx,
    tasks,
    ...asyncReducers
  });
}
