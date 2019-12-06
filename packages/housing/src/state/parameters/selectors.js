import { createSelector } from "reselect";
import { prop, propOr, path } from "ramda";
import {
  DEMOGRAPHICS,
  HOUSING_TYPES,
  DEFAULT_INCOME,
  DEFAULT_NEIGHBORHOOD
} from "../../utils/data-constants";

export const rootState = state => (!!state && state.housing) || state;

export const getUserState = createSelector(
  rootState,
  state => path(["parameters", "user"], state)
);

export const getOtherState = createSelector(
  rootState,
  state => path(["parameters", "other"], state)
);

export const getNeighborhoodState = createSelector(
  rootState,
  state => path(["parameters", "neighborhood"], state)
);

export const getUserParameters = createSelector(
  getUserState,
  user => user
);

export const getOtherParameters = createSelector(
  getOtherState,
  other => other
);

export const getUserIncome = createSelector(
  getUserParameters,
  propOr(DEFAULT_INCOME, "income")
);

export const getUserUnitSize = createSelector(
  getUserParameters,
  propOr(HOUSING_TYPES[0], "unitSize")
);

export const getOtherDemographic = createSelector(
  getOtherParameters,
  propOr(DEMOGRAPHICS[0], "demographic")
);

export const getOtherUnitSize = createSelector(
  getOtherParameters,
  propOr(HOUSING_TYPES[0], "unitSize")
);

export const getNeighborhood = createSelector(
  getNeighborhoodState,
  neighborhood => neighborhood || DEFAULT_NEIGHBORHOOD
);
