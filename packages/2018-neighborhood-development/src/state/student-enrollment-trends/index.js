import apiReducer from '../api-adapter-reducer';
import { API_START, API_SUCCESS, API_ERROR, UPDATE_SCHOOL } from './actions';

const INITIAL_STATE = {
  pending: false,
  error: null,
  schools: null,
  selectedSchool: null,
};

export default apiReducer({ INITIAL_STATE, API_START, API_SUCCESS, API_ERROR });

