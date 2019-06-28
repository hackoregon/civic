import importAdapter from "../import-adapter";
import actionEmitter from "../import-adapter-action-emitter";

export const IMPORT_START = "TEMPLATE_DATA/START";
export const IMPORT_SUCCESS = "TEMPLATE_DATA/SUCCESS";

export const TemplateDataStart = actionEmitter(IMPORT_START);
export const TemplateDataSuccess = actionEmitter(IMPORT_SUCCESS);

const importPromise = import("../../assets/template-data.json");

export const fetchTemplateData = importAdapter(importPromise, {
  start: TemplateDataStart,
  success: TemplateDataSuccess
});
