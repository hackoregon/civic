import fetchManyAdapter from '../fetch-many-adapter';
import actionEmitter from '../common-action-emitter';

// Types
export const START = 'PNW_SURGE/START';
export const SUCCESS = 'PNW_SURGE/SUCCESS';
export const FAILURE = 'PNW_SURGE/FAILURE';
export const SET_CITY = 'PNW_SURGE/SET_CITY';

// Simple actions
export const AllStart = actionEmitter(START);
export const AllSuccess = actionEmitter(SUCCESS);
export const AllFailure = actionEmitter(FAILURE);

const datatype = 'real-percent-change-in-home-prices-from-dec-2015dec-2016';
const yAxisDatatype = 'real-percent-change-in-home-prices-from-jan-2000dec-2016';

// Order of the URLs here is important! It impacts the reducer.
export const fetchAllPNWSurgeData = fetchManyAdapter(
  [
    `/api/harvardjchs/meta/?datatype=${datatype}&fields=geography`,
    `/api/harvardjchs/?datatype=${datatype}&limit=120`,
    `/api/harvardjchs/?datatype=${yAxisDatatype}&limit=120`,
  ],
  {
    start: AllStart,
    success: AllSuccess,
    failure: AllFailure,
  }
);

export const setPNWSurgeCity = (city = 'Portland-Vancouver-Hillsboro, OR-WA') => ({
  type: SET_CITY,
  selectedCity: city,
});
