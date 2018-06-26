import { path } from 'ramda';

import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getMagnitudeOfUrbanCampsiteSweepsRequest = createSelector(
  rootState,
  ({ magnitudeCampsiteSweeps }) => magnitudeCampsiteSweeps,
);

const getFeatures = path(['data']);

export const getMagnitudeOfUrbanCampsiteSweepsData = createSelector(
  getMagnitudeOfUrbanCampsiteSweepsRequest,
  ({ data }) => getFeatures(data),
);

export const isMagnitudeOfUrbanCampsiteSweepsPending = createSelector(
  getMagnitudeOfUrbanCampsiteSweepsRequest,
  ({ pending }) => !!pending,
);

export const catchMagnitudeOfUrbanCampsiteSweepsErrors = createSelector(
  getMagnitudeOfUrbanCampsiteSweepsRequest,
  ({ error }) => error || error,
);
