import { createReducer, createSelector } from "redux-starter-kit";
import find from "lodash/find";
import size from "lodash/size";

import CHAPTER_FACTORY from "./factories/ChapterFactory";
import CHAPTERS from "../constants/chapters";

// INITIAL STATE

// build the Chapters model. Each Chapter is a simple data model
// consisting of title, enabled, and type properties.
const model = {};
for (let i = 1, len = size(CHAPTERS); i <= len; i += 1) {
  const chapterModel = CHAPTER_FACTORY.createChapter({ index: i });
  model[i] = chapterModel;
}

// find the first chapter with 'enabled' true
const firstActiveChapter = find(model, chapter => {
  return chapter.enabled;
});

const initialState = {
  chapters: { ...model },
  activeChapter: firstActiveChapter.id,
  lastChapter: size(CHAPTERS)
};

// CONSTANTS

export const actionTypes = {
  SET_ACTIVE_CHAPTER: "SET_ACTIVE_CHAPTER",
  GO_TO_NEXT_CHAPTER: "GO_TO_NEXT_CHAPTER"
};

// ACTIONS

export const setActiveChapter = chapterId => dispatch => {
  dispatch({ type: actionTypes.SET_ACTIVE_CHAPTER, chapterId });
};

export const goToNextChapter = () => dispatch => {
  dispatch({ type: actionTypes.GO_TO_NEXT_CHAPTER });
};

// REDUCERS

/* eslint-disable no-param-reassign */
export const chapters = createReducer(initialState, {
  [actionTypes.SET_ACTIVE_CHAPTER]: (state, action) => {
    if (action.chapterId > state.lastChapter) return;
    if (action.chapterId < 1) return;
    state.activeChapter = action.chapterId;
  },
  [actionTypes.GO_TO_NEXT_CHAPTER]: state => {
    if (state.activeChapter >= state.lastChapter) return;
    state.activeChapter += 1;
  }
});
/* eslint-enable no-param-reassign */

export default chapters;

// SELECTORS

/**
 * returns the Chapter for the given chapterId
 *
 * @param {*} state
 * @param {*} id
 * @returns
 */
export const getActiveChapter = createSelector(
  ["chapters.chapters", "chapters.activeChapter"],
  (gameChapters, id) => {
    return gameChapters[id];
  }
);

export const getChapterById = createSelector(
  ["chapters.chapters", "id"],
  (gameChapters, id) => {
    return gameChapters[id];
  }
);
