import apiAdapter from '../api-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const API_START = 'NEIGHBORHOODS_THROUGH_THE_AGES/START';
export const API_SUCCESS = 'NEIGHBORHOODS_THROUGH_THE_AGES/SUCCESS';
export const API_ERROR = 'NEIGHBORHOODS_THROUGH_THE_AGES/ERROR';

export const UPDATE_NEIGHBORHOOD =
  'NEIGHBORHOODS_THROUGH_THE_AGES/UPDATE_NEIGHBORHOOD';

export const neighborhoodAgesStart = actionEmitter(API_START);
export const neighborhoodAgesSuccess = actionEmitter(API_SUCCESS);
export const neighborhoodAgesError = actionEmitter(API_ERROR);

const NEIGHBORHOODS_THROUGH_THE_AGES_API =
  'http://service.civicpdx.org/neighborhood-development/api/neighborhood_ages?limit=1516&format=json';

export const fetchNeighborhoodAges = apiAdapter(
  NEIGHBORHOODS_THROUGH_THE_AGES_API,
  {
    start: neighborhoodAgesStart,
    success: neighborhoodAgesSuccess,
    error: neighborhoodAgesError,
  }
);

export const updateUserNeighborhood = neighborhood => {
  return {
    type: UPDATE_NEIGHBORHOOD,
    selectedNeighborhood: neighborhood,
  };
};
