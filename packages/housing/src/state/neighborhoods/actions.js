import { actionEmitter } from "../utils";
import { actionTypes, GEOJSON_STATIC_LOCATION } from "./constants";
import { get } from "../api";

export const neighborhoodsStart = actionEmitter(actionTypes.CALL_START);
export const neighborhoodsFail = actionEmitter(actionTypes.CALL_FAIL);
export const neighborhoodsSuccess = actionEmitter(actionTypes.CALL_SUCCESS);

export const fetchNeighborhoods = get(GEOJSON_STATIC_LOCATION, {
  start: neighborhoodsStart,
  success: neighborhoodsSuccess,
  fail: neighborhoodsFail,
  normalizer: ({ features }) => features,
  buildParams: () => {}
});
