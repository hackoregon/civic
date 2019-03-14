import { createSelector } from 'reselect';
import { civicFormat } from '@hackoregon/component-library';

import { rootState } from '../selectors';

export const getProactivePlanningRequest = createSelector(
  rootState,
  ({ proactivePlanning }) => proactivePlanning
);

const extractProperties = data =>
  data && data.length && data.map(feature => feature.properties);

const processData = data =>
  data &&
  data.length &&
  data.map(nbhd => ({
    displaced_percap: parseFloat(nbhd.displaced_percap),
    census_response_rate: (100 - parseFloat(nbhd.census_response_rate)) / 100,
    total_population: parseFloat(nbhd.total_population),
    quadrant: nbhd.quadrant,
    resilienceLabel: `${civicFormat.titleCase(
      nbhd.name
    )} • Census Non-Response Rate`,
    displacementLabel: 'Displacement',
  }));

export const getProactivePlanningData = createSelector(
  getProactivePlanningRequest,
  ({ data }) =>
    data &&
    processData(extractProperties(data)).filter(
      nbhd => nbhd.total_population > 0
    )
);

export const isProactivePlanningPending = createSelector(
  getProactivePlanningRequest,
  ({ pending }) => !!pending
);

export const catchProactivePlanningErrors = createSelector(
  getProactivePlanningRequest,
  ({ error }) => error || error
);
