import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getVolumeOfMoney = createSelector(
  rootState,
  ({ volumeOfMoney }) => volumeOfMoney
);

const getProperty = key =>
  createSelector(
    getVolumeOfMoney,
    state => state[key]
  );

const transformRaceResponse = data =>
  data
    ? data.map(datum => ({
        date: parseFloat(datum.year) + parseFloat(datum.month) / 12,
        sum: parseFloat(datum.sum)
      }))
    : [];

// const consolidate = (data, size) => data ?
//   chunk(data, size).map(arr => arr.reduce(combineSum))
//   : null;

export const isAllRacesLoading = getProperty("allRacesPending");
export const isRaceLoading = getProperty("racePending");
export const getAllRacesError = getProperty("allRacesError");
export const getAllRaces = getProperty("allRaces");
export const getRaceError = getProperty("raceError");
export const getSelectedRace = getProperty("selectedRace");

export const isAnyLoading = createSelector(
  isAllRacesLoading,
  isRaceLoading,
  (...loaders) => loaders.some(Boolean)
);

export const getSelectedRaceData = createSelector(
  getVolumeOfMoney,
  ({ selectedRaceData }) =>
    selectedRaceData && transformRaceResponse(selectedRaceData)
);

export const getAllRacesData = createSelector(
  getVolumeOfMoney,
  ({ allRaces }) => allRaces && transformRaceResponse(allRaces)
);
