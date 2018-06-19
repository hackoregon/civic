import {
  ALL_CITIES_START,
  ALL_CITIES_SUCCESS,
  ALL_CITIES_FAILURE,
  CITY_START,
  CITY_SUCCESS,
  CITY_FAILURE,
  COUNTRY_START,
  COUNTRY_SUCCESS,
  COUNTRY_FAILURE,
  SET_CITY,
} from './actions';

const INITIAL_STATE = {
  allCitiesPending: false,
  allCitiesError: null,
  cityPending: false,
  cityError: null,
  countryPending: false,
  countryError: null,
  countryData: null,
  selectedCity: null,
  allCities: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_CITIES_START:
      return {
        ...state,
        allCitiesPending: true,
        allCitiesError: null,
        allCities: null,
      };
    case ALL_CITIES_SUCCESS:
      return {
        ...state,
        allCitiesPending: false,
        allCitiesError: null,
        allCities: action.payload.results.geography,
      };
    case ALL_CITIES_FAILURE:
      return {
        ...state,
        allCitiesPending: false,
        allCitiesError: action.payload,
        allCities: null,
      };
    case CITY_START:
      return {
        ...state,
        cityPending: true,
        cityError: null,
        selectedCityData: null,
      };
    case CITY_SUCCESS:
      return {
        ...state,
        cityPending: false,
        cityError: null,
        selectedCityData: action.payload.results,
      };
    case CITY_FAILURE:
      return {
        ...state,
        cityPending: false,
        cityError: action.payload,
        selectedCityData: null,
      };
    case COUNTRY_START:
      return {
        ...state,
        countryPending: true,
        countryError: null,
        countryData: null,
      };
    case COUNTRY_SUCCESS:
      return {
        ...state,
        countryPending: false,
        countryError: null,
        countryData: action.payload.results,
      };
    case COUNTRY_FAILURE:
      return {
        ...state,
        countryPending: false,
        countryError: action.payload,
        countryData: null,
      };
    case SET_CITY:
      return {
        ...state,
        selectedCity: action.selectedCity,
      };
    default:
      return state;
  }
};

export default reducer;
