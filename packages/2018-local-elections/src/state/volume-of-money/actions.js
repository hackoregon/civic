import fetchAdapter from '../fetch-adapter';
import actionEmitter from '../common-action-emitter';

// Types
export const ALL_RACES_START = 'PRICE_TO_INCOME/ALL_RACES_START';
export const ALL_RACES_SUCCESS = 'PRICE_TO_INCOME/ALL_RACES_SUCCESS';
export const ALL_RACES_FAILURE = 'PRICE_TO_INCOME/ALL_RACES_FAILURE';
export const RACE_START = 'PRICE_TO_INCOME/RACE_START';
export const RACE_SUCCESS = 'PRICE_TO_INCOME/RACE_SUCCESS';
export const RACE_FAILURE = 'PRICE_TO_INCOME/RACE_FAILURE';
export const SET_RACE = 'PRICE_TO_INCOME/SET_RACE';

// Simple actions
export const AllRacesStart = actionEmitter(ALL_RACES_START);
export const AllRacesSuccess = actionEmitter(ALL_RACES_SUCCESS);
export const AllRacesFailure = actionEmitter(ALL_RACES_FAILURE);

export const RaceStart = actionEmitter(RACE_START);
export const RaceSuccess = actionEmitter(RACE_SUCCESS);
export const RaceFailure = actionEmitter(RACE_FAILURE);

// Thunk actions
export const fetchAllRaces = fetchAdapter(
  `/totalcontributionsrawmonthtotal/?limit=300`,
  {
    start: AllRacesStart,
    success: AllRacesSuccess,
    failure: AllRacesFailure,
  }
);

export const fetchRace = fetchAdapter(`/totalcontributionsrawmonthracetype/`, {
  encodeParams: (url, race) => `${url}?limit=300&race_type=${race}`,
  start: RaceStart,
  success: RaceSuccess,
  failure: RaceFailure,
});

export const setRace = race => ({
  type: SET_RACE,
  selectedRace: race,
});
