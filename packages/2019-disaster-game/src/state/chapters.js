import { createReducer, createSelector } from "redux-starter-kit";
import CHAPTERS from "../constants/chapters";

const lastChapterIndex = CHAPTERS.length - 1;
const initialState = {
  activeChapterIndex: 0
};

// CONSTANTS

export const actionTypes = {
  SET_ACTIVE_CHAPTER: "SET_ACTIVE_CHAPTER",
  GO_TO_NEXT_CHAPTER: "GO_TO_NEXT_CHAPTER",
  GO_TO_CHAPTER: "GO_TO_CHAPTER"
};

// ACTIONS

export const setActiveChapter = chapterIndex => dispatch => {
  dispatch({ type: actionTypes.SET_ACTIVE_CHAPTER, chapterIndex });
};

export const goToNextChapter = () => dispatch => {
  dispatch({ type: actionTypes.GO_TO_NEXT_CHAPTER });
};

export const goToChapter = customChapter => dispatch => {
  dispatch({ type: actionTypes.GO_TO_CHAPTER, customChapter });
};

// REDUCERS

/* eslint-disable no-param-reassign */
export const chapters = createReducer(initialState, {
  [actionTypes.SET_ACTIVE_CHAPTER]: (state, action) => {
    if (action.chapterIndex < 0 || action.chapterIndex > lastChapterIndex)
      return;

    state.activeChapterIndex = action.chapterIndex;
  },

  [actionTypes.GO_TO_NEXT_CHAPTER]: state => {
    if (state.activeChapterIndex >= lastChapterIndex) {
      state.activeChapterIndex = 0;
    } else {
      state.activeChapterIndex += 1;
    }
  },

  [actionTypes.GO_TO_CHAPTER]: (state, action) => {
    const { customChapter } = action;
    state.activeChapterIndex = customChapter || 0;
  }
});
/* eslint-enable no-param-reassign */

export default chapters;

// SELECTORS

export const getActiveChapterIndex = createSelector(
  ["chapters.activeChapterIndex"],
  activeChapterIndex => activeChapterIndex
);

export const getActiveChapterData = createSelector(
  ["chapters.activeChapterIndex"],
  activeChapterIndex => CHAPTERS[activeChapterIndex]
);

export const getActiveChapterId = createSelector(
  ["chapters.activeChapterIndex"],
  activeChapterIndex => CHAPTERS[activeChapterIndex].id
);

export const getActiveChapterDuration = createSelector(
  ["chapters.activeChapterIndex"],
  activeChapterIndex => CHAPTERS[activeChapterIndex].duration
);

export const getChapterById = createSelector(
  ["id"],
  id => CHAPTERS.find(chapter => chapter.id === id)
);
