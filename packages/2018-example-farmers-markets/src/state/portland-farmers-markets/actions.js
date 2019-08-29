import importAdapter from "../import-adapter";
import actionEmitter from "../import-adapter-action-emitter";

export const IMPORT_START = "PORTLAND_FARMERS_MARKETS_DATA/START";
export const IMPORT_SUCCESS = "PORTLAND_FARMERS_MARKETS_DATA/SUCCESS";
export const SET_FARMERS_MARKET = "PORTLAND_FARMERS_MARKETS/SET";

export const PortlandFarmersMarketsDataStart = actionEmitter(IMPORT_START);
export const PortlandFarmersMarketsDataSuccess = actionEmitter(IMPORT_SUCCESS);

const importPromise = import("../../assets/portland-farmers-markets.json");

export const fetchPortlandFarmersMarketsData = importAdapter(importPromise, {
  start: PortlandFarmersMarketsDataStart,
  success: PortlandFarmersMarketsDataSuccess
});

export const setFarmersMarket = market => {
  return {
    type: SET_FARMERS_MARKET,
    selectedMarket: market
  };
};
