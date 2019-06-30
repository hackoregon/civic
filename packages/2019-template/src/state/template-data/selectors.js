import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getTemplateRequest = createSelector(
  rootState,
  ({ templateData }) => templateData
);

export const getTemplateData = createSelector(
  getTemplateRequest,
  ({ data }) => data && data.TemplateData
);

export const isTemplateDataPending = createSelector(
  getTemplateRequest,
  ({ pending }) => !!pending
);

// export const getFarmersMarketsOverTimeRequest = createSelector(
//   rootState,
//   ({ farmersMarketsOverTime }) => farmersMarketsOverTime
// );

// export const getFarmersMarketsOverTimeData = createSelector(
//   getFarmersMarketsOverTimeRequest,
//   ({ data }) => data && data.FarmersMarketsByYear
// );

// export const isFarmersMarketsOverTimePending = createSelector(
//   getFarmersMarketsOverTimeRequest,
//   ({ pending }) => !!pending
// );
