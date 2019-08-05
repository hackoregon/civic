import { createReducer, createSelector } from "redux-starter-kit";

import SettingsFactory from "./factories/SettingsFactory";

// INITIAL STATE
const initialState = SettingsFactory.getInitialSettings();

// CONSTANTS
export const actionTypes = {};

// ACTIONS

// REDUCERS
export const settings = createReducer(initialState, {});

export default settings;

// SELECTORS

export const getOrbCount = createSelector(
  ["settings.orbCount"],
  orbCount => orbCount
);

export const getOrbSize = createSelector(
  ["settings.orbSize"],
  orbSize => orbSize
);

export const getPeriod = createSelector(
  ["settings.period"],
  period => period
);

export const getVelocityRange = createSelector(
  [
    "settings.minVelocityX",
    "settings.minVelocityY",
    "settings.maxVelocityX",
    "settings.maxVelocityY"
  ],
  (minVelocityX, minVelocityY, maxVelocityX, maxVelocityY) => {
    minVelocityX, minVelocityY, maxVelocityX, maxVelocityY;
  }
);
