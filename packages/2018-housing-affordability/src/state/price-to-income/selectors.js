import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getPTI = createSelector(
  rootState,
  ({ priceToIncome }) => priceToIncome
);

const getProperty = key =>
  createSelector(
    getPTI,
    state => state[key]
  );

const transformPTIResponse = data =>
  data
    ? data.map(datum => ({
        ...datum,
        value: +datum.value,
        year: datum.date ? +datum.date.split("-")[0] : -1
      }))
    : [];

export const isAllCitiesLoading = getProperty("allCitiesPending");
export const isCityDetailLoading = getProperty("cityPending");
export const isCountryLoading = getProperty("countryPending");
export const getAllCitiesError = getProperty("allCitiesError");
export const getAllCities = getProperty("allCities");
export const getCityError = getProperty("cityError");
export const getCountryError = getProperty("countryError");
export const getSelectedCity = getProperty("selectedCity");

export const isAnyLoading = createSelector(
  isAllCitiesLoading,
  isCountryLoading,
  isCityDetailLoading,
  (...loaders) => loaders.some(Boolean)
);

export const getSelectedCityData = createSelector(
  getPTI,
  ({ selectedCityData }) => transformPTIResponse(selectedCityData)
);

export const getCountryData = createSelector(
  getPTI,
  ({ countryData }) => transformPTIResponse(countryData)
);

export const getSelectedCityRank = createSelector(
  getSelectedCityData,
  data => {
    const datum = data && data.find(d => d.year === 2016);
    return datum
      ? {
          rank: datum.rank,
          total: datum.total
        }
      : {};
  }
);

export const getCityCountryChartData = createSelector(
  isAnyLoading,
  getSelectedCityData,
  getCountryData,
  (isLoading, city, country) =>
    isLoading ||
    (city || [])
      .map(c => ({
        ...c,
        series: c.datapoint
      }))
      .concat(
        (country || []).map(c => ({
          ...c,
          series: "United States"
        }))
      )
);
