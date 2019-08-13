import { createReducer, createSelector } from "redux-starter-kit";
import CHAPTERS from "../constants/chapters";

const totalChapters = CHAPTERS.length;
const initialState = {
  activeChapterId: 2
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
    if (action.chapterId < 1 || action.chapterId > totalChapters) return;

    state.activeChapterId = action.chapterId;
  },

  [actionTypes.GO_TO_NEXT_CHAPTER]: state => {
    if (state.activeChapterId >= totalChapters) return;
    state.activeChapterId += 1;
  }
});
/* eslint-enable no-param-reassign */

export default chapters;

// SELECTORS

/**
 * returns the Chapter for the given chapterId
 *
 * @param {*} id
 * @returns
 */
export const getActiveChapter = createSelector(
  ["chapters.activeChapterId"],
  activeChapterId => CHAPTERS.find(chapter => chapter.id === activeChapterId)
);

export const getChapterById = createSelector(
  ["id"],
  id => CHAPTERS.find(chapter => chapter.id === id)
);
