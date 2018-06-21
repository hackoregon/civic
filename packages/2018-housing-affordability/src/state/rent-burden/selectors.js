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

export const getChartData = createSelector(
  getSelectedCityData,
  (data) => {
    if (!data) return;

    const _ = { value: 0 };

    const severeBurden = +(data.find(d => d.datatype === 'Severely Burdened Renters, Share of All Households') || _).value;
    const moderateBurden = +(data.find(d => d.datatype === 'Moderately Burdened Renters, Share of All Households') || _).value;
    const noBurden = 100 - severeBurden - moderateBurden;

    const ret = [
      { label: 'Severe Burden', value: severeBurden },
      { label: 'Moderate Burden', value: moderateBurden },
      { label: 'No Burden', value: noBurden },
    ];
    console.log(ret);
    return ret;
  }
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
