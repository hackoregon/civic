import axios from 'axios';

import importAdapter from '../import-adapter';
import actionEmitter from '../import-adapter-action-emitter';

export const IMPORT_START = 'DECLINE_IN_RIDERSHIP_OVER_TIME/START';
export const IMPORT_SUCCESS = 'DECLINE_IN_RIDERSHIP_OVER_TIME/SUCCESS';

export const ridershipOverTimeStart = actionEmitter(IMPORT_START);
export const ridershipOverTimeSuccess = actionEmitter(IMPORT_SUCCESS);

const DECLINE_IN_RIDERSHIP_API = 'http://service.civicpdx.org/transportation-systems/passenger-census/system/annual/total/?format=json';

const importPromise = axios.get(DECLINE_IN_RIDERSHIP_API);

export const fetchRidershipOverTime = importAdapter(
  importPromise,
  {
    start: ridershipOverTimeStart,
    success: ridershipOverTimeSuccess,
  }
);
