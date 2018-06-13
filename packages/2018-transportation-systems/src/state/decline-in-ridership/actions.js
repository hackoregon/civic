import apiAdapter from '../api-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const API_START = 'DECLINE_IN_RIDERSHIP_OVER_TIME/START';
export const API_SUCCESS = 'DECLINE_IN_RIDERSHIP_OVER_TIME/SUCCESS';
export const API_ERROR = 'DECLINE_IN_RIDERSHIP_OVER_TIME/ERROR';

export const ridershipOverTimeStart = actionEmitter(API_START);
export const ridershipOverTimeSuccess = actionEmitter(API_SUCCESS);
export const ridershipOverTimeError = actionEmitter(API_ERROR);

const DECLINE_IN_RIDERSHIP_API = 'http://service.civicdssdpdx.org/transportation-systems/passenger-census/system/annual/total/?format=json';

export const fetchRidershipOverTime = apiAdapter(
  DECLINE_IN_RIDERSHIP_API,
  {
    start: ridershipOverTimeStart,
    success: ridershipOverTimeSuccess,
    error: ridershipOverTimeError,
  }
);
