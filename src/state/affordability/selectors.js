import { createSelector } from 'reselect';
import { propOr } from 'ramda';

// api : State -> Obj
export const getAffordabilityState = state => propOr({}, 'affordability')(state);

export const getAffordabilityRequest = createSelector(
  getAffordabilityState,
  affordability => affordability,
);

export const getAffordabilityData = createSelector(
  getAffordabilityRequest,
  ({ data }) => data,
);
