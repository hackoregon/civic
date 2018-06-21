import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getSandbox = createSelector(
  rootState,
  state => state
);

const getProperty = key => createSelector(getSandbox, state => state[key]);

export const isSandboxLoading = getProperty('sandboxPending');
export const isFoundationLoading = getProperty('foundationPending');
export const getSandboxError = getProperty('sandboxError');
export const getSandboxData = getProperty('sandbox');
export const getFoundations = getProperty('foundations');
export const getFoundationError = getProperty('foundationError');
export const getSelectedPackage = getProperty('selectedPackage');


export const getPackages = getProperty('packages');
export const getSelectedFoundationData = createSelector(
  getSandbox,
  ({ selectedFoundationData }) => selectedFoundationData && selectedFoundationData.map(datum => ({
    ...datum,
  }))
);

// export const getSelectedCityLowRank = createSelector(
//   getSelectedCityData,
//   (data) => {
//     const datum = data && data.find(d => d.datatype === lowKey);
//     return datum ? {
//       rank: datum.rank,
//       total: datum.total,
//     } : {};
//   }
// );

// export const getSelectedCityHighRank = createSelector(
//   getSelectedCityData,
//   (data) => {
//     const datum = data && data.find(d => d.datatype === highKey);
//     return datum ? {
//       rank: datum.rank,
//       total: datum.total,
//     } : {};
//   }
// );
