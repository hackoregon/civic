import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getFarmersMarketsOverTimeRequest = createSelector(
  rootState,
  ({ farmersMarketsOverTime }) => farmersMarketsOverTime
);

export const getFarmersMarketsOverTimeData = createSelector(
  getFarmersMarketsOverTimeRequest,
  ({ data }) => data && data.FarmersMarketsByYear
);

export const isFarmersMarketsOverTimePending = createSelector(
  getFarmersMarketsOverTimeRequest,
  ({ pending }) => !!pending
);
