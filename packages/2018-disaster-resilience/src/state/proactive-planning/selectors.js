import { createSelector } from 'reselect';
import { rootState } from '../selectors';
import { titleCase } from '@hackoregon/component-library/src/utils/formatters';

export const getProactivePlanningRequest = createSelector(
  rootState,
  ({ proactivePlanning }) => proactivePlanning,
);

const processData = data => (data && data.length) && data.map(nbhd => ({
  displaced_percap: parseFloat(nbhd.displaced_percap),
  census_response_rate: (100 - parseFloat(nbhd.census_response_rate)) / 100,
  total_population: parseFloat(nbhd.total_population),
  quadrant: nbhd.quadrant,
  resilienceLabel: titleCase(nbhd.name) + ' • Census Non-Response Rate',
  displacementLabel: 'Displacement',
}));

export const getProactivePlanningData = createSelector(
  getProactivePlanningRequest,
  ({ data }) => data && processData(data).filter(nbhd => nbhd.total_population > 0)
);

export const isProactivePlanningPending = createSelector(
  getProactivePlanningRequest,
  ({ pending }) => !!pending,
);

export const catchProactivePlanningErrors = createSelector(
  getProactivePlanningRequest,
  ({ error }) => error || error,
);
