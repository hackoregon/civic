import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getFarmersMarketsOverTimeNewRequest = createSelector(
  rootState,
  ({ farmersMarketsOverTimeNewData }) => farmersMarketsOverTimeNewData
);

export const getFarmersMarketsOverTimeNewData = createSelector(
  getFarmersMarketsOverTimeNewRequest,
  ({ data }) => data && data.FarmersMarketsOverTimeNewData
);

export const isFarmersMarketsOverTimeNewDataPending = createSelector(
  getFarmersMarketsOverTimeNewRequest,
  ({ pending }) => !!pending
);
