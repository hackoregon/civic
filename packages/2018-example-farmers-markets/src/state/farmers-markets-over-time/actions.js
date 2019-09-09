import importAdapter from "../import-adapter";
import actionEmitter from "../import-adapter-action-emitter";

export const IMPORT_START = "FARMERS_MARKETS_OVER_TIME_DATA/START";
export const IMPORT_SUCCESS = "FARMERS_MARKETS_OVER_TIME_DATA/SUCCESS";

export const FarmersMarketsOverTimeDataStart = actionEmitter(IMPORT_START);
export const FarmersMarketsOverTimeDataSuccess = actionEmitter(IMPORT_SUCCESS);

const importPromise = import("../../assets/farmers-markets-over-time.json");

export const fetchFarmersMarketsOverTimeData = importAdapter(importPromise, {
  start: FarmersMarketsOverTimeDataStart,
  success: FarmersMarketsOverTimeDataSuccess
});
