import importAdapter from "../import-adapter";
import actionEmitter from "../import-adapter-action-emitter";

export const IMPORT_START = "TEMPLATE_DATA/START";
export const IMPORT_SUCCESS = "TEMPLATE_DATA/SUCCESS";

export const ElectionsDataStart = actionEmitter(IMPORT_START);
export const ElectionsDataSuccess = actionEmitter(IMPORT_SUCCESS);

const importPromise = import("../../assets/elections-data.json");

export const fetchElectionsData = importAdapter(importPromise, {
  start: ElectionsDataStart,
  success: ElectionsDataSuccess
});
