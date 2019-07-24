import { createReducer } from "redux-starter-kit";

import * as MODES from "../constants/modes";
import * as SCREENS from "../constants/screens";

const screen = SCREENS.getScreen();
// @TODO this should be derived based on the screen
const mode = MODES.INSTALLATION;

// INITIAL STATE
const initialState = {
  orbCount: 40,
  orbSize: 100,
  period: 5,
  minVelocityX: -15,
  maxVelocityX: -3,
  minVelocityY: 0,
  maxVelocityY: 0,
  mode,
  screen
};

// Different settings for desktop
// @TODO make into a function
if (screen === SCREENS.LG) {
  initialState.orbCount = 20;
  initialState.minVelocityX = -2;
  initialState.maxVelocityX = -0.2;
  initialState.period = 1;
}

// CONSTANTS
export const actionTypes = {};

// ACTIONS

// REDUCERS
export const settings = createReducer(initialState, {});

export default settings;

// SELECTORS
