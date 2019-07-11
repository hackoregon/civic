import importAdapter from "../import-adapter";
import actionEmitter from "../import-adapter-action-emitter";

export const IMPORT_START = "DEMO_DATA/START";
export const IMPORT_SUCCESS = "DEMO_DATA/SUCCESS";

export const DemoDataStart = actionEmitter(IMPORT_START);
export const DemoDataSuccess = actionEmitter(IMPORT_SUCCESS);

const importPromise = import("../../assets/demo-data.json");

export const fetchDemoData = importAdapter(importPromise, {
  start: DemoDataStart,
  success: DemoDataSuccess
});
