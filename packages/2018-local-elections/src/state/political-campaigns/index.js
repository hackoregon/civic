import { combineReducers } from 'redux';
import apiReducer from '../api-adapter-reducer';
import {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  SET_CAMPAIGN,
  SET_ELECTION_CYCLE,
} from './actions';

const INITIAL_REQUEST_STATE = {};

const INITIAL_META_STATE = {
  campaign: {},
  campaignCycle: {},
};

// The state should look something like this. Data stores the data/status for
// the various charts, as well as the controls. Meta contains the state of the
// controls.
//
// {
//   meta: {
//     campaign: {}
//     electinCycle: {},
//   },
//   data: {
//     contributorBreakdown: {
//       pending: false,
//       data: {},
//       error: null,
//     },
//     campaigns: {},
//     electionCycles: {},
//   },
// };

const metaReducer = (state = INITIAL_META_STATE, action) => {
  switch (action.type) {
    case SET_CAMPAIGN:
      return {
        ...state,
        campaign: action.payload.campaign,
      };
    case SET_ELECTION_CYCLE:
      return {
        ...state,
        electionCycle: action.payload.electionCycle,
      };
    default:
      return state;
  }
};

export default combineReducers({
  data: apiReducer({
    INITIAL_STATE: INITIAL_REQUEST_STATE,
    API_START: REQUEST_START,
    API_SUCCESS: REQUEST_SUCCESS,
    API_ERROR: REQUEST_ERROR,
  }),
  meta: metaReducer,
});
