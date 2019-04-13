import { createSelector } from "reselect";
import { min, max } from "lodash";
import { timeFormat } from "d3-time-format";
import { rootState } from "../selectors";

export const getCampsiteSweepsRequest = createSelector(
  rootState,
  ({ exploreUrbanCampsiteSweeps }) => exploreUrbanCampsiteSweeps
);

export const getCampsiteSweepsData = createSelector(
  getCampsiteSweepsRequest,
  ({ data }) => data && data.features
);

export const isCampsiteSweepsPending = createSelector(
  getCampsiteSweepsRequest,
  ({ pending }) => !!pending
);

export const catchCampsiteSweepsErrors = createSelector(
  getCampsiteSweepsRequest,
  ({ error }) => error || error
);

export const getCampsiteSweepsTimer = createSelector(
  getCampsiteSweepsRequest,
  ({ timer }) => timer
);

const getCampsiteSweepsDataTimepoints = data =>
  data.map(item => new Date(item.properties.reportdate));

const splitTimepointsToMonths = timepoints => {
  const startMonth = min(timepoints).getMonth();
  const startYear = min(timepoints).getFullYear();
  const endMonth = max(timepoints).getMonth();
  const endYear = max(timepoints).getFullYear();
  const startDate = new Date(startYear, startMonth);
  const endDate = new Date(endYear, endMonth, 0);
  const months =
    endDate.getMonth() -
    startDate.getMonth() +
    1 +
    (endDate.getFullYear() - startDate.getFullYear()) * 12;
  const sections = [...Array(months + 1).keys()];
  return sections.map(
    item => new Date(startDate.getFullYear(), startDate.getMonth() + item)
  );
};

const filterSweepsDataByDate = (data, start, end) =>
  data.filter(item => {
    const d = new Date(item.properties.reportdate);
    return +d >= +start && +d < +end;
  });

const filterSweepsData = (data, timer) => {
  const timepoints = splitTimepointsToMonths(
    getCampsiteSweepsDataTimepoints(data)
  );
  return filterSweepsDataByDate(data, timepoints[timer], timepoints[timer + 1]);
};

const formatDate = timeFormat("%B %Y");

const getDateRange = (data, timer) => {
  const timepoints = splitTimepointsToMonths(
    getCampsiteSweepsDataTimepoints(data)
  );
  return `${formatDate(timepoints[timer])}`;
};

export const getCampsiteSweepsDataByTime = createSelector(
  getCampsiteSweepsData,
  getCampsiteSweepsTimer,
  (data, timer) => data && filterSweepsData(data, timer)
);

export const getCampsiteSweepsDateRange = createSelector(
  getCampsiteSweepsData,
  getCampsiteSweepsTimer,
  (data, timer) => data && getDateRange(data, timer)
);
