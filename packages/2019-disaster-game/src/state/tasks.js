import { createReducer, createSelector } from "redux-starter-kit";
import { shuffle } from "lodash";
import size from "lodash/size";

import { tasks, tasksForEnvironment, URBAN } from "../constants/tasks";

const defaultEnv = URBAN;
const defaultSaveYourself = tasksForEnvironment[defaultEnv].saveYourself;

// INITIAL STATE
const initialState = {
  tasks,
  tasksForEnvironment,
  activeEnvironment: defaultEnv,
  taskOrder: shuffle(defaultSaveYourself),
  activeTask: 0,
  completedTasks: [],
  outOfTime: false
};

// CONSTANTS
const actionTypes = {
  CHANGE_ENVIRONMENT: "CHANGE_ENVIRONMENT",
  ADD_TASK: "ADD_TASK",
  INCREASE_ACTIVE_TASK: "INCREASE_ACTIVE_TASK",
  COMPLETE_TASK: "COMPLETE_TASK",
  START_TASK: "START_TASK",
  OUT_OF_TIME: "OUT_OF_TIME",
  RESET_STATE: "RESET_STATE"
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
export const startTask = task => dispatch => {
  dispatch({ type: actionTypes.START_TASK, task });
};
export const completeTask = completedTask => dispatch => {
  dispatch({ type: actionTypes.COMPLETE_TASK, completedTask });
};
export const resetState = () => dispatch => {
  dispatch({ type: actionTypes.RESET_STATE });
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
  },
  [actionTypes.RESET_STATE]: () => {
    return initialState;
  }
});
/* eslint-enable no-param-reassign */

export default tasksReducer;

// SELECTORS

export const getTaskOrder = createSelector(
  ["tasks.taskOrder"],
  taskOrder => taskOrder
);

export const getActiveTaskId = createSelector(
  ["tasks.activeTask"],
  activeTaskId => activeTaskId
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

export const getWeightedTasks = createSelector(
  ["tasks.tasks", "tasks.tasksForEnvironment", "tasks.activeEnvironment"],
  (allTasks, tasksForEnv, activeEnvironment) => {
    const environmentTasks = tasksForEnv[activeEnvironment];
    const environmentTasksArray = [].concat(
      environmentTasks.saveYourself,
      environmentTasks.saveOthers
    );
    const genericWeighting = 1 / size(allTasks);

    const possibleTasks = Object.keys(allTasks).reduce((result, taskKey) => {
      const taskData = allTasks[taskKey];
      const modifiedTaskWeight = environmentTasksArray.includes(taskData.id)
        ? genericWeighting * 2
        : genericWeighting;

      const genericItem = {
        type: taskData.id,
        imageSVG: taskData.imageSVG,
        imageAlt: taskData.imageAlt,
        locations: taskData.locations,
        weighting: modifiedTaskWeight,
        points: taskData.points
      };
      result.push(genericItem);

      return result;
    }, []);

    return possibleTasks;
  }
);

export const getOutOfTime = createSelector(
  ["outOfTime"],
  outOfTime => outOfTime
);
