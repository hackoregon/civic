import { createSelector } from 'reselect';
import { and, update, adjust } from 'ramda';
import { isAffordabilityPending, getAffordabilityData } from './affordability/selectors';
import { isRentPending, getRentData } from './rent/selectors';
import { isNeighborhoodsPending, getNeighborhoodsData } from './neighborhoods/selectors';
import { getUserIncome } from './parameters/selectors';

/**
 * I believe less than 30 % of income is what is considered 'affordable'. Double check with
 * data people
 */
const isAffordable = (rent, income) => (rent * 12) < (0.3 * income);

/**
 * Wraps a function with a truthyness check on every argument. If any is not truthy,
 * returns null, otherwise evaluates function
 */
const wrapNullCheck = fn => (...args) => (args.reduce(and) ? fn(args) : null);

/**
 * Makes an array where the index is one less than the neighborhood id (so that it starts at 0)
 */
const orderNeighborhoods = neighborhoods => neighborhoods.reduce(
  (accum, neighborhood) => update(neighborhood.id - 1, neighborhood, accum),
  Array(neighborhoods.length),
);

/**
 * loops through affordability data, updating neighborhood object to include
 * affordableOther attribute
 */
const associateOtherAffordability = (neighborhoods, affordability) => affordability.reduce(
  (accum, { affordable, id }) => adjust(
    neighborhood => ({ ...neighborhood, affordableOther: affordable }),
    id - 1,
    accum,
  ),
  neighborhoods,
);

/**
 * loops through rent data, updating neighborhood object to include
 * affordableYou attribute calculated from rent and income
 */
const associateYourAffordability = (neighborhoods, rent, income) => rent.reduce(
  (accum, { rent_amt, id }) => adjust(
    neighborhood => ({ ...neighborhood, affordableYou: isAffordable(rent_amt, income) }),
    id - 1,
    accum,
  ),
  neighborhoods,
);

/**
 * Associates data from various apis to create full usable geojson. this can be made in to any
 * shape, whatever works best for the map
 */
const associateAll = ([neighborhoods, affordability, rent, income]) => ({
  type: 'FeatureCollection',
  features: associateYourAffordability(
    associateOtherAffordability(orderNeighborhoods(neighborhoods), affordability),
    rent,
    income,
  ),
});

/**
 * Selector that returns truthy if any api call is pending
 */
export const isAnyCallPending = createSelector(
  isAffordabilityPending,
  isRentPending,
  isNeighborhoodsPending,
  (affordability, rent, neighborhoods) => affordability || rent || neighborhoods,
);

export const getCombinedNeighborhoodsData = createSelector(
  getNeighborhoodsData,
  getAffordabilityData,
  getRentData,
  getUserIncome,
  wrapNullCheck(associateAll),
);
