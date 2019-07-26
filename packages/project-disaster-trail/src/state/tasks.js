import { createReducer } from "redux-starter-kit";

import TASKS from "../constants/tasks";

const defaultEnv = "urban";
const defaultSaveYourself = [
  TASKS.tasksForEnvironment[defaultEnv].saveYourself
];

// INITIAL STATE
const initialState = {
  ...TASKS,
  activeEnvironment: defaultEnv,
  taskOrder: defaultSaveYourself,
  activeTask: 0
};

// CONSTANTS

// ACTIONS

// REDUCERS
export const settings = createReducer(initialState, {});

export default settings;

// SELECTORS
