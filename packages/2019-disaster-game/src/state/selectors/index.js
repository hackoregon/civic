import { createSelector } from "reselect";

// The root state for a package is namespaced in the 2018 package
// and the root state object when developing a package in isolation
export const rootState = state => state.disaster || state;

// Creating all selectors off the appState selector eliminates the need
// to think about state namespacing in each component
export const getSomeData = createSelector(
  rootState,
  ({ someData }) => someData
);
