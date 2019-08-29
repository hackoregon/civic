import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getPortlandFarmersMarketsNewRequest = createSelector(
  rootState,
  ({ portlandFarmersMarketsNewData }) => portlandFarmersMarketsNewData
);

export const getPortlandFarmersMarketsNewData = createSelector(
  getPortlandFarmersMarketsNewRequest,
  ({ data }) => data && data.PortlandFarmersMarketsNewData
);

export const isPortlandFarmersMarketsNewDataPending = createSelector(
  getPortlandFarmersMarketsNewRequest,
  ({ pending }) => !!pending
);

export const getActiveFarmersMarket = createSelector(
  getPortlandFarmersMarketsNewRequest,
  ({ selectedMarket }) => selectedMarket && selectedMarket.properties
);
