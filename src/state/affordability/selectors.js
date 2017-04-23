import { createSelector } from 'reselect';
import { propOr } from 'ramda';

// api : State -> Obj
const getAffordableState = state => propOr({}, 'affordability')(state);

export const getAffordabilityRequest = createSelector(
  getAffordableState,
  affordability => affordability,
);

export const getAffordabilityData = createSelector(
  getAffordabilityRequest,
  ({ data }) => data,
);
