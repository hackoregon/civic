import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getRentBurden = createSelector(
  rootState,
  ({ rentBurden }) => rentBurden,
);

const getProperty = key => createSelector(getRentBurden, state => state[key]);

export const isAllCitiesLoading = getProperty('allCitiesPending');
export const isCityLoading = getProperty('cityPending');
export const getAllCitiesError = getProperty('allCitiesError');
export const getAllCities = getProperty('allCities');
export const getCityError = getProperty('cityError');
export const getSelectedCity = getProperty('selectedCity');

export const getSelectedCityData = createSelector(
  getRentBurden,
  ({ selectedCityData }) => selectedCityData && selectedCityData.map(datum => ({
    ...datum,
  }))
);

const rankKey = 'Severely Burdened Renters, Share of All Households';

export const getSelectedCityRank = createSelector(
  getSelectedCityData,
  (data) => {
    const datum = data && data.find(d => d.datatype === rankKey);
    return datum ? {
      rank: datum.rank,
      total: datum.total,
    } : {};
  }
);
