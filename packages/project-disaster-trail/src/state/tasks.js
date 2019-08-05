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
  activeTask: -1,
  completedTasks: []
};

// CONSTANTS
const actionTypes = {
  CHANGE_ENVIRONMENT: "CHANGE_ENVIRONMENT",
  ADD_TASK: "ADD_TASK",
  INCREASE_ACTIVE_TASK: "INCREASE_ACTIVE_TASK",
  COMPLETE_TASK: "COMPLETE_TASK"
};

// ACTIONS
export const changeEnvironment = nextEnvironmentId => dispatch => {
  dispatch({ type: actionTypes.CHANGE_ENVIRONMENT, nextEnvironmentId });
};
export const addTask = taskChoice => dispatch => {
  dispatch({ type: actionTypes.ADD_TASK, taskChoice });
};
export const increaseActiveTask = () => dispatch => {
  dispatch({ type: actionTypes.INCREASE_ACTIVE_TASK });
};
export const completeTask = completedTask => dispatch => {
  dispatch({ type: actionTypes.COMPLETE_TASK, completedTask });
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
  [actionTypes.ADD_TASK]: (state, action) => {
    state.taskOrder.push(action.taskChoice);
  },
  [actionTypes.INCREASE_ACTIVE_TASK]: state => {
    state.activeTask += 1;
  },
  [actionTypes.COMPLETE_TASK]: (state, action) => {
    state.activeTask += 1;
    // Log completed task
    state.completedTasks.push(action.completedTask);
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

export const getActiveTaskData = createSelector(
  ["tasks.tasks", "tasks.taskOrder", "tasks.activeTask"],
  (allTasks, taskOrder, activeTask) => {
    const taskId = taskOrder[activeTask];
    return allTasks[taskId];
  }
);

export const getActiveEnvironment = createSelector(
  ["tasks.activeEnvironment"],
  activeEnvironment => activeEnvironment
);

export const getTasksForEnvironment = createSelector(
  ["tasks.tasksForEnvironment"],
  foundTasks => foundTasks
);

export const getCompletedTasks = createSelector(
  ["tasks.completedTasks"],
  completedTasks => completedTasks
);

export const getHasSavedSelf = createSelector(
  ["tasks.taskOrder", "tasks.activeTask"],
  (taskOrder, activeTask) => {
    return activeTask >= taskOrder.length;
  }
);
