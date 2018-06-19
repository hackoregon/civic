import { createSelector } from 'reselect';
import { compose } from 'redux';
import { titleCase } from '@hackoregon/component-library/src/utils/formatters';
import { ungroupBy } from '@hackoregon/component-library/src/utils/dataHelpers';

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

const getNeighborhoodsFromData = data => data.map(obj => obj.neighborhood);
const getSelectedNeighborhoodData = (data, nbhd) => data.filter(({ neighborhood }) => neighborhood === nbhd);
const getUnique = obj => [...new Set(obj)];
const formatForDropdown = arr => arr.map(obj => ({ value: obj, label: titleCase(obj) }));
const neighborhoodDropdown = compose(
  formatForDropdown,
  getUnique,
  getNeighborhoodsFromData
);

const dataForNeighborhood = (data, nbhd) => getSelectedNeighborhoodData(data, nbhd);

const TYPES = ['pct_18_25', 'pct_26_32', 'pct_33_39', 'pct_40_49', 'pct_50_plus'];
const LABELS = ['18-25', '26-32', '33-39', '40-49', '50+'];

const formatData = data => ungroupBy(data, TYPES, LABELS);

export const getListOfNeighborhoods = createSelector(
  getNeighborhoodAgesRequest,
  ({ data }) => data && neighborhoodDropdown(data),
);

export const getDataForSelectedNeighborhood = createSelector(
  getNeighborhoodAgesData,
  getSelectedNeighborhood,
  (data, nbhd) => (!!data && !!nbhd) && formatData(dataForNeighborhood(data, nbhd)),
);

