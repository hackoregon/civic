import { createReducer, createSelector } from "redux-starter-kit";
import { shuffle } from "lodash";
import size from "lodash/size";

import { tasks, tasksForEnvironment, URBAN } from "../constants/tasks";
import badges from "../constants/badges";
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
  MODAL_NO_ITEM: "MODAL_NO_ITEM",
  MODAL_BADGE_EARNED: "MODAL_BADGE_EARNED"
};

const {
  SOLVING_SAVE_YOURSELF,
  SOLVING_SAVE_OTHERS,
  MODAL_SAVE_OTHERS_INTRO,
  CHOOSE_TASK,
  MODAL_CHOSEN_TASK,
  MODAL_SOLVED_TASK,
  MODAL_UNSOLVED_TASK,
  MODAL_NO_ITEM,
  MODAL_BADGE_EARNED
} = taskPhaseKeys;

const taskPhasesChapterCanEndAfter = [
  MODAL_SOLVED_TASK,
  MODAL_UNSOLVED_TASK,
  MODAL_NO_ITEM,
  MODAL_BADGE_EARNED
];

// +1 added to times because it makes the timer look nicer
const taskPhases = {
  [SOLVING_SAVE_YOURSELF]: { time: 31 },
  [SOLVING_SAVE_OTHERS]: { time: 21 },
  [MODAL_SAVE_OTHERS_INTRO]: { time: 6 },
  [CHOOSE_TASK]: { time: 21 },
  [MODAL_CHOSEN_TASK]: { time: 3 },
  [MODAL_SOLVED_TASK]: { time: 6 },
  [MODAL_UNSOLVED_TASK]: { time: 6 },
  [MODAL_NO_ITEM]: { time: 6 },
  [MODAL_BADGE_EARNED]: { time: 3 }
};

const actionTypes = {
  EARN_BADGE: "EARN_BADGE",
  GO_TO_NEXT_TASK_PHASE_NEW: "GO_TO_NEXT_TASK_PHASE_NEW",
  TRACK_ITEM_USED: "TRACK_ITEM_USED",
  CHOOSE_NEXT_TASK: "CHOOSE_NEXT_TASK",
  MANUAL_CHANGE_TASK_PHASE: "MANUAL_CHANGE_TASK_PHASE",
  RESET_STATE: "RESET_STATE",
  START_CHAPTER_TIMER: "START_CHAPTER_TIMER",
  END_CHAPTER: "END_CHAPTER",
  SET_FINAL_BADGE_AS_SHOWN: "SET_FINAL_BADGE_AS_SHOWN",
  ADD_BADGE_IF_BADGE_EARNED: "ADD_BADGE_IF_BADGE_EARNED"
};

const chapterTimer = new Timer();
const phaseTimer = new Timer();

// INITIAL STATE
const initialState = {
  tasks,
  tasksForEnvironment,
  activeEnvironment: defaultEnv,
  taskOrder: shuffle(tasksForEnvironment[defaultEnv].saveYourself),
  activeTaskIndex: -1,
  activeTaskPhase: SOLVING_SAVE_YOURSELF,
  taskPhases,
  endingChapter: false,
  numberSolvedSaveYourselfTasks: 0,
  numberSolvedSaveOthersTasks: 0,
  prevTaskPhase: null,
  badges
};

// ACTIONS
export const earnBadge = badge => dispatch => {
  dispatch({ type: actionTypes.EARN_BADGE, badge });
};

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
  dispatch({ type: actionTypes.TRACK_ITEM_USED });
  if (willCompleteTask) {
    dispatch({ type: actionTypes.ADD_BADGE_IF_BADGE_EARNED });
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

export const startChapterAndPhaseTimers = () => dispatch => {
  chapterTimer.reset();
  chapterTimer.setDuration(120);
  chapterTimer.addCompleteCallback(() => {
    dispatch({ type: actionTypes.END_CHAPTER });
  });
  chapterTimer.start();
  goToNextTaskPhase()(dispatch);
};

export const showEndChapterSequence = () => dispatch => {
  dispatch({
    type: actionTypes.MANUAL_CHANGE_TASK_PHASE,
    phase: MODAL_BADGE_EARNED
  });
  phaseTimer.setDuration(taskPhases[MODAL_BADGE_EARNED].time);
  phaseTimer.addCompleteCallback(() => {
    dispatch({ type: actionTypes.SET_FINAL_BADGE_AS_SHOWN });
  });
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

const getNewBadgeEarned = state => {
  const {
    preparerBadge,
    taskSurvivorBadge,
    taskNeighborhoodHeroBadge,
    taskCitySuperheroBadge,
    earthquakeHeroBadge
  } = state.badges;
  let newBadgeEarned = null;
  if (preparerBadge.activeTaskIndexWhenEarned && !preparerBadge.shown) {
    newBadgeEarned = preparerBadge;
  } else if (
    taskSurvivorBadge.activeTaskIndexWhenEarned &&
    !taskSurvivorBadge.shown
  ) {
    newBadgeEarned = taskSurvivorBadge;
  } else if (
    taskNeighborhoodHeroBadge.activeTaskIndexWhenEarned &&
    !taskNeighborhoodHeroBadge.shown
  ) {
    newBadgeEarned = taskNeighborhoodHeroBadge;
  } else if (
    taskCitySuperheroBadge.activeTaskIndexWhenEarned &&
    !taskCitySuperheroBadge.shown
  ) {
    newBadgeEarned = taskCitySuperheroBadge;
  } else if (earthquakeHeroBadge.activeTaskIndexWhenEarned) {
    newBadgeEarned = earthquakeHeroBadge;
  }
  return newBadgeEarned;
};

const completeSaveYourselfTask = state => {
  const newBadgeEarned = getNewBadgeEarned(state);
  if (!!newBadgeEarned && newBadgeEarned.id === "taskSurvivorBadge") {
    state.activeTaskPhase = MODAL_BADGE_EARNED;
    phaseTimer.setDuration(taskPhases[MODAL_BADGE_EARNED].time);
  } else if (state.activeTaskIndex === 1) {
    state.activeTaskPhase = MODAL_SAVE_OTHERS_INTRO;
    phaseTimer.setDuration(taskPhases[MODAL_SAVE_OTHERS_INTRO].time);
  } else {
    state.activeTaskIndex += 1;
    phaseTimer.setDuration(taskPhases[SOLVING_SAVE_YOURSELF].time);
  }
};

const completeSaveOthersTask = state => {
  const activeTask = state.taskOrder[state.activeTaskIndex];
  const newBadgeEarned = getNewBadgeEarned(state);
  if (
    !!newBadgeEarned &&
    (newBadgeEarned.id === "taskNeighborhoodHeroBadge" ||
      newBadgeEarned.id === "taskCitySuperheroBadge")
  ) {
    state.activeTaskPhase = MODAL_BADGE_EARNED;
    phaseTimer.setDuration(taskPhases[MODAL_BADGE_EARNED].time);
  } else if (activeTask.completed === true) {
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
  [actionTypes.EARN_BADGE]: (state, action) => {
    // Just need a truthy value to work
    state.badges[action.badge].activeTaskIndexWhenEarned = true;
    state.badges[action.badge].shown = true;
  },
  [actionTypes.END_CHAPTER]: state => {
    state.endingChapter = true;
  },
  [actionTypes.SET_FINAL_BADGE_AS_SHOWN]: state => {
    state.finalBadgeShown = true;
  },
  [actionTypes.MANUAL_CHANGE_TASK_PHASE]: (state, action) => {
    const { phase } = action;
    state.activeTaskPhase = phase;
  },
  [actionTypes.GO_TO_NEXT_TASK_PHASE_NEW]: state => {
    state.prevTaskPhase = state.activeTaskPhase;
    const canBeFinalPhase =
      taskPhasesChapterCanEndAfter.indexOf(state.activeTaskPhase) > -1;
    if (canBeFinalPhase && state.endingChapter) {
      // test
      if (state.activeTaskPhase === MODAL_BADGE_EARNED) {
        const newBadgeEarned = getNewBadgeEarned(state);
        newBadgeEarned.shown = true;
      }
      state.badges.earthquakeHeroBadge.activeTaskIndexWhenEarned =
        state.activeTaskIndex;
      state.badges.earthquakeHeroBadge.shown = true;
      state.activeTaskPhase = MODAL_BADGE_EARNED;
    } else if (state.activeTaskPhase === SOLVING_SAVE_YOURSELF) {
      completeSaveYourselfTask(state);
    } else if (state.activeTaskPhase === MODAL_BADGE_EARNED) {
      const newBadgeEarned = getNewBadgeEarned(state);
      newBadgeEarned.shown = true;
      if (state.activeTaskIndex === 1) {
        phaseTimer.setDuration(taskPhases[MODAL_SAVE_OTHERS_INTRO].time);
        state.activeTaskPhase = MODAL_SAVE_OTHERS_INTRO;
      } else {
        state.activeTaskIndex += 1;
        state.activeTaskPhase = CHOOSE_TASK;
      }
    } else if (state.activeTaskPhase === MODAL_SAVE_OTHERS_INTRO) {
      state.activeTaskIndex += 1;
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
      state.activeTaskPhase === MODAL_UNSOLVED_TASK ||
      state.activeTaskPhase === MODAL_NO_ITEM ||
      state.activeTaskPhase === MODAL_SOLVED_TASK
    ) {
      state.activeTaskIndex += 1;
      state.activeTaskPhase = CHOOSE_TASK;
      phaseTimer.setDuration(taskPhases[CHOOSE_TASK].time);
    }
    phaseTimer.start();
  },
  [actionTypes.TRACK_ITEM_USED]: state => {
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
  [actionTypes.ADD_BADGE_IF_BADGE_EARNED]: state => {
    // Track number of solved tasks
    const { activeTaskPhase, activeTaskIndex } = state;
    if (activeTaskPhase === SOLVING_SAVE_OTHERS) {
      state.numberSolvedSaveOthersTasks += 1;
    } else {
      state.numberSolvedSaveYourselfTasks += 1;
    }
    // Check badge conditions
    const completedAllSaveYourselfTasks =
      state.numberSolvedSaveYourselfTasks === 2;
    const earnedNeighborhoodHeroBadge = state.numberSolvedSaveOthersTasks === 2;
    const earnedCitySuperheroBadge = state.numberSolvedSaveOthersTasks === 4;
    // Add badges
    if (
      activeTaskPhase === SOLVING_SAVE_YOURSELF &&
      completedAllSaveYourselfTasks
    ) {
      state.badges.taskSurvivorBadge.activeTaskIndexWhenEarned = activeTaskIndex;
    } else if (activeTaskPhase === SOLVING_SAVE_OTHERS) {
      if (
        earnedCitySuperheroBadge &&
        !state.badges.taskCitySuperheroBadge.activeTaskIndexWhenEarned
      ) {
        state.badges.taskCitySuperheroBadge.activeTaskIndexWhenEarned = activeTaskIndex;
      } else if (
        earnedNeighborhoodHeroBadge &&
        !state.badges.taskNeighborhoodHeroBadge.activeTaskIndexWhenEarned
      ) {
        state.badges.taskNeighborhoodHeroBadge.activeTaskIndexWhenEarned = activeTaskIndex;
      }
    }
  },
  [actionTypes.CHOOSE_NEXT_TASK]: (state, action) => {
    applyChosenTask(state, action);
  },
  [actionTypes.RESET_STATE]: () => {
    phaseTimer.reset();
    chapterTimer.reset();
    return initialState;
  }
});
/* eslint-enable no-param-reassign */

export default tasksReducer;

// SELECTORS

export const getEndingChapter = createSelector(
  ["tasks.endingChapter"],
  endingChapter => endingChapter
);

export const getAllTasks = createSelector(
  ["tasks.tasks"],
  _tasks => _tasks
);

export const getActiveTask = createSelector(
  ["tasks.taskOrder", "tasks.activeTaskIndex"],
  (taskOrder, activeTaskIndex) => {
    return taskOrder[activeTaskIndex];
  }
);

export const getActiveTaskIndex = createSelector(
  ["tasks.activeTaskIndex"],
  activeTaskIndex => activeTaskIndex
);

export const getTaskPhase = createSelector(
  ["tasks.activeTaskPhase"],
  activeTaskPhase => activeTaskPhase
);

export const getAllTaskPhaseData = createSelector(
  ["tasks.taskPhases"],
  allTaskPhaseData => allTaskPhaseData
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

// Returns pets / people save obj. Doesn't include first 2 "Save Yourself" tasks
export const getSavedMetrics = createSelector(
  ["tasks.taskOrder"],
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

export const getBadges = createSelector(
  ["tasks.badges"],
  _badges => _badges
);

export const getNextBadgeToShow = createSelector(
  ["tasks"],
  _tasks => getNewBadgeEarned(_tasks)
);

export const getFinalBadgeShown = createSelector(
  ["tasks.finalBadgeShown"],
  finalBadgeShown => finalBadgeShown
);
