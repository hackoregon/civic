import { createReducer, createSelector } from "redux-starter-kit";
import { shuffle } from "lodash";

import { tasks, tasksForEnvironment, URBAN } from "../constants/tasks";

const defaultEnv = URBAN;
const defaultSaveYourself = tasksForEnvironment[defaultEnv].saveYourself;

// INITIAL STATE
const initialState = {
  tasks,
  tasksForEnvironment,
  activeEnvironment: defaultEnv,
  taskOrder: shuffle(defaultSaveYourself),
  activeTask: 0
};

// CONSTANTS
const actionTypes = {
  CHANGE_ENVIRONMENT: "CHANGE_ENVIRONMENT",
  DO_NEXT_TASK: "DO_NEXT_TASK"
};

// ACTIONS
export const changeEnvironment = nextEnvironmentId => dispatch => {
  dispatch({ type: actionTypes.CHANGE_ENVIRONMENT, nextEnvironmentId });
};
export const doNextTask = taskChoice => dispatch => {
  dispatch({ type: actionTypes.DO_NEXT_TASK, taskChoice });
};

// REDUCERS
/* eslint-disable no-param-reassign */
export const tasksReducer = createReducer(initialState, {
  [actionTypes.CHANGE_ENVIRONMENT]: (state, action) => {
    const newTasks = tasksForEnvironment[action.nextEnvironmentId].saveYourself;

    state.activeEnvironment = action.nextEnvironmentId;
    state.taskOrder = shuffle(newTasks);
    state.activeTask = 0;
  },
  [actionTypes.DO_NEXT_TASK]: (state, action) => {
    state.activeTask += 1;
    const noNextTask = !state.taskOrder[state.activeTask];

    if (noNextTask) {
      state.taskOrder.push(action.taskChoice);
    }
  }
});
/* eslint-enable no-param-reassign */

export default tasksReducer;

// SELECTORS

export const getTaskOrder = createSelector(
  ["tasks.taskOrder"],
  taskOrder => taskOrder
);

export const getActiveTask = createSelector(
  ["tasks.activeTask"],
  activeTask => activeTask
);

export const getActiveEnvironment = createSelector(
  ["tasks.activeEnvironment"],
  activeEnvironment => activeEnvironment
);

export const getTasksForEnvironment = createSelector(
  ["tasks.tasksForEnvironment"],
  foundTasks => foundTasks
);
