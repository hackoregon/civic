import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getNeighborhoodAgesRequest = createSelector(
  rootState,
  ({ neighborhoodAges }) => neighborhoodAges,
);

export const getNeighborhoodAgesData = createSelector(
  getNeighborhoodAgesRequest,
  ({ data }) => data,
);

export const isNeighborhoodAgesPending = createSelector(
  getNeighborhoodAgesRequest,
  ({ pending }) => !!pending,
);

export const catchNeighborhoodAgesErrors = createSelector(
  getNeighborhoodAgesRequest,
  ({ error }) => error || error,
);

const getDataFromResponse = ({ data }) => ((data || {}).results) && data.results;
const getNeighborhoodsFromData = data => data.map(obj => obj.neighborhood);
const getUnique = obj => [...new Set(obj)];
const mapToSelector = arr => arr.map(obj => ({ value: obj, label: obj }));

export const getListOfNeighborhoods = createSelector(
  getNeighborhoodAgesRequest,
  ({ data }) => !!data && mapToSelector(getUnique(getNeighborhoodsFromData(getDataFromResponse(data)))),
);

// export const isNeighborhoodAgesPending = createSelector(
//   getNeighborhoodAgesRequest,
//   ({ pending }) => !!pending,
// );

// export const catchNeighborhoodAgesErrors = createSelector(
//   getNeighborhoodAgesRequest,
//   ({ error }) => error || error,
// );

// export const getNeighborhoodAgesData = createSelector(
//   getNeighborhoodAgesRequest,
//   ({ data, pending }) => { return pending ? null : getDataFromResponse(data); },
// );

// export const getListOfNeighborhoods = createSelector(
//   getNeighborhoodAgesData,
//   isNeighborhoodAgesPending,
//   ({ data, pending }) => { return pending ? null : getUnique(getNeighborhoodsFromData(data)); },
// );
