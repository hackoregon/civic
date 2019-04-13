import apiReducer from "../api-adapter-reducer";
import { API_START, API_SUCCESS, API_ERROR } from "./actions";

const INITIAL_STATE = {
  pending: false,
  error: null,
  data: null
};

const apiReducers = apiReducer({
  INITIAL_STATE,
  API_START,
  API_SUCCESS,
  API_ERROR
});

const allReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return apiReducers(state, action);
  }
};

export default allReducers;
