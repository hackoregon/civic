import { createReducer, createSelector } from "redux-starter-kit";
import { shuffle } from "lodash";
import size from "lodash/size";

import {
  tasks,
  tasksForEnvironment,
  URBAN,
  hardcodedTaskLocations
} from "../constants/tasks";
import Timer from "../utils/timer";

// CONSTANTS
const defaultEnv = URBAN;

export const taskPhaseKeys = {
  SOLVING_SAVE_YOURSELF: "SOLVING_SAVE_YOURSELF",
  SOLVING_SAVE_OTHERS: "SOLVING_SAVE_OTHERS",
  MODAL_SAVE_OTHERS_INTRO: "MODAL_SAVE_OTHERS_INTRO",
  CHOOSE_TASK: "CHOOSE_TASK",
  MODAL_CHOSEN_TASK: "MODAL_CHOSEN_TASK",
  MODAL_SOLVED_TASK: "MODAL_SOLVED_TASK",
  MODAL_UNSOLVED_TASK: "MODAL_UNSOLVED_TASK",
  MODAL_NO_ITEM: "MODAL_NO_ITEM"
};

const {
  SOLVING_SAVE_YOURSELF,
  SOLVING_SAVE_OTHERS,
  MODAL_SAVE_OTHERS_INTRO,
  CHOOSE_TASK,
  MODAL_CHOSEN_TASK,
  MODAL_SOLVED_TASK,
  MODAL_UNSOLVED_TASK,
  MODAL_NO_ITEM
} = taskPhaseKeys;

// +1 added to times because it makes the timer look nicer
const taskPhases = {
  [SOLVING_SAVE_YOURSELF]: { time: 31 },
  [SOLVING_SAVE_OTHERS]: { time: 21 },
  [MODAL_SAVE_OTHERS_INTRO]: { time: 11 },
  [CHOOSE_TASK]: { time: 21 },
  [MODAL_CHOSEN_TASK]: { time: 11 },
  [MODAL_SOLVED_TASK]: { time: 11 },
  [MODAL_UNSOLVED_TASK]: { time: 11 },
  [MODAL_NO_ITEM]: { time: 11 }
};

const actionTypes = {
  GO_TO_NEXT_TASK_PHASE_NEW: "GO_TO_NEXT_TASK_PHASE_NEW",
  CHOSE_CORRECT_ITEM_FOR_TASK: "CHOSE_CORRECT_ITEM_FOR_TASK",
  CHOOSE_NEXT_TASK: "CHOOSE_NEXT_TASK",
  MANUAL_CHANGE_TASK_PHASE: "MANUAL_CHANGE_TASK_PHASE",
  RESET_STATE: "RESET_STATE"
};

const phaseTimer = new Timer();

// INITIAL STATE
const initialState = {
  tasks,
  taskLocations: hardcodedTaskLocations,
  tasksForEnvironment,
  activeEnvironment: defaultEnv,
  taskOrder: shuffle(tasksForEnvironment[defaultEnv].saveYourself),
  activeTaskIndex: -1,
  activeTaskPhase: SOLVING_SAVE_YOURSELF,
  taskPhases
};

// ACTIONS
export const goToNextTaskPhase = () => dispatch => {
  phaseTimer.reset();
  phaseTimer.addCompleteCallback(() => {
    goToNextTaskPhase()(dispatch);
  });
  dispatch({ type: actionTypes.GO_TO_NEXT_TASK_PHASE_NEW, phaseTimer });
};

export const choseCorrectItemForTask = activeTask => dispatch => {
  const willCompleteTask =
    activeTask.numberCorrectChosen + 1 >= activeTask.numberItemsToSolve;

  dispatch({ type: actionTypes.CHOSE_CORRECT_ITEM_FOR_TASK });
  if (willCompleteTask) {
    goToNextTaskPhase()(dispatch);
  }
};

export const chooseTask = chosenTaskId => dispatch => {
  dispatch({ type: actionTypes.CHOOSE_NEXT_TASK, chosenTaskId, phaseTimer });
  goToNextTaskPhase()(dispatch);
};

export const finishSolveTaskEarly = duration => dispatch => {
  phaseTimer.reset();
  phaseTimer.setDuration(duration);
  phaseTimer.addCompleteCallback(() => {
    dispatch({
      type: actionTypes.MANUAL_CHANGE_TASK_PHASE,
      phase: MODAL_NO_ITEM,
      dispatch
    });
    phaseTimer.reset();
    phaseTimer.setDuration(taskPhases[MODAL_NO_ITEM].time);
    phaseTimer.addCompleteCallback(() => {
      goToNextTaskPhase()(dispatch);
    });
    phaseTimer.start();
  });
  phaseTimer.start();
};

export const resetState = () => dispatch => {
  dispatch({ type: actionTypes.RESET_STATE });
};

// UTILITY FUNCTIONS

const getRandomNumberFromRange = range => {
  const min = Math.ceil(range[0]);
  const max = Math.floor(range[1]);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getPossibleTasks = (_tasksForEnvironment, activeEnvironment) => {
  // All possible tasks for the game environment
  const saveYourselfTasks =
    _tasksForEnvironment[activeEnvironment].saveYourself;
  const saveOthersTasks = _tasksForEnvironment[activeEnvironment].saveOthers;
  return [].concat(saveYourselfTasks, saveOthersTasks);
};

export const chooseRandomTaskId = (_tasksForEnvironment, activeEnvironment) => {
  const possibleTasks = getPossibleTasks(
    _tasksForEnvironment,
    activeEnvironment
  );
  const randomIndex = Math.floor(Math.random() * possibleTasks.length);
  const randomTask = possibleTasks[randomIndex];
  return randomTask.id;
};

// REDUCER HELPERS
/* eslint-disable no-param-reassign */

// Mark task as completed, increase activeTaskIndex, change to next phase if applicable, and start timer
const completeSaveYourselfTask = state => {
  if (state.activeTaskIndex === 1) {
    state.activeTaskPhase = MODAL_SAVE_OTHERS_INTRO;
    phaseTimer.setDuration(taskPhases[MODAL_SAVE_OTHERS_INTRO].time);
  } else {
    phaseTimer.setDuration(taskPhases[SOLVING_SAVE_YOURSELF].time);
  }
  state.activeTaskIndex += 1;
};

const completeSaveOthersTask = state => {
  const activeTask = state.taskOrder[state.activeTaskIndex];
  if (activeTask.completed === true) {
    state.activeTaskPhase = MODAL_SOLVED_TASK;
    phaseTimer.setDuration(taskPhases[MODAL_SOLVED_TASK].time);
  } else {
    state.activeTaskPhase = MODAL_UNSOLVED_TASK;
    phaseTimer.setDuration(taskPhases[MODAL_UNSOLVED_TASK].time);
  }
};

const applyChosenTask = (state, action) => {
  const nextTask = state.tasks[action.chosenTaskId];
  state.taskOrder.push(nextTask);
};

const chooseTaskIfNecessary = state => {
  const nextTaskNotChosen = !state.taskOrder[state.activeTaskIndex];
  if (nextTaskNotChosen) {
    const randomTaskId = chooseRandomTaskId(
      state.tasksForEnvironment,
      state.activeEnvironment
    );
    applyChosenTask(state, { chosenTaskId: randomTaskId });
  }
};

// REDUCERS
export const tasksReducer = createReducer(initialState, {
  [actionTypes.MANUAL_CHANGE_TASK_PHASE]: (state, action) => {
    const { phase } = action;
    state.activeTaskPhase = phase;
  },
  [actionTypes.GO_TO_NEXT_TASK_PHASE_NEW]: state => {
    // add check at start if game should end
    if (state.activeTaskPhase === SOLVING_SAVE_YOURSELF) {
      completeSaveYourselfTask(state);
    } else if (state.activeTaskPhase === MODAL_SAVE_OTHERS_INTRO) {
      state.activeTaskPhase = CHOOSE_TASK;
      phaseTimer.setDuration(taskPhases[CHOOSE_TASK].time);
    } else if (state.activeTaskPhase === CHOOSE_TASK) {
      chooseTaskIfNecessary(state);
      state.activeTaskPhase = MODAL_CHOSEN_TASK;
      phaseTimer.setDuration(taskPhases[MODAL_CHOSEN_TASK].time);
    } else if (state.activeTaskPhase === MODAL_CHOSEN_TASK) {
      state.activeTaskPhase = SOLVING_SAVE_OTHERS;
      phaseTimer.setDuration(taskPhases[SOLVING_SAVE_OTHERS].time);
    } else if (state.activeTaskPhase === SOLVING_SAVE_OTHERS) {
      completeSaveOthersTask(state);
    } else if (
      state.activeTaskPhase === MODAL_SOLVED_TASK ||
      state.activeTaskPhase === MODAL_UNSOLVED_TASK ||
      state.activeTaskPhase === MODAL_NO_ITEM
    ) {
      state.activeTaskPhase = CHOOSE_TASK;
      phaseTimer.setDuration(taskPhases[CHOOSE_TASK].time);
      state.activeTaskIndex += 1;
    }
    phaseTimer.start();
  },
  [actionTypes.CHOSE_CORRECT_ITEM_FOR_TASK]: state => {
    const currentTask = state.taskOrder[state.activeTaskIndex];
    currentTask.numberCorrectChosen += 1;
    if (currentTask.numberCorrectChosen >= currentTask.numberItemsToSolve) {
      currentTask.completed = true;
      currentTask.completedResults = {
        people: getRandomNumberFromRange(currentTask.peopleSavedRange),
        pets: currentTask.petsSaved
      };
    }
  },
  [actionTypes.CHOOSE_NEXT_TASK]: (state, action) => {
    applyChosenTask(state, action);
  },
  [actionTypes.RESET_STATE]: () => {
    phaseTimer.reset();
    return initialState;
  }
});
/* eslint-enable no-param-reassign */

export default tasksReducer;

// SELECTORS

export const getAllTasks = createSelector(
  ["newTasks.tasks"],
  _tasks => _tasks
);

export const getActiveTask = createSelector(
  ["newTasks.taskOrder", "newTasks.activeTaskIndex"],
  (taskOrder, activeTaskIndex) => {
    return taskOrder[activeTaskIndex];
  }
);

export const getActiveTaskIndex = createSelector(
  ["newTasks.activeTaskIndex"],
  activeTaskIndex => activeTaskIndex
);

export const getTaskPhase = createSelector(
  ["newTasks.activeTaskPhase"],
  activeTaskPhase => activeTaskPhase
);

export const getAllTaskPhaseData = createSelector(
  ["newTasks.taskPhases"],
  allTaskPhaseData => allTaskPhaseData
);

export const getWeightedTasks = createSelector(
  [
    "newTasks.tasks",
    "newTasks.tasksForEnvironment",
    "newTasks.activeEnvironment"
  ],
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

// Returns pets / people save obj. Doesn't include first 2 "Save Yourself" tasks
export const getSavedMetrics = createSelector(
  ["newTasks.taskOrder"],
  taskOrder => {
    return taskOrder.reduce(
      (accumulator, task, index) => {
        if (index > 1) {
          accumulator.people += task.completedResults.people;
          accumulator.pets += task.completedResults.pets;
        }
        return accumulator;
      },
      {
        people: 0,
        pets: 0
      }
    );
  }
);
