import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getPNWSurge = createSelector(
  rootState,
  ({ pnwSurge }) => pnwSurge
);

const getProperty = key =>
  createSelector(
    getPNWSurge,
    state => state[key]
  );

export const isLoading = getProperty("pending");
export const isError = getProperty("error");
export const getAllCities = getProperty("allCities");
export const getShortTermTrend = getProperty("shortTermTrend");
export const getLongTermTrend = getProperty("longTermTrend");
export const getSelectedCity = getProperty("selectedCity");

export const getSelectedCityShortTermData = createSelector(
  getShortTermTrend,
  getSelectedCity,
  (data, city) => data && data.find(d => d.datapoint === city)
);

export const getSelectedCityRank = createSelector(
  getSelectedCityShortTermData,
  datum => {
    return datum
      ? {
          rank: datum.rank,
          total: datum.total
        }
      : {};
  }
);

export const getChartData = createSelector(
  getShortTermTrend,
  getLongTermTrend,
  getSelectedCity,
  (short, long, city) => {
    const data = [];

    if (!short || !long) return;

    short.forEach(point => {
      const longPoint = long.find(d => d.datapoint === point.datapoint);
      data.push({
        shortTerm: +point.value,
        longTerm: longPoint && +longPoint.value,
        series: point.datapoint === city ? point.datapoint : ""
      });
    });

    // eslint-disable-next-line consistent-return
    return data;
  }
);
