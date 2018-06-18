import { path } from 'ramda';

import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getCampsiteSweepsRequest = createSelector(
  rootState,
  ({ exploreUrbanCampsiteSweeps }) => exploreUrbanCampsiteSweeps,
);

const getFeatures = path(['data', 'results', 'features']);

export const getCampsiteSweepsData = createSelector(
  getCampsiteSweepsRequest,
  ({ data }) => getFeatures(data),
);

export const isCampsiteSweepsPending = createSelector(
  getCampsiteSweepsRequest,
  ({ pending }) => !!pending,
);

export const catchCampsiteSweepsErrors = createSelector(
  getCampsiteSweepsRequest,
  ({ error }) => error || error,
);
