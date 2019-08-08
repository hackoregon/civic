import { createReducer, createSelector } from "redux-starter-kit";
import size from "lodash/size";
import itemTypes, { MINIMUM_KIT as minimumKit } from "../constants/items";

// INITIAL STATE
// items will be a list of objects, where each object is an id and a quantity
// the id is related to the items reducer
const initialState = {
  items: itemTypes,
  playerKit: {},
  numberKitsStarted: 1
};

// CONSTANTS

export const actionTypes = {
  ADD_ITEM: "ADD_ITEM",
  ADD_ITEM_TO_PLAYER_KIT: "ADD_ITEM_TO_PLAYER_KIT"
};

// ACTIONS
export const addItem = (itemId, quantity = 1) => dispatch => {
  dispatch({ type: actionTypes.ADD_ITEM, itemId, quantity });
};

export const addItemToPlayerKit = itemId => dispatch => {
  dispatch({ type: actionTypes.ADD_ITEM_TO_PLAYER_KIT, itemId });
};

// REDUCERS
/* eslint-disable no-param-reassign */
export const kit = createReducer(initialState, {
  [actionTypes.ADD_ITEM_TO_PLAYER_KIT]: (state, action) => {
    state.playerKit[action.itemId] = true;
  },
  [actionTypes.ADD_ITEM]: (state, action) => {
    const newQuantity = state.items[action.itemId].quantity + action.quantity;
    const minimumQuantity = minimumKit[action.itemId].quantity;
    const kitsFilledByItem = Math.ceil(newQuantity / minimumQuantity);
    const numberKitsNecessary =
      kitsFilledByItem > state.numberKitsStarted
        ? kitsFilledByItem
        : state.numberKitsStarted;

    state.items = {
      ...state.items,
      [action.itemId]: {
        ...state.items[action.itemId],
        quantity: newQuantity,
        kitsFilledByItem
      }
    };
    state.numberKitsStarted = numberKitsNecessary;
  }
});
/* eslint-enable no-param-reassign */

export default kit;

// SELECTORS

export const getItems = createSelector(
  ["kit.items"],
  items => items
);

export const getItemCount = createSelector(
  ["kit.items"],
  items => size(items)
);

export const getKitCreationItems = createSelector(
  ["kit.items"],
  items => {
    const genericWeighting = 1 / size(items);

    const kitCreationItems = Object.keys(items).reduce((result, itemKey) => {
      const itemData = items[itemKey];

      const genericItem = {
        type: itemData.id,
        imageSVG: itemData.fullSvg,
        imgAlt: itemData.imgAlt,
        good: itemData.goodKitItem,
        weighting: genericWeighting,
        points: itemData.pointsForPuttingInKit
      };
      result.push(genericItem);

      return result;
    }, []);

    return kitCreationItems;
  }
);

export const getKitsNecessary = createSelector(
  ["kit.numberKitsStarted"],
  numberKitsStarted => numberKitsStarted
);
