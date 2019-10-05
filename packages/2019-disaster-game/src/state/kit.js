import { createReducer, createSelector } from "redux-starter-kit";
import size from "lodash/size";
import itemTypes, { food, water, firstAidKit } from "../constants/items";

// INITIAL STATE
// items will be a list of objects, where each object is an id and a quantity
// the id is related to the items reducer
const initialState = {
  items: itemTypes,
  playerKit: {},
  matchLockItemsInKit: {
    [food]: 0,
    [water]: 0,
    [firstAidKit]: 0
  }
};

// CONSTANTS

export const actionTypes = {
  ADD_ITEM: "ADD_ITEM",
  ADD_ITEM_TO_PLAYER_KIT: "ADD_ITEM_TO_PLAYER_KIT",
  RESET_STATE: "RESET_STATE"
};

// ACTIONS
export const addItem = (itemId, quantity = 1) => dispatch => {
  dispatch({ type: actionTypes.ADD_ITEM, itemId, quantity });
};

export const addItemToPlayerKit = kitItem => dispatch => {
  dispatch({ type: actionTypes.ADD_ITEM_TO_PLAYER_KIT, kitItem });
};

export const resetState = () => dispatch => {
  dispatch({ type: actionTypes.RESET_STATE });
};

// REDUCERS
/* eslint-disable no-param-reassign */
export const kit = createReducer(initialState, {
  [actionTypes.ADD_ITEM_TO_PLAYER_KIT]: (state, action) => {
    const isMatchLockItem = !!state.matchLockItemsInKit[action.kitItem.type];
    if (isMatchLockItem) {
      state.matchLockItemsInKit[action.kitItem.type] += 1;
    }
    state.playerKit[action.kitItem.type] = action.kitItem;
  },
  [actionTypes.RESET_STATE]: () => {
    return initialState;
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

export const getPlayerKit = createSelector(
  ["kit.playerKit"],
  playerKit => playerKit
);

export const getMatchLockItemsInKit = createSelector(
  ["kit.matchLockItemsInKit"],
  matchLockItemsInKit => matchLockItemsInKit
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

export const getPlayerKitItems = createSelector(
  ["kit.playerKit", "kit.items"],
  (playerKit, allItems) => {
    const genericWeighting = 1 / size(playerKit);

    const playerKitItems = Object.keys(playerKit).reduce((result, itemKey) => {
      const itemData = allItems[itemKey];

      const genericItem = {
        type: itemData.id,
        imageSVG: itemData.fullSvg,
        imgAlt: itemData.imgAlt,
        // default false adjust in component
        good: false,
        weighting: genericWeighting,
        // default 0 adjust in component
        points: 0
      };
      result.push(genericItem);

      return result;
    }, []);

    return playerKitItems;
  }
);
