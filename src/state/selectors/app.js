import { createSelector } from 'reselect';

// *** SELECTORS *** //
// Selectors can compute derived data, allowing Redux to store the minimal possible state.
// Selectors are efficient. A selector is not recomputed unless one of its arguments change.
// Selectors are composable. They can be used as input to other selectors.

export const appState = state =>  state.app;
export const routeState = state => state.routing;

export const getAgencyData = createSelector(
  appState,
  ({ agencyData }) => agencyData,
);

export const getFmasData = createSelector(
  appState,
  ({ fmasData }) => fmasData,
);

export const getFmasFeatures = createSelector(
  getFmasData,
  ({ features }) => features,
);

export const getFmaPanelId = createSelector(
  appState,
  ({ fmaPanelId }) => fmaPanelId,
);
