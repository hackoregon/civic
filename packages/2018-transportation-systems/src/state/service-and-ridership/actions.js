import apiAdapter from '../api-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const API_START = 'SERVICE_AND_RIDERSHIP/START';
export const API_SUCCESS = 'SERVICE_AND_RIDERSHIP/SUCCESS';
export const API_ERROR = 'SERVICE_AND_RIDERSHIP/ERROR';

export const serviceAndRidershipStart = actionEmitter(API_START);
export const serviceAndRidershipSuccess = actionEmitter(API_SUCCESS);
export const serviceAndRidershipError = actionEmitter(API_ERROR);

const SERVICE_AND_RIDERSHIP_API =
  'http://service.civicpdx.org/transportation-systems/passenger-census/system/annual/total/?format=json';

export const fetchServiceAndRidership = apiAdapter(SERVICE_AND_RIDERSHIP_API, {
  start: serviceAndRidershipStart,
  success: serviceAndRidershipSuccess,
  error: serviceAndRidershipError,
});
