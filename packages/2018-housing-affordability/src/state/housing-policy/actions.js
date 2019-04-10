import fetchManyAdapter from "../fetch-many-adapter";
import actionEmitter from "../common-action-emitter";

// Types
export const START = "HOUSING_POLICY/START";
export const SUCCESS = "HOUSING_POLICY/SUCCESS";
export const FAILURE = "HOUSING_POLICY/FAILURE";
export const SET_POLICY = "HOUSING_POLICY/SET_POLICY";
export const UNSET_POLICY = "HOUSING_POLICY/UNSET_POLICY";

// Simple actions
export const AllStart = actionEmitter(START);
export const AllSuccess = actionEmitter(SUCCESS);
export const AllFailure = actionEmitter(FAILURE);

// Order of the URLs here is important! It impacts the reducer.
export const fetchAllHousingPolicyData = fetchManyAdapter(
  ["/api/policies/?limit=22", "/api/programs/?limit=208"],
  {
    start: AllStart,
    success: AllSuccess,
    failure: AllFailure
  }
);

export const setSelectedPolicy = policy => ({
  type: SET_POLICY,
  selectedPolicy: policy
});

export const unsetSelectedPolicy = () => ({
  type: UNSET_POLICY,
  selectedPolicy: null
});
