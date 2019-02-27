import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getRentalCrisis = createSelector(
  rootState,
  ({ rentalCrisis }) => rentalCrisis,
);

const getProperty = key => createSelector(getRentalCrisis, state => state[key]);

export const isAllCitiesLoading = getProperty('allCitiesPending');
export const isCityLoading = getProperty('cityPending');
export const getAllCitiesError = getProperty('allCitiesError');
export const getAllCities = getProperty('allCities');
export const getCityError = getProperty('cityError');
export const getSelectedCity = getProperty('selectedCity');

// export const getSelectedCityData = createSelector(
//   getRentalCrisis,
//   () => []
// );
export const getSelectedCityData = createSelector(
  getRentalCrisis,
  ({ selectedCityData }) => selectedCityData && selectedCityData.map(datum => ({
    ...datum,
    eli_renters: +datum.eli_renters,
    aaa_units: +datum.aaa_units,
  })).sort((a, b) => a.sortOrder - b.sortOrder)
);

export const getSelectedCityRank = createSelector(
  getSelectedCityData,
  (data) => {
    const datum = data && data.find(d => d.year === 2014);
    return datum ? {
      rank: datum.rank,
      total: datum.total,
    } : {};
  }
);
