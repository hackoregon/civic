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
  // activeTime: 0,
  // startTime: 0,
  // totalTime: 0,
  completedTasks: [],
  outOfTime: false
  // playing: true
};

// const timerId = 0;

// CONSTANTS
const actionTypes = {
  CHANGE_ENVIRONMENT: "CHANGE_ENVIRONMENT",
  ADD_TASK: "ADD_TASK",
  INCREASE_ACTIVE_TASK: "INCREASE_ACTIVE_TASK",
  COMPLETE_TASK: "COMPLETE_TASK",
  START_TASK: "START_TASK",
  OUT_OF_TIME: "OUT_OF_TIME"
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

// summon `startTick` when you want to start a new timer,
// it uses requestAnimationFrame to summon the `loop` function
// The loop function evaluates if the timer is expired (outOfTime)
// or if the timer should 'tick' which counts down.
// export const startTick = totalTime => (dispatch, getState) => {
//   let now = new Date();
//   dispatch({ type: actionTypes.SET_START_TIME, time: now });

//   const loop = () => {
//     timerId = window.requestAnimationFrame(loop);

//     now = new Date();
//     const {
//       tasks: { activeTime, startTime }
//     } = getState();

//     const outOfTime = activeTime - startTime > totalTime;
//     if (!outOfTime) {
//       dispatch({ type: actionTypes.TICK, time: now, totalTime });
//     } else {
//       dispatch({ type: actionTypes.OUT_OF_TIME });
//       window.cancelAnimationFrame(timerId);
//     }
//   };

//   window.cancelAnimationFrame(timerId);
//   timerId = window.requestAnimationFrame(loop);
// };

// // use when unloading a component that summoned a timer
// export const stopTick = () => () => {
//   window.cancelAnimationFrame(timerId);
// };

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

    // reset timer to 0
    // state.activeTime = 0;
  }
  // // summoned when the timer starts
  // [actionTypes.SET_START_TIME]: (state, action) => {
  //   const { time } = action;
  //   state.startTime = time;
  //   state.outOfTime = false;
  // },
  // // a timer can be reset
  // [actionTypes.RESET_START_TIME]: (state, action) => {
  //   const { time } = action;
  //   state.startTime = time;
  // },
  // // each 'tick' represents time passing when the timer is running
  // [actionTypes.TICK]: (state, action) => {
  //   state.activeTime = action.time;
  //   state.totalTime = action.totalTime;
  // },
  // // when the timer has completed
  // [actionTypes.OUT_OF_TIME]: state => {
  //   state.outOfTime = true;
  // }
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

// helpful to derive the percentage complete of current time/total time
// ie when a timer is started, current time is 0
// as the timer 'ticks' the current time increases
// and eventually reaches 100% complete
// export const getPercentComplete = createSelector(
//   ["tasks.activeTime", "tasks.startTime", "tasks.totalTime"],
//   (activeTime, startTime, totalTime) => {
//     return Math.max(0, Math.min(1, (activeTime - startTime) / totalTime)); // number within range of 0 - 1
//   }
// );

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

// export const getActiveTime = createSelector(
//   ["activeTime"],
//   time => time
// );

export const getOutOfTime = createSelector(
  ["outOfTime"],
  outOfTime => outOfTime
);
