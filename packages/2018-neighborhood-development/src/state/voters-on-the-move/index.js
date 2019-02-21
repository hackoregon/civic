import {
  API_START,
  API_SUCCESS,
  API_ERROR,
  AWAY_API_START,
  AWAY_API_SUCCESS,
  AWAY_API_ERROR,
} from './actions';

const INITIAL_STATE = {
  pending: false,
  error: null,
  data: null,
  awayPending: false,
  awayError: null,
  awayData: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_START:
      return {
        ...state,
        pending: true,
        error: null,
        data: null,
      };
    case API_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        data: action.payload,
      };
    case API_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload,
        data: null,
      };
    case AWAY_API_START:
      return {
        ...state,
        awayPending: true,
        awayError: null,
        awayData: null,
      };
    case AWAY_API_SUCCESS:
      return {
        ...state,
        awayPending: false,
        awayError: null,
        awayData: action.payload,
      };
    case AWAY_API_ERROR:
      return {
        ...state,
        awayPending: false,
        awayError: action.payload,
        awayData: null,
      };
    default:
      return state;
  }
};

export default reducer;
