import apiReducer from "../api-adapter-reducer";
import { API_START, API_SUCCESS, API_ERROR, UPDATE_YEAR } from "./actions";

export const INITIAL_STATE = {
  pending: false,
  error: null,
  data: [],
  selectedYear: 2017
};

const apiReducers = apiReducer({
  INITIAL_STATE,
  API_START,
  API_SUCCESS,
  API_ERROR
});

const allReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_YEAR:
      return {
        ...state,
        selectedYear: action.selectedYear
      };
    default:
      return apiReducers(state, action);
  }
};

export default allReducers;
