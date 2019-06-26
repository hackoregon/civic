import { createReducer, createSelector } from "redux-starter-kit";

// INITIAL STATE

const initialState = {
  chapters: { 0: { title: "Attractor" } },
  chaptersOrder: [0, 1, 2, 3, 4, 5, 6],
  activeChapter: 0
};

// CONSTANTS

export const actionTypes = {
  SET_ACTIVE_CHAPTER: "SET_ACTIVE_CHAPTER"
};

// ACTIONS

// FETCH CHAPTER
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

// MODELS

const model = {};

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
