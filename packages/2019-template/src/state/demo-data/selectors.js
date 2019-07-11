import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getDemoRequest = createSelector(
  rootState,
  ({ demoData }) => demoData
);

export const getDemoData = createSelector(
  getDemoRequest,
  ({ data }) =>
    (data || {}).DemoData &&
    data.DemoData.map(yearObj => ({
      series: "Weekday",
      year: yearObj.year,
      ridership: yearObj.weekday_sum_ons
    }))
      .concat(
        data.DemoData.map(yearObj => ({
          series: "Saturday",
          year: yearObj.year,
          ridership: yearObj.saturday_sum_ons
        }))
      )
      .concat(
        data.DemoData.map(yearObj => ({
          series: "Sunday",
          year: yearObj.year,
          ridership: yearObj.sunday_sum_ons
        }))
      )
);

export const isDemoDataPending = createSelector(
  getDemoRequest,
  ({ pending }) => !!pending
);
