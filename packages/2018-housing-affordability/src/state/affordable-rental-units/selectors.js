import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getARU = createSelector(
  rootState,
  ({ affordableRentalUnits }) => affordableRentalUnits
);

const allTypes = [
  '$2,400 or more',
  '$2,200 to $2,399',
  '$2,000 to $2,199',
  '$2,000 or More',
  '$1,800 to $1,999',
  '$1,600 to $1,799',
  '$1,400 to $1,599',
  '$1,200 to $1,399',
  '$1,000 to $1,199',
  '$800 to $999',
  'Under $800',
  '$600 to $799',
  '$400 to $599',
  'Less than $400',
];

const chartExclusions = ['$2,000 or More', 'Under $800'];

const getProperty = key =>
  createSelector(
    getARU,
    state => state[key]
  );
const orderFor = type => allTypes.indexOf(allTypes.find(t => type.endsWith(t)));

export const isAllCitiesLoading = getProperty('allCitiesPending');
export const isCityDetailLoading = getProperty('cityPending');
export const getAllCitiesError = getProperty('allCitiesError');
export const getAllCities = getProperty('allCities');
export const getCityError = getProperty('cityError');
export const getSelectedCity = getProperty('selectedCity');
export const getSelectedCityData = createSelector(
  getARU,
  ({ selectedCityData }) =>
    selectedCityData &&
    selectedCityData
      .map(datum => ({
        ...datum,
        value: +datum.value,
        datatype: allTypes.find(t => datum.datatype.endsWith(t)),
        sortOrder: orderFor(datum.datatype),
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder)
);

export const getChartData = createSelector(
  getSelectedCityData,
  data =>
    data && data.filter(datum => !chartExclusions.includes(datum.datatype))
);

const lowKey = 'Under $800';
const highKey = '$2,000 or More';

export const getSelectedCityLowRank = createSelector(
  getSelectedCityData,
  data => {
    const datum = data && data.find(d => d.datatype === lowKey);
    return datum
      ? {
          rank: datum.rank,
          total: datum.total,
        }
      : {};
  }
);

export const getSelectedCityHighRank = createSelector(
  getSelectedCityData,
  data => {
    const datum = data && data.find(d => d.datatype === highKey);
    return datum
      ? {
          rank: datum.rank,
          total: datum.total,
        }
      : {};
  }
);
