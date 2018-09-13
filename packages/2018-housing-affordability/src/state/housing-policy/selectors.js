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
export const getSelectedPolicy = getProperty('selectedPolicy');

export const getTableData = createSelector(
  getAllPolicies,
  getAllPrograms,
  (policies, programs) => {
    const data = [];

    if (!policies || !programs) return;

    policies.forEach(p => {
      const totalCount = programs.filter(
        program => program.policy === p.policy_id
      ).length;
      data.push({
        policy: p.policy_id,
        governments: totalCount,
      });
    });

    return data;
  }
);

export const getSelectedPolicyData = createSelector(
  getAllPolicies,
  getAllPrograms,
  getSelectedPolicy,
  (policies, programs, selectedPolicy) => {
    if (!policies || !programs || !selectedPolicy) return;

    const implementingGovernments = programs.filter(
      program => program.policy === selectedPolicy
    );
    return {
      policy: selectedPolicy,
      governments: implementingGovernments,
    };
  }
);
