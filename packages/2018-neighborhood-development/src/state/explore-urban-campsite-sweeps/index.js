import apiReducer from '../api-adapter-reducer';
import { API_START, API_SUCCESS, API_ERROR, INCREMENT_TIMER } from './actions';

const INITIAL_STATE = {
  pending: false,
  error: null,
  data: null,
  dateRange: 0,
};

const apiReducers = apiReducer({ INITIAL_STATE, API_START, API_SUCCESS, API_ERROR });

const allReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT_TIMER:
      return {
        ...state,
        dateRange: action.payload,
      };
    default:
      return apiReducers(state, action);
  }
};

export default allReducers;

