import { createSelector } from 'reselect';
import { propOr } from 'ramda';

// api : State -> Obj
export const getRentState = state => propOr({}, 'rent')(state);

export const getRentRequest = createSelector(
  getRentState,
  affordability => affordability,
);

export const getRentData = createSelector(
  getRentRequest,
  ({ data }) => data,
);

export const isRentPending = createSelector(
  getRentRequest,
  ({ pending }) => pending,
);
