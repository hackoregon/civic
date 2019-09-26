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
  ADD_POINTS: "ADD_POINTS",
  RESET_STATE: "RESET_STATE"
};

// ACTIONS
export const setPoints = points => dispatch => {
  dispatch({ type: actionTypes.SET_POINTS, points });
};

export const addPoints = points => dispatch => {
  dispatch({ type: actionTypes.ADD_POINTS, points });
};

export const resetState = () => dispatch => {
  dispatch({ type: actionTypes.RESET_STATE });
};

// REDUCERS
/* eslint-disable no-param-reassign */
export const user = createReducer(initialState, {
  [actionTypes.SET_POINTS]: (state, action) => {
    state.points = action.points;
  },
  [actionTypes.ADD_POINTS]: (state, action) => {
    state.points += action.points;
  },
  [actionTypes.RESET_STATE]: () => {
    return initialState;
  }
});
/* eslint-enable no-param-reassign */

export default user;

// SELECTORS

export const getPoints = createSelector(
  ["user.points"],
  points => points
);
