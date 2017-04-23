import { createSelector } from 'reselect';
import { propOr } from 'ramda';

// api : State -> Obj
const getRentState = state => propOr({}, 'rent')(state);

export const getRentRequest = createSelector(
  getRentState,
  affordability => affordability,
);

export const getRentData = createSelector(
  getRentRequest,
  ({ data }) => data,
);
