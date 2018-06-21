import fetchAdapter from '../fetch-adapter';
import actionEmitter from '../common-action-emitter';

export const API_START = 'PROACTIVE_PLANNING/START';
export const API_SUCCESS = 'PROACTIVE_PLANNING/SUCCESS';
export const API_FAILURE = 'PROACTIVE_PLANNING/ERROR';

export const proactivePlanningStart = actionEmitter(API_START);
export const proactivePlanningSuccess = actionEmitter(API_SUCCESS);
export const proactivePlanningFailure = actionEmitter(API_FAILURE);

export const fetchProactivePlanning = fetchAdapter(
  `api/DisasterNeighborhoodView/?limit=150`,
  {
    start: proactivePlanningStart,
    success: proactivePlanningSuccess,
    failure: proactivePlanningFailure,
  }
);
