import { createSelector } from 'reselect';
import { rootState } from '../selectors';
import shortDate from '@hackoregon/component-library/src/utils/formatters';

export const getMagnitudeOfUrbanCampsiteSweepsRequest = createSelector(
  rootState,
  ({ magnitudeCampsiteSweeps }) => magnitudeCampsiteSweeps,
);

const formatData = arr => arr.map(obj => ({
  date: new Date(obj.report_time),
  count: obj.count,
}));

export const getMagnitudeOfUrbanCampsiteSweepsData = createSelector(
  getMagnitudeOfUrbanCampsiteSweepsRequest,
  ({ data }) => data && formatData(data),
);

export const isMagnitudeOfUrbanCampsiteSweepsPending = createSelector(
  getMagnitudeOfUrbanCampsiteSweepsRequest,
  ({ pending }) => !!pending,
);

export const catchMagnitudeOfUrbanCampsiteSweepsErrors = createSelector(
  getMagnitudeOfUrbanCampsiteSweepsRequest,
  ({ error }) => error || error,
);

export const formatDateData = createSelector(
  getMagnitudeOfUrbanCampsiteSweepsData,
  data => data,
);
