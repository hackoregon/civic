import fetchAdapter from '../fetch-adapter';
import actionEmitter from '../common-action-emitter';
import { spaceEncode } from '../utils';

// Types
export const ALL_CITIES_START = 'RENTAL_CRISIS/ALL_CITIES_START';
export const ALL_CITIES_SUCCESS = 'RENTAL_CRISIS/ALL_CITIES_SUCCESS';
export const ALL_CITIES_FAILURE = 'RENTAL_CRISIS/ALL_CITIES_FAILURE';
export const CITY_START = 'RENTAL_CRISIS/CITY_START';
export const CITY_SUCCESS = 'RENTAL_CRISIS/CITY_SUCCESS';
export const CITY_FAILURE = 'RENTAL_CRISIS/CITY_FAILURE';
export const SET_CITY = 'RENTAL_CRISIS/SET_CITY';

// Simple actions
export const AllRentalCrisisStart = actionEmitter(ALL_CITIES_START);
export const AllRentalCrisisSuccess = actionEmitter(ALL_CITIES_SUCCESS);
export const AllRentalCrisisFailure = actionEmitter(ALL_CITIES_FAILURE);

export const RentalCrisisStart = actionEmitter(CITY_START);
export const RentalCrisisSuccess = actionEmitter(CITY_SUCCESS);
export const RentalCrisisFailure = actionEmitter(CITY_FAILURE);

// Thunk actions
export const fetchAllRentalCrisisCities = fetchAdapter(
  '/api/rentalcrisis/meta/?fields=geography',
  {
    start: AllRentalCrisisStart,
    success: AllRentalCrisisSuccess,
    failure: AllRentalCrisisFailure,
  }
);

export const fetchRentalCrisisCity = fetchAdapter(
  '/api/rentalcrisis/',
  {
    encodeParams: (url, city = 'Multnomah County, Oregon') => {
      const [county, state] = city.split(', ');
      return `${url}?limit=20&county_name=${spaceEncode(county)}&state_name=${spaceEncode(state)}`;
    },
    start: RentalCrisisStart,
    success: RentalCrisisSuccess,
    failure: RentalCrisisFailure,
  }
);

export const setRentalCrisisCity = (city = 'Multnomah County, Oregon') => ({
  type: SET_CITY,
  selectedCity: city,
});
