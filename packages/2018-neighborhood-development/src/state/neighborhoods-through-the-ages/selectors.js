import { createSelector } from 'reselect';
import { compose } from 'redux';
import { titleCase } from '@hackoregon/component-library/src/utils/formatters';

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

export const getSelectedNeighborhood = state => state.neighborhoodAges.selectedNeighborhood && state.neighborhoodAges.selectedNeighborhood.value;

const getDataFromResponse = ({ data }) => ((data || {}).results) && data.results;
const getNeighborhoodsFromData = data => data.map(obj => obj.neighborhood);
const getSelectedNeighborhoodData = (data, nbhd) => data.filter(({ neighborhood }) => neighborhood === nbhd);
const getUnique = obj => [...new Set(obj)];
const formatForDropdown = arr => arr.map(obj => ({ value: obj, label: titleCase(obj) }));
const neighborhoodDropdown = compose(
  formatForDropdown,
  getUnique,
  getNeighborhoodsFromData,
  getDataFromResponse
);

const dataForNeighborhood = (data, nbhd) => getSelectedNeighborhoodData(getDataFromResponse(data), nbhd);

const formatData = data => [].concat(
  data.map(obj => ({ type: '18-25', year: obj.year, pct: obj.pct_18_25 })),
  data.map(obj => ({ type: '26-32', year: obj.year, pct: obj.pct_26_32 })),
  data.map(obj => ({ type: '33-39', year: obj.year, pct: obj.pct_33_39 })),
  data.map(obj => ({ type: '40-49', year: obj.year, pct: obj.pct_40_49 })),
  data.map(obj => ({ type: '50+', year: obj.year, pct: obj.pct_50_plus })),
);

export const getListOfNeighborhoods = createSelector(
  getNeighborhoodAgesRequest,
  ({ data }) => data && neighborhoodDropdown(data),
);

export const getDataForSelectedNeighborhood = createSelector(
  getNeighborhoodAgesData,
  getSelectedNeighborhood,
  (data, nbhd) => (!!data && !!nbhd) && formatData(dataForNeighborhood(data, nbhd)),
);

