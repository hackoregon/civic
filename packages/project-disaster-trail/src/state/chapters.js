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
  ...model,
  activeChapter: firstActiveChapter.id
};

// CONSTANTS

export const actionTypes = {
  SET_ACTIVE_CHAPTER: "SET_ACTIVE_CHAPTER"
};

// ACTIONS

export const setActiveChapter = chapterId => dispatch => {
  dispatch({ type: actionTypes.SET_ACTIVE_CHAPTER, chapterId });
};

// REDUCERS

export const chapters = createReducer(initialState, {
  [actionTypes.SET_ACTIVE_CHAPTER]: (state, action) => {
    state.setActiveChapter = action.chapterId;
  }
});

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
  ["chapters.chapters", "activeChapterId"],
  (chapters, id) => {
    return chapters[id];
  }
);

export const getChapterById = createSelector(
  ["state.chapters.chapters", "id"],
  (chapters, id) => {
    return chapters[id];
  }
);
