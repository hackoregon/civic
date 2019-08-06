import importAdapter from "../import-adapter";
import actionEmitter from "../import-adapter-action-emitter";

export const IMPORT_START = "TEMPLATE_DATA/START";
export const IMPORT_SUCCESS = "TEMPLATE_DATA/SUCCESS";

export const EducationDataStart = actionEmitter(IMPORT_START);
export const EducationDataSuccess = actionEmitter(IMPORT_SUCCESS);

const importPromise = import("../../assets/education-data.json");

export const fetchEducationData = importAdapter(importPromise, {
  start: EducationDataStart,
  success: EducationDataSuccess
});
