import fetchAdapter from '../fetch-adapter';
import actionEmitter from '../common-action-emitter';

// Types
export const ALL_CITIES_START = 'AFFORDABLE_RENTAL_UNITS/ALL_CITIES_START';
export const ALL_CITIES_SUCCESS = 'AFFORDABLE_RENTAL_UNITS/ALL_CITIES_SUCCESS';
export const ALL_CITIES_FAILURE = 'AFFORDABLE_RENTAL_UNITS/ALL_CITIES_FAILURE';
export const CITY_START = 'AFFORDABLE_RENTAL_UNITS/CITY_START';
export const CITY_SUCCESS = 'AFFORDABLE_RENTAL_UNITS/CITY_SUCCESS';
export const CITY_FAILURE = 'AFFORDABLE_RENTAL_UNITS/CITY_FAILURE';
export const SET_CITY = 'AFFORDABLE_RENTAL_UNITS/SET_CITY';

// Simple actions
export const AllARUStart = actionEmitter(ALL_CITIES_START);
export const AllARUSuccess = actionEmitter(ALL_CITIES_SUCCESS);
export const AllARUFailure = actionEmitter(ALL_CITIES_FAILURE);

export const ARUStart = actionEmitter(CITY_START);
export const ARUSuccess = actionEmitter(CITY_SUCCESS);
export const ARUFailure = actionEmitter(CITY_FAILURE);

const listDatatype = 'change-in-share-of-units-by-real-rent-level-2005-2015-real-gross-rents-under-800';
const detailDatatype = 'change-in-share-of-units-by-real-rent-level-2005-2015-real-gross-rents';

// Thunk actions
export const fetchAllARUCities = fetchAdapter(
  `/api/harvardjchs/meta/?datatype=${listDatatype}&fields=geography`,
  {
    start: AllARUStart,
    success: AllARUSuccess,
    failure: AllARUFailure,
  }
);

export const fetchARUCity = fetchAdapter(
  `/api/harvardjchs/?datatype=${detailDatatype}`,
  {
    encodeParams: (url, city = 'portland') => `${url}&limit=20&datapoint=${city}`,
    start: ARUStart,
    success: ARUSuccess,
    failure: ARUFailure,
  }
);

export const setARUCity = (city = 'portland') => ({
  type: SET_CITY,
  selectedCity: city,
});

// http://service.civicpdx.org/housing-affordability/api/harvardjchs/?datatype=change-in-share-of-units-by-real-rent-level-2005-2015-real-gross-rents&datapoint=portland
// http://service.civicpdx.org/housing-affordability/api/harvardjchs?datatype=change-in-share-of-units-by-real-rent-level-2005-2015-real-gross-rents&datapoint=portland
