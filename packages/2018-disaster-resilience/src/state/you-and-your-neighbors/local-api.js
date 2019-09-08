import actionEmitter from "../common-action-emitter";

export const SET_COORDS = "YOU_AND_YOUR_NEIGHBORS/SET_COORDS";
export const youAndYourNeighborsSetCoords = actionEmitter(SET_COORDS);

const INITIAL_STATE = {
  selectedCoords: { latitude: 45.5231, longitude: -122.6765 }
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_COORDS:
      return {
        ...state,
        selectedCoords: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
