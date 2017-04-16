import { createSelector } from 'reselect';
import { propOr } from 'ramda';

// api : State -> Obj
export const getApiState = state => propOr({}, 'api')(state);

export const getNeighborhoodRequest = createSelector(
  getApiState,
  propOr({}, 'neighborhood'),
);
