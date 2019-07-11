import { createReducer, createSelector } from "redux-starter-kit";
import size from "lodash/size";

import ITEMS from "../constants/items";

// INITIAL STATE
// populate initial state with one of every ITEM from ITEMS
const model = {};
let id;
for (id in ITEMS) {
  const itemModel = ITEMS[id];
  // we can derive properties and add them to the model
  model[id] = { id: itemModel, isDrinkable: id === ITEMS.WATER };
}

const initialState = {
  ...model
};

// CONSTANTS

export const actionTypes = { ADD_ITEM: "ADD_ITEM" };

// ACTIONS
export const addItem = item => dispatch => {
  dispatch({ type: actionTypes.ADD_ITEM, item });
};

// REDUCERS
export const items = createReducer(initialState, {
  [actionTypes.ADD_ITEM]: (state, action) => {
    const { id } = action.item;
    state.items = {
      ...state.items,
      [id]: {
        ...state.items[id],
        ...action.item
      }
    };
  }
});

export default items;

// SELECTORS

export const getItems = createSelector(
  ["items.model"],
  items => items
);

export const getItemCount = createSelector(
  ["items.model"],
  items => size(items)
);
