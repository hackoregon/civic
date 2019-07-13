import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getMagnitudeOfUrbanCampsiteSweepsRequest = createSelector(
  rootState,
  ({ magnitudeCampsiteSweeps }) => magnitudeCampsiteSweeps
);

const formatData = arr =>
  arr.map(obj => ({
    date: new Date(`${obj.report_time.slice(0, -1)  }-08:00`),
    count: obj.count
  }));

export const getMagnitudeOfUrbanCampsiteSweepsData = createSelector(
  getMagnitudeOfUrbanCampsiteSweepsRequest,
  ({ data }) => data && formatData(data)
);

export const isMagnitudeOfUrbanCampsiteSweepsPending = createSelector(
  getMagnitudeOfUrbanCampsiteSweepsRequest,
  ({ pending }) => !!pending
);

export const catchMagnitudeOfUrbanCampsiteSweepsErrors = createSelector(
  getMagnitudeOfUrbanCampsiteSweepsRequest,
  ({ error }) => error || error
);

export const formatDateData = createSelector(
  getMagnitudeOfUrbanCampsiteSweepsData,
  data => data
);
