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

const taskPhases = {
  [SOLVING_SAVE_YOURSELF]: { time: 30 },
  [SOLVING_SAVE_OTHERS]: { time: 20 },
  [MODAL_SAVE_OTHERS_INTRO]: { time: 10 },
  [CHOOSE_TASK]: { time: 20 },
  [MODAL_CHOSEN_TASK]: { time: 10 },
  [MODAL_SOLVED_TASK]: { time: 10 },
  [MODAL_UNSOLVED_TASK]: { time: 10 },
  [MODAL_NO_ITEM]: { time: 10 }
};

const actionTypes = {
  GO_TO_NEXT_TASK_PHASE_NEW: "GO_TO_NEXT_TASK_PHASE_NEW",
  CHOSE_CORRECT_ITEM_FOR_TASK: "CHOSE_CORRECT_ITEM_FOR_TASK"
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

// REDUCER HELPERS
/* eslint-disable no-param-reassign */

// Mark task as completed, increase activeTaskIndex, change to next phase if applicable, and start timer
const completeSaveYourselfTask = state => {
  if (state.taskOrder[state.activeTaskIndex])
    state.taskOrder[state.activeTaskIndex].completed = true;
  if (state.activeTaskIndex === 1) {
    state.activeTaskPhase = MODAL_SAVE_OTHERS_INTRO;
    phaseTimer.setDuration(taskPhases[MODAL_SAVE_OTHERS_INTRO].time);
  } else {
    phaseTimer.setDuration(taskPhases[SOLVING_SAVE_YOURSELF].time);
  }
  state.activeTaskIndex += 1;
};

const getRandomNumberFromRange = range => {
  const min = Math.ceil(range[0]);
  const max = Math.floor(range[1]);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// REDUCERS
export const tasksReducer = createReducer(initialState, {
  [actionTypes.GO_TO_NEXT_TASK_PHASE_NEW]: (state, action) => {
    // add check at start if game should end
    if (state.activeTaskPhase === SOLVING_SAVE_YOURSELF) {
      completeSaveYourselfTask(state, action);
    } else if (state.activeTaskPhase === MODAL_SAVE_OTHERS_INTRO) {
      state.activeTaskPhase = CHOOSE_TASK;
      phaseTimer.setDuration(taskPhases[CHOOSE_TASK].time);
    } else if (state.activeTaskPhase === CHOOSE_TASK) {
      state.activeTaskPhase = MODAL_CHOSEN_TASK;
      phaseTimer.setDuration(taskPhases[MODAL_CHOSEN_TASK].time);
    } else if (state.activeTaskPhase === MODAL_CHOSEN_TASK) {
      state.activeTaskPhase = SOLVING_SAVE_OTHERS;
      phaseTimer.setDuration(taskPhases[SOLVING_SAVE_OTHERS].time);
    } else if (state.activeTaskPhase === SOLVING_SAVE_OTHERS) {
      if (action.solved === true) {
        state.activeTaskPhase = MODAL_SOLVED_TASK;
        phaseTimer.setDuration(taskPhases[MODAL_SOLVED_TASK].time);
      } else if (action.solved === false) {
        state.activeTaskPhase = MODAL_UNSOLVED_TASK;
        phaseTimer.setDuration(taskPhases[MODAL_UNSOLVED_TASK].time);
      } else {
        state.activeTaskPhase = MODAL_NO_ITEM;
        phaseTimer.setDuration(taskPhases[MODAL_NO_ITEM].time);
      }
    } else if (
      state.activeTaskPhase === MODAL_SOLVED_TASK ||
      state.activeTaskPhase === MODAL_UNSOLVED_TASK ||
      state.activeTaskPhase === MODAL_NO_ITEM
    ) {
      state.activeTaskPhase = CHOOSE_TASK;
      phaseTimer.setDuration(taskPhases[CHOOSE_TASK].time);
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
