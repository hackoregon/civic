import {
  START,
  SUCCESS,
  FAILURE,
  SET_CITY,
} from './actions';

const INITIAL_STATE = {
  pending: false,
  error: null,
  allCities: null,
  shortTermTrend: null,
  longTermTrend: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        pending: true,
        error: null,
        allCities: null,
        shortTermTrend: null,
        longTermTrend: null,
      };
    case SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        allCities: action.payload[0].results.geography,
        shortTermTrend: action.payload[1].results,
        longTermTrend: action.payload[2].results,
      };
    case FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
        allCities: null,
        shortTermTrend: null,
        longTermTrend: null,
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
