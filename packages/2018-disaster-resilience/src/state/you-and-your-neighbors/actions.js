import fetchAdapter from '../fetch-adapter';
import actionEmitter from '../common-action-emitter';

export const API_START = 'YOU_AND_YOUR_NEIGHBORS/START';
export const API_SUCCESS = 'YOU_AND_YOUR_NEIGHBORS/SUCCESS';
export const API_FAILURE = 'YOU_AND_YOUR_NEIGHBORS/ERROR';

export const youAndYourNeighborsStart = actionEmitter(API_START);
export const youAndYourNeighborsSuccess = actionEmitter(API_SUCCESS);
export const youAndYourNeighborsFailure = actionEmitter(API_FAILURE);

export const fetchYouAndYourNeighbors = fetchAdapter(
  `sandbox/slides/poi/`,
  {
    start: youAndYourNeighborsStart,
    success: youAndYourNeighborsSuccess,
    failure: youAndYourNeighborsFailure,
  }
);
