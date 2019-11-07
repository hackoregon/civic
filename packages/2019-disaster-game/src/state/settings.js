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
  /* eslint-disable no-unused-expressions */
  (minVelocityX, minVelocityY, maxVelocityX, maxVelocityY) => {
    /* eslint-disable no-sequences */
    minVelocityX, minVelocityY, maxVelocityX, maxVelocityY;
  }
);

export const getTileServerApi = createSelector(
  ["settings.tileServerApi"],
  api => api
);

export const getSentryDSNApi = createSelector(
  ["settings.sentryDSNApi"],
  api => api
);
