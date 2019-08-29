import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getFarmersMarketsOverTimeRequest = createSelector(
  rootState,
  ({ farmersMarketsOverTimeData }) => farmersMarketsOverTimeData
);

export const getFarmersMarketsOverTimeData = createSelector(
  getFarmersMarketsOverTimeRequest,
  ({ data }) => data && data.FarmersMarketsOverTimeData
);

export const isFarmersMarketsOverTimeDataPending = createSelector(
  getFarmersMarketsOverTimeRequest,
  ({ pending }) => !!pending
);
