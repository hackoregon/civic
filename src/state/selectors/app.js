import { createSelector } from 'reselect';
// import { propOr } from 'ramda';

// // app : State -> Obj
// export const getAppState = state => propOr({}, 'app')(state);
//
// // openModal : State -> state -> String
// export const getOpenModal = createSelector(
//   getAppState,
//   propOr(null, 'openModal'),
// );
//
// // openModal : State -> state -> Array
// export const getStories = createSelector(
//   getAppState,
//   propOr([], 'stories'),
// );

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
