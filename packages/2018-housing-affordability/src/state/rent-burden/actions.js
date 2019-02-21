import fetchAdapter from '../fetch-adapter';
import actionEmitter from '../common-action-emitter';
import { slugify } from '../utils';

// Types
export const ALL_CITIES_START = 'RENT_BURDEN/ALL_CITIES_START';
export const ALL_CITIES_SUCCESS = 'RENT_BURDEN/ALL_CITIES_SUCCESS';
export const ALL_CITIES_FAILURE = 'RENT_BURDEN/ALL_CITIES_FAILURE';
export const CITY_START = 'RENT_BURDEN/CITY_START';
export const CITY_SUCCESS = 'RENT_BURDEN/CITY_SUCCESS';
export const CITY_FAILURE = 'RENT_BURDEN/CITY_FAILURE';
export const SET_CITY = 'RENT_BURDEN/SET_CITY';

// Simple actions
export const AllRentBurdenStart = actionEmitter(ALL_CITIES_START);
export const AllRentBurdenSuccess = actionEmitter(ALL_CITIES_SUCCESS);
export const AllRentBurdenFailure = actionEmitter(ALL_CITIES_FAILURE);

export const RentBurdenStart = actionEmitter(CITY_START);
export const RentBurdenSuccess = actionEmitter(CITY_SUCCESS);
export const RentBurdenFailure = actionEmitter(CITY_FAILURE);

// Thunk actions
export const fetchAllRentBurdenCities = fetchAdapter(
  '/api/harvardjchs/meta/?source=W-13&fields=geography',
  {
    start: AllRentBurdenStart,
    success: AllRentBurdenSuccess,
    failure: AllRentBurdenFailure,
  }
);

export const fetchRentBurdenCity = fetchAdapter(
  '/api/harvardjchs/?source=W-13&limit=12',
  {
    encodeParams: (url, city = 'Portland-Vancouver-Hillsboro, OR-WA') => {
      return `${url}&datapoint=${slugify(city)}`;
    },
    start: RentBurdenStart,
    success: RentBurdenSuccess,
    failure: RentBurdenFailure,
  }
);

export const setRentBurdenCity = (
  city = 'Portland-Vancouver-Hillsboro, OR-WA'
) => ({
  type: SET_CITY,
  selectedCity: city,
});
