import importAdapter from "../import-adapter";
import actionEmitter from "../import-adapter-action-emitter";

export const IMPORT_START = "PORTLAND_FARMERS_MARKETS_NEW_DATA/START";
export const IMPORT_SUCCESS = "PORTLAND_FARMERS_MARKETS_NEW_DATA/SUCCESS";
export const SET_FARMERS_MARKET_NEW = "PORTLAND_FARMERS_MARKETS_NEW/SET";

export const PortlandFarmersMarketsNewDataStart = actionEmitter(IMPORT_START);
export const PortlandFarmersMarketsNewDataSuccess = actionEmitter(
  IMPORT_SUCCESS
);

const importPromise = import("../../assets/portland-farmers-markets-new.json");

export const fetchPortlandFarmersMarketsNewData = importAdapter(importPromise, {
  start: PortlandFarmersMarketsNewDataStart,
  success: PortlandFarmersMarketsNewDataSuccess
});

export const setFarmersMarket = market => {
  return {
    type: SET_FARMERS_MARKET_NEW,
    selectedMarket: market
  };
};
