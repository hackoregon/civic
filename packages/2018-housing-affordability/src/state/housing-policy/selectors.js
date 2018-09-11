import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getHousingPolicy = createSelector(
  rootState,
  ({ housingPolicy }) => housingPolicy
);

const getProperty = key =>
  createSelector(getHousingPolicy, state => state[key]);

export const isLoading = getProperty('pending');
export const isError = getProperty('error');
export const getAllPolicies = getProperty('allPolicies');
export const getAllPrograms = getProperty('allPrograms');
