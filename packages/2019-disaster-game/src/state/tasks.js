import { createReducer, createSelector } from "redux-starter-kit";
import { shuffle } from "lodash";
import size from "lodash/size";

import { tasks, tasksForEnvironment, URBAN } from "../constants/tasks";
import { SOLVING, VOTING, MOVING_MAP, DONE } from "../constants/actions";

const defaultEnv = URBAN;
const defaultSaveYourself = tasksForEnvironment[defaultEnv].saveYourself;

// INITIAL STATE
const initialState = {
  tasks,
  tasksForEnvironment,
  activeEnvironment: defaultEnv,
  taskOrder: shuffle(defaultSaveYourself),
  activeTaskIndex: 0,
  taskPhase: SOLVING,
  saveYourself: true
};

// CONSTANTS
const actionTypes = {
  CHANGE_ENVIRONMENT: "CHANGE_ENVIRONMENT",
  ADD_TASK: "ADD_TASK",
  COMPLETE_TASK: "COMPLETE_TASK",
  GO_TO_NEXT_TASK_PHASE: "GO_TO_NEXT_TASK_PHASE",
  SOLVING,
  VOTING,
  MOVING_MAP,
  DONE,
  RESET_STATE: "RESET_STATE"
};

// ACTIONS
export const goToNextTaskPhase = completeTask => dispatch => {
  dispatch({ type: actionTypes.GO_TO_NEXT_TASK_PHASE, completeTask });
};
export const addTask = taskChoice => dispatch => {
  dispatch({ type: actionTypes.ADD_TASK, taskChoice });
};
export const resetState = () => dispatch => {
  dispatch({ type: actionTypes.RESET_STATE });
};
// export const scoreTask = (taskToScore, itemsUsed) => dispatch => {
//   dispatch({ type: actionTypes.SCORE_TASK, taskToScore, itemsUsed });
// };
// export const changeEnvironment = nextEnvironmentId => dispatch => {
//   dispatch({ type: actionTypes.CHANGE_ENVIRONMENT, nextEnvironmentId });
// };

// REDUCERS
/* eslint-disable no-param-reassign */
export const tasksReducer = createReducer(initialState, {
  [actionTypes.GO_TO_NEXT_TASK_PHASE]: (state, action) => {
    if (action.completeTask) {
      state.activeTaskIndex += 1;
    }
    // Save others after 2 tasks
    if (state.saveYourself && state.activeTaskIndex === 2) {
      state.saveYourself = false;
    }

    if (state.taskPhase === SOLVING && !state.saveYourself) {
      state.taskPhase = VOTING;
    } else if (state.taskPhase === VOTING) {
      state.taskPhase = MOVING_MAP;
    } else if (state.taskPhase === MOVING_MAP) {
      state.taskPhase = SOLVING;
    }
  },
  [actionTypes.ADD_TASK]: (state, action) => {
    state.taskOrder.push(action.taskChoice);
  },
  [actionTypes.RESET_STATE]: () => {
    return initialState;
  }
  // [actionTypes.SCORE_TASK]: (state, action) => {
  // },
  // [actionTypes.CHANGE_ENVIRONMENT]: (state, action) => {
  //   const newTasks = tasksForEnvironment[action.nextEnvironmentId].saveYourself;

  //   state.activeEnvironment = action.nextEnvironmentId;
  //   state.taskOrder = shuffle(newTasks);
  //   state.activeTaskIndex = 0;
  // },
});
/* eslint-enable no-param-reassign */

export default tasksReducer;

// SELECTORS

export const getActiveTaskIndex = createSelector(
  ["tasks.activeTaskIndex"],
  activeTaskIndex => activeTaskIndex
);

export const getActiveTaskData = createSelector(
  ["tasks.tasks", "tasks.taskOrder", "tasks.activeTaskIndex"],
  (allTasks, taskOrder, activeTaskIndex) => {
    const taskId = taskOrder[activeTaskIndex];
    return allTasks[taskId];
  }
);

export const getTaskPhase = createSelector(
  ["tasks.taskPhase"],
  taskPhase => taskPhase
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

export const getActiveEnvironment = createSelector(
  ["tasks.activeEnvironment"],
  activeEnvironment => activeEnvironment
);

export const getTasksForEnvironment = createSelector(
  ["tasks.tasksForEnvironment"],
  foundTasks => foundTasks
);

// export const getTaskOrder = createSelector(
//   ["tasks.taskOrder"],
//   taskOrder => taskOrder
// );

// export const getCompletedTasks = createSelector(
//   ["tasks.completedTasks"],
//   completedTasks => completedTasks
// );
