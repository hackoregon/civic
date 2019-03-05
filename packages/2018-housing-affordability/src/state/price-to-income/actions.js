import fetchAdapter from '../fetch-adapter';
import actionEmitter from '../common-action-emitter';
import { slugify } from '../utils';

// Types
export const ALL_CITIES_START = 'PRICE_TO_INCOME/ALL_CITIES_START';
export const ALL_CITIES_SUCCESS = 'PRICE_TO_INCOME/ALL_CITIES_SUCCESS';
export const ALL_CITIES_FAILURE = 'PRICE_TO_INCOME/ALL_CITIES_FAILURE';
export const CITY_START = 'PRICE_TO_INCOME/CITY_START';
export const CITY_SUCCESS = 'PRICE_TO_INCOME/CITY_SUCCESS';
export const CITY_FAILURE = 'PRICE_TO_INCOME/CITY_FAILURE';
export const COUNTRY_START = 'PRICE_TO_INCOME/COUNTRY_START';
export const COUNTRY_SUCCESS = 'PRICE_TO_INCOME/COUNTRY_SUCCESS';
export const COUNTRY_FAILURE = 'PRICE_TO_INCOME/COUNTRY_FAILURE';
export const SET_CITY = 'PRICE_TO_INCOME/SET_CITY';

// Simple actions
export const AllPTIStart = actionEmitter(ALL_CITIES_START);
export const AllPTISuccess = actionEmitter(ALL_CITIES_SUCCESS);
export const AllPTIFailure = actionEmitter(ALL_CITIES_FAILURE);

export const PTIStart = actionEmitter(CITY_START);
export const PTISuccess = actionEmitter(CITY_SUCCESS);
export const PTIFailure = actionEmitter(CITY_FAILURE);

export const CountryPTIStart = actionEmitter(COUNTRY_START);
export const CountryPTISuccess = actionEmitter(COUNTRY_SUCCESS);
export const CountryPTIFailure = actionEmitter(COUNTRY_FAILURE);

const datatype = 'median-home-price-to-median-income-ratio';

// Thunk actions
export const fetchAllPTICities = fetchAdapter(
  `/api/harvardjchs/meta/?datatype=${datatype}&fields=geography`,
  {
    start: AllPTIStart,
    success: AllPTISuccess,
    failure: AllPTIFailure,
  }
);

export const fetchPTICity = fetchAdapter(
  `/api/harvardjchs/?datatype=${datatype}`,
  {
    encodeParams: (url, city = 'Portland-Vancouver-Hillsboro, OR-WA') =>
      `${url}&limit=50&datapoint=${slugify(city)}`,
    start: PTIStart,
    success: PTISuccess,
    failure: PTIFailure,
  }
);

export const fetchPTICountry = fetchAdapter(
  `/api/harvardjchs/?datatype=${datatype}&limit=50&datapoint=united-states`,
  {
    start: CountryPTIStart,
    success: CountryPTISuccess,
    failure: CountryPTIFailure,
  }
);

export const setPTICity = (city = 'Portland-Vancouver-Hillsboro, OR-WA') => ({
  type: SET_CITY,
  selectedCity: city,
});
