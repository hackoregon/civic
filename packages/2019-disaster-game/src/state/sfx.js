import { createReducer } from "redux-starter-kit";
import { Howl } from "howler";
import SFX, { TYPES } from "../constants/sfx";
import attractorSong from "../../assets/audio/PWolf-happysong1wfadeinout.mp3";

const attractorHowl = (() =>
  new Howl({
    src: [attractorSong],
    autoplay: false,
    loop: true,
    volume: 0.25,
    onfade: () => {
      attractorHowl.stop();
    }
  }))();

const initialState = {
  themeAttractor: attractorHowl
};

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
      const howlObj = state[themeName];
      howlObj.stop();
      const howlId = state[themeName].play();
      state[`${themeName}Id`] = howlId;
    } catch (error) {
      // eslint-disable-next-line
      console.warn("Unknown SFX theme requested to play ", action, error);
    }
  },
  [actionTypes.STOP_THEME]: (state, action) => {
    try {
      const { themeName } = action;
      const howlObj = state[themeName];
      howlObj.fade(howlObj.volume(), 0, 750, state[`${themeName}Id`]);
    } catch (error) {
      // eslint-disable-next-line
      console.warn("Unknown SFX theme requested to stop ", action, error);
    }
  }
});
/* eslint-enable no-param-reassign */

export default sfx;
