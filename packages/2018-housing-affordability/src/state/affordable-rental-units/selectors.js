import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getARU = createSelector(
  rootState,
  ({ affordableRentalUnits }) => affordableRentalUnits,
);

const getProperty = key => createSelector(getARU, state => state[key]);

export const isAllCitiesLoading = getProperty('allCitiesPending');
export const isCityDetailLoading = getProperty('cityPending');
export const getAllCitiesError = getProperty('allCitiesError');
export const getAllCities = getProperty('allCities');
export const getCityError = getProperty('cityError');
export const getSelectedCity = getProperty('selectedCity');
export const getSelectedCityData = createSelector(
  getARU,
  ({ selectedCityData }) => selectedCityData && selectedCityData.map(datum => ({
    ...datum,
    value: +datum.value,
  }))
);


const lowKey = 'Change in Share of Units by Real Rent Level, 2005-2015, Real Gross Rents Under $800';
const highKey = 'Change in Share of Units by Real Rent Level, 2005-2015, Real Gross Rents $2,000 or More';

export const getSelectedCityLowRank = createSelector(
  getSelectedCityData,
  (data) => {
    const datum = data && data.find(d => d.datatype === lowKey);
    return datum ? {
      rank: datum.rank,
      total: datum.total,
    } : {};
  }
);

export const getSelectedCityHighRank = createSelector(
  getSelectedCityData,
  (data) => {
    const datum = data && data.find(d => d.datatype === highKey);
    return datum ? {
      rank: datum.rank,
      total: datum.total,
    } : {};
  }
);
