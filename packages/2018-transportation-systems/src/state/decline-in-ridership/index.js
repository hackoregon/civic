import apiReducer from '../api-adapter-reducer';
import { API_START, API_SUCCESS } from './actions';

const INITIAL_STATE = {
  pending: false,
  data: null,
};

export default apiReducer({ INITIAL_STATE, API_START, API_SUCCESS });
