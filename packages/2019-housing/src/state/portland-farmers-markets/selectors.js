import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getPortlandFarmersMarketsRequest = createSelector(
  rootState,
  ({ portlandFarmersMarkets }) => portlandFarmersMarkets
);

export const getPortlandFarmersMarketsData = createSelector(
  getPortlandFarmersMarketsRequest,
  ({ data }) => data
);

export const isPortlandFarmersMarketsPending = createSelector(
  getPortlandFarmersMarketsRequest,
  ({ pending }) => !!pending
);

export const getActiveFarmersMarket = createSelector(
  getPortlandFarmersMarketsRequest,
  ({ selectedMarket }) => selectedMarket && selectedMarket.properties
);
