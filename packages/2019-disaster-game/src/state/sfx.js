import { createReducer } from "redux-starter-kit";
import SFX, { TYPES } from "../constants/sfx";

const initialState = {};

// CONSTANTS
export const actionTypes = {
  PLAY_SFX: "PLAY_SFX",
  PLAY_THEME: "PLAY_THEME",
  STOP_THEME: "STOP_THEME"
};

// ACTIONS

export const playSFX = id => dispatch => {
  dispatch({ type: actionTypes.PLAY_SFX, id });
};

export const playTheme = themeName => dispatch => {
  dispatch({ type: actionTypes.PLAY_THEME, themeName });
};

export const stopTheme = themeName => dispatch => {
  dispatch({ type: actionTypes.STOP_THEME, themeName });
};

// REDUCER

/* eslint-disable no-param-reassign */
export const sfx = createReducer(initialState, {
  [actionTypes.PLAY_SFX]: (state, action) => {
    try {
      SFX[TYPES[action.id]].play();
    } catch (error) {
      // eslint-disable-next-line
      console.warn("Unknown SFX type requested to play ", action, error);
    }
  },
  [actionTypes.PLAY_THEME]: (state, action) => {
    try {
      const { themeName } = action;
      const howlObj = SFX[TYPES[action.themeName]];
      howlObj.stop();
      const howlId = howlObj.play();
      state[`${themeName}_ID`] = howlId;
    } catch (error) {
      // eslint-disable-next-line
      console.warn("Unknown SFX theme requested to play ", action, error);
    }
  },
  [actionTypes.STOP_THEME]: (state, action) => {
    try {
      const { themeName } = action;
      const howlObj = SFX[TYPES[action.themeName]];
      howlObj.fade(howlObj.volume(), 0, 750, state[`${themeName}_ID`]);
    } catch (error) {
      // eslint-disable-next-line
      console.warn("Unknown SFX theme requested to stop ", action, error);
    }
  }
});
/* eslint-enable no-param-reassign */

export default sfx;
