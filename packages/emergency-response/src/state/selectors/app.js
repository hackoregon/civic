import { createSelector } from 'reselect';
import { propOr } from 'ramda';

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

export const getFmaData = createSelector(
  appState,
  ({ fmaData }) => fmaData,
);

export const getFmasData = createSelector(
  appState,
  // ({ fmasData }) => fmasData,
  propOr({}, 'fmasData'),
);

export const getFmaPanelData = createSelector(
  appState,
  ({ fmaPanelData }) => fmaPanelData,
);

// export const getFmasFeatures = createSelector(
//   getFmasData,
//   ({ features }) => features,
// );

// export const getFmaPanelId = createSelector(
//   getFmasFeatures,
//   // ({ fma_id }) => fma_id,
//   propOr(0, 'fma_id'),
// );

// export const getFmasFeaturesByPropertiesId = createSelector(
//   getFmaPanelId,
//   getFmasFeatures,
//   (_id, { properties }) => properties.filter(({ fma_id }) => _id === fma_id),
// );
