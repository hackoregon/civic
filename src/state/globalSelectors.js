import { createSelector } from 'reselect';
import { update, adjust, is, all } from 'ramda';
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
 * Checks if all arguments are arrays
 */
const allArrays = (...args) => all(arg => is(Array, arg), args);

/**
 * Associates data from various apis to create full usable geojson. this can be made in to any
 * shape, whatever works best for the map. Returns null unless all data sources are arrays
 */
const associateAll = (neighborhoods, affordability, rent, income) => {
  if (allArrays(neighborhoods, affordability, rent)) {
    return {
      type: 'FeatureCollection',
      features: associateYourAffordability(
        associateOtherAffordability(orderNeighborhoods(neighborhoods), affordability),
        rent,
        income,
      ),
    };
  }
  return null;
};

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
  associateAll,
);
