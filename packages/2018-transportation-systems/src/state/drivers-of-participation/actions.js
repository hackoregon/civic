import apiAdapter from '../api-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const API_START = 'DRIVERS_OF_PARTICIPATION/START';
export const API_SUCCESS = 'DRIVERS_OF_PARTICIPATION/SUCCESS';
export const API_ERROR = 'DRIVERS_OF_PARTICIPATION/ERROR';

export const driversOfParticipationStart = actionEmitter(API_START);
export const driversOfParticipationSuccess = actionEmitter(API_SUCCESS);
export const driversOfParticipationError = actionEmitter(API_ERROR);

const DRIVERS_OF_PARTICIPATION_API = 'http://service.civicpdx.org/transportation-systems/passenger-census/system/annual/total/?format=json';

export const fetchDriversOfParticipation = apiAdapter(
  DRIVERS_OF_PARTICIPATION_API,
  {
    start: driversOfParticipationStart,
    success: driversOfParticipationSuccess,
    error: driversOfParticipationError,
  }
);
