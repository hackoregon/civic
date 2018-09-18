import { createSelector } from 'reselect';
import { groupBy } from 'lodash';
import { rootState } from '../selectors';

export const getHousingPolicy = createSelector(
  rootState,
  ({ housingPolicy }) => housingPolicy
);

const addLinks = governments => governments.map(program => ({
  ...program,
  links: [
    { link: program.link1, link_name: program.link1_name },
    { link: program.link2, link_name: program.link2_name },
    { link: program.link3, link_name: program.link3_name },
  ],
}));

const groupByEntity = governments => groupBy(
  governments,
  item => item.government_entity
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
        policy_name: p.policy_type,
        policy_desc: p.description,
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

    const selectedPolicyData = policies.filter(
      policy => policy.policy_id === selectedPolicy
    );

    return {
      policy: selectedPolicy,
      description: selectedPolicyData[0].description,
      category: selectedPolicyData[0].category,
      links: [
        {
          link: selectedPolicyData[0].link1,
          link_name: selectedPolicyData[0].link1_name,
        },
        {
          link: selectedPolicyData[0].link2,
          link_name: selectedPolicyData[0].link2_name,
        },
        {
          link: selectedPolicyData[0].link3,
          link_name: selectedPolicyData[0].link3_name,
        },
      ],
      governments: implementingGovernments,
      govData: groupByEntity(addLinks(implementingGovernments)),
    };
  }
);
