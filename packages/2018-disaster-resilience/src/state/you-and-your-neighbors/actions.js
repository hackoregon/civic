import fetchAdapter from '../fetch-adapter';
import actionEmitter from '../common-action-emitter';
import { slugify } from '../utils';

export const API_START = 'YOU_AND_YOUR_NEIGHBORS/START';
export const API_SUCCESS = 'YOU_AND_YOUR_NEIGHBORS/SUCCESS';
export const API_FAILURE = 'YOU_AND_YOUR_NEIGHBORS/ERROR';
export const COORDS_START = 'YOU_AND_YOUR_NEIGHBORS/COORDS_START';
export const COORDS_SUCCESS = 'YOU_AND_YOUR_NEIGHBORS/COORDS_SUCCESS';
export const COORDS_FAILURE = 'YOU_AND_YOUR_NEIGHBORS/COORDS_ERROR';
export const SET_COORDS = 'YOU_AND_YOUR_NEIGHBORS/SET_COORDS';

export const youAndYourNeighborsStart = actionEmitter(API_START);
export const youAndYourNeighborsSuccess = actionEmitter(API_SUCCESS);
export const youAndYourNeighborsFailure = actionEmitter(API_FAILURE);
export const youAndYourNeighborsCoordsStart = actionEmitter(COORDS_START);
export const youAndYourNeighborsCoordsSuccess = actionEmitter(COORDS_SUCCESS);
export const youAndYourNeighborsCoordsFailure = actionEmitter(COORDS_FAILURE);
export const youAndYourNeighborsSetCoords = actionEmitter(SET_COORDS);

export const fetchYouAndYourNeighbors = fetchAdapter(
  `sandbox/slides/poi/`,
  {
    start: youAndYourNeighborsStart,
    success: youAndYourNeighborsSuccess,
    failure: youAndYourNeighborsFailure,
  }
);

export const fetchYouAndYourNeighborsCoords = fetchAdapter(
  `api/DisasterNeighborhoodGrid/`,
  {
    encodeParams: (url, coords) => `${url}?lat=${slugify(coords.latitude.toPrecision(3).toString())}&long=${slugify(coords.longitude.toPrecision(3).toString())}`,
    start: youAndYourNeighborsCoordsStart,
    success: youAndYourNeighborsCoordsSuccess,
    failure: youAndYourNeighborsCoordsFailure,
  }
);
