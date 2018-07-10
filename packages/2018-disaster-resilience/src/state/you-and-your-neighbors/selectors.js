import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getYouAndYourNeighborsRequest = createSelector(
  rootState,
  ({ youAndYourNeighbors }) => youAndYourNeighbors,
);

export const getYouAndYourNeighborsData = createSelector(
  getYouAndYourNeighborsRequest,
  ({ data }) => data,
);

export const isYouAndYourNeighborsPending = createSelector(
  getYouAndYourNeighborsRequest,
  ({ pending }) => !!pending,
);

export const catchYouAndYourNeighborsErrors = createSelector(
  getYouAndYourNeighborsRequest,
  ({ error }) => error || error,
);
