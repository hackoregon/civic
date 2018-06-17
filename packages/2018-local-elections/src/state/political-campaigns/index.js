import { combineReducers } from 'redux';
import apiReducer from '../api-adapter-reducer';
import {
  CONTRIBUTOR_BREAKDOWN_START,
  CONTRUBUTOR_BREAKDOWN_SUCCESS,
  CONTRIBUTOR_BREAKDOWN_ERROR,
  SET_CAMPAIGN,
} from './actions';

const INITIAL_REQUEST_STATE = {
  pending: false,
  error: null,
  data: null,
};

const INITIAL_META_STATE = {
  campaign: {},
};

const filterReducer = (state = INITIAL_META_STATE, action) => {
  switch (action.type) {
    case SET_CAMPAIGN:
      return {
        ...state,
        campaign: action.payload.campaign,
      };
    default:
      return state;
  }
};

export default combineReducers({
  requests: apiReducer({
    INITIAL_STATE: INITIAL_REQUEST_STATE,
    API_START: CONTRIBUTOR_BREAKDOWN_START,
    API_SUCCESS: CONTRUBUTOR_BREAKDOWN_SUCCESS,
    API_ERROR: CONTRIBUTOR_BREAKDOWN_ERROR,
  }),
  meta: filterReducer,
});
