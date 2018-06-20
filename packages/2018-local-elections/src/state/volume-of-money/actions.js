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

const datatype = 'median-home-price-to-median-income-ratio';

// Thunk actions
export const fetchAllRaces = fetchAdapter(
  `/api/harvardjchs/meta/?datatype=${datatype}&fields=geography`,
  {
    start: AllRacesStart,
    success: AllRacesSuccess,
    failure: AllRacesFailure,
  }
);

// Adapted from the django implementation:
// https://docs.djangoproject.com/en/2.0/_modules/django/utils/text/#slugify
const slugify = str => str.replace(/[^\w\s-]/g, '').trim().toLowerCase().replace(/[-\s]+/g, '-');

export const fetchRace = fetchAdapter(
  `/api/harvardjchs/?datatype=${datatype}`,
  {
    encodeParams: (url, city = 'Portland-Vancouver-Hillsboro, OR-WA') => `${url}&limit=50&datapoint=${slugify(city)}`,
    start: RaceStart,
    success: RaceSuccess,
    failure: RaceFailure,
  }
);
