import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getVolumeOfMoney = createSelector(
  rootState,
  ({ volumeOfMoney }) => volumeOfMoney,
);

const getProperty = key => createSelector(getVolumeOfMoney, state => state[key]);

const transformRaceResponse = data => data ? data
  .map(datum => ({
    ...datum,
    value: +datum.value,
    year: datum.date ? +datum.date.split('-')[0] : -1,
  })) : [];

export const isAllRacesLoading = getProperty('allRacesPending');
export const isRaceLoading = getProperty('RacePending');
export const getAllRacesError = getProperty('allRacesError');
export const getAllRaces = getProperty('allRaces');
export const getRaceError = getProperty('RaceError');
export const getSelectedRace = getProperty('selectedRace');

export const isAnyLoading = createSelector(
  isAllRacesLoading,
  isRaceLoading,
  (...loaders) => loaders.some(Boolean)
);

export const getSelectedRaceData = createSelector(
  getPTI,
  ({ selectedRaceData }) => transformRaceResponse(selectedRaceData)
);
