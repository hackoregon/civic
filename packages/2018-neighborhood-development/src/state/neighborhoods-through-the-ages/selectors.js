import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getNeighborhoodAgesRequest = createSelector(
  rootState,
  ({ neighborhoodAges }) => neighborhoodAges,
);

export const getNeighborhoodAgesData = createSelector(
  getNeighborhoodAgesRequest,
  ({ data }) => data,
);

export const isNeighborhoodAgesPending = createSelector(
  getNeighborhoodAgesRequest,
  ({ pending }) => !!pending,
);

export const catchNeighborhoodAgesErrors = createSelector(
  getNeighborhoodAgesRequest,
  ({ error }) => error || error,
);
