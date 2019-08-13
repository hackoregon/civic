import { createReducer, createSelector } from "redux-starter-kit";
import remove from "lodash/remove";

import ORB_FACTORY from "./factories/OrbFactory";

// INITIAL STATE

// build the Orbs model. Each Orb is a simple data model
// consisting of id, location data, velocity, touched, and complete
const initialState = {
  orbs: ORB_FACTORY.createOrbs(),
  touchedOrbs: [],
  completedOrbs: []
};

// CONSTANTS

export const actionTypes = {
  SET_ORBS: "SET_ORBS",
  SET_ORB_TOUCHED: "SET_ORB_TOUCHED",
  SET_ORB_COMPLETE: "SET_ORB_COMPLETE"
};

// ACTIONS

export const setOrbs = models => dispatch => {
  dispatch({ type: actionTypes.SET_ORBS, models });
};

export const setOrbTouched = (id, isTouched) => dispatch => {
  dispatch({ type: actionTypes.SET_ORB_TOUCHED, id, isTouched });
};

export const setOrbComplete = (id, isComplete) => dispatch => {
  dispatch({ type: actionTypes.SET_ORB_COMPLETE, id, isComplete });
};

// REDUCERS

export const orbs = createReducer(initialState, {
  [actionTypes.SET_ORBS]: (state, action) => {
    const { models } = action;
    /* eslint-disable no-param-reassign */
    state.orbs = models;
  },
  [actionTypes.SET_ORB_TOUCHED]: (state, action) => {
    const { id, isTouched } = action;
    if (isTouched) {
      state.touchedOrbs.push(id);
    } else {
      remove(state.touchedOrbs, orbId => orbId === id);
    }
  },

  [actionTypes.SET_ORB_COMPLETE]: (state, action) => {
    const { id, isComplete } = action;
    if (isComplete) {
      state.completedOrbs.push(id);
    } else {
      remove(state.completedOrbs, orbId => orbId === id);
    }
  }
});

export default orbs;

// SELECTORS

export const getOrbs = createSelector(
  ["orbs.orbs"],
  orbModels => orbModels
);
export const getOrbById = createSelector(
  ["orbs.orbs", "id"],
  (orbModels, id) => {
    return orbModels[id];
  }
);

export const getOrbsTouched = createSelector([
  "orbs.touchedOrbs",
  touchedOrbs => touchedOrbs
]);

export const getOrbTouched = createSelector(
  ["orbs.touchedOrbs", "id"],
  (touchedOrbs, id) => touchedOrbs.indexOf(id) > -1
);

export const getOrbsComplete = createSelector([
  "orbs.completedOrbs",
  completedOrbs => completedOrbs
]);

export const getOrbComplete = createSelector(
  ["orbs.completedOrbs", "id"],
  (completedOrbs, id) => completedOrbs.indexOf(id) > -1
);
