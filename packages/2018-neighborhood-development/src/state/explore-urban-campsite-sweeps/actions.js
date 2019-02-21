import apiAdapter from '../api-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const API_START = 'EXPLORE_URBAN_CAMPSITE_SWEEPS/START';
export const API_SUCCESS = 'EXPLORE_URBAN_CAMPSITE_SWEEPS/SUCCESS';
export const API_ERROR = 'EXPLORE_URBAN_CAMPSITE_SWEEPS/ERROR';

export const INCREMENT_TIMER = 'EXPLORE_URBAN_CAMPSITE_SWEEPS/INCREMENT_TIMER';

export const exploreUrbanCampsiteSweepsStart = actionEmitter(API_START);
export const exploreUrbanCampsiteSweepsSuccess = actionEmitter(API_SUCCESS);
export const exploreUrbanCampsiteSweepsError = actionEmitter(API_ERROR);

const EXPLORE_URBAN_CAMPSITE_SWEEPS_API =
  'http://service.civicpdx.org/neighborhood-development/api/camp_sweeps?limit=3000&format=json';

export const fetchCampsiteSweeps = apiAdapter(
  EXPLORE_URBAN_CAMPSITE_SWEEPS_API,
  {
    start: exploreUrbanCampsiteSweepsStart,
    success: exploreUrbanCampsiteSweepsSuccess,
    error: exploreUrbanCampsiteSweepsError,
  }
);

export const incrementTimer = amount => {
  return {
    type: INCREMENT_TIMER,
    payload: amount,
  };
};
