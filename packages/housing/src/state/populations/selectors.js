import { createSelector } from 'reselect';
import { propOr } from 'ramda';

// api : State -> Obj
export const getPopulationsState = state => propOr({}, 'populations')(state);

export const getPopulationsRequest = createSelector(
  getPopulationsState,
  Populations => Populations,
);

export const getPopulationsData = createSelector(
  getPopulationsRequest,
  ({ data }) => data,
);

export const isPopulationsPending = createSelector(
  getPopulationsRequest,
  ({ pending }) => pending,
);
