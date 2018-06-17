import { createSelector } from 'reselect';
import { compose } from 'redux';
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
const formatForDropdown = arr => arr.map(obj => ({ value: obj, label: obj }));
const neighborhoodDropdown = compose(
  formatForDropdown,
  getUnique,
  getNeighborhoodsFromData,
  getDataFromResponse
);

export const getListOfNeighborhoods = createSelector(
  getNeighborhoodAgesRequest,
  ({ data }) => !!data && neighborhoodDropdown(data),
);
