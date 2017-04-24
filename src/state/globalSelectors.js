import { createSelector } from 'reselect';
import { isAffordabilityPending } from './affordability/selectors';
import { isRentPending } from './rent/selectors';
import { isNeighborhoodsPending } from './neighborhoods/selectors';

/**
 * I believe less than 30 % of income is what is considered 'affordable'. Double check with
 * data people
 */
const isAffordable = (rent, income) => (rent * 12) < (0.3 * income);
/**
 * Selector that returns truthy if any api call is pending
 */
export const isAnyCallPending = createSelector(
  isAffordabilityPending,
  isRentPending,
  isNeighborhoodsPending,
  (affordability, rent, neighborhoods) => affordability || rent || neighborhoods,
);
