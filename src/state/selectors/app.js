import { createSelector } from 'reselect';

export const appState = state =>  state.app;
export const routeState = state => state.routing;

export const getAgencyData = createSelector(
  appState,
  ({ agencyData }) => agencyData
)

export const getAgencyDataResults = createSelector(
  getAgencyData,
  ({ results }) => results
)
