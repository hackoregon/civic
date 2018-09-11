import fetchManyAdapter from '../fetch-many-adapter';
import actionEmitter from '../common-action-emitter';

// Types
export const START = 'HOUSING_POLICY/START';
export const SUCCESS = 'HOUSING_POLICY/SUCCESS';
export const FAILURE = 'HOUSING_POLICY/FAILURE';

// Simple actions
export const AllStart = actionEmitter(START);
export const AllSuccess = actionEmitter(SUCCESS);
export const AllFailure = actionEmitter(FAILURE);

// Order of the URLs here is important! It impacts the reducer.
export const fetchAllHousingPolicyData = fetchManyAdapter(
  ['/api/programs/?limit=208', '/api/policies/?limit=22'],
  {
    start: AllStart,
    success: AllSuccess,
    failure: AllFailure,
  }
);
