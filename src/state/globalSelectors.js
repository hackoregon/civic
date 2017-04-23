import { createSelector } from 'reselect';
import { isAffordabilityPending } from './affordability/selectors';
import { isRentPending } from './rent/selectors';
import { isNeighborhoodsPending } from './neighborhoods/selectors';

/**
 * Selector that returns truthy if any api call is pending
 */
export const isAnyCallPending = createSelector(
  isAffordabilityPending,
  isRentPending,
  isNeighborhoodsPending,
  (affordability, rent, neighborhoods) => affordability || rent || neighborhoods,
);
