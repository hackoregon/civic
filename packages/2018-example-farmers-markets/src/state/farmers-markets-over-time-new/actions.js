import importAdapter from "../import-adapter";
import actionEmitter from "../import-adapter-action-emitter";

export const IMPORT_START = "FARMERS_MARKETS_OVER_TIME_NEW_DATA/START";
export const IMPORT_SUCCESS = "FARMERS_MARKETS_OVER_TIME_NEW_DATA/SUCCESS";

export const FarmersMarketsOverTimeNewDataStart = actionEmitter(IMPORT_START);
export const FarmersMarketsOverTimeNewDataSuccess = actionEmitter(
  IMPORT_SUCCESS
);

const importPromise = import("../../assets/farmers-markets-over-time-new.json");

export const fetchFarmersMarketsOverTimeNewData = importAdapter(importPromise, {
  start: FarmersMarketsOverTimeNewDataStart,
  success: FarmersMarketsOverTimeNewDataSuccess
});
