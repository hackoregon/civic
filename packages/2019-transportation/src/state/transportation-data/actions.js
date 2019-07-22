import importAdapter from "../import-adapter";
import actionEmitter from "../import-adapter-action-emitter";

export const IMPORT_START = "TEMPLATE_DATA/START";
export const IMPORT_SUCCESS = "TEMPLATE_DATA/SUCCESS";

export const TransportationDataStart = actionEmitter(IMPORT_START);
export const TransportationDataSuccess = actionEmitter(IMPORT_SUCCESS);

const importPromise = import("../../assets/transportation-data.json");

export const fetchTransportationData = importAdapter(importPromise, {
  start: TransportationDataStart,
  success: TransportationDataSuccess
});
