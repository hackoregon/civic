import { actionEmitter } from "../utils";
import { actionTypes } from "./constants";
import { api } from "../api";

export const householdsStart = actionEmitter(actionTypes.CALL_START);
export const householdsFail = actionEmitter(actionTypes.CALL_FAIL);
export const householdsSuccess = actionEmitter(actionTypes.CALL_SUCCESS);

/* eslint-disable no-param-reassign */
export const normalizer = json =>
  json.reduce((households, datum) => {
    households[datum.NP_ID] = households[datum.NP_ID] || {};
    households[datum.NP_ID][datum.demographic] = datum.households;
    return households;
  }, []);
/* eslint-enable no-param-reassign */

export const fetchHouseholdsData = api("/hhtooltip", {
  start: householdsStart,
  success: householdsSuccess,
  fail: householdsFail,
  normalizer,
  buildParams: () => {}
});
