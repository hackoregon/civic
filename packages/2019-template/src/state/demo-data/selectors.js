// eslint-disable-next-line import/no-extraneous-dependencies
import _ from "lodash";
import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getDemoRequest = createSelector(
  rootState,
  ({ demoData }) => demoData
);

const getProperty = key =>
  createSelector(
    getDemoRequest,
    state => (_.has(state.data, key) ? state.data[key] : false)
  );

const formatRidershipData = data =>
  !data
    ? undefined
    : data
        .map(yearObj => ({
          series: "Weekday",
          year: yearObj.year,
          ridership: yearObj.weekday_sum_ons
        }))
        .concat(
          data.map(yearObj => ({
            series: "Saturday",
            year: yearObj.year,
            ridership: yearObj.saturday_sum_ons
          }))
        )
        .concat(
          data.map(yearObj => ({
            series: "Sunday",
            year: yearObj.year,
            ridership: yearObj.sunday_sum_ons
          }))
        );

const getAndFormatProperty = key =>
  createSelector(
    getProperty(key),
    data => formatRidershipData(data)
  );

export const getDemoData = getAndFormatProperty("DemoData");
export const getRouteGentrification = getProperty("RouteGentrification");
export const getRoutes = createSelector(
  getRouteGentrification,
  data => (!data ? undefined : data.map(item => item.route))
);
export const getMidGentrificationRoutes = createSelector(
  getRouteGentrification,
  data =>
    !data
      ? undefined
      : data
          .filter(item => item.gentrification === "Mid")
          .map(item => item.route)
);
export const getLateGentrificationRoutes = createSelector(
  getRouteGentrification,
  data =>
    !data
      ? undefined
      : data
          .filter(item => item.gentrification === "Late")
          .map(item => item.route)
);

export const getMidGentrificationRouteData = createSelector(
  getMidGentrificationRoutes,
  getDemoRequest,
  (routes, { data }) => routes && data && routes.map(route => data[route])
);

export const getLateGentrificationRouteData = createSelector(
  getLateGentrificationRoutes,
  getDemoRequest,
  (routes, { data }) => routes && data && routes.map(route => data[route])
);

export const getFormattedMidGentrificationRouteData = createSelector(
  getMidGentrificationRoutes,
  getDemoRequest,
  (routes, { data }) =>
    routes && data && routes.map(route => formatRidershipData(data[route]))
);

export const getFormattedLateGentrificationRouteData = createSelector(
  getLateGentrificationRoutes,
  getDemoRequest,
  (routes, { data }) =>
    routes && data && routes.map(route => formatRidershipData(data[route]))
);

const sumRidership = (a, b) =>
  a.map(datum => {
    const matchOrUndef = b.find(
      el => el.series === datum.series && el.year === datum.year
    );
    const matchedDatum =
      matchOrUndef === undefined ? { ridership: 0 } : matchOrUndef;
    return {
      series: datum.series,
      year: datum.year,
      ridership: datum.ridership + matchedDatum.ridership
    };
  });

export const getMidGentrificationRidershipData = createSelector(
  getMidGentrificationRoutes,
  getDemoRequest,
  (routes, { data }) =>
    routes &&
    data &&
    routes
      .map(route => formatRidershipData(data[route]))
      .reduce((acc, curr) => sumRidership(acc, curr))
);

export const getLateGentrificationRidershipData = createSelector(
  getLateGentrificationRoutes,
  getDemoRequest,
  (routes, { data }) =>
    routes &&
    data &&
    routes
      .map(route => formatRidershipData(data[route]))
      .reduce((acc, curr) => sumRidership(acc, curr))
);

export const isDemoDataPending = createSelector(
  getDemoRequest,
  ({ pending }) => !!pending
);
