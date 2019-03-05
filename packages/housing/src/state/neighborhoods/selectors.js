import { createSelector } from 'reselect';
import { propOr } from 'ramda';

// api : State -> Obj
export const getNeighborhoodsState = state =>
  propOr({}, 'neighborhoods')(state);

export const getNeighborhoodsRequest = createSelector(
  getNeighborhoodsState,
  neighborhoods => neighborhoods
);

export const getNeighborhoodsData = createSelector(
  getNeighborhoodsRequest,
  ({ data }) => data
);

export const isNeighborhoodsPending = createSelector(
  getNeighborhoodsRequest,
  ({ pending }) => pending
);
