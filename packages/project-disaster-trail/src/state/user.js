import { createReducer, createSelector } from "redux-starter-kit";

// INITIAL STATE
// items will be a list of objects, where each object is an id and a quantity
// the id is related to the items reducer
const initialState = {
  points: 0
};

// CONSTANTS

export const actionTypes = {
  SET_POINTS: "SET_POINTS",
  ADD_POINTS: "ADD_POINTS"
};

// ACTIONS
export const setPoints = points => dispatch => {
  dispatch({ type: actionTypes.SET_POINTS, points });
};

export const addPoints = points => dispatch => {
  dispatch({ type: actionTypes.ADD_POINTS, points });
};

// REDUCERS
export const kit = createReducer(initialState, {
  [actionTypes.SET_POINTS]: (state, action) => {
    state.points = action.points;
  },
  [actionTypes.ADD_POINTS]: (state, action) => {
    state.points += action.points;
  }
});

export default kit;

// SELECTORS

export const getPoints = createSelector(
  ["ui.points"],
  points => points
);
