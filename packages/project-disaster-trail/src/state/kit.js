import { createReducer, createSelector } from "redux-starter-kit";
import size from "lodash/size";

// INITIAL STATE
// items will be a list of objects, where each object is an id and a quantity
// the id is related to the items reducer
const initialState = {
  items: {}
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
    state.items = {
      ...state.items,
      [action.itemId]: {
        ...state.items[action.itemId],
        quantity: state.items[action.itemId] + action.quantity
      }
    };
  }
});

export default kit;

// SELECTORS

/**
 * returns the Chapter for the given chapterId
 *
 * @param {*} state
 * @param {*} id
 * @returns
 */
export const getItems = createSelector(
  ["kit.items"],
  items => items
);

export const getItemCount = createSelector(
  ["kit.items"],
  items => size(items)
);
