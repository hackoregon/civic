import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getPortlandFarmersMarkersRequest = createSelector(
  rootState,
  ({ portlandFarmersMarkets }) => portlandFarmersMarkets,
);

export const getPortlandFarmersMarketsData = createSelector(
  getPortlandFarmersMarkersRequest,
  ({ data }) => data,
);

export const isPortlandFarmersMarketsPending = createSelector(
  getPortlandFarmersMarkersRequest,
  ({ pending }) => pending,
);
