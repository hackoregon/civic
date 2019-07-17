import { createReducer, createSelector } from "redux-starter-kit";
import size from "lodash/size";
import itemTypes, { MINIMUM_KIT as minimumKit } from "../constants/items";

// INITIAL STATE
// items will be a list of objects, where each object is an id and a quantity
// the id is related to the items reducer
const initialState = {
  items: itemTypes,
  numberKitsStarted: 1
};

// CONSTANTS

export const actionTypes = { ADD_ITEM: "ADD_ITEM" };

// ACTIONS
export const addItem = (itemId, quantity = 1) => dispatch => {
  dispatch({ type: actionTypes.ADD_ITEM, itemId, quantity });
};

// REDUCERS
export const kit = createReducer(initialState, {
  [actionTypes.ADD_ITEM]: (state, action) => {
    const newQuantity = state.items[action.itemId].quantity + action.quantity;
    const minimumQuantity = minimumKit[action.itemId].quantity;
    const kitsFilledByItem = Math.ceil(newQuantity / minimumQuantity);
    const numberKitsNecessary =
      kitsFilledByItem > state.numberKitsStarted
        ? kitsFilledByItem
        : state.numberKitsStarted;

    // eslint-disable-next-line no-param-reassign
    state.items = {
      ...state.items,
      [action.itemId]: {
        ...state.items[action.itemId],
        quantity: newQuantity,
        kitsFilledByItem
      }
    };
    // eslint-disable-next-line no-param-reassign
    state.numberKitsStarted = numberKitsNecessary;
  }
});

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

export const getKitsNecessary = createSelector(
  ["kit.numberKitsStarted"],
  numberKitsStarted => numberKitsStarted
);
