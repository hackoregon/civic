import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getCampsiteSweepsRequest = createSelector(
  rootState,
  ({ exploreUrbanCampsiteSweeps }) => exploreUrbanCampsiteSweeps,
);

export const getCampsiteSweepsData = createSelector(
  getCampsiteSweepsRequest,
  ({ data }) => (!data
  ? null
  : data.data.results.features),
);

export const isCampsiteSweepsPending = createSelector(
  getCampsiteSweepsRequest,
  ({ pending }) => !!pending,
);

export const catchCampsiteSweepsErrors = createSelector(
  getCampsiteSweepsRequest,
  ({ error }) => error || error,
);
