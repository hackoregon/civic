import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getPortlandFarmersMarketsRequest = createSelector(
  rootState,
  ({ portlandFarmersMarketsData }) => portlandFarmersMarketsData
);

export const getPortlandFarmersMarketsData = createSelector(
  getPortlandFarmersMarketsRequest,
  ({ data }) => data && data.PortlandFarmersMarketsData
);

export const isPortlandFarmersMarketsDataPending = createSelector(
  getPortlandFarmersMarketsRequest,
  ({ pending }) => !!pending
);

export const getActiveFarmersMarket = createSelector(
  getPortlandFarmersMarketsRequest,
  ({ selectedMarket }) => selectedMarket && selectedMarket.properties
);
