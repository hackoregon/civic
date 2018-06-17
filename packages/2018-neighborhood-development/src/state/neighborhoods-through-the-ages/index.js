import apiReducer from '../api-adapter-reducer';
import { API_START, API_SUCCESS, API_ERROR, UPDATE_NEIGHBORHOOD } from './actions';

const INITIAL_STATE = {
  pending: false,
  error: null,
  data: null,
  selectedNeighborhood: null,
};

const apiReducers = apiReducer({ INITIAL_STATE, API_START, API_SUCCESS, API_ERROR });

const allReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_NEIGHBORHOOD:
      return {
        ...state,
        selectedNeighborhood: action.selectedNeighborhood,
      };
    default:
      return apiReducers(state, action);
  }
};

export default allReducers;
