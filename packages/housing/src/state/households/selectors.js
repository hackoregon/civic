import { createSelector } from "reselect";
import { propOr } from "ramda";

// api : State -> Obj
export const getHouseholdsState = state => propOr({}, "households")(state);

export const getHouseholdsRequest = createSelector(
  getHouseholdsState,
  Households => Households
);

export const getHouseholdsData = createSelector(
  getHouseholdsRequest,
  ({ data }) => data
);

export const isHouseholdsPending = createSelector(
  getHouseholdsRequest,
  ({ pending }) => pending
);
