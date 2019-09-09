import { createReducer } from "redux-starter-kit";

import SFX, { TYPES } from "../constants/sfx";

const initialState = {};

// CONSTANTS
export const actionTypes = { PLAY_SFX: "PLAY_SFX" };

// ACTIONS

export const playSFX = id => dispatch => {
  dispatch({ type: actionTypes.PLAY_SFX, id });
};

export const sfx = createReducer(initialState, {
  [actionTypes.PLAY_SFX]: (state, action) => {
    try {
      SFX[TYPES[action.id]].play();
    } catch (error) {
      // eslint-disable-next-line
      console.warn("Unknown SFX type requested ", action, error);
    }
  }
});

export default sfx;
